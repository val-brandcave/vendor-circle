"use client";

import { Calendar, FileText, MoreVertical } from "lucide-react";
import { useState } from "react";

interface MobileLicenseCardProps {
  state: string;
  stateName: string;
  licenseNumber: string;
  expirationDate: string;
  status: "active" | "expiring" | "expiring_soon" | "expired";
  fileName: string;
  onEdit: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

export default function MobileLicenseCard({
  state,
  stateName,
  licenseNumber,
  expirationDate,
  status,
  fileName,
  onEdit,
  onDelete,
  onDownload,
}: MobileLicenseCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const statusConfig: Record<string, { text: string; className: string }> = {
    active: {
      text: "Active",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    expiring: {
      text: "Expiring Soon",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    expiring_soon: {
      text: "Expiring Soon",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    expired: {
      text: "Expired",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  // Fallback to active if status is not found
  const config = statusConfig[status] || statusConfig.active;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm relative">
      {/* Header with State and Menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{state}</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
            {config.text}
          </span>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Actions"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Action Menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-4 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[160px]">
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDownload();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
              >
                Download
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-200 dark:border-gray-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* State Name */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
        {stateName}
      </h3>

      {/* License Number */}
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
        <FileText className="w-4 h-4" />
        <span>{licenseNumber}</span>
      </div>

      {/* Expiration Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Calendar className="w-4 h-4" />
        <span>Expires: {new Date(expirationDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
