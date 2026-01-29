'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Info } from 'lucide-react';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { Suspense } from 'react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';

  useEffect(() => {
    // Redirect to check-email page (passwordless flow)
    if (email) {
      router.push(`/check-email?email=${encodeURIComponent(email)}&type=signup`);
    }
  }, [email, router]);

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

        {/* Info Message */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Mail className="w-10 h-10 text-primary dark:text-blue-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Passwordless Authentication
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Vendors Circle uses magic links for secure, passwordless authentication.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-left text-gray-700 dark:text-gray-300">
                We'll send you a magic link via email. Click the link to sign in instantly - no password required!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Redirecting...</span>
          </div>

          {/* Realwired Branding */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <RealwiredBranding />
          </div>
        </div>
      </div>
    </SplitPaneLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
