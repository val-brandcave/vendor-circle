"use client";

import { useEffect, useState, useRef } from "react";

interface ActionSheetAction {
  label: string;
  type?: "default" | "destructive" | "primary";
  onClick: () => void;
  disabled?: boolean;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: ActionSheetAction[];
  showCancel?: boolean;
  cancelLabel?: string;
}

export default function ActionSheet({
  isOpen,
  onClose,
  title,
  message,
  actions,
  showCancel = true,
  cancelLabel = "Cancel",
}: ActionSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "";
      // Delay hiding to allow animation
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Touch handlers for swipe down to dismiss
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet || !isOpen) return;

    let startY = 0;
    let currentTranslateY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaY = e.touches[0].clientY - startY;
      
      // Only allow dragging down
      if (deltaY > 0) {
        currentTranslateY = deltaY;
        sheet.style.transform = `translateY(${deltaY}px)`;
        sheet.style.transition = "none";
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      // Close if dragged down more than 100px
      if (currentTranslateY > 100) {
        onClose();
      } else {
        // Snap back
        sheet.style.transform = "translateY(0)";
        sheet.style.transition = "transform 0.3s ease-out";
      }
      currentTranslateY = 0;
    };

    sheet.addEventListener("touchstart", handleTouchStart, { passive: true });
    sheet.addEventListener("touchmove", handleTouchMove, { passive: true });
    sheet.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, onClose]);

  const getButtonClasses = (type: ActionSheetAction["type"] = "default") => {
    const baseClasses = "w-full py-3.5 px-4 text-center font-medium transition-colors rounded-lg";
    
    switch (type) {
      case "primary":
        return `${baseClasses} bg-primary hover:bg-primary-700 text-white`;
      case "destructive":
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white`;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-200"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-4 pb-4 overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Header */}
          {(title || message) && (
            <div className="text-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
              )}
              {message && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {message}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                disabled={action.disabled}
                className={`${getButtonClasses(action.type)} ${
                  action.disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {action.label}
              </button>
            ))}

            {/* Cancel Button */}
            {showCancel && (
              <button
                onClick={onClose}
                className="w-full py-3.5 px-4 text-center font-medium transition-colors rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {cancelLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
