/**
 * Specialties Data with Two-Level Taxonomy
 * Parent specialties and their sub-specialties
 */

export interface SubSpecialty {
  id: string;
  name: string;
}

export interface ParentSpecialty {
  id: string;
  name: string;
  subSpecialties: SubSpecialty[];
}

export const SPECIALTY_DATA: ParentSpecialty[] = [
  {
    id: "residential",
    name: "Residential",
    subSpecialties: [
      { id: "single-family", name: "Single Family" },
      { id: "luxury-homes", name: "Luxury Homes" },
      { id: "historic-properties", name: "Historic Properties" },
      { id: "new-construction", name: "New Construction" },
      { id: "waterfront", name: "Waterfront Properties" },
      { id: "rural-properties", name: "Rural Properties" },
      { id: "mobile-homes", name: "Mobile Homes" },
      { id: "manufactured-homes", name: "Manufactured Homes" },
      { id: "condominiums", name: "Condominiums" },
      { id: "townhomes", name: "Townhomes" },
      { id: "vacation-homes", name: "Vacation Homes" },
      { id: "fha-va", name: "FHA/VA Financed Properties" },
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    subSpecialties: [
      { id: "office-buildings", name: "Office Buildings" },
      { id: "shopping-centers", name: "Shopping Centers/Retail" },
      { id: "restaurants", name: "Restaurants" },
      { id: "bars-taverns", name: "Bars & Taverns" },
      { id: "bowling-alleys", name: "Bowling Alleys" },
      { id: "funeral-homes", name: "Funeral Homes" },
      { id: "marinas", name: "Marinas" },
      { id: "gas-stations", name: "Gas Stations/Convenience Stores" },
      { id: "hotels-motels", name: "Hotels & Motels" },
      { id: "warehouses", name: "Warehouses/Distribution Centers" },
      { id: "self-storage", name: "Self-Storage Facilities" },
      { id: "car-washes", name: "Car Washes" },
      { id: "medical-offices", name: "Medical Offices/Clinics" },
      { id: "veterinary-clinics", name: "Veterinary Clinics" },
      { id: "daycare-facilities", name: "Daycare Facilities" },
      { id: "fitness-centers", name: "Fitness Centers/Gyms" },
      { id: "automotive-dealerships", name: "Automotive Dealerships" },
      { id: "banks", name: "Banks & Financial Institutions" },
      { id: "mixed-use", name: "Mixed-Use Developments" },
      { id: "strip-malls", name: "Strip Malls" },
      { id: "movie-theaters", name: "Movie Theaters" },
      { id: "golf-courses", name: "Golf Courses" },
      { id: "parking-lots", name: "Parking Lots/Garages" },
      { id: "amusement-parks", name: "Amusement Parks" },
      { id: "rv-parks", name: "RV Parks" },
      { id: "billboards", name: "Billboards/Advertising" },
      { id: "senior-care", name: "Senior Care Facilities" },
      { id: "schools-private", name: "Private Schools" },
      { id: "churches", name: "Churches/Religious Properties" },
      { id: "nursing-homes", name: "Nursing Homes" },
    ],
  },
  {
    id: "multi-family",
    name: "Multi-Family",
    subSpecialties: [
      { id: "apartments-small", name: "Apartments (2-4 units)" },
      { id: "apartments-large", name: "Apartments (5+ units)" },
      { id: "affordable-housing", name: "Affordable Housing" },
      { id: "condos-multi", name: "Condominiums (Multi-unit)" },
      { id: "townhomes-multi", name: "Townhomes (Multi-unit)" },
      { id: "duplex", name: "Duplex" },
      { id: "triplex", name: "Triplex" },
      { id: "quad", name: "Quadplex" },
      { id: "student-housing", name: "Student Housing" },
      { id: "senior-housing", name: "Senior Housing (Age-Restricted)" },
      { id: "assisted-living", name: "Assisted Living Facilities" },
      { id: "garden-apartments", name: "Garden Apartments" },
      { id: "high-rise-apartments", name: "High-Rise Apartments" },
      { id: "mixed-income", name: "Mixed-Income Developments" },
      { id: "subsidized-housing", name: "Subsidized Housing" },
    ],
  },
  {
    id: "land",
    name: "Land/Lot",
    subSpecialties: [
      { id: "vacant-land", name: "Vacant Land" },
      { id: "residential-lots", name: "Residential Lots" },
      { id: "commercial-land", name: "Commercial Land" },
      { id: "industrial-land", name: "Industrial Land" },
      { id: "agricultural-land", name: "Agricultural Land" },
      { id: "timberland", name: "Timberland/Forestry" },
      { id: "ranch-land", name: "Ranch Land" },
      { id: "recreational-land", name: "Recreational Land" },
      { id: "waterfront-land", name: "Waterfront Land" },
      { id: "subdivision-lots", name: "Subdivision Lots" },
      { id: "easements", name: "Easements/Rights-of-Way" },
      { id: "mineral-rights", name: "Mineral Rights" },
    ],
  },
  {
    id: "agricultural",
    name: "Agricultural",
    subSpecialties: [
      { id: "crop-farms", name: "Crop Farms" },
      { id: "dairy-farms", name: "Dairy Farms" },
      { id: "livestock-farms", name: "Livestock Farms" },
      { id: "poultry-farms", name: "Poultry Farms" },
      { id: "orchards", name: "Orchards/Fruit Farms" },
      { id: "vineyards", name: "Vineyards/Wineries" },
      { id: "nurseries", name: "Nurseries/Greenhouses" },
      { id: "equestrian-properties", name: "Equestrian Properties" },
      { id: "fish-farms", name: "Fish Farms/Aquaculture" },
      { id: "organic-farms", name: "Organic Farms" },
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    subSpecialties: [
      { id: "manufacturing", name: "Manufacturing Facilities" },
      { id: "warehouses-ind", name: "Warehouses" },
      { id: "distribution", name: "Distribution Centers" },
      { id: "cold-storage", name: "Cold Storage Facilities" },
      { id: "flex-space", name: "Flex Space" },
      { id: "research-dev", name: "Research & Development" },
      { id: "data-centers", name: "Data Centers" },
      { id: "refineries", name: "Refineries/Processing Plants" },
      { id: "power-plants", name: "Power Plants/Utilities" },
      { id: "recycling", name: "Recycling Facilities" },
      { id: "transportation", name: "Transportation Terminals" },
      { id: "heavy-equipment", name: "Heavy Equipment Yards" },
    ],
  },
  {
    id: "special-purpose",
    name: "Special Purpose",
    subSpecialties: [
      { id: "hospitals", name: "Hospitals" },
      { id: "schools-public", name: "Public Schools" },
      { id: "government-buildings", name: "Government Buildings" },
      { id: "airports", name: "Airports" },
      { id: "sports-facilities", name: "Sports Facilities/Stadiums" },
      { id: "casinos", name: "Casinos" },
      { id: "prisons", name: "Correctional Facilities" },
      { id: "museums", name: "Museums" },
      { id: "convention-centers", name: "Convention Centers" },
      { id: "arenas", name: "Arenas/Event Venues" },
      { id: "cemeteries", name: "Cemeteries" },
      { id: "lighthouses", name: "Lighthouses" },
      { id: "historic-landmarks", name: "Historic Landmarks" },
    ],
  },
];

/**
 * Professional Designations
 */
export const DESIGNATIONS = [
  { id: "mai", name: "MAI (Member, Appraisal Institute)" },
  { id: "sra", name: "SRA (Senior Residential Appraiser)" },
  { id: "ai-grs", name: "AI-GRS (General Review Specialist)" },
  { id: "ai-rrs", name: "AI-RRS (Residential Review Specialist)" },
  { id: "ccim", name: "CCIM (Certified Commercial Investment Member)" },
  { id: "cre", name: "CRE (Counselor of Real Estate)" },
  { id: "asa", name: "ASA (Accredited Senior Appraiser)" },
  { id: "ifa", name: "IFA (Instructor, Fellow, Appraiser)" },
  { id: "srpa", name: "SRPA (Senior Residential Property Appraiser)" },
  { id: "mra", name: "MRA (Member Residential Appraiser)" },
];

/**
 * Helper function to get parent specialty by ID
 */
export function getParentSpecialty(id: string): ParentSpecialty | undefined {
  return SPECIALTY_DATA.find((s) => s.id === id);
}

/**
 * Helper function to count total sub-specialties for a parent
 */
export function getSubSpecialtyCount(parentId: string): number {
  const parent = getParentSpecialty(parentId);
  return parent ? parent.subSpecialties.length : 0;
}

/**
 * Helper function to check if user has selected too many sub-specialties
 * Returns warning if >80% selected
 */
export function shouldWarnAboutOverSelection(
  parentId: string,
  selectedSubSpecialties: string[]
): boolean {
  const total = getSubSpecialtyCount(parentId);
  const selected = selectedSubSpecialties.length;
  return selected / total > 0.8;
}
