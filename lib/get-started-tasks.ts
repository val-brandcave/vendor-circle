// Get Started Task Definitions

export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  imageUrl: string; // Placeholder for now
  ctaText: string;
  ctaRoute: string;
  checkComplete: () => boolean;
  category: 'profile' | 'documents' | 'settings' | 'team';
  priority: number; // Lower = higher priority
}

/**
 * Individual Vendor Tasks
 * Shows for solo appraisers
 */
export const individualVendorTasks: Task[] = [
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add your contact information, professional title, and personal details so banks know who you are.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/complete-profile.jpg',
    ctaText: 'Complete Profile',
    ctaRoute: '/vendor/profile',
    checkComplete: () => {
      // Check if profile has name, phone, email filled
      const profile = getVendorProfile();
      return !!(profile?.firstName && profile?.lastName && profile?.phone);
    },
    category: 'profile',
    priority: 1,
  },
  {
    id: 'upload-license',
    title: 'Upload License Documents',
    description: 'Add your state licenses so banks know where you are qualified to work.',
    estimatedTime: '3 minutes',
    imageUrl: '/images/placeholders/upload-license.jpg',
    ctaText: 'Upload License',
    ctaRoute: '/vendor/documents?tab=licenses',
    checkComplete: () => {
      const documents = getVendorDocuments();
      return (documents?.licenses?.length || 0) > 0;
    },
    category: 'documents',
    priority: 2,
  },
  {
    id: 'set-coverage-areas',
    title: 'Set Coverage Areas',
    description: 'Tell us which states and counties you service so banks can match you with local work.',
    estimatedTime: '4 minutes',
    imageUrl: '/images/placeholders/coverage-areas.jpg',
    ctaText: 'Set Coverage',
    ctaRoute: '/vendor/profile?tab=coverage',
    checkComplete: () => {
      const profile = getVendorProfile();
      // Check for coverage areas, counties, or zip codes
      return (profile?.coverageAreas?.length || 0) > 0 || 
             (profile?.coverageCounties && profile.coverageCounties.length > 0) ||
             (profile?.coverageZips && profile.coverageZips.length > 0) ||
             (profile?.coverageState && profile.coverageState.length > 0);
    },
    category: 'profile',
    priority: 3,
  },
  {
    id: 'add-specialties',
    title: 'Add Your Specialties',
    description: 'Select the types of appraisals you specialize in so banks can find you for the right jobs.',
    estimatedTime: '2 minutes',
    imageUrl: '/images/placeholders/specialties.jpg',
    ctaText: 'Add Specialties',
    ctaRoute: '/vendor/profile?tab=coverage',
    checkComplete: () => {
      const profile = getVendorProfile();
      // Check specialties array has at least one item
      return Array.isArray(profile?.specialties) && profile.specialties.length > 0;
    },
    category: 'profile',
    priority: 4,
  },
  {
    id: 'upload-documents',
    title: 'Upload Required Documents',
    description: 'Add your W-9, resume, and sample reports to complete your professional profile.',
    estimatedTime: '6 minutes',
    imageUrl: '/images/placeholders/documents.jpg',
    ctaText: 'Upload Documents',
    ctaRoute: '/vendor/documents',
    checkComplete: () => {
      const documents = getVendorDocuments();
      return !!(documents?.w9 && documents?.resume);
    },
    category: 'documents',
    priority: 5,
  },
  {
    id: 'review-invites',
    title: 'Review Bank Invitations',
    description: 'Check if you have any pending bank invitations to accept and start working.',
    estimatedTime: '2 minutes',
    imageUrl: '/images/placeholders/invitations.jpg',
    ctaText: 'View Invites',
    ctaRoute: '/vendor/invites',
    checkComplete: () => {
      const invites = getVendorInvites();
      return (invites?.pending?.length || 0) === 0; // Complete when no pending invites
    },
    category: 'profile',
    priority: 6,
  },
];

/**
 * Business Admin Tasks (Owner is NOT an appraiser)
 */
