/* eslint-disable */
"use client";

import { useState, useMemo, useEffect } from "react";
import { mockCoverageAreas, mockVendors, mockSpecialties, mockAddresses, mockDesignations, mockConnectedBanks } from "@/lib/data/mock-data";
import Snackbar from "@/components/snackbar";
import { Save, Plus, Trash2, Edit2, User, MapPin, Award, Building2, CheckCircle2, Upload, X, ChevronRight, MoreVertical } from "lucide-react";
import Image from "next/image";
import { SkeletonProfileSection, SkeletonTable, SkeletonCoverageArea, SkeletonDesignationCard, SkeletonBankCard } from "@/components/skeleton";
import MobileAddressCard from "@/components/mobile/address-card";
import MobileFloatingActionButton from "@/components/mobile/floating-action-button";
import MobileFullScreenModal from "@/components/mobile/full-screen-modal";
import { useAuth } from "@/hooks/useAuth";

type TabType = "profile" | "addresses" | "coverage" | "banks";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const vendor = mockVendors[0]; // Tom Reynolds
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [addresses, setAddresses] = useState(mockAddresses);
  const [coverageAreas, setCoverageAreas] = useState(mockCoverageAreas);
  const [selectedSpecialties, setSelectedSpecialties] = useState(vendor.specialties);
  const [designations, setDesignations] = useState(mockDesignations);
  const [connectedBanks, setConnectedBanks] = useState(mockConnectedBanks);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [expandedCoverageAreas, setExpandedCoverageAreas] = useState<Set<string>>(new Set());

  // Clear data only for first-time users
  useEffect(() => {
    if (!user) {
      // While user is loading, keep default mock data (don't clear yet)
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
    
    // Check if this is a first-time user (not demo account and no vendorId)
    const isFirstTimeUser = !user?.id?.startsWith('demo-vendor') && !user?.profile?.vendorId;
    
    // ONLY clear data if first-time user - otherwise keep the mock data from initial state
    if (isFirstTimeUser) {
      setAddresses([]);
      setCoverageAreas([]);
      setSelectedSpecialties([]);
      setDesignations([]);
      setConnectedBanks([]);
      
      // Clear form fields for first-time users
      setPersonalForm({
        firstName: '',
        lastName: '',
        title: '',
        company: ''
      });
      setEmailForm({
        primaryEmail: user?.email || '',
        bidCoordinatorEmail: '',
        assistantEmail: ''
      });
      setContactForm({
        workPhone: '',
        cellPhone: '',
        fax: ''
      });
    }
    // If returning user, the initial useState values already have the correct mock data
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user]);
  
  // Modals
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState<string | null>(null);
  const [showDeleteAddress, setShowDeleteAddress] = useState<string | null>(null);
  const [showAddCoverage, setShowAddCoverage] = useState(false);
  const [showEditCoverage, setShowEditCoverage] = useState<string | null>(null);
  const [showDeleteCoverage, setShowDeleteCoverage] = useState<string | null>(null);
  const [showEditSpecialties, setShowEditSpecialties] = useState(false);
  const [showAddDesignation, setShowAddDesignation] = useState(false);
  const [showEditDesignation, setShowEditDesignation] = useState<string | null>(null);
  const [showDeleteDesignation, setShowDeleteDesignation] = useState<string | null>(null);
  const [openAddressMenu, setOpenAddressMenu] = useState<string | null>(null);
  const [openBankMenu, setOpenBankMenu] = useState<string | null>(null);
  const [showDisconnectBank, setShowDisconnectBank] = useState<string | null>(null);
  
  // Dirty save tracking
  const [isDirtyPersonal, setIsDirtyPersonal] = useState(false);
  const [isDirtyEmails, setIsDirtyEmails] = useState(false);
  const [isDirtyContact, setIsDirtyContact] = useState(false);
  const [isDirtyPassword, setIsDirtyPassword] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  
  // Form data
  const [personalForm, setPersonalForm] = useState({
    firstName: vendor.firstName,
    lastName: vendor.lastName,
    title: vendor.title,
    company: vendor.company
  });
  
  const [emailForm, setEmailForm] = useState({
    primaryEmail: vendor.email,
    bidCoordinatorEmail: "",
    assistantEmail: ""
  });
  
  const [contactForm, setContactForm] = useState({
    workPhone: vendor.phone,
    cellPhone: vendor.cell,
    fax: ""
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Form states
  const [addressForm, setAddressForm] = useState({
    address: "",
    city: "",
    state: "",
    county: "",
    zip: "",
    type: "Office",
    isPrimary: false
  });

  const [coverageForm, setCoverageForm] = useState({
    state: "AL",
    stateName: "Alabama",
    selectedCounties: [] as string[]
  });

  const [specialtyInput, setSpecialtyInput] = useState("");
  const [tempSpecialties, setTempSpecialties] = useState<string[]>([]);
  const [countySearchTerm, setCountySearchTerm] = useState("");
  
  const [designationForm, setDesignationForm] = useState({
    code: "",
    name: "",
    description: "",
    issuer: "",
    yearObtained: ""
  });

  const handleSave = () => {
    setSnackbar({ message: "Profile updated successfully!", type: "success" });
  };

  const handleSavePersonalInfo = () => {
    // Save personal info logic
    setIsDirtyPersonal(false);
    setSnackbar({ message: "Personal information updated successfully!", type: "success" });
  };

  const handleSaveEmails = () => {
    // Save emails logic
    setIsDirtyEmails(false);
    setSnackbar({ message: "Email addresses updated successfully!", type: "success" });
  };

  const handleSaveContact = () => {
    // Save contact logic
    setIsDirtyContact(false);
    setSnackbar({ message: "Contact numbers updated successfully!", type: "success" });
  };

  const handleSavePassword = () => {
    // Save password logic
    setIsDirtyPassword(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSnackbar({ message: "Password updated successfully!", type: "success" });
  };

  const handleTabChange = (newTab: TabType) => {
    const hasDirtyChanges = isDirtyPersonal || isDirtyEmails || isDirtyContact || isDirtyPassword;
    if (hasDirtyChanges && activeTab === "profile") {
      setPendingNavigation(() => () => setActiveTab(newTab));
      setShowUnsavedWarning(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const handleSaveAndContinue = () => {
    if (isDirtyPersonal) handleSavePersonalInfo();
    if (isDirtyEmails) handleSaveEmails();
    if (isDirtyContact) handleSaveContact();
    if (isDirtyPassword) handleSavePassword();
    setShowUnsavedWarning(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleDiscardAndContinue = () => {
    setIsDirtyPersonal(false);
    setIsDirtyEmails(false);
    setIsDirtyContact(false);
    setIsDirtyPassword(false);
    setShowUnsavedWarning(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleSetPrimary = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isPrimary: addr.id === id
    })));
    setSnackbar({ message: "Primary address updated!", type: "success" });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    setSnackbar({ message: "Address deleted successfully!", type: "success" });
    setShowDeleteAddress(null);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      address: addressForm.address,
      city: addressForm.city,
      state: addressForm.state,
      county: addressForm.county,
      zip: addressForm.zip,
      type: addressForm.type,
      isPrimary: addressForm.isPrimary
    };
    
    // If this is set as primary, update all other addresses
    if (addressForm.isPrimary) {
      setAddresses([...addresses.map(addr => ({ ...addr, isPrimary: false })), newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    
    setSnackbar({ message: "Address added successfully!", type: "success" });
    setShowAddAddress(false);
    setAddressForm({ address: "", city: "", state: "", county: "", zip: "", type: "Office", isPrimary: false });
  };

  const handleEditAddress = () => {
    // If setting this address as primary, unset all others
    if (addressForm.isPrimary) {
      setAddresses(addresses.map(addr => 
        addr.id === showEditAddress 
          ? { ...addr, ...addressForm, isPrimary: true }
          : { ...addr, isPrimary: false }
      ));
    } else {
      setAddresses(addresses.map(addr => 
        addr.id === showEditAddress 
          ? { ...addr, ...addressForm }
          : addr
      ));
    }
    setSnackbar({ message: "Address updated successfully!", type: "success" });
    setShowEditAddress(null);
    setAddressForm({ address: "", city: "", state: "", county: "", zip: "", type: "Office", isPrimary: false });
  };

  const handleAddCoverage = () => {
    if (coverageForm.selectedCounties.length === 0) {
      setSnackbar({ message: "Please select at least one county", type: "error" });
      return;
    }
    
    const newCoverage = {
      id: `cov-${Date.now()}`,
      state: coverageForm.state,
      stateName: coverageForm.stateName,
      counties: coverageForm.selectedCounties
    };
    setCoverageAreas([...coverageAreas, newCoverage]);
    setSnackbar({ message: "Coverage area added successfully!", type: "success" });
    setShowAddCoverage(false);
    setCoverageForm({ state: "AL", stateName: "Alabama", selectedCounties: [] });
  };

  const handleEditCoverage = () => {
    setCoverageAreas(coverageAreas.map(area =>
      area.id === showEditCoverage
        ? { ...area, counties: coverageForm.selectedCounties }
        : area
    ));
    setSnackbar({ message: "Coverage area updated successfully!", type: "success" });
    setShowEditCoverage(null);
    setCoverageForm({ state: "AL", stateName: "Alabama", selectedCounties: [] });
  };

  const handleDeleteCoverage = (id: string) => {
    setCoverageAreas(coverageAreas.filter(area => area.id !== id));
    setSnackbar({ message: "Coverage area deleted successfully!", type: "success" });
    setShowDeleteCoverage(null);
  };

  const handleAddSpecialty = () => {
    if (specialtyInput.trim()) {
      setTempSpecialties([...tempSpecialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const handleSaveSpecialties = () => {
    setSelectedSpecialties(tempSpecialties);
    setSnackbar({ message: "Specialties updated successfully!", type: "success" });
    setShowEditSpecialties(false);
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setTempSpecialties(tempSpecialties.filter(s => s !== specialty));
  };

  // US States for dropdowns
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

  // Counties by state (showing 10+ per state for common states)
  const countiesByState: Record<string, string[]> = {
    FL: ["Alachua", "Bay", "Brevard", "Broward", "Charlotte", "Citrus", "Clay", "Collier", "Duval", "Escambia", "Hernando", "Hillsborough", "Indian River", "Lee", "Leon", "Manatee", "Marion", "Martin", "Miami-Dade", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "Sarasota", "Seminole", "St. Johns", "St. Lucie", "Volusia"],
    GA: ["Bartow", "Bibb", "Carroll", "Cherokee", "Clarke", "Clayton", "Cobb", "Columbia", "Coweta", "DeKalb", "Douglas", "Fayette", "Floyd", "Forsyth", "Fulton", "Gwinnett", "Hall", "Henry", "Houston", "Muscogee", "Newton", "Paulding", "Richmond", "Rockdale", "Whitfield"],
    AL: ["Baldwin", "Calhoun", "Cullman", "Etowah", "Houston", "Jefferson", "Lauderdale", "Lee", "Limestone", "Madison", "Mobile", "Montgomery", "Morgan", "Russell", "Shelby", "St. Clair", "Talladega", "Tuscaloosa", "Walker"],
    CA: ["Alameda", "Contra Costa", "El Dorado", "Fresno", "Kern", "Los Angeles", "Marin", "Monterey", "Orange", "Placer", "Riverside", "Sacramento", "San Bernardino", "San Diego", "San Francisco", "San Joaquin", "San Mateo", "Santa Barbara", "Santa Clara", "Sonoma", "Stanislaus", "Tulare", "Ventura"],
    TX: ["Bexar", "Brazoria", "Brazos", "Collin", "Dallas", "Denton", "El Paso", "Fort Bend", "Galveston", "Harris", "Hidalgo", "Jefferson", "Lubbock", "McLennan", "Midland", "Montgomery", "Nueces", "Smith", "Tarrant", "Travis", "Williamson"],
    NY: ["Albany", "Bronx", "Broome", "Dutchess", "Erie", "Kings (Brooklyn)", "Monroe", "Nassau", "New York (Manhattan)", "Niagara", "Oneida", "Onondaga", "Orange", "Queens", "Richmond (Staten Island)", "Rockland", "Saratoga", "Schenectady", "Suffolk", "Ulster", "Westchester"]
  };

  const getCountiesForState = (stateCode: string): string[] => {
    return countiesByState[stateCode] || ["County 1", "County 2", "County 3", "County 4", "County 5", "County 6", "County 7", "County 8", "County 9", "County 10"];
  };

  const handleCoverageStateChange = (stateCode: string) => {
    const state = usStates.find(s => s.code === stateCode);
    setCoverageForm({
      state: stateCode,
      stateName: state?.name || "",
      selectedCounties: []
    });
  };

  const toggleCounty = (county: string) => {
    if (coverageForm.selectedCounties.includes(county)) {
      setCoverageForm({
        ...coverageForm,
        selectedCounties: coverageForm.selectedCounties.filter(c => c !== county)
      });
    } else {
      setCoverageForm({
        ...coverageForm,
        selectedCounties: [...coverageForm.selectedCounties, county]
      });
    }
  };

  const removeCountyFromForm = (county: string) => {
    setCoverageForm({
      ...coverageForm,
      selectedCounties: coverageForm.selectedCounties.filter(c => c !== county)
    });
  };

  const handleAddDesignation = () => {
    if (!designationForm.code || !designationForm.name) {
      setSnackbar({ message: "Please fill in required fields", type: "error" });
      return;
    }
    
    const newDesignation = {
      id: `des-${Date.now()}`,
      ...designationForm
    };
    setDesignations([...designations, newDesignation]);
    setSnackbar({ message: "Designation added successfully!", type: "success" });
    setShowAddDesignation(false);
    setDesignationForm({ code: "", name: "", description: "", issuer: "", yearObtained: "" });
  };

  const handleEditDesignation = () => {
    setDesignations(designations.map(des =>
      des.id === showEditDesignation
        ? { ...des, ...designationForm }
        : des
    ));
    setSnackbar({ message: "Designation updated successfully!", type: "success" });
    setShowEditDesignation(null);
    setDesignationForm({ code: "", name: "", description: "", issuer: "", yearObtained: "" });
  };

  const handleDeleteDesignation = (id: string) => {
    setDesignations(designations.filter(des => des.id !== id));
    setSnackbar({ message: "Designation deleted successfully!", type: "success" });
    setShowDeleteDesignation(null);
  };

  const handleDisconnectBank = (bankId: string) => {
    const bank = connectedBanks.find(b => b.id === bankId);
    setConnectedBanks(connectedBanks.filter(b => b.id !== bankId));
    setSnackbar({ message: `Disconnected from ${bank?.bankName}`, type: "info" });
    setShowDisconnectBank(null);
    setOpenBankMenu(null);
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
              onClick={() => handleTabChange("profile")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile Info</span>
            </button>
            <button
              onClick={() => handleTabChange("addresses")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "addresses"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Addresses</span>
            </button>
            <button
              onClick={() => handleTabChange("coverage")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "coverage"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="font-medium">Coverage & Expertise</span>
            </button>
            <button
              onClick={() => handleTabChange("banks")}
              className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                activeTab === "banks"
                  ? "border-primary text-primary dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Connected Banks</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                {connectedBanks.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 pt-4 md:pt-6">
        <div className="space-y-6">
          {isLoading ? (
            // Loading State for all tabs
            activeTab === "profile" ? (
              <SkeletonProfileSection />
            ) : activeTab === "addresses" ? (
              <SkeletonTable rows={3} columns={6} />
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
          ) : activeTab === "profile" ? (
            <>
              {/* Personal Info Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Info
                  </h2>
                  <button
                    onClick={handleSavePersonalInfo}
                    disabled={!isDirtyPersonal}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-6 mb-6">
                    {/* Avatar */}
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <Image
                          src="/avatars/Vendor-Tom-Reynolds.png"
                          alt={`${personalForm.firstName} ${personalForm.lastName}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="text-center text-white text-xs">
                          <Upload className="w-5 h-5 mx-auto mb-1" />
                          <span>Change photo</span>
                        </div>
                      </div>
                    </div>

                    {/* Display Info */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {personalForm.firstName} {personalForm.lastName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{personalForm.company}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-2">
                        Vendor
                      </span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={personalForm.firstName}
                        onChange={(e) => {
                          setPersonalForm({ ...personalForm, firstName: e.target.value });
                          setIsDirtyPersonal(true);
                        }}
                        aria-label="First Name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={personalForm.lastName}
                        onChange={(e) => {
                          setPersonalForm({ ...personalForm, lastName: e.target.value });
                          setIsDirtyPersonal(true);
                        }}
                        aria-label="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={personalForm.title}
                        onChange={(e) => {
                          setPersonalForm({ ...personalForm, title: e.target.value });
                          setIsDirtyPersonal(true);
                        }}
                        aria-label="Title"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={personalForm.company}
                        onChange={(e) => {
                          setPersonalForm({ ...personalForm, company: e.target.value });
                          setIsDirtyPersonal(true);
                        }}
                        aria-label="Company"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Addresses Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email Addresses
                  </h2>
                  <button
                    onClick={handleSaveEmails}
                    disabled={!isDirtyEmails}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Primary Email *
                      </label>
                      <input
                        type="email"
                        value={emailForm.primaryEmail}
                        onChange={(e) => {
                          setEmailForm({ ...emailForm, primaryEmail: e.target.value });
                          setIsDirtyEmails(true);
                        }}
                        aria-label="Primary Email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bid Coordinator Email
                      </label>
                      <input
                        type="email"
                        value={emailForm.bidCoordinatorEmail}
                        onChange={(e) => {
                          setEmailForm({ ...emailForm, bidCoordinatorEmail: e.target.value });
                          setIsDirtyEmails(true);
                        }}
                        placeholder="coordinator@example.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Assistant Email
                      </label>
                      <input
                        type="email"
                        value={emailForm.assistantEmail}
                        onChange={(e) => {
                          setEmailForm({ ...emailForm, assistantEmail: e.target.value });
                          setIsDirtyEmails(true);
                        }}
                        placeholder="assistant@example.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Numbers Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Contact Numbers
                  </h2>
                  <button
                    onClick={handleSaveContact}
                    disabled={!isDirtyContact}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Work Phone *
                      </label>
                      <input
                        type="tel"
                        value={contactForm.workPhone}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, workPhone: e.target.value });
                          setIsDirtyContact(true);
                        }}
                        aria-label="Work Phone"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cell Phone *
                      </label>
                      <input
                        type="tel"
                        value={contactForm.cellPhone}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, cellPhone: e.target.value });
                          setIsDirtyContact(true);
                        }}
                        aria-label="Cell Phone"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fax
                      </label>
                      <input
                        type="tel"
                        value={contactForm.fax}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, fax: e.target.value });
                          setIsDirtyContact(true);
                        }}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Password
                  </h2>
                  <button
                    onClick={handleSavePassword}
                    disabled={!isDirtyPassword}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => {
                          setPasswordForm({ ...passwordForm, currentPassword: e.target.value });
                          setIsDirtyPassword(true);
                        }}
                        aria-label="Current Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password *
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => {
                          setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                          setIsDirtyPassword(true);
                        }}
                        aria-label="New Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => {
                          setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                          setIsDirtyPassword(true);
                        }}
                        aria-label="Confirm Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "addresses" ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Business Addresses
                </h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </button>
              </div>

              <div className="p-4 md:p-6">
                {addresses.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      No Addresses Added
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add your business addresses for contact and service area information
                    </p>
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table - Hidden on mobile */}
                    <div className="hidden md:block overflow-x-auto overflow-y-visible">
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
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {addresses.map((addr) => (
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
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end">
                            <button
                              id={`addr-menu-btn-${addr.id}`}
                              onClick={(e) => {
                                setOpenAddressMenu(openAddressMenu === addr.id ? null : addr.id);
                              }}
                              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              aria-label="Address actions"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Dropdown Menu - Fixed positioning to float above table */}
                          {openAddressMenu === addr.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setOpenAddressMenu(null)}
                              />
                              {/* @ts-ignore - Dynamic positioning required for dropdown menu */}
                              <div 
                                className="fixed w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden"
                                style={{
                                  top: `${document.getElementById(`addr-menu-btn-${addr.id}`)?.getBoundingClientRect().bottom ?? 0 + 4}px`,
                                  right: `${window.innerWidth - (document.getElementById(`addr-menu-btn-${addr.id}`)?.getBoundingClientRect().right ?? 0)}px`
                                }}
                              >
                                {!addr.isPrimary && (
                                  <button
                                    onClick={() => {
                                      handleSetPrimary(addr.id);
                                      setOpenAddressMenu(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    Set as Primary
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setAddressForm(addr);
                                    setShowEditAddress(addr.id);
                                    setOpenAddressMenu(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  Edit
                                </button>
                                {!addr.isPrimary && (
                                  <>
                                    <div className="border-t border-gray-200 dark:border-gray-700" />
                                    <button
                                      onClick={() => {
                                        setShowDeleteAddress(addr.id);
                                        setOpenAddressMenu(null);
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>

                    {/* Mobile Address Cards - Only on mobile */}
                    <div className="block md:hidden space-y-3">
                      {addresses.map((addr) => (
                        <MobileAddressCard
                          key={addr.id}
                          address={addr.address}
                          city={addr.city}
                          state={addr.state}
                          county={addr.county}
                          zip={addr.zip}
                          type={addr.type}
                          isPrimary={addr.isPrimary}
                          onEdit={() => {
                            setAddressForm(addr);
                            setShowEditAddress(addr.id);
                          }}
                          onDelete={() => setShowDeleteAddress(addr.id)}
                          onSetPrimary={() => handleSetPrimary(addr.id)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile FAB for Add Address - Only on mobile */}
              {addresses.length > 0 && (
                <MobileFloatingActionButton
                  onClick={() => setShowAddAddress(true)}
                  label="Add Address"
                />
              )}
            </div>
          ) : activeTab === "coverage" ? (
            <>
              {/* Coverage Areas Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Coverage Areas
                  </h2>
                  <button
                    onClick={() => setShowAddCoverage(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Coverage Area
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {coverageAreas.length === 0 ? (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        No Coverage Areas Yet
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add coverage areas to show banks where you can provide services
                      </p>
                      <button
                        onClick={() => setShowAddCoverage(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Add Coverage Area
                      </button>
                    </div>
                  ) : (
                    coverageAreas.map((area) => (
                    <div
                      key={area.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {area.stateName} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({area.counties.length} counties)</span>
                        </h3>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setCoverageForm({
                                state: area.state,
                                stateName: area.stateName,
                                selectedCounties: area.counties
                              });
                              setShowEditCoverage(area.id);
                            }}
                            className="text-gray-400 hover:text-primary"
                            aria-label="Edit coverage area"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteCoverage(area.id)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Delete coverage area"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const isExpanded = expandedCoverageAreas.has(area.id);
                          const displayLimit = 8; // Show first 8 counties
                          const countiesToShow = isExpanded ? area.counties : area.counties.slice(0, displayLimit);
                          const remainingCount = area.counties.length - displayLimit;
                          
                          return (
                            <>
                              {countiesToShow.map((county) => (
                                <span
                                  key={county}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                                >
                                  {county}
                                </span>
                              ))}
                              {!isExpanded && remainingCount > 0 && (
                                <button
                                  onClick={() => setExpandedCoverageAreas(new Set([...expandedCoverageAreas, area.id]))}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-primary hover:text-[#1d3f8f] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                  +{remainingCount} more
                                </button>
                              )}
                              {isExpanded && area.counties.length > displayLimit && (
                                <button
                                  onClick={() => {
                                    const newSet = new Set(expandedCoverageAreas);
                                    newSet.delete(area.id);
                                    setExpandedCoverageAreas(newSet);
                                  }}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-primary hover:text-[#1d3f8f] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                  Show less
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </div>

              {/* Specialties Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Specialties
                  </h2>
                  <button
                    onClick={() => {
                      setTempSpecialties([...selectedSpecialties]);
                      setShowEditSpecialties(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Specialties
                  </button>
                </div>
                <div className="p-6">
                  {selectedSpecialties.length === 0 ? (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        No Specialties Selected
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select property specialties to help banks find you for relevant work
                      </p>
                      <button
                        onClick={() => {
                          setTempSpecialties([...selectedSpecialties]);
                          setShowEditSpecialties(true);
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Add Specialties
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Designations Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Professional Designations
                  </h2>
                  <button
                    onClick={() => setShowAddDesignation(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Designation
                  </button>
                </div>
                <div className="p-6">
                
                {designations.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {designations.map((designation) => (
                      <div
                        key={designation.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {designation.code}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {designation.name}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setDesignationForm({
                                  code: designation.code,
                                  name: designation.name,
                                  description: designation.description,
                                  issuer: designation.issuer,
                                  yearObtained: designation.yearObtained
                                });
                                setShowEditDesignation(designation.id);
                              }}
                              className="text-gray-400 hover:text-primary"
                              aria-label="Edit designation"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteDesignation(designation.id)}
                              className="text-gray-400 hover:text-red-600"
                              aria-label="Delete designation"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {designation.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                          <span>{designation.issuer}</span>
                          <span>•</span>
                          <span>Obtained: {designation.yearObtained}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Professional designations demonstrate your expertise and credibility to banking partners
                    </p>
                    <button
                      onClick={() => setShowAddDesignation(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Add Designation
                    </button>
                  </div>
                )}
                </div>
              </div>
            </>
          ) : activeTab === "banks" ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Connected Banks
                </h2>
              </div>
              <div className="p-6">
              {connectedBanks.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Connected Banks Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Once you accept invitations from banks, they'll appear here. Check your Invites page to see available opportunities.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectedBanks.map((bank) => (
                    <div
                      key={bank.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors relative"
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

                        {/* Three-Dot Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenBankMenu(openBankMenu === bank.id ? null : bank.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Bank actions"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {/* Dropdown Menu */}
                          {openBankMenu === bank.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenBankMenu(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 py-1">
                                <button
                                  onClick={() => {
                                    setOpenBankMenu(null);
                                    // View profile action
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                  <span>View Profile</span>
                                </button>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                <button
                                  onClick={() => {
                                    setShowDisconnectBank(bank.id);
                                    setOpenBankMenu(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                  <span>Disconnect</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {bank.scope} • {bank.region}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Unsaved Changes</h3>
              <button onClick={() => setShowUnsavedWarning(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have unsaved changes. Do you want to save them before leaving this page?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDiscardAndContinue}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Don't Save
              </button>
              <button
                onClick={handleSaveAndContinue}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Address</h2>
              <button onClick={() => setShowAddAddress(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address *</label>
                <input 
                  type="text" 
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  placeholder="123 Main Street, Suite 200"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City *</label>
                  <input 
                    type="text" 
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    aria-label="City"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
                  <select 
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    aria-label="State"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {usStates.map(state => (
                      <option key={state.code} value={state.code}>{state.code}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">County *</label>
                  <input 
                    type="text" 
                    value={addressForm.county}
                    onChange={(e) => setAddressForm({ ...addressForm, county: e.target.value })}
                    aria-label="County"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP *</label>
                  <input 
                    type="text" 
                    value={addressForm.zip}
                    onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                    aria-label="ZIP Code"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                <select 
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                  aria-label="Address Type"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Office">Office</option>
                  <option value="HQ">HQ</option>
                  <option value="Branch">Branch</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <label htmlFor="add-set-primary" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Set as Primary
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Make this the primary business address
                  </p>
                </div>
                {/* @ts-ignore - Boolean ARIA values handled correctly by React */}
                <button
                  id="add-set-primary"
                  type="button"
                  onClick={() => setAddressForm({ ...addressForm, isPrimary: !addressForm.isPrimary })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    addressForm.isPrimary ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={!!addressForm.isPrimary}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      addressForm.isPrimary ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddAddress} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Add Address
              </button>
              <button onClick={() => setShowAddAddress(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditAddress && (() => {
        const editingAddress = addresses.find(a => a.id === showEditAddress);
        const isPrimaryAddress = editingAddress?.isPrimary || false;
        return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Address</h2>
                {isPrimaryAddress && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Primary
                  </span>
                )}
              </div>
              <button onClick={() => setShowEditAddress(null)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address *</label>
                <input 
                  type="text" 
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  aria-label="Address"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City *</label>
                  <input 
                    type="text" 
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    aria-label="City"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
                  <select 
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    aria-label="State"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {usStates.map(state => (
                      <option key={state.code} value={state.code}>{state.code}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">County *</label>
                  <input 
                    type="text" 
                    value={addressForm.county}
                    onChange={(e) => setAddressForm({ ...addressForm, county: e.target.value })}
                    aria-label="County"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP *</label>
                  <input 
                    type="text" 
                    value={addressForm.zip}
                    onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                    aria-label="ZIP Code"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                <select 
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                  aria-label="Address Type"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Office">Office</option>
                  <option value="HQ">HQ</option>
                  <option value="Branch">Branch</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                isPrimaryAddress ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'
              }`}>
                <div>
                  <label htmlFor="edit-set-primary" className={`text-sm font-medium ${
                    isPrimaryAddress ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Set as Primary
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {isPrimaryAddress ? 'At least one address must be primary' : 'Make this the primary business address'}
                  </p>
                </div>
                {/* @ts-ignore - Boolean ARIA values handled correctly by React */}
                <button
                  id="edit-set-primary"
                  type="button"
                  onClick={() => !isPrimaryAddress && setAddressForm({ ...addressForm, isPrimary: !addressForm.isPrimary })}
                  disabled={isPrimaryAddress}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    addressForm.isPrimary || isPrimaryAddress ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  } ${isPrimaryAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
                  role="switch"
                  aria-checked={!!(addressForm.isPrimary || isPrimaryAddress)}
                  aria-disabled={!!isPrimaryAddress}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      addressForm.isPrimary || isPrimaryAddress ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleEditAddress} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Save Changes
              </button>
              <button onClick={() => setShowEditAddress(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
        );
      })()}

      {/* Delete Address Modal */}
      {showDeleteAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Delete Address?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteAddress(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => handleDeleteAddress(showDeleteAddress)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

              {/* Add Coverage Area Modal */}
      {showAddCoverage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Coverage Area</h2>
              <button onClick={() => {
                setShowAddCoverage(false);
                setCountySearchTerm("");
              }} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
                <select 
                  value={coverageForm.state}
                  onChange={(e) => {
                    handleCoverageStateChange(e.target.value);
                    setCountySearchTerm("");
                  }}
                  aria-label="State"
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
                        <button onClick={() => removeCountyFromForm(county)} className="hover:text-purple-900 dark:hover:text-purple-100" aria-label={`Remove ${county}`}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddCoverage} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Add Coverage Area
              </button>
              <button onClick={() => setShowAddCoverage(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coverage Area Modal */}
      {showEditCoverage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Coverage Area - {coverageForm.stateName}</h2>
              <button onClick={() => {
                setShowEditCoverage(null);
                setCountySearchTerm("");
              }} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
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
                        <button onClick={() => removeCountyFromForm(county)} className="hover:text-purple-900 dark:hover:text-purple-100" aria-label={`Remove ${county}`}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
            <div className="flex gap-3 mt-6">
              <button onClick={handleEditCoverage} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Save Changes
              </button>
              <button onClick={() => setShowEditCoverage(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Coverage Area Modal */}
      {showDeleteCoverage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Delete Coverage Area?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this coverage area? This will notify all connected banks.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteCoverage(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => handleDeleteCoverage(showDeleteCoverage)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Specialties Modal */}
      {showEditSpecialties && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Specialties</h2>
              <button onClick={() => setShowEditSpecialties(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Current Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Specialties
                </label>
                <div className="flex flex-wrap gap-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[64px] bg-gray-50 dark:bg-gray-900">
                  {tempSpecialties.length > 0 ? (
                    tempSpecialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {specialty}
                        <button 
                          onClick={() => handleRemoveSpecialty(specialty)} 
                          className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                          aria-label={`Remove ${specialty}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 self-center">No specialties added yet</p>
                  )}
                </div>
              </div>

              {/* Add New Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Specialty
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
                    placeholder="Type and press Enter or click Add"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleAddSpecialty}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Commercial, Residential, Multi-Family, Industrial, Land
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveSpecialties} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Save Specialties
              </button>
              <button onClick={() => setShowEditSpecialties(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Designation Modal */}
      {showAddDesignation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Professional Designation</h2>
              <button onClick={() => setShowAddDesignation(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Designation Code * (e.g., MAI, SRA, CRE)
                </label>
                <input 
                  type="text" 
                  value={designationForm.code}
                  onChange={(e) => setDesignationForm({ ...designationForm, code: e.target.value })}
                  placeholder="MAI"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  value={designationForm.name}
                  onChange={(e) => setDesignationForm({ ...designationForm, name: e.target.value })}
                  placeholder="Member, Appraisal Institute"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea 
                  value={designationForm.description}
                  onChange={(e) => setDesignationForm({ ...designationForm, description: e.target.value })}
                  placeholder="Brief description of the designation"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issuing Organization
                  </label>
                  <input 
                    type="text" 
                    value={designationForm.issuer}
                    onChange={(e) => setDesignationForm({ ...designationForm, issuer: e.target.value })}
                    placeholder="Appraisal Institute"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year Obtained
                  </label>
                  <input 
                    type="text" 
                    value={designationForm.yearObtained}
                    onChange={(e) => setDesignationForm({ ...designationForm, yearObtained: e.target.value })}
                    placeholder="2015"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddDesignation} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Add Designation
              </button>
              <button onClick={() => setShowAddDesignation(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Designation Modal */}
      {showEditDesignation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Designation</h2>
              <button onClick={() => setShowEditDesignation(null)} className="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Designation Code *
                </label>
                <input 
                  type="text" 
                  value={designationForm.code}
                  onChange={(e) => setDesignationForm({ ...designationForm, code: e.target.value })}
                  aria-label="Designation Code"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  value={designationForm.name}
                  onChange={(e) => setDesignationForm({ ...designationForm, name: e.target.value })}
                  aria-label="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea 
                  value={designationForm.description}
                  onChange={(e) => setDesignationForm({ ...designationForm, description: e.target.value })}
                  rows={3}
                  aria-label="Description"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Issuing Organization
                  </label>
                  <input 
                    type="text" 
                    value={designationForm.issuer}
                    onChange={(e) => setDesignationForm({ ...designationForm, issuer: e.target.value })}
                    aria-label="Issuing Organization"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year Obtained
                  </label>
                  <input 
                    type="text" 
                    value={designationForm.yearObtained}
                    onChange={(e) => setDesignationForm({ ...designationForm, yearObtained: e.target.value })}
                    aria-label="Year Obtained"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleEditDesignation} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Save Changes
              </button>
              <button onClick={() => setShowEditDesignation(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Designation Modal */}
      {showDeleteDesignation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Delete Designation?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this professional designation?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteDesignation(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => handleDeleteDesignation(showDeleteDesignation)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disconnect Bank Confirmation Modal */}
      {showDisconnectBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Disconnect from Bank?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to disconnect from {connectedBanks.find(b => b.id === showDisconnectBank)?.bankName}? You will no longer receive work requests from this bank and they won't see your profile updates.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDisconnectBank(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => handleDisconnectBank(showDisconnectBank)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Yes, Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

