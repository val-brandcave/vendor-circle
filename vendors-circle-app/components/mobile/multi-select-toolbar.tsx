"use client";

import { X, Trash2, Archive, Download } from "lucide-react";

interface MultiSelectToolbarProps {
  selectedCount: number;
  onCancel: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onExport?: () => void;
  actions?: Array<{
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
    color?: "blue" | "red" | "green";
  }>;
}

export default function MultiSelectToolbar({
  selectedCount,
  onCancel,
  onDelete,
  onArchive,
  onExport,
  actions,
}: MultiSelectToolbarProps) {
  const defaultActions = [
    ...(onDelete ? [{
      label: "Delete",
      icon: Trash2,
      onClick: onDelete,
      color: "red" as const,
    }] : []),
    ...(onArchive ? [{
      label: "Archive",
      icon: Archive,
      onClick: onArchive,
      color: "blue" as const,
    }] : []),
    ...(onExport ? [{
      label: "Export",
      icon: Download,
      onClick: onExport,
      color: "blue" as const,
    }] : []),
  ];

  const allActions = actions || defaultActions;

  const getButtonClasses = (color: string = "blue") => {
    const baseClasses = "flex-1 flex flex-col items-center justify-center py-3 transition-colors";
    const colorClasses = {
      blue: "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      red: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
      green: "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20",
    };
    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`;
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40">
      <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onCancel}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
          {selectedCount} selected
        </span>
      </div>

      <div className="flex">
        {allActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={getButtonClasses(action.color)}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
