"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OnboardingStepper, StepComponentProps } from "@/components/onboarding-stepper-new";
import { isAuthenticated } from "@/lib/auth/auth-utils";
import { User, Building2, Settings, CheckCircle } from "lucide-react";

// Step 1: Personal Information
function PersonalInfoStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Let's start with your basic information
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
            placeholder="Sara"
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
            placeholder="Cheng"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) => onDataChange({ email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="sara.cheng@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Title *
        </label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => onDataChange({ title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="Vendor Management Director"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Direct Phone
        </label>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => onDataChange({ phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>
    </div>
  );
}

// Step 2: Organization Information
function OrganizationStep({ data, onDataChange }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Organization Information
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Tell us about your bank or lending institution
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Organization Name *
        </label>
        <input
          type="text"
          value={data.organizationName || ""}
          onChange={(e) => onDataChange({ organizationName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="First National Bank"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Organization Type *
        </label>
        <select
          value={data.organizationType || ""}
          onChange={(e) => onDataChange({ organizationType: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="">Select Type</option>
          <option value="Bank">Bank</option>
          <option value="Credit Union">Credit Union</option>
          <option value="Mortgage Lender">Mortgage Lender</option>
          <option value="AMC">Appraisal Management Company</option>
          <option value="Other">Other Financial Institution</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Department *
        </label>
        <input
          type="text"
          value={data.department || ""}
          onChange={(e) => onDataChange({ department: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          placeholder="Vendor Management"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Primary Location
        </label>
        <input
          type="text"
          value={data.location || ""}
          onChange={(e) => onDataChange({ location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent mb-2"
          placeholder="123 Main Street"
        />
        <div className="grid grid-cols-2 gap-2">
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
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of Active Vendors
        </label>
        <select
          value={data.numVendors || ""}
          onChange={(e) => onDataChange({ numVendors: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="">Select Range</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="101-500">101-500</option>
          <option value="500+">500+</option>
        </select>
      </div>
    </div>
  );
}

// Step 3: Preferences
function PreferencesStep({ data, onDataChange }: StepComponentProps) {
  const togglePreference = (key: string, value: boolean) => {
    onDataChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Platform Preferences
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Customize your platform experience
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Notification Preferences</h3>

        <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
          <input
            type="checkbox"
            checked={data.notifyNewVendors || false}
            onChange={(e) => togglePreference("notifyNewVendors", e.target.checked)}
            className="w-5 h-5 text-gray-600 rounded focus:ring-gray-500 mt-0.5"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">New Vendor Registrations</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Get notified when new vendors register and complete their profiles
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
          <input
            type="checkbox"
            checked={data.notifyProfileUpdates || false}
            onChange={(e) => togglePreference("notifyProfileUpdates", e.target.checked)}
            className="w-5 h-5 text-gray-600 rounded focus:ring-gray-500 mt-0.5"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Profile Updates</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Receive alerts when vendors update licenses or credentials
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
          <input
            type="checkbox"
            checked={data.notifyExpirations || false}
            onChange={(e) => togglePreference("notifyExpirations", e.target.checked)}
            className="w-5 h-5 text-gray-600 rounded focus:ring-gray-500 mt-0.5"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">License Expirations</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Alert me when vendor licenses are approaching expiration
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
          <input
            type="checkbox"
            checked={data.notifyMessages || false}
            onChange={(e) => togglePreference("notifyMessages", e.target.checked)}
            className="w-5 h-5 text-gray-600 rounded focus:ring-gray-500 mt-0.5"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Vendor Messages</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Get notified when vendors send messages or questions
            </div>
          </div>
        </label>
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">Display Preferences</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Vendor List View
          </label>
          <select
            value={data.defaultView || "table"}
            onChange={(e) => onDataChange({ defaultView: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="table">Table View</option>
            <option value="grid">Grid View</option>
            <option value="map">Map View</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Items Per Page
          </label>
          <select
            value={data.itemsPerPage || "25"}
            onChange={(e) => onDataChange({ itemsPerPage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Step 4: Review
function ReviewStep({ data }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Review Your Profile
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Confirm your information before completing setup
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Personal Information</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Name:</strong> {data.firstName} {data.lastName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            {data.title && (
              <p>
                <strong>Title:</strong> {data.title}
              </p>
            )}
            {data.phone && (
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Organization</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Name:</strong> {data.organizationName}
            </p>
            {data.organizationType && (
              <p>
                <strong>Type:</strong> {data.organizationType}
              </p>
            )}
            {data.department && (
              <p>
                <strong>Department:</strong> {data.department}
              </p>
            )}
            {data.location && (
              <p>
                <strong>Location:</strong> {data.location}, {data.city}, {data.state}
              </p>
            )}
            {data.numVendors && (
              <p>
                <strong>Active Vendors:</strong> {data.numVendors}
              </p>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Preferences</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">Notifications enabled for:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {data.notifyNewVendors && <li>New vendor registrations</li>}
              {data.notifyProfileUpdates && <li>Profile updates</li>}
              {data.notifyExpirations && <li>License expirations</li>}
              {data.notifyMessages && <li>Vendor messages</li>}
              {!data.notifyNewVendors &&
                !data.notifyProfileUpdates &&
                !data.notifyExpirations &&
                !data.notifyMessages && (
                  <li className="text-gray-400">No notifications enabled</li>
                )}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-800 dark:text-green-300">
          🎉 <strong>All set!</strong> Your administrator account is ready. You can now manage
          vendors, review profiles, and configure your organization settings.
        </p>
      </div>
    </div>
  );
}

// Main Admin Onboarding Page
export default function AdminOnboardingPage() {
  const router = useRouter();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // Not logged in, redirect to signup
      router.push('/signup');
    }
  }, [router]);

  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      description: "Your information",
      component: PersonalInfoStep,
    },
    {
      id: "organization",
      title: "Organization",
      description: "Your institution details",
      component: OrganizationStep,
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Platform settings",
      component: PreferencesStep,
    },
    {
      id: "review",
      title: "Review",
      description: "Confirm your information",
      component: ReviewStep,
    },
  ];

  const handleComplete = (data: Record<string, any>) => {
    console.log("Admin onboarding complete:", data);
    // Save to localStorage/API
    localStorage.setItem("adminProfile", JSON.stringify(data));
    // Mark onboarding as complete
    localStorage.setItem("onboardingComplete-admin", "true");
    // Redirect to admin dashboard
    router.push("/admin");
  };

  const handleSkip = () => {
    // Mark as skipped but not complete
    localStorage.setItem("onboardingSkipped-admin", "true");
    router.push("/admin");
  };

  return (
    <OnboardingStepper
      steps={steps}
      title="User Onboarding"
      onComplete={handleComplete}
      onSkip={handleSkip}
      showSkip={true}
      themeColor="blue"
    />
  );
}
