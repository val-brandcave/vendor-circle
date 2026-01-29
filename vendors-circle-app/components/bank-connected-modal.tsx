/**
 * Bank Connected Modal
 * Shows when user successfully connects to a bank via invite
 */

'use client';

import { CheckCircle, X } from 'lucide-react';
import { getBankById } from '@/lib/data/banks';

interface BankConnectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankId: string;
  bankName: string;
}

export function BankConnectedModal({
  isOpen,
  onClose,
  bankId,
  bankName,
}: BankConnectedModalProps) {
  if (!isOpen) return null;

  const bank = getBankById(bankId);
  const bankLogo = bank?.logo || '/logos/banks/generic-bank-logo.svg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Bank Logo */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
            <img 
              src={bankLogo} 
              alt={bankName} 
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            You're Connected!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            You're now connected with
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {bankName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {bankName} can now see your credentials and send you bid invitations. 
            You can view all your connected banks in your profile.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
