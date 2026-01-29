'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useGetStartedProgress } from '@/hooks/useGetStartedProgress';
import { NextStepCard } from '@/components/get-started/next-step-card';
import { UpcomingSteps } from '@/components/get-started/upcoming-steps';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FirstTimeModal } from '@/components/first-time-modal';

export default function BusinessGetStartedPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [ownerIsAppraiser, setOwnerIsAppraiser] = useState(false);
  const progress = useGetStartedProgress('business', ownerIsAppraiser);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const hasShownModal = useRef(false);

  // Get ownerIsAppraiser from localStorage on mount and check if first-time user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setOwnerIsAppraiser(currentUser?.ownerIsAppraiser ?? false);
    
    // Check if this is a first-time user (just completed onboarding)
    const justCompletedOnboarding = localStorage.getItem('just-completed-onboarding-business');
    if (justCompletedOnboarding) {
      setIsFirstTimeUser(true);
    }
    
    // Also refresh the auth hook to sync
    refreshUser();
  }, [refreshUser]);

  // Show first-time modal when user first arrives from onboarding
  useEffect(() => {
    // Only run once
    if (hasShownModal.current) return;
    
    const hasSeenModal = localStorage.getItem('seen-first-time-modal-business');
    const justCompletedOnboarding = localStorage.getItem('just-completed-onboarding-business');
    
    // Get user from localStorage directly to ensure we have the latest
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    console.log('Business Get Started - Modal Check:', {
      hasUser: !!user,
      justCompletedOnboarding,
      hasSeenModal,
      ownerIsAppraiser: currentUser?.ownerIsAppraiser
    });
    
    if (justCompletedOnboarding && !hasSeenModal) {
      hasShownModal.current = true;
      console.log('Showing business modal in 500ms...');
      setTimeout(() => {
        setShowFirstTimeModal(true);
        localStorage.setItem('seen-first-time-modal-business', 'true');
        localStorage.removeItem('just-completed-onboarding-business');
        setIsFirstTimeUser(false); // Allow redirect after modal is shown
        console.log('Business modal should be visible now');
      }, 500);
    }
  }, [user]);

  // If complete, redirect to dashboard (but NOT if user just arrived from onboarding)
  useEffect(() => {
    // Don't redirect if this is a first-time user who just completed onboarding
    // They should see the get-started page and modal first
    if (isFirstTimeUser) {
      console.log('Skipping redirect - first time user');
      return;
    }
    
    if (progress.isComplete && progress.completed > 0) {
      // Only redirect if user has actually completed tasks (not just default state)
      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Show success message briefly, then redirect
      setTimeout(() => {
        router.push('/business/dashboard');
      }, 2000);
    }
  }, [progress.isComplete, progress.completed, router, isFirstTimeUser]);

  // Show loading while auth is checking
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Success state (shown briefly before redirect) - but not for first-time users
  if (progress.isComplete && !isFirstTimeUser && progress.completed > 0) {
    return (
      <div className="min-h-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            You're All Set! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your profile is complete. Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Main Get Started page - embedded in business layout
  return (
    <>
      {/* First-time modal */}
      <FirstTimeModal
        isOpen={showFirstTimeModal}
        onClose={() => setShowFirstTimeModal(false)}
        userType="business"
        ownerIsAppraiser={ownerIsAppraiser}
      />
      
      <div className="p-6 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Next Step Card */}
          {progress.nextTask && (
            <NextStepCard
              task={progress.nextTask}
              currentStep={progress.completed + 1}
              totalSteps={progress.total}
            />
          )}

          {/* Upcoming Steps Accordion */}
          <UpcomingSteps
            tasks={progress.remainingTasks}
            completedTasks={progress.tasks.filter(t => t.checkComplete())}
          />
        </div>
      </div>
    </>
  );
}
