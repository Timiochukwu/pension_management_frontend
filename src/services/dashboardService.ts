/**
 * DASHBOARD SERVICE
 *
 * Handles analytics and dashboard statistics
 */

import apiClient from './api';
import type { DashboardStats, ChartData, RecentActivity } from '../types';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<DashboardStats>('/analytics/dashboard');
  return response.data;
};

export const getContributionTrends = async (period: string = '12months'): Promise<ChartData> => {
  const response = await apiClient.get<ChartData>('/analytics/contributions/trends', {
    params: { period }
  });
  return response.data;
};

/**
 * Get member growth analytics
 * NOTE: Backend endpoint not implemented - using status-distribution as fallback
 * TODO: Backend needs to implement GET /analytics/members/growth
 */
export const getMemberGrowth = async (): Promise<ChartData> => {
  try {
    const response = await apiClient.get<ChartData>('/analytics/members/growth');
    return response.data;
  } catch (error: any) {
    // Fallback to status distribution or return empty data
    if (error.response?.status === 404) {
      console.warn('Member growth endpoint not found, using fallback');
      return {
        labels: [],
        data: [],
        period: '12months'
      };
    }
    throw error;
  }
};

/**
 * Get claim analytics
 * NOTE: Backend endpoint not implemented - returns empty data
 * TODO: Backend needs to implement GET /analytics/claims
 */
export const getClaimAnalytics = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/analytics/claims');
    return response.data;
  } catch (error: any) {
    // Return empty analytics if endpoint not found
    if (error.response?.status === 404) {
      console.warn('Claims analytics endpoint not found, using fallback');
      return {
        totalClaims: 0,
        approvedClaims: 0,
        pendingClaims: 0,
        rejectedClaims: 0,
        totalClaimAmount: '₦0.00'
      };
    }
    throw error;
  }
};

export const getRecentActivity = async (limit: number = 5): Promise<RecentActivity[]> => {
  const response = await apiClient.get<RecentActivity[]>('/analytics/recent-activity', {
    params: { limit }
  });
  return response.data;
};
