"use client";

import { useState } from "react";
import { HelpCircle, BookOpen, Rocket, MessageCircle, FileText, X } from "lucide-react";
import { FirstTimeModal } from "./first-time-modal";
import { useAuth } from "@/hooks/useAuth";

interface HelpMenuProps {
  userType: 'vendor' | 'business' | 'admin';
}

export function HelpMenu({ userType }: HelpMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const { user } = useAuth();

  const handleGetStarted = () => {
    setIsOpen(false);
    setTimeout(() => setShowGetStartedModal(true), 300);
  };

  const helpItems = [
    {
      icon: Rocket,
      label: "Get Started",
      description: "Interactive guide to key features",
      action: handleGetStarted,
    },
    {
      icon: BookOpen,
      label: "Documentation",
      description: "Comprehensive guides and FAQs",
      action: () => window.open("https://docs.vendorscircle.com", "_blank"),
    },
    {
      icon: MessageCircle,
      label: "Contact Support",
      description: "Get help from our team",
      action: () => window.open("mailto:support@vendorscircle.com"),
    },
    {
      icon: FileText,
      label: "Release Notes",
      description: "See what's new",
      action: () => window.open("https://vendorscircle.com/changelog", "_blank"),
    },
  ];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Help"
        title="Help & Resources"
      >
        <HelpCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 animate-in zoom-in-95 fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Help & Resources
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-2">
              {helpItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Need more help?{" "}
                <a
                  href="mailto:support@vendorscircle.com"
                  className="text-primary hover:underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </>
      )}

      {/* Get Started Modal - Can be triggered anytime */}
      {(userType === 'vendor' || userType === 'business') && (
        <FirstTimeModal
          isOpen={showGetStartedModal}
          onClose={() => setShowGetStartedModal(false)}
          userType={userType}
          ownerIsAppraiser={userType === 'business' ? user?.ownerIsAppraiser : undefined}
        />
      )}
    </>
  );
}
