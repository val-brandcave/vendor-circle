// Business Entity Mock Data
// Added: January 13, 2026
// Purpose: Support Business Admin user type (requested by Ed Kruger, Jan 6)
// Key concept: Users ≠ Profiles (from Cody Miles)

export interface BusinessEntity {
  id: string;
  name: string;
  dba?: string; // Doing Business As
  ein: string; // Employer Identification Number
  founded: string; // Date
  description: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  website?: string;
  subscriptionTier: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  createdDate: string;
  totalLicenses: number;
  totalUsers: number;
  coverageStates: string[];
  connectedBanks: number;
}

export interface BusinessUser {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'appraiser' | 'staff';
  linkedProfileId?: string; // If user is an appraiser, links to their profile
  status: 'active' | 'pending_invite' | 'inactive';
  invitedDate: string;
  joinedDate?: string;
  lastLogin?: string;
}

export interface AppraiserProfile {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  linkedUserId?: string; // User account managing this profile
  title: string;
  states: string[];
  specialties: string[];
  licenseCount: number;
  coverageAreas: {
    state: string;
    counties: string[];
  }[];
  status: 'active' | 'inactive';
  createdDate: string;
  lastUpdated: string;
  // Credentials
  hasW9: boolean;
  hasResume: boolean;
  sampleReports: number; // out of 4
  insuranceCount: number;
}

// ===== BUSINESS ENTITY 1: Coastal Appraisal Group =====
// (From Business Admin User Journey - Sarah Martinez's company)

export const coastalAppraisalGroup: BusinessEntity = {
  id: 'business-001',
  name: 'Coastal Appraisal Group, LLC',
  dba: 'Coastal Appraisal Group',
  ein: '83-1234567',
  founded: '2010-03-15',
  description: 'Full-service residential and commercial appraisal firm serving Southern California. Specializing in complex valuations and fast turnarounds.',
  address: {
    line1: '2500 Pacific Coast Highway',
    line2: 'Suite 300',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
  },
  phone: '(619) 555-2000',
  email: 'info@coastalappraisals.com',
  website: 'www.coastalappraisals.com',
  subscriptionTier: 'professional',
  status: 'active',
  createdDate: '2024-11-15',
  totalLicenses: 5,
  totalUsers: 7,
  coverageStates: ['CA'],
  connectedBanks: 12,
};

// Users for Coastal Appraisal Group
export const coastalUsers: BusinessUser[] = [
  {
    id: 'user-cag-001',
    businessId: 'business-001',
    firstName: 'Sarah',
    lastName: 'Martinez',
    email: 'sarah@coastalappraisals.com',
    phone: '(619) 555-2001',
    role: 'admin', // Also an appraiser
    linkedProfileId: 'profile-cag-001',
    status: 'active',
    invitedDate: '2024-11-15',
    joinedDate: '2024-11-15',
    lastLogin: '2026-01-13',
  },
  {
    id: 'user-cag-002',
    businessId: 'business-001',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david@coastalappraisals.com',
    phone: '(619) 555-2002',
    role: 'appraiser',
    linkedProfileId: 'profile-cag-002',
    status: 'active',
    invitedDate: '2024-11-16',
    joinedDate: '2024-11-17',
    lastLogin: '2026-01-12',
  },
  {
    id: 'user-cag-003',
    businessId: 'business-001',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    email: 'maria@coastalappraisals.com',
    phone: '(619) 555-2003',
    role: 'appraiser',
    linkedProfileId: 'profile-cag-003',
    status: 'active',
    invitedDate: '2024-11-16',
    joinedDate: '2024-11-18',
    lastLogin: '2026-01-13',
  },
  {
    id: 'user-cag-004',
    businessId: 'business-001',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james@coastalappraisals.com',
    phone: '(619) 555-2004',
    role: 'appraiser',
    linkedProfileId: 'profile-cag-004',
    status: 'active',
    invitedDate: '2024-12-01',
    joinedDate: '2024-12-03',
    lastLogin: '2026-01-11',
  },
  {
    id: 'user-cag-005',
    businessId: 'business-001',
    firstName: 'Lisa',
    lastName: 'Chen',
    email: 'lisa@coastalappraisals.com',
    phone: '(619) 555-2005',
    role: 'appraiser',
    linkedProfileId: 'profile-cag-005',
    status: 'active',
    invitedDate: '2024-12-10',
    joinedDate: '2024-12-12',
    lastLogin: '2026-01-10',
  },
  {
    id: 'user-cag-006',
    businessId: 'business-001',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert@coastalappraisals.com',
    phone: '(619) 555-2006',
    role: 'staff', // Operations Manager - NOT an appraiser
    linkedProfileId: undefined,
    status: 'active',
    invitedDate: '2024-11-20',
    joinedDate: '2024-11-22',
    lastLogin: '2026-01-13',
  },
  {
    id: 'user-cag-007',
    businessId: 'business-001',
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer@coastalappraisals.com',
    phone: '(619) 555-2007',
    role: 'staff', // Admin Assistant - NOT an appraiser
    linkedProfileId: undefined,
    status: 'active',
    invitedDate: '2024-12-05',
    joinedDate: '2024-12-07',
    lastLogin: '2026-01-12',
  },
];

