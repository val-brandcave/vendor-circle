"use client";

import { User, Mail, Phone, MapPin, Target, Award, Building2, Lock } from "lucide-react";
import Image from "next/image";
import SettingsRow from "@/components/mobile/settings-row";
import SectionHeader from "@/components/mobile/section-header";

export default function MobileProfilePage() {
  return (
    <div className="pb-4">
      {/* Avatar Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-3 shadow-lg border-4 border-white dark:border-gray-600">
            <Image
              src="/avatars/Vendor-Tom-Reynolds.png"
              alt="Tom Reynolds"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tom Reynolds
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            tom@reynoldsappraisals.com
          </p>
        </div>
      </div>
      
      {/* Settings List */}
      <div className="mt-6">
        {/* Personal Information Section */}
        <SectionHeader title="Personal Information" />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="Name"
            value="Tom Reynolds"
            icon={User}
            href="/m/profile/personal"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="Title"
            value="Senior Appraiser"
            icon={Building2}
            href="/m/profile/personal"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="Company"
            value="Reynolds Appraisals"
            icon={Building2}
            href="/m/profile/personal"
          />
        </div>
        
        {/* Contact Information Section */}
        <SectionHeader title="Contact Information" className="mt-6" />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="Primary Email"
            value="tom@reynoldsappraisals.com"
            icon={Mail}
            href="/m/profile/contact"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="Phone Numbers"
            value="Work, Cell, Fax"
            icon={Phone}
            href="/m/profile/contact"
          />
        </div>
        
        {/* Addresses Section */}
        <SectionHeader 
          title="Addresses" 
          action={{ label: "+ Add", onClick: () => console.log("Add address") }}
          className="mt-6"
        />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="🏠 Primary"
            value="123 Main St, Tampa, FL"
            href="/m/profile/addresses"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="🏢 Office"
            value="456 Oak Ave, Tampa, FL"
            href="/m/profile/addresses"
          />
        </div>
        
        {/* Professional Section */}
        <SectionHeader title="Professional" className="mt-6" />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="Coverage Areas"
            value="FL, GA, AL, SC • 23 counties"
            icon={Target}
            href="/m/profile/coverage"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="Specialties"
            value="Commercial, Residential +2"
            icon={Award}
            href="/m/profile/specialties"
            className="border-b border-gray-200 dark:border-gray-700"
          />
          <SettingsRow
            label="Designations"
            value="MAI, SRA"
            icon={Award}
            href="/m/profile/designations"
          />
        </div>
        
        {/* Connections Section */}
        <SectionHeader title="Connections" className="mt-6" />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="Connected Banks"
            value="8 banks"
            icon={Building2}
            href="/m/profile/banks"
          />
        </div>

        {/* Security Section */}
        <SectionHeader title="Security" className="mt-6" />
        
        <div className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <SettingsRow
            label="Change Password"
            icon={Lock}
            onClick={() => console.log("Change password")}
          />
        </div>
      </div>
      
      {/* Testing Info */}
      <div className="mx-4 mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-900 dark:text-amber-100 font-medium mb-2">
          ✅ Mobile Profile Route Working!
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-300">
          iOS Settings-style sectioned list with drill-down navigation (sub-pages coming next).
        </p>
      </div>
    </div>
  );
}
