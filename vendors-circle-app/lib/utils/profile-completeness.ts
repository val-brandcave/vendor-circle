/**
 * Profile Completeness Calculation Utilities
 * 
 * Calculates profile completeness percentage for different user types
 * Used for dashboard alerts and encouraging profile completion
 */

export interface ProfileCompletenessResult {
  percentage: number;
  completedSections: string[];
  incompleteSections: string[];
  color: "green" | "yellow" | "red";
}

/**
 * Calculate Individual Vendor profile completeness
 */
export function calculateVendorCompleteness(profile: any): ProfileCompletenessResult {
  const sections = [
    {
      name: "Personal Information",
      weight: 15,
      check: () => Boolean(profile.firstName && profile.lastName && profile.email),
    },
    {
      name: "Contact Information",
      weight: 10,
      check: () => Boolean(profile.phone),
    },
    {
      name: "Address",
      weight: 10,
      check: () => profile.addresses && profile.addresses.length > 0,
    },
    {
      name: "State Licenses",
      weight: 25,
      check: () => profile.licenses && profile.licenses.length > 0,
    },
    {
      name: "Coverage Areas",
      weight: 15,
      check: () => profile.coverageAreas && profile.coverageAreas.length > 0,
    },
    {
      name: "Specialties",
      weight: 10,
      check: () => profile.specialties && profile.specialties.length > 0,
    },
    {
      name: "Professional Designations",
      weight: 5,
      check: () => profile.designations && profile.designations.length > 0,
    },
    {
      name: "Banking Information",
      weight: 10,
      check: () => profile.banks && profile.banks.length > 0,
    },
  ];

  const completedSections: string[] = [];
  const incompleteSections: string[] = [];
  let totalWeight = 0;
  let completedWeight = 0;

  sections.forEach((section) => {
    totalWeight += section.weight;
    if (section.check()) {
      completedSections.push(section.name);
      completedWeight += section.weight;
    } else {
      incompleteSections.push(section.name);
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);

  return {
    percentage,
    completedSections,
    incompleteSections,
    color: percentage >= 90 ? "green" : percentage >= 70 ? "yellow" : "red",
  };
}

/**
 * Calculate Business Admin profile completeness
 */
export function calculateBusinessCompleteness(business: any): ProfileCompletenessResult {
  const sections = [
    {
      name: "Business Information",
      weight: 20,
      check: () => Boolean(business.name && business.type),
    },
    {
      name: "Contact Information",
      weight: 15,
      check: () => Boolean(business.email && business.phone),
    },
    {
      name: "Business Address",
      weight: 10,
      check: () => Boolean(business.address),
    },
    {
      name: "Team Members",
      weight: 20,
      check: () => business.teamMembers && business.teamMembers.length > 0,
    },
    {
      name: "Appraiser Profiles",
      weight: 25,
      check: () => business.appraiserProfiles && business.appraiserProfiles.length > 0,
    },
    {
      name: "Connected Banks",
      weight: 10,
      check: () => business.connectedBanks && business.connectedBanks.length > 0,
    },
  ];

  const completedSections: string[] = [];
  const incompleteSections: string[] = [];
  let totalWeight = 0;
  let completedWeight = 0;

  sections.forEach((section) => {
    totalWeight += section.weight;
    if (section.check()) {
      completedSections.push(section.name);
      completedWeight += section.weight;
    } else {
      incompleteSections.push(section.name);
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);

  return {
    percentage,
    completedSections,
    incompleteSections,
    color: percentage >= 90 ? "green" : percentage >= 70 ? "yellow" : "red",
  };
}

/**
 * Calculate Realwired Admin profile completeness
 */
export function calculateAdminCompleteness(admin: any): ProfileCompletenessResult {
  const sections = [
    {
      name: "Personal Information",
      weight: 25,
      check: () => Boolean(admin.firstName && admin.lastName && admin.email),
    },
    {
      name: "Organization Information",
      weight: 25,
      check: () => Boolean(admin.organization && admin.department),
    },
    {
      name: "Preferences",
      weight: 25,
      check: () => Boolean(admin.preferences),
    },
    {
      name: "Notification Settings",
      weight: 25,
      check: () => Boolean(admin.notificationSettings),
    },
  ];

  const completedSections: string[] = [];
  const incompleteSections: string[] = [];
  let totalWeight = 0;
  let completedWeight = 0;

  sections.forEach((section) => {
    totalWeight += section.weight;
    if (section.check()) {
      completedSections.push(section.name);
      completedWeight += section.weight;
    } else {
      incompleteSections.push(section.name);
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);

  return {
    percentage,
    completedSections,
    incompleteSections,
    color: percentage >= 90 ? "green" : percentage >= 70 ? "yellow" : "red",
  };
}
