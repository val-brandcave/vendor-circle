import { User, FileText, MapPin, Award, Briefcase, Building2, Users, CheckCircle } from "lucide-react";
import {
  PersonalInfoStep,
  LicensesStep,
  SpecialtiesStep,
} from "./individual-steps";
import {
  TeamSetupStep,
} from "./business-steps";
import { UserTypeForkStep, BusinessInfoStep, CoverageStep, ReviewStep } from "./shared-steps";

export interface OnboardingStep {
  id: string;
  title: string;
  icon: any;
  component: React.ComponentType<any>;
}

/**
 * Build dynamic step array based on user's selection
 */
export function buildOnboardingSteps(data: Record<string, any>): OnboardingStep[] {
  const steps: OnboardingStep[] = [];

  // Step 0: Always show fork question first
  steps.push({
    id: "user-type",
    title: "Account Type",
    icon: Briefcase,
    component: UserTypeForkStep,
  });

  // If user hasn't selected yet, only show fork
  if (!data.userType) {
    return steps;
  }

  // Step 2: Business Info (SAME for both types)
  steps.push({
    id: "business-info",
    title: "Business Info",
    icon: Building2,
    component: BusinessInfoStep,
  });

  // Step 3: Personal Info (SAME for both types)
  steps.push({
    id: "personal-info",
    title: "Personal Info",
    icon: User,
    component: PersonalInfoStep,
  });

  // Add remaining steps based on user type
  if (data.userType === 'individual') {
    steps.push(
      {
        id: "licenses",
        title: "Licenses",
        icon: FileText,
        component: LicensesStep,
      },
      {
        id: "coverage",
        title: "Coverage",
        icon: MapPin,
        component: CoverageStep, // UNIFIED - same for both types
      },
      {
        id: "specialties",
        title: "Specialties",
        icon: Award,
        component: SpecialtiesStep,
      }
    );
  } else if (data.userType === 'business') {
    // If business owner is ALSO an appraiser, add Licenses and Specialties steps
    if (data.isAlsoAppraiser) {
      steps.push(
        {
          id: "licenses",
          title: "Your Licenses",
          icon: FileText,
          component: LicensesStep,
        },
        {
          id: "specialties",
          title: "Your Specialties",
          icon: Award,
          component: SpecialtiesStep,
        }
      );
    }
    
    steps.push(
      {
        id: "team-setup",
        title: "Team Setup",
        icon: Users,
        component: TeamSetupStep,
      },
      {
        id: "coverage",
        title: "Coverage",
        icon: MapPin,
        component: CoverageStep, // UNIFIED - same for both types
      }
    );
  }

  // Final step: Always add review
  steps.push({
    id: "review",
    title: "Review",
    icon: CheckCircle,
    component: ReviewStep,
  });

  return steps;
}

/**
 * Get step count for progress display
 */
export function getStepCount(data: Record<string, any>): number {
  return buildOnboardingSteps(data).length;
}

/**
 * Check if current step is complete (has required data)
 */
export function isStepComplete(stepId: string, data: Record<string, any>): boolean {
  switch (stepId) {
    case "user-type":
      return !!data.userType;
    case "business-info":
      // Email and phone required for ALL users (individual + business)
      // Business name only required for business type
      const hasRequiredContact = !!(data.businessEmail && data.businessPhone);
      if (data.userType === 'business') {
        return hasRequiredContact && !!data.businessName;
      }
      return hasRequiredContact;
    case "personal-info":
      return !!(data.firstName && data.lastName && data.title);
    case "licenses":
      return true; // Optional
    case "coverage":
      return true; // Optional
    case "specialties":
      return true; // Optional
    case "team-setup":
      return true; // Optional
    case "review":
      return true; // Always complete when viewing
    default:
      return false;
  }
}
