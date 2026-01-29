'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserPlus, Mail, MoreVertical, Eye, Trash2, Phone, Search, X } from 'lucide-react';
import { SkeletonTable, SkeletonStatCard } from '@/components/skeleton';

// Mock data for individual vendor - just the vendor themselves initially
const mockVendorTeam = [
  {
    id: "vendor-001",
    firstName: "Tom",
    lastName: "Reynolds",
    email: "tom@reynoldsappraisals.com",
    phone: "(813) 555-1234",
    title: "Owner / Chief Appraiser",
    role: "owner",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: new Date().toISOString(),
  },
];

export default function VendorMembersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'appraiser' | 'staff'>('appraiser');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const teamMembers = mockVendorTeam;
  
  // Current logged-in user email (mock user for demo)
  const currentUserEmail = "tom@reynoldsappraisals.com";
  
  // Calculate pending invites (for now, always 0 since mockVendorTeam only has the owner)
  const pendingInvites = teamMembers.filter(m => m.status === 'pending_invite').length;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  }, []);

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
    console.log('Inviting:', inviteEmail, inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('appraiser');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Invite First Team Member Section - Only shows when no invites sent yet */}
      {pendingInvites === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Build Your Team
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Invite team members to help manage appraisals and streamline your workflow.
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap font-medium"
            >
              <UserPlus className="w-5 h-5" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>
      )}

      {/* Member Stats */}
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
            {pendingInvites}
          </p>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Members
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
        <div className="overflow-x-auto relative">
          <table className="w-full">
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
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {teamMembers.map((member) => {
                const isOwner = member.email === user?.email || member.id === user?.id;
                
                return (
                  <tr 
                    key={member.id} 
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
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {member.title}
                          </p>
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
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        
                        {openMenuId === member.id && (
                          <>
                            <div
                              className="fixed inset-0 z-[100]"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-[101]">
                              <button
                                onClick={() => {
                                  const isOwnProfile = member.email === currentUserEmail;
                                  if (isOwnProfile) {
                                    router.push('/vendor/profile');
                                  } else {
                                    router.push(`/vendor/members/${member.id}`);
                                  }
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Modal Header - Sticky */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Invite Team Member
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
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
                  <option value="staff">Staff</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {inviteRole === 'appraiser' && 'Can manage own profile and view own work'}
                  {inviteRole === 'staff' && 'Can view documents and handle administrative tasks'}
                </p>
              </div>
            </div>

            {/* Modal Footer - Sticky */}
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
    </div>
  );
}
