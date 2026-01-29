'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  BadgeCheck, 
  FileText, 
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  getBusinessById, 
  getBusinessMetrics,
  getUsersByBusinessId,
} from '@/lib/data/business-mock-data';
import Link from 'next/link';

export default function MobileBusinessDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.profile?.businessId) {
      setTimeout(() => {
        const businessMetrics = getBusinessMetrics(user.profile?.businessId || '');
        setMetrics(businessMetrics);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Team',
      value: metrics?.activeUsers || 0,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Profiles',
      value: metrics?.activeProfiles || 0,
      icon: BadgeCheck,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Licenses',
      value: metrics?.totalLicenses || 0,
      icon: FileText,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Banks',
      value: metrics?.business?.connectedBanks || 0,
      icon: Building2,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {metrics?.business?.name || 'Business Dashboard'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {metrics?.business?.coverageStates.join(', ')}
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Completeness Alert */}
        {metrics?.profileCompleteness < 100 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 text-sm mb-1">
                  {metrics?.profileCompleteness}% Profile Complete
                </h3>
                <p className="text-xs text-yellow-800 dark:text-yellow-300">
                  Complete profiles to improve bank visibility
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.bgColor} rounded-xl p-4`}
              >
                <IconComponent className={`w-6 h-6 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Performance
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Avg. Turnaround</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Team average</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">3.5d</p>
                <p className="text-xs text-green-600 dark:text-green-400">↑ 12%</p>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Completion Rate</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">First-time acceptance</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">94%</p>
                <p className="text-xs text-green-600 dark:text-green-400">Above avg</p>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Active Orders</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">In progress</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">47</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Quick Actions
          </h2>
          
          <Link href="/m/business/team/invite" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Invite Team Member</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Add to your team</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link href="/m/business/profiles/create" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Create Profile</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">New appraiser profile</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>

        {/* AI Preview Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  AI Team Insights
                </h3>
                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded">
                  Soon
                </span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                Get intelligent recommendations to optimize team performance and growth opportunities.
              </p>
              <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                Learn more →
              </button>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
              Team Members
            </h2>
            <Link href="/m/business/team" className="text-xs font-medium text-primary dark:text-blue-400">
              View All →
            </Link>
          </div>
          
          <div className="space-y-2">
            {getUsersByBusinessId(user?.profile?.businessId || '').slice(0, 3).map((teamMember) => (
              <Link
                key={teamMember.id}
                href={`/m/business/team/${teamMember.id}`}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {teamMember.firstName?.[0]}{teamMember.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {teamMember.firstName} {teamMember.lastName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {teamMember.role}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
