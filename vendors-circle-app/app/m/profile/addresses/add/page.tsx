"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAddressPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: "Office",
    street: "",
    suite: "",
    city: "",
    state: "FL",
    zip: "",
  });

  const handleSave = () => {
    console.log("Adding address", form);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Address
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
            Address Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Primary">Primary</option>
            <option value="Office">Office</option>
            <option value="Mailing">Mailing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Street Address
          </label>
          <input
            type="text"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            placeholder="123 Main Street"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suite / Unit (Optional)
          </label>
          <input
            type="text"
            value={form.suite}
            onChange={(e) => setForm({ ...form, suite: e.target.value })}
            placeholder="Suite 200"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Tampa"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State
            </label>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="AL">AL</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            placeholder="33602"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
