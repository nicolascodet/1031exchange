import { authService } from './auth';

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
}

export interface ChainProperty {
  property: Property;
  score: number;
}

export interface ExchangeChain {
  properties: ChainProperty[];
  average_score: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const propertyService = {
  async getProperties(): Promise<Property[]> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/properties/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    return response.json();
  },

  async getProperty(id: string | number): Promise<Property> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/properties/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    return response.json();
  },

  async createProperty(property: PropertyCreate): Promise<Property> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/properties/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error('Failed to create property');
    }

    return response.json();
  },

  async updateProperty(id: number, property: PropertyUpdate): Promise<Property> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error('Failed to update property');
    }

    return response.json();
  },

  async getMatches(id: string | number, minScore: number = 0.5): Promise<PropertyMatch[]> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/properties/${id}/matches?min_score=${minScore}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch property matches');
    }

    return response.json();
  },

  async getExchangeChains(
    id: string | number, 
    minScore: number = 0.5, 
    maxLength: number = 3
  ): Promise<ExchangeChain[]> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(
      `${API_URL}/properties/${id}/exchange-chains?min_score=${minScore}&max_length=${maxLength}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange chains');
    }

    return response.json();
  },
}; 