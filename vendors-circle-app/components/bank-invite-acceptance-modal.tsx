"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { SPECIALTY_DATA } from "@/lib/data/specialties";

interface BankInviteAcceptanceModalProps {
  isOpen: boolean;
  invitation: {
    id: string;
    bankName: string;
    bankLogo: string;
  } | null;
  onAccept: (data: {
    designations: string[];
    specialties: string[];
    subSpecialties: string[];
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Mock professional designations data
const PROFESSIONAL_DESIGNATIONS = [
  { id: "mai", name: "MAI - Member, Appraisal Institute" },
  { id: "sra", name: "SRA - Senior Residential Appraiser" },
  { id: "srpa", name: "SRPA - Senior Real Property Appraiser" },
  { id: "crasa", name: "CRASA - Certified Real Estate Appraiser" },
  { id: "aaci", name: "AACI - Accredited Appraiser Canadian Institute" },
  { id: "frea", name: "FREA - Fellow, Real Estate Appraisers" },
];

// Dropdown component to handle smart positioning
function DropdownMenu({
  isOpen,
  items,
  selectedIds,
  onToggle,
  renderItem,
  containerRef,
}: {
  isOpen: boolean;
  items: any[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  renderItem: (item: any, isSelected: boolean) => React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [position, setPosition] = useState<{ top: number; left: number; width: number; placement: 'bottom' | 'top' } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DROPDOWN_HEIGHT = 192; // max-h-48 = 12rem = 192px
  const OFFSET = 8;

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Decide placement based on available space
      let placement: 'bottom' | 'top' = 'bottom';
      let top = rect.bottom + OFFSET;
      
      // If not enough space below and more space above, place above
      if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove > DROPDOWN_HEIGHT) {
        placement = 'top';
        top = rect.top - DROPDOWN_HEIGHT - OFFSET;
      }
      
      setPosition({
        top,
        left: rect.left,
        width: rect.width,
        placement,
      });
    }
  }, [isOpen, containerRef]);

  if (!isOpen || !position || items.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      <div>
        {items.map(item => (
          <label
            key={item.id}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => onToggle(item.id)}
              className="w-4 h-4 rounded border-gray-300 text-primary"
            />
            {renderItem(item, selectedIds.includes(item.id))}
          </label>
        ))}
      </div>
    </div>
  );
}

