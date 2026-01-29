"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockTeamMembers, getTeamMemberById, canEditTeamMember } from "@/lib/data/team-members-mock";
import { mockLicenses, mockCoverageAreas, mockDesignations, mockConnectedBanks } from "@/lib/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, Building2, MapPin, FileText, Award, Briefcase, 
  Calendar, User, Plus, Edit2, ArrowLeft, Shield, Activity,
  TrendingUp, TrendingDown, Clock, CheckCircle, ChevronRight, X, Eye, Users, Star
} from "lucide-react";
import { SkeletonTable, SkeletonStatCard } from "@/components/skeleton";
import Image from "next/image";
import { getCountiesForState } from "@/lib/data/us-counties";

type AppraiserTab = "overview" | "credentials" | "coverage" | "banks" | "performance";
type StaffTab = "overview" | "access" | "activity" | "performance";

interface EditingState {
  isLicenseEditing: boolean;
  licenseEditId: string | null;
  isCoverageEditing: boolean;
  coverageEditId: string | null;
  isDesignationEditing: boolean;
  designationEditId: string | null;
}

interface CoverageForm {
  state: string;
  stateName: string;
  selectedCounties: string[];
}

const usStates = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  
  const member = getTeamMemberById(id) || mockTeamMembers[0];
  const isAppraiser = member.type === 'appraiser';
  const canEdit = canEditTeamMember(user?.accountType || '');
  
  const [activeTab, setActiveTab] = useState<AppraiserTab | StaffTab>(isAppraiser ? "overview" : "overview");
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState<EditingState>({
    isLicenseEditing: false,
    licenseEditId: null,
    isCoverageEditing: false,
    coverageEditId: null,
    isDesignationEditing: false,
    designationEditId: null,
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [coverageForm, setCoverageForm] = useState<CoverageForm>({
    state: 'FL',
    stateName: 'Florida',
    selectedCounties: [],
  });
  const [countySearchTerm, setCountySearchTerm] = useState('');

  useEffect(() => {
    // Set breadcrumbs when component mounts
    setBreadcrumbs([
      { label: 'Members', href: '/business/members' },
      { label: 'Member Details' }
    ]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to toggle county selection
  const toggleCounty = (county: string) => {
    setCoverageForm(prev => ({
      ...prev,
      selectedCounties: prev.selectedCounties.includes(county)
        ? prev.selectedCounties.filter(c => c !== county)
        : [...prev.selectedCounties, county]
    }));
  };

  // Helper function to remove county from form
  const removeCountyFromForm = (county: string) => {
    setCoverageForm(prev => ({
      ...prev,
      selectedCounties: prev.selectedCounties.filter(c => c !== county)
    }));
  };

  // Handle coverage state change
  const handleCoverageStateChange = (stateCode: string) => {
    const stateName = usStates.find(s => s.code === stateCode)?.name || '';
    setCoverageForm(prev => ({
      state: stateCode,
      stateName: stateName,
      selectedCounties: []
    }));
  };

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

  const handleSaveLicense = () => {
    setSnackbarMessage('License updated successfully');
    setShowSnackbar(true);
    setEditing(prev => ({ ...prev, isLicenseEditing: false, licenseEditId: null }));
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleSaveCoverage = () => {
    setSnackbarMessage('Coverage area updated successfully');
    setShowSnackbar(true);
    setEditing(prev => ({ ...prev, isCoverageEditing: false, coverageEditId: null }));
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleSaveDesignation = () => {
    setSnackbarMessage('Designation updated successfully');
    setShowSnackbar(true);
    setEditing(prev => ({ ...prev, isDesignationEditing: false, designationEditId: null }));
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  return (
    <div>
      {/* Member Identity Card */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
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
          ) : isAppraiser && activeTab === 'overview' ? (
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
          ) : !isAppraiser && activeTab === 'overview' ? (
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
          ) : isAppraiser && activeTab === 'credentials' ? (
            <>
              {/* State Licenses */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    State Licenses
                  </h2>
                  {canEdit && (
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                      Add License
                    </Button>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  {mockLicenses.length > 0 ? mockLicenses.map((license) => (
                    <div
                      key={license.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(prev => ({ ...prev, isLicenseEditing: true, licenseEditId: license.id }))}
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
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
                          <div className="flex items-center gap-2 mt-1">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-primary hover:underline cursor-pointer">
                              {license.fileName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit License Modal */}
                      {editing.isLicenseEditing && editing.licenseEditId === license.id && canEdit && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Edit License
                              </h3>
                              <button
                                onClick={() => setEditing(prev => ({ ...prev, isLicenseEditing: false, licenseEditId: null }))}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  License Number
                                </label>
                                <input
                                  type="text"
                                  defaultValue={license.licenseNumber}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Expiration Date
                                </label>
                                <input
                                  type="date"
                                  defaultValue={license.expirationDate}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Upload License File
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Drag and drop or click to upload
                                  </p>
                                  <input type="file" className="hidden" />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => setEditing(prev => ({ ...prev, isLicenseEditing: false, licenseEditId: null }))}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveLicense}
                                className="flex-1 px-4 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                              >
                                Save License
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400">No licenses on file</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : isAppraiser && activeTab === 'coverage' ? (
            <>
              {/* Coverage Areas */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Coverage Areas
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {mockCoverageAreas.length} states covered
                    </span>
                    {canEdit && (
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                        Add Area
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {mockCoverageAreas.map((area) => (
                    <div
                      key={area.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {area.stateName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {area.counties.length} counties
                          </p>
                        </div>
                        {canEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const stateName = usStates.find(s => s.name === area.stateName);
                              setCoverageForm({
                                state: stateName?.code || 'FL',
                                stateName: area.stateName,
                                selectedCounties: area.counties
                              });
                              setEditing(prev => ({ ...prev, isCoverageEditing: true, coverageEditId: area.id }));
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.counties.map((county) => (
                          <span
                            key={county}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap"
                          >
                            {county}
                          </span>
                        ))}
                      </div>

                      {/* Edit Coverage Modal */}
                      {editing.isCoverageEditing && editing.coverageEditId === area.id && canEdit && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Edit Coverage Area
                              </h3>
                              <button
                                onClick={() => {
                                  setEditing(prev => ({ ...prev, isCoverageEditing: false, coverageEditId: null }));
                                  setCountySearchTerm('');
                                }}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <X className="w-6 h-6" />
                              </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                              {/* State Selection */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  State *
                                </label>
                                <select 
                                  value={coverageForm.state}
                                  onChange={(e) => {
                                    handleCoverageStateChange(e.target.value);
                                    setCountySearchTerm("");
                                  }}
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                  {usStates.map(state => (
                                    <option key={state.code} value={state.code}>{state.name}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Selected Counties Pills */}
                              {coverageForm.selectedCounties.length > 0 && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Selected Counties ({coverageForm.selectedCounties.length})
                                  </label>
                                  <div className="flex flex-wrap gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    {coverageForm.selectedCounties.map((county) => (
                                      <span
                                        key={county}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                                      >
                                        {county}
                                        <button 
                                          onClick={() => removeCountyFromForm(county)} 
                                          className="hover:text-purple-900 dark:hover:text-purple-100"
                                          type="button"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* County Selection */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Select Counties *
                                </label>
                                {/* Search Input */}
                                <div className="mb-3">
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={countySearchTerm}
                                      onChange={(e) => setCountySearchTerm(e.target.value)}
                                      placeholder="Search counties..."
                                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                {/* County Checkboxes Grid */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                                  {(() => {
                                    const filteredCounties = getCountiesForState(coverageForm.state)
                                      .filter(county => county.toLowerCase().includes(countySearchTerm.toLowerCase()));
                                    
                                    if (filteredCounties.length === 0) {
                                      return (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                          No counties found matching "{countySearchTerm}"
                                        </p>
                                      );
                                    }
                                    
                                    return (
                                      <div className="grid grid-cols-2 gap-2">
                                        {filteredCounties.map((county) => (
                                          <label
                                            key={county}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={coverageForm.selectedCounties.includes(county)}
                                              onChange={() => toggleCounty(county)}
                                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{county}</span>
                                          </label>
                                        ))}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditing(prev => ({ ...prev, isCoverageEditing: false, coverageEditId: null }));
                                  setCountySearchTerm('');
                                }}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  handleSaveCoverage();
                                  setCountySearchTerm('');
                                }}
                                className="flex-1"
                              >
                                Save Coverage
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Designations */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Professional Designations
                  </h2>
                  {canEdit && (
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                      Add Designation
                    </Button>
                  )}
                </div>
                <div className="p-6">
                  {mockDesignations.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockDesignations.map((designation) => (
                        <div key={designation.id} className="relative">
                          <div
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {designation.code}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {designation.name}
                                </p>
                              </div>
                              {canEdit && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditing(prev => ({ ...prev, isDesignationEditing: true, designationEditId: designation.id }))}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {designation.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <span>{designation.issuer}</span>
                              <span>•</span>
                              <span>Obtained: {designation.yearObtained}</span>
                            </div>
                          </div>

                          {/* Edit Designation Modal */}
                          {editing.isDesignationEditing && editing.designationEditId === designation.id && canEdit && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Edit Designation
                                  </h3>
                                  <button
                                    onClick={() => setEditing(prev => ({ ...prev, isDesignationEditing: false, designationEditId: null }))}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                  >
                                    <X className="w-6 h-6" />
                                  </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Code
                                    </label>
                                    <input
                                      type="text"
                                      defaultValue={designation.code}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      defaultValue={designation.name}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      Year Obtained
                                    </label>
                                    <input
                                      type="number"
                                      defaultValue={designation.yearObtained}
                                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                                  <button
                                    onClick={() => setEditing(prev => ({ ...prev, isDesignationEditing: false, designationEditId: null }))}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleSaveDesignation}
                                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                                  >
                                    Save Designation
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        No professional designations on file
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : isAppraiser && activeTab === 'banks' ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Connected Banks
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {mockConnectedBanks.length} banks
                </span>
              </div>
              <div className="p-6">
                {mockConnectedBanks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockConnectedBanks.map((bank) => (
                      <div
                        key={bank.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Image
                              src={bank.bankLogo}
                              alt={`${bank.bankName} logo`}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {bank.bankName}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Connected on {new Date(bank.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {bank.scope}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {bank.region}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No connected banks yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This member has not connected to any banks yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : isAppraiser && activeTab === 'performance' ? (
            <>
              {/* Performance Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">142</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-3 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +12 this month
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">94%</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">133 completed</p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Turnaround</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2.1d</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-3 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" /> 0.2 days improved
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4.7/5</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">239 ratings</p>
                </div>
              </div>

              {/* Performance Rank */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ranking Position
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Rank</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">#87</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">out of 897 appraisers</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Percentile</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">90%</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Top 10% performer
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">vs Cohort Average</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">+0.5</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Rating advantage</p>
                  </div>
                </div>
              </div>

              {/* Performance Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* By Bank */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance by Bank
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Wells Fargo', rating: 4.8, bids: 45 },
                      { name: 'Chase Bank', rating: 4.6, bids: 38 },
                      { name: 'Bank of America', rating: 4.7, bids: 35 },
                      { name: 'Citibank', rating: 4.5, bids: 24 },
                    ].map((bank) => (
                      <div key={bank.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{bank.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{bank.bids} bids</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{bank.rating}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* By Specialty */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance by Specialty
                  </h3>
                  <div className="space-y-3">
                    {[
                      { specialty: 'Residential', rating: 4.8, bids: 89, percent: 63 },
                      { specialty: 'Commercial', rating: 4.6, bids: 38, percent: 27 },
                      { specialty: 'Multi-Family', rating: 4.4, bids: 15, percent: 10 },
                    ].map((spec) => (
                      <div key={spec.specialty}>
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{spec.specialty}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{spec.bids} bids</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                            {spec.rating}
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                            style={{ width: `${spec.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Performance Activity */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { action: 'Completed appraisal', bank: 'Wells Fargo', date: '2 hours ago', status: 'completed' },
                    { action: 'Rating received', bank: '4.8 stars from Chase', date: '5 hours ago', status: 'completed' },
                    { action: 'Bid accepted', bank: 'Bank of America', date: '1 day ago', status: 'accepted' },
                    { action: 'Bid submitted', bank: 'Citibank', date: '2 days ago', status: 'pending' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'accepted' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.bank}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : !isAppraiser && activeTab === 'access' ? (
            <>
              {/* Access & Permissions */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Access & Permissions
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Role */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Role</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{member.title || member.role}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Assigned on {new Date(member.joinedDate).toLocaleDateString()}</p>
                        </div>
                        <Shield className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Permission Groups */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Permission Groups</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'View Team Members', allowed: true },
                        { name: 'Manage Team Members', allowed: false },
                        { name: 'View Reports', allowed: true },
                        { name: 'Export Data', allowed: false },
                        { name: 'Manage Settings', allowed: false },
                        { name: 'View Bank Connections', allowed: true },
                      ].map((perm) => (
                        <div key={perm.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className={`w-4 h-4 rounded border ${
                            perm.allowed 
                              ? 'bg-green-500 border-green-500' 
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                          } flex items-center justify-center`}>
                            {perm.allowed && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className={`text-sm ${
                            perm.allowed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {perm.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Last Access */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">System Access</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Login</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Account Status</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">2FA Enabled</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : !isAppraiser && activeTab === 'activity' ? (
            <>
              {/* Activity Log */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Activity Log
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { action: 'Logged in', timestamp: '2 hours ago', icon: 'login', details: 'From IP: 192.168.1.1' },
                      { action: 'Viewed team members list', timestamp: '3 hours ago', icon: 'view', details: 'Total 8 members' },
                      { action: 'Updated member profile', timestamp: '5 hours ago', icon: 'edit', details: 'Maria Gonzalez' },
                      { action: 'Exported performance report', timestamp: '1 day ago', icon: 'export', details: 'Q4 2024 data' },
                      { action: 'Added new team member', timestamp: '2 days ago', icon: 'add', details: 'James Wilson' },
                      { action: 'Changed password', timestamp: '1 week ago', icon: 'security', details: 'Security change' },
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          {log.icon === 'login' && <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          {log.icon === 'view' && <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          {log.icon === 'edit' && <Edit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          {log.icon === 'export' && <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          {log.icon === 'add' && <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                          {log.icon === 'security' && <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{log.details}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : !isAppraiser && activeTab === 'performance' ? (
            <>
              {/* Staff Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team Members Managed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Team Rating</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4.6/5</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">92%</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Performance Breakdown */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Team Performance Breakdown
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Maria Gonzalez', rating: 4.8, bids: 45, completion: 96 },
                    { name: 'David Kim', rating: 4.7, bids: 38, completion: 94 },
                    { name: 'James Wilson', rating: 4.5, bids: 35, completion: 89 },
                    { name: 'Sarah Martinez', rating: 4.6, bids: 24, completion: 88 },
                  ].map((member) => (
                    <div key={member.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.bids} bids completed</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                              {member.rating}
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${member.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{member.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-40 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <CheckCircle className="w-5 h-5" />
          <span>{snackbarMessage}</span>
        </div>
      )}
    </div>
  );
}
