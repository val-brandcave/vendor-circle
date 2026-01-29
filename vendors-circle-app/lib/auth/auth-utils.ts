// Authentication Utilities (Mock - Phase 1)
// Using localStorage for demonstration purposes
// Will be replaced with real backend authentication in production

export type AccountType = 'individual_vendor' | 'business_admin' | 'realwired_admin';

export interface User {
  id: string;
  email: string;
  accountType: AccountType;
  status: 'pending_verification' | 'active' | 'inactive';
  emailVerified: boolean;
  hasCompletedOnboarding?: boolean; // Track if user has completed onboarding
  ownerIsAppraiser?: boolean; // Track if business owner is also an appraiser
  isTeamMember?: boolean; // True if joined via team invite
  createdDate: string;
  lastLogin?: string;
  
  // Multi-team support: Array of business accounts user belongs to
  teamAccounts?: Array<{
    businessId: string;
    businessName: string;
    role: 'appraiser' | 'staff';
    joinedDate: string;
  }>;
  
  // Profile data (varies by account type)
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    // Vendor-specific
    vendorId?: string;
    // Business-specific
    businessId?: string;
    businessName?: string;
    role?: 'admin' | 'appraiser' | 'staff';
    // Admin-specific
    bankId?: string;
    bankName?: string;
  };
  
  // Bank connections (for appraisers)
  connectedBanks?: Array<{
    bankId: string;
    bankName: string;
    connectedDate: string;
    status: 'active' | 'inactive';
  }>;
}

// Demo accounts for quick testing
export const DEMO_ACCOUNTS: User[] = [
  {
    id: 'demo-vendor-001',
    email: 'tom@demo.com',
    accountType: 'individual_vendor',
    status: 'active',
    emailVerified: true,
    hasCompletedOnboarding: true,
    isTeamMember: false,
    createdDate: '2024-01-01',
    lastLogin: '2026-01-13',
    profile: {
      firstName: 'Tom',
      lastName: 'Reynolds',
      phone: '(813) 555-1234',
      vendorId: 'vendor-001',
    },
    connectedBanks: [
      {
        bankId: 'bank-001',
        bankName: 'First National Bank',
        connectedDate: '2024-01-15',
        status: 'active',
      },
      {
        bankId: 'bank-002',
        bankName: 'Wells Fargo',
        connectedDate: '2024-03-20',
        status: 'active',
      },
    ],
    teamAccounts: [], // Can be contractor for multiple businesses
  },
  {
    id: 'demo-business-001',
    email: 'sarah@demo.com',
    accountType: 'business_admin',
    status: 'active',
    emailVerified: true,
    hasCompletedOnboarding: true,
    ownerIsAppraiser: true,
    isTeamMember: false,
    createdDate: '2024-11-15',
    lastLogin: '2026-01-13',
    profile: {
      firstName: 'Sarah',
      lastName: 'Martinez',
      phone: '(619) 555-2001',
      businessId: 'business-001',
      businessName: 'Coastal Appraisal Group',
      role: 'admin',
    },
    connectedBanks: [
      {
        bankId: 'bank-003',
        bankName: 'Chase Bank',
        connectedDate: '2024-12-01',
        status: 'active',
      },
    ],
  },
  {
    id: 'demo-admin-001',
    email: 'admin@demo.com',
    accountType: 'realwired_admin',
    status: 'active',
    emailVerified: true,
    hasCompletedOnboarding: true,
    isTeamMember: false,
    createdDate: '2023-06-01',
    lastLogin: '2026-01-13',
    profile: {
      firstName: 'Nicole',
      lastName: 'Walsh',
      phone: '(555) 123-4567',
      bankId: 'bank-001',
      bankName: 'First National Bank',
    },
  },
];

const AUTH_TOKEN_KEY = 'vendors_circle_auth_token';
const USERS_KEY = 'vendors_circle_users';

// Initialize demo accounts in localStorage if not exists
export function initializeAuth() {
  if (typeof window === 'undefined') return;
  
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_ACCOUNTS));
  }
}

// Get all users (including demo accounts)
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return DEMO_ACCOUNTS;
  
  const usersData = localStorage.getItem(USERS_KEY);
  if (!usersData) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_ACCOUNTS));
    return DEMO_ACCOUNTS;
  }
  return JSON.parse(usersData);
}

// Save users to localStorage
function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Sign In (Passwordless - via magic link)
export function signIn(email: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'No account found with this email' };
  }
  
  if (!user.emailVerified) {
    return { success: false, error: 'Please verify your email before signing in' };
  }
  
  if (user.status === 'inactive') {
    return { success: false, error: 'Your account has been deactivated' };
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
  saveUsers(updatedUsers);
  
  // Create auth token (simple JWT-like structure for demo)
  const token = btoa(JSON.stringify({ userId: user.id, email: user.email, timestamp: Date.now() }));
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  
  return { success: true, user };
}

