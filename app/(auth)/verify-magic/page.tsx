'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { validateMagicLinkToken, isTokenUsed, markTokenAsUsed } from '@/lib/email/magic-link';
import { useAuth } from '@/hooks/useAuth';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';

function VerifyMagicContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp, signIn } = useAuth();
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams?.get('token');
      
      if (!token) {
        setStatus('error');
        setError('No verification token provided');
        return;
      }

      // Check if token has been used
      if (isTokenUsed(token)) {
        setStatus('error');
        setError('This magic link has already been used');
        return;
      }

      // Validate token
      const validation = validateMagicLinkToken(token);
      
      if (!validation.valid || !validation.data) {
        setStatus('error');
        setError(validation.error || 'Invalid or expired magic link');
        return;
      }

      // Mark token as used
      markTokenAsUsed(token);

      const { email, type } = validation.data;

      try {
        // Check for invite contexts
        const bankInviteContext = typeof window !== 'undefined' 
          ? sessionStorage.getItem('bank_invite_context')
          : null;
        const teamInviteContext = typeof window !== 'undefined'
          ? sessionStorage.getItem('team_invite_context')
          : null;

        if (type === 'signup') {
          // Create new account
          const result = await signUp(email);
          if (result.success) {
            setStatus('success');
            
            // Handle bank invite context
            if (bankInviteContext) {
              const context = JSON.parse(bankInviteContext);
              // Store for after onboarding
              sessionStorage.setItem('post_onboarding_bank_connect', JSON.stringify(context));
              
              // Redirect to WELCOME page first (standard for all new users)
              setTimeout(() => {
                router.push('/welcome');
              }, 1500);
              return;
            }
            
            // Handle team invite context
            if (teamInviteContext) {
              // Keep context for simplified onboarding
              // Redirect to WELCOME page first (standard for all new users)
              setTimeout(() => {
                router.push('/welcome');
              }, 1500);
              return; // Exit early - will go to team onboarding from welcome
            }
            
            // Regular direct signup
            setTimeout(() => {
              router.push('/welcome');
            }, 1500);
          } else {
            setStatus('error');
            setError(result.error || 'Failed to create account');
          }
        } else {
          // Sign in existing user
          const result = await signIn(email);
          
          if (result.success && result.user) {
            setStatus('success');
            
            // Handle bank invite for existing user
            if (bankInviteContext) {
              const context = JSON.parse(bankInviteContext);
              const { connectBank } = await import('@/lib/auth/auth-utils');
              connectBank(result.user.id, context.bankId, context.bankName);
              
              // Store toast message
              sessionStorage.setItem('auth_success_message', 
                JSON.stringify({ type: 'bank_connected', bankName: context.bankName })
              );
            }
            
            // Handle team invite for existing user
            if (teamInviteContext) {
              const context = JSON.parse(teamInviteContext);
              const { addToTeam } = await import('@/lib/auth/auth-utils');
              addToTeam(result.user.id, context.businessId, context.businessName, context.role);
              
              // Store toast message
              sessionStorage.setItem('auth_success_message',
                JSON.stringify({ type: 'team_joined', businessName: context.businessName })
              );
            }
            
            // Redirect to appropriate dashboard
            setTimeout(() => {
              const dashboardRoute = 
                result.user?.accountType === 'individual_vendor' ? '/vendor' :
                result.user?.accountType === 'business_admin' ? '/business' :
                result.user?.accountType === 'realwired_admin' ? '/admin' : '/';
              router.push(dashboardRoute);
            }, 1500);
          } else {
            setStatus('error');
            setError(result.error || 'Failed to sign in');
          }
        }
      } catch (err) {
        setStatus('error');
        setError('An unexpected error occurred');
        console.error('Verification error:', err);
      }
    };

    verifyToken();
  }, [searchParams, signUp, signIn, router]);

  return (
    <SplitPaneLayout>
      <div className="w-full max-w-md mx-auto text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verifying your email...
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we sign you in
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Success!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Redirecting you now...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Verification Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <a
                href="/signup"
                className="block w-full bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Request New Link
              </a>
              <a
                href="/signin"
                className="block text-primary dark:text-blue-400 hover:underline"
              >
                Back to Sign In
              </a>
            </div>
          </>
        )}
      </div>
    </SplitPaneLayout>
  );
}

export default function VerifyMagicPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyMagicContent />
    </Suspense>
  );
}
