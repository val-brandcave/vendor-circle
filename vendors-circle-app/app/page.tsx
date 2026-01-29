'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Building2,
  Users,
  UserPlus,
  LogIn,
  Shield,
  Check,
  Mail,
  RefreshCw,
  Eye,
  Trash2,
  Zap,
  KeyRound,
  Send,
  ChevronDown,
} from 'lucide-react';
import { isAuthenticated, getCurrentUser, quickLoginDemo, getAllUsers, initializeAuth } from '@/lib/auth/auth-utils';
import { generateInviteToken } from '@/lib/email/magic-link';
import { RealwiredBranding } from '@/components/realwired-branding';

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  
  // Accordion State
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    quickStart: false,
    authFlows: false,
    invites: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  // Bank Invite State
  const [bankUserType, setBankUserType] = useState<'new' | 'existing'>('new');
  const [bankUser, setBankUser] = useState('tom');
  const [selectedBank, setSelectedBank] = useState('capital-one');
  const [bankEmail, setBankEmail] = useState('');
  const [bankLinkCopied, setBankLinkCopied] = useState(false);

  // Team Invite State
  const [teamUserType, setTeamUserType] = useState<'new' | 'existing'>('new');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamLinkCopied, setTeamLinkCopied] = useState(false);

  // Admin State
  const [adminEmail] = useState('admin@demo.com');

  // Signin State
  const [signinEmail, setSigninEmail] = useState('');

  // Check if user is authenticated - redirect to dashboard if so
  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user) {
        const dashboardRoute = user.accountType === 'individual_vendor' ? '/vendor' :
                              user.accountType === 'business_admin' ? '/business' :
                              user.accountType === 'realwired_admin' ? '/admin' : '/';
        router.push(dashboardRoute);
        return;
      }
    }
    setChecking(false);
  }, [router]);

  const banks = [
    { id: 'capital-one', name: 'Capital One', logo: '/logos/banks/32px-Capital_One_logo.svg.png' },
    { id: 'chase', name: 'Chase Bank', logo: '/logos/banks/32px-Citigroup.svg.png' },
    { id: 'first-national', name: 'First National Bank', logo: '/logos/banks/32px-First_Bank_&_Trust_logo.svg.png' },
    { id: 'td-bank', name: 'TD Bank', logo: '/logos/banks/32px-TD_Bank.svg.png' },
    { id: 'ally', name: 'Ally Financial', logo: '/logos/banks/32px-Ally_Financial.svg.png' },
  ];

  const demoUsers = [
    { id: 'tom', email: 'tom@demo.com', name: 'Tom Reynolds', type: 'Individual Vendor' },
    { id: 'sarah', email: 'sarah@demo.com', name: 'Sarah Martinez', type: 'Business Admin' },
  ];

  // Bank Invite Handler
  const handleSendBankInvite = () => {
    const email = bankUserType === 'existing' 
      ? demoUsers.find((u) => u.id === bankUser)?.email || ''
      : bankEmail;

    if (!email) {
      alert('Please enter an email address');
      return;
    }

    const bank = banks.find((b) => b.id === selectedBank);
    if (!bank) return;

    const token = generateInviteToken({
      email,
      type: 'bank_invite',
      inviterId: 'bank-admin-001',
      inviterName: bank.name,
      bankId: bank.id,
      bankName: bank.name,
    });

    const inviteLink = `${window.location.origin}/accept-invite?token=${token}`;

    navigator.clipboard.writeText(inviteLink);
    setBankLinkCopied(true);
    setTimeout(() => setBankLinkCopied(false), 3000);

    console.log('\n🏦 BANK INVITE LINK GENERATED:');
    console.log('Bank:', bank.name);
    console.log('Email:', email);
    console.log('Link:', inviteLink);
    console.log('\n✅ Link copied to clipboard!\n');

    alert(`✅ Bank invite link generated!\n\nBank: ${bank.name}\nEmail: ${email}\n\nLink copied to clipboard and logged to console.`);
  };

  // Team Invite Handler
  const handleSendTeamInvite = () => {
    const email = teamEmail;

    if (!email) {
      alert('Please enter an email address');
      return;
    }

    const token = generateInviteToken({
      email,
      type: 'team_invite',
      inviterId: 'demo-business-001',
      inviterName: 'Sarah Martinez',
      businessId: 'business-001',
      businessName: 'Coastal Appraisal Group',
      role: 'appraiser',
    });

    const inviteLink = `${window.location.origin}/join-team?token=${token}`;

    navigator.clipboard.writeText(inviteLink);
    setTeamLinkCopied(true);
    setTimeout(() => setTeamLinkCopied(false), 3000);

    console.log('\n👥 TEAM INVITE LINK GENERATED:');
    console.log('Business: Coastal Appraisal Group');
    console.log('Admin: Sarah Martinez');
    console.log('Email:', email);
    console.log('Link:', inviteLink);
    console.log('\n✅ Link copied to clipboard!\n');

    alert(`✅ Team invite link generated!\n\nBusiness: Coastal Appraisal Group\nEmail: ${email}\n\nLink copied to clipboard and logged to console.`);
  };

  // Quick Demo Login
  const handleQuickLogin = async (email: string) => {
    const result = quickLoginDemo(email);
    if (result.success && result.user) {
      const dashboardRoute = 
        result.user.accountType === 'individual_vendor' ? '/vendor' :
        result.user.accountType === 'business_admin' ? '/business' :
        result.user.accountType === 'realwired_admin' ? '/admin' : '/';
      router.push(dashboardRoute);
    }
  };

  // Utility Functions
  const handleViewUsers = () => {
    const users = getAllUsers();
    console.log('Current Users:', users);
    alert(`Users in system: ${users.length}\n\nCheck console for details.`);
  };

  const handleClearData = () => {
    if (confirm('🔄 CLEAR EVERYTHING?\n\nThis will:\n• Delete all users\n• Clear all auth tokens\n• Remove all cached data\n• Restore demo accounts only\n\nYou will need to log in again.')) {
      localStorage.clear();
      sessionStorage.clear();
      initializeAuth();
      alert('✅ Complete reset! Demo accounts restored.\n\nYou can now start a fresh auth flow.');
      window.location.reload();
    }
  };

  // Show loading while checking auth
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Catalogue UI (for unauthenticated users)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <img
            src="/logos/vendors-circle-logo.svg"
            alt="Vendors Circle"
            className="h-12 mx-auto mb-4 dark:hidden"
          />
          <img
            src="/logos/Realwired-Logo-White.svg"
            alt="Vendors Circle"
            className="h-12 mx-auto mb-4 hidden dark:block"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Vendors Circle Demo Catalogue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test all authentication flows and entry points
          </p>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={handleViewUsers}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <Eye className="w-4 h-4" />
            View Current Users
          </button>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium text-red-700 dark:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Quick Start Section - Accordion */}
      <div className="max-w-7xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => toggleSection('quickStart')}
          className="w-full p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quick Start
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Instantly log in with demo accounts (no magic link required)
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${
                expandedSections.quickStart ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Quick Start Content */}
        {expandedSections.quickStart && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tom Card */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tom Reynolds
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Individual Vendor
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Access the vendor dashboard to test individual appraiser features.
              </p>
              <button
                onClick={() => handleQuickLogin('tom@demo.com')}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login as Tom
              </button>
            </div>

            {/* Sarah Card */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Sarah Martinez
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Business Admin
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Access the business dashboard to test team management features.
              </p>
              <button
                onClick={() => handleQuickLogin('sarah@demo.com')}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login as Sarah
              </button>
            </div>

            {/* Nicole Admin Card */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Nicole Walsh
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Realwired Admin
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Access the admin dashboard to test platform management features.
              </p>
              <button
                onClick={() => handleQuickLogin('admin@demo.com')}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login as Nicole
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign In / Authentication Section - Accordion */}
      <div className="max-w-7xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => toggleSection('authFlows')}
          className="w-full p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Authentication Flows
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Test sign in flows with magic links
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${
                expandedSections.authFlows ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Auth Flows Content */}
        {expandedSections.authFlows && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 4: Direct Signin */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <LogIn className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Direct Sign In
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test returning user login
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="existing-user@example.com"
                />
              </div>

              <button
                onClick={() => router.push(`/signin${signinEmail ? `?email=${encodeURIComponent(signinEmail)}` : ''}`)}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Go to Signin
              </button>
            </div>
          </div>

          {/* Card 5: Admin Login */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Admin Sign In
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Realwired Admin access
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Pre-filled Email</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{adminEmail}</p>
              </div>

              <button
                onClick={() => router.push(`/signin?email=${encodeURIComponent(adminEmail)}`)}
                className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Signin
              </button>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Invites & Sign Up Section - Accordion */}
      <div className="max-w-7xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => toggleSection('invites')}
          className="w-full p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Invites & Sign Up
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Test bank invites, team invites, and direct signup flows
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${
                expandedSections.invites ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Invites Content */}
        {expandedSections.invites && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Bank Invite */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Bank Invite
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test bank invitation flow
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User Type
              </label>
              <div className="flex gap-3">
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={bankUserType === 'new'}
                    onChange={() => setBankUserType('new')}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">New User</span>
                </label>
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={bankUserType === 'existing'}
                    onChange={() => setBankUserType('existing')}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Existing</span>
                </label>
              </div>
            </div>

            {/* Select Demo User (if existing) */}
            {bankUserType === 'existing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select User
                </label>
                <select
                  value={bankUser}
                  onChange={(e) => setBankUser(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {demoUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.type})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Select Bank */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Email (if new user) */}
            {bankUserType === 'new' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={bankEmail}
                  onChange={(e) => setBankEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="appraiser@example.com"
                />
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={handleSendBankInvite}
              className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {bankLinkCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Invite
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Team Invite */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Team Invite
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test team member invitation
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User Type
              </label>
              <div className="flex gap-3">
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={teamUserType === 'new'}
                    onChange={() => setTeamUserType('new')}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">New User</span>
                </label>
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={teamUserType === 'existing'}
                    onChange={() => setTeamUserType('existing')}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Existing</span>
                </label>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Business</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Coastal Appraisal Group</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Invited by: Sarah Martinez</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={teamEmail}
                onChange={(e) => setTeamEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                placeholder="team-member@example.com"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendTeamInvite}
              className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {teamLinkCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Invite
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Direct Signup */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Direct Signup
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Test new user signup
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click below to test the standard signup flow for new users.
            </p>

            <button
              onClick={() => router.push('/signup')}
              className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Start Signup
            </button>
          </div>
        </div>
        </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>💡 Tip:</strong> When you send an invite, the link is automatically copied to your clipboard. 
            Check your browser console for the full email preview and magic link details.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <RealwiredBranding />
      </div>
    </div>
  );
}
