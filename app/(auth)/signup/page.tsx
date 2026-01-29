'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { validateEmail } from '@/lib/auth/auth-utils';
import Link from 'next/link';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { Button } from '@/components/ui/button';
import { sendMagicLink } from '@/lib/email/magic-link';

export default function SignUpPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      // Send magic link
      const result = await sendMagicLink(email, 'signup');
      
      // Redirect to check email page with magic link
      router.push(
        `/check-email?email=${encodeURIComponent(email)}&type=signup&token=${encodeURIComponent(result.magicLink)}`
      );
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
      console.error('Signup error:', err);
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
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get started with Vendors Circle
          </p>
        </div>

        {/* Sign Up Form */}
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

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1 flex-shrink-0"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary dark:text-blue-400 hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
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

          {/* How it Works */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              How it works:
            </p>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Enter your email and click "Send Magic Link"</li>
              <li>Check your inbox for an email from Vendors Circle</li>
              <li>Click the link in the email to create your account</li>
              <li>Complete your profile and get started</li>
            </ol>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-semibold text-primary dark:text-blue-400 hover:underline"
            >
              Sign in
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
