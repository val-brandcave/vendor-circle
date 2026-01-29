'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, User, FileText, Settings, Users, Briefcase } from 'lucide-react';
import { Task } from '@/lib/get-started-tasks';
import { useRouter } from 'next/navigation';

interface UpcomingStepsProps {
  tasks: Task[];
  completedTasks: Task[];
}

export function UpcomingSteps({ tasks, completedTasks }: UpcomingStepsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upcoming Steps
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {tasks.length} remaining
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          {tasks.map((task, index) => (
            <button
              key={task.id}
              onClick={() => router.push(task.ctaRoute)}
              className="w-full flex items-start gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                {getTaskIcon(task.category)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {task.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {task.description}
                </p>
              </div>

              {/* Time */}
              <div className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.estimatedTime}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to get lucide icon based on task category
function getTaskIcon(category: string): React.ReactElement {
  const iconClass = "w-5 h-5 text-blue-600 dark:text-blue-400";
  
  switch (category) {
    case 'profile':
      return <User className={iconClass} />;
    case 'documents':
      return <FileText className={iconClass} />;
    case 'settings':
      return <Settings className={iconClass} />;
    case 'team':
      return <Users className={iconClass} />;
    default:
      return <Briefcase className={iconClass} />;
  }
}
