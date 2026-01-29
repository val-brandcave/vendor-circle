'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockWorkItems } from '@/lib/data/mock-data';
import { ClipboardList, FileText, ChevronRight, ChevronLeft, Filter, X, Search } from 'lucide-react';
import Image from 'next/image';
import { SkeletonTable } from '@/components/skeleton';

type WorkStage = 'bids_needed' | 'bids_submitted' | 'bids_confirmation' | 'bids_lost' | 'reports_process' | 'reports_rework' | 'reports_reupload' | 'completed';
type TabType = 'bids' | 'reports';

const stageInfo: Record<WorkStage, { label: string; category: TabType; badge: string }> = {
  bids_needed: { label: 'Bids Needed', category: 'bids', badge: 'red' },
  bids_submitted: { label: 'Submitted', category: 'bids', badge: 'blue' },
  bids_confirmation: { label: 'Needing My Confirmation', category: 'bids', badge: 'yellow' },
  bids_lost: { label: 'Bids Lost (Last 30 Days)', category: 'bids', badge: 'gray' },
  reports_process: { label: 'In Process', category: 'reports', badge: 'blue' },
  reports_rework: { label: 'Needing Rework', category: 'reports', badge: 'yellow' },
  reports_reupload: { label: 'Needing Reupload', category: 'reports', badge: 'yellow' },
  completed: { label: 'Completed', category: 'bids', badge: 'green' },
};

// Mock team members
const teamMembers = ['Maria Gonzalez', 'David Kim', 'James Wilson'];

// Extended mock data with assignee information
const mockWorkItemsWithAssignee = mockWorkItems.map((item) => ({
  ...item,
  assignee: [teamMembers[0], teamMembers[1], teamMembers[2], 'You'][Math.floor(Math.random() * 4)],
}));

