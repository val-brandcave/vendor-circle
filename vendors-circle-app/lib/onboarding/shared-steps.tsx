import { User, Briefcase, CheckCircle, Building2, Info, Sparkles, MapPin, Edit2, ChevronDown, ChevronUp, Mail, FileText, Award, Users as UsersIcon, AlertTriangle, Clock } from "lucide-react";
import { StepComponentProps } from "@/components/onboarding-stepper-new";
import { CityAutocomplete } from "@/components/city-autocomplete";
import { getCitiesForState } from "@/lib/data/us-cities";
import { StateMultiSelect } from "@/components/state-multi-select";
import { CountyAccordion } from "@/components/county-accordion";
import { useState } from "react";

// Step 0: User Type Fork - ALWAYS FIRST STEP
export function UserTypeForkStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Tell Us About You
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          This helps us customize your experience
        </p>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => onDataChange({ userType: 'individual', accountType: 'individual_vendor' })}
          className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
            data.userType === 'individual'
              ? "bg-blue-50 dark:bg-blue-900/20 border-primary shadow-md"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-primary"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                data.userType === 'individual' 
                  ? "border-primary bg-primary" 
                  : "border-gray-300 dark:border-gray-600"
              }`}>
                {data.userType === 'individual' && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white">
                Individual Appraiser
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onDataChange({ userType: 'business', accountType: 'business_admin' })}
          className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
            data.userType === 'business'
              ? "bg-blue-50 dark:bg-blue-900/20 border-primary shadow-md"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-primary"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                data.userType === 'business' 
                  ? "border-primary bg-primary" 
                  : "border-gray-300 dark:border-gray-600"
              }`}>
                {data.userType === 'business' && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white">
                Business/Office Manager
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Tip:</strong> If you do both (appraise AND manage a business), 
            select "Business/Office Manager." You'll set up your personal appraiser 
            profile during this process.
          </p>
        </div>
      </div>
    </div>
  );
}

