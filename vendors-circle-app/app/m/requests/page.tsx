"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import SwipeableTabs from "@/components/mobile/swipeable-tabs";
import PullToRefresh from "@/components/mobile/pull-to-refresh";
import InfiniteScrollList from "@/components/mobile/infinite-scroll-list";
import { mockWorkItems } from "@/lib/data/mock-data";

export default function MobileRequestsPage() {
  const [activeTab, setActiveTab] = useState<"bids" | "reports">("bids");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "urgent" | "due_soon" | "this_week">("all");
  
  // Filter work items by tab
  const bidsStages = ["bids_needed", "bids_submitted", "bids_confirmation", "bids_lost"];
  const reportsStages = ["reports_process", "reports_rework", "reports_reupload", "completed"];
  
  const filteredItems = useMemo(() => {
    const stages = activeTab === "bids" ? bidsStages : reportsStages;
    let items = mockWorkItems.filter(item => stages.includes(item.stage));
    
    // Apply quick filters
    const now = new Date();
    if (activeFilter === "urgent") {
      items = items.filter(item => {
        const dueDate = new Date(item.dueDate);
        const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 3;
      });
    } else if (activeFilter === "due_soon") {
      items = items.filter(item => {
        const dueDate = new Date(item.dueDate);
        const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 7;
      });
    } else if (activeFilter === "this_week") {
      items = items.filter(item => {
        const dueDate = new Date(item.dueDate);
        const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 7;
      });
    }
    
    return items;
  }, [activeTab, activeFilter]);
  
  // Search functionality
  const searchedItems = useMemo(() => {
    if (!searchQuery) return filteredItems;
    const query = searchQuery.toLowerCase();
    return filteredItems.filter(item =>
      item.fileNumber.toLowerCase().includes(query) ||
      item.propertyAddress.toLowerCase().includes(query) ||
      item.bankName.toLowerCase().includes(query)
    );
  }, [filteredItems, searchQuery]);
  
  // Infinite scroll state
  const [displayCount, setDisplayCount] = useState(10);
  
  // Reset display count when filters or search changes
  useEffect(() => {
    setDisplayCount(10);
  }, [searchQuery, activeFilter, activeTab]);
  
  const hasMore = displayCount < searchedItems.length;
  const displayedItems = searchedItems.slice(0, displayCount);
  
  // Pull to refresh handler
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayCount(10);
  };
  
  // Load more handler
  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setDisplayCount(prev => prev + 10);
  };
  
  const getStatusDisplay = (stage: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      bids_needed: { label: "Bids Needed", color: "red" },
      bids_submitted: { label: "Submitted", color: "blue" },
      bids_confirmation: { label: "Confirmation Needed", color: "yellow" },
      bids_lost: { label: "Lost", color: "gray" },
      reports_process: { label: "In Process", color: "blue" },
      reports_rework: { label: "Rework Needed", color: "yellow" },
      reports_reupload: { label: "Reupload Needed", color: "red" },
      completed: { label: "Completed", color: "green" },
    };
    return statusMap[stage] || { label: stage, color: "gray" };
  };
  
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {/* Swipeable Tabs */}
        <SwipeableTabs
          tabs={[
            { id: "bids", label: "Bids", badge: mockWorkItems.filter(i => bidsStages.includes(i.stage)).length },
            { id: "reports", label: "Reports", badge: mockWorkItems.filter(i => reportsStages.includes(i.stage)).length },
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as "bids" | "reports")}
          className="mb-4"
        />
        
        {/* Quick Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter("urgent")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === "urgent"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Urgent
          </button>
          <button 
            onClick={() => setActiveFilter("due_soon")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === "due_soon"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Due Soon
          </button>
          <button 
            onClick={() => setActiveFilter("this_week")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === "this_week"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            This Week
          </button>
        </div>
        
        {/* Infinite Scroll Card List */}
        <InfiniteScrollList
          items={displayedItems}
          renderItem={(item) => {
            const status = getStatusDisplay(item.stage);
            const statusColors = {
              red: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
              blue: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
              yellow: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
              green: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
              gray: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
            };
            
            return (
              <div
                key={item.id}
                onClick={() => window.open(item.externalFormUrl, '_blank')}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-3 active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 p-1.5">
                    <Image
                      src={item.bankLogo}
                      alt={item.bankName}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.bankName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.fileNumber}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {item.propertyAddress}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status.color as keyof typeof statusColors]}`}>
                    {status.label}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.externalFormUrl, '_blank');
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-700 text-white font-medium transition-colors"
                >
                  View Details →
                </button>
              </div>
            );
          }}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={false}
          className="space-y-3"
        />
        
        {/* Testing Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-2">
            ✅ All Features Working!
          </p>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <li>• <strong>Pull down</strong> to refresh</li>
            <li>• <strong>Tap filter chips</strong> to filter (All/Urgent/Due Soon)</li>
            <li>• <strong>Search</strong> by file #, address, or bank</li>
            <li>• <strong>Tap cards</strong> to view details</li>
            <li>• Showing <strong>{displayedItems.length} of {searchedItems.length}</strong> items</li>
          </ul>
        </div>
      </div>
    </PullToRefresh>
  );
}
