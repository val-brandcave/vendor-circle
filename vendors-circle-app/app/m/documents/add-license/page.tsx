"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Calendar, Upload } from "lucide-react";
import CameraUpload from "@/components/mobile/camera-upload";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export default function AddLicensePage() {
  const router = useRouter();
  const [step, setStep] = useState<"state" | "details" | "upload">("state");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [form, setForm] = useState({
    licenseNumber: "",
    expirationDate: "",
    fileName: "",
  });

  const filteredStates = US_STATES.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setStep("details");
  };

  const handleContinue = () => {
    if (step === "details") {
      setStep("upload");
    }
  };

  const handleFileCapture = (file: File) => {
    setForm({ ...form, fileName: file.name });
    setShowCamera(false);
  };

  const handleSave = () => {
    console.log("Saving license", { state: selectedState, ...form });
    router.push("/m/documents");
  };

  // Step 1: Select State
  if (step === "state") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Add State License
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="p-4 space-y-2">
          {filteredStates.map((state) => (
            <button
              key={state}
              onClick={() => handleStateSelect(state)}
              className="w-full text-left px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-gray-900 dark:text-white font-medium">
                {state}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Enter Details
  if (step === "details") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {selectedState} License
          </h2>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              License Number *
            </label>
            <input
              type="text"
              value={form.licenseNumber}
              onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
              placeholder="FL123456789"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiration Date *
            </label>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="date"
                value={form.expirationDate}
                onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!form.licenseNumber || !form.expirationDate}
            className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Upload File
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Upload License
        </h2>
      </div>

      <div className="p-4">
        {!showCamera && !form.fileName && (
          <button
            onClick={() => setShowCamera(true)}
            className="w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-primary transition-colors"
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
              Upload License File
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Take a photo or choose from library
            </p>
          </button>
        )}

        {form.fileName && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {form.fileName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ready to upload
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => setShowCamera(true)}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                Change File
              </button>
              <button
                onClick={handleSave}
                className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                Save License
              </button>
            </div>
          </>
        )}
      </div>

      {showCamera && (
        <CameraUpload
          onCapture={handleFileCapture}
          onCancel={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
