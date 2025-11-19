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

export const getMemberGrowth = async (): Promise<ChartData> => {
  const response = await apiClient.get<ChartData>('/analytics/members/growth');
  return response.data;
};

export const getClaimAnalytics = async (): Promise<any> => {
  const response = await apiClient.get('/analytics/claims');
  return response.data;
};

export const getRecentActivity = async (limit: number = 5): Promise<RecentActivity[]> => {
  const response = await apiClient.get<RecentActivity[]>('/analytics/recent-activity', {
    params: { limit }
  });
  return response.data;
};
