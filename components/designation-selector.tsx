"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { DESIGNATIONS } from "@/lib/data/specialties";

interface DesignationSelectorProps {
  selectedDesignations: string[];
  onToggle: (designationId: string) => void;
}

export function DesignationSelector({
  selectedDesignations,
  onToggle,
}: DesignationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter designations based on search
  const filteredDesignations = DESIGNATIONS.filter((designation) =>
    designation.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((designation) => !selectedDesignations.includes(designation.id));

  // Get selected designation names
  const getSelectedNames = () => {
    return selectedDesignations
      .map((id) => DESIGNATIONS.find((d) => d.id === id))
      .filter(Boolean);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* Selected Pills + Search Input */}
      <div
        className="min-h-[42px] w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-text flex flex-wrap items-center gap-2"
        onClick={() => {
          setIsDropdownOpen(true);
          inputRef.current?.focus();
        }}
      >
        {/* Selected Pills */}
        {getSelectedNames().map((designation: any) => (
          <span
            key={designation.id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-white text-sm font-medium"
          >
            {designation.name.split(" (")[0]}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(designation.id);
              }}
              className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${designation.name}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 min-w-[120px]">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={selectedDesignations.length === 0 ? "Search designations..." : ""}
            className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Dropdown Results */}
      {isDropdownOpen && filteredDesignations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto custom-scrollbar">
          {filteredDesignations.map((designation) => (
            <button
              key={designation.id}
              type="button"
              onClick={() => {
                onToggle(designation.id);
                setSearchTerm("");
                inputRef.current?.focus();
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group"
            >
              <span>{designation.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to add
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isDropdownOpen && searchTerm && filteredDesignations.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No designations match your search
          </p>
        </div>
      )}
    </div>
  );
}
