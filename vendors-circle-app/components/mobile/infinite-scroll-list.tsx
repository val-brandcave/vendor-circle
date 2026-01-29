"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  className?: string;
  emptyState?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
}

export default function InfiniteScrollList<T>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 200,
  className = "",
  emptyState,
  loadingIndicator,
}: InfiniteScrollListProps<T>) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && hasMore && !isLoadingMore && !loading) {
          setIsLoadingMore(true);
          try {
            await onLoadMore();
          } finally {
            setIsLoadingMore(false);
          }
        }
      },
      {
        root: null,
        rootMargin: `${threshold}px`,
        threshold: 0.1,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, loading, onLoadMore, threshold]);

  // Show empty state if no items and not loading
  if (items.length === 0 && !loading && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {/* Item List */}
      {items.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}

      {/* Loading More Indicator */}
      {(isLoadingMore || loading) && (
        <div className="flex items-center justify-center py-6">
          {loadingIndicator || (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading more...</span>
            </div>
          )}
        </div>
      )}

      {/* End of List Message */}
      {!hasMore && items.length > 0 && (
        <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
          No more items to load
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-4" />
    </div>
  );
}
