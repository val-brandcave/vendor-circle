"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ActionSheet from "@/components/mobile/action-sheet";
import { mockInvitations } from "@/lib/data/mock-data";
import { Building2, MapPin, User, Mail, Calendar } from "lucide-react";

export default function InvitationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [showAcceptSheet, setShowAcceptSheet] = useState(false);
  const [showDeclineSheet, setShowDeclineSheet] = useState(false);

  // Unwrap params Promise
  const { id } = use(params);

  // Find invitation by ID
  const invitation = mockInvitations.find(inv => inv.id === id);
  
  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Invitation Not Found
          </p>
          <button
            onClick={() => router.back()}
            className="text-primary dark:text-blue-400"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const daysUntilExpiry = Math.ceil((new Date(invitation.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const handleAccept = () => {
    console.log("Accepted invitation", id);
    router.push("/m/invites");
  };

  const handleDecline = () => {
    console.log("Declined invitation", id);
    router.push("/m/invites");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Bank Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 shadow-sm p-2">
            <Image
              src={invitation.bankLogo}
              alt={invitation.bankName}
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {invitation.bankName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Invited {new Date(invitation.invitedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            invitation.status === "new" 
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
          }`}>
            {invitation.status === "new" ? "New" : "Expiring"}
          </span>
        </div>

        {/* Expires Badge */}
        {daysUntilExpiry <= 7 && (
          <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>Expires in {daysUntilExpiry} {daysUntilExpiry === 1 ? 'day' : 'days'}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Message from Bank */}
        {invitation.note && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Message from {invitation.bankName}
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {invitation.note}
            </p>
          </div>
        )}

        {/* Invitation Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Invitation Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Scope</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {invitation.scope}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Region</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {invitation.region}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Contact Person</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {invitation.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bank Address</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {invitation.bankAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Info */}
        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <p className="text-sm text-purple-900 dark:text-purple-100 font-medium mb-2">
            ✅ Detail Page Working!
          </p>
          <p className="text-xs text-purple-700 dark:text-purple-300">
            Viewing invitation #{id}. Real data from mock-data.ts. Use back button to return.
          </p>
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={() => setShowDeclineSheet(true)}
            className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => setShowAcceptSheet(true)}
            className="flex-1 py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Accept ✓
          </button>
        </div>
      </div>

      {/* Accept Action Sheet */}
      <ActionSheet
        isOpen={showAcceptSheet}
        onClose={() => setShowAcceptSheet(false)}
        title="Accept Invitation"
        message={`You're about to start working with ${invitation.bankName}. You can manage this relationship anytime from your Connected Banks.`}
        actions={[
          {
            label: "Accept",
            type: "primary",
            onClick: handleAccept,
          },
        ]}
      />

      {/* Decline Action Sheet */}
      <ActionSheet
        isOpen={showDeclineSheet}
        onClose={() => setShowDeclineSheet(false)}
        title="Decline Invitation"
        message={`Are you sure you want to decline this invitation from ${invitation.bankName}?`}
        actions={[
          {
            label: "Decline Invitation",
            type: "destructive",
            onClick: handleDecline,
          },
        ]}
      />
    </div>
  );
}
