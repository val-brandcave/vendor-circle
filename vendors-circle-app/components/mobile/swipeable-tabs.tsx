"use client";

import { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

interface Tab {
  id: string;
  label: string;
  badge?: number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SwipeableTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function SwipeableTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: SwipeableTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get active tab index
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Swipe left - go to next tab
      if (activeIndex < tabs.length - 1) {
        onTabChange(tabs[activeIndex + 1].id);
      }
    },
    onSwipedRight: () => {
      // Swipe right - go to previous tab
      if (activeIndex > 0) {
        onTabChange(tabs[activeIndex - 1].id);
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 50, // Minimum swipe distance
  });

  return (
    <div className={`relative ${className}`} {...handlers}>
      {/* Tab Buttons */}
      <div 
        ref={containerRef}
        className="flex border-b border-gray-200 dark:border-gray-700"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-3 px-2 text-center font-medium transition-colors relative ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-sm sm:text-base">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Animated Indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary dark:bg-blue-400 transition-transform duration-300 ease-out"
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${activeIndex * 100}%)`
        }}
      />
    </div>
  );
}
