/**
 * Mock Team Members Data
 * Includes members with complete and incomplete profiles
 */

export interface TeamMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'appraiser' | 'staff';
  type: 'appraiser' | 'staff'; // What kind of work they do
  status: 'active' | 'inactive' | 'pending_invite';
  joinedDate: string;
  lastLogin: string;
  title?: string;
  
  // Profile completeness
  hasLicenses: boolean;
  hasCoverage: boolean;
  hasDocuments: boolean;
  profileCompleteness: number;
  
  // For appraisers
  licenses?: Array<{
    id: string;
    state: string;
    stateName: string;
    licenseNumber: string;
    expirationDate: string;
    status: 'active' | 'expiring_soon' | 'expired';
    fileName?: string;
  }>;
  
  coverageAreas?: Array<{
    id: string;
    state: string;
    stateName: string;
    counties: string[];
  }>;
  
  specialties?: string[];
  subSpecialties?: string[];
  designations?: string[];
  
  // Documents
  documents?: {
    w9?: { fileName: string; uploadDate: string };
    eo_insurance?: { fileName: string; expirationDate: string; uploadDate: string };
    resume?: { fileName: string; uploadDate: string };
  };
  
  // Performance metrics
  performance?: {
    completedOrders: number;
    avgTurnaround: number;
    completionRate: number;
    rating: number;
  };
  
  // Connected banks
  connectedBanks?: Array<{
    id: string;
    bankName: string;
    connectedDate: string;
  }>;
}

