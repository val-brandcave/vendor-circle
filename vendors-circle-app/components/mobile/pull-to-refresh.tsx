"use client";

import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
}

export default function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    let startY = 0;
    let currentY = 0;
    let isAtTop = true;
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Check if we're at the top of the scroll
      isAtTop = container.scrollTop <= 0;
      if (isAtTop && !isRefreshing) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop || isRefreshing || !isPulling) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      if (deltaY > 0) {
        // Prevent default scroll when pulling down
        e.preventDefault();
        
        // Apply resistance curve (gets harder to pull the further you go)
        const resistance = 0.5;
        const distance = Math.min(deltaY * resistance, threshold * 1.5);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (!isAtTop || isRefreshing || !isPulling) {
        setPullDistance(0);
        isPulling = false;
        return;
      }

      isPulling = false;

      if (pullDistance >= threshold) {
        // Trigger refresh
        setIsRefreshing(true);
        setPullDistance(threshold);

        try {
          await onRefresh();
        } finally {
          // Reset after delay
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
          }, 300);
        }
      } else {
        // Snap back
        setPullDistance(0);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, threshold, isRefreshing, onRefresh, disabled]);

  const opacity = Math.min(pullDistance / threshold, 1);
  const scale = 0.5 + (pullDistance / threshold) * 0.5;
  const rotation = (pullDistance / threshold) * 360;

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
      {/* Pull Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
        style={{ 
          transform: `translateY(${pullDistance - 40}px)`,
          opacity 
        }}
      >
        <div
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
          style={{ transform: `scale(${scale})` }}
        >
          <div style={{ transform: `rotate(${rotation}deg)` }}>
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </div>
          <span className="text-sm font-medium">
            {isRefreshing ? "Refreshing..." : pullDistance >= threshold ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div 
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? "transform 0.3s ease-out" : "none"
        }}
      >
        {children}
      </div>
    </div>
  );
}
