/**
 * PAYMENT SERVICE
 *
 * Handles all payment-related API calls for Paystack and Flutterwave
 */

import apiClient from './api';
import type { Payment, PaymentRequest } from '../types';

/**
 * Initialize Paystack payment
 */
export const initializePaystackPayment = async (data: PaymentRequest): Promise<any> => {
  const response = await apiClient.post('/payments/paystack/initialize', data);
  return response.data;
};

/**
 * Verify Paystack payment
 */
export const verifyPaystackPayment = async (reference: string): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`/payments/paystack/verify/${reference}`);
  return response.data;
};

/**
 * Initialize Flutterwave payment
 */
export const initializeFlutterwavePayment = async (data: PaymentRequest): Promise<any> => {
  const response = await apiClient.post('/payments/flutterwave/initialize', data);
  return response.data;
};

/**
 * Verify Flutterwave payment
 */
export const verifyFlutterwavePayment = async (transactionId: string): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`/payments/flutterwave/verify/${transactionId}`);
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
 */
export const getPaymentsByMember = async (memberId: number): Promise<Payment[]> => {
  const response = await apiClient.get<Payment[]>(`/payments/member/${memberId}`);
  return response.data;
};
