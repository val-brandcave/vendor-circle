'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/dashboard/metric-card';
import { Briefcase, Users, Star, Clock, TrendingUp, Eye, AlertCircle } from 'lucide-react';
import { TeamPerformanceChart } from '@/components/business/team-performance-chart';
import { BidVolumeChart } from '@/components/business/bid-volume-chart';
import { FirstTimeModal } from '@/components/first-time-modal';
import { TopPerformersWidget } from '@/components/dashboard/top-performers-widget';
import { ExpiryAlertSection } from '@/components/dashboard/expiry-alert-section';
import { getBusinessExpiringItems } from '@/lib/utils/expiry-helpers';
import { ownerLicenses, ownerInsurance, teamMembersCredentials } from '@/lib/data/business-mock-data';

export default function BusinessDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);
  const [dismissedExpiry, setDismissedExpiry] = useState(false);

  // Redirect to signin if not authenticated (only after auth is loaded)
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
    const hasSeenModal = localStorage.getItem('seen-first-time-modal-business');
    const justCompletedOnboarding = localStorage.getItem('just-completed-onboarding-business');
    
    console.log('Business Dashboard Modal Check:', {
      hasUser: !!user,
      justCompletedOnboarding,
      hasSeenModal,
      ownerIsAppraiser: user?.ownerIsAppraiser,
      shouldShow: !!(user && justCompletedOnboarding && !hasSeenModal)
    });
    
    if (user && justCompletedOnboarding && !hasSeenModal) {
      console.log('Showing business first-time modal in 800ms...');
      // Wait a bit for page to load, then show modal
      setTimeout(() => {
        console.log('Setting showFirstTimeModal to true');
        setShowFirstTimeModal(true);
        localStorage.setItem('seen-first-time-modal-business', 'true');
        localStorage.removeItem('just-completed-onboarding-business');
      }, 800);
    }
  }, [user]);

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

  // Get expiring items for demo/returning business users
  const expiringItems = !isFirstTimeUser
    ? getBusinessExpiringItems(ownerLicenses, ownerInsurance, teamMembersCredentials)
    : [];

  // Mock business data (for returning users like sarah@demo.com)
  const metrics = {
    totalBids: isFirstTimeUser ? 0 : 47,
    teamUtilization: isFirstTimeUser ? 0 : 82,
    businessRating: isFirstTimeUser ? 0 : 4.6,
    turnaroundTime: isFirstTimeUser ? 0 : 3.8,
  };

  const teamWork = isFirstTimeUser ? [] : [
    { id: 1, name: 'Maria Gonzalez', jobs: 5, status: 'available' },
    { id: 2, name: 'David Kim', jobs: 6, status: 'busy' },
    { id: 3, name: 'James Wilson', jobs: 8, status: 'full', warning: '2 overdue items' },
  ];

  const recentActivity = isFirstTimeUser ? [] : [
    { id: 1, text: 'David Kim accepted bid from First National Bank', time: '2 hours ago' },
    { id: 2, text: 'Maria Gonzalez completed report for 456 Oak St', time: '4 hours ago' },
    { id: 3, text: 'New team member joined: Robert Chen', time: '1 day ago' },
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
        userType="business"
        ownerIsAppraiser={user?.ownerIsAppraiser}
      />
      
      <div className="p-6 md:p-8 space-y-6">
        {/* Expiry Alert Section - Top Priority */}
        {!isFirstTimeUser && expiringItems.length > 0 && (
          <ExpiryAlertSection
            items={expiringItems}
            userType="business"
            onDismiss={() => setDismissedExpiry(true)}
            isDismissed={dismissedExpiry}
            showHelper={false}
          />
        )}

        {/* PRIMARY BUSINESS METRICS (Ed's requirement: at the TOP!) */}
        <div className="business-metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Bids"
            value={metrics.totalBids}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '5 this week', isPositive: true }}
            icon={Briefcase}
            onClick={() => router.push('/business/bids-assignments')}
          />
          <MetricCard
            label="Team Utilization"
            value={isFirstTimeUser ? '—' : `${metrics.teamUtilization}%`}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '5%', isPositive: true }}
            icon={Users}
          />
          <MetricCard
            label="Business Rating"
            value={isFirstTimeUser ? '—' : `${metrics.businessRating}/5`}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '0.2', isPositive: true }}
            icon={Star}
          />
          <MetricCard
            label="Turnaround Time"
            value={isFirstTimeUser ? '—' : `${metrics.turnaroundTime} days`}
            trend={isFirstTimeUser ? undefined : { direction: 'down', value: '0.4 days', isPositive: true }}
            icon={Clock}
          />
        </div>
      </div>

      {/* MY WORK - Show if owner is also an appraiser */}
      {user?.ownerIsAppraiser && !isFirstTimeUser && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                My Work
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                  You
                </span>
              </h2>
            </div>
            <button
              onClick={() => router.push('/business/requests')}
              className="text-sm px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              View Requests
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Active Bids</div>
              <div className="text-2xl font-bold text-primary dark:text-blue-400">12</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 3 this week</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Turnaround</div>
              <div className="text-2xl font-bold text-primary dark:text-blue-400">3.2 days</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">↓ 0.3 days</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Rating</div>
              <div className="text-2xl font-bold text-primary dark:text-blue-400">4.9⭐</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">From 45 reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* CHARTS (Val wanted to add these!) */}
      <div>
        {isFirstTimeUser ? (
          // Empty state
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Team Performance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Charts will appear once your team starts completing work
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bid Volume Trend
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bid trends will appear as you receive work
              </p>
            </div>
          </div>
        ) : (
          // Charts for returning users
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Team Performance Comparison
              </h3>
              <div className="h-64">
                <TeamPerformanceChart />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Bid Volume Trend
              </h3>
              <div className="h-64">
                <BidVolumeChart />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEW: Top Performers Widget + Team's Active Work (Side by Side) */}
      {!isFirstTimeUser && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performers Widget - 2/3 width */}
          <div className="lg:col-span-2">
            <TopPerformersWidget businessId={user?.id} defaultPeriod="month" />
          </div>

          {/* TEAM'S ACTIVE WORK - 1/3 width */}
          <div className="team-section bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Team's Active Work
              </h2>
              <button
                onClick={() => router.push('/business/bids-assignments')}
                className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
                  onClick={() => router.push('/business/team')}
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                          {member.jobs} active
                        </span>
                      </div>
                      <button
                        onClick={() => router.push(`/business/requests?assignee=${encodeURIComponent(member.name)}`)}
                        className="flex-shrink-0 p-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title={`View ${member.name}'s requests`}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    {member.warning && (
                      <div className="ml-6 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{member.warning}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECENT ACTIVITY */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>

        {isFirstTimeUser ? (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Team activity will appear here as they work
            </p>
          </div>
        ) : (
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
