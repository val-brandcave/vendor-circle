"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Download, MessageSquare, Send, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BidDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bidData: BidData;
}

interface BidData {
  id: string;
  fileNumber: string;
  bankName: string;
  bankLogo: string;
  propertyAddress: string;
  propertyType: string;
  status: string;
  dueDate: string;
  jobManagerName: string;
  vendorName: string;
  appraisalBidRequest?: string;
  desiredDeliveryDate?: string;
  generalVendorDocs?: Document[];
  questions?: Question[];
  requiredDocuments?: Document[];
}

interface Question {
  id: string;
  author: string;
  authorRole: "vendor" | "buyer";
  timestamp: string;
  message: string;
}

interface Document {
  id: string;
  name: string;
  url: string;
  type: "pdf" | "doc" | "image";
  uploadedDate?: string;
}

export default function BidDetailsDrawer({ isOpen, onClose, bidData }: BidDetailsDrawerProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Question[]>(bidData.questions || []);
  const [formData, setFormData] = useState({
    appraised: "no",
    feeQuote: "",
    businessDaysToComplete: "",
    signatoryInfo: "",
    vendorComments: ""
  });
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of comments
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  // Handle form changes
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  // Handle adding a comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Question = {
        id: `comment-${Date.now()}`,
        author: "Tom Reynolds",
        authorRole: "vendor",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: newComment
      };
      setComments([...comments, comment]);
      setNewComment("");
      setHasUnsavedChanges(true);
    }
  };

  // Handle close - simplified (no warning)
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Drawer Container */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[30%] bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:rounded-l-lg overflow-hidden`}
      >
        {/* Header - Fixed */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Solicitation for Bid
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                File #{bidData.fileNumber}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-6">
            {/* Bank Information */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              {bidData.bankLogo && (
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={bidData.bankLogo}
                    alt={`${bidData.bankName} logo`}
                    width={32}
                    height={32}
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Bank
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {bidData.bankName}
                </p>
              </div>
            </div>

            {/* Read-Only Information Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Bid Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                {/* Appraisal Bid Request */}
                <div className="flex items-start justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Appraisal Bid Request
                  </span>
                  <a
                    href={bidData.appraisalBidRequest || "#"}
                    download
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download Letter
                  </a>
                </div>

                {/* Read-only fields in 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      File Number
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.fileNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Job Manager/Reviewer
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.jobManagerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Vendor
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.vendorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Property Type
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.propertyType}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Property Address
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.propertyAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                      Desired Delivery Date
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {bidData.desiredDeliveryDate || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* General Vendor Docs */}
            {bidData.generalVendorDocs && bidData.generalVendorDocs.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                  General Vendor Docs
                </h3>
                <div className="space-y-2">
                  {bidData.generalVendorDocs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      download
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {doc.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Questions & Comments Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Questions Prior to Bid Submission
                </h3>
              </div>

              {/* Comments History - Scrollable */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto space-y-3">
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No questions yet. Ask your first question!
                  </p>
                ) : (
                  <>
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {comment.author}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {comment.message}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={commentsEndRef} />
                  </>
                )}
              </div>

              {/* Comment Input */}
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  placeholder="Add a comment..."
                  className="flex-1"
                />
                <button
                  onClick={handleAddComment}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  aria-label="Send comment"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Vendor Response Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Vendor Response
              </h3>
              <div className="space-y-4">
                {/* Appraisal History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    I have appraised this property in the last 3 years
                  </label>
                  <select
                    value={formData.appraised}
                    onChange={(e) => handleFormChange("appraised", e.target.value)}
                    aria-label="Appraisal history in last 3 years"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* Fee Quote */}
                <div>
                  <label htmlFor="feeQuote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fee Quote <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400">
                      $
                    </span>
                    <input
                      id="feeQuote"
                      type="number"
                      value={formData.feeQuote}
                      onChange={(e) => handleFormChange("feeQuote", e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Business Days to Complete */}
                <div>
                  <label htmlFor="businessDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    # Business Days to Complete <span className="text-destructive">*</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal block mt-0.5">
                      (from date of engagement)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="businessDays"
                      type="number"
                      value={formData.businessDaysToComplete}
                      onChange={(e) => handleFormChange("businessDaysToComplete", e.target.value)}
                      placeholder="Enter number"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Signatory Information */}
                <div>
                  <label htmlFor="signatory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Signatory Information
                  </label>
                  <textarea
                    id="signatory"
                    value={formData.signatoryInfo}
                    onChange={(e) => handleFormChange("signatoryInfo", e.target.value)}
                    placeholder="Enter your name and title..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Vendor Comments */}
                <div>
                  <label htmlFor="vendorComments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vendor Bid Response Comments
                  </label>
                  <textarea
                    id="vendorComments"
                    value={formData.vendorComments}
                    onChange={(e) => handleFormChange("vendorComments", e.target.value)}
                    placeholder="Add any additional comments..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Required Documents Section */}
            {bidData.requiredDocuments && bidData.requiredDocuments.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                  Documents You May Need for the Job
                </h3>
                <div className="space-y-2">
                  <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    Download All
                  </a>
                  <div className="space-y-2">
                    {bidData.requiredDocuments.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        download
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs"
                      >
                        <span className="text-gray-400">📄</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {doc.name}
                          </p>
                          {doc.uploadedDate && (
                            <p className="text-gray-500 dark:text-gray-400">
                              {doc.uploadedDate}
                            </p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Bottom padding for scrollable area */}
            <div className="pb-4" />
          </div>
        </div>

        {/* Footer - Fixed CTA Buttons */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 space-y-3 md:space-y-0 md:flex md:gap-3">
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={handleClose}
          >
            Decline, No thanks!
          </Button>
          <Button
            variant="primary"
            className="w-full md:flex-1"
            onClick={() => {
              // Dispatch custom event for global snackbar
              const event = new CustomEvent('showSnackbar', {
                detail: {
                  message: 'Bid submitted successfully!',
                  type: 'success'
                }
              });
              window.dispatchEvent(event);
              
              setHasUnsavedChanges(false);
              
              // Close drawer after a short delay
              setTimeout(() => {
                onClose();
              }, 500);
            }}
          >
            Submit Bid
          </Button>
        </div>
      </div>
    </>
  );
}