// Appraiser Profiles for Coastal Appraisal Group
export const coastalProfiles: AppraiserProfile[] = [
  {
    id: 'profile-cag-001',
    businessId: 'business-001',
    firstName: 'Sarah',
    lastName: 'Martinez',
    linkedUserId: 'user-cag-001',
    title: 'Owner / Chief Appraiser',
    states: ['CA'],
    specialties: ['Residential', 'Commercial', 'Multi-Family'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'CA',
        counties: ['San Diego', 'Orange', 'Riverside'],
      },
    ],
    status: 'active',
    createdDate: '2024-11-15',
    lastUpdated: '2026-01-10',
    hasW9: true,
    hasResume: true,
    sampleReports: 4,
    insuranceCount: 3,
  },
  {
    id: 'profile-cag-002',
    businessId: 'business-001',
    firstName: 'David',
    lastName: 'Kim',
    linkedUserId: 'user-cag-002',
    title: 'Senior Appraiser',
    states: ['CA'],
    specialties: ['Commercial', 'Industrial', 'Special Purpose'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'CA',
        counties: ['San Diego', 'Imperial'],
      },
    ],
    status: 'active',
    createdDate: '2024-11-17',
    lastUpdated: '2026-01-08',
    hasW9: true,
    hasResume: true,
    sampleReports: 3,
    insuranceCount: 3,
  },
  {
    id: 'profile-cag-003',
    businessId: 'business-001',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    linkedUserId: 'user-cag-003',
    title: 'Appraiser',
    states: ['CA'],
    specialties: ['Residential', 'Multi-Family'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'CA',
        counties: ['San Diego', 'Orange'],
      },
    ],
    status: 'active',
    createdDate: '2024-11-18',
    lastUpdated: '2026-01-05',
    hasW9: true,
    hasResume: true,
    sampleReports: 4,
    insuranceCount: 3,
  },
  {
    id: 'profile-cag-004',
    businessId: 'business-001',
    firstName: 'James',
    lastName: 'Wilson',
    linkedUserId: 'user-cag-004',
    title: 'Appraiser',
    states: ['CA'],
    specialties: ['Residential', 'Luxury Residential'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'CA',
        counties: ['San Diego'],
      },
    ],
    status: 'active',
    createdDate: '2024-12-03',
    lastUpdated: '2026-01-03',
    hasW9: true,
    hasResume: true,
    sampleReports: 2,
    insuranceCount: 3,
  },
  {
    id: 'profile-cag-005',
    businessId: 'business-001',
    firstName: 'Lisa',
    lastName: 'Chen',
    linkedUserId: 'user-cag-005',
    title: 'Junior Appraiser',
    states: ['CA'],
    specialties: ['Residential'],
    licenseCount: 1, // Trainee license
    coverageAreas: [
      {
        state: 'CA',
        counties: ['San Diego'],
      },
    ],
    status: 'active',
    createdDate: '2024-12-12',
    lastUpdated: '2025-12-28',
    hasW9: true,
    hasResume: true,
    sampleReports: 1,
    insuranceCount: 3,
  },
];

// ===== BUSINESS ENTITY 2: Metro Valuations Inc =====

