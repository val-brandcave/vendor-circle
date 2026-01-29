/**
 * useTour Hook
 * Manages guided tour state and triggering
 * 
 * DISABLED: Tours have been disabled in favor of Get Started modals
 */

import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { TourType } from "@/lib/utils/tour-utils";

// Re-export TourType for convenience
export type { TourType } from "@/lib/utils/tour-utils";

export function useTour(tourType: TourType, autoStart: boolean = false) {
  const { user } = useAuth();

  useEffect(() => {
    // DISABLED: Tours are disabled in favor of Get Started modals
    // All tour functionality has been turned off
    return;
  }, [user, tourType, autoStart]);

  return { startTour: () => {} }; // No-op function
}

export function startTour(tourType: TourType) {
  // DISABLED: Tours are disabled in favor of Get Started modals
  return;
}
