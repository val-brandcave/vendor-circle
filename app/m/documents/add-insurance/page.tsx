"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, Upload } from "lucide-react";
import CameraUpload from "@/components/mobile/camera-upload";

export default function AddInsurancePage() {
  const router = useRouter();
  const [step, setStep] = useState<"type" | "details">("type");
  const [selectedType, setSelectedType] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [form, setForm] = useState({
    policyNumber: "",
    expirationDate: "",
    fileName: "",
  });

  const insuranceTypes = [
    { id: "eo", label: "E&O Insurance", description: "Errors & Omissions" },
    { id: "gl", label: "General Liability", description: "General Liability Coverage" },
    { id: "auto", label: "Auto Liability", description: "Automobile Insurance" },
    { id: "msa", label: "Master Service Agreement", description: "MSA Document" },
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep("details");
  };

  const handleFileCapture = (file: File) => {
    setForm({ ...form, fileName: file.name });
    setShowCamera(false);
  };

  const handleSave = () => {
    console.log("Saving insurance", { type: selectedType, ...form });
    router.push("/m/documents");
  };

  // Step 1: Select Type
  if (step === "type") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Insurance / Agreement
          </h2>
        </div>

        <div className="p-4 space-y-2">
          {insuranceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className="w-full text-left p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <p className="font-medium text-gray-900 dark:text-white mb-1">
                {type.label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Enter Details & Upload
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {insuranceTypes.find(t => t.id === selectedType)?.label}
        </h2>
        <button
          onClick={handleSave}
          disabled={!form.fileName}
          className="text-blue-600 dark:text-blue-400 font-medium disabled:opacity-50"
        >
          Save
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Policy Number
          </label>
          <input
            type="text"
            value={form.policyNumber}
            onChange={(e) => setForm({ ...form, policyNumber: e.target.value })}
            placeholder="POL123456789"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expiration Date
          </label>
          <input
            type="date"
            value={form.expirationDate}
            onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Document *
          </label>
          {!form.fileName ? (
            <button
              onClick={() => setShowCamera(true)}
              className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-primary transition-colors"
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Take photo or upload file
              </p>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
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
              <button
                onClick={() => setShowCamera(true)}
                className="w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                Change File
              </button>
            </div>
          )}
        </div>
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
