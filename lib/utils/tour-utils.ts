/**
 * Guided Tour Utilities
 * Using Shepherd.js for interactive product tours
 */

import "shepherd.js/dist/css/shepherd.css";

// Shepherd.js types are complex - using simplified types for configuration
/* eslint-disable @typescript-eslint/no-explicit-any */

export type TourType = "vendor" | "business" | "admin";

/**
 * Check if user has completed a tour
 */
export function hasCompletedTour(tourType: TourType): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`tour-completed-${tourType}`) === "true";
}

/**
 * Mark tour as completed
 */
export function markTourComplete(tourType: TourType): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`tour-completed-${tourType}`, "true");
}

/**
 * Reset tour (for testing or re-showing)
 */
export function resetTour(tourType: TourType): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`tour-completed-${tourType}`);
}

/**
 * Common tour options
 */
export const defaultTourOptions: any = {
  useModalOverlay: true,
  defaultStepOptions: {
    classes: "shepherd-theme-custom",
    scrollTo: { behavior: "smooth", block: "center" },
    cancelIcon: {
      enabled: true,
    },
  },
  tourName: "Guided Tour",
};

/**
 * Create a tour button set
 */
export function createTourButtons(
  isLast: boolean,
  onComplete?: () => void
): any[] {
  const buttons: any[] = [];

  // Skip button (all steps except last)
  if (!isLast) {
    buttons.push({
      text: "Skip Tour",
      action: function(this: any) {
        this.complete();
      },
      secondary: true,
    });
  }

  // Back button (all steps except first)
  buttons.push({
    text: "Back",
    action: function(this: any) {
      this.back();
    },
    secondary: true,
  });

  // Next/Complete button
  buttons.push({
    text: isLast ? "Finish" : "Next",
    action: function(this: any) {
      if (isLast && onComplete) {
        onComplete();
      }
      this.next();
    },
  });

  return buttons;
}
