'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingFooterProps {
  onBack?: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  continueDisabled?: boolean;
  continueLoading?: boolean;
  continueText?: string;
  backText?: string;
  skipText?: string;
  showBack?: boolean;
  showSkip?: boolean;
}

export function OnboardingFooter({
  onBack,
  onContinue,
  onSkip,
  continueDisabled = false,
  continueLoading = false,
  continueText = 'Continue',
  backText = 'Back',
  skipText = 'Skip',
  showBack = true,
  showSkip = false,
}: OnboardingFooterProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backText}</span>
          </button>
        ) : (
          <div></div>
        )}

        {/* Skip Button (Center) */}
        {showSkip && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {skipText}
          </button>
        )}

        {/* Continue Button */}
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled || continueLoading}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200',
            'bg-blue-600 hover:bg-blue-700 text-white',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            !continueDisabled && !continueLoading && 'hover:scale-105 hover:shadow-lg'
          )}
        >
          {continueLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>{continueText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
