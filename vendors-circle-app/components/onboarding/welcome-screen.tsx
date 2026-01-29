'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Clock, Save, RotateCcw } from 'lucide-react';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';

interface WelcomeScreenProps {
  userType?: 'individual' | 'business';
  onStart?: () => void;
  onSkip?: () => void;
}

export function WelcomeScreen({ userType = 'individual', onStart, onSkip }: WelcomeScreenProps) {
  const router = useRouter();

  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      // Check for team invite context
      const teamContext = typeof window !== 'undefined' 
        ? sessionStorage.getItem('team_invite_context')
        : null;
      
      if (teamContext) {
        // Route to team member onboarding (simplified)
        const context = JSON.parse(teamContext);
        router.push(`/onboarding-team?business=${encodeURIComponent(context.businessName)}`);
      } else {
        // Route to regular unified onboarding
        router.push('/onboarding');
      }
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      // Default: go to vendor dashboard
      router.push('/vendor/dashboard');
    }
  };

  return (
    <SplitPaneLayout>
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/logos/vendors-circle-logo.svg"
            alt="Vendors Circle"
            className="h-10 mx-auto mb-4 dark:hidden"
          />
          <img
            src="/logos/Realwired-Logo-White.svg"
            alt="Vendors Circle"
            className="h-10 mx-auto mb-4 hidden dark:block"
          />
        </div>

        {/* Welcome Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Welcome to Vendors Circle! 🎉
        </h1>
        <p className="text-base text-center text-gray-600 dark:text-gray-400 mb-6">
          Your central hub for credential management
        </p>

        {/* Benefits Card */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-5">
          <div className="space-y-2.5">
            {[
              'One place for all your credentials',
              'Update once, all banks notified automatically',
              'Professional profile that stands out',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="flex items-center justify-center gap-6 mb-5 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>5 minutes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            <span>Auto-saved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4" />
            <span>Skip anytime</span>
          </div>
        </div>

        {/* Get Ready Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Have these handy (optional):
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>• License numbers</span>
            <span className="mx-2">•</span>
            <span>Contact info</span>
            <span className="mx-2">•</span>
            <span>Coverage areas</span>
            {userType === 'business' && (
              <>
                <span className="mx-2">•</span>
                <span>Business info</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleSkip}
            type="button"
            className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors order-2 sm:order-1 text-sm font-medium"
          >
            Skip for Now
          </button>
          <button
            onClick={handleStart}
            type="button"
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 order-1 sm:order-2"
          >
            Let's Go! →
          </button>
        </div>

        {/* Realwired Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <RealwiredBranding />
        </div>
      </div>
    </SplitPaneLayout>
  );
}
