/**
 * Mock Specialties Data for Admin Management
 * Two-level hierarchy with vendor counts
 */

export interface SubSpecialtyAdmin {
  id: string;
  key: string;
  name: string;
  parentKey: string;
  vendorCount: number;
}

export interface ParentSpecialtyAdmin {
  id: string;
  key: string;
  name: string;
  description?: string;
  subSpecialties: SubSpecialtyAdmin[];
  totalVendorCount: number; // Total vendors with any sub from this parent
}

export const mockSpecialtiesAdmin: ParentSpecialtyAdmin[] = [
  {
    id: "commercial",
    key: "commercial",
    name: "Commercial",
    description: "Commercial property appraisals",
    totalVendorCount: 45,
    subSpecialties: [
      { id: "office-buildings", key: "office-buildings", name: "Office Buildings", parentKey: "commercial", vendorCount: 38 },
      { id: "shopping-centers", key: "shopping-centers", name: "Shopping Centers/Retail", parentKey: "commercial", vendorCount: 32 },
      { id: "restaurants", key: "restaurants", name: "Restaurants", parentKey: "commercial", vendorCount: 28 },
      { id: "bars-taverns", key: "bars-taverns", name: "Bars & Taverns", parentKey: "commercial", vendorCount: 15 },
      { id: "bowling-alleys", key: "bowling-alleys", name: "Bowling Alleys", parentKey: "commercial", vendorCount: 6 },
      { id: "funeral-homes", key: "funeral-homes", name: "Funeral Homes", parentKey: "commercial", vendorCount: 8 },
      { id: "marinas", key: "marinas", name: "Marinas", parentKey: "commercial", vendorCount: 4 },
      { id: "gas-stations", key: "gas-stations", name: "Gas Stations/Convenience Stores", parentKey: "commercial", vendorCount: 22 },
      { id: "hotels-motels", key: "hotels-motels", name: "Hotels & Motels", parentKey: "commercial", vendorCount: 18 },
      { id: "warehouses", key: "warehouses", name: "Warehouses/Distribution Centers", parentKey: "commercial", vendorCount: 25 },
      { id: "self-storage", key: "self-storage", name: "Self-Storage Facilities", parentKey: "commercial", vendorCount: 12 },
      { id: "car-washes", key: "car-washes", name: "Car Washes", parentKey: "commercial", vendorCount: 9 },
      { id: "medical-offices", key: "medical-offices", name: "Medical Offices/Clinics", parentKey: "commercial", vendorCount: 20 },
      { id: "fitness-centers", key: "fitness-centers", name: "Fitness Centers/Gyms", parentKey: "commercial", vendorCount: 11 },
      { id: "mixed-use", key: "mixed-use", name: "Mixed-Use Developments", parentKey: "commercial", vendorCount: 16 },
    ],
  },
  {
    id: "residential",
    key: "residential",
    name: "Residential",
    description: "Residential property appraisals",
    totalVendorCount: 82,
    subSpecialties: [
      { id: "single-family", key: "single-family", name: "Single Family", parentKey: "residential", vendorCount: 78 },
      { id: "luxury-homes", key: "luxury-homes", name: "Luxury Homes", parentKey: "residential", vendorCount: 42 },
      { id: "historic-properties", key: "historic-properties", name: "Historic Properties", parentKey: "residential", vendorCount: 18 },
      { id: "new-construction", key: "new-construction", name: "New Construction", parentKey: "residential", vendorCount: 55 },
      { id: "waterfront", key: "waterfront", name: "Waterfront Properties", parentKey: "residential", vendorCount: 24 },
      { id: "condominiums", key: "condominiums", name: "Condominiums", parentKey: "residential", vendorCount: 48 },
      { id: "townhomes", key: "townhomes", name: "Townhomes", parentKey: "residential", vendorCount: 41 },
      { id: "vacation-homes", key: "vacation-homes", name: "Vacation Homes", parentKey: "residential", vendorCount: 22 },
      { id: "fha-va", key: "fha-va", name: "FHA/VA Financed Properties", parentKey: "residential", vendorCount: 52 },
    ],
  },
  {
    id: "multi-family",
    key: "multi-family",
    name: "Multi-Family",
    description: "Multi-family residential appraisals",
    totalVendorCount: 38,
    subSpecialties: [
      { id: "apartments-small", key: "apartments-small", name: "Apartments (2-4 units)", parentKey: "multi-family", vendorCount: 32 },
      { id: "apartments-large", key: "apartments-large", name: "Apartments (5+ units)", parentKey: "multi-family", vendorCount: 28 },
      { id: "affordable-housing", key: "affordable-housing", name: "Affordable Housing", parentKey: "multi-family", vendorCount: 15 },
      { id: "duplex", key: "duplex", name: "Duplex", parentKey: "multi-family", vendorCount: 30 },
      { id: "student-housing", key: "student-housing", name: "Student Housing", parentKey: "multi-family", vendorCount: 12 },
      { id: "senior-housing", key: "senior-housing", name: "Senior Housing (Age-Restricted)", parentKey: "multi-family", vendorCount: 14 },
    ],
  },
  {
    id: "land",
    key: "land",
    name: "Land/Lot",
    description: "Land and lot appraisals",
    totalVendorCount: 28,
    subSpecialties: [
      { id: "vacant-land", key: "vacant-land", name: "Vacant Land", parentKey: "land", vendorCount: 25 },
      { id: "residential-lots", key: "residential-lots", name: "Residential Lots", parentKey: "land", vendorCount: 22 },
      { id: "commercial-land", key: "commercial-land", name: "Commercial Land", parentKey: "land", vendorCount: 18 },
      { id: "agricultural-land", key: "agricultural-land", name: "Agricultural Land", parentKey: "land", vendorCount: 15 },
      { id: "waterfront-land", key: "waterfront-land", name: "Waterfront Land", parentKey: "land", vendorCount: 10 },
    ],
  },
  {
    id: "industrial",
    key: "industrial",
    name: "Industrial",
    description: "Industrial property appraisals",
    totalVendorCount: 22,
    subSpecialties: [
      { id: "manufacturing", key: "manufacturing", name: "Manufacturing Facilities", parentKey: "industrial", vendorCount: 18 },
      { id: "warehouses-ind", key: "warehouses-ind", name: "Warehouses", parentKey: "industrial", vendorCount: 20 },
      { id: "distribution", key: "distribution", name: "Distribution Centers", parentKey: "industrial", vendorCount: 16 },
      { id: "data-centers", key: "data-centers", name: "Data Centers", parentKey: "industrial", vendorCount: 8 },
    ],
  },
  {
    id: "agricultural",
    key: "agricultural",
    name: "Agricultural",
    description: "Agricultural property appraisals",
    totalVendorCount: 12,
    subSpecialties: [
      { id: "crop-farms", key: "crop-farms", name: "Crop Farms", parentKey: "agricultural", vendorCount: 10 },
      { id: "dairy-farms", key: "dairy-farms", name: "Dairy Farms", parentKey: "agricultural", vendorCount: 8 },
      { id: "vineyards", key: "vineyards", name: "Vineyards/Wineries", parentKey: "agricultural", vendorCount: 6 },
    ],
  },
  {
    id: "special-purpose",
    key: "special-purpose",
    name: "Special Purpose",
    description: "Special purpose property appraisals",
    totalVendorCount: 15,
    subSpecialties: [
      { id: "hospitals", key: "hospitals", name: "Hospitals", parentKey: "special-purpose", vendorCount: 5 },
      { id: "schools-public", key: "schools-public", name: "Public Schools", parentKey: "special-purpose", vendorCount: 8 },
      { id: "government-buildings", key: "government-buildings", name: "Government Buildings", parentKey: "special-purpose", vendorCount: 12 },
      { id: "sports-facilities", key: "sports-facilities", name: "Sports Facilities/Stadiums", parentKey: "special-purpose", vendorCount: 4 },
    ],
  },
];
