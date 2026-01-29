// Navigation Items Configuration

import { 
  LayoutDashboard, 
  ClipboardList, 
  Mail, 
  FileText, 
  User,
  Users,
  Building2,
  Settings,
  HelpCircle,
  Rocket,
  Briefcase,
  BadgeCheck,
  Star
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: number | string;
  show?: boolean; // Optional: conditional visibility
  shouldPulse?: boolean; // Optional: pulse animation for attention
}

/**
 * Individual Vendor Navigation Items
 */
export const getVendorNavItems = (isFirstTimeUser: boolean, progress?: { completed: number; total: number }, invitesCount?: number): { main: NavItem[]; settings: NavItem[] } => {
  const main: NavItem[] = [
    // Get Started - FIRST in navigation, only for first-time users
    ...(isFirstTimeUser ? [{
      label: 'Getting Started',
      href: '/vendor/get-started',
      icon: Rocket,
      badge: progress ? `${progress.completed} of ${progress.total} completed` : undefined,
    }] : []),
    {
      label: 'Dashboard',
      href: '/vendor/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Requests',
      href: '/vendor/requests',
      icon: ClipboardList,
    },
    {
      label: 'Invites',
      href: '/vendor/invites',
      icon: Mail,
      badge: invitesCount !== undefined ? invitesCount : 3, // Pending invites count - dynamic or default
    },
    {
      label: 'Documents',
      href: '/vendor/documents',
      icon: FileText,
    },
    {
      label: 'Members',
      href: '/vendor/members',
      icon: Users,
    },
  ];

  const settings: NavItem[] = [
    {
      label: 'Account Settings',
      href: '/vendor/settings',
      icon: Settings,
    },
  ];

  return { main, settings };
};

/**
 * Business Navigation Items
 */
export const getBusinessNavItems = (
  isFirstTimeUser: boolean, 
  progress?: { completed: number; total: number },
  ownerIsAppraiser?: boolean,
  invitesCount?: number
): { main: NavItem[]; settings: NavItem[] } => {
  const main: NavItem[] = [
    // Get Started - FIRST in navigation, only for first-time users
    ...(isFirstTimeUser ? [{
      label: 'Getting Started',
      href: '/business/get-started',
      icon: Rocket,
      badge: progress ? `${progress.completed} of ${progress.total} completed` : undefined,
    }] : []),
    {
      label: 'Dashboard',
      href: '/business/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Requests',
      href: '/business/requests',
      icon: Briefcase,
    },
    {
      label: 'Invites',
      href: '/business/invites',
      icon: Mail,
      badge: invitesCount !== undefined ? invitesCount : 2, // Pending invites count - dynamic or default
    },
    {
      label: 'Documents',
      href: '/business/documents',
      icon: FileText,
    },
    {
      label: 'Members',
      href: '/business/members',
      icon: Users,
    },
  ];

  const settings: NavItem[] = [
    {
      label: 'Account Settings',
      href: '/business/settings',
      icon: Building2,
    },
  ];

  return { main, settings };
};

/**
 * UNIFIED Navigation Items for ALL Users
 * Per Cody's clarification: Everyone sees the same navigation
 * "There's only one account type" - single user or multi-user, but same interface
 */
export const getUnifiedNavItems = (
  isFirstTimeUser: boolean, 
  progress?: { completed: number; total: number },
  isBusiness?: boolean,
  ownerIsAppraiser?: boolean
): { main: NavItem[]; settings: NavItem[] } => {
  const main: NavItem[] = [
    // Get Started - FIRST in navigation, only for first-time users
    ...(isFirstTimeUser ? [{
      label: 'Getting Started',
      href: '/get-started',
      icon: Rocket,
      badge: progress ? `${progress.completed} of ${progress.total} completed` : undefined,
    }] : []),
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Work',
      href: '/work',
      icon: ClipboardList,
    },
    {
      label: 'Invites',
      href: '/invites',
      icon: Mail,
      badge: 3, // Pending invites count
    },
    {
      label: 'Documents',
      href: '/documents',
      icon: FileText,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: User,
    },
    // Teams - EVERYONE sees this (not conditional!)
    // Single user: Shows just you + "Add team members"
    // Multi-user: Shows you + your team
    {
      label: 'Teams',
      href: '/team',
      icon: Users,
    },
  ];

  const settings: NavItem[] = [
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return { main, settings };
};

/**
 * Admin (Realwired) Navigation Items
 */
export const getAdminNavItems = (): { main: NavItem[]; settings: NavItem[] } => {
  const main: NavItem[] = [
    {
      label: 'Vendors',
      href: '/admin/vendors-list',
      icon: Users,
    },
    {
      label: 'Specialties',
      href: '/admin/specialties',
      icon: BadgeCheck,
    },
    {
      label: 'Scorecards',
      href: '/admin/scorecards',
      icon: Star,
    },
  ];

  const settings: NavItem[] = [
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return { main, settings };
};
