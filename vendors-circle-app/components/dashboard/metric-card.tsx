'use client';

import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'warning' | 'danger';
  loading?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  onClick,
  variant = 'default',
  loading = false,
  className,
}: MetricCardProps) {
  const isClickable = !!onClick;

  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.direction === 'up') {
      return <TrendingUp className={cn(
        'w-4 h-4',
        trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      )} />;
    }
    
    if (trend.direction === 'down') {
      return <TrendingDown className={cn(
        'w-4 h-4',
        trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      )} />;
    }
    
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend.isPositive 
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'relative p-6 rounded-xl border transition-all duration-200',
        variantStyles[variant],
        isClickable && 'cursor-pointer hover:shadow-lg hover:scale-102 active:scale-100',
        loading && 'animate-pulse',
        className
      )}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Icon (optional, top right) */}
      {Icon && (
        <div className="absolute top-6 right-6">
          <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-2">
        {/* Label */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {label}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {loading ? '—' : value}
        </div>

        {/* Trend */}
        {trend && !loading && (
          <div className={cn('flex items-center gap-1.5 text-sm font-medium', getTrendColor())}>
            {getTrendIcon()}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper for empty state
export function MetricCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
}
