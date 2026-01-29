"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Save } from "lucide-react";

export default function AddInsurancePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "",
    policyNumber: "",
    carrier: "",
    coverageAmount: "",
    expirationDate: "",
    fileName: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Adding insurance:", formData);
      setIsSaving(false);
      router.push("/vendor/documents");
    }, 1000);
  };

  const insuranceTypes = [
    "E&O Insurance",
    "General Liability",
    "Professional Liability",
    "Workers Compensation",
    "Commercial Auto",
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/vendor/documents")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documents
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Add Insurance Document
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Add insurance coverage documentation
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          {/* Insurance Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Insurance Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Type</option>
              {insuranceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Policy Number *
            </label>
            <input
              type="text"
              value={formData.policyNumber}
              onChange={(e) => handleChange("policyNumber", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="POL-123456"
            />
          </div>

          {/* Carrier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Insurance Carrier *
            </label>
            <input
              type="text"
              value={formData.carrier}
              onChange={(e) => handleChange("carrier", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="State Farm"
            />
          </div>

          {/* Coverage Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Coverage Amount *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="text"
                value={formData.coverageAmount}
                onChange={(e) => handleChange("coverageAmount", e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="1,000,000"
              />
            </div>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiration Date *
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => handleChange("expirationDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Insurance Document *
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {formData.fileName || "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PDF, JPG, or PNG (max 10MB)
              </p>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="insurance-upload"
              />
              <label
                htmlFor="insurance-upload"
                className="inline-block mt-4 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Choose File
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/vendor/documents")}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              isSaving ||
              !formData.type ||
              !formData.policyNumber ||
              !formData.carrier ||
              !formData.coverageAmount ||
              !formData.expirationDate ||
              !formData.fileName
            }
            className="flex-1 px-6 py-3 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Add Insurance"}
          </button>
        </div>
      </div>
    </div>
  );
}
