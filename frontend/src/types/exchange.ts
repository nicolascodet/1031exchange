import { Property } from './property';

export type ExchangeStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface ExchangeBase {
  relinquished_property_id: number;
  replacement_property_id: number;
  status: ExchangeStatus;
  notes?: string;
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