"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderRequests: true,
    orderUpdates: true,
    licenseExpirations: true,
    bankMessages: true,
    systemUpdates: false,
    weeklyDigest: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Saving notification settings:", settings);
      setIsSaving(false);
      router.back();
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Notification Preferences
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage how you receive notifications
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Email Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Email Notifications
          </h2>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => toggleSetting("emailNotifications")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Enable Email Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive notifications via email
              </p>
            </div>
          </label>
        </div>

        {/* Order Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Order Notifications
          </h2>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.orderRequests}
              onChange={() => toggleSetting("orderRequests")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">New Order Requests</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When banks send you new appraisal requests
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.orderUpdates}
              onChange={() => toggleSetting("orderUpdates")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Order Updates</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When there are updates to your orders
              </p>
            </div>
          </label>
        </div>

        {/* Profile Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Profile & License Notifications
          </h2>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.licenseExpirations}
              onChange={() => toggleSetting("licenseExpirations")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">License Expirations</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reminders when licenses are approaching expiration
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.bankMessages}
              onChange={() => toggleSetting("bankMessages")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Bank Messages</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When banks send you messages
              </p>
            </div>
          </label>
        </div>

        {/* System Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Notifications
          </h2>
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.systemUpdates}
              onChange={() => toggleSetting("systemUpdates")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">System Updates</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Platform updates and new features
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.weeklyDigest}
              onChange={() => toggleSetting("weeklyDigest")}
              className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Weekly Digest</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Weekly summary of your activity
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
