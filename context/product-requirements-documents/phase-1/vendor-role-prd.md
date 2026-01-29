# Vendors Circle - Individual Vendor Role PRD
**Phase:** 1  
**Release Target:** Q1 2026 (Revised)  
**Product:** Vendors Circle  
**Role:** Individual Vendor  
**Status:** v3.0 - Active Development  
**Created:** 2025-12-20  
**Last Updated:** 2026-01-13 (End of Day)

**✅ IMPLEMENTATION STATUS:** 
- Desktop experience: ✅ 100% Complete
- Mobile experience: ✅ 100% Complete  
- Authentication: ✅ 100% Complete
- Onboarding wizard: ⏳ Week 3 (Planned)
- Overall: 95% Complete

**⚠️ NOTE:** This PRD covers **Individual Vendors** (solo appraisers). For **Business Admin** role (appraisal office owners managing teams), see `business-admin-role-prd.md`.

---

## Executive Summary

The Vendor Role in Vendors Circle provides licensed appraisers (fee appraisers) with a centralized platform to manage their professional credentials, coverage areas, and work across multiple banking clients. This eliminates the current pain point of updating the same information across multiple bank-specific portals.

**Key Value Proposition:**
> "Update your credentials once. Work with multiple banks seamlessly."

---

## ✅ Implementation Status (January 13, 2026)

### COMPLETED Features - Desktop:

**Core UI/UX Refinements:**
- ✅ Tabs top padding across all tabbed interfaces
- ✅ Header title font size reduced (`text-lg`)
- ✅ Sample reports display: Badge with "N remaining" combined
- ✅ Invite acceptance simplified (no textarea per Cody)
- ✅ Table badge overflow with "+N" tooltip (fixed positioning, no scroll)
- ✅ Theme toggle: Segmented controller with icons only (☀️ | 🌙), full width
- ✅ Invite card accordions: Chevron smooth rotation (90°), smooth content expansion
- ✅ Breadcrumbs navigation component
- ✅ Standardized modal component with smooth zoom-in animations
- ✅ Table filters: Modal pattern with search bars
- ✅ Search functionality in My Requests table
- ✅ Pagination: Icon buttons (◀ ▶) instead of text
- ✅ Smooth transitions throughout (200-300ms, CSS-based)
- ✅ Sidebar collapse/expand with smooth width + opacity transitions
- ✅ All dropdowns with smooth slide-down animations
- ✅ All accessibility labels (aria-label) for screen readers

**Components Created/Updated:**
- ✅ `components/breadcrumbs.tsx`
- ✅ `components/modal.tsx` (with animations)
- ✅ `components/top-header.tsx` (segmented theme toggle, smooth dropdowns)
- ✅ `components/side-nav.tsx` (smooth collapse animations)
- ✅ `components/snackbar.tsx` (smooth entry animations)
- ✅ `BadgeOverflow` component with fixed positioning tooltips

### COMPLETED Features - Mobile:

