"use client";

import { useState, useMemo, useEffect } from "react";
import { mockLicenses, mockCredentials, mockInsurance } from "@/lib/data/mock-data";
import Snackbar from "@/components/snackbar";
import Modal from "@/components/modal";
import { Plus, AlertCircle, FileCheck, Award, Shield, Check, Edit2, Trash2, FileText, X, Download } from "lucide-react";
import { SkeletonDocumentCard, SkeletonLicenseRow } from "@/components/skeleton";
import MobileLicenseCard from "@/components/mobile/license-card";
import MobileFullScreenModal from "@/components/mobile/full-screen-modal";
import MobileFloatingActionButton from "@/components/mobile/floating-action-button";
import { useAuth } from "@/hooks/useAuth";

export default function MyDocumentsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const [licenses, setLicenses] = useState(mockLicenses);
  const [insuranceDocs, setInsuranceDocs] = useState(mockInsurance);
  const [sampleReports, setSampleReports] = useState(mockCredentials.sampleWork);
  const [w9Data, setW9Data] = useState<{ name: string; fileName: string; uploadDate: string } | null>({ 
    name: "W-9 2025", 
    fileName: mockCredentials.w9.fileName, 
    uploadDate: mockCredentials.w9.uploadDate 
  });
  const [resumeData, setResumeData] = useState<{ name: string; fileName: string; uploadDate: string } | null>({ 
    name: "Sarah's Resume", 
    fileName: mockCredentials.resume.fileName, 
    uploadDate: mockCredentials.resume.uploadDate 
  });
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Clear documents only for first-time users
  useEffect(() => {
    if (!user) {
      // While user is loading, keep default mock data
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
    
    // Check if this is a first-time user (not demo account and no business/vendorId)
    // Demo accounts include: demo-vendor-*, demo-business-*, demo-admin-*
    const isFirstTimeUser = !user?.id?.startsWith('demo-') && !user?.profile?.vendorId && !user?.profile?.businessId;
    
    // ONLY clear data if first-time user - otherwise keep mock data from initial state
    if (isFirstTimeUser) {
      setLicenses([]);
      setInsuranceDocs([]);
      setSampleReports([]);
      setW9Data(null);
      setResumeData(null);
    }
    // If returning user, the initial useState values already have the correct mock data
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user]);
  const [showAddLicense, setShowAddLicense] = useState(false);
  const [showEditLicense, setShowEditLicense] = useState<string | null>(null);
  const [showDeleteLicense, setShowDeleteLicense] = useState<string | null>(null);
  const [showAddSample, setShowAddSample] = useState(false);
  const [showEditSample, setShowEditSample] = useState<string | null>(null);
  const [showDeleteSample, setShowDeleteSample] = useState<string | null>(null);
  const [showEditW9, setShowEditW9] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);
  const [showDeleteW9, setShowDeleteW9] = useState(false);
  const [showDeleteResume, setShowDeleteResume] = useState(false);
  const [showAddW9Modal, setShowAddW9Modal] = useState(false);
  const [showAddResumeModal, setShowAddResumeModal] = useState(false);
  const [showAddInsurance, setShowAddInsurance] = useState(false);
  const [showEditInsurance, setShowEditInsurance] = useState<string | null>(null);
  const [showDeleteInsurance, setShowDeleteInsurance] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"credentials" | "licenses" | "insurance">("credentials");
  const [w9Name, setW9Name] = useState("W-9 2025");
  const [resumeName, setResumeName] = useState("Sarah's Resume");
  const [newW9Name, setNewW9Name] = useState("");
  const [newResumeName, setNewResumeName] = useState("");
  
  // License form state
  const [licenseForm, setLicenseForm] = useState({
    state: "",
    stateName: "",
    licenseNumber: "",
    expirationDate: "",
    fileName: ""
  });

  // Insurance form state
  const [insuranceForm, setInsuranceForm] = useState({
    type: "errors_omissions",
    insuranceCompany: "",
    policyNumber: "",
    coverageLimit: "",
    expirationDate: "",
    associatedBank: "",
    effectiveDate: "",
    fileName: ""
  });

  const expiringLicenses = licenses.filter(l => l.status === "expiring_soon");
  const maxSampleReports = 4;
  const canAddMoreSamples = sampleReports.length < maxSampleReports;

  // Helper function to get insurance status
  const getInsuranceStatus = (doc: any) => {
    // MSAs don't expire
    if (doc.type === "msa") return null;
    
    if (!doc.expirationDate) return null;
    
    const today = new Date("2025-01-05");
    const expiry = new Date(doc.expirationDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 60) {
      return { status: "expiring_soon", label: "Expiring Soon" };
    }
    return { status: "active", label: "Active" };
  };
  
  // Calculate expiring insurance documents using useMemo
  const expiringInsurance = useMemo(() => {
    return insuranceDocs.filter(doc => {
      if (doc.type === "msa") return false; // MSAs don't expire
      const statusInfo = getInsuranceStatus(doc);
      return statusInfo?.status === "expiring_soon";
    });
  }, [insuranceDocs]);

  const usStates = [
    { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
  ];

  const handleAddSampleReport = () => {
    setSnackbar({ message: "Sample report added successfully!", type: "success" });
    setShowAddSample(false);
  };

  const handleEditSampleReport = (id: string) => {
    setSnackbar({ message: "Sample report updated successfully!", type: "success" });
    setShowEditSample(null);
  };

  const handleDeleteSampleReport = (id: string) => {
    setSampleReports(sampleReports.filter(s => s.id !== id));
    setSnackbar({ message: "Sample report deleted successfully!", type: "success" });
    setShowDeleteSample(null);
  };

  const handleAddLicense = () => {
    if (!licenseForm.state || !licenseForm.licenseNumber || !licenseForm.expirationDate) {
      setSnackbar({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    const newLicense = {
      id: `lic-${Date.now()}`,
      state: licenseForm.state,
      stateName: licenseForm.stateName,
      licenseNumber: licenseForm.licenseNumber,
      expirationDate: licenseForm.expirationDate,
      fileName: licenseForm.fileName || "license.pdf",
      uploadDate: new Date().toISOString(),
      status: "active" as const
    };

    setLicenses([...licenses, newLicense]);
    setSnackbar({ message: "State license added successfully!", type: "success" });
    setShowAddLicense(false);
    setLicenseForm({ state: "", stateName: "", licenseNumber: "", expirationDate: "", fileName: "" });
  };

  const handleEditLicense = () => {
    if (!licenseForm.licenseNumber || !licenseForm.expirationDate) {
      setSnackbar({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    setLicenses(licenses.map(lic => 
      lic.id === showEditLicense 
        ? { 
            ...lic, 
            licenseNumber: licenseForm.licenseNumber, 
            expirationDate: licenseForm.expirationDate,
            fileName: licenseForm.fileName || lic.fileName
          }
        : lic
    ));
    setSnackbar({ message: "State license updated successfully!", type: "success" });
    setShowEditLicense(null);
    setLicenseForm({ state: "", stateName: "", licenseNumber: "", expirationDate: "", fileName: "" });
  };

  const handleDeleteLicense = (id: string) => {
    setLicenses(licenses.filter(lic => lic.id !== id));
    setSnackbar({ message: "State license deleted successfully!", type: "success" });
    setShowDeleteLicense(null);
  };

  const handleStateChange = (stateCode: string) => {
    const state = usStates.find(s => s.code === stateCode);
    setLicenseForm({
      ...licenseForm,
      state: stateCode,
      stateName: state?.name || ""
    });
  };

  const handleAddInsurance = () => {
    const isMSA = insuranceForm.type === "msa";
    
    if (isMSA) {
      if (!insuranceForm.associatedBank || !insuranceForm.effectiveDate) {
        setSnackbar({ message: "Please fill in all required fields", type: "error" });
        return;
      }
    } else {
      if (!insuranceForm.insuranceCompany || !insuranceForm.policyNumber || !insuranceForm.expirationDate) {
        setSnackbar({ message: "Please fill in all required fields", type: "error" });
        return;
      }
    }

    const documentTypeNames: Record<string, string> = {
      errors_omissions: "Errors & Omissions",
      general_liability: "General Commercial Liability",
      auto_liability: "Auto Liability",
      workers_comp: "Workers' Compensation",
      umbrella_liability: "Umbrella / Excess Liability",
      msa: "Master Services Agreement"
    };

    const newDoc = {
      id: `ins-${Date.now()}`,
      type: insuranceForm.type,
      typeName: documentTypeNames[insuranceForm.type],
      fileName: insuranceForm.fileName || "document.pdf",
      uploadDate: new Date().toISOString(),
      ...(isMSA ? {
        associatedBank: insuranceForm.associatedBank,
        effectiveDate: insuranceForm.effectiveDate
      } : {
        insuranceCompany: insuranceForm.insuranceCompany,
        policyNumber: insuranceForm.policyNumber,
        expirationDate: insuranceForm.expirationDate,
        ...(insuranceForm.coverageLimit && { coverageLimit: insuranceForm.coverageLimit })
      })
    };

    setInsuranceDocs([...insuranceDocs, newDoc]);
    setSnackbar({ message: `${documentTypeNames[insuranceForm.type]} added successfully!`, type: "success" });
    setShowAddInsurance(false);
    setInsuranceForm({ type: "errors_omissions", insuranceCompany: "", policyNumber: "", coverageLimit: "", expirationDate: "", associatedBank: "", effectiveDate: "", fileName: "" });
  };

  const handleEditInsurance = () => {
    const doc = insuranceDocs.find(d => d.id === showEditInsurance);
    if (!doc) return;

    const isMSA = doc.type === "msa";
    
    if (isMSA) {
      if (!insuranceForm.associatedBank || !insuranceForm.effectiveDate) {
        setSnackbar({ message: "Please fill in all required fields", type: "error" });
        return;
      }
    } else {
      if (!insuranceForm.insuranceCompany || !insuranceForm.policyNumber || !insuranceForm.expirationDate) {
        setSnackbar({ message: "Please fill in all required fields", type: "error" });
        return;
      }
    }

    setInsuranceDocs(insuranceDocs.map(d => 
      d.id === showEditInsurance 
        ? { 
            ...d,
            ...(isMSA ? {
              associatedBank: insuranceForm.associatedBank,
              effectiveDate: insuranceForm.effectiveDate,
              fileName: insuranceForm.fileName || d.fileName
            } : {
              insuranceCompany: insuranceForm.insuranceCompany,
              policyNumber: insuranceForm.policyNumber,
              expirationDate: insuranceForm.expirationDate,
              coverageLimit: insuranceForm.coverageLimit,
              fileName: insuranceForm.fileName || d.fileName
            })
          } as any
        : d
    ) as any[]);
    setSnackbar({ message: `${doc.typeName} updated successfully!`, type: "success" });
    setShowEditInsurance(null);
    setInsuranceForm({ type: "errors_omissions", insuranceCompany: "", policyNumber: "", coverageLimit: "", expirationDate: "", associatedBank: "", effectiveDate: "", fileName: "" });
  };

  const handleDeleteInsurance = (id: string) => {
    const doc = insuranceDocs.find(d => d.id === id);
    setInsuranceDocs(insuranceDocs.filter(d => d.id !== id));
    setSnackbar({ message: `${doc?.typeName || "Document"} deleted successfully!`, type: "success" });
    setShowDeleteInsurance(null);
  };

  const getAvailableInsuranceTypes = () => {
    const existingTypes = insuranceDocs.map(d => d.type).filter(t => t !== "msa");
    return [
      { value: "errors_omissions", label: "Errors & Omissions", disabled: existingTypes.includes("errors_omissions") },
      { value: "general_liability", label: "General Commercial Liability", disabled: existingTypes.includes("general_liability") },
      { value: "auto_liability", label: "Auto Liability", disabled: existingTypes.includes("auto_liability") },
      { value: "workers_comp", label: "Workers' Compensation", disabled: existingTypes.includes("workers_comp") },
      { value: "umbrella_liability", label: "Umbrella / Excess Liability", disabled: existingTypes.includes("umbrella_liability") },
      { value: "msa", label: "Master Services Agreement (MSA)", disabled: false }
    ];
  };

  const handleDeleteW9 = () => {
    setW9Data(null);
    setSnackbar({ message: "W-9 deleted successfully", type: "info" });
    setShowDeleteW9(false);
  };

  const handleDeleteResume = () => {
    setResumeData(null);
    setSnackbar({ message: "Resume deleted successfully", type: "info" });
    setShowDeleteResume(false);
  };

  const handleUpdateW9 = () => {
    if (w9Data) {
      setW9Data({ ...w9Data, name: w9Name });
    }
    setSnackbar({ message: "W-9 updated successfully!", type: "success" });
    setShowEditW9(false);
  };

  const handleUpdateResume = () => {
    if (resumeData) {
      setResumeData({ ...resumeData, name: resumeName });
    }
    setSnackbar({ message: "Resume updated successfully!", type: "success" });
    setShowEditResume(false);
  };

  const handleAddW9 = () => {
    setW9Data({ 
      name: newW9Name || "W-9", 
      fileName: "w9-2025.pdf", 
      uploadDate: new Date().toISOString() 
    });
    setSnackbar({ message: "W-9 uploaded successfully!", type: "success" });
    setShowAddW9Modal(false);
    setNewW9Name("");
  };

  const handleAddResume = () => {
    setResumeData({ 
      name: newResumeName || "Resume", 
      fileName: "resume-tom-reynolds.pdf", 
      uploadDate: new Date().toISOString() 
    });
    setSnackbar({ message: "Resume uploaded successfully!", type: "success" });
    setShowAddResumeModal(false);
    setNewResumeName("");
  };

  return (
    <div>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
          <nav className="flex gap-2 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hidden">
            <button
              onClick={() => setActiveTab("credentials")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "credentials"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <FileCheck className="w-5 h-5" />
              <span className="font-medium">Credentials</span>
            </button>
            <button
              onClick={() => setActiveTab("licenses")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "licenses"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="font-medium">State Licenses</span>
              {expiringLicenses.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {expiringLicenses.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("insurance")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "insurance"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Coverage & Insurance</span>
              {expiringInsurance.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {expiringInsurance.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 pt-4 md:pt-6">
        <div className="space-y-6">
          {isLoading ? (
            // Loading State for all tabs
            <div className="space-y-6">
              <SkeletonDocumentCard />
              <SkeletonDocumentCard />
              <SkeletonDocumentCard />
            </div>
          ) : activeTab === "credentials" ? (
            <>
              {/* W-9 Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    W-9
                  </h2>
                </div>
                <div className="p-6">
                {w9Data ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {w9Data.name}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <Check className="w-3 h-3" />
                            Uploaded
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Last Uploaded</p>
                            <p className="font-medium text-gray-900 dark:text-white">{new Date(w9Data.uploadDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">File</p>
                            <p className="font-medium text-primary hover:underline cursor-pointer">
                              {w9Data.fileName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setW9Name(w9Data.name);
                            setShowEditW9(true);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Edit W-9"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteW9(true)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Delete W-9"
                        >
                          <Trash2 className="w-5 h-5" />
                      </button>
                      </div>
                    </div>
                    </div>
                  ) : (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      A W-9 tax form is required to maintain compliance and credibility with banking partners
                    </p>
                    <button
                      onClick={() => setShowAddW9Modal(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Add W-9
                    </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Resume
                  </h2>
                </div>
                <div className="p-6">
                {resumeData ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {resumeData.name}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <Check className="w-3 h-3" />
                            Uploaded
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Last Uploaded</p>
                            <p className="font-medium text-gray-900 dark:text-white">{new Date(resumeData.uploadDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">File</p>
                            <p className="font-medium text-primary hover:underline cursor-pointer">
                              {resumeData.fileName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setResumeName(resumeData.name);
                            setShowEditResume(true);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Edit Resume"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteResume(true)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Delete Resume"
                        >
                          <Trash2 className="w-5 h-5" />
                      </button>
                      </div>
                    </div>
                    </div>
                  ) : (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      A professional resume is essential to demonstrate your experience and qualifications to banking partners
                    </p>
                    <button
                      onClick={() => setShowAddResumeModal(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Add Resume
                    </button>
                  </div>
                )}
                </div>
              </div>

              {/* Sample Reports Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Sample Reports
                    </h2>
                    {maxSampleReports - sampleReports.length > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                        <span className="font-semibold">{maxSampleReports - sampleReports.length}</span>
                        <span>remaining</span>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">(Maximum reached)</span>
                    )}
                  </div>
                  {canAddMoreSamples && (
                    <button
                      onClick={() => setShowAddSample(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Sample Report
                    </button>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  {sampleReports.map((report) => (
                    <div 
                      key={report.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-4">
                            <span className="text-base font-medium text-gray-900 dark:text-white">
                              {report.label}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Last Uploaded</p>
                              <p className="font-medium text-gray-900 dark:text-white">{new Date(report.uploadDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">File</p>
                              <p className="font-medium text-primary hover:underline cursor-pointer">{report.fileName}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setShowEditSample(report.id)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            aria-label="Edit sample report"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteSample(report.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            aria-label="Delete sample report"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {sampleReports.length === 0 && (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        No Sample Reports Yet
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add sample reports to showcase your work quality to banks
                      </p>
                      <button
                        onClick={() => setShowAddSample(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Add Sample Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : activeTab === "licenses" ? (
            <>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    State Licenses
                  </h2>
                  <button
                    onClick={() => setShowAddLicense(true)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add License
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {/* Expiration Warning */}
                  {expiringLicenses.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      {expiringLicenses.length} license(s) expiring soon
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Please renew your {expiringLicenses.map(l => l.stateName).join(", ")} license(s)
                    </p>
                  </div>
                </div>
              )}

              {/* Desktop License Cards - Hidden on mobile */}
              <div className="hidden md:block space-y-4">
              {licenses.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    No State Licenses Yet
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Add your state licenses to work with banks in those states
                  </p>
                  <button
                    onClick={() => setShowAddLicense(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Add License
                  </button>
                </div>
              ) : (
                licenses.map((license) => (
              <div
                key={license.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {license.stateName}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        license.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {license.status === "active" ? "Active" : "Expiring Soon"}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">License Number</p>
                        <p className="font-medium text-gray-900 dark:text-white">{license.licenseNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Expiration Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(license.expirationDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">License File</p>
                        <p className="font-medium text-primary hover:underline cursor-pointer">
                          {license.fileName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setLicenseForm({
                            state: license.state,
                            stateName: license.stateName,
                            licenseNumber: license.licenseNumber,
                            expirationDate: license.expirationDate,
                            fileName: license.fileName
                          });
                          setShowEditLicense(license.id);
                        }}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        aria-label="Edit license"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteLicense(license.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        aria-label="Delete license"
                      >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
                ))
              )}
              </div>

              {/* Mobile License Cards - Only on mobile */}
              <div className="block md:hidden space-y-3">
                {licenses.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      No State Licenses Yet
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add your state licenses to work with banks
                    </p>
                  </div>
                ) : (
                  licenses.map((license) => (
                  <MobileLicenseCard
                    key={license.id}
                    state={license.state}
                    stateName={license.stateName}
                    licenseNumber={license.licenseNumber}
                    expirationDate={license.expirationDate}
                    status={license.status as "active" | "expiring" | "expiring_soon" | "expired"}
                    fileName={license.fileName}
                    onEdit={() => {
                      setLicenseForm({
                        state: license.state,
                        stateName: license.stateName,
                        licenseNumber: license.licenseNumber,
                        expirationDate: license.expirationDate,
                        fileName: license.fileName
                      });
                      setShowEditLicense(license.id);
                    }}
                    onDelete={() => setShowDeleteLicense(license.id)}
                    onDownload={() => {
                      setSnackbar({ message: `Downloading ${license.fileName}`, type: "info" });
                    }}
                  />
                  ))
                )}
              </div>

              {/* Mobile FAB for Add License - Only on mobile, only on licenses tab */}
              {activeTab === "licenses" && (
                <MobileFloatingActionButton
                  onClick={() => setShowAddLicense(true)}
                  label="Add License"
                />
              )}
                </div>
              </div>
            </>
          ) : activeTab === "insurance" ? (
            <>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Coverage & Insurance
                  </h2>
                  <button
                    onClick={() => setShowAddInsurance(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Document
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {/* Expiration Warning */}
                  {expiringInsurance.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      {expiringInsurance.length} insurance {expiringInsurance.length === 1 ? 'policy' : 'policies'} expiring soon
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Please renew your {expiringInsurance.map(d => d.typeName).join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {insuranceDocs.map((doc) => {
                const isMSA = doc.type === "msa";
                const statusInfo = getInsuranceStatus(doc);
                return (
                  <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {doc.typeName}
                            {isMSA && (doc as any).associatedBank && (
                              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                ({(doc as any).associatedBank})
                              </span>
                            )}
                          </h3>
                          {statusInfo && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusInfo.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}>
                              {statusInfo.label}
                            </span>
                          )}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          {!isMSA && (
                            <>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Insurance Company</p>
                                <p className="font-medium text-gray-900 dark:text-white">{(doc as any).insuranceCompany}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Policy Number</p>
                                <p className="font-medium text-gray-900 dark:text-white">{(doc as any).policyNumber}</p>
                              </div>
                              {(doc as any).coverageLimit && (
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Coverage Limit</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{(doc as any).coverageLimit}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Expiration Date</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {new Date((doc as any).expirationDate).toLocaleDateString()}
                                </p>
                              </div>
                            </>
                          )}
                          {isMSA && (
                            <>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Associated Bank</p>
                                <p className="font-medium text-gray-900 dark:text-white">{(doc as any).associatedBank}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">Effective Date</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {new Date((doc as any).effectiveDate).toLocaleDateString()}
                                </p>
                              </div>
                            </>
                          )}
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">File</p>
                            <p className="font-medium text-primary hover:underline cursor-pointer">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setInsuranceForm({
                              type: doc.type,
                              insuranceCompany: (doc as any).insuranceCompany || "",
                              policyNumber: (doc as any).policyNumber || "",
                              coverageLimit: (doc as any).coverageLimit || "",
                              expirationDate: (doc as any).expirationDate || "",
                              associatedBank: (doc as any).associatedBank || "",
                              effectiveDate: (doc as any).effectiveDate || "",
                              fileName: doc.fileName
                            });
                            setShowEditInsurance(doc.id);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Edit document"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteInsurance(doc.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Delete document"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {insuranceDocs.length === 0 && (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    No Insurance Documents Yet
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Add your insurance coverage documents (E&O, General Liability, etc.)
                  </p>
                  <button
                    onClick={() => setShowAddInsurance(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Add Insurance
                  </button>
                </div>
              )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Add State License Modal */}
      <Modal
        isOpen={showAddLicense}
        onClose={() => {
          setShowAddLicense(false);
          setLicenseForm({ state: "", stateName: "", licenseNumber: "", expirationDate: "", fileName: "" });
        }}
        title="Add State License"
        footer={
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAddLicense(false);
                setLicenseForm({ state: "", stateName: "", licenseNumber: "", expirationDate: "", fileName: "" });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLicense}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Add License
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              State *
            </label>
            <select 
              value={licenseForm.state}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a state</option>
              {usStates.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              License Number *
            </label>
            <input 
              type="text" 
              value={licenseForm.licenseNumber}
              onChange={(e) => setLicenseForm({ ...licenseForm, licenseNumber: e.target.value })}
              placeholder="e.g., RD9887665"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiration Date *
            </label>
            <input 
              type="date" 
              value={licenseForm.expirationDate}
              onChange={(e) => setLicenseForm({ ...licenseForm, expirationDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload License File *
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit State License Modal */}
      {showEditLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit State License
              </h2>
              <button onClick={() => setShowEditLicense(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State
                </label>
                <input 
                  type="text" 
                  value={licenseForm.stateName}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  License Number *
                </label>
                <input 
                  type="text" 
                  value={licenseForm.licenseNumber}
                  onChange={(e) => setLicenseForm({ ...licenseForm, licenseNumber: e.target.value })}
                  placeholder="e.g., RD9887665"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiration Date *
                </label>
                <input 
                  type="date" 
                  value={licenseForm.expirationDate}
                  onChange={(e) => setLicenseForm({ ...licenseForm, expirationDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Replace License File (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditLicense}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditLicense(null);
                  setLicenseForm({ state: "", stateName: "", licenseNumber: "", expirationDate: "", fileName: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete License Confirmation Modal */}
      {showDeleteLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete State License?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your {licenses.find(l => l.id === showDeleteLicense)?.stateName} license? This will notify all connected banking partners.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteLicense(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLicense(showDeleteLicense)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sample Report Modal */}
      {showAddSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Sample Report
              </h2>
              <button onClick={() => setShowAddSample(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report Name *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Commercial - Office Building"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload File *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 25MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSampleReport}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Report
              </button>
              <button
                onClick={() => setShowAddSample(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sample Report Modal */}
      {showEditSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Sample Report
              </h2>
              <button onClick={() => setShowEditSample(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report Name *
                </label>
                <input 
                  type="text" 
                  defaultValue={sampleReports.find(r => r.id === showEditSample)?.label}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Replace File (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 25MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEditSampleReport(showEditSample)}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditSample(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Sample Report Modal */}
      {showDeleteSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete Sample Report?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{sampleReports.find(r => r.id === showDeleteSample)?.label}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteSample(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSampleReport(showDeleteSample)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit W-9 Modal */}
      {showEditW9 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit W-9
              </h2>
              <button onClick={() => setShowEditW9(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Name
                </label>
                <input 
                  type="text" 
                  value={w9Name}
                  onChange={(e) => setW9Name(e.target.value)}
                  placeholder="e.g., W-9 2025"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Replace File (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateW9}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditW9(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete W-9 Modal */}
      {showDeleteW9 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete W-9?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your W-9? This will remove it from all banking partners and may affect your credibility.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteW9(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteW9}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resume Modal */}
      {showEditResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Resume
              </h2>
              <button onClick={() => setShowEditResume(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Name
                </label>
                <input 
                  type="text" 
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  placeholder="e.g., Tom's Resume"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Replace File (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateResume}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditResume(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Resume Modal */}
      {showDeleteResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete Resume?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your resume? This will remove it from all banking partners and may impact your professional credibility.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteResume(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteResume}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add W-9 Modal */}
      {showAddW9Modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add W-9
              </h2>
              <button onClick={() => setShowAddW9Modal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Name *
                </label>
                <input 
                  type="text" 
                  value={newW9Name}
                  onChange={(e) => setNewW9Name(e.target.value)}
                  placeholder="e.g., W-9 2025"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload File *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddW9}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add W-9
              </button>
              <button
                onClick={() => {
                  setShowAddW9Modal(false);
                  setNewW9Name("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Insurance/Coverage Document Modal */}
      {showAddInsurance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Coverage Document
              </h2>
              <button onClick={() => setShowAddInsurance(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Type *
                </label>
                <select 
                  value={insuranceForm.type}
                  onChange={(e) => setInsuranceForm({ ...insuranceForm, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                >
                  {getAvailableInsuranceTypes().map(type => (
                    <option key={type.value} value={type.value} disabled={type.disabled}>
                      {type.label} {type.disabled ? "(Already Added)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* MSA Fields */}
              {insuranceForm.type === "msa" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Associated Bank *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.associatedBank}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, associatedBank: e.target.value })}
                      placeholder="e.g., Fifth Third Bank"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Effective Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.effectiveDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, effectiveDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Insurance Policy Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Insurance Company *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.insuranceCompany}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, insuranceCompany: e.target.value })}
                      placeholder="e.g., Hartford Insurance"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Policy Number *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.policyNumber}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, policyNumber: e.target.value })}
                      placeholder="e.g., EO-748383493"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  {(insuranceForm.type === "errors_omissions" || insuranceForm.type === "general_liability" || insuranceForm.type === "umbrella_liability") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Coverage Limit *
                      </label>
                      <input 
                        type="text" 
                        value={insuranceForm.coverageLimit}
                        onChange={(e) => setInsuranceForm({ ...insuranceForm, coverageLimit: e.target.value })}
                        placeholder="e.g., $2,000,000"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiration Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.expirationDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, expirationDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload {insuranceForm.type === "msa" ? "Agreement" : "Policy Document"} *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddInsurance}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Document
              </button>
              <button
                onClick={() => {
                  setShowAddInsurance(false);
                  setInsuranceForm({ type: "errors_omissions", insuranceCompany: "", policyNumber: "", coverageLimit: "", expirationDate: "", associatedBank: "", effectiveDate: "", fileName: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Insurance/Coverage Document Modal */}
      {showEditInsurance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit {insuranceDocs.find(d => d.id === showEditInsurance)?.typeName}
              </h2>
              <button onClick={() => setShowEditInsurance(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {insuranceForm.type === "msa" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Associated Bank *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.associatedBank}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, associatedBank: e.target.value })}
                      placeholder="e.g., Fifth Third Bank"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Effective Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.effectiveDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, effectiveDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Insurance Company *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.insuranceCompany}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, insuranceCompany: e.target.value })}
                      placeholder="e.g., Hartford Insurance"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Policy Number *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.policyNumber}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, policyNumber: e.target.value })}
                      placeholder="e.g., EO-748383493"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  {(insuranceForm.type === "errors_omissions" || insuranceForm.type === "general_liability" || insuranceForm.type === "umbrella_liability") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Coverage Limit *
                      </label>
                      <input 
                        type="text" 
                        value={insuranceForm.coverageLimit}
                        onChange={(e) => setInsuranceForm({ ...insuranceForm, coverageLimit: e.target.value })}
                        placeholder="e.g., $2,000,000"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiration Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.expirationDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, expirationDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload {insuranceForm.type === "msa" ? "Agreement" : "Policy Document"} *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddInsurance}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Document
              </button>
              <button
                onClick={() => {
                  setShowAddInsurance(false);
                  setInsuranceForm({ type: "errors_omissions", insuranceCompany: "", policyNumber: "", coverageLimit: "", expirationDate: "", associatedBank: "", effectiveDate: "", fileName: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Insurance/Coverage Document Modal */}
      {showEditInsurance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit {insuranceDocs.find(d => d.id === showEditInsurance)?.typeName}
              </h2>
              <button onClick={() => setShowEditInsurance(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {insuranceForm.type === "msa" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Associated Bank *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.associatedBank}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, associatedBank: e.target.value })}
                      placeholder="e.g., Fifth Third Bank"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Effective Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.effectiveDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, effectiveDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Insurance Company *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.insuranceCompany}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, insuranceCompany: e.target.value })}
                      placeholder="e.g., Hartford Insurance"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Policy Number *
                    </label>
                    <input 
                      type="text" 
                      value={insuranceForm.policyNumber}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, policyNumber: e.target.value })}
                      placeholder="e.g., EO-748383493"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  {(insuranceForm.type === "errors_omissions" || insuranceForm.type === "general_liability" || insuranceForm.type === "umbrella_liability") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Coverage Limit *
                      </label>
                      <input 
                        type="text" 
                        value={insuranceForm.coverageLimit}
                        onChange={(e) => setInsuranceForm({ ...insuranceForm, coverageLimit: e.target.value })}
                        placeholder="e.g., $2,000,000"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiration Date *
                    </label>
                    <input 
                      type="date" 
                      value={insuranceForm.expirationDate}
                      onChange={(e) => setInsuranceForm({ ...insuranceForm, expirationDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Replace {insuranceForm.type === "msa" ? "Agreement" : "Policy Document"} (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF (max 10MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditInsurance}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditInsurance(null);
                  setInsuranceForm({ type: "errors_omissions", insuranceCompany: "", policyNumber: "", coverageLimit: "", expirationDate: "", associatedBank: "", effectiveDate: "", fileName: "" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Insurance/Coverage Document Modal */}
      {showDeleteInsurance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete {insuranceDocs.find(d => d.id === showDeleteInsurance)?.typeName}?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this document? This will notify all connected banking partners.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteInsurance(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteInsurance(showDeleteInsurance)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Resume Modal */}
      {showAddResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Resume
              </h2>
              <button onClick={() => setShowAddResumeModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Document Name *
                </label>
                <input 
                  type="text" 
                  value={newResumeName}
                  onChange={(e) => setNewResumeName(e.target.value)}
                  placeholder="e.g., Tom's Resume"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload File *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddResume}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Resume
              </button>
              <button
                onClick={() => {
                  setShowAddResumeModal(false);
                  setNewResumeName("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
