'use client';

import { FileText, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkItem {
  id: string;
  title: string;
  dueDate: string;
  isUrgent: boolean;
}

interface ActiveWorkWidgetProps {
  urgentItems?: WorkItem[];
  dueThisWeek?: WorkItem[];
}

export function ActiveWorkWidget({ urgentItems = [], dueThisWeek = [] }: ActiveWorkWidgetProps) {
  const router = useRouter();

  const hasWork = urgentItems.length > 0 || dueThisWeek.length > 0;

  if (!hasWork) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Active Work Yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Once you receive bids from banks, they'll appear here
        </p>
        <button
          onClick={() => router.push('/vendor/invites')}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          Check for Invitations →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
      {/* Urgent Items */}
      {urgentItems.length > 0 && (
        <details open className="group">
          <summary className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Urgent Items ({urgentItems.length})
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/vendor/requests?filter=urgent');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                View →
              </button>
            </div>
          </summary>
          <div className="px-4 pb-4 space-y-2">
            {urgentItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item.title}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Due This Week */}
      {dueThisWeek.length > 0 && (
        <details className="group">
          <summary className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Due This Week ({dueThisWeek.length})
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/vendor/requests?filter=due-this-week');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                View →
              </button>
            </div>
          </summary>
          <div className="px-4 pb-4 space-y-2">
            {dueThisWeek.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-start gap-2 text-sm">
                <FileText className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{item.title}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
