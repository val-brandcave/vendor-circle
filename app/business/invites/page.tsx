"use client";

import { useState, useEffect } from "react";
import { mockInvitations } from "@/lib/data/mock-data";
import Snackbar from "@/components/snackbar";
import { Calendar, Building2, Mail, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { SkeletonInviteCard } from "@/components/skeleton";
import MobileBottomSheet from "@/components/mobile/bottom-sheet";
import { useAuth } from "@/hooks/useAuth";
import { BankInviteAcceptanceModal } from "@/components/bank-invite-acceptance-modal";

export default function BusinessInvitesPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [invitations, setInvitations] = useState(mockInvitations);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [declineModal, setDeclineModal] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState<string>("");
  const [acceptModal, setAcceptModal] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Load invitations based on user type
  useEffect(() => {
    if (!user) return;
    
    // Check if this is a first-time user
    const isFirstTimeUser = !user?.id?.startsWith('demo-business') && !user?.profile?.businessId;
    
    if (isFirstTimeUser) {
      setInvitations([]); // Empty for first-time users
    } else {
      setInvitations(mockInvitations); // Show data for returning users
    }
    
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user]);

  const updateInvitesCount = (newInvitations: typeof mockInvitations) => {
    window.dispatchEvent(new CustomEvent('invites-updated', { 
      detail: { count: newInvitations.length } 
    }));
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAccept = (id: string) => {
    const newInvitations = invitations.filter(i => i.id !== id);
    setInvitations(newInvitations);
    updateInvitesCount(newInvitations);
    setSnackbar({ message: "Invitation accepted! You can now start working with this bank.", type: "success" });
    setAcceptModal(null);
  };

  const handleAcceptWithData = (data: any) => {
    if (acceptModal) {
      console.log("Acceptance data:", data);
      handleAccept(acceptModal);
    }
  };

  const handleDecline = (id: string) => {
    const newInvitations = invitations.filter(i => i.id !== id);
    setInvitations(newInvitations);
    updateInvitesCount(newInvitations);
    setSnackbar({ message: "Invitation declined", type: "info" });
    setDeclineModal(null);
    setDeclineReason("");
  };

  // Calculate days until expiration
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date("2025-01-05");
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge based on invitation data
  const getStatusBadge = (invitation: any) => {
    if (invitation.status === "expiring") {
      const daysLeft = getDaysUntilExpiry(invitation.expiryDate);
      return {
        text: `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`,
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      };
    }
    return {
      text: "New",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}

      {/* Invitation Cards */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonInviteCard key={i} />
          ))}
        </div>
      ) : invitations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-16 text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Invitations Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            When banks want to work with your business, their invitations will appear here. Complete your business profile to increase visibility.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => {
            const statusBadge = getStatusBadge(invitation);
            const isExpanded = expandedCards.has(invitation.id);
            
            return (
              <div
                key={invitation.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow"
              >
                {/* Accordion Header - Always Visible */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleCard(invitation.id)}
                      className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px]"
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Logo + Name + Status */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={invitation.bankLogo}
                          alt={`${invitation.bankName} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {invitation.bankName}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.className}`}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Invited {new Date(invitation.invitedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAcceptModal(invitation.id)}
                        className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setDeclineModal(invitation.id)}
                        className="p-2 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                        title="Decline invitation"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Accordion Body - Collapsible */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 pt-4 border-t border-gray-200 dark:border-gray-700 ml-14">
                    {/* Note from Inviter */}
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Note:</span> {invitation.note || "We'd love to work with your team on appraisals in your coverage area. Please let us know if you have any questions."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Scope:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {invitation.scope}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Region:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {invitation.region}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[90px]">Contacted by:</span>
                          <span className="text-gray-700 dark:text-gray-300">{invitation.contactPerson}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[90px]">Address:</span>
                          <span className="text-gray-700 dark:text-gray-300">{invitation.bankAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Accept Confirmation Modal - Desktop */}
      {/* Replace old accept modal with new acceptance modal */}
      <BankInviteAcceptanceModal
        isOpen={!!acceptModal}
        invitation={acceptModal ? invitations.find(i => i.id === acceptModal) || null : null}
        onAccept={handleAcceptWithData}
        onCancel={() => setAcceptModal(null)}
      />

      {/* Decline Confirmation Modal - Desktop */}
      {declineModal && (
        <div className="hidden md:flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Decline Invitation?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to decline this invitation? This action cannot be undone and the bank will be notified.
            </p>
            <div className="mb-6">
              <label htmlFor="decline-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for declining (optional)
              </label>
              <textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Let the bank know why you're declining..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setDeclineModal(null);
                  setDeclineReason("");
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDecline(declineModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Decline Bottom Sheet */}
      <MobileBottomSheet
        isOpen={!!declineModal}
        onClose={() => {
          setDeclineModal(null);
          setDeclineReason("");
        }}
        title="Decline Invitation?"
        footer={
          <div className="flex gap-3">
            <button
              onClick={() => {
                setDeclineModal(null);
                setDeclineReason("");
              }}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={() => declineModal && handleDecline(declineModal)}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium min-h-[44px]"
            >
              Decline
            </button>
          </div>
        }
      >
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to decline this invitation? This action cannot be undone and the bank will be notified.
          </p>
          <div>
            <label htmlFor="mobile-decline-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for declining (optional)
            </label>
            <textarea
              id="mobile-decline-reason"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Let the bank know why you're declining..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white resize-none text-base"
            />
          </div>
        </div>
      </MobileBottomSheet>
    </div>
  );
}
