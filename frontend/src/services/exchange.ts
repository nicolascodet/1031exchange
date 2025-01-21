import { authService } from './auth';
import { Property } from './property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export type ExchangeStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface ExchangeBase {
  title: string;
  description?: string;
  relinquished_property_id: number;
  replacement_property_ids: number[];
  status: ExchangeStatus;
  exchange_period_days?: number;
  identification_period_days?: number;
}

export interface ExchangeCreate extends ExchangeBase {}

export interface ExchangeUpdate extends Partial<ExchangeBase> {}

export interface Exchange extends ExchangeBase {
  id: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
  relinquished_property?: Property;
  replacement_property?: Property;
}

export const exchangeService = {
  // Get all exchanges
  async getExchanges(): Promise<Exchange[]> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/exchanges/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exchanges');
    }

    return response.json();
  },

  // Get a single exchange
  async getExchange(id: string | number): Promise<Exchange> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/exchanges/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exchange');
    }

    return response.json();
  },

  // Create a new exchange
  async createExchange(exchange: ExchangeCreate): Promise<Exchange> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/exchanges/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exchange),
    });

    if (!response.ok) {
      throw new Error('Failed to create exchange');
    }

    return response.json();
  },

  // Update an exchange
  async updateExchange(id: number, exchange: ExchangeUpdate): Promise<Exchange> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/exchanges/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exchange),
    });

    if (!response.ok) {
      throw new Error('Failed to update exchange');
    }

    return response.json();
  },

  // Get exchanges by user
  async getUserExchanges(): Promise<Exchange[]> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/exchanges/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user exchanges');
    }

    return response.json();
  }
}; 