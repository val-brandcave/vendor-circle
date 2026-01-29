'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getBusinessById } from '@/lib/data/business-mock-data';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  CreditCard, 
  Save, 
  Upload, 
  Image as ImageIcon,
  FileText,
  Plus,
  Trash2,
  Edit2,
  User
} from 'lucide-react';
import { SkeletonProfileSection } from '@/components/skeleton';
import Image from 'next/image';

type TabType = 'account' | 'info' | 'subscription';

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

export default function BusinessSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const business = getBusinessById(user?.profile?.businessId || '');
  const [saving, setSaving] = useState(false);

  // Account state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [teamActivityAlerts, setTeamActivityAlerts] = useState(true);
  const [bidAssignmentAlerts, setBidAssignmentAlerts] = useState(true);
  const [licenseExpirationAlerts, setLicenseExpirationAlerts] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <SkeletonProfileSection />
      </div>
    );
  }

  const businessData = business || {
    name: '',
    dba: '',
    ein: '',
    founded: '',
    description: '',
    address: { line1: '', line2: '', city: '', state: 'CA', zip: '' },
    phone: '',
    email: user?.email || '',
    website: '',
    subscriptionTier: 'starter',
    id: 'new',
    createdDate: new Date().toISOString(),
    status: 'active',
    connectedBanks: 12,
    totalUsers: 0,
  };

  return (
    <div className="min-h-full">
      {/* Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <nav className="flex gap-2 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hidden">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === 'account'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-medium whitespace-nowrap">Account</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="font-medium whitespace-nowrap">Business Info</span>
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === 'subscription'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="font-medium whitespace-nowrap">Subscription</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6 space-y-6">
        {activeTab === 'account' ? (
          <>
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
                      Receive email updates about bids, team activity, and messages
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
                      Receive a weekly summary of business activity
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={weeklyDigest}
                    onChange={setWeeklyDigest}
                  />
                </div>
              </div>
            </div>

            {/* Business Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Business Alerts
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Team Activity Alerts
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified when team members accept or complete bids
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={teamActivityAlerts}
                    onChange={setTeamActivityAlerts}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      Bid Assignment Alerts
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about new bids that need assignment
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={bidAssignmentAlerts}
                    onChange={setBidAssignmentAlerts}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      License Expiration Alerts
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Reminders when team licenses are approaching expiration
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={licenseExpirationAlerts}
                    onChange={setLicenseExpirationAlerts}
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
                      {user?.email || 'sarah@coastalappraisals.com'}
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
          </>
        ) : activeTab === 'info' ? (
          <>
            {/* Business Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Business Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.name}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      DBA (Doing Business As)
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.dba}
                      placeholder="Doing Business As (optional)"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      EIN (Tax ID) *
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.ein}
                      placeholder="12-3456789"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Founded Date
                    </label>
                    <input
                      type="date"
                      defaultValue={businessData.founded}
                      placeholder="YYYY-MM-DD"
                      title="Founded Date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={businessData.description}
                      placeholder="Brief description of your business"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        defaultValue={businessData.phone}
                        placeholder="(555) 123-4567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        defaultValue={businessData.email}
                        placeholder="info@yourbusiness.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        defaultValue={businessData.website}
                        placeholder="www.yourwebsite.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Business Address
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your company's primary location
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.address.line1}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Suite / Unit
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.address.line2}
                      placeholder="Suite 100"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.address.city}
                      placeholder="San Diego"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <select
                      defaultValue={businessData.address.state}
                      title="Select State"
                      aria-label="State"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="CA">California</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                      <option value="NV">Nevada</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      defaultValue={businessData.address.zip}
                      placeholder="92101"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Business Logo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Business Logo
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                    {businessData.name ? (
                      <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                        {businessData.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mb-2">
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Recommended: 200x200px, PNG or JPG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        ) : activeTab === 'subscription' ? (
          <>
            {/* Subscription & Billing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Subscription & Billing
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Current Plan</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {businessData.subscriptionTier === 'enterprise' ? 'Enterprise' :
                       businessData.subscriptionTier === 'professional' ? 'Professional' :
                       'Starter'} Plan
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm font-medium">
                    Upgrade
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Team Members</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{businessData.totalUsers || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Billing Status</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Account Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Account ID</p>
                    <p className="font-mono text-gray-900 dark:text-white">{businessData.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Created Date</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(businessData.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Status</p>
                    <span className="inline-flex px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium capitalize">
                      {businessData.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Total Connected Banks</p>
                    <p className="text-gray-900 dark:text-white">{businessData.connectedBanks}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
