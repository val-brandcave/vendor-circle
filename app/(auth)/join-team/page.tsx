'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, AlertCircle, Users, User } from 'lucide-react';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { validateInviteToken } from '@/lib/email/magic-link';
import { sendMagicLink } from '@/lib/email/magic-link';
import { getAllUsers } from '@/lib/auth/auth-utils';

function JoinTeamContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [role, setRole] = useState('Appraiser');
  const [email, setEmail] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams?.get('token');
    
    if (!token) {
      setValidating(false);
      setError('No invitation token provided');
      return;
    }

    // Validate invite token
    const validation = validateInviteToken(token);
    
    if (!validation.valid || !validation.data) {
      setValidating(false);
      setError(validation.error || 'Invalid or expired invitation');
      return;
    }

    const { data } = validation;
    
    if (data.type !== 'team_invite') {
      setValidating(false);
      setError('Invalid invitation type');
      return;
    }

    // Check if user already exists
    const users = getAllUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    setBusinessName(data.businessName || 'Business');
    setBusinessId(data.businessId || '');
    setAdminName(data.inviterName || 'Admin');
    setRole(data.role || 'Appraiser');
    setEmail(data.email);
    setIsExistingUser(!!existingUser);
    setValid(true);
    setValidating(false);

    // Store invite context for later use
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('team_invite_context', JSON.stringify({
        businessId: data.businessId,
        businessName: data.businessName,
        adminName: data.inviterName,
        role: data.role || 'appraiser',
      }));
    }
  }, [searchParams]);

  const handleAccept = () => {
    setLoading(true);
    setError('');

    try {
      if (!isExistingUser) {
        // New users: Auto-create account (email verified via invite trust)
        const { signUp } = require('@/lib/auth/auth-utils');
        const result = signUp(email);
        
        if (result.success) {
          console.log('✅ Account created from team invite');
          // Redirect directly to welcome (skip email verification since invite is trusted)
          router.push('/welcome');
        } else {
          setError(result.error || 'Failed to create account');
          setLoading(false);
        }
      } else {
        // Existing users: Generate magic link
        const { generateMagicLinkToken } = require('@/lib/email/magic-link');
        const token = generateMagicLinkToken(email, 'signin');
        const magicLink = `${window.location.origin}/verify-magic?token=${token}`;
        
        console.log('\n🔗 Magic Link Generated:');
        console.log('Email:', email);
        console.log('Link:', magicLink);
        console.log('\n');
        
        // Redirect to check email
        router.push(`/check-email?email=${encodeURIComponent(email)}&type=signin`);
      }
    } catch (err) {
      setError('Failed to process invitation. Please try again.');
      console.error('Accept team invite error:', err);
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <SplitPaneLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Validating invitation...
          </p>
        </div>
      </SplitPaneLayout>
    );
  }

  if (!valid || error) {
    return (
      <SplitPaneLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Invalid Invitation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <a
            href="/signup"
            className="inline-block bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Create Account
          </a>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <RealwiredBranding />
          </div>
        </div>
      </SplitPaneLayout>
    );
  }

  return (
    <SplitPaneLayout>
      <div className="w-full max-w-2xl mx-auto">
        {/* Business Context Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <img
            src="/logos/vendors-circle-logo.svg"
            alt="Vendors Circle"
            className="h-10 mx-auto dark:hidden"
          />
          <img
            src="/logos/Realwired-Logo-White.svg"
            alt="Vendors Circle"
            className="h-10 mx-auto hidden dark:block"
          />
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Join {businessName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{adminName}</span> has invited you to join their team
          </p>
        </div>

        {/* Role Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-gray-900 dark:text-white">Your Role: {role}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Complete your appraiser profile to start receiving work from {businessName} and their connected banks.
          </p>
        </div>

        {/* Email Display */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isExistingUser ? 'Sign in with' : 'Create account with'}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-4">
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              'Sending magic link...'
            ) : isExistingUser ? (
              <>Sign In and Join Team</>
            ) : (
              <>Create Account and Join Team</>
            )}
          </button>

          {isExistingUser ? (
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setIsExistingUser(false)}
                className="text-primary dark:text-blue-400 hover:underline"
              >
                Create one now
              </button>
            </p>
          ) : (
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setIsExistingUser(true)}
                className="text-primary dark:text-blue-400 hover:underline"
              >
                Sign in instead
              </button>
            </p>
          )}
        </div>

        {/* Realwired Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <RealwiredBranding />
        </div>
      </div>
    </SplitPaneLayout>
  );
}

export default function JoinTeamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <JoinTeamContent />
    </Suspense>
  );
}
