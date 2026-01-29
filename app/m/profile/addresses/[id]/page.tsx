"use client";

import { useRouter } from "next/navigation";
import { MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActionSheet from "@/components/mobile/action-sheet";
import { useState, use } from "react";

export default function AddressDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [showDeleteSheet, setShowDeleteSheet] = useState(false);

  // Unwrap params Promise
  const { id } = use(params);

  // Mock address data
  const address = {
    id: id,
    type: id === "1" ? "Primary" : "Office",
    icon: id === "1" ? "🏠" : "🏢",
    street: id === "1" ? "123 Main St" : "456 Oak Ave",
    suite: id === "1" ? "" : "Suite 200",
    city: "Tampa",
    state: "FL",
    zip: id === "1" ? "33602" : "33607",
    county: "Hillsborough County",
  };

  const handleDelete = () => {
    console.log("Delete address", id);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4">
        {/* Address Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{address.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {address.type}
              </h2>
            </div>
          </div>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>{address.street}</p>
            {address.suite && <p>{address.suite}</p>}
            <p>{address.city}, {address.state} {address.zip}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {address.county}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button size="lg" className="w-full">
            Edit Address
          </Button>
          
          {id !== "1" && (
            <Button
              onClick={() => setShowDeleteSheet(true)}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              Delete Address
            </Button>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <ActionSheet
        isOpen={showDeleteSheet}
        onClose={() => setShowDeleteSheet(false)}
        title="Delete Address"
        message="Are you sure you want to delete this address?"
        actions={[
          {
            label: "Delete Address",
            type: "destructive",
            onClick: handleDelete,
          },
        ]}
      />
    </div>
  );
}
