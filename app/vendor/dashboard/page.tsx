'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { MetricCard } from '@/components/dashboard/metric-card';
import { FileText, Clock, CheckCircle2, Star, TrendingUp, Calendar } from 'lucide-react';
import { TurnaroundChart } from '@/components/dashboard/turnaround-chart';
import { AcceptanceChart } from '@/components/dashboard/acceptance-chart';
import { FirstTimeModal } from '@/components/first-time-modal';
import { BankConnectedModal } from '@/components/bank-connected-modal';
import { VendorRankingCard } from '@/components/dashboard/vendor-ranking-card';
import { ExpiryAlertSection } from '@/components/dashboard/expiry-alert-section';
import { getVendorExpiringItems } from '@/lib/utils/expiry-helpers';
import { mockLicenses, mockInsurance } from '@/lib/data/mock-data';

export default function VendorDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [, setLoading] = useState(true);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [connectedBankId, setConnectedBankId] = useState('');
  const [connectedBankName, setConnectedBankName] = useState('');
  const [dismissedExpiry, setDismissedExpiry] = useState(false);

  // Redirect to signin if not authenticated (only after auth is loaded)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Show first-time modal for users who just completed onboarding
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('seen-first-time-modal-vendor');
    const justCompletedOnboarding = localStorage.getItem('just-completed-onboarding-vendor');
    
    console.log('Vendor Dashboard Modal Check:', {
      hasUser: !!user,
      justCompletedOnboarding,
      hasSeenModal,
      shouldShow: !!(user && justCompletedOnboarding && !hasSeenModal)
    });
    
    if (user && justCompletedOnboarding && !hasSeenModal) {
      console.log('Showing vendor first-time modal in 800ms...');
      // Wait a bit for page to load, then show modal
      setTimeout(() => {
        console.log('Setting showFirstTimeModal to true');
        setShowFirstTimeModal(true);
        localStorage.setItem('seen-first-time-modal-vendor', 'true');
        localStorage.removeItem('just-completed-onboarding-vendor');
      }, 800);
    }
  }, [user]);

  // Check for bank connection success (existing users from bank invite)
  useEffect(() => {
    const authMessage = sessionStorage.getItem('auth_success_message');
    if (authMessage) {
      try {
        const message = JSON.parse(authMessage);
        if (message.type === 'bank_connected') {
          // Show bank modal after a brief delay
          setTimeout(() => {
            setConnectedBankId(message.bankId || '');
            setConnectedBankName(message.bankName);
            setShowBankModal(true);
            sessionStorage.removeItem('auth_success_message');
          }, 1000);
        }
      } catch (err) {
        console.error('Failed to parse auth success message:', err);
      }
    }
  }, []);

  // Show loading while checking auth or redirecting
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Check if first-time user (no data yet)
  const isFirstTimeUser = !user.hasCompletedOnboarding;

  // Get expiring items for demo/returning users
  const expiringItems = !isFirstTimeUser ? getVendorExpiringItems(mockLicenses, mockInsurance) : [];

  // Mock data for returning users
  const metrics = {
    totalBids: isFirstTimeUser ? 0 : 12,
    turnaroundTime: isFirstTimeUser ? 0 : 3.2,
    completionRate: isFirstTimeUser ? 0 : 94,
    rating: isFirstTimeUser ? 0 : 4.7,
  };

  const recentActivity = isFirstTimeUser ? [] : [
    { id: 1, text: 'You accepted bid from Wells Fargo', time: '2 hours ago', type: 'bid' },
    { id: 2, text: 'You submitted report for 123 Main St', time: '5 hours ago', type: 'report' },
    { id: 3, text: 'Your CA license was updated', time: '1 day ago', type: 'license' },
  ];

  return (
    <>
      {/* First-time modal */}
      <FirstTimeModal
        isOpen={showFirstTimeModal}
        onClose={() => setShowFirstTimeModal(false)}
        userType="vendor"
      />
      
      {/* Bank connected modal (for existing users from bank invite) */}
      <BankConnectedModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        bankId={connectedBankId}
        bankName={connectedBankName}
      />
      
      <div className="p-6 md:p-8 space-y-6">
        {/* Expiry Alert Section - Top Priority */}
        {!isFirstTimeUser && expiringItems.length > 0 && (
          <ExpiryAlertSection
            items={expiringItems}
            userType="vendor"
            onDismiss={() => setDismissedExpiry(true)}
            isDismissed={dismissedExpiry}
          />
        )}

        {/* Performance Metrics */}
        <div className="metrics-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Bids"
            value={metrics.totalBids}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '2 this week', isPositive: true }}
            icon={FileText}
            onClick={() => router.push('/vendor/requests')}
          />
          <MetricCard
            label="Turnaround Time"
            value={isFirstTimeUser ? '—' : `${metrics.turnaroundTime} days`}
            trend={isFirstTimeUser ? undefined : { direction: 'down', value: '0.3 days', isPositive: true }}
            icon={Clock}
          />
          <MetricCard
            label="Completion Rate"
            value={isFirstTimeUser ? '—' : `${metrics.completionRate}%`}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '2%', isPositive: true }}
            icon={CheckCircle2}
          />
          <MetricCard
            label="My Rating"
            value={isFirstTimeUser ? '—' : `${metrics.rating}/5`}
            trend={isFirstTimeUser ? undefined : { direction: 'up', value: '0.1', isPositive: true }}
            icon={Star}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div>
        {isFirstTimeUser ? (
          // Empty state for first-time users
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Turnaround Time Trend
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete some jobs to see your performance trends
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bid Acceptance Rate
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accept some bids to see your acceptance trends
              </p>
            </div>
          </div>
        ) : (
          // Charts for returning users
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Turnaround Time Trend
              </h3>
              <div className="h-64">
                <TurnaroundChart />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Bid Acceptance Rate
              </h3>
              <div className="h-64">
                <AcceptanceChart />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEW: Your Performance Widget (Full Width) */}
      {!isFirstTimeUser && (
        <div>
          <VendorRankingCard userId={user?.id} region="FL" specialty="Residential" />
        </div>
      )}

      {/* NEW: Active Work + Recent Activity in Same Row */}
      {!isFirstTimeUser && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active Work Widget (1/3 width) */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                My Active Work
              </h2>

              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 flex-1 flex flex-col">
                {/* Urgent Items */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        Urgent (2)
                      </span>
                    </div>
                    <button title="View urgent items" className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Due This Week */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        Due This Week (5)
                      </span>
                    </div>
                    <button title="View items due this week" className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/vendor/requests')}
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View All Work →
              </button>
            </div>
          </div>

          {/* Right: Recent Activity Widget (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="recent-requests bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>

              {isFirstTimeUser ? (
                // Empty state
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center flex-1 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your activity will appear here as you use the platform
                  </p>
                </div>
              ) : (
                // Activity feed
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 flex-1">
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
        </div>
      )}
    </div>
    </>
  );
}
