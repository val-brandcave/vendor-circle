"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockVendors, mockSpecialties } from "@/lib/data/mock-data";
import { X, Search, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import VendorMap from "@/components/vendor-map";
import { Skeleton, SkeletonTable } from "@/components/skeleton";
import { useTour } from "@/hooks/useTour";

// Badge Overflow Component with Tooltip
function BadgeOverflow({ items, maxVisible = 2, type = "blue" }: { items: string[], maxVisible?: number, type?: "blue" | "gray" }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const visible = items.slice(0, maxVisible);
  const remaining = items.slice(maxVisible);
  
  const colorClasses = type === "blue"
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX
    });
    setShowTooltip(true);
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {visible.map((item) => (
        <span
          key={item}
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClasses}`}
        >
          {item}
        </span>
      ))}
      {remaining.length > 0 && (
        <>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colorClasses} cursor-help`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShowTooltip(false)}
          >
            +{remaining.length}
          </span>
          {showTooltip && (
            <div 
              className="fixed z-[100] bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in duration-150"
              style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
            >
              {remaining.join(', ')}
              <div className="absolute -top-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  // Auto-start guided tour for first-time users
  useTour('admin', true);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAdvancedInModal, setShowAdvancedInModal] = useState(false);
  const [filters, setFilters] = useState({
    state: "",
    specialty: "",
    postalCode: "",
    county: "",
    within: "",
  });
  const [tempFilters, setTempFilters] = useState({
    state: "",
    specialty: "",
    postalCode: "",
    county: "",
    within: "",
  });
  const [filteredVendors, setFilteredVendors] = useState(mockVendors);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = mockVendors;

      // Text search
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (vendor) =>
            vendor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // State filter
      if (filters.state) {
        filtered = filtered.filter(vendor => vendor.states.includes(filters.state));
      }

      // Specialty filter
      if (filters.specialty) {
        filtered = filtered.filter(vendor => 
          vendor.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()))
        );
      }

      setFilteredVendors(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  const openFilterModal = () => {
    setTempFilters(filters);
    setShowAdvancedInModal(false);
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const clearFiltersModal = () => {
    setTempFilters({ state: "", specialty: "", postalCode: "", county: "", within: "" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ state: "", specialty: "", postalCode: "", county: "", within: "" });
  };

  const clearFilter = (filterName: keyof typeof filters) => {
    setFilters({ ...filters, [filterName]: "" });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

  const handleMapStateClick = (stateCode: string) => {
    // If clicking the same state, clear the filter
    if (filters.state === stateCode) {
      setFilters({ ...filters, state: "" });
    } else {
      setFilters({ ...filters, state: stateCode });
    }
  };

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "");

  const uniqueStates = Array.from(new Set(mockVendors.flatMap(v => v.states))).sort();
  
  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Vendor Distribution Map */}
      <div className="mb-6">
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <Skeleton className="h-[450px] w-full rounded-lg" />
          </div>
        ) : (
          <VendorMap 
            vendors={mockVendors}
            selectedState={filters.state}
            onStateClick={handleMapStateClick}
          />
        )}
      </div>

      {/* Vendors Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header with Title, Search, and Filters Button */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vendors
            </h2>
            
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filters Button */}
              <button
                onClick={openFilterModal}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills (only shown when filters active) */}
        {activeFilters.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-wrap items-center gap-2">
              {filters.state && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  State: {filters.state}
                  <button onClick={() => clearFilter("state")} className="hover:text-blue-900 dark:hover:text-blue-100" aria-label="Clear state filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.specialty && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Specialty: {filters.specialty}
                  <button onClick={() => clearFilter("specialty")} className="hover:text-blue-900 dark:hover:text-blue-100" aria-label="Clear specialty filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.postalCode && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Postal: {filters.postalCode}
                  <button onClick={() => clearFilter("postalCode")} className="hover:text-blue-900 dark:hover:text-blue-100" aria-label="Clear postal code filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.county && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  County: {filters.county}
                  <button onClick={() => clearFilter("county")} className="hover:text-blue-900 dark:hover:text-blue-100" aria-label="Clear county filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.within && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Within: {filters.within} miles
                  <button onClick={() => clearFilter("within")} className="hover:text-blue-900 dark:hover:text-blue-100" aria-label="Clear distance filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6">
              <SkeletonTable rows={itemsPerPage} columns={6} />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    States
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Avatar - use actual image for Tom Reynolds, initials for others */}
                      {vendor.id === "vendor-001" ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                          <Image
                            src="/avatars/Vendor-Tom-Reynolds.png"
                            alt={`${vendor.firstName} ${vendor.lastName}`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                          (() => {
                            const colors = [
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                              'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                              'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
                              'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                              'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
                            ];
                            const hash = vendor.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            return colors[hash % colors.length];
                          })()
                        }`}>
                          {vendor.firstName.charAt(0)}{vendor.lastName.charAt(0)}
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {vendor.firstName} {vendor.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-300">
                      {vendor.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {vendor.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <BadgeOverflow items={vendor.states} maxVisible={2} type="blue" />
                  </td>
                  <td className="px-6 py-4">
                    <BadgeOverflow items={vendor.specialties} maxVisible={2} type="gray" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/admin/vendors/${vendor.id}`}
                      className="text-primary hover:text-[#1d3f8f] font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              No vendors found matching your search criteria
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:text-[#1d3f8f] font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredVendors.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredVendors.length)} of {filteredVendors.length}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  aria-label="Rows per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {totalPages > 1 && (
                <>
                  <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal (Specretary Pattern) */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filter Vendors
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close filter modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Default Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State
                </label>
                <select
                  value={tempFilters.state}
                  onChange={(e) => setTempFilters({ ...tempFilters, state: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  aria-label="Filter by state"
                >
                  <option value="">Select state...</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <select
                  value={tempFilters.specialty}
                  onChange={(e) => setTempFilters({ ...tempFilters, specialty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  aria-label="Filter by specialty"
                >
                  <option value="">Select specialty...</option>
                  {mockSpecialties.map(spec => (
                    <option key={spec.id} value={spec.name}>{spec.name}</option>
                  ))}
                </select>
              </div>

              {/* Advanced Toggle */}
              <button
                onClick={() => setShowAdvancedInModal(!showAdvancedInModal)}
                className="text-sm text-primary dark:text-blue-400 hover:underline font-medium"
              >
                {showAdvancedInModal ? "Hide" : "Show"} Advanced Filters
              </button>

              {/* Advanced Filters (Collapsible) */}
              {showAdvancedInModal && (
                <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={tempFilters.postalCode}
                      onChange={(e) => setTempFilters({ ...tempFilters, postalCode: e.target.value })}
                      placeholder="e.g., 33602"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Within (miles)
                    </label>
                    <input
                      type="number"
                      value={tempFilters.within}
                      onChange={(e) => setTempFilters({ ...tempFilters, within: e.target.value })}
                      placeholder="e.g., 25"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      County
                    </label>
                    <input
                      type="text"
                      value={tempFilters.county}
                      onChange={(e) => setTempFilters({ ...tempFilters, county: e.target.value })}
                      placeholder="e.g., Hillsborough"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={clearFiltersModal}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
