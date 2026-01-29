"use client";

import { X, User, Moon, Sun, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/auth-utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export default function MobileDrawer({ isOpen, onClose, user, theme, onThemeChange }: MobileDrawerProps) {
  const router = useRouter();

  const handleSignOut = () => {
    onClose();
    // Clear auth and user data
    signOut();
    // Redirect to landing page
    router.push("/");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Header - Matches desktop sidebar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <Image
              src="/logos/vendors-circle-logo-icon-only.svg"
              alt="Vendors Circle"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Vendors Circle
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Menu Items */}
          <nav className="p-4 space-y-2">
            <Link
              href="/vendor/profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Theme Toggle - Segmented Controller */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-full">
                <button
                  onClick={() => onThemeChange("light")}
                  className={`flex-1 flex items-center justify-center py-2.5 rounded-md transition-all ${
                    theme === "light"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  aria-label="Light theme"
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onThemeChange("dark")}
                  className={`flex-1 flex items-center justify-center py-2.5 rounded-md transition-all ${
                    theme === "dark"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  aria-label="Dark theme"
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="px-4 pb-4">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Footer - Powered by Realwired (always visible at bottom) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
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
    </>
  );
}
