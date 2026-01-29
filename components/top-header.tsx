"use client";

import { useState, useEffect } from "react";
import { Bell, Moon, Sun, LogOut, User, PanelLeftClose, PanelLeftOpen, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "./breadcrumbs";
import { HelpMenu } from "./help-menu";
import { TourType } from "@/hooks/useTour";
import { signOut } from "@/lib/auth/auth-utils";

interface TopHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  pageTitle?: string;
  pageTitleBadge?: number;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const mockNotifications = {
  vendor: [
    {
      id: 1,
      title: "New Bid Request",
      message: "Finance Bank has requested a bid for 1110 N Florida Ave",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "License Expiring Soon",
      message: "Your Georgia license expires in 30 days",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Bank Invitation",
      message: "Zenith Bank has invited you to join their vendor network",
      time: "2 hours ago",
      unread: false,
    },
  ],
  admin: [
    {
      id: 1,
      title: "New Vendor Registration",
      message: "Tom Reynolds has completed registration",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Specialty Update",
      message: "Industrial specialty now has 235 vendors",
      time: "1 hour ago",
      unread: false,
    },
  ],
};

export default function TopHeader({ user, pageTitle, pageTitleBadge, breadcrumbs, sidebarCollapsed, onToggleSidebar }: TopHeaderProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always default to light mode
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    
    // Apply theme
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const notifications = user.role === "Vendor" ? mockNotifications.vendor : mockNotifications.admin;
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSignOut = () => {
    setShowUserMenu(false);
    // Clear auth and user data
    signOut();
    // Redirect to landing page
    router.push("/");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2.5 h-[72px]">
        <div className="flex items-center justify-end gap-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 h-[72px]">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Collapse button + Page Title */}
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          )}
          {breadcrumbs ? (
            <Breadcrumbs items={breadcrumbs} />
          ) : pageTitle ? (
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {pageTitle}
              </h1>
              {pageTitleBadge !== undefined && pageTitleBadge > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
                  {pageTitleBadge}
                </span>
              )}
            </div>
          ) : null}
        </div>

        {/* Right side: Help + Notifications + User Menu */}
        <div className="flex items-center gap-4">
        {/* Help Menu (? icon) */}
        <HelpMenu 
          userType={user.role === "Vendor" ? "vendor" : user.role === "Business Admin" ? "business" : "admin"} 
        />
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="notification-bell relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Drawer */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40 animate-in fade-in duration-150"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        notification.unread ? "bg-blue-50 dark:bg-gray-700/50" : ""
                      }`}
                      onClick={() => setShowNotifications(false)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {notifications.length === 0 && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No notifications
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="user-menu flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40 animate-in fade-in duration-150"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-200">
                {/* User Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {/* Profile Link - Vendor */}
                  {user.role === "Vendor" && (
                    <Link
                      href="/vendor/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  )}

                  {/* Profile Link - Business Admin */}
                  {user.role === "Business Admin" && (
                    <Link
                      href="/business/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  )}

                  {/* Profile Link - Admin */}
                  {user.role === "Admin" && (
                    <Link
                      href="/admin/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  )}

                  {/* Theme Toggle - Segmented Controller */}
                  <div className="theme-toggle px-4 py-2.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-full">
                      <button
                        onClick={() => {
                          setTheme("light");
                          localStorage.setItem("theme", "light");
                          document.documentElement.classList.remove("dark");
                        }}
                        className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${
                          theme === "light"
                            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                        aria-label="Light theme"
                      >
                        <Sun className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTheme("dark");
                          localStorage.setItem("theme", "dark");
                          document.documentElement.classList.add("dark");
                        }}
                        className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${
                          theme === "dark"
                            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                        aria-label="Dark theme"
                      >
                        <Moon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
