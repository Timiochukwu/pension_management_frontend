/**
 * CONTRIBUTIONS PAGE
 *
 * Manage member contributions and payments
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { getAllContributions } from '../../services/contributionService';
import type { Contribution } from '../../types';

export const ContributionsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['contributions'],
    queryFn: () => getAllContributions({ page: 0, size: 20 }),
  });

  const getStatusBadge = (status: string) => {
    const variants = { COMPLETED: 'success', PENDING: 'warning', FAILED: 'danger' } as const;
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader title="Contributions" subtitle={`${data?.totalElements || 0} total contributions`} />
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>ID</TableCell>
              <TableCell header>Member</TableCell>
              <TableCell header>Amount</TableCell>
              <TableCell header>Type</TableCell>
              <TableCell header>Date</TableCell>
              <TableCell header>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.content?.map((contribution: Contribution) => (
              <TableRow key={contribution.id}>
                <TableCell>#{contribution.id}</TableCell>
                <TableCell>{contribution.memberName}</TableCell>
                <TableCell className="font-medium text-green-600">
                  ₦{contribution.amount.toLocaleString()}
                </TableCell>
                <TableCell>{contribution.contributionType}</TableCell>
                <TableCell>{new Date(contribution.contributionDate).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(contribution.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
