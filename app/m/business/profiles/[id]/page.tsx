"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, FileText, MapPin, Award, Edit2 } from "lucide-react";

export default function MobileAppraiserProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const profile = {
    id: profileId,
    name: "Mike Chen",
    email: "mike.chen@coastal.com",
    phone: "(619) 555-3456",
    licenses: 2,
    coverageStates: ["CA", "NV"],
    specialties: ["Residential", "Condos", "FHA/VA"],
    completeness: 95,
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
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h1>
          <button
            onClick={() => router.push(`/m/business/profiles/${profileId}/edit`)}
            className="p-2 -mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Name Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
              {profile.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{profile.name}</h2>
          
          {/* Completeness */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Profile Complete</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {profile.completeness}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${profile.completeness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
          <div className="p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
            <p className="text-gray-900 dark:text-white">{profile.email}</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
            <p className="text-gray-900 dark:text-white">{profile.phone}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.licenses}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Licenses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.coverageStates.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">States</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.specialties.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Specialties</p>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Coverage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Coverage States</h3>
          <div className="flex flex-wrap gap-2">
            {profile.coverageStates.map((state) => (
              <span
                key={state}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
