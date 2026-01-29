"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Mail, FileText, User } from "lucide-react";

interface MobileBottomNavProps {
  pendingInvitesCount?: number;
}

export default function MobileBottomNav({ pendingInvitesCount = 0 }: MobileBottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/vendor/requests",
      icon: ClipboardList,
      label: "Requests",
      isActive: pathname === "/vendor/requests" || pathname === "/vendor",
    },
    {
      href: "/vendor/invites",
      icon: Mail,
      label: "Invites",
      badge: pendingInvitesCount,
      isActive: pathname === "/vendor/invites",
    },
    {
      href: "/vendor/documents",
      icon: FileText,
      label: "Documents",
      isActive: pathname === "/vendor/documents",
    },
    {
      href: "/vendor/profile",
      icon: User,
      label: "Profile",
      isActive: pathname === "/vendor/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden safe-area-bottom">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors relative ${
                item.isActive
                  ? "text-primary"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 ${item.isActive ? 'fill-current' : ''}`}
                  strokeWidth={item.isActive ? 2 : 1.5}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${item.isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