export const mockTeamMembers: TeamMember[] = [
  // Sarah Martinez - Business Owner/Admin (FIRST MEMBER)
  {
    id: 'member-000',
    userId: 'user-cag-001',
    firstName: 'Sarah',
    lastName: 'Martinez',
    email: 'sarah@coastalappraisals.com',
    phone: '(619) 555-2001',
    role: 'admin',
    type: 'appraiser',
    status: 'active',
    title: 'Owner / Chief Appraiser',
    joinedDate: '2024-11-15',
    lastLogin: '2026-01-13',
    hasLicenses: true,
    hasCoverage: true,
    hasDocuments: true,
    profileCompleteness: 100,
    licenses: [
      {
        id: 'lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'AG234567',
        expirationDate: '2027-12-31',
        status: 'active',
        fileName: 'CA-License-Martinez.pdf'
      }
    ],
    coverageAreas: [
      {
        id: 'cov-001',
        state: 'CA',
        stateName: 'California',
        counties: ['San Diego', 'Orange', 'Los Angeles']
      }
    ],
    specialties: ['Residential', 'Commercial'],
    subSpecialties: ['Single Family', 'Multi-Family', 'Commercial'],
    designations: ['MAI', 'SRA'],
    documents: {
      w9: { fileName: 'W9-Sarah-Martinez.pdf', uploadDate: '2024-11-15' },
      eo_insurance: { fileName: 'EO-Insurance-2027.pdf', expirationDate: '2027-12-31', uploadDate: '2025-11-20' },
      resume: { fileName: 'Resume-Sarah-Martinez.pdf', uploadDate: '2024-11-15' }
    },
    performance: {
      completedOrders: 152,
      avgTurnaround: 2.8,
      completionRate: 98,
      rating: 4.9
    },
    connectedBanks: [
      { id: 'bank-001', bankName: 'Chase Bank', connectedDate: '2024-11-20' },
      { id: 'bank-002', bankName: 'Wells Fargo', connectedDate: '2024-12-10' },
      { id: 'bank-003', bankName: 'Bank of America', connectedDate: '2025-01-05' }
    ]
  },
  
  // Complete appraiser profile
  {
    id: 'member-001',
    userId: 'user-001',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    email: 'maria.gonzalez@coastal.com',
    phone: '(619) 555-1234',
    role: 'appraiser',
    type: 'appraiser',
    status: 'active',
    title: 'Senior Appraiser',
    joinedDate: '2024-06-15',
    lastLogin: '2026-01-21',
    hasLicenses: true,
    hasCoverage: true,
    hasDocuments: true,
    profileCompleteness: 95,
    licenses: [
      {
        id: 'lic-001',
        state: 'CA',
        stateName: 'California',
        licenseNumber: 'AG023456',
        expirationDate: '2026-12-31',
        status: 'active',
        fileName: 'CA-License-Gonzalez.pdf'
      },
      {
        id: 'lic-002',
        state: 'AZ',
        stateName: 'Arizona',
        licenseNumber: 'AZ987654',
        expirationDate: '2026-08-15',
        status: 'active',
        fileName: 'AZ-License-Gonzalez.pdf'
      }
    ],
    coverageAreas: [
      {
        id: 'cov-001',
        state: 'CA',
        stateName: 'California',
        counties: ['San Diego', 'Orange', 'Riverside', 'Imperial']
      }
    ],
    specialties: ['Residential', 'Multi-Family'],
    subSpecialties: ['Single Family', 'Condominiums', 'Townhomes', 'Apartments (2-4 units)'],
    designations: ['SRA', 'AI-RRS'],
    documents: {
      w9: { fileName: 'W9-Maria-Gonzalez.pdf', uploadDate: '2024-06-15' },
      eo_insurance: { fileName: 'EO-Insurance-2026.pdf', expirationDate: '2026-12-31', uploadDate: '2025-11-20' },
      resume: { fileName: 'Resume-Maria-Gonzalez.pdf', uploadDate: '2024-06-15' }
    },
    performance: {
      completedOrders: 47,
      avgTurnaround: 3.2,
      completionRate: 96,
      rating: 4.8
    },
    connectedBanks: [
      { id: 'bank-001', bankName: 'Chase Bank', connectedDate: '2024-06-20' },
      { id: 'bank-002', bankName: 'Wells Fargo', connectedDate: '2024-08-10' }
    ]
  },
  
  // Incomplete appraiser profile (no licenses uploaded)
  {
    id: 'member-002',
    userId: 'user-002',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@coastal.com',
    phone: '(619) 555-5678',
    role: 'appraiser',
    type: 'appraiser',
    status: 'active',
    title: 'Appraiser',
    joinedDate: '2025-11-20',
    lastLogin: '2026-01-20',
    hasLicenses: false, // Empty state
    hasCoverage: true,
    hasDocuments: false, // Empty state
    profileCompleteness: 45,
    licenses: [], // Empty - will show empty state
    coverageAreas: [
      {
        id: 'cov-002',
        state: 'CA',
        stateName: 'California',
        counties: ['San Diego', 'Orange']
      }
    ],
    specialties: ['Residential'],
    subSpecialties: ['Single Family', 'Condominiums'],
    designations: [],
    documents: {}, // Empty - will show empty states
    performance: {
      completedOrders: 12,
      avgTurnaround: 4.1,
      completionRate: 88,
      rating: 4.5
    },
    connectedBanks: []
  },
  
  // Staff member (non-appraiser)
  {
    id: 'member-003',
    userId: 'user-003',
    firstName: 'Lisa',
    lastName: 'Johnson',
    email: 'lisa.johnson@coastal.com',
    phone: '(619) 555-9012',
    role: 'staff',
    type: 'staff',
    status: 'active',
    title: 'Bid Coordinator',
    joinedDate: '2025-01-10',
    lastLogin: '2026-01-22',
    hasLicenses: false, // Not applicable for staff
    hasCoverage: false, // Not applicable for staff
    hasDocuments: true,
    profileCompleteness: 100, // Staff profile is simpler
    performance: {
      completedOrders: 0, // Staff don't complete appraisal orders
      avgTurnaround: 0,
      completionRate: 0,
      rating: 0
    }
  },
  
  // Pending invite (incomplete)
  {
    id: 'member-004',
    userId: 'user-004',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@coastal.com',
    phone: '(619) 555-3333',
    role: 'appraiser',
    type: 'appraiser',
    status: 'pending_invite',
    title: 'Appraiser',
    joinedDate: '2026-01-18',
    lastLogin: '',
    hasLicenses: false,
    hasCoverage: false,
    hasDocuments: false,
    profileCompleteness: 0,
    licenses: [],
    coverageAreas: [],
    specialties: [],
    subSpecialties: [],
    designations: []
  }
];

/**
 * Get team member by ID
 */
export function getTeamMemberById(id: string): TeamMember | undefined {
  return mockTeamMembers.find(m => m.id === id);
}

/**
 * Check if user can edit team member
 * Business admins can edit, individual vendors cannot
 */
export function canEditTeamMember(currentUserAccountType: string): boolean {
  return currentUserAccountType === 'business_admin';
}
