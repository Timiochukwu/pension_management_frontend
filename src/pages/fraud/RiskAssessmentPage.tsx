/**
 * RISK ASSESSMENT PAGE
 *
 * Member risk assessment and profiling
 * ML-powered risk analysis for pension members
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { assessMemberRisk } from '../../services/fraudDetectionService';
import { getAllMembers } from '../../services/memberService';
import toast from 'react-hot-toast';
import type { RiskLevel } from '../../types';
import { Shield, AlertTriangle, TrendingUp, User } from 'lucide-react';

export const RiskAssessmentPage: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  // Fetch members for dropdown
  const { data: membersData } = useQuery({
    queryKey: ['members'],
    queryFn: () => getAllMembers({ page: 0, size: 1000 }),
  });

  // Risk assessment query
  const {
    data: riskData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['risk-assessment', selectedMemberId],
    queryFn: () => assessMemberRisk(selectedMemberId!),
    enabled: selectedMemberId !== null,
  });

  const handleMemberSelect = (memberId: string) => {
    const id = Number(memberId);
    if (id) {
      setSelectedMemberId(id);
    } else {
      setSelectedMemberId(null);
    }
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

  const getRiskColor = (level: RiskLevel) => {
    const colors = {
      LOW: 'text-green-600',
      MEDIUM: 'text-yellow-600',
      HIGH: 'text-orange-600',
      CRITICAL: 'text-red-600',
    };
    return colors[level];
  };

  const getRiskBgColor = (level: RiskLevel) => {
    const colors = {
      LOW: 'bg-green-100 dark:bg-green-900',
      MEDIUM: 'bg-yellow-100 dark:bg-yellow-900',
      HIGH: 'bg-orange-100 dark:bg-orange-900',
      CRITICAL: 'bg-red-100 dark:bg-red-900',
    };
    return colors[level];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Risk Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ML-powered member risk profiling and analysis
          </p>
        </div>
      </div>

      {/* Member Selection */}
      <Card>
        <CardHeader
          title="Select Member"
          subtitle="Choose a member to assess their risk profile"
        />
        <div className="p-6">
          <div className="flex gap-4">
            <select
              value={selectedMemberId || ''}
              onChange={(e) => handleMemberSelect(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a member to analyze</option>
              {membersData?.content?.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName} - {member.email} (ID: {member.id})
                </option>
              ))}
            </select>
            {selectedMemberId && (
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                         text-white font-medium rounded-lg transition-colors duration-200
                         flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Refresh
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Risk Assessment Results */}
      {isLoading && (
        <Card>
          <div className="p-12 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Analyzing member risk profile...
            </p>
          </div>
        </Card>
      )}

      {error && (
        <Card>
          <div className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400">
              Failed to load risk assessment
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {(error as any)?.response?.data?.message || 'An error occurred'}
            </p>
          </div>
        </Card>
      )}

      {riskData && !isLoading && (
        <>
          {/* Overall Risk Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={getRiskBgColor(riskData.riskLevel)}>
              <div className="p-6 text-center">
                <Shield className={`h-12 w-12 mx-auto mb-3 ${getRiskColor(riskData.riskLevel)}`} />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Risk Level
                </p>
                <div className="flex justify-center mb-2">
                  {getRiskBadge(riskData.riskLevel)}
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {(riskData.overallRiskScore * 100).toFixed(1)}%
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6 text-center">
                <User className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Member ID
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {riskData.memberId}
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Last Updated
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(riskData.lastUpdated).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(riskData.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </Card>
          </div>

          {/* Risk Factors */}
          <Card>
            <CardHeader
              title="Risk Factors"
              subtitle={`${riskData.riskFactors.length} factors analyzed`}
            />
            <div className="p-6">
              <div className="space-y-4">
                {riskData.riskFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4
                             hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {factor.factor}
                          </h4>
                          {getRiskBadge(factor.severity)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {factor.description}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className={`text-2xl font-bold ${getRiskColor(factor.severity)}`}>
                          {(factor.score * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          factor.severity === 'LOW'
                            ? 'bg-green-500'
                            : factor.severity === 'MEDIUM'
                            ? 'bg-yellow-500'
                            : factor.severity === 'HIGH'
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${factor.score * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader
              title="Recommendations"
              subtitle="Actions to mitigate risk"
            />
            <div className="p-6">
              {riskData.recommendations && riskData.recommendations.length > 0 ? (
                <ul className="space-y-3">
                  {riskData.recommendations.map((recommendation, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20
                               rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {recommendation}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No specific recommendations at this time
                </p>
              )}
            </div>
          </Card>

          {/* Assessment Info */}
          <Card>
            <div className="p-6">
              <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p>
                  This risk assessment is generated using machine learning models trained on
                  historical transaction patterns and member behavior. It should be used as
                  a decision-support tool alongside manual review and verification.
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
