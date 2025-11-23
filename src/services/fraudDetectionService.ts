/**
 * FRAUD DETECTION SERVICE
 *
 * ML-powered fraud detection and risk assessment services
 * Integrates with backend ML endpoints for real-time fraud detection
 */

import apiClient from './api';
import type {
  FraudDetectionRequest,
  FraudDetectionResponse,
  RiskAssessmentResponse,
  ApiResponse
} from '../types';

/**
 * Detect fraud in a transaction using ML model
 * POST /api/v1/ml/fraud-detection
 */
export const detectFraud = async (
  data: FraudDetectionRequest
): Promise<FraudDetectionResponse> => {
  const response = await apiClient.post<ApiResponse<FraudDetectionResponse>>(
    '/v1/ml/fraud-detection',
    data
  );
  return response.data.data;
};

/**
 * Assess risk for a specific member
 * GET /api/v1/ml/risk-assessment/{memberId}
 */
export const assessMemberRisk = async (
  memberId: number
): Promise<RiskAssessmentResponse> => {
  const response = await apiClient.get<ApiResponse<RiskAssessmentResponse>>(
    `/v1/ml/risk-assessment/${memberId}`
  );
  return response.data.data;
};

/**
 * Helper to get browser device fingerprint
 */
export const getDeviceFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
    return canvas.toDataURL().substring(0, 50);
  }
  return 'unknown';
};

/**
 * Helper to get client IP address (note: in production, backend should extract this)
 */
export const getClientInfo = () => {
  return {
    userAgent: navigator.userAgent,
    deviceFingerprint: getDeviceFingerprint(),
    timestamp: new Date().toISOString()
  };
};

/**
 * Check transaction for fraud with automatic client info
 */
export const checkTransaction = async (
  memberId: number,
  amount: number,
  paymentMethod: string,
  additionalData?: Partial<FraudDetectionRequest>
): Promise<FraudDetectionResponse> => {
  const clientInfo = getClientInfo();

  const request: FraudDetectionRequest = {
    memberId,
    amount,
    paymentMethod,
    ...clientInfo,
    ...additionalData
  };

  return detectFraud(request);
};
