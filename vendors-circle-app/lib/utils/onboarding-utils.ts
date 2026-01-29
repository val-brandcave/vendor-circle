/**
 * Onboarding Utilities
 * 
 * Handles onboarding state, progress tracking, and resume functionality
 */

export type UserRole = 'individual_vendor' | 'business_admin' | 'realwired_admin';

export interface OnboardingProgress {
  stepIndex: number;
  data: Record<string, any>;
  timestamp: number;
}

/**
 * Check if user has completed onboarding
 */
export function hasCompletedOnboarding(userRole: UserRole): boolean {
  return localStorage.getItem(`onboardingComplete-${getRoleKey(userRole)}`) === 'true';
}

/**
 * Check if user has skipped onboarding
 */
export function hasSkippedOnboarding(userRole: UserRole): boolean {
  return localStorage.getItem(`onboardingSkipped-${getRoleKey(userRole)}`) === 'true';
}

/**
 * Get saved onboarding progress for a user role
 */
export function getOnboardingProgress(title: string): OnboardingProgress | null {
  const saved = localStorage.getItem(`onboarding-progress-${title}`);
  if (!saved) return null;
  
  try {
    const progress = JSON.parse(saved);
    // Check if progress is recent (within 7 days)
    const daysSince = (Date.now() - progress.timestamp) / (1000 * 60 * 60 * 24);
    if (daysSince > 7) {
      // Progress too old, clear it
      clearOnboardingProgress(title);
      return null;
    }
    return progress;
  } catch {
    return null;
  }
}

/**
 * Clear onboarding progress
 */
export function clearOnboardingProgress(title: string): void {
  localStorage.removeItem(`onboarding-progress-${title}`);
}

/**
 * Mark onboarding as complete
 */
export function markOnboardingComplete(userRole: UserRole): void {
  const key = getRoleKey(userRole);
  localStorage.setItem(`onboardingComplete-${key}`, 'true');
  localStorage.removeItem(`onboardingSkipped-${key}`);
}

/**
 * Mark onboarding as skipped
 */
export function markOnboardingSkipped(userRole: UserRole): void {
  const key = getRoleKey(userRole);
  localStorage.setItem(`onboardingSkipped-${key}`, 'true');
}

/**
 * Get the onboarding route for a user role
 */
export function getOnboardingRoute(userRole: UserRole): string {
  switch (userRole) {
    case 'individual_vendor':
      return '/onboarding-vendor';
    case 'business_admin':
      return '/onboarding-business';
    case 'realwired_admin':
      return '/onboarding-admin';
    default:
      return '/onboarding-vendor';
  }
}

/**
 * Get the dashboard route for a user role
 */
export function getDashboardRoute(userRole: UserRole): string {
  switch (userRole) {
    case 'individual_vendor':
      return '/vendor';
    case 'business_admin':
      return '/business';
    case 'realwired_admin':
      return '/admin';
    default:
      return '/vendor';
  }
}

/**
 * Determine if user should be redirected to onboarding
 */
export function shouldRedirectToOnboarding(userRole: UserRole): boolean {
  return !hasCompletedOnboarding(userRole) && !hasSkippedOnboarding(userRole);
}

/**
 * Convert user role to storage key
 */
function getRoleKey(userRole: UserRole): string {
  switch (userRole) {
    case 'individual_vendor':
      return 'vendor';
    case 'business_admin':
      return 'business';
    case 'realwired_admin':
      return 'admin';
    default:
      return 'vendor';
  }
}
