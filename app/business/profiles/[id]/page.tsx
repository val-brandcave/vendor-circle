"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, FileText, MapPin, Award, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AppraiserProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - would come from API
  const profile = {
    id: profileId,
    name: "Mike Chen",
    email: "mike.chen@coastal.com",
    phone: "(619) 555-3456",
    licenses: [
      {
        id: "lic-001",
        state: "CA",
        stateName: "California",
        number: "CA-987654",
        expiry: "2026-12-31",
        status: "Active",
      },
      {
        id: "lic-002",
        state: "NV",
        stateName: "Nevada",
        number: "NV-123456",
        expiry: "2026-08-15",
        status: "Active",
      },
    ],
    coverageAreas: [
      { state: "CA", counties: ["San Diego", "Orange", "Riverside"] },
      { state: "NV", counties: ["Clark"] },
    ],
    specialties: ["Residential", "Condos", "FHA/VA"],
    designations: ["SRA"],
    completeness: 95,
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/business/profiles")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profiles
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Appraiser Profile</p>
            
            {/* Completeness Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Profile Completeness
                </span>
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

          <div className="flex gap-2">
            <Button
              onClick={() => router.push(`/business/profiles/${profileId}/edit`)}
              variant="primary"
              size="md"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl space-y-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white font-medium">{profile.phone}</p>
            </div>
          </div>
        </div>

        {/* Licenses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              State Licenses
            </h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add License
            </button>
          </div>
          <div className="space-y-3">
            {profile.licenses.map((license) => (
              <div
                key={license.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {license.stateName} - {license.number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expires: {new Date(license.expiry).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                  {license.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Coverage Areas
            </h2>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add Coverage
            </button>
          </div>
          <div className="space-y-4">
            {profile.coverageAreas.map((area, idx) => (
              <div key={idx}>
                <p className="font-medium text-gray-900 dark:text-white mb-2">{area.state}</p>
                <div className="flex flex-wrap gap-2">
                  {area.counties.map((county) => (
                    <span
                      key={county}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {county}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Specialties & Designations
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Property Types</p>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Professional Designations
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.designations.map((designation) => (
                  <span
                    key={designation}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                  >
                    {designation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Delete Appraiser Profile?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this profile? This action cannot be undone. The
              user account will remain, but the appraiser credentials will be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  router.push("/business/profiles");
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
