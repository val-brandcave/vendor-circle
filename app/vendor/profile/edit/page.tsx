"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";

export default function EditVendorProfilePage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "Tom",
    lastName: "Reynolds",
    email: "tom@demo.com",
    phone: "(813) 555-1234",
    title: "Certified Residential Appraiser",
    yearsExperience: "15",
    bio: "Experienced residential appraiser specializing in luxury homes and waterfront properties.",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      console.log("Saving profile:", formData);
      setIsSaving(false);
      router.push("/vendor/profile");
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your personal and professional information
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            isLoading={isSaving}
            size="md"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl space-y-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="First Name" required>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </FormField>
            <FormField label="Last Name" required>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <FormField label="Email" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </FormField>
            <FormField label="Phone">
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Professional Information
          </h2>
          <div className="space-y-4">
            <FormField label="Professional Title">
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </FormField>
            <FormField label="Years of Experience">
              <Input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => handleChange("yearsExperience", e.target.value)}
              />
            </FormField>
            <FormField label="Professional Bio">
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell banks about your experience and expertise..."
              />
            </FormField>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            isLoading={isSaving}
            size="lg"
            className="flex-1"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
