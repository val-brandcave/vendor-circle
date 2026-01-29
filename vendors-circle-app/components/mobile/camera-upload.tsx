"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, Check } from "lucide-react";
import ActionSheet from "./action-sheet";

interface CameraUploadProps {
  onCapture: (file: File) => void;
  onCancel?: () => void;
  allowGallery?: boolean;
  className?: string;
}

export default function CameraUpload({
  onCapture,
  onCancel,
  allowGallery = true,
  className = "",
}: CameraUploadProps) {
  const [showOptions, setShowOptions] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setShowOptions(false);
    }
  };

  const handleConfirm = () => {
    if (cameraInputRef.current?.files?.[0]) {
      onCapture(cameraInputRef.current.files[0]);
    } else if (fileInputRef.current?.files?.[0]) {
      onCapture(fileInputRef.current.files[0]);
    }
  };

  const handleRetake = () => {
    setPreview(null);
    setShowOptions(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className={className}>
      {/* Upload Options Action Sheet */}
      {showOptions && !preview && (
        <ActionSheet
          isOpen={true}
          onClose={() => onCancel?.()}
          title="Upload Document"
          message="Choose how you'd like to add this document"
          actions={[
            {
              label: "📷 Take Photo",
              type: "primary" as const,
              onClick: () => {
                setShowOptions(false);
                setTimeout(() => cameraInputRef.current?.click(), 100);
              },
            },
            ...(allowGallery ? [{
              label: "📁 Choose from Library",
              type: "default" as const,
              onClick: () => {
                setShowOptions(false);
                setTimeout(() => fileInputRef.current?.click(), 100);
              },
            }] : []),
          ]}
          showCancel={true}
        />
      )}

      {/* Preview */}
      {preview && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Preview Header */}
          <div className="bg-black/80 p-4 flex items-center justify-between">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 text-white"
            >
              <X className="w-5 h-5" />
              <span>Retake</span>
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Check className="w-5 h-5" />
              <span>Use Photo</span>
            </button>
          </div>

          {/* Image Preview */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
