/**
 * PAYMENT SERVICE
 *
 * Handles all payment-related API calls for Paystack and Flutterwave
 */

import apiClient from './api';
import type { Payment, PaymentRequest } from '../types';

/**
 * Initialize Paystack payment
 * Uses generic /payments/initialize endpoint with gateway parameter
 */
export const initializePaystackPayment = async (data: PaymentRequest): Promise<any> => {
  const response = await apiClient.post('/payments/initialize', {
    ...data,
    gateway: 'PAYSTACK'
  });
  return response.data;
};

/**
 * Verify Paystack payment
 */
export const verifyPaystackPayment = async (reference: string): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`/payments/verify/${reference}`);
  return response.data;
};

/**
 * Initialize Flutterwave payment
 * Uses generic /payments/initialize endpoint with gateway parameter
 */
export const initializeFlutterwavePayment = async (data: PaymentRequest): Promise<any> => {
  const response = await apiClient.post('/payments/initialize', {
    ...data,
    gateway: 'FLUTTERWAVE'
  });
  return response.data;
};

/**
 * Verify Flutterwave payment
 */
export const verifyFlutterwavePayment = async (transactionId: string): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`/payments/verify/${transactionId}`);
  return response.data;
};

/**
 * Get all payments
 */
export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await apiClient.get<Payment[]>('/payments');
  return response.data;
};

/**
 * Get payment by ID
 */
export const getPaymentById = async (id: number): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`/payments/${id}`);
  return response.data;
};

/**
 * Get payments by member
 * NOTE: Backend endpoint not yet implemented - returns all payments filtered client-side
 */
export const getPaymentsByMember = async (memberId: number): Promise<Payment[]> => {
  try {
    // Try backend endpoint first (when implemented)
    const response = await apiClient.get<Payment[]>(`/payments/member/${memberId}`);
    return response.data;
  } catch (error: any) {
    // Fallback: Get all payments and filter client-side
    if (error.response?.status === 404) {
      const allPayments = await getAllPayments();
      return allPayments.filter(payment => payment.memberId === memberId);
    }
    throw error;
  }
};
