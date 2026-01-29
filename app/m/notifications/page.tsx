"use client";

import { useState } from "react";
import { Check, CheckCheck, Trash2, Filter } from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function MobileNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-001",
      type: "success",
      title: "New Order Request",
      message: "First National Bank sent you a new appraisal request",
      timestamp: "2026-01-13T10:30:00",
      read: false,
    },
    {
      id: "notif-002",
      type: "warning",
      title: "License Expiring Soon",
      message: "Your Florida license expires in 30 days",
      timestamp: "2026-01-13T09:15:00",
      read: false,
    },
    {
      id: "notif-003",
      type: "info",
      title: "Profile Updated",
      message: "Your coverage areas have been updated",
      timestamp: "2026-01-12T16:45:00",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) =>
    filter === "all" ? true : !n.read
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary dark:text-blue-400 hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 rounded-xl p-4 ${
              !notification.read ? "border-2 border-primary/20" : ""
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  !notification.read ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-semibold mb-1 ${
                    !notification.read
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
