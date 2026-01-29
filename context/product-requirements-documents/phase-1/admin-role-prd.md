# Vendors Circle - Realwired Admin Role PRD
**Phase:** 1  
**Release Target:** Q1 2026 (Revised)  
**Product:** Vendors Circle  
**Role:** Realwired Admin (System Administrator)  
**Status:** v3.0 - Active Development  
**Created:** 2025-12-20  
**Last Updated:** 2026-01-13 (End of Day)

**⚠️ RENAMED:** "Bank Admin" → "Realwired Admin" (as of Jan 13, 2026)

**✅ IMPLEMENTATION STATUS:**
- Desktop experience: ✅ 100% Complete
- Mobile experience: ✅ 100% Complete
- Authentication: ✅ 100% Complete
- Onboarding wizard: ⏳ Week 3 (Planned)
- Scorecards: ⏳ Week 8 (Planned)
- Overall: 90% Complete

**⚠️ NOTE:** This PRD covers **Realwired Admin** (system administrators managing vendor network). This is different from **Business Admin** (appraisal office owners), which is covered in `business-admin-role-prd.md`.

---

## Executive Summary

The **Realwired Admin Role** (formerly "Bank Admin") provides system administrators with the ability to manage the vendor database and maintain system-wide settings like specialty types. Realwired Admins have read-only access to vendor profiles for support purposes and full control over specialty management.

**Key Responsibilities:**
1. Search and view vendor profiles (read-only)
2. View complete vendor credentials for compliance
3. Manage specialty types (CRUD operations)
4. **NEW (Week 8):** Manage scorecards (vendor performance evaluation)
5. Monitor vendor network health

**⚠️ Important Distinction:**
- **Realwired Admin** = System administrators (this role) - Manage vendor network
- **Business Admin** = Appraisal office owners (different role) - Manage their team
- See `business-admin-role-prd.md` for Business Admin functionality

---

## ✅ Implementation Status (January 13, 2026)

### COMPLETED Features - Desktop:

**UI/UX Refinements:**
- ✅ Search bar moved to header (next to "Vendors" title)
- ✅ Filter button in header with count badge
- ✅ Filter modal: Default filters (State, Specialty)
- ✅ "Show Advanced" toggle expands modal for additional filters (Postal Code, Within, County)
- ✅ Applied filters show as removable pills with smooth transitions
- ✅ Badge overflow component with "+N" tooltip (fixed positioning, no scroll issues)
- ✅ Breadcrumbs navigation on Vendor Detail page
- ✅ Tabs top padding on Vendor Detail
- ✅ Header title font size reduced
- ✅ Theme toggle: Segmented controller with icons only (☀️ | 🌙), full width
- ✅ Pagination: Icon buttons (◀ ▶) instead of text for consistency
- ✅ Smooth transitions throughout (200-300ms, CSS-based)
- ✅ All dropdowns with smooth slide-down animations
- ✅ All modals with smooth zoom-in + slide-up animations
- ✅ All icon buttons have accessibility labels

**Components:**
- ✅ `components/breadcrumbs.tsx`
- ✅ `components/modal.tsx` (with smooth animations)
- ✅ `components/top-header.tsx` (segmented theme toggle, animated dropdowns)
- ✅ `BadgeOverflow` component with fixed tooltip positioning

**Animation Implementation:**
- ✅ Tailwind CSS animations (CSS-based, no library conflicts)
- ✅ Global transitions in `globals.css` for all interactive elements
- ✅ Smooth accordion expansions with height + opacity transitions
- ✅ Icon rotations with transform transitions
- ✅ Note: Framer Motion incompatible with Next.js 16.1.1 Turbopack

### PENDING Features:

**Complex Items:**
- ⬜ Null/empty states for all views
- ⬜ Skeleton loading states
- ⬜ Mobile design

**Major Features:**
- ⚠️ Admin scorecards (requires research with Jason)
- ⬜ User management interface for multi-user businesses (requires multi-user pattern definition)

**Overall Progress:** ~15% complete

---

## Problem Statement

### Current State

System administrators need the ability to:
- Search across all vendors in the system for support queries
- View vendor profiles to troubleshoot issues
- Maintain the global list of specialties available to all vendors
- Ensure data quality and consistency

### User Impact

Without proper admin tools:
- Support requests take longer to resolve
- No way to search/find specific vendors
- Specialty list becomes outdated or inconsistent
- Manual database queries required for basic operations

---

## Target Users

### Primary Persona: System Administrator

