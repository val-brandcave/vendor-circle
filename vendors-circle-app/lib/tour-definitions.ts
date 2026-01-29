// Tour Definitions for Different Pages
import { TourStep } from '@/components/guided-tour';

/**
 * Vendor Dashboard Tour
 * Shows first-time vendors the key features of their dashboard
 */
export const vendorDashboardTour: TourStep[] = [
  {
    id: 'welcome',
    title: '👋 Welcome to Your Dashboard!',
    text: [
      'This is your command center for managing appraisal requests and tracking your work.',
      'Let\'s take a quick tour of the key features.'
    ],
    buttons: [
      {
        text: 'Start Tour',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'Skip',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'metrics',
    title: '📊 Your Performance Metrics',
    text: 'Here you can see your active bids, acceptance rate, and average turnaround time at a glance.',
    attachTo: { element: '.metrics-section', on: 'bottom' },
  },
  {
    id: 'recent-requests',
    title: '📋 Recent Requests',
    text: 'View and manage your most recent appraisal requests. Click on any request to see details.',
    attachTo: { element: '.recent-requests', on: 'top' },
  },
  {
    id: 'get-started',
    title: '🚀 Complete Your Profile',
    text: [
      'Don\'t forget to complete your "Get Started" tasks!',
      'A complete profile helps banks find you for more opportunities.'
    ],
    attachTo: { element: 'a[href="/get-started"]', on: 'right' },
  },
  {
    id: 'navigation',
    title: '🧭 Easy Navigation',
    text: 'Use the sidebar to access all your tools: requests, documents, profile settings, and more.',
    attachTo: { element: 'nav', on: 'right' },
  },
  {
    id: 'help',
    title: '❓ Need Help?',
    text: 'Click here anytime to access help resources, documentation, and support.',
    attachTo: { element: 'a[href="#help"]', on: 'left' },
    buttons: [
      {
        text: 'Got it!',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

/**
 * Business Dashboard Tour
 * Shows business admins how to manage their team and bids
 */
export const businessDashboardTour: TourStep[] = [
  {
    id: 'welcome',
    title: '🎉 Welcome to Your Business Dashboard!',
    text: [
      'This is your hub for managing bids, team members, and business performance.',
      'Let\'s show you around!'
    ],
    buttons: [
      {
        text: 'Show Me',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'Maybe Later',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'metrics-top',
    title: '📈 Business Metrics',
    text: 'Your key business metrics are always visible at the top: total bids, completion rate, and coverage.',
    attachTo: { element: '.business-metrics', on: 'bottom' },
  },
  {
    id: 'team-work',
    title: '👥 Team Performance',
    text: 'Monitor your team\'s work and see who\'s handling what. Keep track of assignments and workload.',
    attachTo: { element: '.team-section', on: 'top' },
  },
  {
    id: 'bids-assignments',
    title: '💼 Manage Bids & Assignments',
    text: 'Access the Bids & Assignments page to assign work to your team members.',
    attachTo: { element: 'a[href="/business/bids-assignments"]', on: 'right' },
  },
  {
    id: 'profiles',
    title: '📝 Appraiser Profiles',
    text: 'Create and manage professional profiles for your appraisers. Banks see these profiles when matching work.',
    attachTo: { element: 'a[href="/business/team"]', on: 'right' },
  },
  {
    id: 'complete',
    title: '✅ You\'re All Set!',
    text: 'You\'re ready to start managing your business. Need help? Click the Help icon anytime.',
    buttons: [
      {
        text: 'Finish',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

/**
 * Get Started Page Tour
 * Explains the setup tasks system
 */
export const getStartedTour: TourStep[] = [
  {
    id: 'intro',
    title: '🚀 Welcome to Get Started',
    text: [
      'This is your setup checklist to get your profile ready for banks.',
      'Complete these tasks to increase your visibility and get more work!'
    ],
    buttons: [
      {
        text: 'Show Me How',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'I\'ll Figure It Out',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'progress',
    title: '📊 Track Your Progress',
    text: 'Your completion percentage updates automatically as you finish tasks.',
    attachTo: { element: '.progress-bar', on: 'bottom' },
  },
  {
    id: 'next-step',
    title: '🎯 Focus on What\'s Next',
    text: 'We\'ll always show you the most important task to complete next. Click "Start Task" to begin.',
    attachTo: { element: '.next-step-card', on: 'top' },
  },
  {
    id: 'upcoming',
    title: '👀 See What\'s Coming',
    text: 'View all remaining tasks below. You can complete them in any order you prefer.',
    attachTo: { element: '.upcoming-steps', on: 'top' },
  },
  {
    id: 'complete-message',
    title: '🎉 100% = Success!',
    text: [
      'When you complete all tasks, your profile will be fully optimized.',
      'Banks can find you more easily, and you\'ll get more opportunities!'
    ],
    buttons: [
      {
        text: 'Let\'s Go!',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

/**
 * Documents Page Tour
 * Explains document management
 */
export const documentsTour: TourStep[] = [
  {
    id: 'intro',
    title: '📁 Document Management',
    text: 'Keep all your professional documents organized in one place. Banks may request these for verification.',
    buttons: [
      {
        text: 'Learn More',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'Skip',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'tabs',
    title: '🗂️ Document Categories',
    text: 'Documents are organized into tabs: Licenses, Professional Docs, and Insurance. Use the tabs to navigate.',
    attachTo: { element: '.document-tabs', on: 'bottom' },
  },
  {
    id: 'upload',
    title: '⬆️ Upload Documents',
    text: 'Click the upload button to add new documents. Accepted formats: PDF, JPG, PNG.',
    attachTo: { element: '.upload-button', on: 'left' },
  },
  {
    id: 'expiry',
    title: '⚠️ Expiration Tracking',
    text: 'We\'ll notify you when documents are about to expire so you can renew them on time.',
    buttons: [
      {
        text: 'Got It',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

/**
 * Bids & Assignments Tour (Business)
 * Explains bid management and assignment
 */
export const bidsAssignmentsTour: TourStep[] = [
  {
    id: 'intro',
    title: '💼 Bids & Assignments Hub',
    text: 'This is where you manage incoming bids and assign work to your team members.',
    buttons: [
      {
        text: 'Show Me',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'Skip Tour',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'tabs',
    title: '🔀 Two Views',
    text: 'Toggle between "Unassigned Bids" (new work) and "Assigned Work" (in progress).',
    attachTo: { element: '.tabs-section', on: 'bottom' },
  },
  {
    id: 'assign',
    title: '👤 Assign to Team',
    text: 'Click "Assign to Team Member" to match work with the right appraiser based on their skills and availability.',
    attachTo: { element: '.assign-button', on: 'left' },
  },
  {
    id: 'tracking',
    title: '📊 Track Progress',
    text: 'Once assigned, monitor progress, deadlines, and completion status in the "Assigned Work" tab.',
    buttons: [
      {
        text: 'Start Assigning!',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

/**
 * Team & Profiles Tour (Business)
 * Explains team and profile management
 */
export const teamProfilesTour: TourStep[] = [
  {
    id: 'intro',
    title: '👥 Team & Profiles',
    text: [
      'Manage your team members and create professional appraiser profiles.',
      'Remember: Users ≠ Profiles. One person can have both!'
    ],
    buttons: [
      {
        text: 'Tell Me More',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.next(); }
      },
      {
        text: 'Skip',
        classes: 'shepherd-button-secondary',
        action: function(this: any) { this.cancel(); }
      }
    ],
  },
  {
    id: 'difference',
    title: '🤔 Users vs. Profiles',
    text: [
      '<strong>Users:</strong> People who can log in and use the system.',
      '<strong>Profiles:</strong> Professional appraisers that banks see and assign work to.',
      'One user can manage multiple profiles, or have their own profile.'
    ],
  },
  {
    id: 'create-profile',
    title: '➕ Create Profiles',
    text: 'Click "Create Profile" to add a new appraiser profile with licenses, coverage areas, and specialties.',
    attachTo: { element: '.create-profile-button', on: 'left' },
  },
  {
    id: 'profiles-list',
    title: '📋 Manage Profiles',
    text: 'View all your appraiser profiles here. Edit details, update licenses, and manage their status.',
    attachTo: { element: '.profiles-list', on: 'top' },
  },
  {
    id: 'complete',
    title: '✨ Build Your Team',
    text: 'Start creating profiles for your appraisers so banks can see your team\'s capabilities!',
    buttons: [
      {
        text: 'Let\'s Build!',
        classes: 'shepherd-button-primary',
        action: function(this: any) { this.complete(); }
      }
    ],
  },
];

// Export all tours
export const tourDefinitions = {
  'vendor-dashboard': vendorDashboardTour,
  'business-dashboard': businessDashboardTour,
  'get-started': getStartedTour,
  'documents': documentsTour,
  'bids-assignments': bidsAssignmentsTour,
  'team-profiles': teamProfilesTour,
};
