"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileBottomNav from "@/components/mobile/bottom-nav";
import MobileDrawer from "@/components/mobile/drawer";
import NotificationSheet from "@/components/mobile/notification-sheet";
import { Menu, Bell, ArrowLeft } from "lucide-react";

// Mock vendor user for demo
const mockVendorUser = {
  name: "Tom Reynolds",
  email: "tom@reynoldsappraisals.com",
  role: "Vendor",
  avatar: "/avatars/Vendor-Tom-Reynolds.png",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const router = useRouter();
  
  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "New Invitation from Capital One",
      message: "Review the invitation and accept if interested",
      time: "5 minutes ago",
      type: "invitation" as const,
      read: false,
    },
    {
      id: "notif-2",
      title: "Bid Submitted Successfully",
      message: "Your bid for FIN-2025-1248 has been submitted",
      time: "2 hours ago",
      type: "request" as const,
      read: false,
    },
    {
      id: "notif-3",
      title: "License Expiring Soon",
      message: "Your Florida license expires in 30 days",
      time: "1 day ago",
      type: "update" as const,
      read: true,
    },
  ]);
  
  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);
  
  // Handle theme change
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  // Get page title from route
  const getPageTitle = (path: string) => {
    if (path === "/m/requests" || path === "/m") return "Requests";
    if (path.startsWith("/m/invites")) return "Invitations";
    if (path.startsWith("/m/documents")) return "Documents";
    if (path.startsWith("/m/profile")) return "Profile";
    return "Back";
  };
  
  const pageTitle = getPageTitle(pathname);
  
  // Determine if we should show back button (sub-page)
  const showBackButton = pathname.split('/').length > 3;
  
  // Handle header button click
  const handleHeaderButtonClick = () => {
    if (showBackButton) {
      router.back();
    } else {
      setDrawerOpen(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={handleHeaderButtonClick}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label={showBackButton ? "Go back" : "Open menu"}
        >
          {showBackButton ? (
            <ArrowLeft className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {pageTitle}
        </h1>
        
        <button 
          onClick={() => setNotificationsOpen(true)}
          className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </header>

      {/* Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={mockVendorUser}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Notification Sheet */}
      <NotificationSheet
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onNotificationClick={(notif) => console.log("Clicked notification", notif)}
        onMarkAllRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
      />

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <MobileBottomNav pendingInvitesCount={notifications.filter(n => n.type === "invitation" && !n.read).length} />
    </div>
  );
}