**Mobile Native Experience (16 Pages):**
- ✅ My Requests with pull-to-refresh, infinite scroll, swipeable tabs
- ✅ My Invites with swipe actions and detail pages
- ✅ My Documents with 3 swipeable tabs and camera integration
- ✅ Profile with iOS Settings pattern (9 sub-pages)
- ✅ Progressive forms for adding licenses and insurance
- ✅ Bottom tab navigation
- ✅ Slide-out drawer menu with branding
- ✅ Notification center
- ✅ Context-aware FAB (Floating Action Button)
- ✅ Segmented theme toggle (full width, icon-only)
- ✅ Device detection middleware (auto-routes to /m/*)

**Mobile Components Created (19):**
- ✅ Navigation: `bottom-nav.tsx`, `drawer.tsx`, `settings-row.tsx`, `section-header.tsx`
- ✅ Gestures: `swipeable-tabs.tsx`, `swipeable-card.tsx`, `pull-to-refresh.tsx`, `infinite-scroll-list.tsx`
- ✅ Modals: `action-sheet.tsx`, `bottom-sheet.tsx`, `full-screen-modal.tsx`, `notification-sheet.tsx`
- ✅ Content: `work-item-card.tsx`, `license-card.tsx`, `address-card.tsx`, `empty-state.tsx`
- ✅ Features: `camera-upload.tsx`, `context-fab.tsx`, `multi-select-toolbar.tsx`

**Mobile Strategy:**
- Separate `/m/*` routes for complete mobile-first experience
- Native touch gestures (swipe, pull, tap)
- iOS and Android design patterns
- Zero impact on desktop codebase

### PENDING Features:

**Complex Items (3-5 weeks):**
- ⬜ Null/empty states everywhere (20+ locations)
- ⬜ Skeleton loading states everywhere (10+ pages)
- ⬜ Mobile design (entire app, 12+ pages)

**Major New Features (5-6 weeks):**
- 🔴 Multi-user business support (CRITICAL - requires design session)
- ⬜ Onboarding flow (depends on multi-user pattern)
- ⬜ Sign-up flow
- ⬜ User management (depends on multi-user pattern)
- ⚠️ Message threads (requires clarification with Ed/Jason)
- ⚠️ Admin scorecards (requires research with Jason)

**Overall Progress:** ~15% complete (2 of 12 weeks)

---

## Problem Statement

### Current State Pain Points

**For Multi-Bank Vendors:**
- Must update licenses, insurance, and credentials separately for each bank
- Maintain multiple bookmarked pages (1 per bank)
- Repetitive data entry across 8-10+ bank portals
- No visibility into overall performance or relationship health
- Only receive feedback when problems occur
- Feel undervalued despite professional credentials

**Example Scenario:**
Tom, a licensed appraiser in FL, GA, and AL, works with 8 banks. When his FL license renews:
- ❌ Current: Must log into 8 separate bank portals and upload the same license 8 times
- ✅ Vendors Circle: Upload once, notifies all 8 banks automatically

### User Impact
- **Time Waste:** 2-3 hours per credential update × multiple updates per year
- **Error Risk:** Inconsistent data across banks, missed expiration dates
- **Frustration:** Feel like "vendor" not "professional partner"
- **Lost Work:** Miss bid opportunities due to outdated credentials

### Multi-User Business Complexity (NEW - Jan 6, 2026)

**Additional Pain Point for Appraisal Offices:**
Many vendors are not individuals but **appraisal offices with 6+ employees**. Current system assumes single user per profile.

**Example Scenario:**
Reynolds Appraisal Services (office) has:
- Owner/Admin: Tom Reynolds
- Appraiser: Tom Reynolds (FL, GA, AL licenses)
- Appraiser: Sarah Chen (CA license)
- Appraiser: Mike Rodriguez (IL, IN, WI licenses)  
- Office Staff: Assistant (no license)

**Current Challenge:**
- Each appraiser needs separate account
- Office owner can't manage team credentials
- Banks see individual appraisers, not office capability
- Coverage areas don't aggregate (office serves 6 states total)
- No administrative oversight

**Ed's Question (Jan 6):**
> "How are you dealing with businesses? Let's say I'm an appraisal office with six people that work for me. How do we navigate that complexity?"

---

## Target Users

### Primary Persona: Multi-Bank Fee Appraiser

**Tom Reynolds** - 58, Reynolds Appraisal Services, Tampa FL
- Licensed in FL, GA, AL (3 states)
- Works with 8 different banks
- Commercial & residential appraisals
- 60% revenue from bank work
- 15-20 appraisals/month
- 2 staff members
- Moderate technical proficiency
- Desktop-first user

**Goals:**
- Update credentials efficiently
- Maintain good bank relationships
- Get more work
- Feel respected as professional

**Pain Points:**
- Repetitive data entry
- No performance feedback
- Feeling undervalued
- Multiple portals to manage

### Secondary Persona: Multi-User Business Owner/Admin (NEW)

**Tom Reynolds** - 58, Owner of Reynolds Appraisal Services, Tampa FL
- **Business Type:** Appraisal office with 6 employees
- **Team Structure:**
  - 3 licensed appraisers (including himself)
  - 2 trainees
  - 1 administrative assistant
- Manages company credentials and team assignments
- Needs oversight of all team members' work and licenses
- Responsible for ensuring company-wide compliance
- Desktop-focused

**Goals:**
- Manage multiple appraiser profiles from one account
- Ensure all team licenses are current
- Assign work to appropriate team members
- Present office capabilities to banks (collective coverage)
- Administrative control without micromanaging

**Pain Points:**
- Can't see all team credentials in one place
- No way to manage team member accounts
- Banks don't see office as unified entity
- Can't delegate profile management to staff
- No permission levels (admin vs. appraiser vs. staff)

**Quote:**
> "I need to know when any of my appraisers' licenses are expiring, and I need to be able to invite new team members and set what they can access."

### Tertiary Persona: Single-Bank Newer Appraiser

**Sarah Chen** - 34, Chen Appraisals, San Francisco CA
- Licensed in CA
- Works primarily with 1 bank (wants to expand)
- Independent (2 years)
- 8-12 appraisals/month
- 80% revenue from bank work
- High technical proficiency
- Mobile-friendly expectations

**Goals:**
- Expand to more banks
- Build credibility
- Professional development
- Modern, efficient tools

---

## Solution Overview

### Core Concept
Centralized credential management with one-time updates that distribute to all connected banks (with bank approval control).

### Key Features (Phase 1)

**Core Features (Original):**
1. **My Requests** - Unified work dashboard
2. **My Invites** - Bank invitation management
3. **My Credentials** - Credential & document management (renamed from Licenses)
4. **Profile** - Personal info, coverage areas, specialties

**NEW Features (Added Jan 6, 2026):**
5. **Multi-User Business Support** - Support for appraisal offices with multiple appraisers
6. **User Management** - Manage team members, roles, and permissions  
7. **Onboarding Flow** - First-time user setup wizard
8. **Sign-Up Flow** - Self-service registration (without invitation)
9. **Message Threads** - Order communication within app

**Note:** Multi-user support is a cross-cutting concern affecting all features above.

---

## Feature Requirements

## 1. My Requests (Landing Page)

### Purpose
Provide vendors with a unified view of all work across all connected banks, organized into Bids vs Reports with fast filtering.

### User Stories

**US-V-001:** As a vendor, I want to see all my pending bids in one place so I can prioritize my work efficiently.

**US-V-002:** As a vendor, I want work organized by stage (Bids Needed, Submitted, In Process, etc.) so I understand what action is required.

**US-V-003:** As a vendor, I want work grouped by bank within each stage so I know which bank each assignment is for.

**US-V-004:** As a vendor, I want to click a work item and be directed to the relevant web form so I can respond quickly.

### Functional Requirements

#### FR-MR-001: Tabbed Work Organization (Bids / Reports)
**Must Have**
- Two primary tabs:
  1. **Bids**
  2. **Reports**
- Each tab shows an item count badge for **active (non-completed)** work
- “Completed” work is accessed via filters (not a separate tab)

#### FR-MR-002: Table View + Bank Logos
**Must Have**
- Table view with columns:
  - File Number (`FN####`)
  - Property Address
  - Bank (logo + name)
  - Status
  - Due Date
  - Actions (View)

#### FR-MR-003: Filters + Active Filter Pills
**Must Have**
- Filters appear on the right side of the tab header row:
  - **Bank** (includes all banks present in data)
  - **Status** (tab-specific)
- Active filters appear as removable pills under the header row
- “Clear all” resets filters and returns pagination to page 1

#### FR-MR-004: Status Model (Prototype)
**Must Have**
- **Bids statuses**:
  - Bids Needed
  - Submitted
  - Needing My Confirmation
  - Bids Lost (Last 30 Days)
  - Completed
- **Reports statuses**:
  - In Process
  - Needing Rework
  - Needing Reupload
  - Completed

#### FR-MR-005: Pagination
**Must Have**
- Pagination controls:
  - Default: 5 per page
  - Options: 5 / 10 / 15 per page
  - Page navigation (prev/next and page numbers)
  - “Showing X–Y of Z” summary

#### FR-MR-006: External Link Navigation (Demo)
**Must Have**
- “View” action opens bank-specific external form URL in a new tab (preserve Circle context)
- Prototype uses placeholder URLs (e.g., `realwired.com`) in mock data

### UI/UX Requirements

**UXR-MR-001: Visual Hierarchy**
- Clear distinction between workflow stages
- Card-based work items
- Subtle dividers between banks
- Status badges use color coding

**UXR-MR-002: Scannability**
- Large, readable text for addresses
- Icon system for work types
- Due dates prominently displayed
- Color-coded urgency (red = urgent, yellow = soon, green = on-track)

**UXR-MR-003: Empty States**
- "No bids needed - you're all caught up! 🎉"
- "No rework items - great quality work! ✨"
- Encouraging, not clinical

**UXR-MR-004: Performance**
- Load first 10 items per stage
- "Load more" for additional items
- Optimistic UI updates
- Skeleton loaders while fetching

### Data Model (Mock JSON)

```json
{
  "workItems": [
    {
      "id": "work-001",
      "bankId": "bank-finance",
      "bankName": "Finance Bank",
      "stage": "bids_needed",
      "fileNumber": "File #1",
      "propertyAddress": "1110 N Florida Ave, Tampa, FL 33602",
      "dueDate": "2025-01-15",
      "priority": "high",
      "workType": "commercial_appraisal",
      "externalFormUrl": "https://realwired.com"
    }
  ]
}
```

### Acceptance Criteria

- ✅ Vendor can switch between Bids and Reports
- ✅ Vendor can filter by Bank and Status
- ✅ Completed is available via Status filter (no dedicated History tab)
- ✅ Table rows show bank logos and unique `FN####` file numbers
- ✅ Pagination works with 5/10/15 per page
- ✅ Clicking “View” opens external form in new tab
- ✅ Empty states show helpful messaging
- ✅ Page loads in < 2 seconds
- ✅ Responsive on desktop, tablet, mobile
- ✅ Keyboard navigation works
- ✅ Screen reader accessible

---

## 2. My Invites

### Purpose
Allow vendors to view, review, and respond to bank invitations to establish new working relationships.

### User Stories

**US-V-005:** As a vendor, I want to see pending invitations from banks so I can decide whether to accept new relationships.

**US-V-006:** As a vendor, I want to see bank details when reviewing an invitation so I can make informed decisions.

**US-V-007:** As a vendor, I want to accept or decline invitations so I can control my business relationships.

### Functional Requirements

#### FR-MI-001: Invitation List Display
**Must Have**
- Card-based list of pending invites
- Each invite card shows:
  - Bank logo + name
  - Invited date
  - Scope badge + Region badge
  - Status badge: **New** or **Expires in X days** (when expiring within 5 days)
  - Actions: Accept / Decline
- Empty state for no invitations

#### FR-MI-002: Invitation Details
**Must Have**
- Bank name and logo
- Scope + Region (Phase 1 default fields)
- Date invited
- Invitation expiry (if applicable)
- Bank-specific requirements preview

#### FR-MI-003: Accept Workflow
**Must Have**
- Accept removes the invite from Pending list and shows success feedback
- Pending invite count updates immediately (including side-nav badge)
- **No redirect** during Phase 1 prototype (user stays on the page)
- Accepted banks appear under **Profile → Connected Banks**

#### FR-MI-004: Decline Workflow
**Must Have**
- Decline requires a confirmation modal (prevent accidental declines)
- Pending invite count updates immediately (including side-nav badge)
- Phase 1 prototype does not retain a “declined history” list

### UI/UX Requirements

**UXR-MI-001: Clear CTAs**
- Primary action: Accept (prominent button)
- Secondary action: Decline (ghost/outline button)
- Tertiary: View details (link)

**UXR-MI-002: Status Indicators**
- Color-coded status badges
- Icons for quick scanning
- Clear date formatting

**UXR-MI-003: Empty State**
- "No pending invitations"
- "Check back later for new opportunities"
- Illustration or icon

### Data Model

```json
{
  "invitations": [
    {
      "id": "invite-001",
      "bankId": "bank-zenith",
      "bankName": "Zenith Bank",
      "bankLogo": "/logos/zenith.png",
      "invitedDate": "2025-01-10T14:30:00Z",
      "expiryDate": "2025-02-10T14:30:00Z",
      "status": "pending",
      "message": "We'd love to work with you on commercial appraisals in the Tampa area.",
      "onboardingFormUrl": "https://realwired.com"
    }
  ]
}
```

### Acceptance Criteria

- ✅ Invitation list displays all pending invites
- ✅ Accept flow works with confirmation
- ✅ Decline flow works with confirmation
- ✅ Status updates reflect immediately
- ✅ Empty state shows when no invites
- ✅ Responsive design
- ✅ Accessible to keyboard and screen readers

---

## 3. My Credentials (Renamed from Licenses)

### Purpose
Central hub for managing all professional credentials, licenses, insurance, and sample work that banks require.

**Implemented Prototype Notes:**
- Route: **`/vendor/credentials`**
- Tabs: **Documents** | **State Licenses** | **Coverage & Insurance**

### User Stories

**US-V-008:** As a vendor, I want to upload my W-9, resume, and sample work once so banks can access current documents.

**US-V-009:** As a vendor, I want to manage state licenses with expiration tracking so I never miss a renewal.

**US-V-010:** As a vendor, I want to upload insurance documents once and have all banks receive updates automatically.

**US-V-011:** As a vendor, I want expiration warnings so I can renew credentials before they lapse.

### Functional Requirements

#### FR-LC-001: Credentials Section
**Must Have**

**Documents Tab (Prototype):**
- **W‑9** card with:
  - Document name (editable)
  - “Uploaded” badge
  - Last uploaded date + filename (stacked metadata)
  - Edit + Delete actions (modal-driven)
  - Empty state after deletion with business-friendly guidance + Add CTA (modal-driven)
- **Resume** card with the same behaviors as W‑9
- **Sample Reports (up to 4)**:
  - Header shows “X of 4” and hides Add CTA when full
  - List items show label + last uploaded + filename
  - Add/Edit/Delete via modals

#### FR-LC-002: State Licenses
**Must Have**

**Add State License:**
- Select state from dropdown (all 50 states + DC)
- Upload license file (PDF, JPG, PNG)
- Enter license number (validation: alphanumeric)
- Select expiration date (date picker)
- Add notes (optional)
- Save button

**License List Display:**
- Card list where each license shows:
  - State name
  - License number
  - Expiration date
  - License file name
  - Status badge (Active / Expiring Soon)
  - Edit and delete actions (delete requires confirmation modal)

**UX Note (Prototype):**
- Expiration alert is displayed **inside** the State Licenses tab above the list
- The State Licenses tab includes a badge count of expiring licenses

**Expiration Tracking:**
- Warning badge if expiring within 60 days (yellow)
- Error badge if expired (red)
- Email notifications (Phase 2)

**Multiple Licenses Per State:**
- Some vendors have multiple license types per state
- Allow multiple entries per state
- Differentiate by license number or type

#### FR-LC-003: Insurance Documentation
**Must Have**

**Errors & Omissions (E&O):**
- File upload (PDF)
- Expiration date
- Limits of liability (currency input)
- Replace/delete

**General Commercial Liability:**
- File upload (PDF)
- Expiration date
- Insurance company name
- Policy number
- Replace/delete

**Auto Liability:**
- File upload (PDF)
- Expiration date
- Insurance company name
- Policy number
- Replace/delete

**Master Services Agreement (MSA):**
- Multiple MSAs supported (per bank)
- MSAs do not expire; display bank + effective date

**Additional Coverage Types (Prototype):**
- Workers’ Comp
- Umbrella

#### FR-LC-004: File Upload UX
**Must Have**
- Drag-and-drop zone
- Click to browse alternative
- File type validation before upload
- File size validation before upload
- Progress indicator during upload
- Success confirmation
- Error messaging with retry option

**For Phase 1 Demo:**
- Mock upload (select file, show filename)
- Store filename in state/localStorage
- Don't actually persist files

#### FR-LC-005: Validation
**Must Have**
- Required field validation
- Date validation (can't be in past for new entries)
- File type validation
- File size validation
- License number format validation
- Clear error messages
- Inline validation (real-time)

### UI/UX Requirements

**UXR-LC-001: Section Organization**
- Tabbed layout to reduce scrolling:
  - Documents
  - State Licenses
  - Coverage & Insurance
- Clear card-based layout within each tab

**UXR-LC-002: License Management**
- Table view for licenses
- Color-coded expiration status
- Quick actions (edit, delete) on hover
- Bulk actions (future: delete multiple)

**UXR-LC-003: File Upload**
- Drag-and-drop zone with dashed border
- File preview thumbnails (for images)
- PDF icon for PDF files
- File size display
- "Replace" vs "Delete" clearly distinguished

**UXR-LC-004: Expiration Warnings**
- Expiration warnings are displayed inside relevant tabs:
  - State Licenses tab (licenses expiring within 60 days)
  - Coverage & Insurance tab (policies expiring within 60 days)

**UXR-LC-005: Mobile Considerations**
- File upload via camera (Phase 2)
- Simplified view on mobile
- Edit mode vs view mode

### Data Model

```json
{
  "credentials": {
    "w9": {
      "fileName": "w9-2025.pdf",
      "uploadDate": "2025-01-01",
      "fileSize": 245000
    },
    "resume": {
      "fileName": "resume-tom-reynolds.pdf",
      "uploadDate": "2024-12-15",
      "fileSize": 180000
    },
    "sampleWork": [
      {
        "id": "sample-1",
        "fileName": "commercial-sample-tampa.pdf",
        "label": "Commercial - Tampa Office Building",
        "uploadDate": "2024-11-20",
        "fileSize": 3200000
      }
    ]
  },
  "licenses": [
    {
      "id": "lic-001",
      "state": "FL",
      "stateName": "Florida",
      "licenseNumber": "RD9887665",
      "expirationDate": "2026-06-30",
      "fileName": "fl-license-2024.pdf",
      "uploadDate": "2024-06-01",
      "status": "active",
      "notes": ""
    }
  ],
  "insurance": {
    "errorsAndOmissions": {
      "fileName": "eo-insurance.pdf",
      "expirationDate": "2026-02-18",
      "limitsOfLiability": 2000000,
      "uploadDate": "2025-01-01"
    },
    "generalCommercialLiability": {
      "fileName": "gcl-insurance.pdf",
      "expirationDate": "2026-09-10",
      "insuranceCompany": "Hartford",
      "policyNumber": "748383493",
      "uploadDate": "2024-09-01"
    },
    "autoLiability": {
      "fileName": "auto-insurance.pdf",
      "expirationDate": "2027-12-22",
      "insuranceCompany": "State Farm",
      "policyNumber": "YC-230320234",
      "uploadDate": "2024-12-01"
    }
  }
}
```

### Acceptance Criteria

- ✅ Can upload/replace/delete all credential types
- ✅ State licenses display by state with expiration tracking
- ✅ Expiration warnings show for licenses/insurance expiring < 60 days
- ✅ File validation works (type, size)
- ✅ Form validation prevents invalid data
- ✅ Success/error messages display appropriately
- ✅ Responsive design works on all devices
- ✅ Accessible (keyboard navigation, screen readers)
- ✅ Multiple licenses per state supported

---

## 4. Profile

### Purpose
Manage personal information, contact details, business addresses, coverage areas, and specialties.

### User Stories

**US-V-012:** As a vendor, I want to update my contact information in one place so all banks receive current details.

**US-V-013:** As a vendor, I want to manage multiple business addresses so banks know all my office locations.

**US-V-014:** As a vendor, I want to select coverage areas by state and county so banks know where I can work.

**US-V-015:** As a vendor, I want to choose my specialties so banks can match me with appropriate assignments.

### Functional Requirements

#### FR-PR-001: Tabbed Profile Management (Prototype)
**Must Have**
- Four tabs:
  - **Profile Info**
  - **Addresses**
  - **Coverage & Expertise**
  - **Connected Banks**

#### FR-PR-002: Profile Info (Tab)
**Must Have**
- Avatar with initials fallback and hover “Change photo” affordance
- Save CTA in the top-right
- Email fields:
  - Primary Email
  - Bid Coordinator Email
  - Assistant Email
- Name fields:
  - First, Middle, Last, Suffix
- Company + Title
- Contact numbers:
  - Work Phone, Cell Phone, Fax

#### FR-PR-003: Addresses (Tab)
**Must Have**
- Table view with columns:
  - Address
  - City / State
  - County
  - ZIP
  - Type (Office/HQ/Branch/etc.)
  - Primary badge
  - Actions
- Actions are accessed via a 3-dot menu:
  - Edit (modal)
  - Set as Primary (non-primary rows only)
  - Delete (non-primary rows only, confirmation modal)
- Add Address via modal

#### FR-PR-004: Coverage Areas (Within Coverage & Expertise Tab)
**Must Have**
- Add/Edit Coverage Area via modal:
  - State dropdown (alphabetical)
  - County multi-select (10+ counties per state in prototype)
  - Selected counties displayed as removable pills
- Coverage Area cards display counties as scannable pills (not comma lists)

#### FR-PR-005: Specialties (Within Coverage & Expertise Tab)
**Must Have**
- Display specialties as pills
- Edit via modal with:
  - Current specialties as removable pills
  - Add new specialty by typing and pressing Enter / clicking Add

#### FR-PR-006: Professional Designations (Within Coverage & Expertise Tab)
**Must Have**
- Two-column grid of designation cards (e.g., MAI, SRA)
- Add/Edit/Delete via modals
- Empty state messaging when none exist

#### FR-PR-007: Connected Banks (Tab)
**Must Have**
- Read-only list of connected banks with:
  - Bank logo + name
  - Connection date
  - Scope + Region
  - “View Bank Profile” CTA

### UI/UX Requirements

**UXR-PR-001: Layout**
- Single-column layout (not current 2-column spread)
- Clear section headers with subtle dividers
- Card-based sections for:
  - Contact Information
  - Personal Details
  - Addresses
  - Coverage Areas
  - Specialties
  - Connected Banks

**UXR-PR-002: Form Design**
- Group related fields visually
- Use 2-column grid within sections where appropriate (e.g., First/Last Name side-by-side)
- Consistent input height and spacing
- Floating labels or clear placeholder text
- Inline validation feedback

**UXR-PR-003: Coverage Areas UI**
- State cards in collapsible accordion
- County display in grid (3-4 columns)
- Use pills for counties (easier to scan than comma list)
- Search functionality for finding specific county

**UXR-PR-004: Edit Modes**
- View mode (default): Show data with edit icons
- Edit mode: Form inputs appear
- Save/Cancel buttons in edit mode
- Auto-save consideration (Phase 2)

**UXR-PR-005: Responsive**
- Mobile: Stack all fields single column
- Tablet: Some 2-column layouts
- Desktop: Optimal spacing and grouping

### Data Model

```json
{
  "profile": {
    "contactInfo": {
      "email": "tom@reynoldsappraisals.com",
      "bidCoordinatorEmail": "coordinator@reynoldsappraisals.com",
      "assistantEmail": ""
    },
    "personalInfo": {
      "firstName": "Tom",
      "lastName": "Reynolds",
      "middleName": "Michael",
      "suffix": "",
      "company": "Reynolds Appraisal Services",
      "title": "Owner / Chief Appraiser",
      "workPhone": "(813) 555-1234",
      "cellPhone": "(813) 555-5678",
      "fax": ""
    },
    "addresses": [
      {
        "id": "addr-001",
        "isPrimary": true,
        "line1": "123 Main Street",
        "line2": "Suite 200",
        "city": "Tampa",
        "county": "Hillsborough",
        "state": "FL",
        "zip": "33602"
      }
    ],
    "coverageAreas": [
      {
        "id": "cov-001",
        "state": "FL",
        "stateName": "Florida",
        "counties": ["Hillsborough", "Pinellas", "Pasco", "Polk", "Manatee"],
        "isNational": false
      }
    ],
    "specialties": ["Commercial", "Residential", "Industrial", "Land"],
    "connectedBanks": [
      {
        "bankId": "bank-001",
        "bankName": "Finance Bank",
        "connectedDate": "2023-06-15",
        "logo": "/logos/finance-bank.png"
      }
    ]
  }
}
```

### Acceptance Criteria

- ✅ Profile is organized into 4 tabs (Profile Info / Addresses / Coverage & Expertise / Connected Banks)
- ✅ Profile Info supports avatar affordance and Save CTA
- ✅ Addresses table supports add/edit/set primary/delete via modals/menus
- ✅ Coverage Areas modal supports state + county multi-select with removable pills
- ✅ Specialties modal supports removable pills and quick-add
- ✅ Designations section supports add/edit/delete with empty state
- ✅ Connected banks list displays correctly
- ✅ Form validation prevents invalid data
- ✅ Protected fields show info tooltip
- ✅ Responsive design works on all devices
- ✅ Accessible (keyboard, screen reader)

---

## 5. Multi-User Business Support (NEW - Jan 6, 2026)

### Purpose
Support appraisal offices with multiple employees, not just individual appraisers. Enable business owners to manage team members, view collective capabilities, and maintain administrative oversight.

### User Stories

**US-MU-001:** As a business owner, I want to manage multiple appraiser profiles under one business account so I can oversee my team's credentials.

**US-MU-002:** As a business admin, I want to invite team members to join our business account so they can manage their own profiles while I maintain oversight.

**US-MU-003:** As a business owner, I want to see aggregate coverage areas across all my appraisers so banks understand our full service area.

**US-MU-004:** As an admin, I want to assign different permission levels (admin, appraiser, staff) so team members have appropriate access.

**US-MU-005:** As an appraiser within a business, I want to manage my own licenses and specialties while my company admin handles business settings.

**US-MU-006:** As a business owner, I want to switch between viewing my personal appraiser profile and managing the business so I can perform both roles efficiently.

### Functional Requirements

#### FR-MU-001: Account Type Selection
**Must Have**
- During sign-up or first-time setup, user selects account type:
  - **Individual Appraiser** (solo practice)
  - **Business/Office** (multi-user)
- Account type cannot be changed after initial setup (contact support required)

#### FR-MU-002: User vs. Profile Separation
**Must Have**
**Critical Architectural Decision (Cody's Direction):**
> "Users are not the same appraiser profiles. Profiles should be managed separate from users."

**Data Model:**
- **User**: Authentication, email, password, permissions, role
- **Profile**: Appraiser credentials (licenses, specialties, coverage)
- **Business Entity**: Company information, shared settings

**Relationships:**
- One Business → Many Users
- One User → Zero or One Profile (if they're an appraiser)
- One User → One Business

**Example:**
Reynolds Appraisal Services (Business):
- User: Tom Reynolds (Admin role) → Has Profile (Tom's appraiser credentials)
- User: Sarah Chen (Appraiser role) → Has Profile (Sarah's appraiser credentials)
- User: Assistant (Staff role) → No Profile (not an appraiser)

#### FR-MU-003: Permission Levels
**Must Have**

Three permission levels:

1. **Admin**:
   - Full business settings access
   - Can invite/remove users
   - Can create/edit/delete any appraiser profile
   - Can view all team work and communications
   - Can manage connected banks
   - Can view business-level analytics

2. **Appraiser**:
   - Can manage own appraiser profile (licenses, specialties, coverage)
   - Can view own work assignments
   - Can accept/decline invitations for self
   - Can message about own orders
   - Cannot manage other users or profiles
   - Cannot change business settings

3. **Staff** (Admin/Support):
   - Can view business information
   - Can upload documents for appraisers (if delegated)
   - Cannot manage appraiser profiles
   - Cannot accept work or bids
   - Cannot manage users or business settings
   - Limited administrative tasks only

#### FR-MU-004: Business Settings Page
**Must Have**

New page accessible to Admin users only:
- **Business Information:**
  - Company Name
  - Business Address
  - Primary Contact
  - Phone/Fax
  - Website
- **User Management** (see Section 6)
- **Appraiser Profiles** (list with add/edit/delete)
- **Business-Level Connected Banks** (vs. individual appraiser connections)

#### FR-MU-005: Profile Switcher (For Multi-Profile Users)
**Should Have**

For users who are both admin AND appraiser:
- Profile switcher in header
- Switch between:
  - "Business View" (admin tasks, user management)
  - "My Appraiser Profile" (own credentials, own work)
- Current context clearly indicated

#### FR-MU-006: Aggregate Coverage Display
**Should Have**

When banks view a business (not individual):
- Show union of all appraisers' coverage areas
- List all specialties available across team
- Display total licensed states
- Show which appraisers cover which areas

**Example:**
Reynolds Appraisal Services covers:
- States: FL, GA, AL, CA, IL, IN, WI (7 total)
- Specialties: Commercial, Residential, Industrial, Land
- 3 licensed appraisers

### UI/UX Requirements

**UXR-MU-001: Onboarding Branching**
- During onboarding, after account type selection:
  - **Individual** → Setup single profile
  - **Business** → Setup business info, then create first appraiser profile, then invite team

**UXR-MU-002: Navigation Updates**
- Admin users see additional nav items:
  - "User Management"
  - "Business Settings"
- Appraiser/Staff users do not see these items

**UXR-MU-003: Profile Context Indicator**
- Always show which profile context user is in:
  - "Viewing: Reynolds Appraisal Services"
  - "Viewing: Tom Reynolds (Appraiser)"
- Prevent confusion about whose profile is being edited

### Acceptance Criteria

- ✅ User can select Individual or Business account type during sign-up
- ✅ Business admin can invite team members via email
- ✅ Invited users can create accounts and link to business
- ✅ Permission levels (Admin, Appraiser, Staff) enforced throughout app
- ✅ Admin can create/edit/delete appraiser profiles
- ✅ Appraiser can only edit own profile
- ✅ Staff has read-only access with limited admin tasks
- ✅ Business settings page functional for admins
- ✅ Profile switcher works for multi-role users
- ✅ Aggregate coverage displayed correctly for businesses
- ✅ Users cannot access features beyond their permission level
- ✅ Clear indicators show current profile context

### Dependencies & Considerations

**Technical Dependencies:**
- Backend must support user-profile-business relational data model
- Authentication must include role/permission checking
- APIs must filter data based on user permissions

**Design Dependencies:**
- Need Val + Cody design session to define UX patterns
- Wireframes required before development
- Pattern must apply consistently across all pages

**Blocked Until:**
- Multi-user UX pattern defined (design session scheduled)

---

## 6. User Management (NEW - Jan 6, 2026)

### Purpose
Allow business admins to invite team members, assign roles, and manage user accounts within their organization.

### User Stories

**US-UM-001:** As a business admin, I want to see a list of all users in my organization so I know who has access.

**US-UM-002:** As a business admin, I want to invite new team members via email so they can join our account.

**US-UM-003:** As a business admin, I want to assign roles (Admin, Appraiser, Staff) so users have appropriate permissions.

**US-UM-004:** As a business admin, I want to deactivate users who leave the company so they can't access our account.

**US-UM-005:** As a business admin, I want to resend invitation emails if they weren't received so new users can join.

### Functional Requirements

#### FR-UM-001: User List Page
**Must Have**

Accessible to Admin users only:
- **Location:** Side nav → "User Management"
- **Table columns:**
  - Name
  - Email
  - Role (Admin / Appraiser / Staff)
  - Status (Active / Invited / Inactive)
  - Linked Profile (if appraiser)
  - Last Active
  - Actions (Edit / Deactivate)
- **Actions:**
  - "Invite User" button (primary CTA)
  - Edit user (role, linked profile)
  - Deactivate user (with confirmation)
  - Resend invitation (for invited status)

#### FR-UM-002: Invite User Flow
**Must Have**

**Invite User Modal:**
- Email address (required)
- Role selection (Admin / Appraiser / Staff)
- Link to existing profile (if Appraiser role and profile exists)
- Or: "Create new appraiser profile" option
- Send invitation button

**Invitation Email:**
- Personalized subject: "[Business Name] has invited you to Vendors Circle"
- Includes:
  - Business name
  - Invitation from [Admin Name]
  - Role assigned
  - Link to accept invitation
  - Link expires in 7 days
- CTA: "Accept Invitation"

**Acceptance Flow:**
- User clicks link → Sign-up page pre-filled with email
- User creates password
- User email verified
- User linked to business account
- User sees onboarding based on role:
  - **Appraiser** → Profile setup wizard
  - **Admin** → Business overview
  - **Staff** → Limited intro

#### FR-UM-003: Role Management
**Must Have**

**Edit User Modal:**
- Change role (Admin / Appraiser / Staff)
- If changing TO Appraiser: link to profile or create new
- If changing FROM Appraiser: unlink profile (profile remains, just unlinked)
- Warning if changing permissions will affect user's access
- Save confirmation

**Business Rules:**
- At least one Admin must remain (cannot remove last admin)
- Cannot demote yourself if you're the last admin
- Role changes take effect immediately

#### FR-UM-004: User Deactivation
**Must Have**

**Deactivate User:**
- Confirmation modal: "Deactivate [User Name]?"
- Warning: "They will lose access immediately. Their profile will be preserved."
- Confirm / Cancel buttons

**Effects:**
- User cannot log in
- User remains in list with "Inactive" status
- Appraiser profile preserved (can be linked to different user)
- Work history preserved
- Can be reactivated later

**Reactivation:**
- Admin can click "Reactivate" on inactive user
- User receives email notification of reactivation
- User can log in again

### UI/UX Requirements

**UXR-UM-001: Navigation**
- "User Management" nav item visible to Admin users only
- Badge shows number of pending invitations (if any)

**UXR-UM-002: Empty State**
- Shows when business has no team members yet
- Encouraging message: "Build your team"
- "Invite User" CTA button
- Illustration/icon

**UXR-UM-003: Status Indicators**
- **Active:** Green dot, "Active" label
- **Invited:** Orange dot, "Invited - expires [date]"
- **Inactive:** Gray dot, "Inactive"

**UXR-UM-004: Role Badges**
- **Admin:** Blue badge
- **Appraiser:** Green badge  
- **Staff:** Gray badge

### Acceptance Criteria

- ✅ User Management page accessible to Admin users only
- ✅ Admin can see list of all users in organization
- ✅ Admin can invite new users via email
- ✅ Invitation emails sent successfully with proper links
- ✅ Invited users can accept and create accounts
- ✅ Admin can edit user roles
- ✅ Admin can deactivate users (with confirmation)
- ✅ Cannot remove last admin
- ✅ Deactivated users cannot log in
- ✅ Admin can reactivate users
- ✅ Role changes enforce immediately
- ✅ Empty state shows when no team members
- ✅ Status and role badges display correctly

---

## 7. Onboarding Flow (NEW - Jan 6, 2026)

### Purpose
Guide new users through complete account and profile setup using a step-by-step wizard, ensuring no critical information is missed.

### User Stories

**US-OB-001:** As a new user, I want a guided setup wizard so I don't miss important steps.

**US-OB-002:** As a new user, I want to see my progress through setup so I know how much is left.

**US-OB-003:** As a new user, I want to be able to go back and edit previous steps if I make a mistake.

**US-OB-004:** As a new business owner, I want setup branching based on account type (individual vs. business) so I only see relevant steps.

**US-OB-005:** As a new user, I want to be able to skip optional steps and come back later so I can start using the platform quickly.

### Functional Requirements

#### FR-OB-001: Onboarding Trigger
**Must Have**

Onboarding wizard launches when:
- User completes sign-up and email verification (first-time user)
- User accepts invitation and creates account (invited team member)
- Admin creates new appraiser profile (if creating for someone else)

Can be dismissed and resumed later from profile incomplete banner.

#### FR-OB-002: Stepper Pattern (Specretary Style)
**Must Have**

**Reference:** first-time-setup-modal-reference.png

**Layout:**
- Full-page modal overlay
- Left sidebar:
  - Progress stepper (vertical)
  - Step numbers and titles
  - Check marks for completed steps
  - Current step highlighted
- Content area:
  - Step title and description
  - Form fields for current step
  - Help text/tooltips as needed
- Sticky footer:
  - "Back" button (except step 1)
  - "Continue" button (primary)
  - "Skip for now" (if step is optional)
  - "Cancel" link (returns to app, shows incomplete profile banner)

#### FR-OB-003: Steps for Individual Appraiser
**Must Have**

1. **Welcome & Account Type** (already selected during sign-up, shown as confirmation)
   - "Welcome to Vendors Circle!"
   - Account type: Individual Appraiser
   - Brief description of what to expect
   - Continue button

2. **Personal & Professional Information**
   - First Name, Last Name, Title
   - Company (if applicable, optional)
   - Work Phone, Cell Phone
   - Primary Email (pre-filled from sign-up)

3. **Business Address**
   - Street Address
   - City, State, County, ZIP
   - Type (Office, Home, etc.)
   - Optional: Add additional addresses

4. **Licenses & Credentials**
   - Upload W-9 (optional but recommended)
   - Upload Resume (optional)
   - Add State Licenses:
     - State, License Number, Expiration Date, File
     - Can add multiple
     - At least one recommended

5. **Coverage Areas & Specialties**
   - Select states you serve
   - Select counties within each state
   - Select specialties (Commercial, Residential, etc.)

6. **Review & Complete**
   - Summary of all entered information
   - Edit links for each section
   - "Complete Setup" button
   - Confirmation: "Your profile is now live!"

#### FR-OB-004: Steps for Business Account
**Must Have**

1. **Welcome & Account Type**
   - "Welcome to Vendors Circle!"
   - Account type: Business/Office
   - Brief description
   - Continue button

2. **Business Information**
   - Business/Company Name
   - Business Address
   - Primary Contact Name
   - Business Phone/Fax
   - Website (optional)

3. **Your Admin Profile**
   - First Name, Last Name, Title
   - Work Phone, Cell Phone
   - Email (pre-filled)
   - **Question:** "Are you also a licensed appraiser?"
     - Yes → Continue to create appraiser profile
     - No → Skip to inviting team

4a. **Your Appraiser Profile** (if "Yes" above)
   - Licenses, Coverage Areas, Specialties (same as individual)

4b. **Invite Your Team** (shown after appraiser profile or if admin only)
   - "Let's add your team members"
   - Table to add users:
     - Name, Email, Role (Appraiser / Admin / Staff)
   - Can add multiple or skip
   - "You can always invite team members later"

5. **Review & Complete**
   - Summary of business info
   - Summary of your profile (if applicable)
   - List of invited team members
   - "Complete Setup" button

#### FR-OB-005: Onboarding for Invited Team Members
**Must Have**

**If invited as Appraiser:**
1. Welcome (personalized with business name)
2. Personal Information
3. Licenses & Credentials
4. Coverage Areas & Specialties
5. Review & Complete

**If invited as Admin:**
1. Welcome
2. Personal Information
3. Review & Complete (no appraiser profile needed)

**If invited as Staff:**
1. Welcome
2. Personal Information
3. Review & Complete (minimal setup)

#### FR-OB-006: Progress Persistence
**Should Have**
- Save progress after each step
- User can close wizard and resume later
- Incomplete profile banner shows in app:
  - "Complete your profile to start receiving work" (for appraisers)
  - "Resume Setup" button

### UI/UX Requirements

**UXR-OB-001: Modal Structure**
- Max height: 90vh
- Max width: 1200px
- Centered on screen
- Backdrop blur
- Cannot click outside to close (must use Cancel or Complete)

**UXR-OB-002: Stepper Visual Design**
- Left sidebar: 240px wide, subtle background color
- Steps:
  - Completed: Check mark, muted color
  - Current: Bold, primary color, highlighted
  - Upcoming: Number, muted color
- Line connecting steps

**UXR-OB-003: Content Area**
- Padding: 48px
- Max width for readability (700px)
- Form fields: consistent spacing, clear labels
- Help text: below fields, muted color
- Icons where helpful

**UXR-OB-004: Footer Actions**
- Sticky at bottom
- Buttons right-aligned
- Back (secondary, left)
- Skip for now (text link, center)
- Continue (primary, right)

**UXR-OB-005: Field Validation**
- Inline validation as user types
- Error messages below fields
- Cannot continue if required fields empty or invalid
- Success indicators (green check) for valid fields

### Acceptance Criteria

- ✅ Onboarding launches automatically for new users after sign-up
- ✅ Stepper shows all steps and progress clearly
- ✅ Individual appraiser flow (6 steps) works correctly
- ✅ Business account flow branches correctly
- ✅ Invited team member flow customized by role
- ✅ Back button allows editing previous steps
- ✅ Skip button available for optional steps
- ✅ Progress saved after each step
- ✅ User can cancel and resume later
- ✅ Incomplete profile banner shows if setup not finished
- ✅ Review screen shows all entered data accurately
- ✅ Complete button finalizes setup and redirects to app
- ✅ Form validation prevents invalid data
- ✅ Accessible (keyboard nav, screen reader)
- ✅ Responsive (desktop, tablet - mobile uses simple form)

---

## 8. Sign-Up Flow (NEW - Jan 6, 2026)

### Purpose
Allow vendors to create accounts without needing a bank invitation, enabling self-service onboarding.

### User Stories

**US-SU-001:** As a vendor, I want to create an account on my own so I don't have to wait for a bank invitation.

**US-SU-002:** As a vendor, I want to choose between individual and business account types during sign-up so I get the right experience.

**US-SU-003:** As a vendor, I want to verify my email address so the platform knows I'm legitimate.

**US-SU-004:** As a vendor, I want a simple sign-up form so I can get started quickly.

### Functional Requirements

#### FR-SU-001: Sign-Up Landing Page
**Must Have**

**URL:** `/sign-up` or `/register`

**Page Content:**
- Vendors Circle logo
- Headline: "Join Vendors Circle"
- Subheading: "Connect with banks. Manage credentials. Grow your business."
- Sign-up form (see below)
- "Already have an account? Sign in" link
- Footer with help/contact link

#### FR-SU-002: Sign-Up Form
**Must Have**

**Fields:**
1. **Account Type** (radio buttons or cards):
   - Individual Appraiser
   - Business/Office
   - Help text for each option
2. **Email Address** (required)
   - Validation: proper email format
   - Check: Email not already registered
3. **Password** (required)
   - Minimum 8 characters
   - Must include: letter, number, special character
   - Strength indicator (weak/medium/strong)
4. **Confirm Password** (required)
   - Must match password
5. **Terms & Conditions** (checkbox, required)
   - "I agree to the Terms of Service and Privacy Policy"
   - Links open in new tab
6. **Submit Button:** "Create Account" (primary CTA)

**Validation:**
- Inline validation as user types
- Error messages below fields
- Cannot submit if validation fails
- Loading state on submit button

#### FR-SU-003: Email Verification Flow
**Must Have**

**After sign-up submission:**
1. Account created in "unverified" state
2. Verification email sent immediately
3. User redirected to "Check Your Email" page

**"Check Your Email" Page:**
- Success icon
- "Verify your email address"
- "We sent a verification email to [email]"
- "Click the link in the email to continue"
- "Didn't receive it? Resend" button (available after 60 seconds)
- Can't log in until verified

**Verification Email:**
- Subject: "Verify your Vendors Circle email address"
- Sender: Vendors Circle <noreply@vendorscircle.com>
- Content:
  - Welcome message
  - "Verify Email" CTA button
  - Link expires in 24 hours
  - Plain text alternative
- Clicking link:
  - Verifies email
  - Redirects to login page with success message
  - Or directly logs user in and starts onboarding

#### FR-SU-004: Sign-In Integration
**Must Have**

**Sign-In Page:**
- Email and password fields
- "Forgot password?" link
- "Sign in" button
- "Don't have an account? Sign up" link

**After successful sign-in:**
- If profile incomplete → Launch onboarding wizard
- If profile complete → Redirect to My Requests (landing page)

#### FR-SU-005: Password Reset Flow
**Should Have**

**Forgot Password Page:**
- Email field
- "Send reset link" button
- Success message: "Check your email for reset instructions"

**Reset Email:**
- "Reset your Vendors Circle password"
- Link expires in 1 hour
- Clicking link → Reset password page

**Reset Password Page:**
- New password field
- Confirm password field
- Submit button
- Success → Redirect to login with message

### UI/UX Requirements

**UXR-SU-001: Sign-Up Page Design**
- Clean, professional layout
- Centered form (max width 480px)
- Generous whitespace
- Brand colors
- Subtle background (not distracting)
- Mobile-friendly

**UXR-SU-002: Account Type Selection**
- Card-based selection (not just radio buttons)
- Each card shows:
  - Icon (user for individual, building for business)
  - Title
  - Brief description (2-3 sentences)
- Selected card highlighted
- Hover states

**UXR-SU-003: Password Strength**
- Visual indicator (progress bar or steps)
- Colors: Red (weak) → Yellow (medium) → Green (strong)
- Real-time as user types
- Encourages strong passwords

**UXR-SU-004: Error Handling**
- Clear, specific error messages
- "This email is already registered. Sign in instead?"
- "Password must be at least 8 characters"
- Not just generic "Invalid input"

### Acceptance Criteria

- ✅ Sign-up page accessible at `/sign-up` or `/register`
- ✅ User can select Individual or Business account type
- ✅ Email validation checks format and uniqueness
- ✅ Password validation enforces strength requirements
- ✅ Password confirmation must match
- ✅ Terms checkbox required before submission
- ✅ Account created successfully
- ✅ Verification email sent immediately
- ✅ User redirected to "Check Your Email" page
- ✅ Verification link in email works correctly
- ✅ Clicking verification link verifies email and logs user in
- ✅ Onboarding wizard launches after verification
- ✅ "Resend verification" works after 60 seconds
- ✅ Expired verification links show appropriate error
- ✅ Sign-in page allows login after verification
- ✅ Password reset flow functional
- ✅ Cannot log in with unverified email
- ✅ Accessible (keyboard, screen reader)
- ✅ Mobile-friendly design

---

## 9. Message Threads (NEW - Jan 6, 2026)

### Purpose
Enable communication between vendors and banks regarding specific orders within the Vendors Circle app, eliminating need to switch to external platforms.

### User Stories

**US-MT-001:** As a vendor, I want to message the bank about an order so I can ask clarifying questions.

**US-MT-002:** As a vendor, I want to see all message threads in one place so I can track communications.

**US-MT-003:** As a vendor, I want notifications when I receive new messages so I don't miss important communications.

**US-MT-004:** As a vendor, I want to attach files to messages so I can share documents with the bank.

**US-MT-005:** As a vendor, I want to see message history for closed orders so I can reference past communications.

### Functional Requirements

**⚠️ NOTE:** Requirements pending clarification with Ed/Jason. Below is preliminary based on standard messaging patterns.

#### FR-MT-001: Message Threads List Page
**Must Have** (pending scope confirmation)

**Location:** Side nav → "Messages" (or integrated into My Requests)

**Page Content:**
- List of message threads
- Each thread shows:
  - Order/Property info (address, file number)
  - Bank name + logo
  - Last message preview
  - Timestamp
  - Unread indicator (badge or dot)
  - Thread status (Open / Resolved)
- Filters:
  - All / Unread / Resolved
  - By Bank
- Search threads

**Empty State:**
- "No messages yet"
- "Messages about your orders will appear here"

#### FR-MT-002: Individual Thread View
**Must Have** (pending scope confirmation)

**Layout:**
- Header:
  - Order details (property, file number, due date)
  - Bank info
  - "Mark as Resolved" button
  - Back to list
- Message list (scrollable, chronological):
  - Sender name + role (Bank Rep / Vendor)
  - Timestamp
  - Message content
  - Attached files (if any)
  - Vendor messages right-aligned, bank messages left-aligned
- Reply area (sticky at bottom):
  - Text input (expandable)
  - Attach file button
  - Send button

#### FR-MT-003: Sending Messages
**Must Have** (pending scope confirmation)

**Requirements:**
- Text input with multi-line support
- Max message length: 2000 characters (with counter)
- Support attachments (PDF, images, common doc formats)
- Max file size: 10MB per file
- Max 5 files per message
- Send button disabled if message empty
- Sending state (loading indicator)
- Success confirmation (message appears in thread)

#### FR-MT-004: Notifications
**Must Have** (pending scope confirmation)

**Unread Message Indicators:**
- Badge on "Messages" nav item (count of unread)
- Badge on individual threads in list
- Notification bell in header shows new message alert

**Email Notifications** (optional):
- Email sent when vendor receives new message
- Email includes message preview and link to thread
- User can configure email preferences

#### FR-MT-005: Thread Status Management
**Should Have** (pending scope confirmation)

**Thread Statuses:**
- **Open:** Active conversation
- **Resolved:** Issue addressed, thread closed
- User can mark thread as resolved
- Bank can also mark as resolved
- Resolved threads moved to separate section/filter
- Can reopen thread if needed

### UI/UX Requirements

**UXR-MT-001: Message List Design**
- Card-based or list-based layout
- Clear visual distinction between read/unread
- Subtle hover states
- Skeleton loading while fetching

**UXR-MT-002: Thread View Design**
- Chat-style message display
- Clear sender identification
- Timestamps (relative: "2 hours ago" or absolute)
- File attachments shown as cards (icon, filename, size, download link)
- Smooth scrolling
- Auto-scroll to latest message on open

**UXR-MT-003: Reply Area**
- Always visible (sticky footer)
- Text area expands as user types (up to 4-5 lines)
- Attach file button with icon
- Send button prominent (primary color)
- Character count shown when approaching limit

**UXR-MT-004: Mobile Considerations**
- Thread list: Stack vertically, touch-friendly
- Thread view: Full screen, back button, simple reply area
- Attachments: Easy to tap/download

### Acceptance Criteria

**⚠️ PENDING:** These criteria subject to change based on clarification with Ed/Jason.

- ✅ Message threads list displays all conversations
- ✅ Unread indicator shows on threads and nav
- ✅ Clicking thread opens conversation view
- ✅ User can send text messages
- ✅ User can attach files (PDF, images, docs)
- ✅ Messages appear in chronological order
- ✅ Vendor messages visually distinct from bank messages
- ✅ Timestamp shown for each message
- ✅ Files can be downloaded
- ✅ Notification badge updates when new message received
- ✅ User can mark thread as resolved
- ✅ Filters work correctly (All/Unread/Resolved)
- ✅ Search finds threads by order/property/content
- ✅ Empty state shown when no threads
- ✅ Accessible (keyboard nav, screen reader)
- ✅ Mobile-friendly design

### Questions for Clarification

**TO DISCUSS WITH ED/JASON:**
1. **Scope:** Which orders should have message threads?
   - All orders?
   - Only after certain workflow stage?
   - Only if initiated by vendor or bank?
2. **Participants:** Who can message?
   - Vendor ↔ Bank admin only?
   - Vendor ↔ Specific bank reviewer?
   - Vendor ↔ Multiple bank contacts?
3. **Integration:**
   - Link from My Requests table?
   - Separate page or integrated into order detail?
4. **Features:**
   - File attachments required?
   - Email notifications?
   - Read receipts?
   - Typing indicators?
5. **Technical:**
   - Real-time messaging (WebSockets)?
   - Or poll-based updates?
   - Message retention policy?

### Dependencies

- **Blocked by:** Clarification call with Ed/Jason
- **Technical:** Backend messaging service/API
- **Design:** Wireframes after requirements confirmed

---

## Navigation & Layout

### Side Navigation (Primary)

**Structure:**
```
┌─ Logo ────────────┐
│ [Vendors Circle]  │
├───────────────────┤
│ 📊 My Requests    │ ← Landing page, badge with count
│ ✉️ My Invites     │ ← Badge if pending invites
│ 📄 My Credentials │ ← Warning badge if expirations
│ 👤 Profile        │
├───────────────────┤
│ [Collapse] ►◄    │
├───────────────────┤
│ 🌓 Theme Toggle   │
│ 🔌 Powered by     │
│    Realwired      │
└───────────────────┘
```

**Collapsed State:**
- Shows icons only
- Tooltips on hover
- Expand button

### Top Bar

**Structure:**
```
[Logo/Home] | [Page Title/Breadcrumbs]        [Search] [🔔] [User Menu ▼]
```

**User Menu Dropdown:**
- View Profile
- Settings (Phase 2)
- Help & Support
- Logout (returns to role selection)

### Responsive Behavior

**Desktop (1024px+):**
- Side nav always visible
- Can be collapsed to icon-only

**Tablet (768px-1023px):**
- Side nav starts collapsed
- Expand on toggle
- Overlay mode

**Mobile (< 768px):**
- Side nav in drawer (off-canvas)
- Hamburger menu icon in top bar
- Swipe to open

---

## Design System

### Brand Colors

**Primary:** `#2652B1` (Realwired/Vendors Circle Blue)

**Semantic Colors:**
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)
- Info: `#3B82F6` (Blue)

**Neutrals:**
- Gray scale from `#F9FAFB` to `#111827`

**Light Mode:**
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`

**Dark Mode:**
- Background: `#0F172A`
- Surface: `#1E293B`
- Border: `#334155`

### Typography

**Font Family:** Inter (Google Fonts fallback: system-ui, sans-serif)

**Scale:**
- H1: 36px / 2.25rem (Page titles)
- H2: 30px / 1.875rem (Section headers)
- H3: 24px / 1.5rem (Card titles)
- H4: 20px / 1.25rem (Sub-sections)
- Body: 16px / 1rem (Default text)
- Small: 14px / 0.875rem (Secondary text)
- XS: 12px / 0.75rem (Labels, captions)

**Line Height:**
- Headings: 1.2
- Body: 1.5
- Small/XS: 1.4

### Spacing

**Base unit:** 4px (0.25rem)

**Scale (Tailwind):**
- 0: 0
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px
- 16: 64px

### Components (via shadcn/ui)

- Button
- Input
- Select/Dropdown
- Checkbox
- Radio
- Textarea
- Badge
- Card
- Modal/Dialog
- Toast/Alert
- Table
- Accordion
- Tabs
- Tooltip
- Date Picker
- File Upload

### Icons

**Library:** Lucide React
**Size:** 20px default, 16px small, 24px large
**Stroke:** 2px

---

## Non-Functional Requirements

### Performance

**NFR-P-001:** Page load time < 2 seconds on 3G connection
**NFR-P-002:** Time to interactive < 3 seconds
**NFR-P-003:** Smooth animations (60fps)
**NFR-P-004:** File upload progress feedback for files > 1MB
**NFR-P-005:** Optimistic UI updates (instant feedback)

### Accessibility

**NFR-A-001:** WCAG 2.1 Level AA compliance
**NFR-A-002:** Keyboard navigation for all features
**NFR-A-003:** Screen reader support with ARIA labels
**NFR-A-004:** Color contrast ratios min 4.5:1 for text
**NFR-A-005:** Focus indicators on all interactive elements
**NFR-A-006:** Alternative text for all images/icons
**NFR-A-007:** Semantic HTML (headings, landmarks, etc.)

### Browser Support

**NFR-B-001:** Chrome/Edge (last 2 versions)
**NFR-B-002:** Firefox (last 2 versions)
**NFR-B-003:** Safari (last 2 versions)
**NFR-B-004:** No IE11 support

### Responsive Design

**NFR-R-001:** Desktop-first approach (primary use case)
**NFR-R-002:** Tablet-optimized layouts
**NFR-R-003:** Mobile-functional (view/check, limited editing)
**NFR-R-004:** Breakpoints: 640px, 768px, 1024px, 1280px

### Security (Demo Considerations)

**NFR-S-001:** Client-side validation only (no backend)
**NFR-S-002:** Mock authentication (no real passwords)
**NFR-S-003:** LocalStorage for demo persistence
**NFR-S-004:** No actual file uploads (show filename only)

---

## Success Metrics

### Launch Criteria (Phase 1 - UPDATED)

**Core Features:**
- ✅ All 4 core pages functional (My Requests, Invites, My Credentials, Profile)
- ✅ Responsive design works on desktop, tablet, mobile
- ✅ WCAG AA accessible
- ✅ Light and dark mode implemented
- ✅ Zero critical bugs
- ✅ Load time < 2 seconds

**NEW Requirements (Added Jan 6, 2026):**
- ✅ Multi-user business support functional
- ✅ Both individual and business account types work
- ✅ User management page functional for admins
- ✅ Onboarding wizard guides new users through setup
- ✅ Sign-up flow allows self-service registration
- ✅ Email verification working
- ✅ Message threads functional (pending requirements)
- ✅ Permission levels enforced (Admin/Appraiser/Staff)
- ✅ Profile switcher works for multi-role users

### User Success Metrics (Post-Launch)

- Profile completion rate > 80%
- Time to complete profile < 15 minutes
- License upload success rate > 95%
- Return visit frequency (weekly)
- Feature adoption (% using coverage areas, specialties, etc.)

### Business Success Metrics

- Support tickets < 10/month
- User satisfaction score > 4/5
- Vendor retention rate
- Multi-bank vendor growth
- Time saved per vendor (measured via survey)

---

## Future Enhancements (Phase 2+)

**⚠️ NOTE:** Per January 6, 2026 meeting with Ed, these features are explicitly Phase 2. Focus is on achieving **parity with RIMS 360** first (Phase 1), then evolving to community/engagement features (Phase 2).

### Metrics & Dashboards (Phase 2)
- Performance dashboard with aggregate metrics
- Pie charts for bid conversion rates
- Analytics across orders
- Relationship health indicators
- Benchmark comparisons (vendor vs. peer average)
- Time tracking and productivity metrics

### AI Review Features (Phase 2)
- AI review per vendor basis (individual performance analysis)
- AI review across all banks (aggregate feedback)
- AI-generated insights and suggestions
- Performance predictions
- Quality score automation

### Community & Engagement Features (Phase 2)
- Kudos/recognition system from banks
- Public feedback mechanisms (opt-in)
- Vendor-to-vendor networking (optional)
- Forums or discussion boards
- Success stories showcase
- Industry news/updates feed

### Feedback Mechanisms (Phase 2)
- Give vendors feedback after orders
- General vendor feedback tool (not order-specific)
- Rating systems (with bank participation)
- Reputation scores
- Improvement suggestions

### Productivity Features (Phase 2+)
- Smart notifications (expiration reminders, work deadlines)
- Bulk license upload
- Profile templates
- Export data to PDF
- Auto-populate forms from profile

### Mobile Features (Phase 2+)
- Native mobile app (iOS/Android)
- Camera-based license upload
- Push notifications
- Offline mode for viewing
- Mobile bid submission

### Integration Features (Phase 2+)
- Calendar integration for due dates
- AI Review Forms pre-submission check
- Industry data sources
- CRM integrations

---

## Appendix

### Glossary

- **Fee Appraiser:** Licensed independent appraiser who works with banks on contract basis
- **Chief Appraiser:** Bank employee who manages appraisal department and vendor relationships
- **Vendor Circle:** Centralized credential management platform (this product)
- **UConnect:** Bank-side platform (Phase 2, out of scope)
- **Coverage Area:** Geographic region (state/counties) where vendor is licensed to work
- **Specialty:** Type of appraisal work (Commercial, Residential, etc.)
- **Designation:** Bank-specific vendor role (Appraiser, Reviewer, Evaluator)

### References

- [Walkthrough Transcript](../processed-calls/Vendors-Circle-Walkthrough-December-19-2025-Processed.md)
- [Discovery Call Transcript](../processed-calls/Vendor-Circle-UX-Discovery-December-19-2025-Processed.md)
- [Analysis & Project Plan](../Analysis-and-Project-Plan.md)
- [Realwired Brand Guidelines](#) (TBD)

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-26 | 1.0 | Initial draft | AI Assistant |
| 2026-01-05 | 1.1 | Updated to match implemented prototype (My Requests tabs/filters/pagination, My Invites card UX + badges + no redirect, Licenses → My Credentials route + tabs, Profile tabs + Addresses table + Designations + Connected Banks) | AI Assistant |

---

**Document Status:** Draft  
**Next Review:** After design review with stakeholders  
**Owner:** Val Vinnakota, Cody Miles (Brand Cave)  
**Stakeholders:** Ed Kruger, Jeff Hicks, Sunda Scanlon, Jason (Realwired)

