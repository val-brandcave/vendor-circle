"use client";

import { useEffect } from "react";
import { X, Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "invitation" | "request" | "update";
  read: boolean;
}

interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllRead?: () => void;
}

export default function NotificationSheet({
  isOpen,
  onClose,
  notifications,
  onNotificationClick,
  onMarkAllRead,
}: NotificationSheetProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const typeIcons = {
    invitation: "✉️",
    request: "📋",
    update: "🔔",
  };

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 animate-in fade-in duration-200"
      />

      {/* Sheet */}
      <div
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl z-50 max-h-[80vh] overflow-hidden rounded-b-2xl animate-in slide-in-from-top duration-300"
        style={{
          animation: isOpen ? "slideDown 0.3s ease-out" : "slideUp 0.3s ease-out"
        }}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No notifications
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => {
                  onNotificationClick?.(notification);
                  onClose();
                }}
                className={`w-full text-left px-4 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {typeIcons[notification.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`font-medium text-gray-900 dark:text-white ${
                        !notification.read ? "font-semibold" : ""
                      }`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
