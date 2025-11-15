/**
 * AUTHENTICATION STORE (Zustand)
 *
 * Global state management for authentication
 * - Current user
 * - Login/logout
 * - Token management
 */

import { create } from 'zustand';
import type { User } from '../types';
import { getCurrentUser, logout as logoutService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  /**
   * SET USER
   *
   * Updates current user in state
   */
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  /**
   * LOGOUT
   *
   * Clears user and redirects to login
   */
  logout: () => {
    logoutService();
    set({ user: null, isAuthenticated: false });
  },

  /**
   * INITIALIZE AUTH
   *
   * Called on app startup to restore auth state from localStorage
   */
  initializeAuth: () => {
    const user = getCurrentUser();
    set({
      user,
      isAuthenticated: !!user,
    });
  },
}));
