"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, User, FileText, MapPin, Award, ChevronRight } from "lucide-react";

interface ProfileData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // License Info
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: string;
  
  // Coverage
  coverageStates: string[];
  coverageCounties: string;
  
  // Specialties
  specialties: string[];
  designations: string;
  
  // Link to user (optional)
  linkedUserId?: string;
}

const SPECIALTY_OPTIONS = [
  "Residential",
  "Commercial",
  "Multi-Family",
  "Land",
  "Industrial",
  "Agricultural",
  "Luxury Homes",
  "Condos",
  "FHA/VA",
];

export default function CreateAppraiserProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseState: "",
    licenseExpiry: "",
    coverageStates: [],
    coverageCounties: "",
    specialties: [],
    designations: "",
  });

  const totalSteps = 4;

  const updateData = (field: keyof ProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialty = (specialty: string) => {
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save profile data
    console.log("Creating appraiser profile:", profileData);
    // TODO: Save to backend/localStorage
    // Redirect back to profiles page
    router.push("/business/profiles");
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Any unsaved data will be lost.")) {
      router.push("/business/profiles");
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "License", icon: FileText },
    { number: 3, title: "Coverage", icon: MapPin },
    { number: 4, title: "Specialties", icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Create Appraiser Profile
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Cancel"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isComplete = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isComplete
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : isComplete
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isComplete
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Appraiser Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter the basic information for this appraiser profile
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => updateData("firstName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => updateData("lastName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john.smith@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 <strong>Note:</strong> This creates an appraiser profile (credentials,
                  licenses, specialties). You can link this profile to a team member user account
                  later.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: License */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Professional License
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter the primary license for this appraiser
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  License Number *
                </label>
                <input
                  type="text"
                  value={profileData.licenseNumber}
                  onChange={(e) => updateData("licenseNumber", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="CA-123456789"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State *
                  </label>
                  <select
                    value={profileData.licenseState}
                    onChange={(e) => updateData("licenseState", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="IL">Illinois</option>
                    <option value="PA">Pennsylvania</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiration Date *
                  </label>
                  <input
                    type="date"
                    value={profileData.licenseExpiry}
                    onChange={(e) => updateData("licenseExpiry", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 You can add additional licenses for other states after creating the profile.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Coverage */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Coverage Areas
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Where does this appraiser provide services?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Coverage States *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["CA", "TX", "FL", "NY", "IL", "PA"].map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        const current = profileData.coverageStates;
                        updateData(
                          "coverageStates",
                          current.includes(state)
                            ? current.filter((s) => s !== state)
                            : [...current, state]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        profileData.coverageStates.includes(state)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Counties (comma-separated)
                </label>
                <textarea
                  value={profileData.coverageCounties}
                  onChange={(e) => updateData("coverageCounties", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="San Diego County, Orange County, Riverside County"
                />
              </div>
            </div>
          )}

          {/* Step 4: Specialties */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Specialties & Designations
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  What types of properties does this appraiser specialize in?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Property Specialties *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPECIALTY_OPTIONS.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        profileData.specialties.includes(specialty)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Designations (optional)
                </label>
                <input
                  type="text"
                  value={profileData.designations}
                  onChange={(e) => updateData("designations", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., SRA, MAI, ASA"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Separate multiple designations with commas
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-800 dark:text-green-300">
                  🎉 <strong>Almost done!</strong> Click "Create Profile" to add this appraiser to
                  your team.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </div>
          <button
            onClick={handleNext}
            className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors flex items-center gap-2"
          >
            {currentStep === totalSteps ? (
              <>Create Profile</>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
