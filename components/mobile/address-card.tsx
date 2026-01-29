"use client";

import { MapPin, MoreVertical, Star } from "lucide-react";
import { useState } from "react";

interface MobileAddressCardProps {
  address: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  type: string;
  isPrimary: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetPrimary?: () => void;
}

export default function MobileAddressCard({
  address,
  city,
  state,
  county,
  zip,
  type,
  isPrimary,
  onEdit,
  onDelete,
  onSetPrimary,
}: MobileAddressCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm relative">
      {/* Header with Type and Menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {type}
          </span>
          {isPrimary && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <Star className="w-3 h-3 fill-current" />
              Primary
            </span>
          )}
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
              {!isPrimary && onSetPrimary && (
                <button
                  onClick={() => {
                    onSetPrimary();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
                >
                  Set as Primary
                </button>
              )}
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-200 dark:border-gray-700"
                disabled={isPrimary}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-2">
        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-white">
            {address}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {city}, {state} {zip}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {county} County
          </p>
        </div>
      </div>
    </div>
  );
}
