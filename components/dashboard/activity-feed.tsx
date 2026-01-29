'use client';

interface Activity {
  id: string;
  text: string;
  time: string;
  type: 'bid' | 'report' | 'license' | 'invite' | 'other';
}

interface ActivityFeedProps {
  activities: Activity[];
  maxShow?: number;
}

export function ActivityFeed({ activities, maxShow = 5 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxShow);

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'bid':
        return 'bg-blue-500';
      case 'report':
        return 'bg-green-500';
      case 'license':
        return 'bg-blue-500';
      case 'invite':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Your activity will appear here as you use the platform
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mt-2 flex-shrink-0`}></div>
          <div className="flex-1 min-w-0">
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
  );
}