export const metroValuations: BusinessEntity = {
  id: 'business-002',
  name: 'Metro Valuations, Inc.',
  ein: '84-7654321',
  founded: '2015-08-22',
  description: 'Chicago-based appraisal firm specializing in commercial properties and complex assignments. Licensed in multiple Midwest states.',
  address: {
    line1: '350 North Michigan Avenue',
    line2: 'Floor 12',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
  },
  phone: '(312) 555-3000',
  email: 'contact@metrovaluations.com',
  website: 'www.metrovaluations.com',
  subscriptionTier: 'enterprise',
  status: 'active',
  createdDate: '2024-10-20',
  totalLicenses: 8,
  totalUsers: 10,
  coverageStates: ['IL', 'IN', 'WI', 'MI'],
  connectedBanks: 18,
};

export const metroUsers: BusinessUser[] = [
  {
    id: 'user-metro-001',
    businessId: 'business-002',
    firstName: 'Michael',
    lastName: 'Thompson',
    email: 'michael@metrovaluations.com',
    phone: '(312) 555-3001',
    role: 'admin', // CEO, not an appraiser
    linkedProfileId: undefined,
    status: 'active',
    invitedDate: '2024-10-20',
    joinedDate: '2024-10-20',
    lastLogin: '2026-01-13',
  },
  {
    id: 'user-metro-002',
    businessId: 'business-002',
    firstName: 'Angela',
    lastName: 'Rodriguez',
    email: 'angela@metrovaluations.com',
    phone: '(312) 555-3002',
    role: 'admin', // VP Operations, also appraiser
    linkedProfileId: 'profile-metro-001',
    status: 'active',
    invitedDate: '2024-10-20',
    joinedDate: '2024-10-20',
    lastLogin: '2026-01-12',
  },
  {
    id: 'user-metro-003',
    businessId: 'business-002',
    firstName: 'Kevin',
    lastName: 'O\'Brien',
    email: 'kevin@metrovaluations.com',
    phone: '(312) 555-3003',
    role: 'appraiser',
    linkedProfileId: 'profile-metro-002',
    status: 'active',
    invitedDate: '2024-10-22',
    joinedDate: '2024-10-23',
    lastLogin: '2026-01-11',
  },
  {
    id: 'user-metro-004',
    businessId: 'business-002',
    firstName: 'Patricia',
    lastName: 'Williams',
    email: 'patricia@metrovaluations.com',
    phone: '(312) 555-3004',
    role: 'appraiser',
    linkedProfileId: 'profile-metro-003',
    status: 'active',
    invitedDate: '2024-10-25',
    joinedDate: '2024-10-26',
    lastLogin: '2026-01-10',
  },
  {
    id: 'user-metro-005',
    businessId: 'business-002',
    firstName: 'Daniel',
    lastName: 'Martinez',
    email: 'daniel@metrovaluations.com',
    role: 'appraiser',
    linkedProfileId: 'profile-metro-004',
    status: 'pending_invite',
    invitedDate: '2026-01-10',
    joinedDate: undefined,
    lastLogin: undefined,
  },
];

