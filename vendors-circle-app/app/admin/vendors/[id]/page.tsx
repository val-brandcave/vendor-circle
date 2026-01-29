"use client";

import { use, useState, useEffect } from "react";
import { mockVendors, mockLicenses, mockCoverageAreas, mockInsurance, mockCredentials, mockAddresses, mockDesignations, mockConnectedBanks } from "@/lib/data/mock-data";
import { Mail, Phone, Building2, MapPin, FileText, AlertCircle, Award, Briefcase } from "lucide-react";
import Image from "next/image";
import { SkeletonVendorDetailHeader, SkeletonStatCard, SkeletonTable, SkeletonDocumentCard, SkeletonCoverageArea, SkeletonDesignationCard, SkeletonBankCard } from "@/components/skeleton";

type Tab = "overview" | "credentials" | "coverage" | "banks";

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vendor = mockVendors.find(v => v.id === id) || mockVendors[0];
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Vendor Identity Card */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                {vendor.firstName.charAt(0)}{vendor.lastName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vendor.firstName} {vendor.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{vendor.title}</p>
                <p className="text-primary font-medium mt-1">{vendor.company}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("credentials")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "credentials"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Credentials & Licenses
            </button>
            <button
              onClick={() => setActiveTab("coverage")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "coverage"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Coverage & Expertise
            </button>
            <button
              onClick={() => setActiveTab("banks")}
              className={`px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "banks"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Connected Banks
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-6">
        <div className="space-y-6">
          {isLoading ? (
            // Loading State for all tabs
            activeTab === "overview" ? (
              <div className="space-y-6">
                <SkeletonVendorDetailHeader />
                <div className="grid md:grid-cols-3 gap-4">
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                  <SkeletonStatCard />
                </div>
              </div>
            ) : activeTab === "credentials" ? (
              <div className="space-y-6">
                <SkeletonDocumentCard />
                <SkeletonDocumentCard />
                <SkeletonTable rows={4} columns={5} />
              </div>
            ) : activeTab === "coverage" ? (
              <div className="space-y-6">
                <SkeletonCoverageArea />
                <SkeletonCoverageArea />
                <div className="grid md:grid-cols-2 gap-6">
                  <SkeletonDesignationCard />
                  <SkeletonDesignationCard />
                </div>
              </div>
            ) : (
              // banks tab
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonBankCard key={i} />
                ))}
              </div>
            )
          ) : activeTab === "overview" ? (
            <>
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Primary Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bid Coordinator</p>
                        <p className="font-medium text-gray-900 dark:text-white">coordinator@reynoldsappraisals.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Assistant</p>
                        <p className="font-medium text-gray-900 dark:text-white">assistant@reynoldsappraisals.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Work Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Cell Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.cell}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fax</p>
                        <p className="font-medium text-gray-900 dark:text-white">(813) 555-9999</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.firstName} {vendor.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg md:col-span-2">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                        <p className="font-medium text-gray-900 dark:text-white">{vendor.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Addresses
                  </h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            City / State
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            County
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ZIP
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockAddresses.map((addr) => (
                          <tr key={addr.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-900 dark:text-white">{addr.address}</span>
                                {addr.isPrimary && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Primary
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {addr.city}, {addr.state}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {addr.county}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {addr.zip}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {addr.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Statistics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Connected Banks</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.connectedBanks}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Licenses</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.licenseCount}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(vendor.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "credentials" ? (
            <>
              {/* Credentials Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Credentials
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">W-9</p>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-primary hover:underline cursor-pointer">{mockCredentials.w9.fileName}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Uploaded: {new Date(mockCredentials.w9.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Résumé</p>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-primary hover:underline cursor-pointer">{mockCredentials.resume.fileName}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Uploaded: {new Date(mockCredentials.resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Sample Reports */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Sample Reports
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockCredentials.sampleWork.map((sample) => (
                        <div key={sample.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{sample.label}</p>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-primary hover:underline cursor-pointer">{sample.fileName}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Uploaded: {new Date(sample.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* State Licenses Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    State Licenses
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {mockLicenses.map((license) => (
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Coverage & Insurance Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Coverage & Insurance
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {/* Errors & Omissions */}
                  {mockInsurance.filter(ins => ins.type === "errors_omissions").map(ins => (
                    <div key={ins.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">{ins.typeName}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Company</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).insuranceCompany}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Coverage Limit</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).coverageLimit}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Expiration</p>
                          <p className="text-gray-900 dark:text-white">
                            {new Date((ins as any).expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-primary hover:underline cursor-pointer">{(ins as any).fileName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* General Liability */}
                  {mockInsurance.filter(ins => ins.type === "general_liability").map(ins => (
                    <div key={ins.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">{ins.typeName}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Company</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).insuranceCompany}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Policy #</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).policyNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Expiration</p>
                          <p className="text-gray-900 dark:text-white">
                            {new Date((ins as any).expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-primary hover:underline cursor-pointer">{(ins as any).fileName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Auto Liability */}
                  {mockInsurance.filter(ins => ins.type === "auto_liability").map(ins => (
                    <div key={ins.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">{ins.typeName}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Company</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).insuranceCompany}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Policy #</p>
                          <p className="text-gray-900 dark:text-white">{(ins as any).policyNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Expiration</p>
                          <p className="text-gray-900 dark:text-white">
                            {new Date((ins as any).expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-primary hover:underline cursor-pointer">{(ins as any).fileName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* MSAs */}
                  <div className="pt-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Master Service Agreements (MSAs)
                    </h3>
                    <div className="space-y-3">
                      {mockInsurance.filter(ins => ins.type === "msa").map(ins => (
                        <div key={ins.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-gray-900 dark:text-white">{(ins as any).associatedBank}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Active
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm mb-2">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Effective Date</p>
                              <p className="text-gray-900 dark:text-white">
                                {new Date((ins as any).effectiveDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Uploaded</p>
                              <p className="text-gray-900 dark:text-white">
                                {new Date((ins as any).uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-primary hover:underline cursor-pointer">{(ins as any).fileName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "coverage" ? (
            <>
              {/* Coverage Areas */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Coverage Areas
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {mockCoverageAreas.length} states covered
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  {mockCoverageAreas.map((area) => (
                    <div
                      key={area.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-5"
                    >
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
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap"
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Specialties
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Professional Designations */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Professional Designations
                  </h2>
                </div>
                <div className="p-6">
                  {mockDesignations.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockDesignations.map((designation) => (
                        <div
                          key={designation.id}
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
          ) : activeTab === "banks" ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
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
                      This vendor has not accepted any bank invitations yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
