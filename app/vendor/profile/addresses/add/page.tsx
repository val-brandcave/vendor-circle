"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function AddAddressPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isPrimary: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Adding address:", formData);
      setIsSaving(false);
      router.push("/vendor/profile");
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.push("/vendor/profile")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Add Address
        </h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Address Label *
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Office, Home"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => handleChange("street", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="123 Main St"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="San Diego"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="CA"
                maxLength={2}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="92101"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => handleChange("isPrimary", e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Set as primary address
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/vendor/profile")}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !formData.label || !formData.street || !formData.city || !formData.state || !formData.zipCode}
            className="flex-1 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Add Address"}
          </button>
        </div>
      </div>
    </div>
  );
}
