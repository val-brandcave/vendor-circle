"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { getAllStates } from "@/lib/data/us-counties";

interface StateMultiSelectProps {
  selectedStates: string[];
  onChange: (states: string[]) => void;
  placeholder?: string;
  className?: string;
}

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

export function StateMultiSelect({
  selectedStates,
  onChange,
  placeholder = "Select states...",
  className = ""
}: StateMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allStates = getAllStates();
  
  const filteredStates = allStates.filter(state =>
    STATE_NAMES[state]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      onChange(selectedStates.filter(s => s !== state));
    } else {
      onChange([...selectedStates, state]);
    }
  };

  const removeState = (state: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedStates.filter(s => s !== state));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-left flex items-center justify-between gap-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors cursor-pointer ${className}`}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex-1 flex items-center gap-2 flex-wrap min-h-[24px]">
          {selectedStates.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          ) : (
            <>
              {selectedStates.slice(0, 3).map(state => (
                <span
                  key={state}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                >
                  {state}
                  <button
                    type="button"
                    onClick={(e) => removeState(state, e)}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                    aria-label={`Remove ${state}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedStates.length > 3 && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +{selectedStates.length - 3} more
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedStates.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear all states"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search states..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* State List */}
          <div className="overflow-y-auto flex-1">
            {filteredStates.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                No states found
              </div>
            ) : (
              <div className="p-2">
                {filteredStates.map(state => {
                  const isSelected = selectedStates.includes(state);
                  return (
                    <button
                      key={state}
                      type="button"
                      onClick={() => toggleState(state)}
                      className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <span className="text-sm">
                        <span className="font-medium">{state}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          {STATE_NAMES[state]}
                        </span>
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with count */}
          {selectedStates.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''} selected
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
