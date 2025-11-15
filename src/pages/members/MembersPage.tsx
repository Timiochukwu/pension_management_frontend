/**
 * MEMBERS PAGE
 *
 * List and manage all pension members
 * Features: Search, filter, create, edit, delete
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
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
    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
      ACTIVE: 'success',
      INACTIVE: 'warning',
      SUSPENDED: 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Member Management"
          subtitle={`${membersData?.totalElements || 0} total members`}
          action={
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          }
        />

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search members by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Members Table */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading members...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Member ID</TableCell>
                <TableCell header>Name</TableCell>
                <TableCell header>Email</TableCell>
                <TableCell header>Phone</TableCell>
                <TableCell header>Account Type</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Balance</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersData?.content?.map((member: Member) => (
                <TableRow key={member.id}>
                  <TableCell>#{member.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.firstName} {member.lastName}</p>
                      <p className="text-xs text-gray-500">Enrolled: {new Date(member.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phoneNumber}</TableCell>
                  <TableCell>{member.accountType}</TableCell>
                  <TableCell>{getStatusBadge(member.accountStatus)}</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      ₦{member.availableBalance?.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-danger-600 hover:text-danger-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        {membersData && membersData.totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {membersData.content.length} of {membersData.totalElements} members
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Previous</Button>
              <Button variant="secondary" size="sm">Next</Button>
            </div>
          </div>
        )}
      </Card>

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
