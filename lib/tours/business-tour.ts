/**
 * Business Admin Guided Tour
 * 8-10 stops covering business management features
 */

import Shepherd from "shepherd.js";
import type { Tour } from "shepherd.js";
import { defaultTourOptions, createTourButtons, markTourComplete } from "@/lib/utils/tour-utils";

export function createBusinessTour(): Tour {
  const tour = new Shepherd.Tour(defaultTourOptions);

  // Step 1: Welcome
  tour.addStep({
    id: "welcome",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Welcome to Business Admin!</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Let's explore how to manage your appraisal business team and profiles.</p>
    `,
    buttons: createTourButtons(false),
  });

  // Step 2: Dashboard
  tour.addStep({
    id: "dashboard",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Business Dashboard</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Your overview: team metrics, profile completeness, recent activity, and quick actions.</p>
    `,
    attachTo: { element: '[href="/business"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 3: Team Management
  tour.addStep({
    id: "team",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Team Management</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Manage your team members, invite new users, assign roles, and link them to appraiser profiles.</p>
    `,
    attachTo: { element: '[href="/business/team"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 4: Appraiser Profiles
  tour.addStep({
    id: "profiles",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Appraiser Profiles</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Create and manage appraiser profiles with licenses, coverage areas, and specialties. Remember: Users ≠ Profiles!</p>
    `,
    attachTo: { element: '[href="/business/profiles"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 5: Business Settings
  tour.addStep({
    id: "settings",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Business Settings</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Update business information, contact details, and manage your subscription.</p>
    `,
    attachTo: { element: '[href="/business/settings"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 6: Messages
  tour.addStep({
    id: "messages",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">Team Messages</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Communicate with your team members. Send messages, share updates, and collaborate internally.</p>
    `,
    attachTo: { element: '[href="/business/messages"]', on: "right" },
    buttons: createTourButtons(false),
  });

  // Step 7: Complete
  tour.addStep({
    id: "complete",
    title: "Guided Tour",
    text: `
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 18px; font-weight: 600;">You're Ready! 🎉</h3>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Start managing your team and appraiser profiles. You can replay this tour anytime from the help menu.</p>
    `,
    buttons: createTourButtons(true, () => markTourComplete("business")),
  });

  return tour;
}
