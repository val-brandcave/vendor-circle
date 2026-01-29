'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface OnboardingSidebarProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
}

export function OnboardingSidebar({ steps, currentStepIndex }: OnboardingSidebarProps) {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-8">
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isUpcoming = step.status === 'upcoming';
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Step Content */}
              <div className="flex items-start gap-3">
                {/* Icon/Number */}
                <div className="relative z-10 flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500 font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>

                {/* Step Text */}
                <div className={cn(
                  'flex-1 pt-1',
                  isCurrent && 'pr-4 py-2 -my-2 bg-blue-50 dark:bg-blue-900/20 -ml-3 pl-3 rounded-r-lg'
                )}>
                  <div className={cn(
                    'font-medium text-sm',
                    isCompleted && 'text-gray-500 dark:text-gray-400',
                    isCurrent && 'text-blue-900 dark:text-blue-100 font-semibold',
                    isUpcoming && 'text-gray-400 dark:text-gray-500'
                  )}>
                    {step.title}
                  </div>
                  {step.subtitle && (
                    <div className={cn(
                      'text-xs mt-0.5',
                      isCompleted && 'text-gray-400 dark:text-gray-500',
                      isCurrent && 'text-blue-700 dark:text-blue-300',
                      isUpcoming && 'text-gray-400 dark:text-gray-600'
                    )}>
                      {step.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-4 top-10 w-0.5 h-6',
                    isCompleted && 'bg-green-600 dark:bg-green-500',
                    isCurrent && 'bg-blue-600 dark:bg-blue-500',
                    isUpcoming && 'bg-gray-300 dark:bg-gray-600 opacity-50'
                  )}
                  style={{ height: '24px' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
