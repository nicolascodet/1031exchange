export enum UserType {
  Investor = 'investor',
  QI = 'qi',
  Admin = 'admin'
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  userType: UserType;
  companyName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  userType: UserType;
  companyName?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user?: User;
} 