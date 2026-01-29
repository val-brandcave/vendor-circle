"use client";

import { useState } from "react";
import SideNav from "./side-nav";
import TopHeader from "./top-header";
import MobileBottomNav from "./mobile/bottom-nav";
import MobileDrawer from "./mobile/drawer";
import { Menu, Bell } from "lucide-react";
import { mockInvitations } from "@/lib/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { getVendorNavItems } from "./navigation/nav-items";
import { useGetStartedProgress } from "@/hooks/useGetStartedProgress";

const mockVendorUser = {
  name: "Tom Reynolds",
  email: "tom@reynoldsappraisals.com",
  role: "Vendor",
  avatar: "/avatars/Vendor-Tom-Reynolds.png",
};

interface VendorLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function VendorLayout({ children, pageTitle }: VendorLayoutProps) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Check if this is a demo user (returning user with full data)
  const isDemoUser = user?.id?.startsWith('demo-');
  
  // Get progress for Get Started badge
  const progress = useGetStartedProgress('individual');
  
  // Show "Getting Started" if user hasn't completed all tasks (regardless of onboarding status)
  const showGettingStarted = !isDemoUser && !progress.isComplete;
  
  // Get navigation items with conditional Get Started
  const { main: mainItems, settings: settingsItems } = getVendorNavItems(
    showGettingStarted,
    { completed: progress.completed, total: progress.total }
  );
  
  // For first-time users, hide the invites badge by passing 0
  // For returning users, show actual count
  const pendingInvitesCount = showGettingStarted ? 0 : mockInvitations.filter(inv => inv.status === "pending").length;

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <SideNav 
          role="vendor" 
          mainItems={mainItems}
          settingsItems={settingsItems}
          collapsed={sidebarCollapsed} 
        />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        user={mockVendorUser}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:block">
          <TopHeader 
            user={mockVendorUser} 
            pageTitle={pageTitle}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Header - Only on mobile */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
          <button
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation - Only on mobile */}
        <MobileBottomNav pendingInvitesCount={pendingInvitesCount} />
      </div>
    </div>
  );
}

