'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Star, Eye } from 'lucide-react';

interface TopPerformer {
  id: string;
  name: string;
  bidsCompleted: number;
  avgRating: number;
  avgTurnaroundDays: number;
  rank: 1 | 2 | 3;
}

interface TopPerformersWidgetProps {
  businessId?: string;
  defaultPeriod?: 'week' | 'month' | 'all';
}

export function TopPerformersWidget({
  businessId,
  defaultPeriod = 'month',
}: TopPerformersWidgetProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>(defaultPeriod);

  // Mock data - in real app would fetch from /api/business/team-rankings
  const mockRankings: TopPerformer[] = [
    {
      id: '1',
      name: 'Maria Gonzalez',
      bidsCompleted: 12,
      avgRating: 4.9,
      avgTurnaroundDays: 2.1,
      rank: 1,
    },
    {
      id: '2',
      name: 'David Kim',
      bidsCompleted: 10,
      avgRating: 4.7,
      avgTurnaroundDays: 2.8,
      rank: 2,
    },
    {
      id: '3',
      name: 'James Wilson',
      bidsCompleted: 8,
      avgRating: 4.5,
      avgTurnaroundDays: 3.2,
      rank: 3,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 300);
  }, [period]);

  const getMedalIcon = (rank: 1 | 2 | 3) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-orange-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
      </div>
    );
  }

  const getPeriodLabel = (p: 'week' | 'month' | 'all') => {
    return p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Performers
        </h3>
        
        {/* Period Dropdown */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'all')}
          aria-label="Select performance period"
          className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Rankings List */}
      <div className="space-y-2">
        {mockRankings.map((performer) => (
          <div
            key={performer.id}
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-colors cursor-pointer"
          >
            {/* Left: Medal + Name + Rank */}
            <div className="flex items-center gap-3 flex-shrink-0 min-w-[160px]">
              <div className="flex-shrink-0">
                {getMedalIcon(performer.rank)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{performer.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rank #{performer.rank}</p>
              </div>
            </div>

            {/* Middle: Stats (Bids, Rating, Turnaround) - With proper column structure */}
            <div className="flex items-center flex-1 px-6 justify-between gap-4">
              {/* Bids */}
              <div className="min-w-[72px] text-center">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {performer.bidsCompleted}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Bids</div>
              </div>

              {/* Rating */}
              <div className="min-w-[72px] text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {performer.avgRating}
                  </span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
              </div>

              {/* Turnaround */}
              <div className="min-w-[72px] text-center">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {performer.avgTurnaroundDays}d
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Turnaround</div>
              </div>
            </div>

            {/* Right: Eye Icon Button */}
            <button 
              onClick={() => router.push(`/business/members/${performer.id}`)}
              className="flex-shrink-0 p-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
              title={`View ${performer.name}'s details`}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
