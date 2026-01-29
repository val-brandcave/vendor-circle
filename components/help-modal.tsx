'use client';

import { X, BookOpen, Rocket, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGetStarted = () => {
    onClose();
    router.push('/get-started');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Help & Resources
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Documentation */}
            <button
              onClick={() => {
                onClose();
                // TODO: Navigate to documentation
                window.open('https://docs.vendorscircle.com', '_blank');
              }}
              className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Documentation
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Browse our help articles and guides
                </div>
              </div>
            </button>

            {/* Get Started */}
            <button
              onClick={handleGetStarted}
              className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Get Started
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Review setup tasks and complete your profile
                </div>
              </div>
            </button>

            {/* Contact Support */}
            <button
              onClick={() => {
                onClose();
                // TODO: Open contact support
                window.location.href = 'mailto:support@vendorscircle.com';
              }}
              className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Contact Support
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Need help? We're here for you
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Available 24/7 • support@vendorscircle.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
