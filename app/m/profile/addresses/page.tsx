"use client";

import { useRouter } from "next/navigation";
import SettingsRow from "@/components/mobile/settings-row";

export default function AddressesPage() {
  const router = useRouter();

  const addresses = [
    { id: "1", type: "Primary", icon: "🏠", street: "123 Main St", city: "Tampa, FL 33602" },
    { id: "2", type: "Office", icon: "🏢", street: "456 Oak Ave", city: "Tampa, FL 33607" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => router.push(`/m/profile/addresses/${addr.id}`)}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{addr.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  {addr.type}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {addr.street}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {addr.city}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => router.push("/m/profile/addresses/add")}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-medium hover:border-primary hover:text-primary transition-colors"
        >
          + Add Address
        </button>
      </div>
    </div>
  );
}
