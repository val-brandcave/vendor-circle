"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideNav from "@/components/side-nav";
import TopHeader from "@/components/top-header";
import { mockInvitations } from "@/lib/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { getVendorNavItems } from "@/components/navigation/nav-items";
import { useGetStartedProgress } from "@/hooks/useGetStartedProgress";

const mockVendorUser = {
  name: "Tom Reynolds",
  email: "tom@reynoldsappraisals.com",
  role: "Vendor",
  avatar: "/avatars/Vendor-Tom-Reynolds.png",
};

// Map routes to page titles
const getPageTitle = (pathname: string): string => {
  if (pathname === "/vendor" || pathname === "/vendor/requests") return "Requests";
  if (pathname === "/vendor/dashboard") return "Dashboard";
  if (pathname === "/vendor/invites") return "Invites";
  if (pathname === "/vendor/documents") return "Documents";
  if (pathname === "/vendor/profile") return "Profile";
  if (pathname === "/vendor/members") return "Members";
  if (pathname.startsWith("/vendor/members/")) return "Member Details";
  if (pathname === "/vendor/notifications") return "Notifications";
  if (pathname.startsWith("/vendor/settings")) return "Account Settings";
  if (pathname.startsWith("/vendor/profile/")) return "Profile";
  if (pathname.startsWith("/vendor/documents/")) return "Documents";
  if (pathname === "/vendor/get-started") return "Get Started";
  return "";
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingInvitesCount, setPendingInvitesCount] = useState(7); // Default count (matches mockInvitations length)

  // Check if this is a demo user (returning user with full data)
  const isDemoUser = user?.id?.startsWith('demo-');
  
  // Get progress for Get Started badge
  const progress = useGetStartedProgress('individual');
  
  // Show "Getting Started" if user hasn't completed all tasks (regardless of onboarding status)
  const showGettingStarted = !isDemoUser && !progress.isComplete;
  
  // Get navigation items with conditional Get Started
  const { main: mainItems, settings: settingsItems } = getVendorNavItems(
    showGettingStarted,
    { completed: progress.completed, total: progress.total },
    pendingInvitesCount
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
  const showInvitesBadge = pathname === "/vendor/invites" ? pendingInvitesCount : undefined;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideNav 
        role="vendor" 
        mainItems={mainItems}
        settingsItems={settingsItems}
        collapsed={sidebarCollapsed} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          user={mockVendorUser} 
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
  );
}

