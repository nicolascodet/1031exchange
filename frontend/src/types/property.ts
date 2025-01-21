export type PropertyType = 'residential' | 'commercial' | 'retail' | 'industrial' | 'land';
export type PropertyStatus = 'available' | 'pending' | 'exchanged';

export interface PropertyBase {
  address: string;
  location: string;
  price: number;
  description?: string;
  property_type: PropertyType;
  square_footage: number;
  year_built: number;
  bedrooms?: number;
  bathrooms?: number;
  status: PropertyStatus;
}

export interface PropertyCreate extends PropertyBase {}

export interface PropertyUpdate extends Partial<PropertyBase> {}

export interface Property extends PropertyBase {
  id: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyMatch {
  property: Property;
  score: number;
  value_score: number;
  location_score: number;
  type_score: number;
}

export interface ExchangeChain {
  properties: Property[];
  average_score: number;
  scores: number[];
} 