export const metroProfiles: AppraiserProfile[] = [
  {
    id: 'profile-metro-001',
    businessId: 'business-002',
    firstName: 'Angela',
    lastName: 'Rodriguez',
    linkedUserId: 'user-metro-002',
    title: 'VP Operations / Senior Appraiser',
    states: ['IL', 'IN', 'WI'],
    specialties: ['Commercial', 'Multi-Family', 'Hospitality'],
    licenseCount: 3,
    coverageAreas: [
      {
        state: 'IL',
        counties: ['Cook', 'DuPage', 'Lake'],
      },
      {
        state: 'IN',
        counties: ['Lake', 'Porter'],
      },
      {
        state: 'WI',
        counties: ['Kenosha', 'Racine'],
      },
    ],
    status: 'active',
    createdDate: '2024-10-20',
    lastUpdated: '2026-01-05',
    hasW9: true,
    hasResume: true,
    sampleReports: 4,
    insuranceCount: 4,
  },
  {
    id: 'profile-metro-002',
    businessId: 'business-002',
    firstName: 'Kevin',
    lastName: 'O\'Brien',
    linkedUserId: 'user-metro-003',
    title: 'Senior Appraiser',
    states: ['IL', 'WI'],
    specialties: ['Industrial', 'Office', 'Retail'],
    licenseCount: 2,
    coverageAreas: [
      {
        state: 'IL',
        counties: ['Cook', 'Will', 'Kane'],
      },
      {
        state: 'WI',
        counties: ['Milwaukee', 'Waukesha'],
      },
    ],
    status: 'active',
    createdDate: '2024-10-23',
    lastUpdated: '2026-01-02',
    hasW9: true,
    hasResume: true,
    sampleReports: 4,
    insuranceCount: 3,
  },
  {
    id: 'profile-metro-003',
    businessId: 'business-002',
    firstName: 'Patricia',
    lastName: 'Williams',
    linkedUserId: 'user-metro-004',
    title: 'Appraiser',
    states: ['IL', 'IN'],
    specialties: ['Commercial', 'Retail'],
    licenseCount: 2,
    coverageAreas: [
      {
        state: 'IL',
        counties: ['Cook'],
      },
      {
        state: 'IN',
        counties: ['Lake'],
      },
    ],
    status: 'active',
    createdDate: '2024-10-26',
    lastUpdated: '2025-12-20',
    hasW9: true,
    hasResume: false, // Incomplete profile
    sampleReports: 1,
    insuranceCount: 2,
  },
  {
    id: 'profile-metro-004',
    businessId: 'business-002',
    firstName: 'Daniel',
    lastName: 'Martinez',
    linkedUserId: undefined, // User hasn't accepted invite yet
    title: 'Junior Appraiser',
    states: ['IL'],
    specialties: ['Residential'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'IL',
        counties: ['Cook'],
      },
    ],
    status: 'inactive', // Profile created but user not onboarded
    createdDate: '2026-01-10',
    lastUpdated: '2026-01-10',
    hasW9: false,
    hasResume: false,
    sampleReports: 0,
    insuranceCount: 0,
  },
];

// ===== BUSINESS ENTITY 3: Sunshine Appraisals LLC =====
// Small 2-person shop

export const sunshineAppraisals: BusinessEntity = {
  id: 'business-003',
  name: 'Sunshine Appraisals, LLC',
  ein: '59-9876543',
  founded: '2020-06-01',
  description: 'Boutique appraisal firm serving Central Florida. Personalized service with deep local market knowledge.',
  address: {
    line1: '789 Orange Avenue',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
  },
  phone: '(407) 555-4000',
  email: 'hello@sunshineappraisals.com',
  website: 'www.sunshineappraisals.com',
  subscriptionTier: 'starter',
  status: 'active',
  createdDate: '2025-01-05',
  totalLicenses: 2,
  totalUsers: 3,
  coverageStates: ['FL'],
  connectedBanks: 5,
};

export const sunshineUsers: BusinessUser[] = [
  {
    id: 'user-sun-001',
    businessId: 'business-003',
    firstName: 'Emily',
    lastName: 'Santos',
    email: 'emily@sunshineappraisals.com',
    phone: '(407) 555-4001',
    role: 'admin', // Owner, also appraiser
    linkedProfileId: 'profile-sun-001',
    status: 'active',
    invitedDate: '2025-01-05',
    joinedDate: '2025-01-05',
    lastLogin: '2026-01-13',
  },
  {
    id: 'user-sun-002',
    businessId: 'business-003',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus@sunshineappraisals.com',
    phone: '(407) 555-4002',
    role: 'appraiser', // Partner
    linkedProfileId: 'profile-sun-002',
    status: 'active',
    invitedDate: '2025-01-06',
    joinedDate: '2025-01-07',
    lastLogin: '2026-01-12',
  },
  {
    id: 'user-sun-003',
    businessId: 'business-003',
    firstName: 'Rachel',
    lastName: 'Foster',
    email: 'rachel@sunshineappraisals.com',
    phone: '(407) 555-4003',
    role: 'staff', // Part-time admin
    linkedProfileId: undefined,
    status: 'active',
    invitedDate: '2025-02-01',
    joinedDate: '2025-02-03',
    lastLogin: '2026-01-11',
  },
];

