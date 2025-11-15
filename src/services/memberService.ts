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
 */
export const searchMembers = async (query: string): Promise<Member[]> => {
  const response = await apiClient.get<Member[]>('/members/search', {
    params: { query }
  });
  return response.data;
};

/**
 * GET MEMBER STATISTICS
 *
 * Gets member's contribution and benefit statistics
 */
export const getMemberStats = async (id: number): Promise<any> => {
  const response = await apiClient.get(`/members/${id}/stats`);
  return response.data;
};
