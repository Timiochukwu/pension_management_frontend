/**
 * BENEFIT CLAIMS PAGE
 *
 * Manage benefit claims and approvals
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getAllClaims } from '../../services/benefitService';
import type { BenefitClaim } from '../../types';

export const BenefitsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: () => getAllClaims({ page: 0, size: 20 }),
  });

  const getStatusBadge = (status: string) => {
    const variants = { APPROVED: 'success', PENDING: 'warning', REJECTED: 'danger', PAID: 'success' };
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader title="Benefit Claims" subtitle={`${data?.totalElements || 0} total claims`} />
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>Claim ID</TableCell>
              <TableCell header>Member</TableCell>
              <TableCell header>Type</TableCell>
              <TableCell header>Requested</TableCell>
              <TableCell header>Approved</TableCell>
              <TableCell header>Status</TableCell>
              <TableCell header>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.content?.map((claim: BenefitClaim) => (
              <TableRow key={claim.id}>
                <TableCell>#{claim.id}</TableCell>
                <TableCell>{claim.memberName}</TableCell>
                <TableCell>{claim.claimType}</TableCell>
                <TableCell>₦{claim.requestedAmount.toLocaleString()}</TableCell>
                <TableCell>₦{claim.approvedAmount?.toLocaleString() || '-'}</TableCell>
                <TableCell>{getStatusBadge(claim.status)}</TableCell>
                <TableCell>
                  {claim.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="success">Approve</Button>
                      <Button size="sm" variant="danger">Reject</Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
