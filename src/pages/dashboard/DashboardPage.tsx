/**
 * DASHBOARD PAGE
 *
 * Main dashboard with statistics and charts
 * Shows overview of members, contributions, and claims
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { getDashboardStats, getContributionTrends } from '../../services/dashboardService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'primary',
      change: '+12%',
    },
    {
      title: 'Total Contributions',
      value: `₦${(stats?.totalContributions || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'success',
      change: '+8%',
    },
    {
      title: 'Pending Claims',
      value: stats?.pendingClaims || 0,
      icon: FileText,
      color: 'warning',
      change: '-3%',
    },
    {
      title: 'Monthly Growth',
      value: `${stats?.monthlyGrowth || 0}%`,
      icon: TrendingUp,
      color: 'primary',
      change: '+5%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h2>
        <p className="text-gray-600 mt-1">Here's what's happening with your pension system today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`stats-card stats-card-${stat.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-success-600 mt-2">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contribution Trends */}
        <Card>
          <CardHeader title="Contribution Trends" subtitle="Last 12 months" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends?.datasets?.[0]?.data?.map((value, index) => ({
              month: trends.labels[index],
              amount: value
            })) || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Member Growth */}
        <Card>
          <CardHeader title="Member Growth" subtitle="Monthly registrations" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: 'Jan', members: 45 },
              { month: 'Feb', members: 52 },
              { month: 'Mar', members: 48 },
              { month: 'Apr', members: 61 },
              { month: 'May', members: 55 },
              { month: 'Jun', members: 67 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="members" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader title="Recent Activity" subtitle="Latest transactions and updates" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 py-3 border-b last:border-0">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New contribution received</p>
                <p className="text-xs text-gray-500">Member #12345 - ₦50,000</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
