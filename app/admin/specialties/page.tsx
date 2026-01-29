"use client";

import React, { useState, useEffect } from "react";
import { mockSpecialtiesAdmin, ParentSpecialtyAdmin, SubSpecialtyAdmin } from "@/lib/data/mock-specialties-admin";
import Snackbar from "@/components/snackbar";
import { Plus, Edit2, Trash2, MoreVertical, ChevronRight, ChevronDown, Search, FolderOpen, Folder } from "lucide-react";
import { SkeletonTable } from "@/components/skeleton";
import { DropdownButton } from "@/components/dropdown-button";

type ModalType = 'add-parent' | 'edit-parent' | 'add-sub' | 'edit-sub' | 'delete' | null;

export default function SpecialtiesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [specialties, setSpecialties] = useState<ParentSpecialtyAdmin[]>(mockSpecialtiesAdmin);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingParent, setEditingParent] = useState<ParentSpecialtyAdmin | null>(null);
  const [editingSub, setEditingSub] = useState<SubSpecialtyAdmin | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'parent' | 'sub'; id: string; name: string } | null>(null);
  
  // Form states
  const [parentForm, setParentForm] = useState({ name: "", key: "", description: "" });
  const [subForm, setSubForm] = useState({ name: "", key: "", parentKey: "commercial" });
  
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Toggle expand/collapse
  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // Expand all / Collapse all
  const expandAll = () => {
    setExpandedRows(new Set(specialties.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
  };

  // Search/filter
  const filteredSpecialties = specialties.filter(parent => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Search in parent name
    if (parent.name.toLowerCase().includes(query)) return true;
    
    // Search in sub-specialty names
    return parent.subSpecialties.some(sub => 
      sub.name.toLowerCase().includes(query)
    );
  });

  // Add parent specialty
  const handleAddParent = () => {
    if (!parentForm.name.trim()) return;
    
    const newParent: ParentSpecialtyAdmin = {
      id: `parent-${Date.now()}`,
      key: parentForm.key || parentForm.name.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-"),
      name: parentForm.name,
      description: parentForm.description,
      subSpecialties: [],
      totalVendorCount: 0,
    };
    
    setSpecialties([...specialties, newParent]);
    setParentForm({ name: "", key: "", description: "" });
    setModalType(null);
    setSnackbar({ message: "Parent specialty added successfully!", type: "success" });
  };

  // Edit parent specialty
  const handleEditParent = () => {
    if (!editingParent) return;
    
    setSpecialties(specialties.map(s => 
      s.id === editingParent.id ? editingParent : s
    ));
    setEditingParent(null);
    setModalType(null);
    setSnackbar({ message: "Parent specialty updated successfully!", type: "success" });
  };

  // Add sub-specialty
  const handleAddSub = () => {
    if (!subForm.name.trim()) return;
    
    const newSub: SubSpecialtyAdmin = {
      id: `sub-${Date.now()}`,
      key: subForm.key || subForm.name.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-"),
      name: subForm.name,
      parentKey: subForm.parentKey,
      vendorCount: 0,
    };
    
    setSpecialties(specialties.map(parent => 
      parent.key === subForm.parentKey
        ? { ...parent, subSpecialties: [...parent.subSpecialties, newSub] }
        : parent
    ));
    
    setSubForm({ name: "", key: "", parentKey: "commercial" });
    setModalType(null);
    setSnackbar({ message: "Sub-specialty added successfully!", type: "success" });
  };

  // Edit sub-specialty
  const handleEditSub = () => {
    if (!editingSub) return;
    
    setSpecialties(specialties.map(parent => ({
      ...parent,
      subSpecialties: parent.subSpecialties
        .filter(sub => sub.id !== editingSub.id) // Remove from old parent
        .concat(parent.key === editingSub.parentKey ? [editingSub] : []) // Add to new parent if matches
    })));
    
    setEditingSub(null);
    setModalType(null);
    setSnackbar({ message: "Sub-specialty updated successfully!", type: "success" });
  };

  // Delete
  const handleDelete = () => {
    if (!deleteTarget) return;
    
    if (deleteTarget.type === 'parent') {
      setSpecialties(specialties.filter(s => s.id !== deleteTarget.id));
      setSnackbar({ message: "Parent specialty and all sub-specialties deleted!", type: "success" });
    } else {
      setSpecialties(specialties.map(parent => ({
        ...parent,
        subSpecialties: parent.subSpecialties.filter(sub => sub.id !== deleteTarget.id)
      })));
      setSnackbar({ message: "Sub-specialty deleted successfully!", type: "success" });
    }
    
    setDeleteTarget(null);
    setModalType(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}

      {/* Add Specialty Modal */}
      {modalType === 'add-parent' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add Specialty
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={parentForm.name}
                  onChange={(e) => setParentForm({ ...parentForm, name: e.target.value })}
                  placeholder="e.g., Commercial"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key *
                </label>
                <input
                  type="text"
                  value={parentForm.key}
                  onChange={(e) => setParentForm({ ...parentForm, key: e.target.value })}
                  placeholder="commercial (auto-generated if blank)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={parentForm.description}
                  onChange={(e) => setParentForm({ ...parentForm, description: e.target.value })}
                  placeholder="Optional description"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddParent}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Specialty
              </button>
              <button
                onClick={() => {
                  setModalType(null);
                  setParentForm({ name: "", key: "", description: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Specialty Modal */}
      {modalType === 'edit-parent' && editingParent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit Specialty
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={editingParent.name}
                  onChange={(e) => setEditingParent({ ...editingParent, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key *
                </label>
                <input
                  type="text"
                  value={editingParent.key}
                  onChange={(e) => setEditingParent({ ...editingParent, key: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  ⚠️ Changing the key may affect existing vendor profiles
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingParent.description || ''}
                  onChange={(e) => setEditingParent({ ...editingParent, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>{editingParent.subSpecialties.length}</strong> sub-specialties • <strong>{editingParent.totalVendorCount}</strong> vendors
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditParent}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditingParent(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub-Specialty Modal */}
      {modalType === 'add-sub' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add Sub-Specialty
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specialty *
                </label>
                <select
                  value={subForm.parentKey}
                  onChange={(e) => setSubForm({ ...subForm, parentKey: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {specialties.map(parent => (
                    <option key={parent.key} value={parent.key}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={subForm.name}
                  onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                  placeholder="e.g., Office Buildings"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key
                </label>
                <input
                  type="text"
                  value={subForm.key}
                  onChange={(e) => setSubForm({ ...subForm, key: e.target.value })}
                  placeholder="office-buildings (auto-generated if blank)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSub}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Sub-Specialty
              </button>
              <button
                onClick={() => {
                  setModalType(null);
                  setSubForm({ name: "", key: "", parentKey: "commercial" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sub-Specialty Modal */}
      {modalType === 'edit-sub' && editingSub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit Sub-Specialty
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specialty *
                </label>
                <select
                  value={editingSub.parentKey}
                  onChange={(e) => setEditingSub({ ...editingSub, parentKey: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {specialties.map(parent => (
                    <option key={parent.key} value={parent.key}>
                      {parent.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Can reassign to different specialty
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={editingSub.name}
                  onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key *
                </label>
                <input
                  type="text"
                  value={editingSub.key}
                  onChange={(e) => setEditingSub({ ...editingSub, key: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  ⚠️ Changing the key may affect existing vendor profiles
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>{editingSub.vendorCount}</strong> vendors have this specialty
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditSub}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setModalType(null);
                  setEditingSub(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Delete {deleteTarget.type === 'parent' ? 'Specialty' : 'Sub-Specialty'}?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete <span className="font-semibold">"{deleteTarget.name}"</span>?
            </p>
            {deleteTarget.type === 'parent' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  ⚠️ This will also delete all sub-specialties under this specialty.
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setModalType(null);
                  setDeleteTarget(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header with Search and Add Button */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Specialties Management
            </h2>
            
            {/* Search Bar and Add Button - Same Line */}
            <div className="flex items-center gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search specialties..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              
              <DropdownButton
                label="Add"
                icon={<Plus className="w-4 h-4" />}
                options={[
                  {
                    label: 'Specialty',
                    icon: <Folder className="w-4 h-4" />,
                    onClick: () => setModalType('add-parent')
                  },
                  {
                    label: 'Sub-Specialty',
                    icon: <FolderOpen className="w-4 h-4" />,
                    onClick: () => setModalType('add-sub')
                  }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-6">
            <SkeletonTable rows={8} columns={4} />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                  
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sub-Specialties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vendors
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-16">
                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSpecialties.map((parent) => (
                <React.Fragment key={parent.id}>
                  {/* Parent Row */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(parent.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        {expandedRows.has(parent.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {parent.key}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {parent.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {parent.subSpecialties.length}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {parent.totalVendorCount} vendors
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === parent.id ? null : parent.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openMenuId === parent.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-20">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setEditingParent(parent);
                                    setModalType('edit-parent');
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit Specialty
                                </button>
                                <button
                                  onClick={() => {
                                    toggleExpand(parent.id);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  {expandedRows.has(parent.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                  {expandedRows.has(parent.id) ? 'Collapse' : 'Expand'}
                                </button>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                                <button
                                  onClick={() => {
                                    setDeleteTarget({ type: 'parent', id: parent.id, name: parent.name });
                                    setModalType('delete');
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Specialty
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Sub-Specialty Rows (when expanded) */}
                  {expandedRows.has(parent.id) && parent.subSpecialties.map((sub) => (
                    <tr key={sub.id} className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50">
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-3">
                        <div className="text-sm text-gray-900 dark:text-white pl-4">
                          {sub.key}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 pl-6">
                          <span className="text-gray-400">└─</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {sub.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-gray-400">—</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {sub.vendorCount} vendors
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenuId === sub.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-20">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setEditingSub(sub);
                                      setModalType('edit-sub');
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Sub-Specialty
                                  </button>
                                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                                  <button
                                    onClick={() => {
                                      setDeleteTarget({ type: 'sub', id: sub.id, name: sub.name });
                                      setModalType('delete');
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Sub-Specialty
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {/* No Results */}
        {!isLoading && filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No specialties found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
