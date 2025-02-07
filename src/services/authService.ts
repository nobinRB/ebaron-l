import axios from 'axios';
import { getAuthToken } from '@/utils/auth';

interface AuthResponse {
  token?: string;
  authenticated?: boolean;
  message?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  },

  async checkAuth(): Promise<boolean> {
    try {
      const token = getAuthToken();
      if (!token) return false;

      const response = await fetch('/api/admin/auth/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return !!data.authenticated;
    } catch (error) {
      return false;
    }
  },

  async logout(): Promise<void> {
    const response = await fetch('/api/admin/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }
};