export const sunshineProfiles: AppraiserProfile[] = [
  {
    id: 'profile-sun-001',
    businessId: 'business-003',
    firstName: 'Emily',
    lastName: 'Santos',
    linkedUserId: 'user-sun-001',
    title: 'Owner / Certified Residential Appraiser',
    states: ['FL'],
    specialties: ['Residential', 'Condo', 'Vacation Properties'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'FL',
        counties: ['Orange', 'Seminole', 'Osceola', 'Lake'],
      },
    ],
    status: 'active',
    createdDate: '2025-01-05',
    lastUpdated: '2026-01-09',
    hasW9: true,
    hasResume: true,
    sampleReports: 3,
    insuranceCount: 2,
  },
  {
    id: 'profile-sun-002',
    businessId: 'business-003',
    firstName: 'Marcus',
    lastName: 'Johnson',
    linkedUserId: 'user-sun-002',
    title: 'Certified Residential Appraiser',
    states: ['FL'],
    specialties: ['Residential', 'Luxury Residential'],
    licenseCount: 1,
    coverageAreas: [
      {
        state: 'FL',
        counties: ['Orange', 'Seminole'],
      },
    ],
    status: 'active',
    createdDate: '2025-01-07',
    lastUpdated: '2026-01-07',
    hasW9: true,
    hasResume: true,
    sampleReports: 2,
    insuranceCount: 2,
  },
];

// ===== AGGREGATE EXPORTS =====

export const allBusinessEntities: BusinessEntity[] = [
  coastalAppraisalGroup,
  metroValuations,
  sunshineAppraisals,
];

export const allBusinessUsers: BusinessUser[] = [
  ...coastalUsers,
  ...metroUsers,
  ...sunshineUsers,
];

export const allAppraiserProfiles: AppraiserProfile[] = [
  ...coastalProfiles,
  ...metroProfiles,
  ...sunshineProfiles,
];

// ===== BUSINESS TEAM LICENSES & INSURANCE (For Expiry Alerts) =====

export interface TeamMemberCredentials {
  memberId: string;
  memberName: string;
  licenses: Array<{
    id: string;
    state: string;
    stateName: string;
    licenseNumber: string;
    expirationDate: string;
    status: string;
  }>;
  insurance: Array<{
    id: string;
    type: string;
    typeName: string;
    insuranceCompany: string;
    policyNumber: string;
    expirationDate: string;
  }>;
}

// Owner (Sarah Martinez) licenses and insurance
export const ownerLicenses = [
  {
    id: 'owner-lic-001',
    state: 'CA',
    stateName: 'California',
    licenseNumber: 'CA-12345678',
    expirationDate: '2026-06-30',
    status: 'active',
  },
  {
    id: 'owner-lic-002',
    state: 'AZ',
    stateName: 'Arizona',
    licenseNumber: 'AZ-87654321',
    expirationDate: '2026-02-15', // Expires in ~18 days (warning!)
    status: 'expiring_soon',
  },
];

export const ownerInsurance = [
  {
    id: 'owner-ins-001',
    type: 'errors_omissions',
    typeName: 'Errors & Omissions',
    insuranceCompany: 'Hartford Insurance',
    policyNumber: 'EO-001234',
    expirationDate: '2026-02-14', // Expires in ~17 days (warning!)
  },
  {
    id: 'owner-ins-002',
    type: 'general_liability',
    typeName: 'General Liability',
    insuranceCompany: 'State Farm',
    policyNumber: 'GL-554321',
    expirationDate: '2026-02-20', // Expires in ~23 days (warning!)
  },
];

