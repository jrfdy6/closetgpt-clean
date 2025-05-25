import { useState, useEffect } from 'react';
import { User } from '../types';
import { STORAGE_KEYS } from '../constants';
import { ApiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await ApiClient.getInstance().get<User>(API_ENDPOINTS.USER.PROFILE);
      if (response.data) {
        setUser(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().post<{ token: string; user: User }>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      
      if (response.data) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().post<{ token: string; user: User }>(
        API_ENDPOINTS.AUTH.REGISTER,
        { email, password, displayName }
      );
      
      if (response.data) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ApiClient.getInstance().post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      setUser(null);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().put<User>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        updates
      );
      
      if (response.data) {
        setUser(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };
}; 