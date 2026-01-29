/**
 * Individual Vendor Guided Tour
 * 6-8 stops covering main features
 */

import Shepherd from "shepherd.js";
import type { Tour } from "shepherd.js";
import { defaultTourOptions, createTourButtons, markTourComplete } from "@/lib/utils/tour-utils";

export function createVendorTour(): Tour {
  const tour = new Shepherd.Tour(defaultTourOptions);

  // Step 1: Welcome
  tour.addStep({
    id: "welcome",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Welcome to Vendors Circle!</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Let's take a quick tour of the platform. You can skip this anytime by clicking "Skip Tour".</p>
    `,
    buttons: createTourButtons(false),
  });

  // Step 2: My Requests
  tour.addStep({
    id: "requests",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">My Requests</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Track all your appraisal requests here. View bids and reports, filter by bank or status.</p>
    `,
    attachTo: { element: '[href="/vendor/requests"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 3: My Invites
  tour.addStep({
    id: "invites",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">My Invites</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Banks send you invitations here. Accept or decline requests with just a click.</p>
    `,
    attachTo: { element: '[href="/vendor/invites"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 4: My Documents
  tour.addStep({
    id: "documents",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">My Documents</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Manage all your credentials: licenses, insurance, W9, and sample reports. Update once, sync everywhere.</p>
    `,
    attachTo: { element: '[href="/vendor/documents"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 5: Profile
  tour.addStep({
    id: "profile",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Your Profile</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Your professional profile with contact info, coverage areas, specialties, and connected banks.</p>
    `,
    attachTo: { element: '[href="/vendor/profile"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 6: Notifications
  tour.addStep({
    id: "notifications",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Notifications</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Stay updated with new requests, license expirations, and bank messages. Click the bell icon to view all notifications.</p>
    `,
    attachTo: { element: ".notification-bell", on: "bottom" },
    buttons: createTourButtons(false),
  });

  // Step 7: User Menu & Settings
  tour.addStep({
    id: "user-menu",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">User Menu & Settings</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Click here to access your profile, theme settings (light/dark mode), and sign out.</p>
    `,
    attachTo: { element: ".user-menu", on: "left" },
    buttons: createTourButtons(false),
  });

  // Step 8: Complete
  tour.addStep({
    id: "complete",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">You're All Set! 🎉</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">You can access this tour anytime from the help menu. Happy appraising!</p>
    `,
    buttons: createTourButtons(true, () => markTourComplete("vendor")),
  });

  return tour;
}
