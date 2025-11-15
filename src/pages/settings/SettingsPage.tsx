/**
 * SETTINGS PAGE
 *
 * User profile and application settings
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Bell, Palette } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import toast from 'react-hot-toast';

// Profile update schema
const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
});

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export const SettingsPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: '',
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile update:', data);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordSubmit = (data: PasswordFormData) => {
    console.log('Password change:', data);
    toast.success('Password changed successfully!');
    passwordForm.reset();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader title="Profile Information" subtitle="Update your personal details" />
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...profileForm.register('firstName')}
                  error={profileForm.formState.errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  {...profileForm.register('lastName')}
                  error={profileForm.formState.errors.lastName?.message}
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                {...profileForm.register('email')}
                error={profileForm.formState.errors.email?.message}
              />
              <Input
                label="Phone Number"
                {...profileForm.register('phoneNumber')}
                error={profileForm.formState.errors.phoneNumber?.message}
              />
              <div className="pt-4">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Change Password" subtitle="Update your password" />
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  {...passwordForm.register('currentPassword')}
                  error={passwordForm.formState.errors.currentPassword?.message}
                />
                <Input
                  label="New Password"
                  type="password"
                  {...passwordForm.register('newPassword')}
                  error={passwordForm.formState.errors.newPassword?.message}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  {...passwordForm.register('confirmPassword')}
                  error={passwordForm.formState.errors.confirmPassword?.message}
                />
                <div className="pt-4">
                  <Button type="submit" variant="primary">
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>

            <Card>
              <CardHeader title="Two-Factor Authentication" subtitle="Add an extra layer of security" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Status</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Two-factor authentication is currently disabled
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader title="Notification Preferences" subtitle="Choose what notifications you receive" />
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', description: 'Receive notifications via email' },
                { label: 'New Member Registrations', description: 'Get notified when new members join' },
                { label: 'Payment Updates', description: 'Alerts for payment transactions' },
                { label: 'Claim Approvals', description: 'Notifications for claim status changes' },
                { label: 'System Alerts', description: 'Important system updates and announcements' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Appearance" subtitle="Customize the look and feel" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                    </p>
                  </div>
                  <Button variant="outline" onClick={toggleTheme}>
                    {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Language & Region" subtitle="Set your language and timezone" />
              <div className="space-y-4">
                <Select
                  label="Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                  ]}
                  defaultValue="en"
                />
                <Select
                  label="Timezone"
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'WAT', label: 'West Africa Time (WAT)' },
                    { value: 'EST', label: 'Eastern Standard Time (EST)' },
                  ]}
                  defaultValue="WAT"
                />
                <Select
                  label="Currency"
                  options={[
                    { value: 'NGN', label: 'Nigerian Naira (₦)' },
                    { value: 'USD', label: 'US Dollar ($)' },
                    { value: 'EUR', label: 'Euro (€)' },
                  ]}
                  defaultValue="NGN"
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
