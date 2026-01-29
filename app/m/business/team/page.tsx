'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUsersByBusinessId } from '@/lib/data/business-mock-data';
import { ChevronRight, Mail, Phone, UserPlus, Search } from 'lucide-react';
import Link from 'next/link';

export default function MobileTeamManagement() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const teamMembers = getUsersByBusinessId(user?.profile?.businessId || '');

  const filteredMembers = teamMembers.filter(member =>
    `${member.firstName} ${member.lastName} ${member.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Team
          </h1>
          <Link
            href="/m/business/team/invite"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium active:scale-95 transition-transform"
          >
            <UserPlus className="w-4 h-4" />
            Invite
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{teamMembers.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {teamMembers.filter(m => m.status === 'pending_invite').length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pending</p>
          </div>
        </div>

        {/* Team List */}
        <div className="space-y-2">
          {filteredMembers.map((member) => (
            <Link
              key={member.id}
              href={`/m/business/team/${member.id}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl active:scale-95 transition-transform"
            >
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {member.firstName?.[0]}{member.lastName?.[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {member.firstName} {member.lastName}
                  </p>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium capitalize ${
                    member.role === 'admin' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : member.role === 'appraiser'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {member.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </div>
                )}
                <div className="mt-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : member.status === 'pending_invite'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {member.status === 'active' ? 'Active' : member.status === 'pending_invite' ? 'Pending Invite' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No team members found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