export const businessManagerTasks: Task[] = [
  {
    id: 'complete-business-profile',
    title: 'Complete Business Profile',
    description: 'Add your company information, contact details, and business address.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/business-profile.jpg',
    ctaText: 'Complete Profile',
    ctaRoute: '/business/settings',
    checkComplete: () => {
      const business = getBusinessProfile();
      return !!(
        (business?.businessName || business?.name) && 
        (business?.businessEmail || business?.email) && 
        (business?.businessPhone || business?.phone)
      );
    },
    category: 'profile',
    priority: 1,
  },
  {
    id: 'create-first-appraiser',
    title: 'Create Your First Appraiser Profile',
    description: 'Add at least one appraiser to your business to start accepting work.',
    estimatedTime: '8 minutes',
    imageUrl: '/images/placeholders/appraiser-profiles.jpg',
    ctaText: 'Create Profile',
    ctaRoute: '/business/profiles/create',
    checkComplete: () => {
      const profiles = getBusinessProfiles();
      return (profiles?.length || 0) > 0;
    },
    category: 'profile',
    priority: 2,
  },
  {
    id: 'add-team-members',
    title: 'Add Team Members',
    description: 'Invite your appraisers and staff to join your business account.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/team-members.jpg',
    ctaText: 'Add Team',
    ctaRoute: '/business/team',
    checkComplete: () => {
      const team = getBusinessTeam();
      return (team?.members?.length || 0) > 1;
    },
    category: 'team',
    priority: 3,
  },
  {
    id: 'upload-business-documents',
    title: 'Upload Business Documents',
    description: 'Add business insurance, W-9, and other required documentation.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/business-docs.jpg',
    ctaText: 'Upload Documents',
    ctaRoute: '/business/documents',
    checkComplete: () => {
      const docs = getBusinessDocuments();
      return !!(docs?.insurance && docs?.w9);
    },
    category: 'documents',
    priority: 4,
  },
  {
    id: 'set-coverage-areas',
    title: 'Set Coverage Areas',
    description: 'Define where your business provides appraisal services.',
    estimatedTime: '4 minutes',
    imageUrl: '/images/placeholders/coverage-areas.jpg',
    ctaText: 'Set Coverage',
    ctaRoute: '/business/settings',
    checkComplete: () => {
      const business = getBusinessProfile();
      return !!(business?.coverageStates || business?.serviceRadius);
    },
    category: 'profile',
    priority: 5,
  },
  {
    id: 'review-invites',
    title: 'Review Bank Invitations',
    description: 'Check and accept any pending bank invitations for your business.',
    estimatedTime: '3 minutes',
    imageUrl: '/images/placeholders/invitations.jpg',
    ctaText: 'View Invites',
    ctaRoute: '/business/invites',
    checkComplete: () => {
      const invites = getBusinessInvites();
      return (invites?.pending?.length || 0) === 0;
    },
    category: 'profile',
    priority: 6,
  },
];

/**
 * Business Admin Tasks (Owner IS an appraiser)
 */
export const businessAppraiserTasks: Task[] = [
  {
    id: 'complete-your-profile',
    title: 'Complete YOUR Appraiser Profile',
    description: 'Finish setting up your personal appraiser profile with all credentials.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/complete-profile.jpg',
    ctaText: 'Complete Profile',
    ctaRoute: '/business/my-profile',
    checkComplete: () => {
      const business = getBusinessProfile();
      // Check if owner profile is complete
      return !!(business?.ownerFirstName && business?.ownerLastName && business?.ownerPhone);
    },
    category: 'profile',
    priority: 1,
  },
  {
    id: 'upload-your-license',
    title: 'Upload YOUR License',
    description: 'Add your state license documents to your appraiser profile.',
    estimatedTime: '3 minutes',
    imageUrl: '/images/placeholders/upload-license.jpg',
    ctaText: 'Upload License',
    ctaRoute: '/business/my-profile?tab=licenses',
    checkComplete: () => {
      const business = getBusinessProfile();
      return (business?.ownerLicenses?.length || 0) > 0;
    },
    category: 'documents',
    priority: 2,
  },
  {
    id: 'add-team-members',
    title: 'Add Team Members',
    description: 'Invite your appraisers and staff to join your business account.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/team-members.jpg',
    ctaText: 'Add Team',
    ctaRoute: '/business/team',
    checkComplete: () => {
      const team = getBusinessTeam();
      return (team?.members?.length || 0) > 1;
    },
    category: 'team',
    priority: 3,
  },
  {
    id: 'create-team-profiles',
    title: 'Create Team Appraiser Profiles',
    description: 'Set up professional profiles for your team members with their licenses.',
    estimatedTime: '10 minutes',
    imageUrl: '/images/placeholders/appraiser-profiles.jpg',
    ctaText: 'Create Profiles',
    ctaRoute: '/business/profiles',
    checkComplete: () => {
      const profiles = getBusinessProfiles();
      return (profiles?.length || 0) > 0;
    },
    category: 'profile',
    priority: 4,
  },
  {
    id: 'upload-business-documents',
    title: 'Upload Business Documents',
    description: 'Add business insurance, W-9, and other required documentation.',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/business-docs.jpg',
    ctaText: 'Upload Documents',
    ctaRoute: '/business/documents',
    checkComplete: () => {
      const docs = getBusinessDocuments();
      return !!(docs?.insurance && docs?.w9);
    },
    category: 'documents',
    priority: 5,
  },
  {
    id: 'review-invites',
    title: 'Review Bank Invitations',
    description: 'Check and accept any pending bank invitations for your business.',
    estimatedTime: '3 minutes',
    imageUrl: '/images/placeholders/invitations.jpg',
    ctaText: 'View Invites',
    ctaRoute: '/business/invites',
    checkComplete: () => {
      const invites = getBusinessInvites();
      return (invites?.pending?.length || 0) === 0;
    },
    category: 'profile',
    priority: 6,
  },
];

