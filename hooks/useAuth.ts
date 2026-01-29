// useAuth Hook - Authentication State Management

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  User,
  getCurrentUser,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  isAuthenticated,
  initializeAuth,
  AccountType,
  getRedirectPath,
} from '@/lib/auth/auth-utils';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth on mount
  useEffect(() => {
    if (!initialized) {
      initializeAuth();
      setInitialized(true);
    }
    
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [initialized]);

  // Also listen for storage events (in case user is set in another tab/window)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sign In (Passwordless)
  const signIn = useCallback(async (email: string) => {
    const result = authSignIn(email);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  // Sign Up (Passwordless)
  const signUp = useCallback(async (email: string, accountType?: AccountType) => {
    const result = authSignUp(email, accountType);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  // Sign Out
  const signOut = useCallback(() => {
    authSignOut();
    setUser(null);
  }, []);

  // Refresh user data
  const refreshUser = useCallback(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    refreshUser,
    accountType: user?.accountType,
    redirectPath: user ? getRedirectPath(user.accountType) : null,
  };
}
