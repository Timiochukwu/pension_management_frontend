/**
 * DASHBOARD PAGE
 *
 * Vibrant 3D glassmorphism dashboard with stunning UI/UX
 * Features animated gradients, floating shapes, and modern design
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, DollarSign, FileText, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Clock } from 'lucide-react';
import { getDashboardStats, getContributionTrends } from '../../services/dashboardService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const DashboardPage: React.FC = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  const { data: trends } = useQuery({
    queryKey: ['contributionTrends'],
    queryFn: () => getContributionTrends('12months'),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 dashboard-gradient"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="floating-shape-delay absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Stats cards data with vibrant colors
  const statsCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'Total Contributions',
      value: `₦${(stats?.totalContributions || 0).toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      change: '+8%',
      isPositive: true,
    },
    {
      title: 'Pending Claims',
      value: stats?.pendingClaims || 0,
      icon: FileText,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-500/10 to-amber-500/10',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
      change: '-3%',
      isPositive: false,
    },
    {
      title: 'Monthly Growth',
      value: `${stats?.monthlyGrowth || 0}%`,
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      change: '+5%',
      isPositive: true,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      {/* Animated gradient background */}
      <div className="fixed inset-0 dashboard-gradient -z-10"></div>

      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-delay absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="floating-shape-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header with Gradient Text */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Welcome back!
                </span>
                <span className="ml-3">👋</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Here's what's happening with your pension system today.
              </p>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            const ChangeIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight;

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
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      <ChangeIcon className={`w-4 h-4 ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`} />
                      <span className={`text-sm font-semibold ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
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
                      from last month
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Contribution Trends Chart */}
          <div className="glass-card-3d rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-500" />
                  Contribution Trends
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 12 months performance</p>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl">
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  +18.2%
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trends?.datasets?.[0]?.data?.map((value, index) => ({
                month: trends.labels[index],
                amount: value
              })) || []}>
                <defs>
                  <linearGradient id="contributionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#contributionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Member Growth Chart */}
          <div className="glass-card-3d rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-emerald-500" />
                  Member Growth
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monthly registrations</p>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl">
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  +12.5%
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { month: 'Jan', members: 45 },
                { month: 'Feb', members: 52 },
                { month: 'Mar', members: 48 },
                { month: 'Apr', members: 61 },
                { month: 'May', members: 55 },
                { month: 'Jun', members: 67 },
              ]}>
                <defs>
                  <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar
                  dataKey="members"
                  fill="url(#memberGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-500" />
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest transactions and updates</p>
            </div>
            <button className="btn-3d px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { type: 'contribution', member: '12345', amount: '₦50,000', time: '2 hours ago', color: 'emerald' },
              { type: 'contribution', member: '12346', amount: '₦75,000', time: '4 hours ago', color: 'blue' },
              { type: 'claim', member: '12347', amount: '₦120,000', time: '6 hours ago', color: 'purple' },
              { type: 'contribution', member: '12348', amount: '₦60,000', time: '8 hours ago', color: 'cyan' },
              { type: 'registration', member: '12349', amount: 'New Member', time: '10 hours ago', color: 'pink' },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-card group hover:shadow-lg transition-all duration-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {item.type === 'registration' ? (
                    <Users className="w-6 h-6 text-white" />
                  ) : item.type === 'claim' ? (
                    <FileText className="w-6 h-6 text-white" />
                  ) : (
                    <DollarSign className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.type === 'contribution' ? 'New contribution received' : item.type === 'claim' ? 'Claim processed' : 'New member registered'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Member #{item.member} · {item.amount}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 dark:text-gray-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