**Name:** Sarah Chen  
**Role:** Vendors Circle Administrator  
**Company:** Realwired  
**Experience:** 3 years in SaaS administration

**Technical Proficiency:**
- High - comfortable with complex interfaces
- Desktop-focused
- Keyboard shortcuts power user
- Expects modern, efficient tools

**Daily Tasks:**
- Respond to vendor support tickets
- Search for vendor information
- Update specialty list as needed
- Monitor system health

**Goals:**
- Quick vendor lookup for support
- Maintain clean, consistent data
- Efficient workflows
- Minimal clicks to accomplish tasks

**Pain Points (Current System):**
- No search interface (must query database)
- Can't preview vendor profiles easily
- Specialty management requires backend access
- Inefficient support workflows

---

## Solution Overview

### Core Features

**Original Features:**
1. **Vendors List** - Search, filter, and view all vendors
2. **Specialties Management** - CRUD operations for specialty types

**NEW Features (Added Jan 6, 2026):**
3. **Scorecards** - Vendor performance evaluation and tracking
4. **Multi-User Support** - View business account structure and team members

### Key Principles

- **Read-Only Vendor Data:** System admins can view but not edit vendor profiles (vendors edit their own)
- **Global Settings:** Specialty changes affect all vendors
- **Fast Search:** Find vendors quickly with multiple filter options
- **Scorecard Access:** Admins can create and view scorecards (functionality already exists per Cody)
- **Business Visibility:** Admins can see multi-user business structure for support
- **Audit Trail:** Track who made changes (Phase 2)

---

## Feature Requirements

## 1. Vendors List & Search

### Purpose

Enable admins to search across all 27,000+ vendors in the system to find specific vendors for support, data quality checks, or general inquiries.

### User Stories

**US-A-001:** As an admin, I want to search for vendors by name, company, or email so I can quickly find vendor information for support tickets.

**US-A-002:** As an admin, I want to filter vendors by state, specialty, and coverage area so I can find vendors matching specific criteria.

**US-A-003:** As an admin, I want to view a vendor's complete profile so I can see all their information in one place.

**US-A-004:** As an admin, I want to see how many vendors match my search so I understand the result set size.

### Functional Requirements

#### FR-VL-001: Search Interface
**Must Have**

**Global Text Search:**
- Search bar at top of page
- Searches across: First Name, Last Name, Company, Email
- Real-time search as typing (debounced)
- Clear search button
- Placeholder: "Search by name, company, email..."

**Quick Filters:**
- Specialty dropdown (multi-select)
- State dropdown (all 50 states + DC)
- National checkbox
- Apply/Clear filter buttons
- Active filter chips (removable)

**Advanced Filters** (Collapsible):
- Within [X miles] of Postal Code
- County (text input)
- First Name (exact match)
- Last Name (exact match)
- Invited Status (if applicable)
- Date Range (joined date, last updated)

**Modern Search Pattern:**
```
┌─ Search Bar ──────────────────────────────────────────┐
│ 🔍 Search by name, company, email...                  │
└───────────────────────────────────────────────────────┘

┌─ Quick Filters ────────────────────────────────────────┐
│ [Specialty ▼] [State ▼] [National ☐]  [▼ Advanced]   │
└───────────────────────────────────────────────────────┘

┌─ Active Filters ───────────────────────────────────────┐
│ ⚫ Florida ✕  ⚫ Agricultural ✕        Clear all        │
└───────────────────────────────────────────────────────┘

┌─ Results (1 - 10 of 2,487) ─────────────────────────────┐
│ [Vendor cards/table]                                   │
└───────────────────────────────────────────────────────┘
```

#### FR-VL-002: Results Display
**Must Have**

**Table View (Default):**
- Columns:
  - Name (First + Last)
  - Company
  - Email
  - State(s) (primary state or count badge "3 states")
  - Specialties (count badge "5 specialties")
  - Actions (View Profile button)
- Sort by: Name, Company, State (asc/desc)
- Responsive: Collapse to cards on mobile

**Card View (Alternative):**
- Vendor card with photo placeholder
- Name + Company
- Primary email
- State(s) badge
- Specialties badges
- View Profile button

**Pagination:**
- Default: 10 per page
- Options: 5, 10, 15, 20 per page
- Page controls: Previous, 1, 2, 3 ... Next
- Total count: "Showing 1-10 of 27,106 vendors"
- Jump to page input

**Empty State:**
- "No vendors found matching your criteria"
- Suggestions: "Try removing some filters" or "Clear all filters"
- Illustration

