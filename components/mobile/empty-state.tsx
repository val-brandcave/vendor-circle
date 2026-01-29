"use client";

interface EmptyStateProps {
  icon?: React.ReactNode | string;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  message,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="mb-4">
          {typeof icon === "string" ? (
            <p className="text-5xl">{icon}</p>
          ) : (
            icon
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-medium transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
