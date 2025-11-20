/**
 * PAYMENT PAGE
 *
 * Vibrant 3D glassmorphism payment page
 * Features Paystack and Flutterwave payment gateway integration
 */

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CreditCard, DollarSign, CheckCircle, Clock, XCircle, Calendar, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllMembers } from '../../services/memberService';
import { initializePaystackPayment, initializeFlutterwavePayment, getAllPayments } from '../../services/paymentService';
import { PaymentGateway, PaymentRequest } from '../../types';

export const PaymentPage: React.FC = () => {
  const [selectedGateway, setSelectedGateway] = useState<'PAYSTACK' | 'FLUTTERWAVE'>('PAYSTACK');
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Fetch members
  const { data: membersData } = useQuery({
    queryKey: ['members'],
    queryFn: () => getAllMembers({ page: 0, size: 100 }),
  });

  // Fetch payments
  const { data: payments, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: getAllPayments,
  });

  // Validate payment redirect URL for security
  const isValidPaymentUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      const allowedDomains = ['paystack.com', 'flutterwave.com'];
      return allowedDomains.some(domain =>
        parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  };

  // Initialize payment mutation
  const initializePayment = useMutation({
    mutationFn: (data: PaymentRequest) => {
      if (selectedGateway === 'PAYSTACK') {
        return initializePaystackPayment(data);
      } else {
        return initializeFlutterwavePayment(data);
      }
    },
    onSuccess: (response) => {
      const redirectUrl = response.authorizationUrl || response.link;
      if (redirectUrl) {
        // Validate URL before redirecting to prevent open redirect vulnerability
        if (isValidPaymentUrl(redirectUrl)) {
          // Reset form state before redirecting
          setSelectedMemberId(0);
          setAmount('');
          setPaymentMethod('card');
          window.location.href = redirectUrl;
        } else {
          toast.error('Invalid payment gateway URL received. Please contact support.');
          console.error('Invalid payment URL:', redirectUrl);
        }
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to initialize payment';
      toast.error(errorMessage);
    },
  });

  const handlePayment = () => {
    if (!selectedMemberId || !amount || parseFloat(amount) <= 0) {
      toast.error('Please select a member and enter a valid amount');
      return;
    }

    const paymentData = {
      memberId: selectedMemberId,
      amount: parseFloat(amount),
      paymentMethod,
      paymentGateway: selectedGateway as PaymentGateway,
    };

    initializePayment.mutate(paymentData);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { gradient: string; icon: React.ReactNode }> = {
      SUCCESS: {
        gradient: 'from-emerald-500 to-teal-500',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      PENDING: {
        gradient: 'from-amber-500 to-orange-500',
        icon: <Clock className="w-3 h-3" />,
      },
      FAILED: {
        gradient: 'from-red-500 to-rose-500',
        icon: <XCircle className="w-3 h-3" />,
      },
      CANCELLED: {
        gradient: 'from-gray-500 to-gray-600',
        icon: <XCircle className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const memberOptions = membersData?.content?.map(member => ({
    value: member.id.toString(),
    label: `${member.firstName} ${member.lastName} - ${member.email}`,
  })) || [];

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
                  <CreditCard className="w-10 h-10 text-blue-600" />
                  Payments
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                Process payments via Paystack or Flutterwave
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              New Payment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Select payment gateway and enter details</p>
          </div>

          <div className="space-y-6">
            {/* Payment Gateway Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Payment Gateway <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedGateway('PAYSTACK')}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    selectedGateway === 'PAYSTACK'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Paystack</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Secure Nigerian payments</p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedGateway('FLUTTERWAVE')}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    selectedGateway === 'FLUTTERWAVE'
                      ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Flutterwave</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">African payment solutions</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Member Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Member <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="0">Select a member...</option>
                {memberOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount (₦) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="card">Debit/Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="ussd">USSD</option>
                <option value="bank">Bank</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={initializePayment.isPending}
              className="w-full btn-3d px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-lg"
            >
              <CreditCard className="w-6 h-6" />
              {initializePayment.isPending ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="glass-card-3d rounded-3xl p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              Payment History
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Recent payment transactions</p>
          </div>

          {payments && payments.length > 0 ? (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="glass-card group hover:shadow-lg transition-all duration-200 rounded-2xl p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      payment.paymentGateway === 'PAYSTACK'
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        : 'bg-gradient-to-br from-orange-500 to-amber-500'
                    } flex items-center justify-center shadow-lg`}>
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-base">
                        ₦{payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-2">
                        <span className="font-medium">{payment.paymentGateway}</span>
                        <span>•</span>
                        <span>{payment.transactionReference}</span>
                        <span>•</span>
                        <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center mb-6">
                <CreditCard className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No payments yet</p>
              <p className="text-gray-600 dark:text-gray-400">Payment transactions will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
