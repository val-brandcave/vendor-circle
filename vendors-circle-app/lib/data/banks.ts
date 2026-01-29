/**
 * Bank Data with Actual Logos
 */

export interface Bank {
  id: string;
  name: string;
  logo: string;
  displayName?: string;
}

export const BANKS: Bank[] = [
  {
    id: 'capital-one',
    name: 'Capital One',
    logo: '/logos/banks/32px-Capital_One_logo.svg.png',
    displayName: 'Capital One Bank',
  },
  {
    id: 'chase',
    name: 'Chase',
    logo: '/logos/banks/32px-Citigroup.svg.png',
    displayName: 'Chase Bank',
  },
  {
    id: 'first-national',
    name: 'First National',
    logo: '/logos/banks/32px-First_Bank_&_Trust_logo.svg.png',
    displayName: 'First National Bank',
  },
  {
    id: 'wells-fargo',
    name: 'Wells Fargo',
    logo: '/logos/banks/generic-bank-logo.svg',
    displayName: 'Wells Fargo',
  },
  {
    id: 'td-bank',
    name: 'TD Bank',
    logo: '/logos/banks/32px-TD_Bank.svg.png',
    displayName: 'TD Bank',
  },
  {
    id: 'ally',
    name: 'Ally',
    logo: '/logos/banks/32px-Ally_Financial.svg.png',
    displayName: 'Ally Financial',
  },
  {
    id: 'bny',
    name: 'BNY',
    logo: '/logos/banks/32px-BNY_logo_2024.svg.png',
    displayName: 'BNY Mellon',
  },
  {
    id: 'suntrust',
    name: 'SunTrust',
    logo: '/logos/banks/64px-SunTrust_Banks_logo.svg.png',
    displayName: 'SunTrust Bank',
  },
];

/**
 * Get bank by ID
 */
export function getBankById(id: string): Bank | undefined {
  return BANKS.find((b) => b.id === id);
}

/**
 * Get bank by name (case-insensitive)
 */
export function getBankByName(name: string): Bank | undefined {
  const normalized = name.toLowerCase();
  return BANKS.find((b) => 
    b.name.toLowerCase() === normalized || 
    b.displayName?.toLowerCase() === normalized
  );
}
