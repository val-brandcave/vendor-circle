import { Building2, Phone, User, Users, MapPin, X, Plus, FileText, Info, Mail, UserPlus } from "lucide-react";
import { StepComponentProps } from "@/components/onboarding-stepper-new";

// Step 1: Business Information
export function BusinessInfoStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Business Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Tell us about your appraisal business
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Name *
        </label>
        <input
          type="text"
          value={data.businessName || ""}
          onChange={(e) => onDataChange({ businessName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Coastal Appraisal Group, LLC"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Type *
        </label>
        <select
          value={data.businessType || ""}
          onChange={(e) => onDataChange({ businessType: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Business type"
        >
          <option value="">Select Type</option>
          <option value="LLC">LLC</option>
          <option value="Corporation">Corporation</option>
          <option value="Partnership">Partnership</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            EIN (Tax ID)
          </label>
          <input
            type="text"
            value={data.ein || ""}
            onChange={(e) => onDataChange({ ein: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="12-3456789"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Year Established
          </label>
          <input
            type="number"
            value={data.yearEstablished || ""}
            onChange={(e) => onDataChange({ yearEstablished: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="2010"
          />
        </div>
      </div>
    </div>
  );
}

// Step 2: Business Contact
export function BusinessContactStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Business Contact Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          How can clients and banks reach your business?
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Email *
        </label>
        <input
          type="email"
          value={data.businessEmail || ""}
          onChange={(e) => onDataChange({ businessEmail: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="info@coastalappraisal.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Main Phone *
          </label>
          <input
            type="tel"
            value={data.businessPhone || ""}
            onChange={(e) => onDataChange({ businessPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fax (optional)
          </label>
          <input
            type="tel"
            value={data.businessFax || ""}
            onChange={(e) => onDataChange({ businessFax: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="(555) 987-6543"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Address *
        </label>
        <input
          type="text"
          value={data.businessAddress || ""}
          onChange={(e) => onDataChange({ businessAddress: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
          placeholder="123 Business Plaza"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <input
            type="text"
            value={data.businessCity || ""}
            onChange={(e) => onDataChange({ businessCity: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="City"
          />
          <input
            type="text"
            value={data.businessState || ""}
            onChange={(e) => onDataChange({ businessState: e.target.value })}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="State"
          />
          <input
            type="text"
            value={data.businessZip || ""}
            onChange={(e) => onDataChange({ businessZip: e.target.value })}
            className="col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ZIP Code"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website (optional)
        </label>
        <input
          type="url"
          value={data.website || ""}
          onChange={(e) => onDataChange({ website: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://www.coastalappraisal.com"
        />
      </div>
    </div>
  );
}

// Step 3: Owner Profile (NEW - Key step for business owners)
export function OwnerProfileStep({ data, onDataChange }: StepComponentProps) {
  const ownerIsAppraiser = data.ownerIsAppraiser ?? true; // Default to true
  const ownerLicenses = data.ownerLicenses || [];
  
  const addOwnerLicense = () => {
    const newLicense = {
      id: Date.now().toString(),
      number: '',
      state: '',
      expiry: ''
    };
    onDataChange({ ownerLicenses: [...ownerLicenses, newLicense] });
  };
  
  const removeOwnerLicense = (id: string) => {
    onDataChange({
      ownerLicenses: ownerLicenses.filter((license: any) => license.id !== id)
    });
  };
  
  const updateOwnerLicense = (id: string, field: string, value: string) => {
    onDataChange({
      ownerLicenses: ownerLicenses.map((license: any) =>
        license.id === id ? { ...license, [field]: value } : license
      )
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Your Profile
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Information about you as the business owner/admin
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> This is your personal info as the admin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.ownerFirstName || ""}
            onChange={(e) => onDataChange({ ownerFirstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Sarah"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.ownerLastName || ""}
            onChange={(e) => onDataChange({ ownerLastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Martinez"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Title *
        </label>
        <input
          type="text"
          value={data.ownerTitle || ""}
          onChange={(e) => onDataChange({ ownerTitle: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Owner & President"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Direct Phone
        </label>
        <input
          type="tel"
          value={data.ownerPhone || ""}
          onChange={(e) => onDataChange({ ownerPhone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Key Checkbox: Do you also work as an appraiser? */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={ownerIsAppraiser}
            onChange={(e) => onDataChange({ ownerIsAppraiser: e.target.checked })}
            className="w-5 h-5 text-primary rounded focus:ring-primary mt-0.5 flex-shrink-0"
          />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
              I also work as an appraiser
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              We'll create your appraiser profile and you can add your licenses
            </span>
          </div>
        </label>
      </div>

      {/* Show License Fields if Owner is Appraiser */}
      {ownerIsAppraiser && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Your Appraiser Licenses
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add your professional licenses. These will be part of your appraiser profile.
          </p>

          {ownerLicenses.length === 0 ? (
            <div className="text-center py-6 bg-white dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                No licenses added yet
              </p>
              <button
                type="button"
                onClick={addOwnerLicense}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
              >
                Add Your First License
              </button>
            </div>
          ) : (
            <>
              {ownerLicenses.map((license: any, index: number) => (
                <div
                  key={license.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeOwnerLicense(license.id)}
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={license.number}
                        onChange={(e) => updateOwnerLicense(license.id, 'number', e.target.value)}
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
                          onChange={(e) => updateOwnerLicense(license.id, 'state', e.target.value)}
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
                          onChange={(e) => updateOwnerLicense(license.id, 'expiry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          aria-label="License expiration date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addOwnerLicense}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Another License
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Step 4: Team Setup
export function TeamSetupStep({ data, onDataChange }: StepComponentProps) {
  const teamMembers = data.teamMembers || [];
  
  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: ''
    };
    onDataChange({ teamMembers: [...teamMembers, newMember] });
  };
  
  const removeTeamMember = (id: string) => {
    onDataChange({
      teamMembers: teamMembers.filter((member: any) => member.id !== id)
    });
  };
  
  const updateTeamMember = (id: string, field: string, value: string) => {
    onDataChange({
      teamMembers: teamMembers.map((member: any) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Team Setup</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Invite team members to join your business (optional)
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-2">Team members will complete their own profiles</p>
            <p>
              All appraisers you add here will receive an email invitation to complete their own 
              profiles (licenses, specialties, etc.). As an admin, you can wait for them to finish 
              or add their profile details later from your dashboard if needed.
            </p>
          </div>
        </div>
      </div>

      <div>
        {teamMembers.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              No team members added yet
            </p>
            <button
              type="button"
              onClick={addTeamMember}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors"
            >
              Add Your First Team Member
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {teamMembers.map((member: any, index: number) => (
              <div
                key={member.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 relative"
              >
                <button
                  type="button"
                  onClick={() => removeTeamMember(member.id)}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  aria-label="Remove team member"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="space-y-3 pr-8">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Team Member {index + 1}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="Full name"
                    />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <select
                    value={member.role}
                    onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    aria-label="Team member role"
                  >
                    <option value="">Select Role</option>
                    <option value="Appraiser">Appraiser (will receive email invite)</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Administrative Staff</option>
                  </select>

                  {/* Visual indicator for appraisers */}
                  {member.role === 'Appraiser' && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-2">
                      <Mail className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>
                        <strong className="text-green-700 dark:text-green-300">Email invite will be sent</strong> to complete their profile
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addTeamMember}
              className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Another Team Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

