"use client";

import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface SettingsRowProps {
  label: string;
  value?: string | React.ReactNode;
  icon?: LucideIcon;
  badge?: string | number;
  href?: string;
  onClick?: () => void;
  destructive?: boolean;
  showChevron?: boolean;
  className?: string;
}

export default function SettingsRow({
  label,
  value,
  icon: Icon,
  badge,
  href,
  onClick,
  destructive = false,
  showChevron = true,
  className = "",
}: SettingsRowProps) {
  const content = (
    <>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {Icon && (
          <Icon className={`w-5 h-5 flex-shrink-0 ${
            destructive ? "text-red-500" : "text-gray-400"
          }`} />
        )}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${
            destructive 
              ? "text-red-600 dark:text-red-400" 
              : "text-gray-900 dark:text-white"
          }`}>
            {label}
          </p>
          {value && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {value}
            </p>
          )}
        </div>
      </div>

      {badge && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2">
          {badge}
        </span>
      )}

      {showChevron && (
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </>
  );

  const baseClasses = `w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {content}
      </button>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
}
