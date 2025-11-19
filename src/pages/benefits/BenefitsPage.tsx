/**
 * BENEFIT CLAIMS PAGE
 *
 * Vibrant 3D glassmorphism benefit claims management page
 * Features stunning UI for managing benefit claims and approvals
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Gift, CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, Filter, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllClaims } from '../../services/benefitService';
import { exportBenefitClaims } from '../../utils/exportUtils';
import type { BenefitClaim } from '../../types';

export const BenefitsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const { data, isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: () => getAllClaims({ page: 0, size: 20 }),
  });

  // Handle export
  const handleExport = () => {
    if (!data?.content || data.content.length === 0) {
      toast.error('No benefit claims to export');
      return;
    }
    exportBenefitClaims(data.content, 'csv');
    toast.success(`Exported ${data.content.length} benefit claims to CSV`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { gradient: string; icon: React.ReactNode }> = {
      APPROVED: {
        gradient: 'from-emerald-500 to-teal-500',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      PENDING: {
        gradient: 'from-amber-500 to-orange-500',
        icon: <Clock className="w-3 h-3" />,
      },
      REJECTED: {
        gradient: 'from-red-500 to-rose-500',
        icon: <XCircle className="w-3 h-3" />,
      },
      PAID: {
        gradient: 'from-blue-500 to-cyan-500',
        icon: <CheckCircle className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const getClaimTypeIcon = (type: string) => {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-800">
        <Gift className="w-3 h-3" />
        {type}
      </span>
    );
  };

  // Calculate stats
  const totalRequested = data?.content?.reduce((sum, c) => sum + c.requestedAmount, 0) || 0;
  const approvedCount = data?.content?.filter(c => c.status === 'APPROVED' || c.status === 'PAID').length || 0;
  const pendingCount = data?.content?.filter(c => c.status === 'PENDING').length || 0;
  const rejectedCount = data?.content?.filter(c => c.status === 'REJECTED').length || 0;

  const statsCards = [
    {
      title: 'Total Claimed',
      value: `₦${totalRequested.toLocaleString()}`,
      icon: Gift,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      change: `${data?.totalElements || 0} claims`,
    },
    {
      title: 'Approved',
      value: approvedCount,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      change: 'Successfully processed',
    },
    {
      title: 'Pending Review',
      value: pendingCount,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
      change: 'Awaiting action',
    },
    {
      title: 'Rejected',
      value: rejectedCount,
      icon: XCircle,
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-500/10 to-rose-500/10',
      iconBg: 'bg-gradient-to-br from-red-500 to-rose-500',
      change: 'Did not qualify',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      {/* Animated gradient background */}
      <div className="fixed inset-0 dashboard-gradient -z-10"></div>

      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-delay absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 flex items-center gap-3">
                  <Gift className="w-10 h-10 text-purple-600" />
                  Benefit Claims
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                {data?.totalElements || 0} total benefit claims submitted
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="btn-3d px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Export Claims
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="glass-card-3d rounded-2xl p-6 border border-white/20 group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {stat.change}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="glass-card-3d rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</span>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'PAID'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filterStatus === status
                    ? 'btn-3d bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'glass-card text-gray-700 dark:text-gray-300 hover:shadow-lg'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Table */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading benefit claims...</p>
            </div>
          ) : data?.content && data.content.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Claim ID</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Member</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Type</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Requested</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Approved</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content.map((claim: BenefitClaim) => (
                      <tr
                        key={claim.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-purple-900/10 dark:hover:to-pink-900/10 transition-all duration-200"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">#{claim.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{claim.memberName}</p>
                        </td>
                        <td className="py-4 px-4">
                          {getClaimTypeIcon(claim.claimType)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            ₦{claim.requestedAmount.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            {claim.approvedAmount ? `₦${claim.approvedAmount.toLocaleString()}` : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(claim.status)}
                        </td>
                        <td className="py-4 px-4">
                          {claim.status === 'PENDING' && (
                            <div className="flex gap-2">
                              <button className="btn-3d px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Approve
                              </button>
                              <button className="btn-3d px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {data.content.map((claim: BenefitClaim) => (
                  <div
                    key={claim.id}
                    className="glass-card rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{claim.memberName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">#{claim.id}</p>
                      </div>
                      {getStatusBadge(claim.status)}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Claim Type</p>
                        {getClaimTypeIcon(claim.claimType)}
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Requested</p>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            ₦{claim.requestedAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-500">Approved</p>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            {claim.approvedAmount ? `₦${claim.approvedAmount.toLocaleString()}` : '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {claim.status === 'PENDING' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex-1 btn-3d py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex-1 btn-3d py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center mb-6">
                <Gift className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No benefit claims found</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Benefit claims will appear here when members submit requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
