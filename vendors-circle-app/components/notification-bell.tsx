"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export function NotificationBell({ count = 0, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
    >
      <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      {count > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
