'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getProfilesByBusinessId, getUsersByBusinessId } from '@/lib/data/business-mock-data';
import { BadgeCheck, Plus, MapPin, Award, FileText, MoreVertical, Edit, Trash2, UserCheck, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { SkeletonCard, SkeletonStatCard } from '@/components/skeleton';

export default function AppraiserProfilesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const profiles = getProfilesByBusinessId(user?.profile?.businessId || '');
  const users = getUsersByBusinessId(user?.profile?.businessId || '');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-end">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Stats - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Profiles</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{profiles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {profiles.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Licenses</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {profiles.reduce((acc, p) => acc + p.licenseCount, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Coverage States</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {[...new Set(profiles.flatMap(p => p.states))].length}
          </p>
        </div>
      </div>

      {/* Profiles Section - Wrapped with header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {/* Header with Title, View Toggle, and Create Button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appraiser Profiles
            </h2>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-primary dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-primary dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              {/* Create Button */}
              <Link 
                href="/business/profiles/create"
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profiles Content */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => {
            const linkedUser = users.find(u => u.id === profile.linkedUserId);
            const completeness = ((profile.hasW9 ? 25 : 0) + 
                                 (profile.hasResume ? 25 : 0) + 
                                 (profile.sampleReports >= 2 ? 25 : 0) + 
                                 (profile.insuranceCount >= 2 ? 25 : 0));
            
            return (
              <div
                key={profile.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {profile.firstName?.[0]}{profile.lastName?.[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === profile.id ? null : profile.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      aria-label="Actions"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    
                    {openMenuId === profile.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <UserCheck className="w-4 h-4" />
                          {linkedUser ? 'Change User Link' : 'Link to User'}
                        </button>
                        <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          Delete Profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Link */}
                <div className="flex items-center gap-2 mt-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    profile.status === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {profile.status}
                  </span>
                  {linkedUser && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      ✓ Linked to {linkedUser.firstName}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Profile Completeness */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Completeness
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {completeness}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        completeness === 100 ? 'bg-green-500' :
                        completeness >= 75 ? 'bg-blue-500' :
                        completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${completeness}%` }}
                    />
                  </div>
                </div>

                {/* Licenses */}
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {profile.licenseCount} {profile.licenseCount === 1 ? 'License' : 'Licenses'}
                  </span>
                </div>

                {/* States */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Licensed States
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.states.map((state) => (
                      <span
                        key={state}
                        className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Specialties
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {profile.specialties.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        +{profile.specialties.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Full Profile */}
                  <Link
                    href={`/business/profiles/${profile.id}`}
                    className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    View Full Profile →
                  </Link>
                </div>
              </div>
            );
          })}
          </div>
        ) : (
          /* List View - Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Appraiser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    States
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Licenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Completeness
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {profiles.map((profile) => {
                  const linkedUser = users.find(u => u.id === profile.linkedUserId);
                  const completeness = ((profile.hasW9 ? 25 : 0) + 
                                       (profile.hasResume ? 25 : 0) + 
                                       (profile.sampleReports >= 2 ? 25 : 0) + 
                                       (profile.insuranceCount >= 2 ? 25 : 0));
                  
                  return (
                    <tr key={profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {profile.firstName?.[0]}{profile.lastName?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {profile.firstName} {profile.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {profile.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {profile.states.map((state) => (
                            <span
                              key={state}
                              className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                            >
                              {state}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {profile.licenseCount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          profile.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {profile.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                completeness === 100 ? 'bg-green-500' :
                                completeness >= 75 ? 'bg-blue-500' :
                                completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${completeness}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                            {completeness}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/business/profiles/${profile.id}`}
                            className="text-sm text-primary hover:underline"
                          >
                            View
                          </Link>
                          <div className="relative inline-block">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === profile.id ? null : profile.id)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              aria-label="Actions"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            
                            {openMenuId === profile.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setOpenMenuId(null)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                  </button>
                                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <UserCheck className="w-4 h-4" />
                                    {linkedUser ? 'Change User Link' : 'Link to User'}
                                  </button>
                                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Profile
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Empty State - Only shown if no profiles */}
      {profiles.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Appraiser Profiles Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create appraiser profiles to manage credentials, licenses, and coverage areas for your team.
          </p>
          <Link
            href="/business/profiles/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create First Profile
          </Link>
        </div>
      )}

      {/* Aggregate Coverage View */}
      {profiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aggregate Business Coverage
          </h2>
          <div className="space-y-4">
            {/* Coverage by State */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Licensed States
              </p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(profiles.flatMap(p => p.states))].sort().map((state) => {
                  const appraiserCount = profiles.filter(p => p.states.includes(state)).length;
                  return (
                    <div key={state} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-semibold text-blue-700 dark:text-blue-300">
                        {state}
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">
                        ({appraiserCount} {appraiserCount === 1 ? 'appraiser' : 'appraisers'})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specialties Coverage */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team Specialties
              </p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(profiles.flatMap(p => p.specialties))].map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
