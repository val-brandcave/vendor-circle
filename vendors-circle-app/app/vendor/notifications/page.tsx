"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, Trash2, Filter } from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: "order" | "license" | "system" | "bank";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-001",
      type: "success",
      title: "New Order Request",
      message: "First National Bank sent you a new appraisal request for 123 Main St",
      timestamp: "2026-01-13T10:30:00",
      read: false,
      category: "order",
    },
    {
      id: "notif-002",
      type: "warning",
      title: "License Expiring Soon",
      message: "Your Florida license (RD9887665) expires in 30 days",
      timestamp: "2026-01-13T09:15:00",
      read: false,
      category: "license",
    },
    {
      id: "notif-003",
      type: "info",
      title: "Profile Updated",
      message: "Your coverage areas have been updated successfully",
      timestamp: "2026-01-12T16:45:00",
      read: true,
      category: "system",
    },
    {
      id: "notif-004",
      type: "success",
      title: "Bank Connection Approved",
      message: "Capital One has approved your vendor profile",
      timestamp: "2026-01-11T14:20:00",
      read: true,
      category: "bank",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread" && n.read) return false;
    if (categoryFilter !== "all" && n.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const typeColors = {
    info: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    success: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    warning: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    error: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <CheckCheck className="w-5 h-5" />
              Mark All Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="order">Orders</option>
            <option value="license">Licenses</option>
            <option value="bank">Banks</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-2">No notifications</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {filter === "unread" ? "You're all caught up!" : "No notifications to show"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border-2 transition-all ${
                !notification.read
                  ? "border-primary/20"
                  : "border-transparent"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    !notification.read ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className={`text-sm font-semibold ${
                        !notification.read
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[notification.type]}`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
