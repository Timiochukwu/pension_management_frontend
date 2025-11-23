/**
 * BENEFIT CLAIM SERVICE
 *
 * Handles all benefit claim-related API calls
 */

import apiClient from './api';
import type { BenefitClaim, BenefitClaimRequest, ClaimApprovalRequest, PaginatedResponse, SearchParams } from '../types';

export const getAllClaims = async (params?: SearchParams): Promise<PaginatedResponse<BenefitClaim>> => {
  const response = await apiClient.get<PaginatedResponse<BenefitClaim>>('/benefits', { params });
  return response.data;
};

export const getClaimById = async (id: number): Promise<BenefitClaim> => {
  const response = await apiClient.get<BenefitClaim>(`/benefits/${id}`);
  return response.data;
};

export const getClaimsByMember = async (memberId: number): Promise<BenefitClaim[]> => {
  const response = await apiClient.get<BenefitClaim[]>(`/benefits/member/${memberId}`);
  return response.data;
};

export const createClaim = async (data: BenefitClaimRequest): Promise<BenefitClaim> => {
  const response = await apiClient.post<BenefitClaim>('/benefits', data);
  return response.data;
};

export const approveClaim = async (id: number, data: ClaimApprovalRequest): Promise<BenefitClaim> => {
  const response = await apiClient.put<BenefitClaim>(`/benefits/${id}/approve`, data);
  return response.data;
};

export const rejectClaim = async (id: number, reviewComments: string): Promise<BenefitClaim> => {
  const response = await apiClient.put<BenefitClaim>(`/benefits/${id}/reject`, { reviewComments });
  return response.data;
};

// NOTE: Backend doesn't have cancel endpoint yet - keeping for future implementation
export const cancelClaim = async (id: number): Promise<void> => {
  // TODO: Backend needs to implement PUT /benefits/{id}/cancel
  throw new Error('Cancel claim endpoint not yet implemented in backend');
  // await apiClient.put(`/benefits/${id}/cancel`);
};
