"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
  shouldPulse?: boolean;
}

interface SideNavProps {
  role: "vendor" | "admin" | "business" | "unified";
  mainItems: NavItem[];
  settingsItems: NavItem[];
  collapsed?: boolean;
}

export default function SideNav({ role, mainItems = [], settingsItems = [], collapsed = false }: SideNavProps) {
  const pathname = usePathname();
  
  // All users use blue theme
  const activeColor = "bg-primary";

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || 
                    (item.href === "/vendor/requests" && pathname === "/vendor") ||
                    (item.href === "/admin/vendors-list" && pathname === "/admin") ||
                    (item.href === "/business/dashboard" && pathname === "/business/dashboard") ||
                    (item.href === "/vendor/get-started" && pathname === "/vendor/get-started") ||
                    (item.href === "/business/get-started" && pathname === "/business/get-started") ||
                    (item.href === "/get-started" && pathname === "/get-started");
    
    const Icon = item.icon;
    const hasBadge = item.badge !== undefined;
    const shouldPulse = item.shouldPulse === true;
    const isGetStarted = item.href === '/vendor/get-started' || item.href === '/business/get-started' || item.href === '/get-started';

    // Special rendering for Get Started item (card style)
    if (isGetStarted && !collapsed) {
      // Parse the badge text to extract progress
      const badgeText = item.badge as string || "0 of 6 completed";
      const match = badgeText.match(/(\d+) of (\d+)/);
      const completed = match ? parseInt(match[1]) : 0;
      const total = match ? parseInt(match[2]) : 6;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return (
        <Link
          key={item.href}
          href={item.href}
          className="block mb-3"
        >
          <div className={`bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-primary hover:shadow-sm transition-all ${
            isActive ? 'border-primary bg-blue-50 dark:bg-blue-900/10' : ''
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.label}
              </span>
              <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-gray-400">
                {percentage}%
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {badgeText}
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </Link>
      );
    }

    // Regular nav item rendering
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
          isActive
            ? `${activeColor} text-white shadow-sm`
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        title={collapsed ? item.label : undefined}
      >
        <span className={`flex-shrink-0 relative ${shouldPulse ? 'animate-pulse-soft' : ''}`}>
          <Icon className="w-5 h-5" />
          {shouldPulse && (
            <>
              {/* Pulsing ring effect */}
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></span>
              {/* Static ring */}
              <span className="absolute inset-0 rounded-full bg-blue-300 opacity-50"></span>
            </>
          )}
        </span>
        <span className={`truncate whitespace-nowrap transition-all duration-300 ${
          collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
        }`}>
          {item.label}
        </span>
        {hasBadge && !collapsed && typeof item.badge === 'number' && item.badge > 0 && (
          <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
            {item.badge}
          </span>
        )}
        {hasBadge && collapsed && typeof item.badge === 'number' && item.badge > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <div 
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 relative`}
    >
      {/* Logo Section - Aligned with header height */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/vendors-circle-logo-icon-only.svg"
            alt="Vendors Circle"
            width={32}
            height={32}
            className="flex-shrink-0"
          />
          <span className={`text-lg font-semibold text-gray-900 dark:text-white truncate whitespace-nowrap transition-all duration-300 ${
            collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
          }`}>
            Vendors Circle
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {mainItems.map(renderNavItem)}
      </nav>

      {/* Settings Navigation - No separator, just bottom placement */}
      {settingsItems.length > 0 && (
        <div>
          <nav className="p-4 space-y-2">
            {settingsItems.map(renderNavItem)}
          </nav>
        </div>
      )}

      {/* Footer - Powered by Realwired */}
      <div className={`overflow-hidden border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-32 opacity-100'
      }`}>
        <div className="p-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Powered by</p>
            {/* Light mode: Primary logo (red icon) */}
            <Image
              src="/logos/Realwired-Logo-Primary.svg"
              alt="Realwired"
              width={100}
              height={20}
              className="mx-auto dark:hidden"
            />
            {/* Dark mode: White logo */}
            <Image
              src="/logos/Realwired-Logo-White.svg"
              alt="Realwired"
              width={100}
              height={20}
              className="mx-auto hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
