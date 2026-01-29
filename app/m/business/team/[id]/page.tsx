"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Mail, Phone, User, MoreVertical, Edit2, Trash2, UserX } from "lucide-react";
import { useState } from "react";
import MobileActionSheet from "@/components/mobile/action-sheet";

export default function MobileTeamMemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;
  
  const [showActions, setShowActions] = useState(false);

  const member = {
    id: memberId,
    name: "Mike Chen",
    email: "mike.chen@coastal.com",
    phone: "(619) 555-3456",
    role: "Appraiser",
    status: "Active",
    joinedDate: "2025-03-15",
    lastLogin: "2026-01-12",
    linkedProfile: {
      id: "profile-003",
      name: "Mike Chen",
      completeness: 95,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Team Member</h1>
          <button
            onClick={() => setShowActions(true)}
            className="p-2 -mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              {member.role}
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
              {member.status}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">{member.email}</p>
            </div>
          </a>
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white">{member.phone}</p>
            </div>
          </a>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Complete</p>
            </div>
          </div>
        </div>

        {/* Linked Profile */}
        {member.linkedProfile && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Linked Profile</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{member.linkedProfile.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.linkedProfile.completeness}% complete</p>
              </div>
              <button
                onClick={() => router.push(`/m/business/profiles/${member.linkedProfile.id}`)}
                className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions Sheet */}
      {showActions && (
        <MobileActionSheet
          isOpen={showActions}
          onClose={() => setShowActions(false)}
          actions={[
            {
              label: "Edit Role",
              type: "default",
              onClick: () => {
                setShowActions(false);
                // Handle edit
              },
            },
            {
              label: "Send Message",
              type: "default",
              onClick: () => {
                setShowActions(false);
                // Handle message
              },
            },
            {
              label: "Deactivate",
              type: "destructive",
              onClick: () => {
                setShowActions(false);
                // Handle deactivate
              },
            },
          ]}
          showCancel={true}
        />
      )}
    </div>
  );
}
