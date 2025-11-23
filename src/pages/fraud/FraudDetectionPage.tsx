/**
 * FRAUD DETECTION PAGE
 *
 * ML-powered fraud detection for transactions
 * Real-time fraud risk assessment using machine learning
 */

import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { checkTransaction } from '../../services/fraudDetectionService';
import { getAllMembers } from '../../services/memberService';
import toast from 'react-hot-toast';
import type { FraudDetectionResponse, RiskLevel } from '../../types';
import { AlertTriangle, CheckCircle, Shield, XCircle } from 'lucide-react';

export const FraudDetectionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    paymentMethod: 'BANK_TRANSFER',
  });

  const [result, setResult] = useState<FraudDetectionResponse | null>(null);

  // Fetch members for dropdown
  const { data: membersData } = useQuery({
    queryKey: ['members'],
    queryFn: () => getAllMembers({ page: 0, size: 1000 }),
  });

  // Fraud detection mutation
  const { mutate: detectFraud, isPending } = useMutation({
    mutationFn: (data: { memberId: number; amount: number; paymentMethod: string }) =>
      checkTransaction(data.memberId, data.amount, data.paymentMethod),
    onSuccess: (data) => {
      setResult(data);
      if (data.fraudulent) {
        toast.error(`⚠️ Fraud Detected! Risk Level: ${data.riskLevel}`);
      } else {
        toast.success('✓ Transaction appears legitimate');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to check transaction');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.memberId || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    detectFraud({
      memberId: Number(formData.memberId),
      amount: Number(formData.amount),
      paymentMethod: formData.paymentMethod,
    });
  };

  const getRiskBadge = (level: RiskLevel) => {
    const variants = {
      LOW: 'success',
      MEDIUM: 'warning',
      HIGH: 'danger',
      CRITICAL: 'danger',
    } as const;
    return <Badge variant={variants[level]}>{level}</Badge>;
  };

  const getRiskIcon = (fraudulent: boolean) => {
    if (fraudulent) {
      return <XCircle className="h-16 w-16 text-red-500" />;
    }
    return <CheckCircle className="h-16 w-16 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Fraud Detection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ML-powered real-time fraud detection for transactions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Check Form */}
        <Card>
          <CardHeader
            title="Check Transaction"
            subtitle="Analyze transaction for fraud indicators"
          />
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Member Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Member *
                </label>
                <select
                  value={formData.memberId}
                  onChange={(e) =>
                    setFormData({ ...formData, memberId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a member</option>
                  {membersData?.content?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName} (ID: {member.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (₦) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="CARD">Card Payment</option>
                  <option value="MOBILE_MONEY">Mobile Money</option>
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                         text-white font-medium py-3 px-4 rounded-lg
                         transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Check for Fraud
                  </>
                )}
              </button>
            </form>
          </div>
        </Card>

        {/* Results Display */}
        {result && (
          <Card>
            <CardHeader
              title="Analysis Results"
              subtitle={`Checked ${new Date(result.timestamp).toLocaleString()}`}
            />
            <div className="p-6 space-y-6">
              {/* Main Result */}
              <div className="flex flex-col items-center text-center space-y-3">
                {getRiskIcon(result.fraudulent)}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {result.fraudulent ? 'Fraud Detected' : 'Transaction Safe'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {result.recommendation}
                  </p>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Risk Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(result.riskScore * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Risk Level
                  </p>
                  <div className="mt-1">{getRiskBadge(result.riskLevel)}</div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confidence Score
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {(result.confidenceScore * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${result.confidenceScore * 100}%` }}
                  />
                </div>
              </div>

              {/* Fraud Indicators */}
              {result.fraudIndicators && result.fraudIndicators.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Fraud Indicators
                  </h4>
                  <ul className="space-y-2">
                    {result.fraudIndicators.map((indicator, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Model Version */}
              {result.modelVersion && (
                <div className="text-xs text-gray-500 dark:text-gray-500 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  Model Version: {result.modelVersion}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Info Card */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                1. Data Analysis
              </h4>
              <p>
                The ML model analyzes transaction patterns, member history, and
                behavioral indicators
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                2. Risk Scoring
              </h4>
              <p>
                Assigns a risk score based on multiple fraud indicators and
                historical data
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                3. Recommendation
              </h4>
              <p>
                Provides actionable recommendations to approve, review, or
                block transactions
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
