/**
 * REPORTS PAGE
 *
 * Vibrant 3D glassmorphism reports management page
 * Features stunning UI for generating and downloading reports
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Download, BarChart3, FileSpreadsheet, Calendar, TrendingUp, Users, DollarSign, Gift } from 'lucide-react';
import { getAllReports } from '../../services/reportService';

export const ReportsPage: React.FC = () => {
  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: getAllReports,
  });

  const reportTypes = [
    {
      type: 'MEMBER_SUMMARY',
      title: 'Member Summary Report',
      description: 'Complete member list with balances and details',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      type: 'CONTRIBUTION_ANALYSIS',
      title: 'Contribution Analysis',
      description: 'Detailed contribution breakdown and trends',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      type: 'BENEFIT_CLAIMS',
      title: 'Benefit Claims Report',
      description: 'All claims and their approval status',
      icon: Gift,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      type: 'FINANCIAL_OVERVIEW',
      title: 'Financial Overview',
      description: 'Complete financial summary and statistics',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-500/10 to-amber-500/10',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      {/* Animated gradient background */}
      <div className="fixed inset-0 dashboard-gradient -z-10"></div>

      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-delay absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 flex items-center gap-3">
                  <BarChart3 className="w-10 h-10 text-orange-600" />
                  Reports & Analytics
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                Generate comprehensive reports and download financial data
              </p>
            </div>
          </div>
        </div>

        {/* Generate New Report Section */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Generate New Report
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Select report type to generate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.type}
                  className="glass-card rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden relative"
                >
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${report.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {report.description}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 btn-3d px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 transition-all duration-200 flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        PDF
                      </button>
                      <button className="flex-1 btn-3d px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Excel
                      </button>
                    </div>
                  </div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Report History */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              Report History
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Previously generated reports</p>
          </div>

          {reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="glass-card group hover:shadow-lg transition-all duration-200 rounded-2xl p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-base">
                        {report.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Generated on {new Date(report.generatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="btn-3d px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No reports yet</p>
              <p className="text-gray-600 dark:text-gray-400">Generated reports will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
