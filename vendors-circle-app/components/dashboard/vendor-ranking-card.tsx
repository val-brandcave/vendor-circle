'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface VendorRankingCardProps {
  userId?: string;
  region?: string;
  specialty?: string;
}

export function VendorRankingCard({ userId, region = 'FL', specialty = 'Residential' }: VendorRankingCardProps) {
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data - in real app would fetch from /api/rankings/vendor-percentile
  const mockData = {
    percentile: 90,
    rank: 87,
    totalInCohort: 897,
    aheadOfYou: 86,
    behindYou: 810,
    cohortAvgRating: 4.2,
    userRating: 4.7,
    badge: 'top-10' as const,
    trendSinceLast: 'up' as 'up' | 'stable',
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 300);
  }, []);

  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case 'top-10':
        return { label: 'Top 10%', textColor: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/40' };
      case 'top-25':
        return { label: 'Top 25%', textColor: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/40' };
      case 'top-50':
        return { label: 'Top 50%', textColor: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/40' };
      default:
        return { label: 'Average', textColor: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-900/40' };
    }
  };

  const badgeInfo = getBadgeInfo(mockData.badge);
  const ratingDiff = (mockData.userRating - mockData.cohortAvgRating).toFixed(1);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header with inline badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Performance
          </h3>
          <div className={`${badgeInfo.bgColor} ${badgeInfo.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
            {badgeInfo.label}
          </div>
        </div>

        {/* Rating & Rank in 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Your Rating */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Rating</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                +{ratingDiff}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.userRating}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/ 5.0</span>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Cohort avg: {mockData.cohortAvgRating}
            </div>
          </div>

          {/* Your Rank */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Your Rank
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">#{mockData.rank}</span>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              <div>{Math.round(((mockData.totalInCohort - mockData.rank) / mockData.totalInCohort) * 100)}% percentile, out of {mockData.totalInCohort}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 pt-0">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-6 mt-6">
            {/* Rating Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Rating Breakdown</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your Rating</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{mockData.userRating}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cohort Average</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{mockData.cohortAvgRating}/5.0</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your Advantage</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{ratingDiff} points</span>
                </div>
              </div>
            </div>

            {/* Rank Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Rank Breakdown</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Your Rank</span>
                  <span className="font-semibold text-gray-900 dark:text-white">#{mockData.rank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total in Cohort</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{mockData.totalInCohort}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Percentile</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{Math.round(((mockData.totalInCohort - mockData.rank) / mockData.totalInCohort) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Appraisers Ahead</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{mockData.aheadOfYou}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Appraisers Behind</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{mockData.behindYou}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Performance Insights</h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your performance has improved this week. Continue maintaining high quality and quick turnaround times to stay at the top of your cohort.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View More Button (when collapsed) OR View Less Button (when expanded) in white area */}
      <div className="px-6 pb-6 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {isExpanded ? 'View Less' : 'View More'}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
