'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getBusinessById } from '@/lib/data/business-mock-data';
import { Building2, Mail, Phone, Globe, MapPin, CreditCard, Save, ChevronRight } from 'lucide-react';

export default function MobileBusinessSettings() {
  const { user } = useAuth();
  const business = getBusinessById(user?.profile?.businessId || '');
  const [saving, setSaving] = useState(false);

  if (!business) {
    return <div className="p-4">Loading...</div>;
  }

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Business Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage your business information
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Business Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                Business Information
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                defaultValue={business.name}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                DBA
              </label>
              <input
                type="text"
                defaultValue={business.dba}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                defaultValue={business.description}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                Contact Information
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Phone *
              </label>
              <input
                type="tel"
                defaultValue={business.phone}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Email *
              </label>
              <input
                type="email"
                defaultValue={business.email}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                defaultValue={business.website}
                placeholder="www.yourwebsite.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                Business Address
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                defaultValue={business.address.line1}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Suite / Unit
              </label>
              <input
                type="text"
                defaultValue={business.address.line2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  defaultValue={business.address.city}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <select
                  defaultValue={business.address.state}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="CA">CA</option>
                  <option value="FL">FL</option>
                  <option value="IL">IL</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                defaultValue={business.address.zip}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                Subscription
              </h2>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Current Plan</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 capitalize">
                  {business.subscriptionTier}
                </p>
              </div>
              <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                Upgrade
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Active</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                <span className="text-gray-600 dark:text-gray-400">Members</span>
                <span className="font-semibold text-gray-900 dark:text-white">{business.totalUsers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium active:scale-95 transition-transform disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