export default function MyRequestsPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('bids');
  const [filterBank, setFilterBank] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilterBank, setTempFilterBank] = useState<string>('all');
  const [tempFilterStatus, setTempFilterStatus] = useState<string>('all');
  const [tempFilterAssignee, setTempFilterAssignee] = useState<string>('all');

  // Apply URL search params on mount
  useEffect(() => {
    const assigneeParam = searchParams.get('assignee');
    if (assigneeParam) {
      setFilterAssignee(decodeURIComponent(assigneeParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get unique banks
  const uniqueBanks = useMemo(() => {
    const banks = new Set(mockWorkItems.map((item) => item.bankName));
    return Array.from(banks);
  }, []);

  // Get unique assignees
  const uniqueAssignees = useMemo(() => {
    const assignees = new Set(mockWorkItemsWithAssignee.map((item) => item.assignee));
    return Array.from(assignees).sort();
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return mockWorkItemsWithAssignee.filter((item) => {
      const stageCategory = stageInfo[item.stage as WorkStage]?.category || 'bids';
      const matchesTab = stageCategory === activeTab;
      const matchesBank = filterBank === 'all' || item.bankName === filterBank;
      const matchesStatus = filterStatus === 'all' || item.stage === filterStatus;
      const matchesAssignee = filterAssignee === 'all' || item.assignee === filterAssignee;
      const matchesSearch =
        !searchQuery ||
        item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bankName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesBank && matchesStatus && matchesAssignee && matchesSearch;
    });
  }, [activeTab, filterBank, filterStatus, filterAssignee, searchQuery]);

  // Count items per tab
  const tabCounts = useMemo(() => {
    const counts = { bids: 0, reports: 0 };
    mockWorkItemsWithAssignee.forEach((item) => {
      if (item.stage !== 'completed') {
        const category = stageInfo[item.stage as WorkStage]?.category || 'bids';
        counts[category]++;
      }
    });
    return counts;
  }, []);

  // Get statuses for current tab
  const availableStatuses = useMemo(() => {
    return Object.entries(stageInfo)
      .filter(([, info]) => info.category === activeTab)
      .map(([stage, info]) => ({ value: stage, label: info.label }));
  }, [activeTab]);

  const openFilterModal = () => {
    setTempFilterBank(filterBank);
    setTempFilterStatus(filterStatus);
    setTempFilterAssignee(filterAssignee);
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setFilterBank(tempFilterBank);
    setFilterStatus(tempFilterStatus);
    setFilterAssignee(tempFilterAssignee);
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const clearFiltersModal = () => {
    setTempFilterBank('all');
    setTempFilterStatus('all');
    setTempFilterAssignee('all');
  };

  const clearFilters = () => {
    setFilterBank('all');
    setFilterStatus('all');
    setFilterAssignee('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasFilters = filterBank !== 'all' || filterStatus !== 'all' || filterAssignee !== 'all';
  const activeFilterCount =
    (filterBank !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0) + (filterAssignee !== 'all' ? 1 : 0);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    clearFilters();
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
      {/* Tabs and Filters in same row */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6">
            {/* Tabs on the left */}
            <div className="flex space-x-8">
              <button
                onClick={() => handleTabChange('bids')}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'bids'
                    ? 'border-primary text-primary dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span className="font-medium">Bids</span>
                {tabCounts.bids > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {tabCounts.bids}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('reports')}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'reports'
                    ? 'border-primary text-primary dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Reports</span>
                {tabCounts.reports > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {tabCounts.reports}
                  </span>
                )}
              </button>
            </div>

            {/* Search and Filters on the right */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white w-64"
                />
              </div>

              {/* Filters Button */}
              <button
                onClick={openFilterModal}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
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

        {/* Active Filter Pills Row */}
        {hasFilters && (
          <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-wrap items-center gap-2">
              {filterBank !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {filterBank}
                  <button onClick={() => setFilterBank('all')} className="hover:text-blue-900 dark:hover:text-blue-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {stageInfo[filterStatus as WorkStage]?.label}
                  <button onClick={() => setFilterStatus('all')} className="hover:text-blue-900 dark:hover:text-blue-100">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterAssignee !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {filterAssignee}
                  <button onClick={() => setFilterAssignee('all')} className="hover:text-blue-900 dark:hover:text-blue-100">
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

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <SkeletonTable rows={itemsPerPage} columns={7} />
          ) : filteredItems.length === 0 ? (
            <div className="py-16 text-center">
              {activeTab === 'bids' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">All caught up!</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    No bids need your attention right now. Check back later for new opportunities.
                  </p>
                </>
              )}
              {activeTab === 'reports' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No active reports</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    When your team completes appraisals, they'll appear here.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        File Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Property Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Bank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Assignee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedItems.map((item) => {
                      const stage = stageInfo[item.stage as WorkStage] || stageInfo.bids_needed;
                      const badgeColors = {
                        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                      };

                      return (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {item.fileNumber}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                            {item.propertyAddress}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.bankLogo}
                                  alt={`${item.bankName} logo`}
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{item.bankName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {item.assignee === 'You' ? 'You' : item.assignee}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[stage.badge as keyof typeof badgeColors]}`}
                            >
                              {stage.label}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                            <a
                              href={item.externalFormUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:text-[#1d3f8f] dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                              View
                              <ChevronRight className="w-4 h-4" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {paginatedItems.map((item) => {
                  const stage = stageInfo[item.stage as WorkStage] || stageInfo.bids_needed;
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
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
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.fileNumber}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{item.propertyAddress}</p>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Assignee:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{item.assignee === 'You' ? 'You' : item.assignee}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
                            {stage.label}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <a
                        href={item.externalFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-700 text-white font-medium transition-colors text-center block"
                      >
                        View Details →
                      </a>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Pagination Controls */}
          {filteredItems.length > 0 && (
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length}{' '}
                  {filteredItems.length === 1 ? 'item' : 'items'}
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="items-per-page" className="text-sm text-gray-500 dark:text-gray-400">
                    Per page:
                  </label>
                  <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>

              {/* Pagination buttons */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filter Modal */}
      {showFilterModal && (
        <div className="hidden md:flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filter {activeTab === 'bids' ? 'Bids' : 'Reports'}
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank</label>
                <select
                  value={tempFilterBank}
                  onChange={(e) => setTempFilterBank(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Banks</option>
                  {uniqueBanks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  value={tempFilterStatus}
                  onChange={(e) => setTempFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  {availableStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignee</label>
                <select
                  value={tempFilterAssignee}
                  onChange={(e) => setTempFilterAssignee(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Assignees</option>
                  {uniqueAssignees.map((assignee) => (
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>
                  ))}
                </select>
              </div>
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
