/**
 * SETTINGS PAGE
 *
 * Vibrant 3D glassmorphism settings page
 * User profile and application settings with stunning UI
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Bell, Palette, Settings as SettingsIcon, Shield } from 'lucide-react';
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
    { id: 'profile', label: 'Profile', icon: User, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'security', label: 'Security', icon: Lock, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, gradient: 'from-purple-500 to-pink-500' },
    { id: 'preferences', label: 'Preferences', icon: Palette, gradient: 'from-orange-500 to-amber-500' },
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
        {/* Page Header */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center gap-3">
                  <SettingsIcon className="w-10 h-10 text-blue-600" />
                  Settings
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card-3d rounded-3xl p-6 border border-white/20">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? `btn-3d bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                      : 'glass-card text-gray-700 dark:text-gray-300 hover:shadow-lg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Profile Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Update your personal details</p>
              </div>

              <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-white"
                      {...profileForm.register('firstName')}
                    />
                    {profileForm.formState.errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-white"
                      {...profileForm.register('lastName')}
                    />
                    {profileForm.formState.errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-white"
                    {...profileForm.register('email')}
                  />
                  {profileForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-white"
                    {...profileForm.register('phoneNumber')}
                  />
                  {profileForm.formState.errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-3d px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock className="w-6 h-6 text-emerald-600" />
                    Change Password
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Update your password</p>
                </div>

                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none text-gray-900 dark:text-white"
                      {...passwordForm.register('currentPassword')}
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none text-gray-900 dark:text-white"
                      {...passwordForm.register('newPassword')}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="mt-1 text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none text-gray-900 dark:text-white"
                      {...passwordForm.register('confirmPassword')}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="btn-3d px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="btn-3d px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 text-purple-600" />
                  Notification Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Choose what notifications you receive</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', description: 'Receive notifications via email' },
                  { label: 'New Member Registrations', description: 'Get notified when new members join' },
                  { label: 'Payment Updates', description: 'Alerts for payment transactions' },
                  { label: 'Claim Approvals', description: 'Notifications for claim status changes' },
                  { label: 'System Alerts', description: 'Important system updates and announcements' },
                ].map((item, index) => (
                  <div key={index} className="glass-card group hover:shadow-lg transition-all duration-200 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Palette className="w-6 h-6 text-orange-600" />
                    Appearance
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Customize the look and feel</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="btn-3d px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                  >
                    {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                  </button>
                </div>
              </div>

              <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Language & Region</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Set your language and timezone</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all outline-none text-gray-900 dark:text-white">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all outline-none text-gray-900 dark:text-white">
                      <option value="UTC">UTC</option>
                      <option value="WAT">West Africa Time (WAT)</option>
                      <option value="EST">Eastern Standard Time (EST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select className="input-3d w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all outline-none text-gray-900 dark:text-white">
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
