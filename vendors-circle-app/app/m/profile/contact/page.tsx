"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactInfoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    primaryEmail: "tom@reynoldsappraisals.com",
    workEmail: "work@reynoldsappraisals.com",
    workPhone: "(813) 555-0123",
    cellPhone: "(813) 555-0124",
    fax: "(813) 555-0125",
  });

  const handleSave = () => {
    console.log("Saving contact info", form);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contact Info
        </h2>
        <button
          onClick={handleSave}
          className="text-blue-600 dark:text-blue-400 font-medium"
        >
          Save
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Email
          </label>
          <input
            type="email"
            value={form.primaryEmail}
            onChange={(e) => setForm({ ...form, primaryEmail: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Email
          </label>
          <input
            type="email"
            value={form.workEmail}
            onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Phone
          </label>
          <input
            type="tel"
            value={form.workPhone}
            onChange={(e) => setForm({ ...form, workPhone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cell Phone
          </label>
          <input
            type="tel"
            value={form.cellPhone}
            onChange={(e) => setForm({ ...form, cellPhone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fax
          </label>
          <input
            type="tel"
            value={form.fax}
            onChange={(e) => setForm({ ...form, fax: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
