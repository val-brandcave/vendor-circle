import { useState } from "react";
import { User, Phone, FileText, MapPin, Award, X, Plus, Info, AlertTriangle, Clock } from "lucide-react";
import { StepComponentProps } from "@/components/onboarding-stepper-new";

// Step 1: Personal Information
export function PersonalInfoStep({ data, onDataChange }: StepComponentProps) {
  const isBusiness = data.userType === 'business';
  const isAlsoAppraiser = data.isAlsoAppraiser ?? false;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Tell us about yourself
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) => onDataChange({ firstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) => onDataChange({ lastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Professional Title *
        </label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => onDataChange({ title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Certified Residential Appraiser"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Years of Experience
        </label>
        <input
          type="number"
          value={data.yearsExperience || ""}
          onChange={(e) => onDataChange({ yearsExperience: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="10"
        />
      </div>

      {/* Key Checkbox for Business Users: Are you also an appraiser? */}
      {isBusiness && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAlsoAppraiser}
                onChange={(e) => onDataChange({ isAlsoAppraiser: e.target.checked })}
                className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5 flex-shrink-0"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
                  I also work as an appraiser
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Check this if you perform appraisals in addition to managing the business. 
                  We'll create your appraiser profile with licenses and specialties.
                </span>
              </div>
            </label>
          </div>

          {isAlsoAppraiser && (
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Great!</strong> You'll be able to add your licenses and specialties in the next steps. 
                  Banks approve individual appraisers, so you'll have your own appraiser profile within your business.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Step 2: Contact Information
export function ContactInfoStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Contact Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          How can banks and clients reach you?
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Primary Phone *
        </label>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => onDataChange({ phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Address
        </label>
        <input
          type="text"
          value={data.address || ""}
          onChange={(e) => onDataChange({ address: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
          placeholder="123 Main Street"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <input
            type="text"
            value={data.city || ""}
            onChange={(e) => onDataChange({ city: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="City"
          />
          <input
            type="text"
            value={data.state || ""}
            onChange={(e) => onDataChange({ state: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="State"
          />
          <input
            type="text"
            value={data.zip || ""}
            onChange={(e) => onDataChange({ zip: e.target.value })}
            className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ZIP Code"
          />
        </div>
      </div>
    </div>
  );
}

// Step 3: Licenses (Multiple License Support)
export function LicensesStep({ data, onDataChange }: StepComponentProps) {
  const licenses = data.licenses || [];
  
  const addLicense = () => {
    const newLicense = {
      id: Date.now().toString(),
      number: '',
      state: '',
      expiry: ''
    };
    onDataChange({ licenses: [...licenses, newLicense] });
  };
  
  const removeLicense = (id: string) => {
    onDataChange({
      licenses: licenses.filter((license: any) => license.id !== id)
    });
  };
  
  const updateLicense = (id: string, field: string, value: string) => {
    onDataChange({
      licenses: licenses.map((license: any) =>
        license.id === id ? { ...license, [field]: value } : license
      )
    });
  };

  // Calculate expiry status
  const getExpiryStatus = (expiryDate: string) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { type: 'expired', message: 'Expired', color: 'red' };
    } else if (daysUntilExpiry <= 30) {
      return { type: 'critical', message: `Expires in ${daysUntilExpiry} days`, color: 'red' };
    } else if (daysUntilExpiry <= 90) {
      return { type: 'warning', message: `Expires in ${daysUntilExpiry} days`, color: 'yellow' };
    } else if (daysUntilExpiry <= 180) {
      return { type: 'notice', message: `Expires in ${Math.floor(daysUntilExpiry / 30)} months`, color: 'blue' };
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          State Licenses
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Add your professional licenses (you can add more later)
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Tip:</strong> You can add multiple licenses if you're licensed in multiple states.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {licenses.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              No licenses added yet
            </p>
            <button
              type="button"
              onClick={addLicense}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
            >
              Add Your First License
            </button>
          </div>
        ) : (
          <>
            {licenses.map((license: any, index: number) => {
              const expiryStatus = getExpiryStatus(license.expiry);
              
              return (
                <div
                  key={license.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeLicense(license.id)}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    aria-label="Remove license"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="space-y-3 pr-8">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      License {index + 1}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          License Number
                        </label>
                        {expiryStatus && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              expiryStatus.color === 'red'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                : expiryStatus.color === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}
                          >
                            {expiryStatus.type === 'expired' ? (
                              <AlertTriangle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {expiryStatus.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={license.number}
                        onChange={(e) => updateLicense(license.id, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        placeholder="CA-123456789"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          State
                        </label>
                        <select
                          value={license.state}
                          onChange={(e) => updateLicense(license.id, 'state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          aria-label="License state"
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="NY">New York</option>
                          <option value="AZ">Arizona</option>
                          <option value="NV">Nevada</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          value={license.expiry}
                          onChange={(e) => updateLicense(license.id, 'expiry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          aria-label="License expiration date"
                        />
                      </div>
                    </div>

                    {expiryStatus && expiryStatus.type !== 'notice' && (
                      <div
                        className={`p-2 rounded-lg flex items-start gap-2 ${
                          expiryStatus.color === 'red'
                            ? 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800'
                            : 'bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800'
                        }`}
                      >
                        <AlertTriangle
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            expiryStatus.color === 'red'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-yellow-600 dark:text-yellow-400'
                          }`}
                        />
                        <p
                          className={`text-xs ${
                            expiryStatus.color === 'red'
                              ? 'text-red-800 dark:text-red-300'
                              : 'text-yellow-800 dark:text-yellow-300'
                          }`}
                        >
                          {expiryStatus.type === 'expired'
                            ? 'This license has expired. Please renew it as soon as possible.'
                            : 'This license is expiring soon. Consider renewing it to avoid disruption.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            <button
              type="button"
              onClick={addLicense}
              className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Another License
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Step 4: Specialties (Accordion Pattern - Matches Coverage Step)
export function SpecialtiesStep({ data, onDataChange }: StepComponentProps) {
  const selectedSubSpecialties = data.selectedSubSpecialties || {};
  const selectedDesignations = data.selectedDesignations || [];
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningParent, setWarningParent] = useState<any>(null);

  const { SPECIALTY_DATA, shouldWarnAboutOverSelection } = require("@/lib/data/specialties");

  const handleSubSpecialtiesChange = (parentId: string, subIds: string[]) => {
    // Check if this would trigger warning (>80% selected)
    const parent = SPECIALTY_DATA.find((p: any) => p.id === parentId);
    const currentSelected = selectedSubSpecialties[parentId] || [];
    
    // Only warn when going from low selection to high selection
    if (parent && subIds.length > currentSelected.length && shouldWarnAboutOverSelection(parentId, subIds)) {
      setWarningParent(parent);
      setShowWarningModal(true);
      return;
    }

    onDataChange({
      selectedSubSpecialties: {
        ...selectedSubSpecialties,
        [parentId]: subIds,
      },
    });
  };

  const confirmSelectAll = () => {
    if (warningParent) {
      const allSubIds = warningParent.subSpecialties.map((sub: any) => sub.id);
      onDataChange({
        selectedSubSpecialties: {
          ...selectedSubSpecialties,
          [warningParent.id]: allSubIds,
        },
      });
    }
    setShowWarningModal(false);
    setWarningParent(null);
  };

  const toggleAccordion = (parentId: string) => {
    setExpandedParent(expandedParent === parentId ? null : parentId);
  };

  const toggleDesignation = (designationId: string) => {
    const updated = selectedDesignations.includes(designationId)
      ? selectedDesignations.filter((id: string) => id !== designationId)
      : [...selectedDesignations, designationId];
    onDataChange({ selectedDesignations: updated });
  };

  // Calculate totals
  const totalSubSpecialtiesSelected = Object.values(selectedSubSpecialties).reduce(
    (sum: number, subs: any) => sum + (subs?.length || 0),
    0
  );
  const categoriesWithSelections = Object.keys(selectedSubSpecialties).filter(
    (key) => selectedSubSpecialties[key].length > 0
  ).length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Specialties & Expertise
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Select your appraisal specialties (focus on your core expertise)
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Important:</strong> Banks use specialties to match appraisers with specific
            property types. Click on a category to see and select specific sub-specialties.
            Focus on where you have genuine expertise.
          </p>
        </div>
      </div>

      {/* Specialty Accordions (matches Coverage pattern) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Property Type Specialties
        </label>
        <div className="space-y-3">
          {SPECIALTY_DATA.map((parent: any) => {
            const selectedSubs = selectedSubSpecialties[parent.id] || [];
            const showWarning = shouldWarnAboutOverSelection(parent.id, selectedSubs);
            
            return (
              <div key={parent.id}>
                {typeof window !== "undefined" && (
                  (() => {
                    const { SpecialtyAccordion } = require("@/components/specialty-accordion");
                    return (
                      <SpecialtyAccordion
                        parentId={parent.id}
                        parentName={parent.name}
                        subSpecialties={parent.subSpecialties}
                        selectedSubSpecialties={selectedSubs}
                        onChange={(subIds: string[]) => handleSubSpecialtiesChange(parent.id, subIds)}
                        isExpanded={expandedParent === parent.id}
                        onToggle={() => toggleAccordion(parent.id)}
                        showWarning={showWarning}
                      />
                    );
                  })()
                )}
              </div>
            );
          })}
        </div>
        
        {/* Summary Counter (like coverage step) */}
        {totalSubSpecialtiesSelected > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Total: {totalSubSpecialtiesSelected} sub-specialt{totalSubSpecialtiesSelected !== 1 ? 'ies' : 'y'} selected across {categoriesWithSelections} categor{categoriesWithSelections !== 1 ? 'ies' : 'y'}
          </p>
        )}
      </div>

      {/* Professional Designations - Search and Select with Pills */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Professional Designations (Optional)
        </label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Search and select any professional designations you hold
        </p>
        {typeof window !== "undefined" && (
          (() => {
            const { DesignationSelector } = require("@/components/designation-selector");
            return (
              <DesignationSelector
                selectedDesignations={selectedDesignations}
                onToggle={toggleDesignation}
              />
            );
          })()
        )}
      </div>

      {/* Warning Modal */}
      {showWarningModal && warningParent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={() => {
              setShowWarningModal(false);
              setWarningParent(null);
            }}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Wow! That's a lot of specialties!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We see you're about to select all {warningParent.subSpecialties.length}{" "}
                    {warningParent.name.toLowerCase()} specialties. Are you really a specialist in every
                    category?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Tip:</strong> Over-selection can actually reduce your chances of matching with
                    the right opportunities because banks look for specific expertise.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowWarningModal(false);
                    setWarningParent(null);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Review Selection
                </button>
                <button
                  type="button"
                  onClick={confirmSelectAll}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  I'm Sure
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