// Keep original for backward compatibility
export const businessTasks = businessManagerTasks;

/**
 * Get current user's task list based on account type and owner status
 */
export function getUserTasks(userType: 'individual' | 'business', ownerIsAppraiser?: boolean): Task[] {
  if (userType === 'business') {
    // For business users, check if owner is also an appraiser
    return ownerIsAppraiser ? businessAppraiserTasks : businessManagerTasks;
  }
  return individualVendorTasks;
}

/**
 * Calculate completion progress
 */
export function calculateProgress(tasks: Task[]): {
  completed: number;
  total: number;
  percentage: number;
  nextTask: Task | null;
  remainingTasks: Task[];
} {
  const completed = tasks.filter(t => t.checkComplete()).length;
  const total = tasks.length;
  const percentage = Math.round((completed / total) * 100);
  
  const incompleteTasks = tasks.filter(t => !t.checkComplete()).sort((a, b) => a.priority - b.priority);
  const nextTask = incompleteTasks[0] || null;
  const remainingTasks = incompleteTasks.slice(1);

  return {
    completed,
    total,
    percentage,
    nextTask,
    remainingTasks,
  };
}

// Helper functions to check real data sources
function getVendorProfile(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    // Check currentUser for basic profile info
    const user = localStorage.getItem('currentUser');
    if (!user) return null;
    
    // Also check vendorProfile for additional details
    const vendorProfile = localStorage.getItem('vendorProfile');
    if (vendorProfile) {
      const profile = JSON.parse(vendorProfile);
      return { ...JSON.parse(user), ...profile };
    }
    
    return JSON.parse(user);
  } catch {
    return null;
  }
}

function getVendorDocuments(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    // Check for uploaded documents
    const docs = localStorage.getItem('vendorDocuments');
    if (!docs) return null;
    return JSON.parse(docs);
  } catch {
    return null;
  }
}

function getVendorInvites(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    // Check for pending invites
    const invites = localStorage.getItem('vendorInvites');
    if (!invites) return { pending: [], accepted: [] };
    return JSON.parse(invites);
  } catch {
    return { pending: [], accepted: [] };
  }
}

function getBusinessProfile(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    const profile = localStorage.getItem('businessProfile');
    if (!profile) return null;
    return JSON.parse(profile);
  } catch {
    return null;
  }
}

function getBusinessTeam(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    const team = localStorage.getItem('businessTeam');
    if (!team) return { members: [] };
    return JSON.parse(team);
  } catch {
    return { members: [] };
  }
}

function getBusinessProfiles(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    const profiles = localStorage.getItem('appraiserProfiles');
    if (!profiles) return [];
    return JSON.parse(profiles);
  } catch {
    return [];
  }
}

function getBusinessDocuments(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    const docs = localStorage.getItem('businessDocuments');
    if (!docs) return null;
    return JSON.parse(docs);
  } catch {
    return null;
  }
}

function getBusinessInvites(): any {
  if (typeof window === 'undefined') return null;
  
  try {
    const invites = localStorage.getItem('businessInvites');
    if (!invites) return { pending: [], accepted: [] };
    return JSON.parse(invites);
  } catch {
    return { pending: [], accepted: [] };
  }
}
