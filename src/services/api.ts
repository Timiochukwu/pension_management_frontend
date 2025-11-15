/**
 * API SERVICE
 *
 * Centralized API configuration using axios
 * Handles authentication, error handling, and request/response interceptors
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import type { ErrorResponse } from '../types';

/**
 * BASE API URL
 * Change this to your Spring Boot backend URL
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * CREATE AXIOS INSTANCE
 *
 * Preconfigured with base URL and headers
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * REQUEST INTERCEPTOR
 *
 * Automatically adds JWT token to requests
 * Runs before every request is sent
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    // Add Authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 *
 * Handles global error responses
 * Shows error notifications
 * Redirects to login on 401 (Unauthorized)
 */
apiClient.interceptors.response.use(
  (response) => {
    // Success response - return data
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Error response - handle globally
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;

        case 403:
          // Forbidden - user doesn't have permission
          toast.error('You do not have permission to perform this action.');
          break;

        case 404:
          // Not Found
          toast.error(data.message || 'Resource not found.');
          break;

        case 422:
          // Validation Error
          if (data.errors) {
            // Show first validation error
            const firstError = Object.values(data.errors)[0];
            toast.error(firstError);
          } else {
            toast.error(data.message || 'Validation failed.');
          }
          break;

        case 429:
          // Rate Limit Exceeded
          toast.error('Too many requests. Please try again later.');
          break;

        case 500:
          // Internal Server Error
          toast.error('Server error. Please try again later.');
          break;

        default:
          toast.error(data.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      // Request made but no response received (network error)
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
