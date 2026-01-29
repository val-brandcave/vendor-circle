"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { 
  Mail, Phone, Building2, MapPin, FileText, Award, Briefcase, 
  Calendar, User, Plus, Edit2, ArrowLeft, Shield, Activity,
  TrendingUp, TrendingDown, Clock, CheckCircle, ChevronRight
} from "lucide-react";
import { SkeletonTable, SkeletonStatCard } from "@/components/skeleton";

// Mock vendor team member
const mockVendorMember = {
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
  company: "Reynolds Appraisal Services",
  address: {
    line1: "123 Main Street",
    line2: "Suite 200",
    city: "Tampa",
    state: "FL",
    zip: "33602"
  },
  licenseCount: 5,
  connectedBanks: 8,
  states: ["FL", "GA", "AL"],
  specialties: ["Commercial", "Residential", "Industrial"],
};

type AppraiserTab = "overview" | "credentials" | "coverage" | "banks" | "performance";

export default function VendorMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  
  const member = mockVendorMember;
  
  const [activeTab, setActiveTab] = useState<AppraiserTab>("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Members', href: '/vendor/members' },
      { label: 'Member Details' }
    ]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'credentials', label: 'Credentials & Licenses' },
    { id: 'coverage', label: 'Coverage & Expertise' },
    { id: 'banks', label: 'Connected Banks' },
    { id: 'performance', label: 'Performance' },
  ];

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        <SkeletonTable rows={5} columns={3} />
      </div>
    );
  }

  return (
    <div>
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Member Identity Card */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-2xl ring-2 ring-blue-300 dark:ring-blue-600">
              {member.firstName.charAt(0)}{member.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {member.firstName} {member.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{member.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                  {member.role}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Quick Info */}
      <div className="bg-gray-50 dark:bg-gray-900 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{member.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Company</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{member.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Joined</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(member.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">State Licenses</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{member.licenseCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">FL, GA, AL</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Connected Banks</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{member.connectedBanks}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Specialties</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{member.specialties.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Appraisal types</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Service Coverage</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{member.states.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">States</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-6 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AppraiserTab)}
                  className={`py-4 px-1 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Address
                  </h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-900 dark:text-white">{member.address.line1}</p>
                      {member.address.line2 && <p className="text-gray-900 dark:text-white">{member.address.line2}</p>}
                      <p className="text-gray-600 dark:text-gray-400">
                        {member.address.city}, {member.address.state} {member.address.zip}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'credentials' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Credential management coming soon.
                </p>
              </div>
            )}

            {activeTab === 'coverage' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Coverage & expertise details coming soon.
                </p>
              </div>
            )}

            {activeTab === 'banks' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Connected banks information coming soon.
                </p>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Performance metrics coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
