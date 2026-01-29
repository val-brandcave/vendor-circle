"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SwipeableTabs from "@/components/mobile/swipeable-tabs";
import SwipeableCard from "@/components/mobile/swipeable-card";
import ContextFab from "@/components/mobile/context-fab";
import CameraUpload from "@/components/mobile/camera-upload";
import { Edit2, Trash2, Download, Plus } from "lucide-react";

export default function MobileDocumentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"credentials" | "licenses" | "insurance">("credentials");
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  
  const handleFabClick = () => {
    if (activeTab === "licenses") {
      router.push("/m/documents/add-license");
    } else if (activeTab === "insurance") {
      router.push("/m/documents/add-insurance");
    }
  };
  
  const handleDocumentUpload = (docType: string, file: File) => {
    console.log(`Uploading ${docType}:`, file.name);
    setUploadingDoc(null);
    // Here you would upload to server
  };
  
  const showFab = activeTab === "licenses" || activeTab === "insurance";
  
  return (
    <div className="p-4">
      {/* Swipeable Tabs */}
      <SwipeableTabs
        tabs={[
          { id: "credentials", label: "Credentials" },
          { id: "licenses", label: "Licenses" },
          { id: "insurance", label: "Insurance" },
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as "credentials" | "licenses" | "insurance")}
        className="mb-4"
      />
      
      {/* Tab Content */}
      {activeTab === "credentials" && (
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">📄</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  W-9 Tax Form
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  W-9_2025.pdf
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.open('#', '_blank')}
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View
              </button>
              <button 
                onClick={() => setUploadingDoc('w9')}
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Replace
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">📄</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Resume
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tom_Resume.pdf
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.open('#', '_blank')}
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View
              </button>
              <button 
                onClick={() => setUploadingDoc('resume')}
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Camera Upload Modal */}
      {uploadingDoc && (
        <CameraUpload
          onCapture={(file) => handleDocumentUpload(uploadingDoc, file)}
          onCancel={() => setUploadingDoc(null)}
        />
      )}
      
      {activeTab === "licenses" && (
        <div className="space-y-3">
          {["Florida", "Georgia", "Alabama"].map((state, index) => (
            <SwipeableCard
              key={state}
              rightActions={[
                {
                  label: "Edit",
                  icon: Edit2,
                  color: "blue",
                  onClick: () => console.log("Edit license", state),
                },
                {
                  label: "Download",
                  icon: Download,
                  color: "gray",
                  onClick: () => console.log("Download license", state),
                },
                {
                  label: "Delete",
                  icon: Trash2,
                  color: "red",
                  onClick: () => console.log("Delete license", state),
                },
              ]}
              className="rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  {state}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                License: {state.substring(0, 2).toUpperCase()}123456789
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expires: Dec 31, 2025
              </p>
            </SwipeableCard>
          ))}
        </div>
      )}
      
      {activeTab === "insurance" && (
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">📋</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  E&O Insurance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Policy: EO-2025-001
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Expires: Dec 31, 2025
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium">
                View
              </button>
              <button className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium">
                Replace
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Testing Info */}
      <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <p className="text-sm text-purple-900 dark:text-purple-100 font-medium mb-2">
          ✅ Mobile Features Complete!
        </p>
        <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
          <li>• <strong>Swipe tabs</strong> to switch documents</li>
          <li>• <strong>Swipe cards left</strong> to reveal actions</li>
          <li>• <strong>Tap FAB (+)</strong> to add license/insurance</li>
          <li>• <strong>Camera integration</strong> in add forms</li>
        </ul>
      </div>
      
      {/* Context-Aware FAB */}
      {showFab && (
        <ContextFab
          onClick={handleFabClick}
          label={activeTab === "licenses" ? "Add License" : "Add Insurance"}
        />
      )}
    </div>
  );
}
