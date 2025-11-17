/**
 * MEMBERS PAGE
 *
 * Vibrant 3D glassmorphism members management page
 * Features stunning UI with search, filter, create, edit, delete capabilities
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Eye, Users, Filter, Download, UserPlus } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { getAllMembers } from '../../services/memberService';
import { CreateMemberForm } from '../../components/members/CreateMemberForm';
import type { Member } from '../../types';

export const MembersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch members
  const { data: membersData, isLoading } = useQuery({
    queryKey: ['members', searchQuery],
    queryFn: () => getAllMembers({ query: searchQuery, page: 0, size: 20 }),
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; gradient: string; text: string }> = {
      ACTIVE: {
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-500',
        text: 'Active',
      },
      INACTIVE: {
        color: 'amber',
        gradient: 'from-amber-500 to-orange-500',
        text: 'Inactive',
      },
      SUSPENDED: {
        color: 'red',
        gradient: 'from-red-500 to-rose-500',
        text: 'Suspended',
      },
    };

    const config = statusConfig[status] || statusConfig.INACTIVE;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
        {config.text}
      </span>
    );
  };

  const getAccountTypeIcon = (type: string) => {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800">
        {type}
      </span>
    );
  };

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
        {/* Page Header */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center gap-3">
                  <Users className="w-10 h-10 text-blue-600" />
                  Member Management
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                {membersData?.totalElements || 0} total members in the system
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-3d px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg">
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-3d px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                Add Member
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card-3d rounded-3xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-3d w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Filter Button */}
            <button className="glass-card px-6 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-200 flex items-center gap-2 border border-gray-200 dark:border-gray-700">
              <Filter className="w-5 h-5 text-blue-600" />
              Filters
            </button>
          </div>
        </div>

        {/* Members Table/Grid */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading members...</p>
            </div>
          ) : membersData?.content && membersData.content.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Member ID</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Name</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Contact</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Account Type</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Balance</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membersData.content.map((member: Member, index: number) => (
                      <tr
                        key={member.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-blue-900/10 dark:hover:to-cyan-900/10 transition-all duration-200 group"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">#{member.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              Enrolled: {new Date(member.enrollmentDate).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="text-gray-900 dark:text-white">{member.email}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{member.phoneNumber}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getAccountTypeIcon(member.accountType)}
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(member.accountStatus)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            ₦{member.availableBalance?.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {membersData.content.map((member: Member) => (
                  <div
                    key={member.id}
                    className="glass-card rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">#{member.id}</p>
                      </div>
                      {getStatusBadge(member.accountStatus)}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                        <p className="text-sm text-gray-900 dark:text-white">{member.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
                        <p className="text-sm text-gray-900 dark:text-white">{member.phoneNumber}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Account Type</p>
                          {getAccountTypeIcon(member.accountType)}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-500">Balance</p>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            ₦{member.availableBalance?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex-1 btn-3d py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex-1 btn-3d py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 btn-3d py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {membersData.totalPages > 1 && (
                <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{membersData.content.length}</span> of{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">{membersData.totalElements}</span> members
                  </p>
                  <div className="flex gap-2">
                    <button className="btn-3d px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-200">
                      Previous
                    </button>
                    <button className="btn-3d px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No members found</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by adding your first member</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-3d px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add First Member
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Member Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Member"
        size="xl"
      >
        <CreateMemberForm onSuccess={() => setIsCreateModalOpen(false)} />
      </Modal>
    </div>
  );
};
