"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Search } from "lucide-react";

interface SpecialtyAccordionProps {
  parentId: string;
  parentName: string;
  subSpecialties: Array<{ id: string; name: string }>;
  selectedSubSpecialties: string[];
  onChange: (subSpecialties: string[]) => void;
  isExpanded: boolean;
  onToggle: () => void;
  showWarning?: boolean;
}

export function SpecialtyAccordion({
  parentId,
  parentName,
  subSpecialties,
  selectedSubSpecialties,
  onChange,
  isExpanded,
  onToggle,
  showWarning = false,
}: SpecialtyAccordionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubSpecialties = subSpecialties.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    onChange(subSpecialties.map((s) => s.id));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleToggleSub = (subId: string) => {
    if (selectedSubSpecialties.includes(subId)) {
      onChange(selectedSubSpecialties.filter((id) => id !== subId));
    } else {
      onChange([...selectedSubSpecialties, subId]);
    }
  };

  const hasSelections = selectedSubSpecialties.length > 0;

  return (
    <div
      className={`border-2 rounded-xl transition-all ${
        hasSelections
          ? "border-primary bg-blue-50 dark:bg-blue-900/10"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-750 rounded-t-xl transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              hasSelections
                ? "border-primary bg-primary"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {hasSelections && <CheckCircle className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 dark:text-white">{parentName}</div>
            {hasSelections && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {selectedSubSpecialties.length} of {subSpecialties.length} selected
              </div>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sub-specialties..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors whitespace-nowrap"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Warning if many selected */}
          {showWarning && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start gap-2">
              <div className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Many specialties selected:</strong> You've selected {selectedSubSpecialties.length} of{" "}
                {subSpecialties.length} {parentName.toLowerCase()} specialties. Consider focusing on your
                core expertise to improve matching quality.
              </div>
            </div>
          )}

          {/* Sub-Specialty Checkboxes */}
          <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {filteredSubSpecialties.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                No sub-specialties match your search
              </div>
            ) : (
              filteredSubSpecialties.map((sub) => {
                const isSelected = selectedSubSpecialties.includes(sub.id);
                return (
                  <label
                    key={sub.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-100 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-750"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSub(sub.id)}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{sub.name}</span>
                  </label>
                );
              })
            )}
          </div>

          {/* Selection Counter */}
          {hasSelections && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
              {selectedSubSpecialties.length} of {subSpecialties.length} sub-specialties selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
