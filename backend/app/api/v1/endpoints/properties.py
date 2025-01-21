from typing import Any, List, Tuple
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app import crud, models, schemas
from app.api import deps
from app.matching.property_matcher import PropertyMatcher

router = APIRouter()

@router.get("/", response_model=List[schemas.Property])
def read_properties(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve properties.
    """
    properties = crud.property.get_multi(db, skip=skip, limit=limit)
    return properties

@router.post("/", response_model=schemas.Property)
def create_property(
    *,
    db: Session = Depends(deps.get_db),
    property_in: schemas.PropertyCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new property.
    """
    property = crud.property.create_with_owner(
        db=db, obj_in=property_in, owner_id=current_user.id
    )
    return property

@router.get("/{property_id}", response_model=schemas.Property)
def read_property(
    *,
    db: Session = Depends(deps.get_db),
    property_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get property by ID.
    """
    property = crud.property.get(db=db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@router.put("/{property_id}", response_model=schemas.Property)
def update_property(
    *,
    db: Session = Depends(deps.get_db),
    property_id: int,
    property_in: schemas.PropertyUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a property.
    """
    property = crud.property.get(db=db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    property = crud.property.update(db=db, db_obj=property, obj_in=property_in)
    return property

@router.delete("/{property_id}", response_model=schemas.Property)
def delete_property(
    *,
    db: Session = Depends(deps.get_db),
    property_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a property.
    """
    property = crud.property.get(db=db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if not crud.user.is_superuser(current_user) and (property.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    property = crud.property.remove(db=db, id=property_id)
    return property

class PropertyMatch(BaseModel):
    property: schemas.Property
    match_score: float

class PropertyChain(BaseModel):
    properties: List[PropertyMatch]
    average_score: float

@router.get("/{property_id}/matches", response_model=List[PropertyMatch])
def find_matching_properties(
    *,
    db: Session = Depends(deps.get_db),
    property_id: int,
    min_score: float = 0.6,
    limit: int = 10,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Find matching properties for a given property based on advanced matching criteria.
    """
    property = crud.property.get(db=db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")

    matches = PropertyMatcher.find_matching_properties(
        db=db,
        source_property=property,
        min_score=min_score,
        limit=limit
    )

    return [
        PropertyMatch(property=prop, match_score=score)
        for prop, score in matches
    ]

@router.get("/{property_id}/exchange-chains", response_model=List[PropertyChain])
def find_exchange_chains(
    *,
    db: Session = Depends(deps.get_db),
    property_id: int,
    max_chain_length: int = 3,
    min_score: float = 0.6,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Identify potential exchange chains for a given property.
    """
    property = crud.property.get(db=db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")

    chains = PropertyMatcher.identify_exchange_chains(
        db=db,
        source_property=property,
        max_chain_length=max_chain_length,
        min_score=min_score
    )

    return [
        PropertyChain(
            properties=[
                PropertyMatch(property=prop, match_score=score)
                for prop, score in chain
            ],
            average_score=sum(score for _, score in chain) / len(chain)
        )
        for chain in chains
    ] 