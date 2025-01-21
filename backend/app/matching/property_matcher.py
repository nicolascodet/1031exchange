from typing import List, Dict, Optional, Set, Tuple
from sqlalchemy.orm import Session
from app.models.property import Property
from app.models.exchange import Exchange

class PropertyMatcher:
    # Default value tolerance (15%)
    VALUE_TOLERANCE = 0.15
    
    # Property type compatibility matrix
    # 1.0 = perfect match, 0.0 = incompatible
    PROPERTY_TYPE_COMPATIBILITY = {
        "residential": {
            "residential": 1.0,
            "multi_family": 0.8,
            "commercial": 0.4,
            "retail": 0.3,
            "industrial": 0.2,
            "land": 0.3
        },
        "multi_family": {
            "residential": 0.7,
            "multi_family": 1.0,
            "commercial": 0.6,
            "retail": 0.5,
            "industrial": 0.3,
            "land": 0.4
        },
        "commercial": {
            "residential": 0.3,
            "multi_family": 0.6,
            "commercial": 1.0,
            "retail": 0.8,
            "industrial": 0.7,
            "land": 0.5
        },
        "retail": {
            "residential": 0.3,
            "multi_family": 0.5,
            "commercial": 0.8,
            "retail": 1.0,
            "industrial": 0.6,
            "land": 0.5
        },
        "industrial": {
            "residential": 0.2,
            "multi_family": 0.3,
            "commercial": 0.7,
            "retail": 0.6,
            "industrial": 1.0,
            "land": 0.6
        },
        "land": {
            "residential": 0.4,
            "multi_family": 0.5,
            "commercial": 0.6,
            "retail": 0.5,
            "industrial": 0.6,
            "land": 1.0
        }
    }

    @staticmethod
    def calculate_value_match(source_price: float, target_price: float, tolerance: float = VALUE_TOLERANCE) -> float:
        """Calculate how well two property values match within the tolerance range."""
        min_acceptable = source_price * (1 - tolerance)
        max_acceptable = source_price * (1 + tolerance)
        
        if min_acceptable <= target_price <= max_acceptable:
            # Calculate how close to the ideal match (1.0 = perfect match)
            price_diff_ratio = abs(source_price - target_price) / source_price
            return 1.0 - (price_diff_ratio / tolerance)
        return 0.0

    @staticmethod
    def calculate_location_score(source_location: str, target_location: str) -> float:
        """Calculate location preference score based on matching criteria."""
        # Simple location matching for now - can be enhanced with geocoding
        if source_location.lower() == target_location.lower():
            return 1.0
        # Check if same city/region (assuming format "City, State")
        source_city = source_location.split(',')[0].strip().lower()
        target_city = target_location.split(',')[0].strip().lower()
        if source_city == target_city:
            return 0.8
        # Check if same state
        source_state = source_location.split(',')[1].strip().lower() if len(source_location.split(',')) > 1 else ''
        target_state = target_location.split(',')[1].strip().lower() if len(target_location.split(',')) > 1 else ''
        if source_state and target_state and source_state == target_state:
            return 0.5
        return 0.2

    @classmethod
    def calculate_property_type_compatibility(cls, source_type: str, target_type: str) -> float:
        """Calculate compatibility score between property types."""
        source_type = source_type.lower()
        target_type = target_type.lower()
        
        if source_type not in cls.PROPERTY_TYPE_COMPATIBILITY or target_type not in cls.PROPERTY_TYPE_COMPATIBILITY[source_type]:
            return 0.0
            
        return cls.PROPERTY_TYPE_COMPATIBILITY[source_type][target_type]

    @classmethod
    def calculate_match_score(cls, source_property: Property, target_property: Property) -> float:
        """Calculate overall match score between two properties."""
        # Calculate individual scores
        value_score = cls.calculate_value_match(source_property.price, target_property.price)
        location_score = cls.calculate_location_score(source_property.location, target_property.location)
        type_score = cls.calculate_property_type_compatibility(source_property.property_type, target_property.property_type)
        
        # Weighted average of scores (adjust weights as needed)
        weights = {
            'value': 0.4,
            'location': 0.3,
            'type': 0.3
        }
        
        total_score = (
            value_score * weights['value'] +
            location_score * weights['location'] +
            type_score * weights['type']
        )
        
        return total_score

    @classmethod
    def find_matching_properties(
        cls,
        db: Session,
        source_property: Property,
        min_score: float = 0.6,
        limit: int = 10
    ) -> List[Tuple[Property, float]]:
        """Find matching properties with their match scores."""
        # Query available properties
        available_properties = (
            db.query(Property)
            .filter(Property.status == "available")
            .filter(Property.id != source_property.id)
            .filter(Property.owner_id != source_property.owner_id)
            .all()
        )
        
        # Calculate scores for each property
        scored_properties = [
            (prop, cls.calculate_match_score(source_property, prop))
            for prop in available_properties
        ]
        
        # Filter by minimum score and sort by score descending
        matched_properties = [
            (prop, score) for prop, score in scored_properties
            if score >= min_score
        ]
        matched_properties.sort(key=lambda x: x[1], reverse=True)
        
        return matched_properties[:limit]

    @classmethod
    def identify_exchange_chains(
        cls,
        db: Session,
        source_property: Property,
        max_chain_length: int = 3,
        min_score: float = 0.6
    ) -> List[List[Tuple[Property, float]]]:
        """Identify potential exchange chains starting from the source property."""
        def build_chains(
            current_property: Property,
            current_chain: List[Tuple[Property, float]],
            visited: Set[int]
        ) -> List[List[Tuple[Property, float]]]:
            if len(current_chain) >= max_chain_length:
                return [current_chain]
            
            # Find matches for the current property
            matches = cls.find_matching_properties(db, current_property, min_score)
            
            chains = []
            for match_prop, match_score in matches:
                if match_prop.id not in visited:
                    new_visited = visited | {match_prop.id}
                    new_chain = current_chain + [(match_prop, match_score)]
                    
                    # Add the current chain
                    if len(new_chain) > 1:  # Only add chains with at least 2 properties
                        chains.append(new_chain)
                    
                    # Continue building the chain
                    extended_chains = build_chains(match_prop, new_chain, new_visited)
                    chains.extend(extended_chains)
            
            return chains
        
        # Start building chains from the source property
        initial_visited = {source_property.id}
        chains = build_chains(source_property, [], initial_visited)
        
        # Sort chains by average score
        def chain_average_score(chain):
            return sum(score for _, score in chain) / len(chain)
        
        chains.sort(key=chain_average_score, reverse=True)
        
        return chains 