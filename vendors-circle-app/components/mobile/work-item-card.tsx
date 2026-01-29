"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

interface WorkItemCardProps {
  fileNumber: string;
  propertyAddress: string;
  bankName: string;
  bankLogo: string;
  status: string;
  statusBadge: {
    text: string;
    className: string;
  };
  dueDate: string;
  onView: () => void;
}

export default function MobileWorkItemCard({
  fileNumber,
  propertyAddress,
  bankName,
  bankLogo,
  status,
  statusBadge,
  dueDate,
  onView,
}: WorkItemCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
      {/* Bank Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={bankLogo}
            alt={bankName}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {bankName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {fileNumber}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-3">
        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {propertyAddress}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
        >
          {statusBadge.text}
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <Calendar className="w-4 h-4" />
        <span>Due: {dueDate}</span>
      </div>

      {/* View Button */}
      <button
        onClick={onView}
        className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
      >
        View Details
      </button>
    </div>
  );
}
