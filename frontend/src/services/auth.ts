import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import { apiClient } from '@/lib/api-client';
import { AxiosError } from 'axios';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const formData = new FormData();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);

      const response = await apiClient.post<AuthResponse>('/auth/login', formData);
      const { data } = response;

      // Store the token
      localStorage.setItem('accessToken', data.accessToken);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AuthError(error.response?.data?.detail || 'Login failed');
      }
      throw new AuthError('An unexpected error occurred');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      const responseData = response.data;

      // Store the token if the API returns it upon registration
      if (responseData.accessToken) {
        localStorage.setItem('accessToken', responseData.accessToken);
      }

      return responseData;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AuthError(error.response?.data?.detail || 'Registration failed');
      }
      throw new AuthError('An unexpected error occurred');
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('accessToken');
  },

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
}; 