// Team member licenses and insurance (matching mockTeamMembers in team-members-mock.ts)
export const teamMembersCredentials: TeamMemberCredentials[] = [
  {
    memberId: 'member-001', // Links to Maria Gonzalez's profile
    memberName: 'Maria Gonzalez',
    licenses: [
      {
        id: 'maria-lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'CA-22222222',
        expirationDate: '2026-02-10', // Expires in ~13 days (warning!)
        status: 'expiring_soon',
      },
    ],
    insurance: [
      {
        id: 'maria-ins-001',
        type: 'errors_omissions',
        typeName: 'Errors & Omissions',
        insuranceCompany: 'Hartford Insurance',
        policyNumber: 'EO-001234',
        expirationDate: '2026-03-15',
      },
    ],
  },
  {
    memberId: 'member-002', // Links to David Kim's profile
    memberName: 'David Kim',
    licenses: [
      {
        id: 'david-lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'CA-11111111',
        expirationDate: '2026-02-05', // Expires in ~8 days (critical!)
        status: 'expiring_soon',
      },
    ],
    insurance: [
      {
        id: 'david-ins-001',
        type: 'general_liability',
        typeName: 'General Liability',
        insuranceCompany: 'Allstate',
        policyNumber: 'GL-001234',
        expirationDate: '2026-01-30', // Expires in 2 days (tomorrow from Jan 28)
      },
    ],
  },
  {
    memberId: 'member-003', // Links to Lisa Johnson's profile
    memberName: 'Lisa Johnson',
    licenses: [
      {
        id: 'lisa-lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'CA-33333333',
        expirationDate: '2026-02-20', // Expires in ~23 days (warning!)
        status: 'expiring_soon',
      },
    ],
    insurance: [
      {
        id: 'lisa-ins-001',
        type: 'errors_omissions',
        typeName: 'Errors & Omissions',
        insuranceCompany: 'Hartford Insurance',
        policyNumber: 'EO-002234',
        expirationDate: '2026-03-05', // Expires in ~35 days (outside 30 day window)
      },
    ],
  },
  {
    memberId: 'member-004', // Links to Robert Chen's profile
    memberName: 'Robert Chen',
    licenses: [
      {
        id: 'robert-lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'CA-44444444',
        expirationDate: '2026-02-28', // Expires in ~31 days (outside 30 day window, but very close)
        status: 'expiring_soon',
      },
    ],
    insurance: [
      {
        id: 'robert-ins-001',
        type: 'errors_omissions',
        typeName: 'Errors & Omissions',
        insuranceCompany: 'Hartford Insurance',
        policyNumber: 'EO-003234',
        expirationDate: '2027-06-15',
      },
    ],
  },
];

// ===== HELPER FUNCTIONS =====

export function getBusinessById(id: string): BusinessEntity | undefined {
  return allBusinessEntities.find((b) => b.id === id);
}

export function getUsersByBusinessId(businessId: string): BusinessUser[] {
  return allBusinessUsers.filter((u) => u.businessId === businessId);
}

export function getProfilesByBusinessId(businessId: string): AppraiserProfile[] {
  return allAppraiserProfiles.filter((p) => p.businessId === businessId);
}

export function getUserById(id: string): BusinessUser | undefined {
  return allBusinessUsers.find((u) => u.id === id);
}

export function getProfileById(id: string): AppraiserProfile | undefined {
  return allAppraiserProfiles.find((p) => p.id === id);
}

export function getBusinessMetrics(businessId: string) {
  const business = getBusinessById(businessId);
  const users = getUsersByBusinessId(businessId);
  const profiles = getProfilesByBusinessId(businessId);

  const activeUsers = users.filter((u) => u.status === 'active').length;
  const activeProfiles = profiles.filter((p) => p.status === 'active').length;
  const totalCoverageCounties = profiles.reduce(
    (acc, p) => acc + p.coverageAreas.reduce((a, c) => a + c.counties.length, 0),
    0
  );

  return {
    business,
    totalUsers: users.length,
    activeUsers,
    pendingInvites: users.filter((u) => u.status === 'pending_invite').length,
    totalProfiles: profiles.length,
    activeProfiles,
    totalLicenses: profiles.reduce((acc, p) => acc + p.licenseCount, 0),
    coverageStates: business?.coverageStates.length || 0,
    coverageCounties: totalCoverageCounties,
    profileCompleteness: calculateBusinessProfileCompleteness(profiles),
  };
}

function calculateBusinessProfileCompleteness(profiles: AppraiserProfile[]): number {
  if (profiles.length === 0) return 0;

  const totalScore = profiles.reduce((acc, p) => {
    let score = 0;
    if (p.hasW9) score += 25;
    if (p.hasResume) score += 25;
    if (p.sampleReports >= 2) score += 25;
    if (p.insuranceCount >= 2) score += 25;
    return acc + score;
  }, 0);

  return Math.round(totalScore / profiles.length);
}

// Example usage:
// const coastal = getBusinessById('business-001');
// const coastalTeam = getUsersByBusinessId('business-001');
// const coastalAppraisers = getProfilesByBusinessId('business-001');
// const metrics = getBusinessMetrics('business-001');
