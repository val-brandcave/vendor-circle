'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OnboardingStepper } from '@/components/onboarding-stepper-new';
import { buildTeamMemberSteps, prefillBusinessCoverage } from '@/lib/onboarding/team-member-steps';
import { addToTeam } from '@/lib/auth/auth-utils';
import { getCurrentUser } from '@/lib/auth/auth-utils';
import confetti from 'canvas-confetti';

function OnboardingTeamContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams?.get('business') || 'the team';
  
  const [data, setData] = useState<Record<string, unknown>>({
    userType: 'individual', // Team members are individual appraisers
    isTeamMember: true,
    businessName,
  });

  useEffect(() => {
    // Get team invite context from session storage
    const teamContext = sessionStorage.getItem('team_invite_context');
    if (teamContext) {
      const context = JSON.parse(teamContext);
      
      // Pre-fill coverage with business coverage (mock data for now)
      const businessCoverage = prefillBusinessCoverage({
        selectedStates: ['CA'], // Mock: Coastal Appraisal Group coverage
        selectedCounties: {
          'CA': ['San Diego', 'Orange', 'Riverside']
        }
      });
      
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Initialization from session storage
      setData((prev) => ({
        ...prev,
        ...businessCoverage,
        businessContext: context,
      }));
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleComplete = (_completedData: Record<string, unknown>) => {
    const user = getCurrentUser();
    if (!user) return;

    // Mark onboarding as complete
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('vendors_circle_users') || '[]');
      const userIndex = users.findIndex((u: { id: string }) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].hasCompletedOnboarding = true;
        localStorage.setItem('vendors_circle_users', JSON.stringify(users));
      }
      
      // Set flag to trigger first-time modal on get-started page
      localStorage.setItem('just-completed-onboarding-vendor', 'true');
      console.log('Set just-completed-onboarding-vendor flag for modal');
    }

    // Get team context
    const teamContext = sessionStorage.getItem('team_invite_context');
    if (teamContext) {
      const context = JSON.parse(teamContext);
      
      // Add user to team
      addToTeam(user.id, context.businessId, context.businessName, context.role);
      
      // Store success message for dashboard
      sessionStorage.setItem('auth_success_message',
        JSON.stringify({ type: 'team_joined', businessName: context.businessName })
      );
      
      // Clear team context
      sessionStorage.removeItem('team_invite_context');
    }

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Redirect to get-started page (like a new user)
    setTimeout(() => {
      router.push('/vendor/get-started');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <OnboardingStepper
        title="Team Member Setup"
        getSteps={() => buildTeamMemberSteps(businessName)}
        onComplete={handleComplete}
        initialData={data}
        showSkip={false}
        themeColor="blue"
      />
    </div>
  );
}

export default function OnboardingTeamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OnboardingTeamContent />
    </Suspense>
  );
}
