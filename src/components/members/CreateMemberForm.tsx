/**
 * CREATE MEMBER FORM
 *
 * Form for adding new members
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { createMember } from '../../services/memberService';
import { AccountType, EmploymentStatus } from '../../types';

const memberSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  dateOfBirth: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().min(5),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  employmentStatus: z.nativeEnum(EmploymentStatus),
  accountType: z.nativeEnum(AccountType),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface CreateMemberFormProps {
  onSuccess: () => void;
}

export const CreateMemberForm: React.FC<CreateMemberFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const mutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success('Member created successfully!');
      onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} required />
        <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} required />
        <Input label="Phone" {...register('phoneNumber')} error={errors.phoneNumber?.message} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Date of Birth" type="date" {...register('dateOfBirth')} error={errors.dateOfBirth?.message} required />
        <Select
          label="Gender"
          {...register('gender')}
          error={errors.gender?.message}
          options={[
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' },
            { value: 'OTHER', label: 'Other' },
          ]}
          required
        />
      </div>

      <Input label="Address" {...register('address')} error={errors.address?.message} required />

      <div className="grid grid-cols-3 gap-4">
        <Input label="City" {...register('city')} required />
        <Input label="State" {...register('state')} required />
        <Input label="Postal Code" {...register('postalCode')} required />
      </div>

      <Input label="Country" {...register('country')} required />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Employment Status"
          {...register('employmentStatus')}
          options={Object.values(EmploymentStatus).map(v => ({ value: v, label: v }))}
          required
        />
        <Select
          label="Account Type"
          {...register('accountType')}
          options={Object.values(AccountType).map(v => ({ value: v, label: v }))}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onSuccess}>Cancel</Button>
        <Button type="submit" variant="primary" isLoading={mutation.isPending}>Create Member</Button>
      </div>
    </form>
  );
};
