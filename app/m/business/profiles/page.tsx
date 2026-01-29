'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getProfilesByBusinessId } from '@/lib/data/business-mock-data';
import { Plus, MapPin, Award, FileText, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function MobileAppraiserProfiles() {
  const { user } = useAuth();
  const profiles = getProfilesByBusinessId(user?.profile?.businessId || '');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Appraiser Profiles
          </h1>
          <Link
            href="/m/business/profiles/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium active:scale-95 transition-transform"
          >
            <Plus className="w-4 h-4" />
            New
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{profiles.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Profiles</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {profiles.reduce((acc, p) => acc + p.licenseCount, 0)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Licenses</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {[...new Set(profiles.flatMap(p => p.states))].length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">States</p>
          </div>
        </div>
      </div>

      {/* Profiles List */}
      <div className="p-4 space-y-3">
        {profiles.map((profile) => {
          const completeness = ((profile.hasW9 ? 25 : 0) + 
                               (profile.hasResume ? 25 : 0) + 
                               (profile.sampleReports >= 2 ? 25 : 0) + 
                               (profile.insuranceCount >= 2 ? 25 : 0));
          
          return (
            <Link
              key={profile.id}
              href={`/m/business/profiles/${profile.id}`}
              className="block bg-white dark:bg-gray-800 rounded-xl p-4 active:scale-95 transition-transform"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {profile.title}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>

              {/* Profile Completeness */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {completeness}% Complete
                  </span>
                  {completeness === 100 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      completeness === 100 ? 'bg-green-500' :
                      completeness >= 75 ? 'bg-blue-500' :
                      completeness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span>{profile.licenseCount} licenses</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.states.join(', ')}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                  profile.status === 'active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {profile.status}
                </span>
              </div>
            </Link>
          );
        })}

        {/* Create Button (Mobile FAB style) */}
        <Link
          href="/m/business/profiles/create"
          className="flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-xl active:scale-95 transition-transform shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Create New Appraiser Profile</span>
        </Link>
      </div>
    </div>
  );
}
