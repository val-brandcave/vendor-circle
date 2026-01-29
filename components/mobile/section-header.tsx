"use client";

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function SectionHeader({
  title,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`px-4 py-2 flex items-center justify-between ${className}`}>
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {title}
      </h3>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-primary dark:hover:text-blue-300 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
