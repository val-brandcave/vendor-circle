# FINAL IMPLEMENTATION PLAN - January 13, 2026
## Vendors Circle Redesign - Ready for Execution

**Created:** January 20, 2026  
**Status:** 🟢 READY TO IMPLEMENT  
**Based On:** Jan 13, 2026 Client Meeting + Val's Clarifications  
**Start Date:** Immediately  

---

## 📋 TABLE OF CONTENTS

1. [Architecture Overview](#architecture-overview)
2. [Page Structure (New & Modified)](#page-structure-new--modified)
3. [First-Time vs Returning User Flows](#first-time-vs-returning-user-flows)
4. [Phase 1: Critical Foundation (Week 1-2)](#phase-1-critical-foundation-week-1-2)
5. [Phase 2: Onboarding Polish (Week 2-3)](#phase-2-onboarding-polish-week-2-3)
6. [Phase 3: Business Features (Week 3-4)](#phase-3-business-features-week-3-4)
7. [Component Specifications](#component-specifications)
8. [Implementation Checklist](#implementation-checklist)

---

## 🏗️ ARCHITECTURE OVERVIEW

### The Unified Account Model

**Key Decision:** Remove account type selection. Single unified signup flow.

**User Types (Determined During Onboarding):**
- **Individual Vendor:** Solo appraiser (1 profile)
- **Business Admin:** Manages team (multiple profiles)

**How We Know Which Type:**
- During onboarding: "Are you an appraiser?"
  - Yes + No team → Individual Vendor
  - Yes + Has team → Business Admin (who is also appraiser)
  - No + Has team → Business Admin (admin only)

---

## 📄 PAGE STRUCTURE (NEW & MODIFIED)

### ✨ NEW PAGES TO CREATE

#### **1. Individual Vendor Dashboard** 🆕
- **Route:** `/vendor/dashboard` or `/vendor`
- **Purpose:** Landing page for individual vendors
- **Replaces:** Nothing (new addition)
- **Contains:**
  - Performance metrics (4 cards)
  - Charts (2-3 visualizations)
  - Quick access to urgent work
  - Recent activity feed
- **States:**
  - **First-time:** Metrics show zeros, empty charts, empty states
  - **Returning:** Real data, trends, work items

#### **2. Get Started Page** 🆕
- **Route:** `/get-started` or `/onboarding-tasks`
- **Purpose:** Task list for completing profile setup
- **Lifecycle:** Appears for first-time users, disappears when 100% complete
- **Contains:**
  - "Your Next Step" card (large, with placeholder image)
  - Upcoming steps (expandable list)
  - Progress indicator (X of Y complete)
- **Pattern:** Specretary-style task cards

#### **3. Business Dashboard** (Already Exists, Needs Updates)
- **Route:** `/business/dashboard` or `/business`
- **Updates Needed:**
  - Move business metrics to top
  - Add charts (2-3)
  - Add team's active work widget
  - Remove "Get Started section" (now separate page)
  - Activity feed at bottom

#### **4. Bids & Assignments Page** 🆕 (Business Only)
- **Route:** `/business/bids-assignments`
- **Purpose:** Business-level bid management with assignment
- **Contains:**
  - Unassigned Bids tab
  - Assigned Work tab
  - Team Capacity view
  - Assignment modal

---

### 🔄 MODIFIED PAGES

#### **My Requests Page** (Individual Vendor)
- **Current:** Landing page with Bids/Reports tabs
- **Change:** NO LONGER landing page
- **New Role:** Just bids/reports table (no metrics added)
- **Navigation:** Second item in nav (after Dashboard)

#### **Auth Pages** (Sign In, Sign Up, etc.)
- **Change:** Split-pane layout (Alchemyca pattern)
- **Left:** Form
- **Right:** Hero image (placeholder for now)

#### **Onboarding Wizard**
- **Changes:**
  - Add Welcome screen (first step)
  - Update visual controls (Specretary pattern)
  - Sidebar progress indicator
  - Back/Continue buttons
  - Remove multiple skip buttons
  - Add "Are you an appraiser?" fork

#### **Help & Resources Modal**
- **Change:** Replace "Take Product Tour" with "Get Started"
- **Options:**
  - Documentation
  - Get Started (opens Get Started page/modal)
  - Contact Support

---

### 📊 NAVIGATION STRUCTURE

#### **Individual Vendor (First-Time User):**
```
Top Section:
├── 🏠 Dashboard (NEW - landing)
├── 🚀 Get Started (3/6) ← NEW, shows until complete
├── 📊 My Requests
├── ✉️ Invites
├── 📄 My Documents
└── 👤 My Profile

Bottom Section:
├── ⚙️ Account Settings
└── ❓ Help & Support
```

#### **Individual Vendor (Returning User):**
```
Top Section:
├── 🏠 Dashboard (landing)
├── 📊 My Requests
├── ✉️ Invites
├── 📄 My Documents
└── 👤 My Profile

Bottom Section:
├── ⚙️ Account Settings
└── ❓ Help & Support
```

#### **Business (First-Time User):**
```
Top Section:
├── 🏠 Dashboard (landing)
├── 🚀 Get Started (2/5) ← NEW, shows until complete
├── 📊 Bids & Assignments (NEW)
├── ✉️ Invites
├── 👥 Team & Profiles
└── 📈 Reports (future)

Bottom Section:
├── 🏢 Business Settings
├── ⚙️ Account Settings
└── ❓ Help & Support
```

#### **Business (Returning User):**
```
Top Section:
├── 🏠 Dashboard
├── 📊 Bids & Assignments
├── ✉️ Invites
├── 👥 Team & Profiles
└── 📈 Reports (future)

Bottom Section:
├── 🏢 Business Settings
├── ⚙️ Account Settings
└── ❓ Help & Support
```

---

## 👥 FIRST-TIME VS RETURNING USER FLOWS

### First-Time User Journey

**1. Sign Up & Verification**
```
[Sign Up Page] (split-pane)
    ↓
[Email Verification]
    ↓
[Welcome Screen Modal] ← NEW
    ↓
[Onboarding Wizard] (6-7 steps, Specretary pattern)
    ↓
[Dashboard]
```

**2. On Dashboard (First Load):**
- Sees metrics with zeros/empty data
- Sees empty charts
- Sees empty states ("No bids yet")
- **Notices "Get Started" in side nav** with progress (0/6)

**3. User Clicks "Get Started" in Nav:**
```
[Get Started Page] ← SEPARATE PAGE
    ↓
Shows "Your Next Step" card
Shows upcoming tasks
User completes tasks
    ↓
Progress updates (3/6, 4/6, etc.)
    ↓
When 100% complete:
Get Started page disappears
Get Started nav item disappears
User is now "Returning User"
```

---

### Returning User Journey

**1. Login:**
```
[Sign In Page] (split-pane)
    ↓
[Dashboard] (with real data)
```

**2. On Dashboard:**
- Sees real metrics
- Sees real charts
- Sees active work
- Sees activity feed
- **NO "Get Started" in nav** (already complete)

**3. If Needs Help:**
- Clicks **Help & Resources** (? icon)
- Modal shows:
  - Documentation
  - **Get Started** (can review tasks again)
  - Contact Support

---

## 🎯 PHASE 1: CRITICAL FOUNDATION (WEEK 1-2)

**Goal:** Remove friction, implement unified model, create new dashboard

---

### TASK 1.1: Remove Account Type Selection 🔴

**What:**
- Remove `/account-type` page
- Single signup flow for everyone
- Account type determined during onboarding

**Implementation:**
1. Delete `app/(auth)/account-type/page.tsx`
2. Update signup flow to skip account type
3. Redirect after email verification → Welcome screen

**Estimated Time:** 1-2 hours

---

### TASK 1.2: Create Welcome Screen Modal 🔴

**What:**
- First thing user sees after email verification
- Ed's specific requirements
- Sets expectations, reduces anxiety

**Design Specs:**

**Layout:**
```
┌─────────────────────────────────────────────────┐
│          [Vendors Circle Logo]                  │
│                                                 │
│      Welcome to Vendors Circle! 🎉              │
│   We're so excited to have you here             │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  📦 What You'll Gain:                           │
│     ✓ One place for all your credentials       │
│     ✓ Connect with multiple banks easily       │
│     ✓ Update once, notify everyone             │
│     ✓ Professional profile that stands out     │
│                                                 │
│  🕐 What to Expect:                             │
│     • Takes about 5 minutes                     │
│     • We'll ask 6 questions                     │
│     • Your progress is saved automatically      │
│     • You can skip and come back anytime        │
│                                                 │
│  📋 Get Ready:                                  │
│     Have these handy (optional):                │
│     • Your license number(s)                    │
│     • Contact information                       │
│     • Coverage areas you service                │
│                                                 │
│           [Skip for Now]    [Let's Go! →]       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Component:** `components/onboarding/welcome-screen.tsx`

**Props:**
```typescript
interface WelcomeScreenProps {
  onStart: () => void;
  onSkip: () => void;
}
```

**Estimated Time:** 3-4 hours (design + implementation)

---

### TASK 1.3: Update Onboarding Visual Controls 🔴

**What:**
- Specretary-style sidebar progress
- Back/Continue buttons
- Clean headers
- Remove clutter

**Changes:**

**A. Add Sidebar Progress (Left Side, 240px):**
```typescript
// components/onboarding/onboarding-sidebar.tsx
interface Step {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

// Visual states:
// ✓ Completed: Green checkmark
// ● Current: Blue filled circle, bold text
// ○ Upcoming: Gray outlined circle
```

**B. Update Footer Actions:**
```typescript
// Before: Centered "Previous / 5/6 / Next"
// After: Left/Right aligned
[← Back]            [Skip]          [Continue →]
```

**C. Remove:**
- Step descriptions under headers
- Multiple "Skip for Now" buttons
- Page count in navigation

**Files to Update:**
- `app/onboarding-vendor/page.tsx`
- `app/onboarding-business/page.tsx`
- Create: `components/onboarding/onboarding-layout.tsx`
- Create: `components/onboarding/onboarding-sidebar.tsx`
- Create: `components/onboarding/onboarding-footer.tsx`

**Estimated Time:** 6-8 hours

---

### TASK 1.4: Add "Are You an Appraiser?" Fork 🔴

**What:**
- New step in onboarding after basic info
- Determines user experience path

**Step Design:**
```
┌─────────────────────────────────────────────────┐
│ Are you an appraiser?                           │
│                                                 │
│ This helps us customize your experience        │
│                                                 │
│  ┌────────────────────┐  ┌────────────────────┐│
│  │   👤 Yes           │  │   🏢 No            ││
│  │   I'm an appraiser │  │   I'm admin only   ││
│  │                    │  │                    ││
│  └────────────────────┘  └────────────────────┘│
│                                                 │
│           [← Back]           [Continue →]       │
└─────────────────────────────────────────────────┘
```

**Logic:**
- Yes → Continue with profile setup (licenses, coverage, etc.)
- No → Skip profile setup, go to team invitation

**Files to Update:**
- Add new step to onboarding wizard
- Update onboarding flow logic

**Estimated Time:** 2-3 hours

---

### TASK 1.5: Create Individual Vendor Dashboard Page 🔴

**What:**
- NEW landing page for individual vendors
- Shows metrics, charts, activity

**Route:** `/vendor/dashboard`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Welcome back, Tom                               │
│ Last login: 2 hours ago                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ PERFORMANCE METRICS (4-col grid)                │
│ ┌──────┬──────┬──────┬──────┐                  │
│ │Total │Turna-│Compl-│Busn. │                  │
│ │Bids  │round │etion │Rating│                  │
│ │      │Time  │Rate  │      │                  │
│ │  12  │3.2 d │ 94%  │4.7/5 │                  │
│ │Active│↓ 0.3 │↑ 2%  │↑ 0.1 │                  │
│ └──────┴──────┴──────┴──────┘                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CHARTS (2-col grid)                             │
│ ┌──────────────┬──────────────┐                │
│ │Turnaround    │Bid Acceptance│                │
│ │Trend         │Rate          │                │
│ │(Line chart)  │(Bar chart)   │                │
│ └──────────────┴──────────────┘                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ MY ACTIVE WORK                                  │
│ ├─ Urgent Items (2) - expandable               │
│ ├─ Due This Week (5) - expandable              │
│ └─ [View All My Requests →]                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ RECENT ACTIVITY                                 │
│ ├─ You accepted bid from Wells Fargo           │
│ ├─ You submitted report for 123 Main St        │
│ └─ Your CA license was updated                 │
└─────────────────────────────────────────────────┘
```

**States:**

**First-Time User:**
- Metrics: All zeros
- Charts: Empty state ("Not enough data yet")
- Active Work: "No active work yet"
- Activity: "Your activity will appear here"

**Returning User:**
- Real data everywhere

**Files to Create:**
- `app/vendor/dashboard/page.tsx`
- `components/dashboard/metric-card.tsx`
- `components/dashboard/turnaround-chart.tsx`
- `components/dashboard/acceptance-chart.tsx`
- `components/dashboard/active-work-widget.tsx`
- `components/dashboard/activity-feed.tsx`

**Estimated Time:** 12-16 hours (biggest task)

---

### TASK 1.6: Create Get Started Page 🔴

**What:**
- NEW separate page for task completion
- Specretary-style layout
- Shows in nav until 100% complete

**Route:** `/get-started`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Get Started                                     │
│ 3 of 6 completed · 50% complete                │
├─────────────────────────────────────────────────┤
│                                                 │
│ YOUR NEXT STEP                         Step 4/6 │
│                                                 │
│ ┌─────────┐  Complete Your Profile             │
│ │[Image]  │                                     │
│ │Placeholder│ Add your specialties and coverage │
│ │         │  areas so banks can match you with │
│ └─────────┘  the right work.                   │
│                                                 │
│              🕐 Estimated time: 5 minutes       │
│                                                 │
│              [Complete Profile →]               │
│                                                 │
│ ▼ Upcoming Steps (2 remaining)                  │
│                                                 │
│   5. ☐ Upload License Documents       3 mins   │
│   6. ☐ Set Notification Preferences   2 mins   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Tasks to Track (Individual):**
1. ✓ Create account
2. ✓ Verify email
3. ✓ Complete onboarding wizard
4. Complete profile (name, contact)
5. Upload license documents
6. Set coverage areas
7. Add specialties
8. Upload W-9 (optional)

**Tasks to Track (Business):**
1. ✓ Create account
2. Complete business profile
3. Add team members
4. Create appraiser profiles
5. Upload documents

**Files to Create:**
- `app/get-started/page.tsx`
- `components/get-started/next-step-card.tsx`
- `components/get-started/upcoming-steps.tsx`
- `lib/get-started-tasks.ts` (task definitions)
- `hooks/useGetStartedProgress.ts` (track completion)

**Estimated Time:** 8-10 hours

---

### TASK 1.7: Update Navigation 🔴

**What:**
- Add Dashboard as first item
- Add "Get Started" (conditional, first-time only)
- Reorganize (two-tier structure)

**Changes:**

**Individual Vendor Nav:**
```typescript
// Top section (main actions)
const mainNavItems = [
  { icon: Home, label: 'Dashboard', href: '/vendor/dashboard' },
  // Conditional: only show if profile incomplete
  { icon: Rocket, label: 'Get Started', href: '/get-started', badge: `${completed}/${total}` },
  { icon: FileText, label: 'My Requests', href: '/vendor/requests' },
  { icon: Mail, label: 'Invites', href: '/vendor/invites', badge: pendingCount },
  { icon: FileText, label: 'My Documents', href: '/vendor/documents' },
  { icon: User, label: 'My Profile', href: '/vendor/profile' },
];

// Bottom section (settings)
const settingsNavItems = [
  { icon: Settings, label: 'Account Settings', href: '/vendor/settings' },
  { icon: HelpCircle, label: 'Help & Support', onClick: openHelpModal },
];
```

**Business Nav:**
```typescript
const mainNavItems = [
  { icon: Home, label: 'Dashboard', href: '/business/dashboard' },
  // Conditional
  { icon: Rocket, label: 'Get Started', href: '/get-started', badge: `${completed}/${total}` },
  { icon: Briefcase, label: 'Bids & Assignments', href: '/business/bids' },
  { icon: Mail, label: 'Invites', href: '/business/invites' },
  { icon: Users, label: 'Team & Profiles', href: '/business/team' },
];

const settingsNavItems = [
  { icon: Building2, label: 'Business Settings', href: '/business/settings' },
  { icon: Settings, label: 'Account Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', onClick: openHelpModal },
];
```

**Files to Update:**
- `components/vendor-layout.tsx`
- `components/business-layout.tsx`
- `components/side-nav.tsx`

**Estimated Time:** 4-6 hours

---

### TASK 1.8: Update Business Dashboard 🔴

**What:**
- Move metrics to top
- Add charts
- Add team's active work widget
- Remove "Get Started section" (now separate page)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Coastal Appraisal Group Dashboard              │
│ Last updated: 5 minutes ago                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ BUSINESS METRICS (4-col grid)                   │
│ ┌──────┬──────┬──────┬──────┐                  │
│ │Total │Team  │Busn. │Late  │                  │
│ │Bids  │Util. │Rating│Items │                  │
│ │  47  │ 82%  │4.6/5 │3 ⚠️  │                  │
│ │Team  │↑ 5%  │↑ 0.2 │      │                  │
│ └──────┴──────┴──────┴──────┘                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ ADDITIONAL METRICS (3-col grid)                 │
│ ┌──────┬──────┬──────┐                         │
│ │Turna-│Connec│License│                         │
│ │round │ted   │Covera│                         │
│ │      │Banks │ge    │                         │
│ │3.8 d │  12  │6 sts │                         │
│ │↓ 0.4 │      │      │                         │
│ └──────┴──────┴──────┘                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CHARTS (2-col grid)                             │
│ ┌──────────────┬──────────────┐                │
│ │Team          │Bid Volume    │                │
│ │Performance   │Trend         │                │
│ │(Bar)         │(Line)        │                │
│ └──────────────┴──────────────┘                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ TEAM'S ACTIVE WORK                              │
│ ├─ Maria Gonzalez (5) 🟢                       │
│ ├─ David Kim (6) 🟡                            │
│ ├─ James Wilson (8) 🔴 At Capacity             │
│ └─ [View All Assignments →]                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ RECENT ACTIVITY                                 │
│ ├─ David accepted bid from First National      │
│ ├─ Maria completed report for 456 Oak St       │
│ └─ New team member joined: Robert Chen         │
└─────────────────────────────────────────────────┘
```

**Files to Update:**
- `app/business/dashboard/page.tsx`
- Create: `components/business/team-work-widget.tsx`
- Create: `components/business/team-performance-chart.tsx`
- Create: `components/business/bid-volume-chart.tsx`

**Estimated Time:** 10-12 hours

---

### TASK 1.9: Remove Guided Tour Auto-Start 🔴

**What:**
- Remove auto-trigger after onboarding
- Keep tours accessible via Help menu

**Changes:**
1. Remove auto-start logic
2. Update Help & Resources modal
3. Add "Get Started" option

**Help Modal (Updated):**
```
┌─────────────────────────────────┐
│ Help & Resources           [×]  │
├─────────────────────────────────┤
│                                 │
│ 📚 Documentation                │
│    Browse our help articles     │
│    [View Docs →]                │
│                                 │
│ 🚀 Get Started                  │
│    Review setup tasks           │
│    [Open Get Started →]         │
│                                 │
│ 💬 Contact Support              │
│    Need help? We're here        │
│    [Contact Us →]               │
│                                 │
└─────────────────────────────────┘
```

**Files to Update:**
- `components/help-modal.tsx`
- Remove tour auto-start from onboarding completion

**Estimated Time:** 2-3 hours

---

### TASK 1.10: Add Invites to Navigation 🟡

**What:**
- Ensure Invites page exists in main nav
- Add badge with pending count

**Check:**
- Individual: `/vendor/invites`
- Business: `/business/invites`

**If missing, create pages.**

**Estimated Time:** 2-4 hours (if needs creation)

---

## ✅ PHASE 1 SUMMARY

**Total Estimated Time:** 60-75 hours (2 weeks for one person)

**Deliverables:**
- ✅ Account type selection removed
- ✅ Welcome screen added
- ✅ Onboarding updated (Specretary pattern)
- ✅ Individual Dashboard created (NEW PAGE)
- ✅ Get Started page created (NEW PAGE)
- ✅ Business Dashboard updated
- ✅ Navigation reorganized
- ✅ Guided tour auto-start removed
- ✅ Help modal updated

**Ready for Phase 2:** Onboarding Polish

---

## 🎨 PHASE 2: ONBOARDING POLISH (WEEK 2-3)

**Goal:** Beautiful, welcoming onboarding experience

---

### TASK 2.1: Auth Pages Split-Pane Redesign 🟡

**What:**
- Alchemyca-style split screen
- Left: Form, Right: Hero image (placeholder)

**Pages to Update:**
- Sign In
- Sign Up
- Verify Email
- Forgot Password
- Reset Password

**Layout:**
```
Desktop (50/50 split):
┌──────────────┬──────────────┐
│   AUTH FORM  │ HERO IMAGE   │
│   (Left)     │ (Right)      │
│              │ [Placeholder]│
│              │              │
└──────────────┴──────────────┘

Mobile (stacked):
┌──────────────────┐
│ HERO IMAGE       │
│ (Top, 40vh)      │
├──────────────────┤
│ AUTH FORM        │
│ (Below)          │
└──────────────────┘
```

**Component:**
```typescript
// components/auth/split-pane-layout.tsx
interface SplitPaneLayoutProps {
  children: React.ReactNode;
  heroImage?: string; // Optional, defaults to placeholder
  heroContent?: React.ReactNode;
}
```

**Placeholder Images:**
- Use generic professional stock photo
- Or solid gradient with subtle pattern
- Note in code: "TODO: Replace with brand image"

**Files to Create:**
- `components/auth/split-pane-layout.tsx`
- `components/auth/auth-form.tsx`
- `components/auth/hero-pane.tsx`

**Files to Update:**
- `app/(auth)/signin/page.tsx`
- `app/(auth)/signup/page.tsx`
- `app/(auth)/verify-email/page.tsx`
- `app/(auth)/forgot-password/page.tsx`
- `app/(auth)/reset-password/page.tsx`

**Estimated Time:** 8-10 hours

---

### TASK 2.2: Team Setup Repeater Pattern 🟡

**What:**
- Remove "Select Team Size" dropdown
- Add repeater pattern (+ Add Another)
- Inspired by SynkedUP budget builder

**Current:**
```
How many team members? [Dropdown: 1-20]
```

**New:**
```
Add Your Team Members

┌─────────────────────────────────────────┐
│ Name: [____________]  Email: [________] │
│ Role: [Appraiser ▼]                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Name: [____________]  Email: [________] │
│ Role: [Admin ▼]     [Remove]            │
└─────────────────────────────────────────┘

[+ Add Another Team Member]
```

**Component:**
```typescript
// components/onboarding/team-member-repeater.tsx
interface TeamMemberRepeaterProps {
  members: TeamMember[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: string) => void;
}
```

**Files to Update:**
- Business onboarding wizard (team setup step)

**Estimated Time:** 4-5 hours

---

### TASK 2.3: Confetti Celebration 🟢

**What:**
- Trigger confetti when user completes onboarding
- Also when Get Started reaches 100%

**Library:** `canvas-confetti` (lightweight)

**Implementation:**
```typescript
import confetti from 'canvas-confetti';

const triggerCelebration = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};
```

**Trigger Points:**
- Onboarding wizard completion
- Get Started page reaches 100%
- Welcome screen "Let's Go!" button (optional, subtle)

**Estimated Time:** 1-2 hours

---

## ✅ PHASE 2 SUMMARY

**Total Estimated Time:** 15-20 hours

**Deliverables:**
- ✅ Auth pages redesigned (split-pane)
- ✅ Team setup uses repeater pattern
- ✅ Confetti celebrations added

---

## 🏢 PHASE 3: BUSINESS FEATURES (WEEK 3-4)

**Goal:** Implement business bid assignment workflow

---

### TASK 3.1: Create Bids & Assignments Page 🟡

**What:**
- NEW page for business bid management
- Unassigned Bids tab
- Assigned Work tab
- Team Capacity view

**Route:** `/business/bids-assignments` or `/business/bids`

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Bids & Assignments                    Sort ▼    │
│ ┌────────────────┬────────────────┐             │
│ │Unassigned (3)  │Assigned Work   │             │
│ └────────────────┴────────────────┘             │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📍 1234 Market St, San Diego, CA               │
│ 🏢 Commercial Appraisal                        │
│ 🏦 Wells Fargo                                 │
│ 📅 Due: Jan 25, 2026 (5 days)                 │
│ 💰 Fee: $2,500                                 │
│                                                 │
│ Specialties Needed: Commercial, Urban          │
│ Coverage: San Diego County                     │
│                                                 │
│ [View Details]  [Assign to Team Member →]      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Files to Create:**
- `app/business/bids-assignments/page.tsx`
- `components/business/unassigned-bids-list.tsx`
- `components/business/assigned-work-list.tsx`
- `components/business/bid-card.tsx`

**Estimated Time:** 8-10 hours

---

### TASK 3.2: Create Assignment Modal 🟡

**What:**
- Modal for assigning bids to team members
- Smart recommendations
- Workload indicators
- Priority selection

**Design:**
```
┌────────────────────────────────────────────────┐
│ Assign Bid                               [×]   │
├────────────────────────────────────────────────┤
│                                                │
│ Property: 1234 Market St, San Diego           │
│ Bank: Wells Fargo | Due: Jan 25, 2026        │
│                                                │
│ Select Team Member                             │
│                                                │
│ ● Maria Gonzalez                               │
│   🟢 4 active | ⭐ 4.8 | ✓ Match              │
│   💡 Recommended                               │
│                                                │
│ ○ David Kim                                    │
│   🟡 6 active | ⭐ 4.9                         │
│                                                │
│ ○ James Wilson                                 │
│   🔴 8 active | ⚠️ At capacity                 │
│                                                │
│ Priority: ○ Normal  ● Rush  ○ Critical        │
│                                                │
│ Note for Team Member:                          │
│ ┌──────────────────────────────────────────┐  │
│ │                                          │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ [Cancel]                      [Assign Bid →]  │
└────────────────────────────────────────────────┘
```

**Component:**
```typescript
// components/business/assignment-modal.tsx
interface AssignmentModalProps {
  bid: Bid;
  teamMembers: TeamMember[];
  onAssign: (memberId: string, note: string, priority: Priority) => void;
  onCancel: () => void;
}
```

**Files to Create:**
- `components/business/assignment-modal.tsx`
- `components/business/team-member-selector.tsx`
- `components/business/workload-indicator.tsx`

**Estimated Time:** 10-12 hours

---

### TASK 3.3: Team Member's View of Assigned Bids 🟡

**What:**
- Update My Requests to show assigned bids
- Different visual treatment
- Request reassignment option

**Changes to My Requests:**
```
┌─────────────────────────────────────────────────┐
│ 🔥 RUSH                                         │
│ 📍 1234 Market St, San Diego, CA               │
│ 🏢 Commercial Appraisal                        │
│ 🏦 Wells Fargo                                 │
│ 📅 Due: Jan 25, 2026 (5 days)                 │
│ 💰 Fee: $2,500                                 │
│                                                 │
│ 📝 Note from Sarah:                            │
│ "Maria - this is a rush job. Interior photos  │
│  required."                                    │
│                                                 │
│ Assigned: 2 hours ago                          │
│                                                 │
│ [Accept Bid]  [Request Reassignment]           │
└─────────────────────────────────────────────────┘
```

**Files to Update:**
- `app/vendor/requests/page.tsx`
- Add "Request Reassignment" modal

**Estimated Time:** 4-6 hours

---

### TASK 3.4: Team's Active Work Widget (Dashboard) 🟡

**What:**
- Widget on business dashboard
- Shows team workload at a glance
- Links to full assignments view

**Design:**
```
┌─────────────────────────────────────────────────┐
│ Team's Active Work (14)               View All →│
├─────────────────────────────────────────────────┤
│                                                 │
│ Maria Gonzalez (5 active)  🟢                   │
│ ├─ 1234 Market St - Bid Sent (Rush)           │
│ ├─ 5678 Oak Ave - In Process                   │
│ └─ + 3 more                                    │
│                                                 │
│ David Kim (6 active)  🟡                        │
│ ├─ 3456 Elm St - Report Due Tomorrow          │
│ └─ + 5 more                                    │
│                                                 │
│ James Wilson (8 active)  🔴 At Capacity        │
│ ├─ 2 overdue items ⚠️                          │
│ └─ View details →                              │
└─────────────────────────────────────────────────┘
```

**Component:**
```typescript
// components/business/team-work-widget.tsx
interface TeamWorkWidgetProps {
  teamMembers: TeamMemberWithWork[];
  maxShow?: number; // default 3
}
```

**Estimated Time:** 4-5 hours

---

## ✅ PHASE 3 SUMMARY

**Total Estimated Time:** 30-35 hours

**Deliverables:**
- ✅ Bids & Assignments page created
- ✅ Assignment modal with smart recommendations
- ✅ Team member assigned bid view
- ✅ Team's active work widget on dashboard

---

## 🧱 COMPONENT SPECIFICATIONS

### MetricCard Component

```typescript
// components/dashboard/metric-card.tsx
interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'warning' | 'danger';
  loading?: boolean;
}

export function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  onClick,
  variant = 'default',
  loading = false
}: MetricCardProps) {
  // Implementation
}
```

**Usage:**
```tsx
<MetricCard
  label="Total Bids"
  value={12}
  trend={{ direction: 'up', value: '2', isPositive: true }}
  icon={FileText}
  onClick={() => router.push('/vendor/requests')}
/>
```

---

### GetStarted Task System

```typescript
// lib/get-started-tasks.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  imageUrl?: string;
  ctaText: string;
  ctaAction: string; // Route or function name
  checkComplete: () => boolean;
  category: 'profile' | 'documents' | 'settings';
}

// Individual vendor tasks
export const individualVendorTasks: Task[] = [
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add your contact information and professional details',
    estimatedTime: '5 minutes',
    imageUrl: '/images/placeholders/complete-profile.jpg',
    ctaText: 'Complete Profile',
    ctaAction: '/vendor/profile',
    checkComplete: () => {
      // Logic to check if profile is complete
      return false;
    },
    category: 'profile'
  },
  // ... more tasks
];

// Business tasks
export const businessTasks: Task[] = [
  // Similar structure
];
```

---

### Workload Indicator Component

```typescript
// components/business/workload-indicator.tsx
interface WorkloadIndicatorProps {
  activeJobs: number;
  maxCapacity?: number; // default 10
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

// Returns:
// 🟢 Available (0-5 jobs)
// 🟡 Busy (6-8 jobs)
// 🔴 At Capacity (9+ jobs)
```

---

## ✅ IMPLEMENTATION CHECKLIST

Use this to track progress:

### Phase 1: Critical Foundation
- [ ] 1.1 Remove account type selection
- [ ] 1.2 Create welcome screen modal
- [ ] 1.3 Update onboarding visual controls
- [ ] 1.4 Add "Are you an appraiser?" fork
- [ ] 1.5 Create individual vendor dashboard
- [ ] 1.6 Create Get Started page
- [ ] 1.7 Update navigation
- [ ] 1.8 Update business dashboard
- [ ] 1.9 Remove guided tour auto-start
- [ ] 1.10 Add Invites to navigation

### Phase 2: Onboarding Polish
- [ ] 2.1 Auth pages split-pane redesign
- [ ] 2.2 Team setup repeater pattern
- [ ] 2.3 Confetti celebration

### Phase 3: Business Features
- [ ] 3.1 Create Bids & Assignments page
- [ ] 3.2 Create assignment modal
- [ ] 3.3 Team member's view of assigned bids
- [ ] 3.4 Team's active work widget

### Testing
- [ ] Test first-time user flow (individual)
- [ ] Test first-time user flow (business)
- [ ] Test returning user experience
- [ ] Test Get Started page completion
- [ ] Test bid assignment flow
- [ ] Mobile responsive testing
- [ ] Dark mode testing
- [ ] Accessibility testing

---

## 🚀 START IMPLEMENTATION NOW

**Immediate Next Steps:**

1. **Create new branch:** `git checkout -b feature/jan-13-redesign`
2. **Start with Task 1.1:** Remove account type selection (quick win)
3. **Then Task 1.2:** Welcome screen (sets tone)
4. **Then Task 1.5:** Individual dashboard (biggest task, start early)

**Work in this order for maximum efficiency.**

---

## 📝 NOTES & REMINDERS

- **Placeholder Images:** Use generic professional images, note "TODO: Replace"
- **Charts:** Use Recharts library (already decided)
- **Confetti:** Use canvas-confetti library
- **Mobile:** Keep responsive in mind throughout
- **Dark Mode:** Test both themes as you build
- **First-Time vs Returning:** Always implement both states

---

**Document Status:** ✅ READY FOR IMPLEMENTATION  
**Created:** January 20, 2026  
**Start Date:** Immediately  
**Estimated Completion:** 3-4 weeks  

**LET'S BUILD! 🚀**
