'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Clock, RefreshCw } from 'lucide-react';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { useState, useEffect } from 'react';
import { sendMagicLink } from '@/lib/email/magic-link';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';
  const type = searchParams?.get('type') as 'signin' | 'signup' || 'signin';
  
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Countdown timer for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resent]);

  const handleResend = async () => {
    if (!canResend || resending) return;
    
    setResending(true);
    try {
      await sendMagicLink(email, type);
      setResent(true);
      setCanResend(false);
      setCountdown(60);
    } catch (error) {
      console.error('Failed to resend magic link:', error);
    } finally {
      setResending(false);
    }
  };

  return (
    <SplitPaneLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/logos/vendors-circle-logo.svg"
              alt="Vendors Circle"
              className="h-12 dark:hidden"
            />
            <img
              src="/logos/Realwired-Logo-White.svg"
              alt="Vendors Circle"
              className="h-12 hidden dark:block"
            />
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <Mail className="w-7 h-7 text-primary dark:text-blue-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Check your email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We sent a magic link to:
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {email}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Click the link in the email to {type === 'signin' ? 'sign in' : 'continue with signup'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Link expires in 15 minutes
            </p>
          </div>
        </div>

        {/* Resend Link */}
        <div className="text-center space-y-4">
          {resent && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-200">
              ✓ Magic link resent! Check your inbox.
            </div>
          )}
          
          <button
            onClick={handleResend}
            disabled={!canResend || resending}
            className="flex items-center justify-center gap-2 mx-auto text-primary dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending ? 'Sending...' : canResend ? 'Resend magic link' : `Resend in ${countdown}s`}
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Can't find the email? Check your spam folder
          </div>
        </div>

        {/* Back to Sign In */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href={type === 'signin' ? '/signin' : '/signup'}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to {type === 'signin' ? 'sign in' : 'sign up'}
          </a>
        </div>

        {/* Realwired Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <RealwiredBranding />
        </div>
      </div>
    </SplitPaneLayout>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  );
}
