"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { getCountiesForState } from "@/lib/data/us-counties";

interface CountyAccordionProps {
  stateCode: string;
  stateName: string;
  selectedCounties: string[];
  onChange: (counties: string[]) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CountyAccordion({
  stateCode,
  stateName,
  selectedCounties,
  onChange,
  isExpanded,
  onToggle
}: CountyAccordionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const counties = getCountiesForState(stateCode);
  
  const filteredCounties = counties.filter(county =>
    county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCounty = (county: string) => {
    if (selectedCounties.includes(county)) {
      onChange(selectedCounties.filter(c => c !== county));
    } else {
      onChange([...selectedCounties, county]);
    }
  };

  const selectAll = () => {
    onChange(counties);
  };

  const clearAll = () => {
    onChange([]);
  };

  // Clear search when accordion closes
  useEffect(() => {
    if (!isExpanded) {
      setSearchTerm("");
    }
  }, [isExpanded]);

  const selectedCount = selectedCounties.length;
  const totalCount = counties.length;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center justify-between gap-3 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              selectedCount > 0
                ? "bg-primary border-primary"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {selectedCount > 0 && <Check className="w-3 h-3 text-white" />}
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-white">
              {stateCode} - {stateName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCount > 0 ? (
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {selectedCount} of {totalCount} counties selected
                </span>
              ) : (
                <span>{totalCount} counties available</span>
              )}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          {/* Controls */}
          <div className="p-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search counties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={selectedCount === 0}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* County List */}
          <div className="max-h-64 overflow-y-auto px-4 pb-4">
            {filteredCounties.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No counties found
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCounties.map(county => {
                  const isSelected = selectedCounties.includes(county);
                  return (
                    <label
                      key={county}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-white dark:hover:bg-gray-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCounty(county)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300 dark:border-gray-600"
                      />
                      <span
                        className={`text-sm ${
                          isSelected
                            ? "text-blue-700 dark:text-blue-300 font-medium"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {county} County
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
