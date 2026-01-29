'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SideNav from './side-nav';
import TopHeader from './top-header';
import { useAuth } from '@/hooks/useAuth';
import { getBusinessNavItems } from './navigation/nav-items';
import { useGetStartedProgress } from '@/hooks/useGetStartedProgress';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

interface BusinessLayoutProps {
  children: ReactNode;
}

// Map routes to page titles
const getPageTitle = (pathname: string): string => {
  if (pathname === "/business/dashboard") return "Dashboard";
  if (pathname === "/business/requests") return "Requests";
  if (pathname === "/business/my-requests") return "Requests"; // Backward compatibility
  if (pathname === "/business/invites") return "Invites";
  if (pathname === "/business/documents") return "Documents";
  if (pathname === "/business/members") return "Members";
  if (pathname === "/business/team") return "Members"; // Backward compatibility
  if (pathname === "/business/profiles") return "Appraiser Profiles";
  if (pathname === "/business/profiles/create") return "Create Appraiser Profile";
  if (pathname.startsWith("/business/profiles/") && pathname.endsWith("/edit")) return "Edit Appraiser Profile";
  if (pathname.startsWith("/business/profiles/")) return "Appraiser Profile";
  if (pathname.startsWith("/business/members/")) return "Member Details";
  if (pathname.startsWith("/business/team/")) return "Member Details"; // Backward compatibility
  if (pathname === "/business/settings") return "Account Settings";
  if (pathname === "/business/settings/subscription") return "Subscription";
  if (pathname === "/business/profile") return "Profile";
  if (pathname === "/business/my-profile") return "Profile"; // Backward compatibility
  if (pathname.startsWith("/business/profile/edit")) return "Edit Profile";
  if (pathname.startsWith("/business/my-profile/edit")) return "Edit Profile"; // Backward compatibility
  if (pathname === "/business/get-started") return "Get Started";
  return "";
};

export default function BusinessLayout({ children }: BusinessLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingInvitesCount, setPendingInvitesCount] = useState(7); // Default count for business (matches mockInvitations length)
  
  // Check if this is a demo user (returning user with full data)
  const isDemoUser = user?.id?.startsWith('demo-');
  
  // Get progress for Get Started badge
  const progress = useGetStartedProgress('business', user?.ownerIsAppraiser);
  
  // Show "Getting Started" if user hasn't completed all tasks (regardless of onboarding status)
  const showGettingStarted = !isDemoUser && !progress.isComplete;
  
  // Clear breadcrumbs when leaving member detail page
  useEffect(() => {
    if (!pathname.startsWith("/business/members/") && !pathname.startsWith("/business/team/")) {
      setBreadcrumbs(null);
    }
  }, [pathname, setBreadcrumbs]);
  
  // Listen for custom events to update the count
  useEffect(() => {
    const handleInviteUpdate = ((e: CustomEvent) => {
      setPendingInvitesCount(e.detail.count);
    }) as EventListener;

    window.addEventListener('invites-updated', handleInviteUpdate);
    return () => window.removeEventListener('invites-updated', handleInviteUpdate);
  }, []);
  
  // Debug log
  useEffect(() => {
    console.log('BusinessLayout - Navigation Debug:', {
      userId: user?.id,
      ownerIsAppraiser: user?.ownerIsAppraiser,
      isDemoUser,
      showGettingStarted
    });
  }, [user, isDemoUser, showGettingStarted]);

  // Get navigation items with conditional Get Started and My Profile
  const { main: mainItems, settings: settingsItems } = getBusinessNavItems(
    showGettingStarted,
    { completed: progress.completed, total: progress.total },
    user?.ownerIsAppraiser,
    pendingInvitesCount
  );

  // Mock user for header (matches TopHeader expected structure)
  const mockUser = {
    name: "Sarah Martinez",
    email: "sarah@coastalappraisals.com",
    role: "Business Admin",
    avatar: "/avatars/sarah-business-vendor-pic.png"
  };

  const pageTitle = getPageTitle(pathname);
  const showInvitesBadge = pathname === "/business/invites" ? pendingInvitesCount : undefined;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideNav 
        role="business" 
        mainItems={mainItems}
        settingsItems={settingsItems}
        collapsed={sidebarCollapsed} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          user={mockUser}
          pageTitle={pageTitle}
          pageTitleBadge={showInvitesBadge}
          breadcrumbs={breadcrumbs || undefined}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
