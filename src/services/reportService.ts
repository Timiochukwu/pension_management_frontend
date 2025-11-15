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

export const getReportStatus = async (id: number): Promise<Report> => {
  const response = await apiClient.get<Report>(`/reports/${id}/status`);
  return response.data;
};