#### FR-VL-003: Vendor Profile View
**Must Have**

**Recommendation:** Dedicated page (not modal)

**URL Pattern:** `/admin/vendors/[vendorId]`

**Layout:**
```
┌─ Breadcrumb ────────────────────────────────────────────┐
│ Vendors > Tom Reynolds                                  │
└─────────────────────────────────────────────────────────┘

┌─ Tabs ─────────────────────────────────────────────────┐
│ [Overview] [Licenses] [Coverage Areas] [Activity]      │
└─────────────────────────────────────────────────────────┘

[Tab Content - Read-Only]
```

**Overview Tab:**
- Contact Information (all emails, phones)
- Personal Details (name, company, title)
- Addresses (all addresses listed)
- Specialties (pills/badges)
- Connected Banks (list with logos)

**Licenses Tab:**
- Credentials section (W-9, Resume, Samples)
- State Licenses (grouped by state)
  - Shows: License #, Expiration, File link
  - Status badge (Active, Expiring, Expired)
- Insurance Documentation
  - E&O, General Liability, Auto Liability
  - Shows: Expiration, Limits, Policy #

**Coverage Areas Tab:**
- Map visualization (Phase 2)
- List view by state
- County list (multi-column grid, not comma-separated)
- National badge if applicable

**Activity Tab (Phase 2):**
- Recent profile updates
- License changes
- Bank connections/disconnections
- Last login

**Read-Only Indicators:**
- All fields non-editable (display mode only)
- No Save button
- Info banner: "Viewing as Admin - Read Only"
- No delete or modify actions

**Navigation:**
- Back button → Returns to vendor list with filters preserved
- Breadcrumb links
- Next/Previous vendor (if viewing from search results)

#### FR-VL-004: Filters & Search Persistence
**Must Have**

- Filters persist in URL query params
- Shareable URLs with filters
- Browser back/forward works correctly
- Clear all filters option
- "Save Search" (Phase 2)

### UI/UX Requirements

**UXR-VL-001: Performance**
- Initial load shows first 10 results
- Lazy load additional pages
- Search debounce 300ms
- Loading skeleton for table rows
- Optimistic filter updates

**UXR-VL-002: Accessibility**
- Keyboard navigation through results
- Screen reader announcements for result count
- ARIA labels for all filters
- Focus management for modals/pages

**UXR-VL-003: Responsive**
- Desktop: Table view with all columns
- Tablet: Hide less important columns (e.g., specialties column, show on expand)
- Mobile: Card view, stack vertically

### Data Model

```json
{
  "vendors": [
    {
      "id": "vendor-001",
      "firstName": "Tom",
      "lastName": "Reynolds",
      "company": "Reynolds Appraisal Services",
      "email": "tom@reynoldsappraisals.com",
      "phone": "(813) 555-1234",
      "states": ["FL", "GA", "AL"],
      "specialties": ["Commercial", "Residential", "Industrial"],
      "coverageAreaCount": 3,
      "licenseCount": 5,
      "connectedBanks": 8,
      "joinedDate": "2023-01-15",
      "lastUpdated": "2025-01-10",
      "status": "active"
    }
  ],
  "searchMeta": {
    "total": 27106,
    "page": 1,
    "perPage": 10,
    "filters": {
      "state": "FL",
      "specialty": "Commercial"
    }
  }
}
```

### Acceptance Criteria

- ✅ Can search vendors by name/company/email
- ✅ Filters work and update results
- ✅ Active filter chips display and are removable
- ✅ Pagination works correctly
- ✅ Can view vendor profile (read-only)
- ✅ Profile displays all vendor data organized in tabs
- ✅ Back navigation returns to search with filters intact
- ✅ Responsive on desktop, tablet, mobile
- ✅ Accessible (keyboard, screen reader)
- ✅ Search URL is shareable

---

## 2. Specialties Management

### Purpose

Maintain the global list of specialty types available to all vendors when setting up their profiles.

### User Stories

**US-A-005:** As an admin, I want to add new specialties so vendors have up-to-date options that reflect market needs.

**US-A-006:** As an admin, I want to edit specialty names so terminology stays current and consistent.

**US-A-007:** As an admin, I want to delete unused specialties so the list doesn't become cluttered.

**US-A-008:** As an admin, I want to see which specialties are most commonly used so I understand vendor distribution.

### Functional Requirements

#### FR-SP-001: Specialty List Display
**Must Have**

