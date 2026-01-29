'use client';

import { useState, useEffect } from 'react';
import { getUserTasks, calculateProgress, Task } from '@/lib/get-started-tasks';

interface GetStartedProgress {
  tasks: Task[];
  completed: number;
  total: number;
  percentage: number;
  nextTask: Task | null;
  remainingTasks: Task[];
  isComplete: boolean;
  refresh: () => void;
}

export function useGetStartedProgress(
  userType: 'individual' | 'business',
  ownerIsAppraiser?: boolean
): GetStartedProgress {
  const [progress, setProgress] = useState<ReturnType<typeof calculateProgress>>({
    completed: 0,
    total: 0,
    percentage: 0,
    nextTask: null,
    remainingTasks: [],
  });

  const tasks = getUserTasks(userType, ownerIsAppraiser);

  const refresh = () => {
    const newProgress = calculateProgress(tasks);
    setProgress(newProgress);
  };

  useEffect(() => {
    refresh();
    
    // Refresh every 5 seconds to check for updates
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [userType, ownerIsAppraiser]);

  return {
    tasks,
    ...progress,
    isComplete: progress.percentage === 100,
    refresh,
  };
}
