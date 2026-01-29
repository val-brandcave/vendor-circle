'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/auth-guard';
import SideNav from '@/components/side-nav';
import TopHeader from '@/components/top-header';
import { mockInvitations } from '@/lib/data/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { getUnifiedNavItems } from '@/components/navigation/nav-items';
import { useGetStartedProgress } from '@/hooks/useGetStartedProgress';

// Map routes to page titles
const getPageTitle = (pathname: string): string => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/my-work') return 'My Work';
  if (pathname === '/invites') return 'Invites';
  if (pathname === '/documents') return 'Documents';
  if (pathname === '/profile') return 'Profile';
  if (pathname === '/team') return 'Team & Profiles';
  if (pathname === '/settings') return 'Settings';
  if (pathname === '/get-started') return 'Get Started';
  if (pathname.startsWith('/profile/')) return 'Profile';
  if (pathname.startsWith('/documents/')) return 'Documents';
  if (pathname.startsWith('/team/')) return 'Team';
  return '';
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingInvitesCount, setPendingInvitesCount] = useState(mockInvitations.length);

  // Check if this is a demo user (returning user with full data)
  const isDemoUser = user?.id?.startsWith('demo-');
  
  // Determine which "Getting Started" path to use based on account type
  const accountType = user?.accountType === 'business_admin' ? 'business' : 'individual';
  const progress = useGetStartedProgress(accountType, user?.ownerIsAppraiser);
  
  // Show "Getting Started" if user hasn't completed all tasks
  const showGettingStarted = !isDemoUser && !progress.isComplete;
  
  // Get unified navigation items
  const { main: mainItems, settings: settingsItems } = getUnifiedNavItems(
    showGettingStarted,
    { completed: progress.completed, total: progress.total },
    user?.accountType === 'business_admin', // isBusiness
    user?.ownerIsAppraiser
  );

  // Listen for custom events to update the count
  useEffect(() => {
    const handleInviteUpdate = ((e: CustomEvent) => {
      setPendingInvitesCount(e.detail.count);
    }) as EventListener;

    window.addEventListener('invites-updated', handleInviteUpdate);
    return () => window.removeEventListener('invites-updated', handleInviteUpdate);
  }, []);

  const pageTitle = getPageTitle(pathname);
  const showInvitesBadge = pathname === '/invites' ? pendingInvitesCount : undefined;

  // Mock user data based on account type
  const mockUser = {
    name: user?.accountType === 'business_admin' ? 'Sarah Martinez' : 'Tom Reynolds',
    email: user?.email || 'user@example.com',
    role: user?.accountType === 'business_admin' ? 'Business Admin' : 'Vendor',
    avatar: user?.accountType === 'business_admin' 
      ? '/avatars/Admin-Sara-Cheng.png' 
      : '/avatars/Vendor-Tom-Reynolds.png',
  };

  return (
    <AuthGuard allowedAccountTypes={['individual_vendor', 'business_admin']} requireAuth={true}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <SideNav 
          role="unified" 
          mainItems={mainItems}
          settingsItems={settingsItems}
          collapsed={sidebarCollapsed} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopHeader 
            user={mockUser} 
            pageTitle={pageTitle}
            pageTitleBadge={showInvitesBadge}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
