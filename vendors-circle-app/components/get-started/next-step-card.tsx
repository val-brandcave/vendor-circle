'use client';

import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';
import { Task } from '@/lib/get-started-tasks';

interface NextStepCardProps {
  task: Task;
  currentStep: number;
  totalSteps: number;
}

export function NextStepCard({ task, currentStep, totalSteps }: NextStepCardProps) {
  const router = useRouter();

  const handleCTA = () => {
    router.push(task.ctaRoute);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Left Content */}
        <div className="flex-1 p-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide mb-4">
            Your Next Step
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {task.title}
          </h2>

          {/* Step Counter */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Step {currentStep} of {totalSteps}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {task.description}
          </p>

          {/* Time Estimate */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Clock className="w-4 h-4" />
            <span>Estimated time: <strong>{task.estimatedTime}</strong></span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleCTA}
            className="px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {task.ctaText}
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block w-80 relative overflow-hidden">
          {/* Background Image - Full, no overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/others/realwired-stock-image.png)' }}
          />
        </div>
      </div>
    </div>
  );
}