**Table View:**
- Columns:
  - Key (internal identifier)
  - Name (display name)
  - Vendor Count (# vendors with this specialty) - Phase 2
  - Actions (Edit, Delete)
- Sort by: Name (alphabetical)
- Search/Filter specialties
- Default: Show all (limited list)

**Current Specialties:**
1. Agricultural
2. Equipment
3. Industrial
4. Land
5. Lodging/Hospitality
6. Multi-Family
7. Office
8. Retail
9. Single Family
10. Special Purpose

#### FR-SP-002: Add Specialty
**Must Have**

**Add Button:**
- Top right: "+ Add Specialty"
- Opens modal or inline form

**Add Form:**
- Key (auto-generated from name, or manual entry)
- Name (required, text input)
- Description (optional, textarea) - Phase 2
- Save button
- Cancel button

**Validation:**
- Name required
- Name must be unique
- Key must be unique
- No special characters in key (alphanumeric + hyphens only)

**Success:**
- Toast message: "Specialty added successfully!"
- New specialty appears in list
- List re-sorts alphabetically

#### FR-SP-003: Edit Specialty
**Must Have**

**Edit Action:**
- Edit icon button in Actions column
- Opens modal or inline form
- Same fields as Add Specialty
- Pre-populated with current values

**Save Changes:**
- Update button
- Validation (same as add)
- Confirmation if specialty is in use by vendors (Phase 2)

**Success:**
- Toast message: "Specialty updated successfully!"
- List updates
- Vendors see updated name immediately

#### FR-SP-004: Delete Specialty
**Must Have**

**Delete Action:**
- Delete icon button in Actions column
- Confirmation dialog required
- Warning if specialty is in use (Phase 2)

**Confirmation Dialog:**
- Title: "Delete Specialty?"
- Message: "Are you sure you want to delete '[Specialty Name]'? This action cannot be undone."
- If in use: "Warning: X vendors currently have this specialty selected."
- Buttons: "Cancel" (default), "Delete" (destructive, red)

**Success:**
- Toast message: "Specialty deleted successfully!"
- Removed from list
- Vendors with this specialty: Keep historical data but remove from active selection (Phase 2)

#### FR-SP-005: Bulk Actions (Phase 2)
**Nice to Have**
- Select multiple specialties
- Bulk delete
- Bulk edit (rename pattern)
- Export to CSV

### UI/UX Requirements

**UXR-SP-001: Layout**
- Clean table layout
- Plenty of whitespace
- Clear action buttons
- Hover states for rows

**UXR-SP-002: Modals**
- Add/Edit in modal (not full page)
- Focus management (auto-focus name field)
- Close on escape key
- Click outside to close (with confirmation if unsaved)

**UXR-SP-003: Feedback**
- Toast messages for all actions
- Loading states for save/delete
- Optimistic UI updates
- Error messages inline

**UXR-SP-004: Empty State**
- If no specialties: "No specialties yet. Add your first one!"
- CTA button: "Add Specialty"

### Data Model

```json
{
  "specialties": [
    {
      "id": "spec-001",
      "key": "agricultural",
      "name": "Agricultural",
      "description": "",
      "vendorCount": 145,
      "createdAt": "2023-01-01",
      "updatedAt": "2023-01-01"
    }
  ]
}
```

### Acceptance Criteria

- ✅ Can view list of all specialties
- ✅ Can add new specialty with valid data
- ✅ Can edit existing specialty
- ✅ Can delete specialty with confirmation
- ✅ Validation prevents duplicate names
- ✅ Success/error messages display appropriately
- ✅ Changes reflect immediately in list
- ✅ Responsive design
- ✅ Accessible (keyboard, screen reader)

---

## Navigation & Layout

### Side Navigation (Primary)

**Admin Menu:**
```
┌─ Logo ────────────┐
│ [Vendors Circle]  │
├───────────────────┤
│ 👥 Vendors        │ ← Landing page
│ 🏷️ Specialties    │
├───────────────────┤
│ [Collapse] ►◄    │
├───────────────────┤
│ 🌓 Theme Toggle   │
│ 🔌 Powered by     │
│    Realwired      │
└───────────────────┘
```

**Differences from Vendor Role:**
- Fewer menu items (2 vs 4)
- Different icons
- Different landing page

### Top Bar

**Structure:**
```
[Logo/Home] | [Page Title/Breadcrumbs]        [Search?] [User Menu ▼]
```

**User Menu:**
- Settings (Phase 2)
- Help & Support
- Logout (returns to role selection)

### Responsive Behavior

**Same as Vendor Role:**
- Desktop: Side nav visible, collapsible
- Tablet: Overlay mode
- Mobile: Drawer

---

## Design System

**Note:** Shares same design system as Vendor Role

### Colors

- Same primary brand color: `#2652B1`
- Same semantic colors
- Same light/dark mode palettes

### Typography

- Same font: Inter
- Same scale
- Same line heights

### Components

**Admin-Specific Needs:**
- Table component (vendor list, specialty list)
- Advanced filter panel
- Confirmation dialogs
- Toast notifications
- Breadcrumbs
- Tabs (for vendor profile)

**Shared with Vendor Role:**
- All base components (buttons, inputs, cards, etc.)
- Navigation
- Layout components

---

## Non-Functional Requirements

### Performance

**NFR-P-001:** Search results load in < 1 second for up to 100,000 vendors
**NFR-P-002:** Filter updates feel instant (< 200ms)
**NFR-P-003:** Pagination smooth, no flicker
**NFR-P-004:** Specialty list loads instantly (small dataset)

### Accessibility

**Same as Vendor Role:**
- WCAG 2.1 Level AA
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus indicators
- Semantic HTML

### Security (Demo)

**NFR-S-001:** Mock admin authentication
**NFR-S-002:** Read-only enforcement (client-side in demo)
**NFR-S-003:** No actual data deletion (mock in demo)

### Data Integrity

**NFR-D-001:** Specialty changes propagate to all vendors (in demo: instant update)
**NFR-D-002:** Deleting in-use specialty shows warning (Phase 2)
**NFR-D-003:** Audit trail for all changes (Phase 2)

---

## Success Metrics

### Launch Criteria

- ✅ Vendor search works with all filters
- ✅ Can view vendor profiles (read-only)
- ✅ Can add/edit/delete specialties
- ✅ Responsive design works
- ✅ WCAG AA accessible
- ✅ Light and dark mode
- ✅ Mock data populated (20 vendors, 10 specialties)

### Admin Success Metrics (Post-Launch)

- Time to find vendor < 30 seconds
- Support ticket resolution time decreased
- Admin satisfaction score > 4.5/5
- Zero data corruption incidents

### System Success Metrics

- Search performance < 1 second
- Specialty list accuracy 100%
- No unauthorized edits (read-only enforced)

---

## Future Enhancements (Phase 2+)

### Enhanced Search
- Saved searches
- Export search results to CSV
- Bulk actions on vendors
- Advanced analytics on vendor data

### Specialty Management
- Specialty usage statistics
- Merge specialties
- Deprecate vs delete
- Specialty groups/categories

### Vendor Management
- Edit vendor data (with approval workflow)
- Bulk vendor operations
- Vendor import/export
- Data quality dashboard

### Admin Features
- Activity logs
- Audit trail
- Admin roles/permissions
- Multi-admin support

### Integrations
- Analytics dashboard
- Reporting tools
- Data exports
- API access for integrations

---

## Appendix

### Admin vs Bank Administrator

**Important Distinction:**

**Admin (This Role):**
- Manages Vendors Circle application itself
- Read-only view of vendor profiles
- Manages global settings (specialties)
- Support/operations role

**Bank Administrator (Phase 2 - UConnect Circle):**
- Works within UConnect application
- Can search Circle, invite vendors, import vendors
- Reviews vendor updates, accepts/rejects changes
- Manages their bank's vendor list
- Banking client role

### Glossary

- **Admin:** System administrator for Vendors Circle application
- **Vendor List:** Complete database of all vendors in Circle
- **Specialty:** Type of appraisal work (Agricultural, Industrial, etc.)
- **Read-Only:** Can view but not edit
- **CRUD:** Create, Read, Update, Delete operations

### References

- [Vendor Role PRD](./vendor-role-prd.md)
- [Walkthrough Transcript](../processed-calls/Vendors-Circle-Walkthrough-December-19-2025-Processed.md)
- [Discovery Call Transcript](../processed-calls/Vendor-Circle-UX-Discovery-December-19-2025-Processed.md)
- [Analysis & Project Plan](../Analysis-and-Project-Plan.md)

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-26 | 1.0 | Initial draft | AI Assistant |

---

**Document Status:** Draft  
**Next Review:** After design review with stakeholders  
**Owner:** Val Vinnakota, Cody Miles (Brand Cave)  
**Stakeholders:** Ed Kruger, Jeff Hicks, Sunda Scanlon, Jason (Realwired)

