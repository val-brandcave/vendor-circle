// Route Guards - Check authentication and permissions
// Phase 1: Mock implementation using localStorage

import { getCurrentUser, AccountType } from './auth-utils';

export function requireAuth(): { authenticated: boolean; user: any | null } {
  const user = getCurrentUser();
  return {
    authenticated: !!user && user.emailVerified && user.status === 'active',
    user,
  };
}

export function requireAccountType(allowedTypes: AccountType[]): { 
  authorized: boolean; 
  user: any | null;
  redirect?: string;
} {
  const { authenticated, user } = requireAuth();
  
  if (!authenticated || !user) {
    return { authorized: false, user: null, redirect: '/signin' };
  }
  
  if (!allowedTypes.includes(user.accountType)) {
    // User is authenticated but wrong account type
    // Redirect to their correct dashboard
    const redirect = user.accountType === 'individual_vendor' ? '/vendor' :
                     user.accountType === 'business_admin' ? '/business' :
                     user.accountType === 'realwired_admin' ? '/admin' : '/';
    return { authorized: false, user, redirect };
  }
  
  return { authorized: true, user };
}

// Check if onboarding is complete
export function isOnboardingComplete(user: any): boolean {
  if (!user || !user.profile) return false;
  
  // Minimum requirements for onboarding completion
  const hasBasicInfo = user.profile.firstName && user.profile.lastName;
  
  return !!hasBasicInfo;
}
