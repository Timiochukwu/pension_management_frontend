/**
 * BENEFIT CLAIM SERVICE
 *
 * Handles all benefit claim-related API calls
 */

import apiClient from './api';
import type { BenefitClaim, BenefitClaimRequest, ClaimApprovalRequest, PaginatedResponse, SearchParams } from '../types';

export const getAllClaims = async (params?: SearchParams): Promise<PaginatedResponse<BenefitClaim>> => {
  const response = await apiClient.get<PaginatedResponse<BenefitClaim>>('/benefits/claims', { params });
  return response.data;
};

export const getClaimById = async (id: number): Promise<BenefitClaim> => {
  const response = await apiClient.get<BenefitClaim>(`/benefits/claims/${id}`);
  return response.data;
};

export const getClaimsByMember = async (memberId: number): Promise<BenefitClaim[]> => {
  const response = await apiClient.get<BenefitClaim[]>(`/benefits/claims/member/${memberId}`);
  return response.data;
};

export const createClaim = async (data: BenefitClaimRequest): Promise<BenefitClaim> => {
  const response = await apiClient.post<BenefitClaim>('/benefits/claims', data);
  return response.data;
};

export const approveClaim = async (id: number, data: ClaimApprovalRequest): Promise<BenefitClaim> => {
  const response = await apiClient.post<BenefitClaim>(`/benefits/claims/${id}/approve`, data);
  return response.data;
};

export const rejectClaim = async (id: number, reviewComments: string): Promise<BenefitClaim> => {
  const response = await apiClient.post<BenefitClaim>(`/benefits/claims/${id}/reject`, { reviewComments });
  return response.data;
};

export const cancelClaim = async (id: number): Promise<void> => {
  await apiClient.post(`/benefits/claims/${id}/cancel`);
};
