'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { mockWorkItems } from '@/lib/data/mock-data';
import { 
  ClipboardList, FileText, ChevronRight, ChevronLeft, Filter, X, 
  Search
} from 'lucide-react';
import Image from 'next/image';
import { SkeletonTable } from '@/components/skeleton';
import MobileWorkItemCard from '@/components/mobile/work-item-card';
import MobileBottomSheet from '@/components/mobile/bottom-sheet';
import { useTour } from '@/hooks/useTour';

type WorkStage = 'bids_needed' | 'bids_submitted' | 'bids_confirmation' | 'bids_lost' | 'reports_process' | 'reports_rework' | 'reports_reupload' | 'completed';
type TabType = 'my-bids' | 'my-reports';

const stageInfo: Record<WorkStage, { label: string; category: string; badge: string }> = {
  bids_needed: { label: 'Bids Needed', category: 'bids', badge: 'red' },
  bids_submitted: { label: 'Submitted', category: 'bids', badge: 'blue' },
  bids_confirmation: { label: 'Needing My Confirmation', category: 'bids', badge: 'yellow' },
  bids_lost: { label: 'Bids Lost (Last 30 Days)', category: 'bids', badge: 'gray' },
  reports_process: { label: 'In Process', category: 'reports', badge: 'blue' },
  reports_rework: { label: 'Needing Rework', category: 'reports', badge: 'yellow' },
  reports_reupload: { label: 'Needing Reupload', category: 'reports', badge: 'yellow' },
  completed: { label: 'Completed', category: 'both', badge: 'green' }
};

export default function MyWorkPage() {
  const { user } = useAuth();
  const isBusiness = user?.accountType === 'business_admin';
  
  // Auto-start guided tour for first-time users
  useTour(isBusiness ? 'business' : 'vendor', true);
  
  const isFirstTimeUser = !user?.id?.startsWith('demo-');
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('my-bids');
  const [filterBank, setFilterBank] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilterBank, setTempFilterBank] = useState<string>('all');
  const [tempFilterStatus, setTempFilterStatus] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const uniqueBanks = useMemo(() => {
    const banks = new Set(mockWorkItems.map(item => item.bankName));
    return Array.from(banks);
  }, []);

  // Filter personal work items
  const filteredItems = useMemo(() => {
    if (isFirstTimeUser && (activeTab === 'my-bids' || activeTab === 'my-reports')) return [];
    
    return mockWorkItems.filter(item => {
      const stageCategory = stageInfo[item.stage as WorkStage]?.category || 'bids';
      const matchesTab = 
        (activeTab === 'my-bids' && stageCategory === 'bids') ||
        (activeTab === 'my-reports' && stageCategory === 'reports');
      const matchesBank = filterBank === 'all' || item.bankName === filterBank;
      const matchesStatus = filterStatus === 'all' || item.stage === filterStatus;
      const matchesSearch = !searchQuery || 
        item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bankName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesBank && matchesStatus && matchesSearch;
    });
  }, [activeTab, filterBank, filterStatus, searchQuery, isFirstTimeUser]);

  const tabCounts = useMemo(() => {
    const counts = { 'my-bids': 0, 'my-reports': 0 };
    
    if (isFirstTimeUser) return counts;
    
    mockWorkItems.forEach(item => {
      if (item.stage !== 'completed') {
        const category = stageInfo[item.stage as WorkStage]?.category || 'bids';
        if (category === 'bids') counts['my-bids']++;
        if (category === 'reports') counts['my-reports']++;
      }
    });
    return counts;
  }, [isFirstTimeUser]);

  const availableStatuses = useMemo(() => {
    const currentCategory = activeTab === 'my-reports' ? 'reports' : 'bids';
    return Object.entries(stageInfo)
      .filter(([, info]) => info.category === currentCategory || info.category === 'both')
      .map(([stage, info]) => ({ value: stage, label: info.label }));
  }, [activeTab]);

  const openFilterModal = () => {
    setTempFilterBank(filterBank);
    setTempFilterStatus(filterStatus);
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setFilterBank(tempFilterBank);
    setFilterStatus(tempFilterStatus);
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilterBank('all');
    setFilterStatus('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasFilters = filterBank !== 'all' || filterStatus !== 'all';
  const activeFilterCount = (filterBank !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    clearFilters();
    setCurrentPage(1);
  };

  const renderPersonalWork = () => (
    <>
      {/* Search and Filters */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white w-full"
          />
        </div>
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

      {/* Active Filter Pills */}
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
          <SkeletonTable rows={itemsPerPage} columns={6} />
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'my-bids' ? (
                <ClipboardList className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ) : (
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isFirstTimeUser ? 'No Work Yet' : 'All caught up!'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {isFirstTimeUser 
                ? "Once banks send you opportunities, they'll appear here."
                : "No items need your attention right now."
              }
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      File Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Property Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Bank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Due Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
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
                      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
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
                            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
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
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[stage.badge as keyof typeof badgeColors]}`}>
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

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-3">
              {paginatedItems.map((item) => {
                const stage = stageInfo[item.stage as WorkStage] || stageInfo.bids_needed;
                const badgeColors = {
                  red: 'bg-red-100 text-red-800',
                  blue: 'bg-blue-100 text-blue-800',
                  yellow: 'bg-yellow-100 text-yellow-800',
                  gray: 'bg-gray-100 text-gray-800',
                  green: 'bg-green-100 text-green-800',
                };

                return (
                  <MobileWorkItemCard
                    key={item.id}
                    fileNumber={item.fileNumber}
                    propertyAddress={item.propertyAddress}
                    bankName={item.bankName}
                    bankLogo={item.bankLogo}
                    status={item.stage}
                    statusBadge={{
                      text: stage.label,
                      className: badgeColors[stage.badge as keyof typeof badgeColors],
                    }}
                    dueDate={item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '—'}
                    onView={() => window.open(item.externalFormUrl, '_blank')}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length}
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">Per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );


  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => handleTabChange('my-bids')}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'my-bids'
                    ? 'border-primary text-primary dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span className="font-medium">My Bids</span>
                {tabCounts['my-bids'] > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {tabCounts['my-bids']}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('my-reports')}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'my-reports'
                    ? 'border-primary text-primary dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">My Reports</span>
                {tabCounts['my-reports'] > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {tabCounts['my-reports']}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {renderPersonalWork()}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (activeTab === 'my-bids' || activeTab === 'my-reports') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filter {activeTab === 'my-reports' ? 'Reports' : 'Bids'}
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bank
                </label>
                <select
                  value={tempFilterBank}
                  onChange={(e) => setTempFilterBank(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Banks</option>
                  {uniqueBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={tempFilterStatus}
                  onChange={(e) => setTempFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  {availableStatuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setTempFilterBank('all'); setTempFilterStatus('all'); }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 font-medium"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 font-medium"
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
