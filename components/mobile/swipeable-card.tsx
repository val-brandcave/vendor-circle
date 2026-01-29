"use client";

import { useState, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface SwipeAction {
  label: string;
  icon?: LucideIcon;
  color: "blue" | "red" | "green" | "gray";
  onClick: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onTap?: () => void;
  className?: string;
}

const colorClasses = {
  blue: "bg-blue-500 hover:bg-blue-600 text-white",
  red: "bg-red-500 hover:bg-red-600 text-white",
  green: "bg-green-500 hover:bg-green-600 text-white",
  gray: "bg-gray-500 hover:bg-gray-600 text-white",
};

export default function SwipeableCard({
  children,
  leftActions = [],
  rightActions = [],
  onTap,
  className = "",
}: SwipeableCardProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  // Calculate action button widths
  const actionWidth = 80;
  const maxLeftSwipe = leftActions.length * actionWidth;
  const maxRightSwipe = -rightActions.length * actionWidth;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      currentXRef.current = translateX;
      setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - startXRef.current;
      const newTranslate = currentXRef.current + deltaX;

      // Apply constraints
      const constrainedTranslate = Math.max(
        maxRightSwipe,
        Math.min(maxLeftSwipe, newTranslate)
      );

      setTranslateX(constrainedTranslate);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const threshold = 60;

      if (translateX > threshold && leftActions.length > 0) {
        // Reveal left actions
        setTranslateX(maxLeftSwipe);
        setIsRevealed(true);
      } else if (translateX < -threshold && rightActions.length > 0) {
        // Reveal right actions
        setTranslateX(maxRightSwipe);
        setIsRevealed(true);
      } else {
        // Snap back
        setTranslateX(0);
        setIsRevealed(false);
      }
    };

    card.addEventListener("touchstart", handleTouchStart, { passive: true });
    card.addEventListener("touchmove", handleTouchMove, { passive: true });
    card.addEventListener("touchend", handleTouchEnd);

    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, [translateX, isDragging, leftActions.length, rightActions.length, maxLeftSwipe, maxRightSwipe]);

  const handleActionClick = (action: SwipeAction) => {
    // Execute action
    action.onClick();
    
    // Snap back to center
    setTranslateX(0);
    setIsRevealed(false);
  };

  const handleCardClick = () => {
    if (isRevealed) {
      // If actions are revealed, just hide them
      setTranslateX(0);
      setIsRevealed(false);
    } else if (onTap) {
      // If not revealed and has tap handler, execute it
      onTap();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800">
      {/* Left Actions (revealed by swiping right) */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex z-0">
          {leftActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                className={`flex flex-col items-center justify-center gap-1 ${colorClasses[action.color]}`}
                style={{ width: `${actionWidth}px` }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Right Actions (revealed by swiping left) */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex z-0">
          {rightActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                className={`flex flex-col items-center justify-center gap-1 ${colorClasses[action.color]}`}
                style={{ width: `${actionWidth}px` }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Card Content */}
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`relative z-10 bg-white dark:bg-gray-800 ${className}`}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isRevealed || Math.abs(translateX) > 5 ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
