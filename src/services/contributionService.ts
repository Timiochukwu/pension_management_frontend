/**
 * CONTRIBUTION SERVICE
 *
 * Handles all contribution-related API calls
 */

import apiClient from './api';
import type { Contribution, ContributionRequest, PaginatedResponse, SearchParams } from '../types';

export const getAllContributions = async (params?: SearchParams): Promise<PaginatedResponse<Contribution>> => {
  const response = await apiClient.get<PaginatedResponse<Contribution>>('/contributions', { params });
  return response.data;
};

export const getContributionById = async (id: number): Promise<Contribution> => {
  const response = await apiClient.get<Contribution>(`/contributions/${id}`);
  return response.data;
};

export const getContributionsByMember = async (memberId: number): Promise<Contribution[]> => {
  const response = await apiClient.get<Contribution[]>(`/contributions/member/${memberId}`);
  return response.data;
};

export const createContribution = async (data: ContributionRequest): Promise<Contribution> => {
  const response = await apiClient.post<Contribution>('/contributions', data);
  return response.data;
};

export const updateContributionStatus = async (id: number, status: string): Promise<Contribution> => {
  const response = await apiClient.patch<Contribution>(`/contributions/${id}/status`, { status });
  return response.data;
};

export const deleteContribution = async (id: number): Promise<void> => {
  await apiClient.delete(`/contributions/${id}`);
};
