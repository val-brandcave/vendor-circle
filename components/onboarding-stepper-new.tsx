"use client";

import { useState, useEffect, useMemo } from "react";
import { Check, ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  icon?: any; // Lucide icon component
  component: React.ComponentType<StepComponentProps>;
}

export interface StepComponentProps {
  data: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
  onNext: () => void;
  onPrev: () => void;
  onStepChange?: (stepIndex: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface OnboardingStepperProps {
  steps?: OnboardingStep[]; // Optional - can be provided statically
  getSteps?: (data: Record<string, any>) => OnboardingStep[]; // Or dynamically
  title: string;
  onComplete: (data: Record<string, any>) => void;
  onSkip?: () => void;
  initialData?: Record<string, any>;
  showSkip?: boolean;
  themeColor?: string; // e.g., "blue" for vendor, "purple" for business
}

export function OnboardingStepper({
  steps: staticSteps,
  getSteps,
  title,
  onComplete,
  onSkip,
  initialData = {},
  showSkip = true,
  themeColor = "blue",
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
  const [stepsAnimationKey, setStepsAnimationKey] = useState(0);

  // Build steps dynamically based on data, or use static steps
  const steps = useMemo(() => {
    if (getSteps) {
      return getSteps(data);
    }
    return staticSteps || [];
  }, [data, getSteps, staticSteps]);

  // Trigger animation when steps change
  useEffect(() => {
    setStepsAnimationKey(prev => prev + 1);
  }, [steps.length]);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Theme color mapping
  const themeColors = {
    blue: {
      primary: "bg-primary text-white",
      primaryHover: "hover:bg-primary-700",
      light: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      progress: "bg-primary",
    },
    purple: {
      primary: "bg-purple-600 text-white",
      primaryHover: "hover:bg-purple-700",
      light: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      progress: "bg-purple-600",
    },
    gray: {
      primary: "bg-gray-600 text-white",
      primaryHover: "hover:bg-gray-700",
      light: "bg-gray-50 dark:bg-gray-900/20",
      text: "text-gray-600 dark:text-gray-400",
      border: "border-gray-200 dark:border-gray-800",
      progress: "bg-gray-600",
    },
  };

  const theme = themeColors[themeColor as keyof typeof themeColors] || themeColors.blue;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStepIndex((prev: number) => prev + 1);
      saveProgress();
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev: number) => prev - 1);
    }
  };

  const handleStepChange = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const handleDataChange = (newData: Record<string, any>) => {
    setData((prev) => ({ ...prev, ...newData }));
    saveProgress();
  };

  const handleComplete = () => {
    // Trigger confetti celebration
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#2652B1', '#3B82F6', '#60A5FA', '#93C5FD']
    });
    
    // Additional confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
    }, 200);
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
    
    onComplete(data);
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

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const CurrentStepComponent = currentStep.component;

  // Helper function to get subtitle for completed steps
  const getCompletedSubtitle = (stepIndex: number): string => {
    const stepId = steps[stepIndex]?.id;
    
    // Map step IDs to data keys for subtitle
    switch (stepId) {
      case 'user-type':
        return data.userType === 'individual' ? 'Individual Appraiser' : 'Business/Office';
      case 'business-info':
        return data.businessName || data.businessEmail || '';
      case 'personal-info':
        return data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : '';
      case 'licenses':
        return data.licenses?.length ? `${data.licenses.length} license${data.licenses.length > 1 ? 's' : ''}` : 'No licenses added';
      case 'coverage':
        return data.coverageAreas?.length ? `${data.coverageAreas.length} area${data.coverageAreas.length > 1 ? 's' : ''}` : 'No areas added';
      case 'specialties':
        return data.specialties?.length ? `${data.specialties.length} specialt${data.specialties.length > 1 ? 'ies' : 'y'}` : 'No specialties';
      case 'team-setup':
        return data.teamMembers?.length ? `${data.teamMembers.length} member${data.teamMembers.length > 1 ? 's' : ''}` : 'No team members';
      case 'review':
        return 'Completed';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header - Full Width at Top */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-8 py-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            User Onboarding
          </h1>
        </div>
      </div>

      {/* Middle Section: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Sandwiched between Header and Footer */}
        <div className="hidden lg:flex w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;
              const Icon = step.icon;
              const completedSubtitle = isCompleted ? getCompletedSubtitle(index) : '';

              return (
                <div
                  key={`${step.id}-${stepsAnimationKey}`}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all animate-fade-in ${
                    isCurrent ? 'bg-blue-50 dark:bg-blue-900/20 border border-primary' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Step Icon / Checkmark */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-primary text-white"
                        : isCurrent
                        ? "bg-primary text-white"
                        : "bg-transparent"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 animate-scale-in" />
                    ) : Icon ? (
                      <Icon className={`w-4 h-4 ${
                        isCurrent ? "text-white" : "text-gray-400 dark:text-gray-500"
                      }`} />
                    ) : (
                      <span className={`text-xs font-semibold ${
                        isCurrent ? "text-white" : "text-gray-400 dark:text-gray-500"
                      }`}>{index + 1}</span>
                    )}
                  </div>

                  {/* Step Title */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      isCompleted || isCurrent
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                      {step.title}
                    </p>
                    {completedSubtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {completedSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          {showSkip && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSkip}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <CurrentStepComponent
              data={data}
              onDataChange={handleDataChange}
              onNext={handleNext}
              onPrev={handlePrev}
              onStepChange={handleStepChange}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
            />
          </div>
        </div>
      </div>

      {/* Footer - Full Width at Bottom */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Back Button - Left Corner */}
            {!isFirstStep ? (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {/* Continue/Complete Button - Right Corner */}
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${theme.primary} ${theme.primaryHover}`}
            >
              {isLastStep ? "Complete" : "Continue"}
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add animations via style tag
if (typeof document !== 'undefined' && !document.getElementById('onboarding-animations')) {
  const style = document.createElement('style');
  style.id = 'onboarding-animations';
  style.textContent = `
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scale-in {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
    
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
    
    .animate-scale-in {
      animation: scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `;
  document.head.appendChild(style);
}