// Step 2: Business Info (used by BOTH individual and business)
export function BusinessInfoStep({ data, onDataChange }: StepComponentProps) {
  const isIndividual = data.userType === 'individual';
  
  const statesList = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const businessTypes = [
    "Sole Proprietorship",
    "Limited Liability Company (LLC)",
    "S Corporation",
    "C Corporation",
    "Partnership",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Business Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Tell us about your {isIndividual ? 'practice' : 'business'}
        </p>
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Name {!isIndividual && '*'}
        </label>
        <input
          type="text"
          value={data.businessName || ""}
          onChange={(e) => onDataChange({ businessName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="e.g., Smith Appraisal Services"
        />
      </div>

      {/* Business Type and EIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Type
          </label>
          <select
            value={data.businessType || ""}
            onChange={(e) => onDataChange({ businessType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Business type"
          >
            <option value="">Select Type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            EIN (Optional)
          </label>
          <input
            type="text"
            value={data.ein || ""}
            onChange={(e) => onDataChange({ ein: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="XX-XXXXXXX"
          />
        </div>
      </div>

      {/* Year Established */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Year Established (Optional)
        </label>
        <input
          type="number"
          value={data.yearEstablished || ""}
          onChange={(e) => onDataChange({ yearEstablished: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="2010"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Email *
          </label>
          <input
            type="email"
            value={data.businessEmail || ""}
            onChange={(e) => onDataChange({ businessEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="contact@business.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Phone *
          </label>
          <input
            type="tel"
            value={data.businessPhone || ""}
            onChange={(e) => onDataChange({ businessPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Address
        </label>
        <input
          type="text"
          value={data.businessAddress || ""}
          onChange={(e) => onDataChange({ businessAddress: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
          placeholder="123 Main Street, Suite 100"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <CityAutocomplete
              value={data.businessCity || ""}
              onChange={(value) => onDataChange({ businessCity: value })}
              cities={data.businessState ? getCitiesForState(data.businessState) : []}
              placeholder="City"
              disabled={!data.businessState}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div>
            <select
              value={data.businessState || ""}
              onChange={(e) => onDataChange({ businessState: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Business state"
            >
              <option value="">State</option>
              {statesList.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <input
              type="text"
              value={data.businessZip || ""}
              onChange={(e) => onDataChange({ businessZip: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="ZIP"
            />
          </div>
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website (Optional)
        </label>
        <input
          type="url"
          value={data.businessWebsite || ""}
          onChange={(e) => onDataChange({ businessWebsite: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://www.yourwebsite.com"
        />
      </div>

      {isIndividual && (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> Even as an individual appraiser, providing business information 
              helps banks and clients understand your professional practice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Coverage Area Step (UNIFIED - used by BOTH individual and business)
export function CoverageStep({ data, onDataChange }: StepComponentProps) {
  const isIndividual = data.userType === 'individual';
  
  // State management for accordion expansion
  const [expandedState, setExpandedState] = useState<string | null>(null);
  
  // Get selected states and counties from data
  const selectedStates = data.coverageStates || [];
  const selectedCountiesByState = data.coverageCounties || {};

  const STATE_NAMES: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
    NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
    SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
    VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
  };

  const handleStatesChange = (states: string[]) => {
    // Remove counties for states that were deselected
    const newCounties = { ...selectedCountiesByState };
    Object.keys(newCounties).forEach(state => {
      if (!states.includes(state)) {
        delete newCounties[state];
      }
    });
    
    // Auto-expand first state if one was just added
    if (states.length > selectedStates.length) {
      const newState = states.find(s => !selectedStates.includes(s));
      if (newState) {
        setExpandedState(newState);
      }
    }
    
    onDataChange({
      coverageStates: states,
      coverageCounties: newCounties
    });
  };

  const handleCountiesChange = (stateCode: string, counties: string[]) => {
    onDataChange({
      coverageCounties: {
        ...selectedCountiesByState,
        [stateCode]: counties
      }
    });
  };

  const toggleAccordion = (stateCode: string) => {
    setExpandedState(expandedState === stateCode ? null : stateCode);
  };

  // Calculate total counties selected
  const totalCountiesSelected = Object.values(selectedCountiesByState).reduce(
    (sum: number, counties: any) => sum + (counties?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Coverage Area
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          {isIndividual 
            ? "Where do you provide appraisal services?"
            : "Where does your team provide services?"}
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Tip:</strong> Select the states where you work, then choose specific counties within each state.
          </p>
        </div>
      </div>

      {/* States Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          States *
        </label>
        <StateMultiSelect
          selectedStates={selectedStates}
          onChange={handleStatesChange}
          placeholder="Search and select states..."
        />
        {selectedStates.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Counties by State (Accordion) */}
      {selectedStates.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Counties by State *
          </label>
          <div className="space-y-3">
            {selectedStates.map((stateCode: string) => (
              <CountyAccordion
                key={stateCode}
                stateCode={stateCode}
                stateName={STATE_NAMES[stateCode] || stateCode}
                selectedCounties={selectedCountiesByState[stateCode] || []}
                onChange={(counties) => handleCountiesChange(stateCode, counties)}
                isExpanded={expandedState === stateCode}
                onToggle={() => toggleAccordion(stateCode)}
              />
            ))}
          </div>
          {totalCountiesSelected > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Total: {totalCountiesSelected} count{totalCountiesSelected !== 1 ? 'ies' : 'y'} selected across {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      {selectedStates.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Select states above to choose counties
          </p>
        </div>
      )}
    </div>
  );
}

// Final Step: Review (Comprehensive)
export function ReviewStep({ data, onStepChange }: StepComponentProps) {
  const isIndividual = data.userType === 'individual';
  const isBusiness = data.userType === 'business';
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    coverage: false,
    specialties: false,
    team: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper to get step index for editing
  const getStepIndex = (stepId: string, steps: any[]) => {
    return steps.findIndex(s => s.id === stepId);
  };

  // Get specialty names from IDs (updated for accordion pattern)
  const getSpecialtyNames = () => {
    if (!data.selectedSubSpecialties) return null;
    const { SPECIALTY_DATA } = require("@/lib/data/specialties");
    
    // Only show parents that have sub-specialties selected
    const categoriesWithSelections = Object.keys(data.selectedSubSpecialties)
      .filter((parentId) => data.selectedSubSpecialties[parentId].length > 0)
      .map((parentId) => {
        const parent = SPECIALTY_DATA.find((p: any) => p.id === parentId);
        return {
          parent: parent?.name,
          subs: (data.selectedSubSpecialties[parentId] || []).map((subId: string) => {
            return parent?.subSpecialties.find((s: any) => s.id === subId)?.name;
          }).filter(Boolean)
        };
      });
    
    return categoriesWithSelections.length > 0 ? categoriesWithSelections : null;
  };

  // Get designation names from IDs
  const getDesignationNames = () => {
    if (!data.selectedDesignations || data.selectedDesignations.length === 0) return [];
    const { DESIGNATIONS } = require("@/lib/data/specialties");
    return data.selectedDesignations.map((id: string) => {
      return DESIGNATIONS.find((d: any) => d.id === id)?.name;
    }).filter(Boolean);
  };

  // Get state names
  const STATE_NAMES: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
    NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
    SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
    VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
  };

  // Calculate license expiry status
  const getLicenseExpiryStatus = (expiryDate: string) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { type: 'expired', color: 'red' };
    if (daysUntilExpiry <= 30) return { type: 'critical', color: 'red' };
    if (daysUntilExpiry <= 90) return { type: 'warning', color: 'yellow' };
    return null;
  };

  const totalCounties = data.coverageCounties ? Object.values(data.coverageCounties).reduce(
    (sum: number, counties: any) => sum + (counties?.length || 0), 0
  ) : 0;

  const specialtyData = getSpecialtyNames();
  const designationNames = getDesignationNames();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Review & Confirm
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Please review your information before completing setup
        </p>
      </div>

      <div className="space-y-4">
        {/* Account Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Account Type</h3>
            </div>
            <button
              type="button"
              onClick={() => onStepChange?.(0)}
              className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="p-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
              {isIndividual ? 'Individual Appraiser' : 'Business/Office Manager'}
            </span>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Business Information</h3>
            </div>
            <button
              type="button"
              onClick={() => onStepChange?.(1)}
              className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="p-4 space-y-3">
            {data.businessName && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Business Name</span>
                <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">{data.businessName}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {data.businessType && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.businessType}</p>
                </div>
              )}
              {data.yearEstablished && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Established</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.yearEstablished}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.businessEmail && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.businessEmail}</p>
                </div>
              )}
              {data.businessPhone && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.businessPhone}</p>
                </div>
              )}
            </div>
            {data.businessAddress && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Address</span>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {data.businessAddress}
                  {data.businessCity && `, ${data.businessCity}`}
                  {data.businessState && `, ${data.businessState}`}
                  {data.businessZip && ` ${data.businessZip}`}
                </p>
              </div>
            )}
            {data.businessWebsite && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Website</span>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{data.businessWebsite}</p>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Personal Information</h3>
            </div>
            <button
              type="button"
              onClick={() => onStepChange?.(2)}
              className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="p-4 space-y-3">
            {data.firstName && data.lastName && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</span>
                <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">{data.firstName} {data.lastName}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {data.title && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Title</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.title}</p>
                </div>
              )}
              {data.yearsExperience && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Experience</span>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{data.yearsExperience} years</p>
                </div>
              )}
            </div>
            {isBusiness && data.isAlsoAppraiser && (
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Also works as an appraiser
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Licenses (if individual OR business is also appraiser) */}
        {((isIndividual && data.licenses) || (isBusiness && data.isAlsoAppraiser && data.licenses)) && data.licenses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {isBusiness && data.isAlsoAppraiser ? 'Your Licenses' : 'State Licenses'}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({data.licenses.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  // Find licenses step index dynamically
                  const steps = require("./step-builder").buildOnboardingSteps(data);
                  const index = getStepIndex('licenses', steps);
                  if (index !== -1) onStepChange?.(index);
                }}
                className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="p-4 space-y-3">
              {data.licenses.map((license: any, index: number) => {
                const expiryStatus = getLicenseExpiryStatus(license.expiry);
                return (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        License {index + 1}
                      </span>
                      {expiryStatus && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            expiryStatus.color === 'red'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}
                        >
                          {expiryStatus.type === 'expired' ? (
                            <>
                              <AlertTriangle className="w-3 h-3" />
                              Expired
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              Expiring Soon
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-900 dark:text-white font-medium">{license.number}</p>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <span><strong>State:</strong> {license.state}</span>
                        <span>•</span>
                        <span><strong>Expires:</strong> {license.expiry || 'Not set'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Coverage Area (Accordion) */}
        {data.coverageStates && data.coverageStates.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSection('coverage')}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Coverage Area</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {totalCounties} counties across {data.coverageStates.length} states
                  </p>
                </div>
                {expandedSections.coverage ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const steps = require("./step-builder").buildOnboardingSteps(data);
                  const index = getStepIndex('coverage', steps);
                  if (index !== -1) onStepChange?.(index);
                }}
                className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors ml-3"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            {expandedSections.coverage && (
              <div className="p-4 space-y-3">
                {data.coverageStates.map((stateCode: string) => {
                  const counties = data.coverageCounties?.[stateCode] || [];
                  return (
                    <div key={stateCode} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>{STATE_NAMES[stateCode] || stateCode}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({counties.length} counties)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {counties.slice(0, 10).map((county: string) => (
                          <span
                            key={county}
                            className="px-2 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {county}
                          </span>
                        ))}
                        {counties.length > 10 && (
                          <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
                            +{counties.length - 10} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Specialties (Accordion - if individual OR business is appraiser) */}
        {((isIndividual && specialtyData) || (isBusiness && data.isAlsoAppraiser && specialtyData)) && specialtyData && specialtyData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSection('specialties')}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {isBusiness && data.isAlsoAppraiser ? 'Your Specialties' : 'Specialties'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {specialtyData.length} categories selected
                  </p>
                </div>
                {expandedSections.specialties ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const steps = require("./step-builder").buildOnboardingSteps(data);
                  const index = getStepIndex('specialties', steps);
                  if (index !== -1) onStepChange?.(index);
                }}
                className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors ml-3"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            {expandedSections.specialties && (
              <div className="p-4 space-y-3">
                {specialtyData.map((category: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">
                      {category.parent}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subs.map((sub: string) => (
                        <span
                          key={sub}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Designations */}
                {designationNames.length > 0 && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">
                      Professional Designations
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {designationNames.map((name: string) => (
                        <span
                          key={name}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Team Members (Accordion - if business) */}
        {isBusiness && data.teamMembers && data.teamMembers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSection('team')}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Team Members</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {data.teamMembers.length} member{data.teamMembers.length !== 1 ? 's' : ''} added
                  </p>
                </div>
                {expandedSections.team ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const steps = require("./step-builder").buildOnboardingSteps(data);
                  const index = getStepIndex('team-setup', steps);
                  if (index !== -1) onStepChange?.(index);
                }}
                className="text-sm text-primary hover:text-[#1d3f8f] font-medium flex items-center gap-1 transition-colors ml-3"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            {expandedSections.team && (
              <div className="p-4 space-y-3">
                {data.teamMembers.map((member: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{member.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                            {member.role}
                          </span>
                          {member.role === 'Appraiser' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium">
                              <Mail className="w-3 h-3" />
                              Will receive invite
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-200 dark:border-green-800 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">You're all set!</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Click "Complete Setup" below to finish. You can always update your information later from your profile settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
