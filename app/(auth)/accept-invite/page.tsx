'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, AlertCircle, Building2 } from 'lucide-react';
import { SplitPaneLayout } from '@/components/auth/split-pane-layout';
import { RealwiredBranding } from '@/components/realwired-branding';
import { validateInviteToken, generateMagicLinkToken } from '@/lib/email/magic-link';
import { signUp } from '@/lib/auth/auth-utils';
import { getAllUsers } from '@/lib/auth/auth-utils';
import { getBankById } from '@/lib/data/banks';
import Image from 'next/image';

function AcceptInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const [bankName, setBankName] = useState('');
  const [email, setEmail] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bankLogo, setBankLogo] = useState('');

  useEffect(() => {
    const token = searchParams?.get('token');

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Initialization pattern
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
    
    if (data.type !== 'bank_invite') {
      setValidating(false);
      setError('Invalid invitation type');
      return;
    }

    // Check if user already exists
    const users = getAllUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    // Get bank logo
    const bankInfo = getBankById(data.bankId || '');
    const logoPath = bankInfo?.logo || '/logos/banks/generic-bank-logo.svg';

    setBankName(data.bankName || 'Bank');
    setBankLogo(logoPath);
    setEmail(data.email);
    setIsExistingUser(!!existingUser);
    setValid(true);
    setValidating(false);

    // Store invite context for later use
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bank_invite_context', JSON.stringify({
        bankId: data.bankId,
        bankName: data.bankName,
        inviterName: data.inviterName,
      }));
    }
  }, [searchParams]);

  const handleAccept = () => {
    setLoading(true);
    setError('');

    try {
      if (!isExistingUser) {
        // New users: Auto-create account (email verified via bank invite trust)
        const result = signUp(email);
        
        if (result.success) {
          console.log('✅ Account created from bank invite');
          // Redirect directly to welcome (skip email verification since bank invite is trusted)
          router.push('/welcome');
        } else {
          setError(result.error || 'Failed to create account');
          setLoading(false);
        }
      } else {
        // Existing users: Generate magic link
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
      console.error('Accept invite error:', err);
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
        {/* Bank Logo (Compact) */}
        <div className="text-center mb-6">
          <div className="inline-flex p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-3">
            {bankLogo ? (
              <Image src={bankLogo} alt={bankName} width={32} height={32} className="h-8 w-auto object-contain" unoptimized />
            ) : (
              <Building2 className="w-8 h-8 text-primary" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">invites you to</p>
          <Image
            src="/logos/vendors-circle-logo.svg"
            alt="Vendors Circle"
            width={200}
            height={40}
            className="h-10 w-auto mx-auto dark:hidden"
          />
          <Image
            src="/logos/Realwired-Logo-White.svg"
            alt="Vendors Circle"
            width={200}
            height={40}
            className="h-10 w-auto mx-auto hidden dark:block"
          />
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {bankName} invites you to Vendor Circle
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your credentials and receive opportunities from {bankName} and other banks
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
              <>Sign In and Connect</>
            ) : (
              <>Create Account and Connect</>
            )}
          </button>

          {isExistingUser ? (
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary dark:text-blue-400 hover:underline">
                Create one now
              </Link>
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

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AcceptInviteContent />
    </Suspense>
  );
}
