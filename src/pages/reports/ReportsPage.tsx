/**
 * REPORTS PAGE
 *
 * Generate and download reports
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Download } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getAllReports } from '../../services/reportService';

export const ReportsPage: React.FC = () => {
  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: getAllReports,
  });

  const reportTypes = [
    { type: 'MEMBER_SUMMARY', title: 'Member Summary Report', description: 'Complete member list with balances' },
    { type: 'CONTRIBUTION_ANALYSIS', title: 'Contribution Analysis', description: 'Detailed contribution breakdown' },
    { type: 'BENEFIT_CLAIMS', title: 'Benefit Claims Report', description: 'All claims and their status' },
    { type: 'FINANCIAL_OVERVIEW', title: 'Financial Overview', description: 'Complete financial summary' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Generate New Report" subtitle="Select report type to generate" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div key={report.type} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="primary">Generate PDF</Button>
                <Button size="sm" variant="secondary">Generate Excel</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Report History" subtitle="Previously generated reports" />
        <div className="space-y-3">
          {reports?.map((report) => (
            <div key={report.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-xs text-gray-500">
                    Generated on {new Date(report.generatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
