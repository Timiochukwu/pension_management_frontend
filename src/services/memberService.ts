/**
 * MEMBER SERVICE
 *
 * Handles all member-related API calls
 * - Get all members
 * - Get member by ID
 * - Create member
 * - Update member
 * - Delete member
 * - Search members
 */

import apiClient from './api';
import type { Member, MemberRequest, PaginatedResponse, SearchParams } from '../types';

/**
 * GET ALL MEMBERS
 *
 * Fetches paginated list of members
 */
export const getAllMembers = async (params?: SearchParams): Promise<PaginatedResponse<Member>> => {
  const response = await apiClient.get<PaginatedResponse<Member>>('/members', { params });
  return response.data;
};

/**
 * GET MEMBER BY ID
 *
 * Fetches a single member by ID
 */
export const getMemberById = async (id: number): Promise<Member> => {
  const response = await apiClient.get<Member>(`/members/${id}`);
  return response.data;
};

/**
 * CREATE MEMBER
 *
 * Creates a new member
 * Triggers welcome email automatically
 */
export const createMember = async (data: MemberRequest): Promise<Member> => {
  const response = await apiClient.post<Member>('/members', data);
  return response.data;
};

/**
 * UPDATE MEMBER
 *
 * Updates an existing member
 */
export const updateMember = async (id: number, data: Partial<MemberRequest>): Promise<Member> => {
  const response = await apiClient.put<Member>(`/members/${id}`, data);
  return response.data;
};

/**
 * DELETE MEMBER
 *
 * Deletes a member (soft delete)
 */
export const deleteMember = async (id: number): Promise<void> => {
  await apiClient.delete(`/members/${id}`);
};

/**
 * SEARCH MEMBERS
 *
 * Searches members by name, email, or phone
 * NOTE: Backend endpoint not implemented - using getAllMembers with search param as fallback
 * TODO: Backend needs to implement GET /members/search?query=
 */
export const searchMembers = async (query: string): Promise<Member[]> => {
  try {
    const response = await apiClient.get<Member[]>('/members/search', {
      params: { query }
    });
    return response.data;
  } catch (error: any) {
    // Fallback: Use pagination endpoint with search param
    if (error.response?.status === 404) {
      console.warn('Member search endpoint not found, using getAllMembers fallback');
      const result = await getAllMembers({ search: query, page: 0, size: 100 });
      return result.content;
    }
    throw error;
  }
};

/**
 * GET MEMBER STATISTICS
 *
 * Gets member's contribution and benefit statistics
 * NOTE: Backend endpoint not implemented - returns empty stats
 * TODO: Backend needs to implement GET /members/{id}/stats
 */
export const getMemberStats = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.get(`/members/${id}/stats`);
    return response.data;
  } catch (error: any) {
    // Return empty stats if endpoint not found
    if (error.response?.status === 404) {
      console.warn('Member stats endpoint not found, returning empty stats');
      return {
        totalContributions: '₦0.00',
        contributionCount: 0,
        totalBenefits: '₦0.00',
        benefitCount: 0,
        lastContributionDate: null
      };
    }
    throw error;
  }
};
