/**
 * CREATE CONTRIBUTION FORM
 *
 * Form for adding new contributions
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { createContribution } from '../../services/contributionService';
import { getAllMembers } from '../../services/memberService';
import { ContributionType } from '../../types';

const contributionSchema = z.object({
  memberId: z.number().min(1, 'Please select a member'),
  amount: z.number().min(1, 'Amount must be at least 1'),
  contributionType: z.nativeEnum(ContributionType),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  description: z.string().optional(),
});

type ContributionFormData = z.infer<typeof contributionSchema>;

interface CreateContributionFormProps {
  onSuccess: () => void;
}

export const CreateContributionForm: React.FC<CreateContributionFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all members for the dropdown
  const { data: membersData } = useQuery({
    queryKey: ['members'],
    queryFn: () => getAllMembers({ page: 0, size: 100 }),
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      contributionType: ContributionType.REGULAR,
      paymentMethod: 'Bank Transfer',
    },
  });

  const mutation = useMutation({
    mutationFn: createContribution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contributions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] });
      toast.success('Contribution created successfully!');
      onSuccess();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create contribution';
      toast.error(errorMessage);
      console.error('Contribution creation error:', error.response?.data);
    },
  });

  const handleMemberChange = (value: string) => {
    setValue('memberId', parseInt(value), { shouldValidate: true });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('amount', parseFloat(e.target.value) || 0, { shouldValidate: true });
  };

  const memberOptions = membersData?.content?.map(member => ({
    value: member.id.toString(),
    label: `${member.firstName} ${member.lastName} - ${member.email}`,
  })) || [];

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Member <span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => handleMemberChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Select a member...</option>
          {memberOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.memberId && (
          <p className="text-red-500 text-sm mt-1">{errors.memberId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (₦) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <Select
          label="Contribution Type"
          {...register('contributionType')}
          error={errors.contributionType?.message}
          options={Object.values(ContributionType).map(v => ({ value: v, label: v.replace(/_/g, ' ') }))}
          required
        />
      </div>

      <Select
        label="Payment Method"
        {...register('paymentMethod')}
        error={errors.paymentMethod?.message}
        options={[
          { value: 'Bank Transfer', label: 'Bank Transfer' },
          { value: 'Card', label: 'Debit/Credit Card' },
          { value: 'Cash', label: 'Cash' },
          { value: 'Cheque', label: 'Cheque' },
          { value: 'Mobile Money', label: 'Mobile Money' },
        ]}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description (Optional)
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onSuccess}>Cancel</Button>
        <Button type="submit" variant="primary" isLoading={mutation.isPending}>
          Create Contribution
        </Button>
      </div>
    </form>
  );
};
