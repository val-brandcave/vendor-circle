'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/dashboard/metric-card';
import { 
  FileText, Clock, CheckCircle2, Star, TrendingUp, Calendar,
  Briefcase, Users, AlertCircle, Building2
} from 'lucide-react';
import { TurnaroundChart } from '@/components/dashboard/turnaround-chart';
import { AcceptanceChart } from '@/components/dashboard/acceptance-chart';
import { TeamPerformanceChart } from '@/components/business/team-performance-chart';
import { BidVolumeChart } from '@/components/business/bid-volume-chart';
import { FirstTimeModal } from '@/components/first-time-modal';

export default function UnifiedDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);

  const isBusiness = user?.accountType === 'business_admin';
  const ownerIsAppraiser = user?.ownerIsAppraiser;

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Show first-time modal for users who just completed onboarding
  useEffect(() => {
    const modalKey = isBusiness ? 'seen-first-time-modal-business' : 'seen-first-time-modal-vendor';
    const onboardingKey = isBusiness ? 'just-completed-onboarding-business' : 'just-completed-onboarding-vendor';
    
    const hasSeenModal = localStorage.getItem(modalKey);
    const justCompletedOnboarding = localStorage.getItem(onboardingKey);
    
    console.log('Unified Dashboard Modal Check:', {
      hasUser: !!user,
      isBusiness,
      justCompletedOnboarding,
      hasSeenModal,
      ownerIsAppraiser,
      shouldShow: !!(user && justCompletedOnboarding && !hasSeenModal)
    });
    
    if (user && justCompletedOnboarding && !hasSeenModal) {
      console.log('Showing first-time modal in 800ms...');
      setTimeout(() => {
        console.log('Setting showFirstTimeModal to true');
        setShowFirstTimeModal(true);
        localStorage.setItem(modalKey, 'true');
        localStorage.removeItem(onboardingKey);
      }, 800);
    }
  }, [user, isBusiness, ownerIsAppraiser]);

  // Show loading while checking auth or redirecting
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Check if first-time user
  const isFirstTimeUser = !user.hasCompletedOnboarding;

  // Personal metrics (everyone has these)
  const personalMetrics = {
    totalBids: isFirstTimeUser ? 0 : (isBusiness && ownerIsAppraiser ? 12 : 12),
    turnaroundTime: isFirstTimeUser ? 0 : (isBusiness && ownerIsAppraiser ? 3.2 : 3.2),
    completionRate: isFirstTimeUser ? 0 : 94,
    rating: isFirstTimeUser ? 0 : (isBusiness && ownerIsAppraiser ? 4.9 : 4.7),
  };

  // Business metrics (only for business users)
  const businessMetrics = {
    totalTeamBids: isFirstTimeUser ? 0 : 47,
    teamUtilization: isFirstTimeUser ? 0 : 82,
    businessRating: isFirstTimeUser ? 0 : 4.6,
    lateItems: isFirstTimeUser ? 0 : 3,
    connectedBanks: isFirstTimeUser ? 0 : 12,
    licenseCoverage: isFirstTimeUser ? 0 : 6,
  };

  const recentActivity = isFirstTimeUser ? [] : (
    isBusiness ? [
      { id: 1, text: 'David Kim accepted bid from First National Bank', time: '2 hours ago' },
      { id: 2, text: 'Maria Gonzalez completed report for 456 Oak St', time: '4 hours ago' },
      { id: 3, text: 'New team member joined: Robert Chen', time: '1 day ago' },
    ] : [
      { id: 1, text: 'You accepted bid from Wells Fargo', time: '2 hours ago', type: 'bid' },
      { id: 2, text: 'You submitted report for 123 Main St', time: '5 hours ago', type: 'report' },
      { id: 3, text: 'Your CA license was updated', time: '1 day ago', type: 'license' },
    ]
  );

  const teamWork = isFirstTimeUser || !isBusiness ? [] : [
    { id: 1, name: 'Maria Gonzalez', jobs: 5, status: 'available' },
    { id: 2, name: 'David Kim', jobs: 6, status: 'busy' },
    { id: 3, name: 'James Wilson', jobs: 8, status: 'full', warning: '2 overdue items' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'available') return 'bg-green-500';
    if (status === 'busy') return 'bg-yellow-500';
    if (status === 'full') return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusEmoji = (status: string) => {
    if (status === 'available') return '🟢';
    if (status === 'busy') return '🟡';
    if (status === 'full') return '🔴';
    return '⚪';
  };

  return (
    <>
      {/* First-time modal */}
      <FirstTimeModal
        isOpen={showFirstTimeModal}
        onClose={() => setShowFirstTimeModal(false)}
        userType={isBusiness ? 'business' : 'vendor'}
        ownerIsAppraiser={ownerIsAppraiser}
      />
      
      <div className="p-6 md:p-8 space-y-6">
        {/* PERSONAL METRICS - Everyone sees these */}
        <div className="personal-metrics">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            {isBusiness && ownerIsAppraiser ? 'My Work' : 'My Performance'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="My Bids"
              value={personalMetrics.totalBids}
              trend={isFirstTimeUser ? undefined : { direction: 'up', value: isBusiness ? '3 this week' : '2 this week', isPositive: true }}
              icon={FileText}
              onClick={() => router.push('/my-work')}
            />
            <MetricCard
              label="Turnaround Time"
              value={isFirstTimeUser ? '—' : `${personalMetrics.turnaroundTime} days`}
              trend={isFirstTimeUser ? undefined : { direction: 'down', value: '0.3 days', isPositive: true }}
              icon={Clock}
            />
            <MetricCard
              label="Completion Rate"
              value={isFirstTimeUser ? '—' : `${personalMetrics.completionRate}%`}
              trend={isFirstTimeUser ? undefined : { direction: 'up', value: '2%', isPositive: true }}
              icon={CheckCircle2}
            />
            <MetricCard
              label="My Rating"
              value={isFirstTimeUser ? '—' : `${personalMetrics.rating}/5`}
              trend={isFirstTimeUser ? undefined : { direction: 'up', value: '0.1', isPositive: true }}
              icon={Star}
            />
          </div>
        </div>

        {/* BUSINESS METRICS - Only for business users */}
        {isBusiness && (
          <div className="business-metrics">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Team Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Team Bids"
                value={businessMetrics.totalTeamBids}
                trend={isFirstTimeUser ? undefined : { direction: 'up', value: '5 this week', isPositive: true }}
                icon={Briefcase}
                onClick={() => router.push('/my-work')}
              />
              <MetricCard
                label="Team Utilization"
                value={isFirstTimeUser ? '—' : `${businessMetrics.teamUtilization}%`}
                trend={isFirstTimeUser ? undefined : { direction: 'up', value: '5%', isPositive: true }}
                icon={Users}
              />
              <MetricCard
                label="Team Rating"
                value={isFirstTimeUser ? '—' : `${businessMetrics.businessRating}/5`}
                trend={isFirstTimeUser ? undefined : { direction: 'up', value: '0.2', isPositive: true }}
                icon={Star}
              />
              <MetricCard
                label="Late Items"
                value={businessMetrics.lateItems}
                variant={businessMetrics.lateItems > 0 ? 'warning' : 'default'}
                icon={AlertCircle}
                onClick={businessMetrics.lateItems > 0 ? () => router.push('/my-work?filter=late') : undefined}
              />
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div>
          {isFirstTimeUser ? (
            // Empty state for first-time users
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isBusiness ? 'Team Performance' : 'Turnaround Time Trend'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isBusiness 
                    ? 'Charts will appear once your team starts completing work'
                    : 'Complete some jobs to see your performance trends'
                  }
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {isBusiness ? 'Bid Volume Trend' : 'Bid Acceptance Rate'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isBusiness 
                    ? 'Bid trends will appear as you receive work'
                    : 'Accept some bids to see your acceptance trends'
                  }
                </p>
              </div>
            </div>
          ) : (
            // Charts for returning users
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                  {isBusiness ? 'Team Performance Comparison' : 'Turnaround Time Trend'}
                </h3>
                <div className="h-64">
                  {isBusiness ? <TeamPerformanceChart /> : <TurnaroundChart />}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                  {isBusiness ? 'Bid Volume Trend' : 'Bid Acceptance Rate'}
                </h3>
                <div className="h-64">
                  {isBusiness ? <BidVolumeChart /> : <AcceptanceChart />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* TEAM'S ACTIVE WORK - Only for business users */}
        {isBusiness && (
          <div className="team-section bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Team's Active Work
              </h2>
              <button
                onClick={() => router.push('/my-work')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View All
              </button>
            </div>

            {isFirstTimeUser ? (
              // Empty state
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Team Work Yet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Once your team receives and accepts bids, their work will appear here
                </p>
                <button
                  onClick={() => router.push('/team')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                >
                  Add Team Members →
                </button>
              </div>
            ) : (
              // Team work widget
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {teamWork.map((member) => (
                  <div key={member.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({member.jobs} active) {getStatusEmoji(member.status)}
                        </span>
                      </div>
                      <button
                        onClick={() => router.push(`/team/${member.id}`)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
                      >
                        View →
                      </button>
                    </div>
                    {member.warning && (
                      <div className="ml-6 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>{member.warning}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MY ACTIVE WORK - Everyone sees this */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isBusiness ? 'My Active Work' : 'My Active Work'}
            </h2>
            <button
              onClick={() => router.push('/my-work')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View All
            </button>
          </div>

          {isFirstTimeUser ? (
            // Empty state
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Active Work Yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Once you receive bids from banks, they'll appear here
              </p>
              <button
                onClick={() => router.push('/invites')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Check for Invitations →
              </button>
            </div>
          ) : (
            // Active work
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Urgent Items (2)
                    </span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Due This Week (5)
                    </span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="recent-requests bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>

          {isFirstTimeUser ? (
            // Empty state
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Your activity will appear here as you use the platform
              </p>
            </div>
          ) : (
            // Activity feed
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {activity.text}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