export function BankInviteAcceptanceModal({
  isOpen,
  invitation,
  onAccept,
  onCancel,
  isLoading = false,
}: BankInviteAcceptanceModalProps) {
  // Designations state
  const [designations, setDesignations] = useState<string[]>([]);
  const [designationSearch, setDesignationSearch] = useState("");
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const designationRef = useRef<HTMLDivElement | null>(null);

  // Specialties state
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const specialtyRef = useRef<HTMLDivElement | null>(null);

  // Sub-specialties state
  const [subSpecialties, setSubSpecialties] = useState<string[]>([]);
  const [subSpecialtySearch, setSubSpecialtySearch] = useState("");
  const [showSubSpecialtyDropdown, setShowSubSpecialtyDropdown] = useState(false);
  const subSpecialtyRef = useRef<HTMLDivElement | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter designations based on search
  const filteredDesignations = useMemo(() => {
    return PROFESSIONAL_DESIGNATIONS.filter(d =>
      d.name.toLowerCase().includes(designationSearch.toLowerCase())
    );
  }, [designationSearch]);

  // Filter specialties based on search
  const filteredSpecialties = useMemo(() => {
    return SPECIALTY_DATA.filter(s =>
      s.name.toLowerCase().includes(specialtySearch.toLowerCase())
    );
  }, [specialtySearch]);

  // Get available sub-specialties from selected specialties
  const availableSubSpecialties = useMemo(() => {
    if (specialties.length === 0) return [];
    const subs: typeof SPECIALTY_DATA[0]['subSpecialties'] = [];
    specialties.forEach(specId => {
      const spec = SPECIALTY_DATA.find(s => s.id === specId);
      if (spec) {
        subs.push(...spec.subSpecialties);
      }
    });
    return subs;
  }, [specialties]);

  // Filter sub-specialties based on search
  const filteredSubSpecialties = useMemo(() => {
    return availableSubSpecialties.filter(s =>
      s.name.toLowerCase().includes(subSpecialtySearch.toLowerCase())
    );
  }, [availableSubSpecialties, subSpecialtySearch]);

  // Toggle designation
  const handleToggleDesignation = (designationId: string) => {
    if (designations.includes(designationId)) {
      setDesignations(designations.filter(d => d !== designationId));
    } else {
      setDesignations([...designations, designationId]);
    }
  };

  // Toggle specialty
  const handleToggleSpecialty = (specialtyId: string) => {
    if (specialties.includes(specialtyId)) {
      const newSpecialties = specialties.filter(s => s !== specialtyId);
      setSpecialties(newSpecialties);
      // Remove sub-specialties from deleted specialty
      const toRemove = SPECIALTY_DATA.find(s => s.id === specialtyId)?.subSpecialties.map(sub => sub.id) || [];
      setSubSpecialties(subSpecialties.filter(sub => !toRemove.includes(sub)));
    } else {
      setSpecialties([...specialties, specialtyId]);
    }
  };

  // Toggle sub-specialty
  const handleToggleSubSpecialty = (subSpecialtyId: string) => {
    if (subSpecialties.includes(subSpecialtyId)) {
      setSubSpecialties(subSpecialties.filter(s => s !== subSpecialtyId));
    } else {
      setSubSpecialties([...subSpecialties, subSpecialtyId]);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (designations.length === 0) {
      newErrors.designations = "Please select at least one professional designation";
    }
    if (specialties.length === 0) {
      newErrors.specialties = "Please select at least one specialty";
    }
    if (subSpecialties.length === 0) {
      newErrors.subSpecialties = "Please select at least one sub-specialty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle accept
  const handleSubmit = () => {
    if (validateForm()) {
      onAccept({
        designations,
        specialties,
        subSpecialties,
      });
      // Reset form after submission
      setDesignations([]);
      setSpecialties([]);
      setSubSpecialties([]);
      setDesignationSearch("");
      setSpecialtySearch("");
      setSubSpecialtySearch("");
      setErrors({});
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (designationRef.current && !designationRef.current.contains(e.target as Node)) {
        setShowDesignationDropdown(false);
      }
      if (specialtyRef.current && !specialtyRef.current.contains(e.target as Node)) {
        setShowSpecialtyDropdown(false);
      }
      if (subSpecialtyRef.current && !subSpecialtyRef.current.contains(e.target as Node)) {
        setShowSubSpecialtyDropdown(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  if (!isOpen || !invitation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl">
        {/* Header with bank logo and title */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Bank Logo */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image
                  src={invitation.bankLogo}
                  alt={invitation.bankName}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Accept invite from
                </h2>
                <p className="text-xl text-primary font-semibold">
                  {invitation.bankName}
                </p>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Instructional Text */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              To proceed with this invitation, please provide the following information so {invitation.bankName} can better understand your qualifications and expertise:
            </p>
          </div>

          {/* Professional Designations Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Professional Designations *
            </label>

            {/* Search and Dropdown */}
            <div ref={designationRef} className="relative mb-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-gray-700">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search designations..."
                  value={designationSearch}
                  onChange={(e) => setDesignationSearch(e.target.value)}
                  onFocus={() => setShowDesignationDropdown(true)}
                  className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Dropdown with Checkboxes */}
              <DropdownMenu
                isOpen={showDesignationDropdown}
                items={filteredDesignations}
                selectedIds={designations}
                onToggle={handleToggleDesignation}
                renderItem={(item) => item.name}
                containerRef={designationRef}
              />
            </div>

            {/* Selected Pills */}
            {designations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {designations.map(id => {
                  const designation = PROFESSIONAL_DESIGNATIONS.find(d => d.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center px-3 py-1.5 bg-primary text-white rounded-full text-sm font-medium"
                    >
                      {designation?.name.split(" - ")[0]}
                    </span>
                  );
                })}
              </div>
            )}

            {errors.designations && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {errors.designations}
              </p>
            )}
          </div>

          {/* Specialties Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Specialties *
            </label>

            {/* Search and Dropdown */}
            <div ref={specialtyRef} className="relative mb-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-gray-700">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search specialties..."
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  onFocus={() => setShowSpecialtyDropdown(true)}
                  className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Dropdown with Checkboxes */}
              <DropdownMenu
                isOpen={showSpecialtyDropdown}
                items={filteredSpecialties}
                selectedIds={specialties}
                onToggle={handleToggleSpecialty}
                renderItem={(item) => item.name}
                containerRef={specialtyRef}
              />
            </div>

            {/* Selected Pills */}
            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specialties.map(id => {
                  const specialty = SPECIALTY_DATA.find(s => s.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 rounded-full text-sm font-medium"
                    >
                      {specialty?.name}
                    </span>
                  );
                })}
              </div>
            )}

            {errors.specialties && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {errors.specialties}
              </p>
            )}
          </div>

          {/* Sub-Specialties Section */}
          {specialties.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Sub-Specialties *
              </label>

              {/* Search and Dropdown */}
              <div ref={subSpecialtyRef} className="relative mb-3">
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-primary bg-white dark:bg-gray-700">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sub-specialties..."
                    value={subSpecialtySearch}
                    onChange={(e) => setSubSpecialtySearch(e.target.value)}
                    onFocus={() => setShowSubSpecialtyDropdown(true)}
                    className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                {/* Dropdown with Checkboxes */}
                <DropdownMenu
                  isOpen={showSubSpecialtyDropdown}
                  items={filteredSubSpecialties}
                  selectedIds={subSpecialties}
                  onToggle={handleToggleSubSpecialty}
                  renderItem={(item) => item.name}
                  containerRef={subSpecialtyRef}
                />
              </div>

              {/* Selected Pills */}
              {subSpecialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {subSpecialties.map(id => {
                    const subSpec = availableSubSpecialties.find(s => s.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 rounded-full text-sm font-medium"
                      >
                        {subSpec?.name}
                      </span>
                    );
                  })}
                </div>
              )}

              {errors.subSpecialties && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {errors.subSpecialties}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer with action buttons */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-3 justify-end flex-shrink-0">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? "Accepting..." : "Accept Invitation"}
          </button>
        </div>
      </div>
    </div>
  );
}
