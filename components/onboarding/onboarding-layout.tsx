'use client';

import { ReactNode } from 'react';
import { OnboardingSidebar, OnboardingStep } from './onboarding-sidebar';
import { OnboardingFooter } from './onboarding-footer';
import { X } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  steps: OnboardingStep[];
  currentStepIndex: number;
  onBack?: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  onClose?: () => void;
  continueDisabled?: boolean;
  continueLoading?: boolean;
  continueText?: string;
  showSkip?: boolean;
}

export function OnboardingLayout({
  children,
  steps,
  currentStepIndex,
  onBack,
  onContinue,
  onSkip,
  onClose,
  continueDisabled = false,
  continueLoading = false,
  continueText,
  showSkip = false,
}: OnboardingLayoutProps) {
  const showBack = currentStepIndex > 0 && !!onBack;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* Close Button (Optional) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Sidebar (Progress Indicator) */}
        <OnboardingSidebar steps={steps} currentStepIndex={currentStepIndex} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
              {children}
            </div>
          </div>

          {/* Footer (Actions) */}
          <OnboardingFooter
            onBack={onBack}
            onContinue={onContinue}
            onSkip={onSkip}
            continueDisabled={continueDisabled}
            continueLoading={continueLoading}
            continueText={continueText}
            showBack={showBack}
            showSkip={showSkip}
          />
        </div>
      </div>
    </div>
  );
}
