'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Toggle Switch Component
function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label || 'Toggle setting'}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function VendorSettingsPage() {
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Email Notifications
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email updates about new bids and messages
                </div>
              </div>
              <ToggleSwitch
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Push Notifications
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Get instant notifications for urgent items
                </div>
              </div>
              <ToggleSwitch
                checked={pushNotifications}
                onChange={setPushNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Weekly Digest
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Receive a weekly summary of your activity
                </div>
              </div>
              <ToggleSwitch
                checked={weeklyDigest}
                onChange={setWeeklyDigest}
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Email Address
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  tom@reynoldsappraisals.com
                </div>
              </div>
              <button className="text-sm text-primary dark:text-blue-400 hover:text-[#1d3f8f] font-medium">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Password
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  •••••••••
                </div>
              </div>
              <button className="text-sm text-primary dark:text-blue-400 hover:text-[#1d3f8f] font-medium">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Language
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  English (US)
                </div>
              </div>
              <button className="text-sm text-primary dark:text-blue-400 hover:text-[#1d3f8f] font-medium">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Time Zone
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Pacific Time (PT)
                </div>
              </div>
              <button className="text-sm text-primary dark:text-blue-400 hover:text-[#1d3f8f] font-medium">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Danger Zone
          </h2>

          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium text-left">
              Deactivate Account
            </button>
            <button className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium text-left">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
