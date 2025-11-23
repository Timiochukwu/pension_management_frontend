/**
 * REPORT SERVICE
 *
 * Handles all report generation and download
 */

import apiClient from './api';
import type { Report, ReportRequest } from '../types';

export const getAllReports = async (): Promise<Report[]> => {
  const response = await apiClient.get<Report[]>('/reports');
  return response.data;
};

export const generateReport = async (data: ReportRequest): Promise<Report> => {
  const response = await apiClient.post<Report>('/reports/generate', data);
  return response.data;
};

export const downloadReport = async (id: number): Promise<Blob> => {
  const response = await apiClient.get(`/reports/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const deleteReport = async (id: number): Promise<void> => {
  await apiClient.delete(`/reports/${id}`);
};

/**
 * Get report generation status
 * NOTE: Backend endpoint not implemented - falls back to getting full report
 * TODO: Backend needs to implement GET /reports/{id}/status
 */
export const getReportStatus = async (id: number): Promise<Report> => {
  try {
    const response = await apiClient.get<Report>(`/reports/${id}/status`);
    return response.data;
  } catch (error: any) {
    // Fallback: Get all reports and find by ID
    if (error.response?.status === 404) {
      console.warn('Report status endpoint not found, fetching all reports');
      const allReports = await getAllReports();
      const report = allReports.find(r => r.id === id);
      if (!report) {
        throw new Error('Report not found');
      }
      return report;
    }
    throw error;
  }
};