// Quick login for demo accounts (bypasses magic link for testing)
export function quickLoginDemo(email: string): { success: boolean; user?: User; error?: string } {
  return signIn(email);
}

// Sign Up (Passwordless - creates account, email verified via magic link)
export function signUp(email: string, accountType?: AccountType): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  
  // Check if email already exists
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return { success: false, error: 'An account with this email already exists' };
  }
  
  // Create new user (email verified via magic link click)
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    accountType: accountType || 'individual_vendor',
    status: 'active', // Activated immediately when magic link is clicked
    emailVerified: true, // Verified by clicking magic link
    hasCompletedOnboarding: false,
    isTeamMember: false,
    createdDate: new Date().toISOString(),
    teamAccounts: [],
    connectedBanks: [],
    profile: {},
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Auto-login the user
  const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email, timestamp: Date.now() }));
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  
  return { success: true, user: newUser };
}

// Connect bank to user account (used after bank invite acceptance)
export function connectBank(userId: string, bankId: string, bankName: string): { success: boolean; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  // Initialize connectedBanks array if it doesn't exist
  if (!user.connectedBanks) {
    user.connectedBanks = [];
  }
  
  // Check if bank is already connected
  const alreadyConnected = user.connectedBanks.some((b) => b.bankId === bankId);
  if (alreadyConnected) {
    return { success: true }; // Already connected, no error
  }
  
  // Add bank connection
  user.connectedBanks.push({
    bankId,
    bankName,
    connectedDate: new Date().toISOString(),
    status: 'active',
  });
  
  const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
  saveUsers(updatedUsers);
  
  return { success: true };
}

// Add user to team account (used after team invite acceptance)
export function addToTeam(
  userId: string,
  businessId: string,
  businessName: string,
  role: 'appraiser' | 'staff' = 'appraiser'
): { success: boolean; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  // Initialize teamAccounts array if it doesn't exist
  if (!user.teamAccounts) {
    user.teamAccounts = [];
  }
  
  // Check if already member of this team
  const alreadyMember = user.teamAccounts.some((t) => t.businessId === businessId);
  if (alreadyMember) {
    return { success: true }; // Already member, no error
  }
  
  // Add team account
  user.teamAccounts.push({
    businessId,
    businessName,
    role,
    joinedDate: new Date().toISOString(),
  });
  
  // Mark as team member
  user.isTeamMember = true;
  
  const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
  saveUsers(updatedUsers);
  
  return { success: true };
}

// Set Account Type (during onboarding)
export function setAccountType(userId: string, accountType: AccountType): { success: boolean; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  user.accountType = accountType;
  
  const updatedUsers = users.map((u) => (u.id === userId ? user : u));
  saveUsers(updatedUsers);
  
  return { success: true };
}

// Update User Profile
export function updateUserProfile(userId: string, profileData: Partial<User['profile']>): { success: boolean; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  user.profile = { ...user.profile, ...profileData };
  
  const updatedUsers = users.map((u) => (u.id === userId ? user : u));
  saveUsers(updatedUsers);
  
  return { success: true };
}

// Get Current User from Token
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  
  try {
    const decoded = JSON.parse(atob(token));
    const users = getAllUsers();
    return users.find((u) => u.id === decoded.userId) || null;
  } catch {
    return null;
  }
}

// Sign Out
export function signOut() {
  if (typeof window === 'undefined') return;
  
  // Clear authentication token
  localStorage.removeItem(AUTH_TOKEN_KEY);
  
  // Clear cached user data
  localStorage.removeItem('currentUser');
  
  // Clear user-specific session data
  localStorage.removeItem('vendorProfile');
  localStorage.removeItem('vendorDocuments');
  localStorage.removeItem('vendorInvites');
  localStorage.removeItem('businessProfile');
  localStorage.removeItem('businessTeam');
  localStorage.removeItem('appraiserProfiles');
  localStorage.removeItem('businessDocuments');
  localStorage.removeItem('businessInvites');
  
  // Note: We intentionally keep the users list and onboarding progress
  // to maintain demo account setup and user's onboarding completion status
}

// Check if authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
}

// Get redirect path based on account type
export function getRedirectPath(accountType: AccountType): string {
  switch (accountType) {
    case 'individual_vendor':
      return '/vendor';
    case 'business_admin':
      return '/business';
    case 'realwired_admin':
      return '/admin';
    default:
      return '/';
  }
}

// Password validation
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  // For demo, keep it simple - in production add more rules
  
  return { valid: errors.length === 0, errors };
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
