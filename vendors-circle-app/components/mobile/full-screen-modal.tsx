"use client";

import { ArrowLeft, X } from "lucide-react";
import { useEffect } from "react";

interface MobileFullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function MobileFullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: MobileFullScreenModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-800 z-[70] md:hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {title}
        </h1>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>

      {/* Footer - Sticky at bottom */}
      {footer && (
        <footer className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          {footer}
        </footer>
      )}
    </div>
  );
}
