'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertTriangle, Clock, FileText, Shield, ChevronRight, X, ChevronDown } from 'lucide-react';
import { ExpiringItem, formatExpiryDate, getUrgencyLevel } from '@/lib/utils/expiry-helpers';

interface ExpiryAlertSectionProps {
  items: ExpiringItem[];
  userType: 'vendor' | 'business';
  onDismiss?: () => void;
  isDismissed?: boolean;
  showHelper?: boolean; // Whether to show helper text (default true for vendor, false for business)
}

export function ExpiryAlertSection({
  items,
  userType,
  onDismiss,
  isDismissed = false,
  showHelper = true,
}: ExpiryAlertSectionProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't show if no items or dismissed
  if (!items || items.length === 0 || isDismissed) {
    return null;
  }

  const handleItemClick = (item: ExpiringItem) => {
    router.push(item.actionUrl);
  };

  const getIconForType = (type: ExpiringItem['type']) => {
    switch (type) {
      case 'license':
        return <FileText className="w-5 h-5" />;
      case 'insurance':
        return <Shield className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getMostUrgentItem = () => {
    return items[0]; // Already sorted by daysUntilExpiry
  };

  const mostUrgent = getMostUrgentItem();
  const urgencyLevel = getUrgencyLevel(mostUrgent.daysUntilExpiry);

  const urgencyColors = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-600 text-white',
      text: 'text-red-900 dark:text-red-200',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-600 text-white',
      text: 'text-amber-900 dark:text-amber-200',
    },
    info: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      badge: 'bg-yellow-600 text-white',
      text: 'text-yellow-900 dark:text-yellow-200',
    },
  };

  const colors = urgencyColors[urgencyLevel];

  const isDays = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  return (
    <div
      className={`rounded-lg border-2 ${colors.bg} ${colors.border} p-5 mb-6`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 mt-1`}>
          <div className={`w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center ${colors.icon}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`text-sm font-semibold ${colors.text} mb-1`}>
                Action Required: Documents Expiring Soon
              </h3>
              <p className={`text-xs ${colors.text} opacity-75`}>
                You have {items.length} document{items.length > 1 ? 's' : ''} expiring within 30 days
              </p>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className={`flex-shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors`}
                title="Dismiss alert"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Items List - Show first 2 by default, collapse if more than 2 */}
          <div className="mt-4 space-y-2">
            {items.slice(0, isExpanded ? items.length : 2).map((item, index) => {
              const itemUrgency = getUrgencyLevel(item.daysUntilExpiry);
              const itemColors = urgencyColors[itemUrgency];

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full text-left flex items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 group`}
                >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Type Icon */}
                      <div className={`flex-shrink-0 ${itemColors.icon}`}>
                        {getIconForType(item.type)}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          {item.memberName && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                              item.memberName === 'You'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                            }`}>
                              {item.memberName}
                            </span>
                          )}
                        </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Expires {formatExpiryDate(item.expiryDate)} ({isDays(item.daysUntilExpiry)})
                      </p>
                    </div>
                  </div>

                  {/* Expiry Badge + Arrow */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${itemColors.badge}`}>
                      {isDays(item.daysUntilExpiry)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* View All / View Less Button - Show if more than 2 items */}
          {items.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-4 w-full py-2 px-3 flex items-center justify-center gap-2 rounded-lg transition-colors text-sm font-medium ${
                isExpanded
                  ? `text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600`
                  : `${colors.text} hover:bg-white dark:hover:bg-gray-700 bg-white dark:bg-gray-800`
              }`}
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4 transform rotate-180" />
                  View Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View All {items.length} Items
                </>
              )}
            </button>
          )}

          {/* Helper text - only show for vendor, not for business */}
          {showHelper && items.length <= 2 && (
            <p className={`text-xs mt-3 ${colors.text} opacity-75`}>
              Click any item above to address it
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
