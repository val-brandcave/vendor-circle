/**
 * Expiry Alert Helpers
 * Utilities to identify and format expiring documents/licenses
 */

export interface ExpiringItem {
  id: string;
  type: 'license' | 'insurance' | 'document';
  name: string;
  documentType?: string; // e.g., "State License", "Insurance Policy"
  expiryDate: string; // ISO string
  daysUntilExpiry: number;
  memberName?: string; // For business users - which team member
  actionUrl: string; // Where to navigate to address this
}

/**
 * Get all expiring items for a vendor (within 30 days)
 */
export function getVendorExpiringItems(
  licenses: any[] = [],
  insurance: any[] = [],
): ExpiringItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const items: ExpiringItem[] = [];

  // Check licenses
  licenses.forEach((license) => {
    const expiryDate = new Date(license.expirationDate);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate <= thirtyDaysFromNow && expiryDate >= today) {
      const daysUntilExpiry = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      items.push({
        id: license.id,
        type: 'license',
        name: `${license.stateName} License`,
        documentType: 'State License',
        expiryDate: license.expirationDate,
        daysUntilExpiry,
        actionUrl: '/vendor/documents?tab=licenses',
      });
    }
  });

  // Check insurance
  insurance.forEach((policy) => {
    const expiryDate = new Date(policy.expiryDate || policy.expirationDate);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate <= thirtyDaysFromNow && expiryDate >= today) {
      const daysUntilExpiry = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      items.push({
        id: policy.id,
        type: 'insurance',
        name: policy.type || 'Insurance Policy',
        documentType: policy.type || 'Insurance',
        expiryDate: policy.expiryDate || policy.expirationDate,
        daysUntilExpiry,
        actionUrl: '/vendor/documents?tab=insurance',
      });
    }
  });

  // Sort by days until expiry (most urgent first)
  return items.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
}

/**
 * Get all expiring items for a business (owner + team members, within 30 days)
 */
export function getBusinessExpiringItems(
  ownerLicenses: any[] = [],
  ownerInsurance: any[] = [],
  teamMembers: Array<{
    memberId?: string;
    memberName?: string;
    id?: string;
    name?: string;
    licenses?: any[];
    insurance?: any[];
  }> = [],
): ExpiringItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const items: ExpiringItem[] = [];

  // Helper to check and add items
  const checkAndAddItems = (
    docs: any[] = [],
    type: 'license' | 'insurance',
    memberName?: string,
    memberId?: string,
    documentName?: string
  ) => {
    docs.forEach((doc) => {
      const expiryDate = new Date(
        doc.expirationDate || doc.expiryDate
      );
      expiryDate.setHours(0, 0, 0, 0);

      if (expiryDate <= thirtyDaysFromNow && expiryDate >= today) {
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        const itemName =
          type === 'license'
            ? `${doc.stateName || doc.state || 'License'} License`
            : doc.type || 'Insurance Policy';

        items.push({
          id: doc.id,
          type,
          name: itemName,
          documentType: type === 'license' ? 'State License' : doc.type || 'Insurance',
          expiryDate: doc.expirationDate || doc.expiryDate,
          daysUntilExpiry,
          memberName,
          actionUrl:
            memberName && memberName !== 'You' && type === 'license'
              ? `/business/members/${memberId || 'unknown'}?tab=credentials`
              : type === 'license'
                ? `/business/documents?tab=licenses`
                : `/business/documents?tab=insurance`,
        });
      }
    });
  };

  // Check owner's documents
  checkAndAddItems(ownerLicenses, 'license', 'You');
  checkAndAddItems(ownerInsurance, 'insurance', 'You');

  // Check team members' documents
  teamMembers.forEach((member) => {
    const memberName = member.memberName || member.name || 'Team Member';
    const memberId = member.memberId || member.id || 'unknown';
    checkAndAddItems(member.licenses || [], 'license', memberName, memberId);
    checkAndAddItems(member.insurance || [], 'insurance', memberName, memberId);
  });

  // Sort by days until expiry (most urgent first)
  return items.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
}

/**
 * Format expiry date to readable string
 */
export function formatExpiryDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get urgency level based on days until expiry
 */
export function getUrgencyLevel(daysUntilExpiry: number): 'critical' | 'warning' | 'info' {
  if (daysUntilExpiry <= 7) return 'critical';
  if (daysUntilExpiry <= 14) return 'warning';
  return 'info';
}
