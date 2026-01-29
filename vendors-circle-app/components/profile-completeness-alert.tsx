"use client";

import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ProfileCompletenessResult } from "@/lib/utils/profile-completeness";

interface ProfileCompletenessAlertProps {
  result: ProfileCompletenessResult;
  onComplete?: () => void;
  className?: string;
}

export function ProfileCompletenessAlert({
  result,
  onComplete,
  className = "",
}: ProfileCompletenessAlertProps) {
  const { percentage, incompleteSections, color } = result;

  // Don't show alert if profile is complete
  if (percentage === 100) {
    return null;
  }

  const Icon = color === "green" ? CheckCircle : color === "yellow" ? AlertCircle : XCircle;

  const bgColor =
    color === "green"
      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      : color === "yellow"
      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";

  const textColor =
    color === "green"
      ? "text-green-800 dark:text-green-200"
      : color === "yellow"
      ? "text-yellow-800 dark:text-yellow-200"
      : "text-red-800 dark:text-red-200";

  const iconColor =
    color === "green"
      ? "text-green-600 dark:text-green-400"
      : color === "yellow"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className={`rounded-lg border p-4 ${bgColor} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
        <div className="flex-1">
          <h3 className={`font-medium ${textColor}`}>
            Your profile is {percentage}% complete
          </h3>
          <p className={`text-sm mt-1 ${textColor} opacity-90`}>
            Complete your profile to unlock full platform features and improve your visibility
            to potential clients.
          </p>
          {incompleteSections.length > 0 && (
            <div className="mt-3">
              <p className={`text-sm font-medium ${textColor}`}>Missing sections:</p>
              <ul className={`text-sm mt-1 space-y-1 ${textColor} opacity-80`}>
                {incompleteSections.slice(0, 3).map((section) => (
                  <li key={section}>• {section}</li>
                ))}
                {incompleteSections.length > 3 && (
                  <li>• And {incompleteSections.length - 3} more...</li>
                )}
              </ul>
            </div>
          )}
          {onComplete && (
            <button
              onClick={onComplete}
              className={`mt-4 text-sm font-medium underline ${textColor} hover:opacity-80 transition-opacity`}
            >
              Complete your profile now →
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              color === "green"
                ? "bg-green-500"
                : color === "yellow"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
