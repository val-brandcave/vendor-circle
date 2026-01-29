"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockTeamMembers, getTeamMemberById, canEditTeamMember } from "@/lib/data/team-members-mock";
import { mockLicenses, mockCoverageAreas, mockDesignations, mockConnectedBanks } from "@/lib/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { 
  Mail, Phone, Building2, MapPin, FileText, Award, Briefcase, 
  Calendar, User, Plus, Edit2, ArrowLeft, Shield, Activity,
  TrendingUp, TrendingDown, Clock, CheckCircle
} from "lucide-react";
import { SkeletonTable } from "@/components/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type AppraiserTab = "overview" | "credentials" | "coverage" | "banks" | "performance";
type StaffTab = "overview" | "access" | "activity" | "performance";

export default function TeamMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  
  const member = getTeamMemberById(id) || mockTeamMembers[0];
  const isAppraiser = member.type === 'appraiser';
  const canEdit = canEditTeamMember(user?.accountType || '');
  
  const [activeTab, setActiveTab] = useState<AppraiserTab | StaffTab>(isAppraiser ? "overview" : "overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Tabs for appraisers
  const appraiserTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'credentials', label: 'Credentials & Licenses' },
    { id: 'coverage', label: 'Coverage & Expertise' },
    { id: 'banks', label: 'Connected Banks' },
    { id: 'performance', label: 'Performance' },
  ];

  // Tabs for staff
  const staffTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'access', label: 'Access & Permissions' },
    { id: 'activity', label: 'Activity' },
    { id: 'performance', label: 'Performance' },
  ];

  const tabs = isAppraiser ? appraiserTabs : staffTabs;

  return (
    <div>
      {/* Member Identity Card */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
          {/* Breadcrumb - in header */}
          <div className="mb-4">
            <button
              onClick={() => router.push('/business/team')}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Members
            </button>
          </div>
          
          {/* Identity Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {member.firstName} {member.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{member.title || member.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    member.role === 'appraiser' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {member.role}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    member.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    member.status === 'pending_invite' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {member.status === 'active' ? 'Active' : 
                     member.status === 'pending_invite' ? 'Pending Invite' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-6">
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonTable rows={4} columns={3} />
            </div>
          ) : isAppraiser ? (
            // APPRAISER TABS
            activeTab === 'overview' && (
              <>
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
                          <p className="font-medium text-gray-900 dark:text-white">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="font-medium text-gray-900 dark:text-white">{member.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(member.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Completeness */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Profile Status
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Profile Completeness
                      </span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {member.profileCompleteness}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          member.profileCompleteness >= 80 ? 'bg-green-500' :
                          member.profileCompleteness >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${member.profileCompleteness}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Licenses</p>
                        <p className={`text-sm font-semibold ${member.hasLicenses ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {member.hasLicenses ? '✓ Complete' : '✗ Missing'}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Coverage</p>
                        <p className={`text-sm font-semibold ${member.hasCoverage ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {member.hasCoverage ? '✓ Set' : '✗ Not Set'}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Documents</p>
                        <p className={`text-sm font-semibold ${member.hasDocuments ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {member.hasDocuments ? '✓ Uploaded' : '✗ Missing'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Quick Stats
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Licenses</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{member.licenses?.length || 0}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Specialties</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{member.specialties?.length || 0}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connected Banks</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{member.connectedBanks?.length || 0}</p>
                      </div>
                    </div>
                </div>
              </div>
            </>
          )
          ) : null}
          
          {!isLoading && isAppraiser && activeTab === 'credentials' && (
            <>
              {/* State Licenses */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      State Licenses
                    </h2>
                    {canEdit && (
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" />
                        Add License
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    {!member.hasLicenses || member.licenses?.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          No licenses uploaded yet
                        </p>
                        {canEdit && (
                          <button className="text-sm text-primary hover:underline">
                            Add their first license
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {member.licenses?.map((license) => (
                          <div key={license.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {license.stateName}
                                </h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  license.status === "active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                }`}>
                                  {license.status === "active" ? "Active" : "Expiring Soon"}
                                </span>
                              </div>
                              {canEdit && (
                                <button className="text-sm text-primary hover:underline">Edit</button>
                              )}
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">License Number</p>
                                <p className="font-medium text-gray-900 dark:text-white mt-1">{license.licenseNumber}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Expiration Date</p>
                                <p className="font-medium text-gray-900 dark:text-white mt-1">
                                  {new Date(license.expirationDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">License File</p>
                                {license.fileName ? (
                                  <div className="flex items-center gap-2 mt-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-primary hover:underline cursor-pointer">
                                      {license.fileName}
                                    </span>
                                  </div>
                                ) : (
                                  <p className="text-gray-500 dark:text-gray-400 mt-1">Not uploaded</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Documents
                    </h2>
                    {canEdit && (
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Document
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    {!member.hasDocuments || !member.documents || Object.keys(member.documents).length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          No documents uploaded yet
                        </p>
                        {canEdit && (
                          <button className="text-sm text-primary hover:underline">
                            Upload W-9, E&O Insurance, or Resume
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-4">
                        {member.documents?.w9 && (
                          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">W-9</p>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-primary hover:underline cursor-pointer">
                                {member.documents.w9.fileName}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Uploaded: {new Date(member.documents.w9.uploadDate).toLocaleDateString()}
                            </p>
                            {canEdit && (
                              <button className="text-xs text-primary hover:underline mt-2">Edit</button>
                            )}
                          </div>
                        )}
                        {member.documents?.eo_insurance && (
                          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">E&O Insurance</p>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-primary hover:underline cursor-pointer">
                                {member.documents.eo_insurance.fileName}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Expires: {new Date(member.documents.eo_insurance.expirationDate).toLocaleDateString()}
                            </p>
                            {canEdit && (
                              <button className="text-xs text-primary hover:underline mt-2">Edit</button>
                            )}
                          </div>
                        )}
                        {member.documents?.resume && (
                          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Resume</p>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-primary hover:underline cursor-pointer">
                                {member.documents.resume.fileName}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Uploaded: {new Date(member.documents.resume.uploadDate).toLocaleDateString()}
                            </p>
                            {canEdit && (
                              <button className="text-xs text-primary hover:underline mt-2">Edit</button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
          )}
          
          {!isLoading && isAppraiser && activeTab === 'coverage' && (
              <>
                {/* Coverage Areas */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Coverage Areas
                    </h2>
                    {canEdit && (
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                        Edit Coverage
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    {!member.hasCoverage || member.coverageAreas?.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Coverage areas not set
                        </p>
                        {canEdit && (
                          <button className="text-sm text-primary hover:underline">
                            Set coverage areas
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {member.coverageAreas?.map((area) => (
                          <div key={area.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {area.stateName}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {area.counties.length} counties
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {area.counties.map((county) => (
                                <span
                                  key={county}
                                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                >
                                  {county}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Specialties */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Specialties
                    </h2>
                    {canEdit && (
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                        Edit Specialties
                      </button>
                    )}
                  </div>
                  <div className="p-6">
                    {member.specialties?.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">No specialties selected</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Main Specialties</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {member.specialties?.map((specialty) => (
                            <span
                              key={specialty}
                              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        {member.subSpecialties && member.subSpecialties.length > 0 && (
                          <>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sub-Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                              {member.subSpecialties.map((sub) => (
                                <span
                                  key={sub}
                                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Designations */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Professional Designations
                    </h2>
                  </div>
                  <div className="p-6">
                    {member.designations?.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">No professional designations</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {member.designations?.map((designation) => (
                          <span
                            key={designation}
                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                          >
                            {designation}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
          )}
          
          {!isLoading && isAppraiser && activeTab === 'banks' && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Connected Banks
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {member.connectedBanks?.length || 0} banks
                  </span>
                </div>
                <div className="p-6">
                  {member.connectedBanks?.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        No connected banks yet
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {member.connectedBanks?.map((bank) => (
                        <div
                          key={bank.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-sm"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center p-2">
                              <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {bank.bankName}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Commercial Banking
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Status</span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                Active
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Connected</span>
                              <span className="text-gray-900 dark:text-white">
                                {new Date(bank.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Region</span>
                              <span className="text-gray-900 dark:text-white">
                                West Coast
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
          )}
          
          {!isLoading && isAppraiser && activeTab === 'performance' && (
              <>
                {/* Performance Metrics Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed Orders</p>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.performance?.completedOrders || 0}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% this month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Turnaround</p>
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.performance?.avgTurnaround || 0} <span className="text-lg">days</span>
                    </p>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <TrendingDown className="w-4 h-4" />
                      <span>-0.3 days vs last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                      <Activity className="w-5 h-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.performance?.completionRate || 0}%
                    </p>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+2% vs last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Client Rating</p>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.performance?.rating || 0}<span className="text-lg">/5</span>
                    </p>
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+0.2 vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Monthly Performance Chart */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Monthly Completions
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[
                        { month: 'Aug', orders: 6 },
                        { month: 'Sep', orders: 8 },
                        { month: 'Oct', orders: 7 },
                        { month: 'Nov', orders: 9 },
                        { month: 'Dec', orders: 11 },
                        { month: 'Jan', orders: 6 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                        <Bar dataKey="orders" fill="#2652B1" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Order Status Distribution */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Order Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Completed', value: 42 },
                            { name: 'In Progress', value: 5 },
                            { name: 'On Hold', value: 0 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completed (42)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">In Progress (5)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Detailed Metrics
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Response Time</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">2.4 hours</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average response to new bids</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">On-Time Delivery</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">94%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reports delivered on time</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Revision Rate</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">4%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reports requiring revisions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          )}
          
          {!isLoading && !isAppraiser && activeTab === 'overview' && (
              <>
                {/* Contact & Role Info */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Contact & Role Information
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-medium text-gray-900 dark:text-white">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="font-medium text-gray-900 dark:text-white">{member.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                          <p className="font-medium text-gray-900 dark:text-white">{member.title || member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(member.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          )}
          
          {!isLoading && !isAppraiser && activeTab === 'access' && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Access & Permissions
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {canEdit ? 'Manage permissions for' : 'Permissions for'} {member.firstName} {member.lastName} ({member.role})
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">View team dashboard</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Access to team metrics and overview</p>
                      </div>
                      {canEdit ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Allowed
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Manage bids</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create, edit, and assign bids</p>
                      </div>
                      {canEdit ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Allowed
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">View reports</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Access to all team reports</p>
                      </div>
                      {canEdit ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Allowed
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Edit business settings</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Modify business-wide settings</p>
                      </div>
                      {canEdit ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          Restricted
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Manage team members</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Invite, edit, or remove team members</p>
                      </div>
                      {canEdit ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          Restricted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )}
          
          {!isLoading && !isAppraiser && activeTab === 'activity' && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Coordinated bid for 123 Main St</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Updated team schedule</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">5 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          
          {!isLoading && !isAppraiser && activeTab === 'performance' && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Staff Performance
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Performance metrics for staff members are tracked differently than appraisers.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">34</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2 hrs</p>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
