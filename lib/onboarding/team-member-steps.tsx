/**
 * Simplified Onboarding for Team Members
 * Skips: User type, Business info, Team setup
 * Includes: Personal info, Licenses, Coverage (pre-filled), Specialties, Review
 */

import { User, FileText, MapPin, Award, CheckCircle } from "lucide-react";
import {
  PersonalInfoStep,
  LicensesStep,
  SpecialtiesStep,
} from "./individual-steps";
import { CoverageStep, ReviewStep } from "./shared-steps";

export interface OnboardingStep {
  id: string;
  title: string;
  icon: any;
  component: React.ComponentType<any>;
}

/**
 * Build simplified onboarding steps for team members
 * @param businessName - Name of the business they're joining
 * @param businessCoverage - Business's coverage to pre-fill
 */
export function buildTeamMemberSteps(
  businessName?: string,
  businessCoverage?: any
): OnboardingStep[] {
  const steps: OnboardingStep[] = [
    // Step 1: Personal Information (Required)
    {
      id: "personal-info",
      title: "Personal Info",
      icon: User,
      component: PersonalInfoStep,
    },
    // Step 2: Licenses (Required for appraisers)
    {
      id: "licenses",
      title: "Licenses",
      icon: FileText,
      component: LicensesStep,
    },
    // Step 3: Coverage (Pre-filled with business coverage)
    {
      id: "coverage",
      title: "Coverage",
      icon: MapPin,
      component: CoverageStep,
    },
    // Step 4: Specialties
    {
      id: "specialties",
      title: "Specialties",
      icon: Award,
      component: SpecialtiesStep,
    },
    // Step 5: Review
    {
      id: "review",
      title: "Review",
      icon: CheckCircle,
      component: ReviewStep,
    },
  ];

  return steps;
}

/**
 * Get step count for team member onboarding
 */
export function getTeamMemberStepCount(): number {
  return 5; // Always 5 steps for team members
}

/**
 * Check if team member step is complete
 */
export function isTeamMemberStepComplete(stepId: string, data: Record<string, any>): boolean {
  switch (stepId) {
    case "personal-info":
      return !!(data.firstName && data.lastName && data.title);
    case "licenses":
      return true; // Optional but encouraged
    case "coverage":
      return true; // Optional, pre-filled from business
    case "specialties":
      return true; // Optional
    case "review":
      return true; // Always complete when viewing
    default:
      return false;
  }
}

/**
 * Pre-fill coverage data from business
 */
export function prefillBusinessCoverage(businessCoverage: any): any {
  return {
    selectedStates: businessCoverage?.selectedStates || [],
    selectedCounties: businessCoverage?.selectedCounties || {},
  };
}
