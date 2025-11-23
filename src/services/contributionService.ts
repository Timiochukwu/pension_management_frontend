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

/**
 * Get single contribution by ID
 * NOTE: Backend endpoint not implemented - fetches all and filters
 * TODO: Backend needs to implement GET /contributions/{id}
 */
export const getContributionById = async (id: number): Promise<Contribution> => {
  try {
    const response = await apiClient.get<Contribution>(`/contributions/${id}`);
    return response.data;
  } catch (error: any) {
    // Fallback: Get all contributions and find by ID
    if (error.response?.status === 404) {
      console.warn('Get contribution by ID endpoint not found, using fallback');
      const result = await getAllContributions({ page: 0, size: 1000 });
      const contribution = result.content.find(c => c.id === id);
      if (!contribution) {
        throw new Error('Contribution not found');
      }
      return contribution;
    }
    throw error;
  }
};

/**
 * Get contributions by member
 * NOTE: Backend endpoint not implemented - fetches all and filters
 * TODO: Backend needs to implement GET /contributions/member/{memberId}
 */
export const getContributionsByMember = async (memberId: number): Promise<Contribution[]> => {
  try {
    const response = await apiClient.get<Contribution[]>(`/contributions/member/${memberId}`);
    return response.data;
  } catch (error: any) {
    // Fallback: Get all contributions and filter by memberId
    if (error.response?.status === 404) {
      console.warn('Get contributions by member endpoint not found, using fallback');
      const result = await getAllContributions({ page: 0, size: 1000 });
      return result.content.filter(c => c.memberId === memberId);
    }
    throw error;
  }
};

export const createContribution = async (data: ContributionRequest): Promise<Contribution> => {
  const response = await apiClient.post<Contribution>('/contributions', data);
  return response.data;
};

/**
 * Update contribution status
 * NOTE: Backend endpoint not implemented - disabled
 * TODO: Backend needs to implement PATCH /contributions/{id}/status
 */
export const updateContributionStatus = async (id: number, status: string): Promise<Contribution> => {
  try {
    const response = await apiClient.patch<Contribution>(`/contributions/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Update contribution status endpoint not yet implemented in backend');
    }
    throw error;
  }
};

/**
 * Delete contribution
 * NOTE: Backend endpoint not implemented - disabled
 * TODO: Backend needs to implement DELETE /contributions/{id}
 */
export const deleteContribution = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/contributions/${id}`);
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 405) {
      throw new Error('Delete contribution endpoint not yet implemented in backend');
    }
    throw error;
  }
};
