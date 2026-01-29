"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepComponentProps>;
}

export interface StepComponentProps {
  data: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface OnboardingStepperProps {
  steps: OnboardingStep[];
  title: string;
  onComplete: (data: Record<string, any>) => void;
  onSkip?: () => void;
  initialData?: Record<string, any>;
  showSkip?: boolean;
}

export function OnboardingStepper({
  steps,
  title,
  onComplete,
  onSkip,
  initialData = {},
  showSkip = true,
}: OnboardingStepperProps) {
  // Load saved progress on mount
  const loadedProgress = typeof window !== 'undefined' 
    ? (() => {
        const saved = localStorage.getItem(`onboarding-progress-${title}`);
        if (saved) {
          try {
            const progress = JSON.parse(saved);
            // Check if progress is recent (within 7 days)
            const daysSince = (Date.now() - progress.timestamp) / (1000 * 60 * 60 * 24);
            if (daysSince <= 7) {
              return progress;
            }
          } catch {}
        }
        return null;
      })()
    : null;

  const [currentStepIndex, setCurrentStepIndex] = useState(loadedProgress?.stepIndex || 0);
  const [data, setData] = useState<Record<string, any>>(loadedProgress?.data || initialData);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStepIndex((prev: number) => prev + 1);
      // Save progress to localStorage
      saveProgress();
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev: number) => prev - 1);
    }
  };

  const handleDataChange = (newData: Record<string, any>) => {
    setData((prev) => ({ ...prev, ...newData }));
    saveProgress();
  };

  const handleComplete = () => {
    onComplete(data);
    // Clear saved progress
    clearProgress();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
      clearProgress();
    }
  };

  const saveProgress = () => {
    const progress = {
      stepIndex: currentStepIndex,
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`onboarding-progress-${title}`, JSON.stringify(progress));
  };

  const clearProgress = () => {
    localStorage.removeItem(`onboarding-progress-${title}`);
  };

  const CurrentStepComponent = currentStep.component;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Step {currentStepIndex + 1} of {steps.length}:{" "}
                {currentStep.title}
              </p>
            </div>
            {showSkip && (
              <button
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label="Skip onboarding"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      index < currentStepIndex
                        ? "bg-green-500 w-full"
                        : index === currentStepIndex
                        ? "bg-primary w-full"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Step Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                  index < currentStepIndex
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : index === currentStepIndex
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentStep.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentStep.description}
            </p>
          )}
          <CurrentStepComponent
            data={data}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>

      {/* Footer - Sticky */}
      <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentStepIndex + 1} / {steps.length}
            </div>
            <button
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-[#1e4391] rounded-lg transition-colors"
            >
              {isLastStep ? "Complete" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
