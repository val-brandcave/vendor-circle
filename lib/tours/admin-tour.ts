/**
 * Realwired Admin Guided Tour
 * 5-7 stops covering vendor management features
 */

import Shepherd from "shepherd.js";
import type { Tour } from "shepherd.js";
import { defaultTourOptions, createTourButtons, markTourComplete } from "@/lib/utils/tour-utils";

export function createAdminTour(): Tour {
  const tour = new Shepherd.Tour(defaultTourOptions);

  // Step 1: Welcome
  tour.addStep({
    id: "welcome",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Welcome to Realwired Admin!</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Let's explore how to manage your vendor network.</p>
    `,
    buttons: createTourButtons(false),
  });

  // Step 2: Vendors List
  tour.addStep({
    id: "vendors",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Vendors List</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">View all your vendors, search by name or coverage area, and filter by status or specialties.</p>
    `,
    attachTo: { element: '[href="/admin/vendors-list"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 3: Specialties
  tour.addStep({
    id: "specialties",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Specialties Management</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Manage property type specialties that vendors can select for their profiles.</p>
    `,
    attachTo: { element: '[href="/admin/specialties"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 4: Vendor Scorecards
  tour.addStep({
    id: "scorecards",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Vendor Scorecards</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Rate vendors across 5 categories: quality, timeliness, communication, professionalism, and compliance. Track performance over time.</p>
    `,
    attachTo: { element: '[href="/admin/scorecards"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 5: Vendor Detail
  tour.addStep({
    id: "vendor-detail",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Vendor Details</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Click any vendor to view their complete profile: licenses, coverage areas, and compliance status.</p>
    `,
    buttons: createTourButtons(false),
  });

  // Step 6: Complete
  tour.addStep({
    id: "complete",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">All Set! 🎉</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">You're ready to manage your vendor network. Access this tour anytime from the help menu.</p>
    `,
    buttons: createTourButtons(true, () => markTourComplete("admin")),
  });

  return tour;
}
