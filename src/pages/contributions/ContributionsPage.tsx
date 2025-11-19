/**
 * CONTRIBUTIONS PAGE
 *
 * Vibrant 3D glassmorphism contributions management page
 * Features stunning UI for managing member contributions and payments
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp, Clock, CheckCircle, XCircle, Filter, Download, Calendar, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllContributions } from '../../services/contributionService';
import type { Contribution } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { CreateContributionForm } from '../../components/contributions/CreateContributionForm';
import { exportContributions } from '../../utils/exportUtils';

export const ContributionsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['contributions'],
    queryFn: () => getAllContributions({ page: 0, size: 20 }),
  });

  // Handle export
  const handleExport = () => {
    if (!data?.content || data.content.length === 0) {
      toast.error('No contributions to export');
      return;
    }
    exportContributions(data.content, 'csv');
    toast.success(`Exported ${data.content.length} contributions to CSV`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { gradient: string; icon: React.ReactNode }> = {
      COMPLETED: {
        gradient: 'from-emerald-500 to-teal-500',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      PENDING: {
        gradient: 'from-amber-500 to-orange-500',
        icon: <Clock className="w-3 h-3" />,
      },
      FAILED: {
        gradient: 'from-red-500 to-rose-500',
        icon: <XCircle className="w-3 h-3" />,
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

  const getContributionTypeIcon = (type: string) => {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-800">
        <CreditCard className="w-3 h-3" />
        {type}
      </span>
    );
  };

  // Calculate stats
  const totalAmount = data?.content?.reduce((sum, c) => sum + c.amount, 0) || 0;
  const completedCount = data?.content?.filter(c => c.status === 'COMPLETED').length || 0;
  const pendingCount = data?.content?.filter(c => c.status === 'PENDING').length || 0;

  const statsCards = [
    {
      title: 'Total Contributions',
      value: `₦${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      change: '+12.5%',
    },
    {
      title: 'Completed',
      value: completedCount,
      icon: CheckCircle,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      change: `${data?.totalElements || 0} total`,
    },
    {
      title: 'Pending',
      value: pendingCount,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
      change: 'In process',
    },
    {
      title: 'Monthly Growth',
      value: '+18.2%',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      change: 'vs last month',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      {/* Animated gradient background */}
      <div className="fixed inset-0 dashboard-gradient -z-10"></div>

      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-delay absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 flex items-center gap-3">
                  <DollarSign className="w-10 h-10 text-emerald-600" />
                  Contributions
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                {data?.totalElements || 0} total contributions recorded
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="btn-3d px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-3d px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Add Contribution
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
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  {/* Icon with gradient */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Stats */}
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

                {/* Shimmer effect on hover */}
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
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by status:</span>
            {['ALL', 'COMPLETED', 'PENDING', 'FAILED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filterStatus === status
                    ? 'btn-3d bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'glass-card text-gray-700 dark:text-gray-300 hover:shadow-lg'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Contributions Table */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading contributions...</p>
            </div>
          ) : data?.content && data.content.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">ID</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Member</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Type</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content.map((contribution: Contribution) => (
                      <tr
                        key={contribution.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/10 dark:hover:to-teal-900/10 transition-all duration-200"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">#{contribution.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{contribution.memberName}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            ₦{contribution.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {getContributionTypeIcon(contribution.contributionType)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(contribution.contributionDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(contribution.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {data.content.map((contribution: Contribution) => (
                  <div
                    key={contribution.id}
                    className="glass-card rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{contribution.memberName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">#{contribution.id}</p>
                      </div>
                      {getStatusBadge(contribution.status)}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Amount</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                          ₦{contribution.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Type</p>
                          {getContributionTypeIcon(contribution.contributionType)}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-500">Date</p>
                          <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(contribution.contributionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center mb-6">
                <DollarSign className="w-12 h-12 text-emerald-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No contributions found</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Contributions will appear here when members make payments</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Contribution Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Contribution"
        size="lg"
      >
        <CreateContributionForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
