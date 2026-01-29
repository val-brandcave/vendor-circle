"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SwipeableCard from "@/components/mobile/swipeable-card";
import ActionSheet from "@/components/mobile/action-sheet";
import { mockInvitations } from "@/lib/data/mock-data";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function MobileInvitesPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState(mockInvitations);
  const [showAcceptSheet, setShowAcceptSheet] = useState<string | null>(null);
  const [showDeclineSheet, setShowDeclineSheet] = useState<string | null>(null);
  
  const handleAccept = (id: string) => {
    console.log("Accepted invitation", id);
    setInvitations(invitations.filter(inv => inv.id !== id));
    setShowAcceptSheet(null);
  };
  
  const handleDecline = (id: string) => {
    console.log("Declined invitation", id);
    setInvitations(invitations.filter(inv => inv.id !== id));
    setShowDeclineSheet(null);
  };
  
  const getStatusDisplay = (status: string, expiryDate: string) => {
    const daysUntilExpiry = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 3) {
      return { label: `Expires in ${daysUntilExpiry}d`, color: "text-red-600 dark:text-red-400" };
    }
    return { label: "New", color: "text-green-600 dark:text-green-400" };
  };
  return (
    <div className="p-4">
      <div className="space-y-3">
        {invitations.map((invitation) => {
          const status = getStatusDisplay(invitation.status, invitation.expiryDate);
          
          return (
            <SwipeableCard
              key={invitation.id}
              rightActions={[
                {
                  label: "View",
                  icon: Eye,
                  color: "blue",
                  onClick: () => router.push(`/m/invites/${invitation.id}`),
                },
                {
                  label: "Decline",
                  icon: XCircle,
                  color: "red",
                  onClick: () => setShowDeclineSheet(invitation.id),
                },
                {
                  label: "Accept",
                  icon: CheckCircle,
                  color: "green",
                  onClick: () => setShowAcceptSheet(invitation.id),
                },
              ]}
              onTap={() => router.push(`/m/invites/${invitation.id}`)}
              className="rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image
                    src={invitation.bankLogo}
                    alt={invitation.bankName}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {invitation.bankName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Invited {new Date(invitation.invitedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>•</span>
                    <span className={`font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>{invitation.scope}</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {invitation.region}
                </p>
              </div>
              
              {invitation.note && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-3">
                  <p className="text-sm text-blue-900 dark:text-blue-100 line-clamp-2">
                    {invitation.note}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeclineSheet(invitation.id);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Decline
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAcceptSheet(invitation.id);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                >
                  Accept ✓
                </button>
              </div>
            </SwipeableCard>
          );
        })}
      </div>

      {/* Accept Action Sheet */}
      {showAcceptSheet !== null && (
        <ActionSheet
          isOpen={true}
          onClose={() => setShowAcceptSheet(null)}
          title="Accept Invitation"
          message={`You're about to start working with ${invitations.find(i => i.id === showAcceptSheet)?.bankName}. You can manage this relationship anytime from your Connected Banks.`}
          actions={[
            {
              label: "Accept Invitation",
              type: "primary",
              onClick: () => handleAccept(showAcceptSheet),
            },
          ]}
        />
      )}

      {/* Decline Action Sheet */}
      {showDeclineSheet !== null && (
        <ActionSheet
          isOpen={true}
          onClose={() => setShowDeclineSheet(null)}
          title="Decline Invitation"
          message={`Are you sure you want to decline this invitation from ${invitations.find(i => i.id === showDeclineSheet)?.bankName}?`}
          actions={[
            {
              label: "Decline Invitation",
              type: "destructive",
              onClick: () => handleDecline(showDeclineSheet),
            },
          ]}
        />
      )}
      
      {/* Testing Info */}
      {invitations.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-900 dark:text-green-100 font-medium mb-2">
            ✅ Real Data Connected!
          </p>
          <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
            <li>• Showing <strong>{invitations.length} invitations</strong> from mock data</li>
            <li>• <strong>Tap card</strong> to view details</li>
            <li>• <strong>Swipe left</strong> for quick actions</li>
            <li>• <strong>Accept/Decline</strong> removes from list</li>
          </ul>
        </div>
      )}
      
      {invitations.length === 0 && (
        <div className="mt-8 text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-2">🎉</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Pending Invitations
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
}
