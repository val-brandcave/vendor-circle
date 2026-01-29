// Auth Guard Component - Protect routes from unauthorized access

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AccountType } from '@/lib/auth/auth-utils';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedAccountTypes?: AccountType[];
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  allowedAccountTypes = [],
  requireAuth = true,
}: AuthGuardProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    // Check if authentication is required
    if (requireAuth && !isAuthenticated) {
      router.push('/signin');
      return;
    }

    // Check if user has correct account type
    if (allowedAccountTypes.length > 0 && user) {
      if (!allowedAccountTypes.includes(user.accountType)) {
        // Redirect to correct dashboard
        const redirect = user.accountType === 'individual_vendor' ? '/vendor' :
                        user.accountType === 'business_admin' ? '/business' :
                        user.accountType === 'realwired_admin' ? '/admin' : '/';
        router.push(redirect);
        return;
      }
    }

    setAuthorized(true);
  }, [user, loading, isAuthenticated, requireAuth, allowedAccountTypes, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
