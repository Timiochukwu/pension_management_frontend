/**
 * AUTHENTICATION SERVICE
 *
 * Handles all authentication-related API calls
 * - Login
 * - Register
 * - Logout
 * - Token management
 */

import apiClient from './api';
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

/**
 * LOGIN
 *
 * Authenticates user and returns JWT token
 * Stores token in localStorage for subsequent requests
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

  // Store token and user in localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

/**
 * REGISTER
 *
 * Creates a new user account
 * Automatically logs in the user after registration
 */
export const register = async (data: RegisterRequest): Promise<User> => {
  // DEBUG: Log registration payload before sending
  console.log('🚀 AuthService sending to /auth/register:', JSON.stringify(data, null, 2));

  const response = await apiClient.post<User>('/auth/register', data);

  console.log('✅ Registration response:', response.data);
  return response.data;
};

/**
 * LOGOUT
 *
 * Clears authentication data from localStorage
 * Redirects to login page
 */
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

/**
 * GET CURRENT USER
 *
 * Returns currently logged in user from localStorage
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * GET AUTH TOKEN
 *
 * Returns JWT token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * CHECK IF USER IS AUTHENTICATED
 *
 * Returns true if user has valid token
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * CHECK USER ROLE
 *
 * Returns true if user has specified role
 */
export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};
