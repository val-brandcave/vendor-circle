'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUsersByBusinessId } from '@/lib/data/business-mock-data';
import { UserPlus, Mail, MoreVertical, Edit, Trash2, RefreshCw, Phone, Search, User, X, FileText, MapPin, Building2 } from 'lucide-react';
import { SkeletonTable, SkeletonStatCard } from '@/components/skeleton';

export default function TeamManagementPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [viewingMember, setViewingMember] = useState<any>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'appraiser' | 'staff'>('appraiser');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'credentials' | 'coverage' | 'banks'>('overview');

  // Get team members - for single users, create array with just them
  let teamMembers = getUsersByBusinessId(user?.profile?.businessId || '');
  
  // If no team members found, create single user array
  if (teamMembers.length === 0 && user) {
    teamMembers = [{
      id: user.id || 'current-user',
      firstName: user.profile?.firstName || 'User',
      lastName: user.profile?.lastName || '',
      email: user.email || '',
      role: user.accountType === 'business_admin' ? 'admin' : 'appraiser',
      status: 'active',
      phone: user.profile?.phone || '',
      linkedProfileId: undefined,
      lastLogin: new Date().toISOString(),
      businessId: user.profile?.businessId || '',
      invitedDate: new Date().toISOString(),
    }];
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <SkeletonTable rows={7} columns={5} />
        </div>
      </div>
    );
  }

  const handleInvite = () => {
    // In real app, this would send invitation email
    console.log('Inviting:', inviteEmail, inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('appraiser');
    // Show success message
  };

  const handleEditClick = (member: any) => {
    setEditingMember(member);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  const handleViewProfile = (member: any) => {
    setViewingMember(member);
    setShowViewProfile(true);
    setOpenMenuId(null);
  };

  const handleSaveEdit = () => {
    // In real app, this would update the user
    console.log('Saving user:', editingMember);
    setShowEditModal(false);
    setEditingMember(null);
    // Show success message
  };

  // Check if this is a single-user account (only the owner)
  const isSingleUser = teamMembers.length === 1;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Single User Welcome Banner */}
      {isSingleUser && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                You're currently the only user on this account
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Add team members to collaborate, assign work, and manage appraisal projects together. 
                Team members can be appraisers, admins, or staff.
              </p>
              <button
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                <UserPlus className="w-5 h-5" />
                Invite Your First Team Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Stats - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Members</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {teamMembers.filter(m => m.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Invites</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {teamMembers.filter(m => m.status === 'pending_invite').length}
          </p>
        </div>
      </div>

      {/* Team Table - Wrapped in container with header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {/* Table Header with Title, Search, and Actions */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Team Members
            </h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full sm:w-64 pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              {/* Invite Button */}
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-5 h-5" />
                <span className="hidden sm:inline">Invite Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member) => {
                // Check if this member is the owner (logged-in user)
                const isOwner = member.email === user?.email || member.id === user?.id;
                
                return (
                  <tr 
                    key={member.id}
                    data-member-id={member.id}
                    className={`transition-colors ${
                      isOwner 
                        ? 'bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          isOwner 
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 ring-2 ring-blue-300 dark:ring-blue-600' 
                            : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}>
                          {member.firstName?.[0]}{member.lastName?.[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {member.firstName} {member.lastName}
                            </p>
                            {isOwner && (
                              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                                You
                              </span>
                            )}
                          </div>
                          {member.linkedProfileId && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Linked to profile
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                      member.role === 'admin' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : member.role === 'appraiser'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : member.status === 'pending_invite'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {member.status === 'active' ? 'Active' : member.status === 'pending_invite' ? 'Pending' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === member.id ? null : member.id);
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      aria-label="Actions"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions Dropdown Menu - Rendered outside table to prevent clipping */}
      {openMenuId && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenuId(null)}
        >
          <div 
            className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 w-48"
            style={{
              // Calculate position based on clicked row
              top: typeof window !== 'undefined' ? 
                (document.querySelector(`[data-member-id="${openMenuId}"]`)?.getBoundingClientRect().bottom || 0) + 8 : 0,
              right: typeof window !== 'undefined' ? 
                window.innerWidth - (document.querySelector(`[data-member-id="${openMenuId}"]`)?.getBoundingClientRect().right || 0) : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const member = teamMembers.find(m => m.id === openMenuId);
              if (!member) return null;
              
              const isOwner = member.email === user?.email || member.id === user?.id;
              
              return (
                <>
                  <button 
                    onClick={() => handleViewProfile(member)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </button>
                  {!isOwner && (
                    <button 
                      onClick={() => handleEditClick(member)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit User
                    </button>
                  )}
                  {isOwner && (
                    <button 
                      onClick={() => handleEditClick(member)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit My Info
                    </button>
                  )}
                  {member.status === 'pending_invite' && (
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      Resend Invite
                    </button>
                  )}
                  {!isOwner && (
                    <>
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Deactivate User
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Invite Team Member
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send an invitation email to add a new member to your team.
              </p>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="appraiser">Appraiser</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {inviteRole === 'admin' && 'Can manage team, profiles, and business settings'}
                  {inviteRole === 'appraiser' && 'Can manage own profile and view own work'}
                  {inviteRole === 'staff' && 'Can view documents and handle administrative tasks'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="flex-1 px-4 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal - Same pattern as Admin Vendor Profile */}
      {showViewProfile && viewingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl my-8">
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                    {viewingMember.firstName?.charAt(0)}{viewingMember.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {viewingMember.firstName} {viewingMember.lastName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">{viewingMember.role}</p>
                    {viewingMember.email === user?.email && (
                      <span className="inline-flex items-center px-2 py-0.5 mt-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                        You
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowViewProfile(false);
                    setViewingMember(null);
                    setActiveProfileTab('overview');
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="px-6">
                <nav className="flex gap-4">
                  <button
                    onClick={() => setActiveProfileTab('overview')}
                    className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                      activeProfileTab === 'overview'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveProfileTab('credentials')}
                    className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                      activeProfileTab === 'credentials'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Credentials & Licenses
                  </button>
                  <button
                    onClick={() => setActiveProfileTab('coverage')}
                    className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                      activeProfileTab === 'coverage'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Coverage & Expertise
                  </button>
                  <button
                    onClick={() => setActiveProfileTab('banks')}
                    className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                      activeProfileTab === 'banks'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Connected Banks
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {activeProfileTab === 'overview' && (
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Contact Information
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="font-medium text-gray-900 dark:text-white">{viewingMember.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="font-medium text-gray-900 dark:text-white">{viewingMember.phone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role & Status */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Account Details
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role</p>
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {viewingMember.role}
                          </span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            viewingMember.status === 'active'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {viewingMember.status === 'active' ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Login</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {viewingMember.lastLogin ? new Date(viewingMember.lastLogin).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'credentials' && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Credentials & Licenses
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Credential details will appear here
                  </p>
                </div>
              )}

              {activeProfileTab === 'coverage' && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Coverage & Expertise
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Coverage areas and specialties will appear here
                  </p>
                </div>
              )}

              {activeProfileTab === 'banks' && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Building2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Connected Banks
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connected banks will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingMember.email === user?.email ? 'Edit My Info' : 'Edit Team Member'}
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingMember(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editingMember.firstName || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editingMember.lastName || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={editingMember.email || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={editingMember.email === user?.email}
                  />
                </div>
                {editingMember.email === user?.email && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    You cannot change your own email here
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={editingMember.phone || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Role Selection - Can't change your own role if you're the owner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={editingMember.role || 'appraiser'}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  disabled={editingMember.email === user?.email && editingMember.role === 'admin'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="appraiser">Appraiser</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                {editingMember.email === user?.email && editingMember.role === 'admin' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    You cannot change your own admin role
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {editingMember.role === 'admin' && 'Can manage team, profiles, and business settings'}
                  {editingMember.role === 'appraiser' && 'Can manage own profile and view own work'}
                  {editingMember.role === 'staff' && 'Can view documents and handle administrative tasks'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingMember(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
