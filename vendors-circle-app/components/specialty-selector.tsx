"use client";

import { useState } from "react";
import { CheckCircle, Search, AlertTriangle, X } from "lucide-react";
import {
  SPECIALTY_DATA,
  ParentSpecialty,
  SubSpecialty,
  shouldWarnAboutOverSelection,
} from "@/lib/data/specialties";

interface SpecialtySelectorProps {
  selectedParents: string[];
  selectedSubSpecialties: Record<string, string[]>; // { parentId: [subSpecialtyIds] }
  onParentToggle: (parentId: string) => void;
  onSubSpecialtyToggle: (parentId: string, subSpecialtyId: string) => void;
  onSelectAllSubSpecialties: (parentId: string) => void;
  onClearAllSubSpecialties: (parentId: string) => void;
}

export function SpecialtySelector({
  selectedParents,
  selectedSubSpecialties,
  onParentToggle,
  onSubSpecialtyToggle,
  onSelectAllSubSpecialties,
  onClearAllSubSpecialties,
}: SpecialtySelectorProps) {
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningParent, setWarningParent] = useState<ParentSpecialty | null>(null);

  const handleSelectAll = (parent: ParentSpecialty) => {
    const currentSelected = selectedSubSpecialties[parent.id] || [];
    
    // Check if this would trigger the warning (>80% selected)
    if (parent.subSpecialties.length > 0 && currentSelected.length < parent.subSpecialties.length * 0.8) {
      setWarningParent(parent);
      setShowWarningModal(true);
    } else {
      onSelectAllSubSpecialties(parent.id);
    }
  };

  const confirmSelectAll = () => {
    if (warningParent) {
      onSelectAllSubSpecialties(warningParent.id);
    }
    setShowWarningModal(false);
    setWarningParent(null);
  };

  const getFilteredSubSpecialties = (parent: ParentSpecialty) => {
    const searchTerm = searchTerms[parent.id] || "";
    if (!searchTerm) return parent.subSpecialties;
    
    return parent.subSpecialties.filter((sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {SPECIALTY_DATA.map((parent) => {
        const isParentSelected = selectedParents.includes(parent.id);
        const selectedSubs = selectedSubSpecialties[parent.id] || [];
        const filteredSubs = getFilteredSubSpecialties(parent);
        const showOverSelectionWarning = shouldWarnAboutOverSelection(parent.id, selectedSubs);

        return (
          <div
            key={parent.id}
            className={`border-2 rounded-xl transition-all ${
              isParentSelected
                ? "border-primary bg-blue-50 dark:bg-blue-900/10"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            }`}
          >
            {/* Parent Specialty Card */}
            <button
              type="button"
              onClick={() => onParentToggle(parent.id)}
              className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 rounded-t-xl transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isParentSelected
                    ? "border-primary bg-primary"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {isParentSelected && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {parent.name}
                </div>
                {isParentSelected && selectedSubs.length > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedSubs.length} of {parent.subSpecialties.length} selected
                  </div>
                )}
              </div>
              {isParentSelected && showOverSelectionWarning && (
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs">Many selected</span>
                </div>
              )}
            </button>

            {/* Sub-Specialties Section */}
            {isParentSelected && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerms[parent.id] || ""}
                      onChange={(e) =>
                        setSearchTerms({ ...searchTerms, [parent.id]: e.target.value })
                      }
                      placeholder="Search sub-specialties..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectAll(parent)}
                      className="px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors whitespace-nowrap"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => onClearAllSubSpecialties(parent.id)}
                      className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors whitespace-nowrap"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Over-selection Warning */}
                {showOverSelectionWarning && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-300">
                      <strong>Many specialties selected:</strong> You've selected{" "}
                      {selectedSubs.length} of {parent.subSpecialties.length} {parent.name.toLowerCase()}{" "}
                      specialties. Consider focusing on your core expertise to improve matching quality.
                    </div>
                  </div>
                )}

                {/* Sub-Specialty Checkboxes */}
                <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {filteredSubs.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No sub-specialties match your search
                    </div>
                  ) : (
                    filteredSubs.map((sub) => {
                      const isSelected = selectedSubs.includes(sub.id);
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
                            onChange={() => onSubSpecialtyToggle(parent.id, sub.id)}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {sub.name}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Warning Modal */}
      {showWarningModal && warningParent && (
        <>
          {/* Backdrop - Full Coverage */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={() => {
              setShowWarningModal(false);
              setWarningParent(null);
            }}
            style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Wow! That's a lot of specialties!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We see you're about to select all {warningParent.subSpecialties.length}{" "}
                    {warningParent.name.toLowerCase()} specialties. Are you really a specialist in every
                    category?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Tip:</strong> Over-selection can actually reduce your chances of matching with
                    the right opportunities because banks look for specific expertise.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowWarningModal(false);
                    setWarningParent(null);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Review Selection
                </button>
                <button
                  type="button"
                  onClick={confirmSelectAll}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  I'm Sure
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
