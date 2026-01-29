"use client";

import { useState } from "react";
import { X, CheckCircle2, LayoutDashboard, ClipboardList, FileText, Users, Briefcase, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface FirstTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'vendor' | 'business';
  ownerIsAppraiser?: boolean;
}

interface ModalStep {
  title: string;
  subtitle: string;
  items: {
    number: number;
    icon: any;
    title: string;
    description: string;
  }[];
}

export function FirstTimeModal({ isOpen, onClose, userType, ownerIsAppraiser }: FirstTimeModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  // Define steps based on user type
  const steps: ModalStep[] = userType === 'vendor' ? [
    // INDIVIDUAL VENDOR - STEP 1
    {
      title: "Welcome to Your Dashboard",
      subtitle: "Your command center for managing all your appraisal work",
      items: [
        {
          number: 1,
          icon: LayoutDashboard,
          title: "Quick Metrics at a Glance",
          description: "See your active bids, turnaround time, and completion rate updated in real-time"
        },
        {
          number: 2,
          icon: TrendingUp,
          title: "Performance Charts",
          description: "Track your turnaround trends and acceptance rates over time"
        },
        {
          number: 3,
          icon: ClipboardList,
          title: "Active Work Widget",
          description: "See all your current assignments in one place with status indicators"
        }
      ]
    },
    // INDIVIDUAL VENDOR - STEP 2
    {
      title: "Managing Your Requests",
      subtitle: "All your appraisal bids and assignments in one organized place",
      items: [
        {
          number: 1,
          icon: ClipboardList,
          title: "Three Key Tabs",
          description: "Active bids, New invitations, and Completed history - filter by bank, status, or date"
        },
        {
          number: 2,
          icon: CheckCircle2,
          title: "Accept or Decline Bids",
          description: "Review property details and decide which bids to take with one-click actions"
        },
        {
          number: 3,
          icon: FileText,
          title: "Track Deadlines",
          description: "See due dates and get alerts for upcoming deadlines so you never miss one"
        }
      ]
    },
    // INDIVIDUAL VENDOR - STEP 3
    {
      title: "Keep Your Profile Current",
      subtitle: "Your professional profile is how banks find and evaluate you",
      items: [
        {
          number: 1,
          icon: FileText,
          title: "Update Licenses Regularly",
          description: "Keep license numbers and expiration dates current - we'll alert you before expiration"
        },
        {
          number: 2,
          icon: LayoutDashboard,
          title: "Manage Coverage Areas",
          description: "Update the states, counties, and ZIP codes you service - more coverage means more opportunities"
        },
        {
          number: 3,
          icon: CheckCircle2,
          title: "Upload Sample Reports",
          description: "Showcase your work quality to attract premium banks who value expertise"
        }
      ]
    }
  ] : ownerIsAppraiser ? [
    // BUSINESS OWNER-APPRAISER - STEP 1
    {
      title: "Your Dual-Role Dashboard",
      subtitle: "Manage your business AND see your personal work in one place",
      items: [
        {
          number: 1,
          icon: TrendingUp,
          title: "Business Metrics at Top",
          description: "See total bids, team utilization, business rating, and late items at a glance"
        },
        {
          number: 2,
          icon: LayoutDashboard,
          title: '"My Work" Section',
          description: "Your personal appraiser activity is highlighted separately so you can track your own bids"
        },
        {
          number: 3,
          icon: Users,
          title: "Team Activity Overview",
          description: "See who's busy, who's available, and who needs help - spot bottlenecks instantly"
        }
      ]
    },
    // BUSINESS OWNER-APPRAISER - STEP 2
    {
      title: "Bids & Team Management",
      subtitle: "Assign work efficiently and track your team's progress",
      items: [
        {
          number: 1,
          icon: Briefcase,
          title: "Unassigned Bids Queue",
          description: "See all new bids that need assignment - assign to team members with one click"
        },
        {
          number: 2,
          icon: CheckCircle2,
          title: "Assigned Work Tracking",
          description: "Monitor progress on all assigned appraisals and see who's on schedule or behind"
        },
        {
          number: 3,
          icon: ClipboardList,
          title: "Smart Assignment",
          description: "Filter by coverage area and license to assign work to the right person"
        }
      ]
    },
    // BUSINESS OWNER-APPRAISER - STEP 3
    {
      title: "Documents & Your Profile",
      subtitle: "Manage team licenses and your personal appraiser credentials",
      items: [
        {
          number: 1,
          icon: FileText,
          title: "Team Licenses Aggregated",
          description: "See all team licenses in one view with expiration tracking - your licenses show with 'You' badge"
        },
        {
          number: 2,
          icon: LayoutDashboard,
          title: "Your Appraiser Profile",
          description: "Access 'My Profile' in Team & Profiles to manage your personal appraiser credentials"
        },
        {
          number: 3,
          icon: CheckCircle2,
          title: "Business Documents Separate",
          description: "Company insurance and business docs are kept separate from personal appraiser licenses"
        }
      ]
    }
  ] : [
    // BUSINESS MANAGER - STEP 1
    {
      title: "Your Business Dashboard",
      subtitle: "Monitor team performance and business health at a glance",
      items: [
        {
          number: 1,
          icon: TrendingUp,
          title: "Business-Level Metrics",
          description: "Total bids, team utilization, business rating, and late items - focus on what matters"
        },
        {
          number: 2,
          icon: LayoutDashboard,
          title: "Team Performance Charts",
          description: "Compare team member productivity and identify top performers with visual insights"
        },
        {
          number: 3,
          icon: ClipboardList,
          title: "Activity Feed",
          description: "Stay updated on team acceptances, completions, and important milestones"
        }
      ]
    },
    // BUSINESS MANAGER - STEP 2
    {
      title: "Bid Assignment & Tracking",
      subtitle: "Route work to the right team members efficiently",
      items: [
        {
          number: 1,
          icon: Briefcase,
          title: "Unassigned Bids Queue",
          description: "See all incoming bids waiting for assignment - assign based on license coverage and availability"
        },
        {
          number: 2,
          icon: CheckCircle2,
          title: "Assignment Dashboard",
          description: "Track who's working on what with real-time status updates - know exactly where every job stands"
        },
        {
          number: 3,
          icon: ClipboardList,
          title: "Deadline Alerts",
          description: "Get notified when team members have approaching or overdue deadlines"
        }
      ]
    },
    // BUSINESS MANAGER - STEP 3
    {
      title: "Team & Document Management",
      subtitle: "Build and manage your appraiser team effectively",
      items: [
        {
          number: 1,
          icon: Users,
          title: "Create Appraiser Profiles",
          description: "Set up professional profiles for each team member - banks will see your team's credentials"
        },
        {
          number: 2,
          icon: CheckCircle2,
          title: "Invite Team Members",
          description: "Send email invitations and let them complete their own profiles"
        },
        {
          number: 3,
          icon: FileText,
          title: "License Tracking",
          description: "View all team licenses in one place with expiration alerts - never miss a renewal"
        }
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      router.push('/get-started');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl pointer-events-auto animate-in zoom-in-95 duration-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="flex-1 p-12 flex flex-col">
              {/* Step Counter and Progress Dots */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentStep 
                          ? 'w-8 bg-primary' 
                          : index < currentStep
                          ? 'w-1.5 bg-primary/50'
                          : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {currentStepData.subtitle}
                </p>

                {/* Items List */}
                <div className="space-y-5">
                  {currentStepData.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.number} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 0 ? (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Skip
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  {isLastStep ? "Get Started →" : "Next →"}
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block w-96 relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: 'url(/others/realwired-stock-image.png)' }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2652B1]/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
