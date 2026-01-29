'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { Button } from '@/components/ui/button';
import { sendMagicLink } from '@/lib/email/magic-link';
import { quickLoginDemo } from '@/lib/auth/auth-utils';

export default function SignInPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo account quick select
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send magic link
      const result = await sendMagicLink(email, 'signin');
      
      // Redirect to check email page with magic link
      router.push(
        `/check-email?email=${encodeURIComponent(email)}&type=signin&token=${encodeURIComponent(result.magicLink)}`
      );
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
      console.error('Signin error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    try {
      const result = quickLoginDemo(demoEmail);
      if (result.success && result.user) {
        // Redirect based on account type
        const dashboardRoute = 
          result.user.accountType === 'individual_vendor' ? '/vendor' :
          result.user.accountType === 'business_admin' ? '/business' :
          result.user.accountType === 'realwired_admin' ? '/admin' : '/';
        router.push(dashboardRoute);
      } else {
        setError(result.error || 'Failed to sign in');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitPaneLayout>
      <div className="w-full">
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue to Vendors Circle
          </p>
        </div>

        {/* Sign In Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800 dark:text-red-200">{error}</div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              isLoading={loading}
              size="lg"
              className="w-full"
            >
              {!loading && <ArrowRight className="w-5 h-5" />}
              {loading ? 'Sending magic link...' : 'Send Magic Link'}
            </Button>
          </form>

        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-primary dark:text-blue-400 hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Realwired Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <RealwiredBranding />
        </div>
      </div>
    </SplitPaneLayout>
  );
}
