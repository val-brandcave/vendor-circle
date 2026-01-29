# Implementation Plan with Detailed Design Specs
## January 13, 2026 Meeting - Ready for Execution

**Created:** January 20, 2026  
**For:** Val Vinnakota (Design Lead)  
**Based On:** Jan 13, 2026 Client Meeting + Val's Clarifications  
**Status:** Ready for Implementation  

---

## 📋 TABLE OF CONTENTS

1. [Business vs Individual Vendor: Clear Structure](#business-vs-individual-vendor-clear-structure)
2. [Bids & Assignment Flow for Business](#bids--assignment-flow-for-business)
3. [Top 5 Critical Design Specs (Detailed)](#top-5-critical-design-specs-detailed)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Mobile Translation Strategy](#mobile-translation-strategy)
6. [Component Architecture](#component-architecture)

---

## 🏢 BUSINESS VS INDIVIDUAL VENDOR: CLEAR STRUCTURE

### The Unified Account Model (Post-Meeting Decision)

After the meeting, we're moving to a **single unified account type** where users add profiles as needed. However, the **experience differs based on context**.

### How They Differ

#### **1. NAVIGATION STRUCTURE**

**Individual Vendor:**
```
Top Section (Main Actions):
├── 🏠 Dashboard (My Requests landing)
├── 📊 My Requests (Bids/Reports)
├── ✉️ Invites
├── 📄 My Documents
└── 👤 My Profile

Bottom Section (Settings):
├── ⚙️ Account Settings
└── ❓ Help & Support
```

**Business (Multi-Profile User):**
```
Top Section (Main Actions):
├── 🏠 Dashboard (Business overview)
├── 📊 Bids & Assignments  ← NEW! Business-level bids
├── ✉️ Invites              ← Business receives invites
├── 👥 Team & Profiles       ← Manage users and appraiser profiles
└── 📈 Reports (future)

Bottom Section (Settings):
├── 🏢 Business Settings
├── ⚙️ Account Settings
└── ❓ Help & Support
```

**Key Difference:** Business users have **team management** and **assignment capabilities** that individual vendors don't have.

---

#### **2. DASHBOARD CONTENT**

**Individual Vendor Dashboard:**
- **Personal metrics:**
  - Total Bids (active count)
  - Turnaround Time (personal)
  - Completion Rate (personal)
  - Business Rating (personal from banks)
  
- **My Active Work:**
  - Bids needing response
  - Reports in process
  - Quick access to urgent items

- **Get Started Section** (if incomplete):
  - Complete your profile
  - Upload licenses
  - Add coverage areas
  - Set up documents

- **Recent Activity:**
  - Your license updated
  - You accepted bid from Finance Bank
  - Report submitted for property X

**Business Dashboard:**
- **Business performance metrics:**
  - Total Bids (business-wide)
  - Turnaround Time (team average)
  - Team Utilization (% capacity)
  - Business Rating (aggregate from all appraisers)
  - Late Items (team-wide)
  - Connected Banks
  - License Coverage (states covered by team)

- **Team Performance:**
  - Top performers this month
  - Team members needing help (overloaded/late)
  - License expirations coming up

- **Get Started Section** (if incomplete):
  - Complete business profile
  - Add team members
  - Complete appraiser profiles
  - Set up business documents

- **Recent Activity:**
  - David Kim accepted bid from Wells Fargo
  - Maria Gonzalez completed report for property Y
  - New team member joined
  - License expiring soon alert

**Key Difference:** Individual focuses on personal performance; Business focuses on team performance and management.

---

#### **3. BIDS & INVITES PAGE**

**Individual Vendor - "My Requests":**
- **Bids Tab:**
  - Shows bids sent **directly to this vendor**
  - Vendor accepts/declines personally
  - Becomes their work when accepted
  
- **Reports Tab:**
  - Shows reports **assigned to this vendor**
  - Tracks their personal work progress

**Business - "Bids & Assignments":**
- **Unassigned Bids Tab:**
  - Shows bids sent to **business entity** (not specific appraiser)
  - Business admin sees all
  - Can assign to team member
  - Filters: by property type, location, specialty needed
  
- **Assigned Work Tab:**
  - Shows all work assigned to team members
  - Can reassign if needed
  - View by team member or by status
  - See who's working on what

- **Team Capacity View:**
  - Quick glance: who has capacity
  - Color-coded: 🟢 Available | 🟡 Busy | 🔴 At Capacity

**Invites Page:**

**Individual:**
- Shows invites to connect with banks (relationship invites)
- Accept/decline for yourself

**Business:**
- Shows invites to connect business entity with banks
- Accept/decline affects entire business
- Can specify which team members will service the bank

**Key Difference:** Business receives and assigns bids; Individual receives and accepts personally.

---

### THE BIG OPPORTUNITY: Business Bid Assignment Flow

This is a **major differentiator** and needs thoughtful design. Here's the complete flow:

---

## 📊 BIDS & ASSIGNMENT FLOW FOR BUSINESS

### User Story
> As a business admin, when I receive a bid from a bank, I need to assign it to the right team member based on their specialties, availability, and workload, so work is distributed efficiently and we maintain quality.

### The Complete Flow

#### **Step 1: Bid Arrives at Business Level**

**Scenario:** Wells Fargo sends bid for commercial appraisal in San Diego

**System Behavior:**
- Bid arrives addressed to "Coastal Appraisal Group" (business entity)
- Goes to "Unassigned Bids" queue
- Business admin (Sarah) gets notification
- Badge count updates on "Bids & Assignments" nav item

**UI - Unassigned Bids Queue:**
```
┌─────────────────────────────────────────────────┐
│ Unassigned Bids (3)                     Sort ▼  │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📍 1234 Market St, San Diego, CA               │
│ 🏢 Commercial Appraisal                        │
│ 🏦 Wells Fargo                                 │
│ 📅 Due: Jan 25, 2026 (5 days)                 │
│ 💰 Fee: $2,500                                 │
│                                                 │
│ Specialties Needed: Commercial, Urban         │
│ Coverage: San Diego County                     │
│                                                 │
│ [View Details]  [Assign to Team Member →]      │
│                                                 │
├─────────────────────────────────────────────────┤
│ ... more bids ...                               │
└─────────────────────────────────────────────────┘
```

---

#### **Step 2: Admin Views Bid Details**

**Click "View Details" opens modal/side panel:**

```
┌────────────────────────────────────────────────┐
│ Bid Details                              [×]   │
├────────────────────────────────────────────────┤
│                                                │
│ Property Information                           │
│ ├─ Address: 1234 Market St, San Diego        │
│ ├─ Type: Commercial Office Building           │
│ ├─ Sq Ft: 15,000                              │
│ └─ Property Type: Commercial                   │
│                                                │
│ Bid Information                                │
│ ├─ Bank: Wells Fargo                          │
│ ├─ File #: WF-2026-0123                       │
│ ├─ Due Date: Jan 25, 2026 (5 days)           │
│ ├─ Fee: $2,500                                │
│ └─ Inspection By: Jan 20, 2026                │
│                                                │
│ Requirements                                   │
│ ├─ Specialties: Commercial, Urban             │
│ ├─ License: CA required                       │
│ ├─ Coverage: San Diego County                 │
│ └─ Additional: Interior photos required       │
│                                                │
│ Bank Notes                                     │
│ "Rush job - client needs by end of month.     │
│  High visibility property."                    │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │  💡 Recommended Team Members:            │  │
│ │                                          │  │
│ │  ✅ David Kim                            │  │
│ │     Match: Commercial specialty          │  │
│ │     Current load: 6 active (🟡 Busy)    │  │
│ │                                          │  │
│ │  ✅ Maria Gonzalez                       │  │
│ │     Match: Commercial + Urban            │  │
│ │     Current load: 4 active (🟢 Available)│ │
│ │                                          │  │
│ │  ⚠️  James Wilson                        │  │
│ │     Match: Commercial only (no Urban)    │  │
│ │     Current load: 8 active (🔴 Full)    │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ [Assign to Team Member]  [Decline Bid]        │
│                                                │
└────────────────────────────────────────────────┘
```

**Key Features:**
- **Smart Recommendations:** System suggests best matches based on:
  - Specialty match
  - License coverage
  - Current workload
  - Past performance on similar work
  - Availability
  
- **Visual Workload Indicators:**
  - 🟢 Available (0-5 active jobs)
  - 🟡 Busy (6-8 active jobs)
  - 🔴 At Capacity (9+ active jobs)

---

#### **Step 3: Admin Assigns to Team Member**

**Click "Assign to Team Member" opens assignment modal:**

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
│ ┌──────────────────────────────────────────┐  │
│ │ ● Maria Gonzalez                         │  │
│ │   🟢 4 active jobs | ⭐ 4.8 rating       │  │
│ │   ✓ Commercial, Urban specialties        │  │
│ │   💡 Recommended                         │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ ○ David Kim                              │  │
│ │   🟡 6 active jobs | ⭐ 4.9 rating       │  │
│ │   ✓ Commercial specialty                 │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ ○ James Wilson                           │  │
│ │   🔴 8 active jobs | ⭐ 4.6 rating       │  │
│ │   ⚠️  No Urban specialty                 │  │
│ │   At capacity - not recommended          │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Priority Level                                 │
│ ○ Normal   ● Rush   ○ Critical                │
│                                                │
│ Add Note for Team Member (Optional)           │
│ ┌──────────────────────────────────────────┐  │
│ │ Maria - this is a rush job for Wells    │  │
│ │ Fargo. Interior photos required.         │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Notify Team Member                             │
│ ☑ Send email notification                     │
│ ☑ Send in-app notification                    │
│                                                │
│ [Cancel]                      [Assign Bid →]  │
│                                                │
└────────────────────────────────────────────────┘
```

**Assignment Logic:**
- Can only assign to team members who:
  - Have matching license
  - Have matching coverage area
  - Are active users
- Warns if:
  - Team member is at capacity
  - Missing specialty match
  - Has poor recent performance

---

#### **Step 4: Team Member Receives Assignment**

**Maria logs in and sees:**

**Dashboard notification:**
> "Sarah assigned you a new bid: 1234 Market St, San Diego"

**"My Requests" page:**
- New bid appears in "Bids" tab
- Tagged with priority (Rush)
- Shows Sarah's note
- Has deadline countdown

**Maria's View:**
```
┌─────────────────────────────────────────────────┐
│ My Requests                            Sort ▼    │
│ ┌─────────────┬─────────────┐                   │
│ │ Bids (2) 🔴 │ Reports (4) │                   │
│ └─────────────┴─────────────┘                   │
├─────────────────────────────────────────────────┤
│                                                 │
│ 🔥 RUSH                                         │
│ 📍 1234 Market St, San Diego, CA               │
│ 🏢 Commercial Appraisal                        │
│ 🏦 Wells Fargo                                 │
│ 📅 Due: Jan 25, 2026 (5 days)                 │
│ 💰 Fee: $2,500                                 │
│                                                 │
│ 📝 Note from Sarah:                            │
│ "Maria - this is a rush job for Wells Fargo.  │
│  Interior photos required."                    │
│                                                 │
│ Assigned: 2 hours ago                          │
│                                                 │
│ [Accept Bid]  [Request Reassignment]           │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Actions Maria Can Take:**
1. **Accept Bid** - Becomes her work, moves to "In Process"
2. **Request Reassignment** - Opens modal to explain why (overloaded, conflict, etc.)
3. **View Details** - See full bid information

---

#### **Step 5: Tracking & Visibility**

**Business Admin Dashboard shows:**

**Assigned Work Section:**
```
┌─────────────────────────────────────────────────┐
│ Team's Active Work (14)               View All → │
├─────────────────────────────────────────────────┤
│                                                 │
│ Maria Gonzalez (5 active)  🟢                   │
│ ├─ 1234 Market St - Bid Sent (Rush)           │
│ ├─ 5678 Oak Ave - In Process                   │
│ ├─ 9012 Pine St - In Process                   │
│ └─ + 2 more                                    │
│                                                 │
│ David Kim (6 active)  🟡                        │
│ ├─ 3456 Elm St - Report Due Tomorrow          │
│ ├─ 7890 Maple Dr - In Process                 │
│ └─ + 4 more                                    │
│                                                 │
│ James Wilson (8 active)  🔴 At Capacity        │
│ ├─ 2 overdue items ⚠️                          │
│ └─ View details →                              │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Admin can:**
- See all assigned work across team
- Monitor progress in real-time
- Reassign if someone is overloaded
- View individual team member's workload
- Get alerts if work is stuck or late

---

### Design Specifications for Assignment Flow

#### **1. Unassigned Bids Queue Page**

**Layout:**
- Full-width content area
- List/card view toggle
- Sort options: Due Date | Fee | Property Type | Bank
- Filters: Bank | Property Type | Specialty Needed | Urgency

**Card Design (Unassigned Bid):**
- Property image or placeholder
- Address (large, bold)
- Property type badge
- Bank logo + name
- Due date with urgency color:
  - Red: < 2 days
  - Yellow: 2-5 days
  - Green: 5+ days
- Fee amount
- "Assign" button (primary CTA)
- "Decline" button (ghost)

**Empty State:**
> "No unassigned bids
>
> When banks send bids to your business, they'll appear here for you to assign to team members."

---

#### **2. Assignment Modal**

**Size:** Medium (600px wide)
**Sections:**
1. **Bid Summary** (top, compact)
2. **Team Member Selection** (main content)
3. **Priority & Notes** (middle)
4. **Actions** (sticky footer)

**Team Member Card in Selection:**
- Avatar
- Name
- Current workload (visual indicator + count)
- Rating (stars)
- Specialty match indicators (checkmarks)
- "Recommended" badge if system suggests
- Radio button for selection

**Interaction:**
- Single selection (can only assign to one person)
- Selected card has highlighted border
- Hover states on cards
- Disabled state if team member not qualified

---

#### **3. Team Member's "My Requests" Page**

**Modification for Business Context:**

**Show Assignment Source:**
- "Assigned by Sarah" label
- Admin's note visible
- Different visual treatment than self-accepted bids

**Additional Actions:**
- "Request Reassignment" button
  - Opens modal with reason dropdown:
    - Overloaded
    - Outside my specialty
    - Conflict of interest
    - Other (text field)
  - Notifies admin
  - Admin can approve/deny

---

#### **4. Business Dashboard - Active Work Widget**

**Purpose:** Give admin quick visibility into team workload

**Design:**
- Collapsible section
- Show top 3 team members (sorted by active work count)
- Visual capacity indicators
- Click team member name → see their full workload
- "View All" link → goes to full team assignments page

**Capacity Colors:**
- 🟢 Green: 0-5 active (Available)
- 🟡 Yellow: 6-8 active (Busy)
- 🔴 Red: 9+ active (At Capacity)

---

### Workflow Comparison: Individual vs Business

| Action | Individual Vendor | Business Admin | Business Team Member |
|--------|------------------|----------------|---------------------|
| **Receives Bid** | Directly in My Requests | Unassigned Bids queue | After admin assigns |
| **Accept/Decline** | Personal decision | Assign to team OR decline | Can accept or request reassignment |
| **Work Tracking** | Personal dashboard | Team dashboard + individual | Personal dashboard |
| **Workload View** | Own work only | Full team visibility | Own work only |
| **Reassignment** | N/A (no reassignment) | Can reassign anytime | Can request reassignment |

---

## 🎨 TOP 5 CRITICAL DESIGN SPECS (DETAILED)

Now let's get into the specific design specifications for the most critical items.

---

### SPEC 1: DASHBOARD RESTRUCTURE 🔴

**Priority:** Critical  
**Affects:** Both Individual and Business dashboards  
**Complexity:** High  
**Estimated Time:** 2-3 days design, 3-4 days implementation  

#### **Problem Statement**
Current dashboard shows structural metrics (team count, profile count) that don't provide business value. Need to show **actionable business intelligence**.

#### **Solution Overview**
Move business performance metrics to top, add charts, add "Get Started" section, restructure for single unified experience.

---

#### **Individual Vendor Dashboard Specs**

**Layout Structure:**
```
┌────────────────────────────────────────────────────┐
│ Header: "Welcome back, Tom"                        │
│ Last login: 2 hours ago                            │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ GET STARTED (if profile incomplete)                │
│ ├─ Your Next Step card (large, with image)        │
│ └─ Upcoming Steps (expandable)                     │
└────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ PERFORMANCE METRICS (4-col grid)                    │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │ Total    │ Turnar-  │ Comple-  │ Business │       │
│ │ Bids     │ ound     │ tion     │ Rating   │       │
│ │          │ Time     │ Rate     │          │       │
│ │ 12       │ 3.2 days │ 94%      │ 4.7/5    │       │
│ │ Active   │ ↓ 0.3    │ ↑ 2%     │ ↑ 0.1    │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CHARTS (2-col grid)                                 │
│ ┌────────────────────┬──────────────────────────┐   │
│ │ Turnaround Trend   │ Bid Acceptance Rate      │   │
│ │ (Line chart)       │ (Bar chart)              │   │
│ │ Last 30 days       │ Last 6 months            │   │
│ └────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ MY ACTIVE WORK                                      │
│ ├─ Urgent Items (red) - expandable                 │
│ ├─ Due This Week - expandable                      │
│ └─ [View All My Requests →]                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ RECENT ACTIVITY (timeline)                          │
│ ├─ You accepted bid from Wells Fargo               │
│ ├─ You submitted report for 123 Main St            │
│ └─ Your CA license was updated                     │
└─────────────────────────────────────────────────────┘
```

**Metric Card Design:**
- **Size:** ~200px × 120px
- **Structure:**
  - Label (top, small, muted)
  - Value (large, bold, primary)
  - Trend (bottom, with icon and color)
    - ↑ Green for positive
    - ↓ Red for negative
    - → Gray for neutral
- **Hover:** Lift effect (shadow + scale 1.02)
- **Click:** Opens detail modal or navigates to relevant page

**Chart Specs:**
- **Library:** Recharts (React-friendly, lightweight)
- **Colors:** Brand primary + semantic colors
- **Responsive:** Stacks to single column on mobile
- **Interaction:** Hover shows tooltip with exact values
- **Export:** Download as PNG/CSV (future)

---

#### **Business Dashboard Specs**

**Layout Structure:**
```
┌────────────────────────────────────────────────────┐
│ Header: "Coastal Appraisal Group Dashboard"        │
│ Last updated: 5 minutes ago                        │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ GET STARTED (if incomplete)                        │
│ ├─ Business profile: 73% complete                 │
│ ├─ 2 team members need to complete profiles       │
│ └─ [Complete Setup →]                             │
└────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ BUSINESS METRICS (4-col grid)                       │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │ Total    │ Team     │ Business │ Late     │       │
│ │ Bids     │ Util.    │ Rating   │ Items    │       │
│ │          │          │          │          │       │
│ │ 47       │ 82%      │ 4.6/5    │ 3 ⚠️     │       │
│ │ Team     │ ↑ 5%     │ ↑ 0.2    │          │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ADDITIONAL METRICS (3-col grid)                     │
│ ┌──────────┬──────────┬──────────┐                  │
│ │ Turnar-  │ Connected│ License  │                  │
│ │ ound     │ Banks    │ Coverage │                  │
│ │          │          │          │                  │
│ │ 3.8 days │ 12       │ 6 states │                  │
│ │ ↓ 0.4    │          │          │                  │
│ └──────────┴──────────┴──────────┘                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CHARTS (2-col grid)                                 │
│ ┌────────────────────┬──────────────────────────┐   │
│ │ Team Performance   │ Bid Volume Trend         │   │
│ │ (Bar comparison)   │ (Line chart)             │   │
│ │ By team member     │ Last 3 months            │   │
│ └────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ TEAM'S ACTIVE WORK (collapsible)                    │
│ ├─ Maria Gonzalez (5) 🟢                           │
│ ├─ David Kim (6) 🟡                                │
│ ├─ James Wilson (8) 🔴 At Capacity                 │
│ └─ [View All Assignments →]                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ RECENT ACTIVITY                                     │
│ ├─ David accepted bid from First National          │
│ ├─ Maria completed report for 456 Oak St           │
│ └─ New team member joined: Robert Chen             │
└─────────────────────────────────────────────────────┘
```

**Business-Specific Metrics:**
- **Team Utilization:** % of team capacity being used
  - Formula: (Active jobs / Total capacity) × 100
  - Color: Green (60-80%), Yellow (81-90%), Red (91-100%)
- **Late Items:** Count of overdue work
  - Always red if > 0
  - Click opens filtered view
- **License Coverage:** Number of states team can service
  - Shows aggregate across all appraisers

**Team Work Widget:**
- Show top 3 team members (by active work count)
- Capacity indicator (🟢🟡🔴)
- Click name → see their full workload
- Expandable to show all team members

---

### SPEC 2: "GET STARTED" DASHBOARD SECTION 🔴

**Priority:** Critical  
**Replaces:** Guided tour auto-start  
**Pattern:** Specretary-style onboarding  
**Estimated Time:** 2 days design, 2-3 days implementation  

#### **Purpose**
Persistent, visible task list that guides users to complete setup without forcing them. Replaces intrusive guided tour.

#### **Visual Design**

**Layout - Top of Dashboard:**
```
┌─────────────────────────────────────────────────────┐
│ Get Started                                  [×]    │
│ 3 of 5 completed · 60% complete                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌────────────────────────────────────────────────┐ │
│ │ YOUR NEXT STEP                        Step 3/5 │ │
│ │                                                 │ │
│ │ ┌─────────────┐  Complete Your Profile         │ │
│ │ │   [Image]   │                                 │ │
│ │ │  Person at  │  Add your specialties and      │ │
│ │ │  computer   │  coverage areas so banks can   │ │
│ │ └─────────────┘  match you with work.          │ │
│ │                                                 │ │
│ │                  🕐 Estimated time: 5 minutes   │ │
│ │                                                 │ │
│ │                  [Complete Profile →]           │ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ ▼ Upcoming Steps (2 remaining)                      │
│                                                     │
│   4. ✓ Upload License Documents           3 mins   │
│   5. ✓ Set Notification Preferences       2 mins   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Collapsed State (after first dismissal):**
```
┌─────────────────────────────────────────────────────┐
│ ▶ Get Started (3 of 5 completed)          Progress │
└─────────────────────────────────────────────────────┘
```

**Component Specs:**

**1. Main Card (Your Next Step):**
- **Dimensions:** Full width, ~200px height
- **Background:** Subtle gradient (light mode: white to blue-50, dark mode: gray-900 to blue-900/10)
- **Border:** 1px subtle border
- **Shadow:** Soft elevation
- **Sections:**
  - Left: Image (200px × 200px, rounded corners)
  - Right: Content
    - Title (text-xl, bold)
    - Description (text-base, 2 lines max)
    - Time estimate (small, with clock icon)
    - CTA button (primary, large)

**2. Upcoming Steps (Expandable):**
- **Trigger:** "▼ Upcoming Steps (N remaining)" - chevron rotates on click
- **Animation:** Smooth expand (300ms ease-out)
- **List Items:**
  - Checkbox (checked/unchecked)
  - Task name
  - Time estimate (right-aligned)
  - Gray text when incomplete, muted when complete

**3. Progress Indicator:**
- **Text:** "X of Y completed · Z% complete"
- **Visual:** Optional thin progress bar below

**4. Dismiss Button:**
- **Location:** Top right [×]
- **Behavior:** Collapses to slim bar (can re-expand anytime)
- **Persistence:** Remembers state in localStorage

---

**Tasks to Track (Individual Vendor):**
1. ✓ Create your account (auto-complete)
2. ✓ Verify your email (auto-complete)
3. Complete your profile (name, contact, etc.)
4. Upload license documents
5. Set coverage areas
6. Add specialties
7. Upload W-9 and insurance (if required)

**Tasks to Track (Business):**
1. ✓ Create business account
2. Complete business profile (company info, address)
3. Add team members
4. Create appraiser profiles (for team)
5. Upload business documents
6. Set up bank connections (optional)

---

**Completion Behavior:**
- When all tasks complete → Show success state for 5 seconds
- Then: Section disappears entirely
- Success message: "🎉 You're all set! Your profile is complete."

---

**Side Nav Integration:**
```
┌───────────────────┐
│ 🚀 Getting Started│ ← Shows in side nav
│    0 of 3 completed│   (Only if incomplete)
│    0%             │
└───────────────────┘
```
- Links to dashboard with Get Started section expanded
- Shows progress
- Disappears when 100% complete

---

### SPEC 3: WELCOME SCREEN (ONBOARDING FIRST STEP) 🟡

**Priority:** High  
**Purpose:** Set expectations, reduce anxiety, celebrate user  
**Estimated Time:** 1 day design, 1 day implementation  

#### **Ed's Specific Requirements (from meeting)**
> "We're so stoked that you are here! This is going to take you 5 minutes to fill in. We're going to ask you 6 different questions. Get your paperwork ready. After this, you'll be able to explore. Remember, you can skip this at any time and come back to it."

#### **Full Design Spec**

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│                   [Vendors Circle Logo]             │
│                                                     │
│                 Welcome to Vendors Circle! 🎉       │
│                                                     │
│            We're so excited to have you here        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │                                            │    │
│  │  What You'll Gain:                         │    │
│  │                                            │    │
│  │  ✓ One place for all your credentials     │    │
│  │  ✓ Connect with multiple banks easily     │    │
│  │  ✓ Update once, notify everyone           │    │
│  │  ✓ Professional profile that stands out   │    │
│  │                                            │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │                                            │    │
│  │  What to Expect:                           │    │
│  │                                            │    │
│  │  🕐 Takes about 5 minutes                  │    │
│  │  📋 We'll ask 6 questions                  │    │
│  │  💾 Your progress is saved automatically   │    │
│  │  ⏭️  You can skip and come back anytime   │    │
│  │                                            │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │                                            │    │
│  │  Get Ready:                                │    │
│  │                                            │    │
│  │  Have these handy (but don't worry if you │    │
│  │  don't have everything right now):        │    │
│  │                                            │    │
│  │  • Your license number(s)                  │    │
│  │  • Contact information                     │    │
│  │  • Coverage areas you service              │    │
│  │                                            │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│              [Skip for Now]    [Let's Go! →]        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Component Specs:**

**1. Welcome Message:**
- **Headline:** "Welcome to Vendors Circle! 🎉"
  - Font: text-3xl (30px)
  - Weight: Bold
  - Color: Primary brand color
  - Center aligned
- **Subheading:** "We're so excited to have you here"
  - Font: text-lg (18px)
  - Weight: Normal
  - Color: Muted
  - Center aligned

**2. Info Boxes (3 sections):**
- **Card Style:** Light background, subtle border, rounded corners
- **Spacing:** 24px between cards
- **Icon Style:** Large emoji or Lucide icon (24px)
- **List Style:** Checkmarks or bullets, left-aligned

**3. CTA Buttons:**
- **Primary:** "Let's Go! →"
  - Full primary button style
  - Right-aligned or center
  - Large size
- **Secondary:** "Skip for Now"
  - Ghost button style
  - Left-aligned or center
  - Smaller, less prominent

**Animation:**
- Fade in on load (300ms)
- Slight scale on button hover (1.02)
- Optional: Confetti on "Let's Go!" click (subtle, brief)

---

**Variations by User Type:**

**Individual Vendor:**
- Same as above
- 6 questions mentioned

**Business:**
- Change "6 questions" to "7 questions"
- Add to "Get Ready" section:
  - "• Business information (EIN, address)"
  - "• Team member details (if adding now)"

---

### SPEC 4: ONBOARDING VISUAL UPDATES (SPECRETARY PATTERN) 🟡

**Priority:** High  
**Purpose:** Modern, clean onboarding experience  
**Pattern:** Specretary reference  
**Estimated Time:** 2 days design, 2-3 days implementation  

#### **Current vs New Comparison**

**Current Pattern:**
- Basic step list (no visual progress)
- "Previous / 5/6 / Next" buttons (centered)
- Step descriptions under headers
- Multiple "Skip for Now" buttons

**New Pattern (Specretary):**
- Sidebar with visual progress
- Back/Continue buttons (left/right aligned)
- Clean headers (no descriptions)
- Single skip option

---

#### **Full Layout Spec**

```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────────────────────┐   │
│ │              │ │                              │   │
│ │  SIDEBAR     │ │  CONTENT AREA               │   │
│ │  (240px)     │ │  (Flexible width)           │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ │              │ │                              │   │
│ └──────────────┘ └──────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────┐ │
│ │           STICKY FOOTER (Actions)                 │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

#### **1. Sidebar (Progress Indicator)**

**Specs:**
- **Width:** 240px
- **Background:** Light gray (light mode), darker gray (dark mode)
- **Padding:** 32px
- **Fixed:** Scrolls with content on mobile, fixed on desktop

**Step Item Structure:**
```
┌─────────────────────┐
│ ● 1. Personal Info  │  ← Completed (checkmark)
│ ● 2. Contact        │  ← Completed
│ ● 3. License        │  ← Current (highlighted, bold)
│ ○ 4. Coverage       │  ← Upcoming (muted)
│ ○ 5. Specialties    │  ← Upcoming
│ ○ 6. Review         │  ← Upcoming
└─────────────────────┘
```

**Step Visual States:**

**Completed Step:**
- Icon: ✓ (checkmark in circle, green)
- Number: Hidden (replaced by checkmark)
- Text: Normal weight, muted color
- Line: Solid green

**Current Step:**
- Icon: Number in filled circle (brand primary color)
- Text: Bold, primary color
- Highlight: Subtle background color
- Line: Solid primary color (to previous), dashed (to next)

**Upcoming Step:**
- Icon: Number in outlined circle (gray)
- Text: Normal weight, muted color
- Line: Dashed gray

**Connecting Lines:**
- Vertical line between steps (on left of numbers)
- Changes color based on step state
- Smooth transitions (200ms)

---

#### **2. Content Area**

**Specs:**
- **Padding:** 48px (desktop), 24px (mobile)
- **Max Width:** 700px (for readability)
- **Center-aligned:** Within available space

**Header:**
- **Step Title:** text-2xl (24px), bold, primary color
- **Step Description (Optional):** text-base, muted, 1-2 sentences max
- **No subtitle under header** (clean!)

**Form Fields:**
- Standard spacing (16px between fields)
- Clear labels (text-sm, above field)
- Help text below fields (text-xs, muted)
- Inline validation (show error/success immediately)

**Field Groups:**
- Related fields visually grouped
- Optional dividers between groups
- Consistent padding

---

#### **3. Sticky Footer (Actions)**

**Specs:**
- **Height:** 80px
- **Background:** White (light mode), dark (dark mode) with subtle top border
- **Position:** Sticky bottom (always visible)
- **Padding:** 24px horizontal

**Button Layout:**
```
┌──────────────────────────────────────────────────────┐
│ [← Back]            [Skip]          [Continue →]     │
└──────────────────────────────────────────────────────┘
```

**Button Specs:**

**Back Button:**
- Ghost button style (outline)
- Left-aligned
- Icon: ← (left arrow)
- Hidden on first step
- `← Back` text

**Skip Button:**
- Text link style (no button border)
- Center-aligned
- Muted color
- `Skip` text
- Only shows if step is optional

**Continue Button:**
- Primary button style (filled)
- Right-aligned
- Icon: → (right arrow)
- `Continue →` text
- Disabled state if validation fails
- Loading state while submitting

**Responsive Behavior (Mobile):**
- Stack vertically on mobile
- Continue button full-width (top)
- Back button below (secondary style)
- Skip link at bottom center

---

#### **4. Specific Changes to Apply**

**Remove:**
- ❌ Step descriptions under headers ("How to reach you", etc.)
- ❌ Multiple "Skip for Now" buttons on individual steps
- ❌ Page count in navigation ("5/6")
- ❌ Centered "Previous" and "Next" buttons

**Add:**
- ✅ Sidebar with visual step progress
- ✅ Back/Continue buttons (left/right)
- ✅ Single Skip option in footer (if applicable)
- ✅ Step completion checkmarks
- ✅ Smooth transitions between steps

**Improve:**
- Clean up visual hierarchy
- Remove clutter
- Focus on one thing per step
- Make progress visible and encouraging

---

### SPEC 5: AUTH PAGES SPLIT-PANE REDESIGN 🟡

**Priority:** High  
**Purpose:** Modern, engaging first impression  
**Pattern:** Alchemyca-style split screen  
**Estimated Time:** 1.5 days design, 2 days implementation  

#### **Current vs New**

**Current:** Simple centered card on blank background  
**New:** 50/50 split with form left, hero image right  

---

#### **Full Design Spec**

**Layout Structure (Desktop):**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌─────────────────┐ ┌─────────────────┐            │
│  │                 │ │                 │            │
│  │  LEFT PANE      │ │  RIGHT PANE     │            │
│  │  (Auth Form)    │ │  (Hero Visual)  │            │
│  │                 │ │                 │            │
│  │  50%            │ │  50%            │            │
│  │                 │ │                 │            │
│  │                 │ │                 │            │
│  │                 │ │                 │            │
│  │                 │ │                 │            │
│  └─────────────────┘ └─────────────────┘            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

#### **Left Pane - Auth Form**

**Specs:**
- **Width:** 50% viewport width
- **Background:** White (light mode), Dark (dark mode)
- **Padding:** 80px (maintains spacing from edges)
- **Max Content Width:** 400px (centered within left pane)
- **Vertical Alignment:** Centered

**Content Structure:**
```
┌──────────────────────────┐
│                          │
│  [Logo]                  │  ← Top left corner
│                          │
│                          │
│                          │
│  Sign In                 │  ← Headline (large)
│                          │
│  Welcome back!           │  ← Subheading
│                          │
│  ┌─────────────────────┐ │
│  │ Email              │ │  ← Form fields
│  └─────────────────────┘ │
│                          │
│  ┌─────────────────────┐ │
│  │ Password            │ │
│  └─────────────────────┘ │
│                          │
│  [Forgot Password?]      │  ← Link
│                          │
│  [Sign In]               │  ← Primary CTA
│                          │
│  ─── or ───              │  ← Divider
│                          │
│  [Continue with Google]  │  ← Social auth (optional)
│                          │
│  Don't have an account?  │  ← Footer link
│  Sign up                 │
│                          │
└──────────────────────────┘
```

**Typography:**
- **Headline:** text-3xl (30px), bold
- **Subheading:** text-base (16px), muted
- **Input Labels:** text-sm (14px)
- **Links:** text-sm, primary color

**Spacing:**
- 24px between form sections
- 16px between individual fields
- 32px before CTA button
- 16px between buttons (if multiple)

---

#### **Right Pane - Hero Visual**

**Specs:**
- **Width:** 50% viewport width
- **Background:** Brand gradient or solid color with overlay
- **Content:** High-quality image or illustration
- **Overlay:** Optional subtle gradient overlay (improves text readability if adding text)

**Visual Options:**

**Option 1: Photography**
- Professional appraiser at work
- Modern office setting
- Natural lighting
- Aspirational but authentic
- Stock photo or custom photography

**Option 2: Illustration**
- Abstract brand illustration
- Represents: connection, growth, professionalism
- Brand colors prominently featured
- Modern, clean style

**Option 3: Gradient + Icons**
- Subtle geometric patterns
- Brand color gradient
- Floating icons related to appraisal industry
- Minimal, elegant

**Overlay Content (Optional):**
```
┌──────────────────────────────┐
│                              │
│                              │
│                              │
│      [Centered Content]      │
│                              │
│  "Update your credentials    │
│   once. Work with multiple   │
│   banks seamlessly."         │
│                              │
│  - Testimonial or value prop │
│                              │
│                              │
└──────────────────────────────┘
```

**If adding text overlay:**
- Semi-transparent dark overlay (rgba(0,0,0,0.3))
- White text
- Large quote or value proposition
- Attribution if testimonial

---

#### **Mobile Adaptation (< 768px)**

**Layout:** Stack vertically

```
┌──────────────────────┐
│                      │
│  HERO IMAGE (top)    │
│  Height: 40vh        │
│                      │
├──────────────────────┤
│                      │
│  AUTH FORM (below)   │
│  Full width          │
│  Padding: 24px       │
│                      │
│                      │
└──────────────────────┘
```

**Adjustments:**
- Hero image: Shorter (40vh, ~300px)
- Form: Full width with padding
- Logo: Top left of form section
- Bottom spacing for keyboard

---

#### **Pages to Apply**

1. **Sign In** (`/signin`)
2. **Sign Up** (`/signup`)
3. **Verify Email** (`/verify-email`) - Simpler version, smaller right pane image
4. **Forgot Password** (`/forgot-password`)
5. **Reset Password** (`/reset-password`)

---

#### **Additional Polish**

**Micro-interactions:**
- Input fields: Subtle scale on focus (1.01)
- Buttons: Lift on hover (shadow + scale 1.02)
- Links: Underline on hover
- Smooth transitions (200ms)

**Validation:**
- Inline validation (real-time)
- Error states: Red border + message below
- Success states: Green checkmark icon
- Loading states: Spinner in button

**Accessibility:**
- All inputs have labels
- Error messages associated with fields (aria-describedby)
- Focus management (keyboard navigation)
- Screen reader announcements

---

## 🗺️ IMPLEMENTATION ROADMAP

### Phase 1: Critical Architecture (Week 1-2)

**Goals:** Remove friction points, implement unified account model

**Tasks:**
1. ✅ Remove account type selection page
2. ✅ Update signup flow (single path)
3. ✅ Add "Are you an appraiser?" fork in onboarding
4. ✅ Dashboard restructure - Move metrics to top
5. ✅ Add "Get Started" dashboard section
6. ✅ Add Invites to main navigation (if missing)
7. ✅ Remove guided tour auto-start

**Deliverables:**
- Updated signup flow (no account type choice)
- Onboarding fork based on appraiser question
- New dashboard layout (both individual & business)
- Get Started section functional
- Guided tours only on-demand

---

### Phase 2: Onboarding & UX Polish (Week 2-3)

**Goals:** Modern onboarding experience, welcoming users

**Tasks:**
1. ✅ Design & implement welcome screen
2. ✅ Update onboarding visual controls (Specretary pattern)
3. ✅ Sidebar progress indicator
4. ✅ Back/Continue button pattern
5. ✅ Remove step descriptions
6. ✅ Remove extra skip buttons
7. ✅ Team setup repeater pattern (no dropdown)
8. ✅ Confetti celebration on completion

**Deliverables:**
- Welcome screen with Ed's requirements
- Specretary-style onboarding wizard
- Repeater pattern for team member addition
- Confetti animation

---

### Phase 3: Business Bid Assignment (Week 3-4)

**Goals:** Implement business bid assignment workflow

**Tasks:**
1. ✅ Design "Unassigned Bids" queue page
2. ✅ Assignment modal with team member selection
3. ✅ Smart recommendations (specialty match, workload)
4. ✅ Team capacity indicators (🟢🟡🔴)
5. ✅ Assignment notification flow
6. ✅ Team member's view of assigned bids
7. ✅ Request reassignment feature
8. ✅ Business dashboard - Active Work widget

**Deliverables:**
- Unassigned Bids page
- Assignment modal
- Team capacity tracking
- Reassignment flow

---

### Phase 4: Visual Enhancements (Week 4-5)

**Goals:** Modern, polished visual experience

**Tasks:**
1. ✅ Auth pages split-pane redesign (Alchemyca pattern)
2. ✅ Navigation reorganization (two-tier structure)
3. ✅ Dashboard charts implementation
4. ✅ State/license map visualization
5. ✅ Team performance charts
6. ✅ Metric cards with trend indicators

**Deliverables:**
- Split-pane auth pages
- Reorganized navigation
- Charts on dashboard
- State/license map
- Visual polish throughout

---

### Phase 5: Mobile Adaptation (Week 5-6)

**Goals:** Ensure all new features work beautifully on mobile

**Tasks:**
1. ✅ Mobile dashboard layouts
2. ✅ Mobile Get Started section
3. ✅ Mobile onboarding wizard
4. ✅ Mobile assignment flow
5. ✅ Mobile charts (responsive)
6. ✅ Touch-optimized interactions

**Deliverables:**
- All new features mobile-responsive
- Touch-optimized UI
- Mobile-specific optimizations

---

## 📱 MOBILE TRANSLATION STRATEGY

### Design Principles for Mobile

**1. Touch-First Design**
- Minimum touch target: 44px × 44px
- Adequate spacing between interactive elements (8px min)
- Avoid hover-dependent interactions
- Swipe gestures where appropriate

**2. Progressive Disclosure**
- Hide less important information initially
- Expandable sections (accordions)
- Bottom sheets for actions
- Full-screen modals for complex flows

**3. Thumb-Zone Optimization**
- Primary actions in bottom third of screen
- Bottom navigation for main sections
- Floating action buttons (FAB) for primary actions
- Avoid important buttons in top corners

---

### Mobile-Specific Adaptations

#### **Dashboard → Mobile**

**Desktop: 4-column metric grid**  
**Mobile: 2-column grid, scrollable**

```
Desktop:
┌────┬────┬────┬────┐
│ M1 │ M2 │ M3 │ M4 │
└────┴────┴────┴────┘

Mobile:
┌────┬────┐
│ M1 │ M2 │
├────┼────┤
│ M3 │ M4 │
└────┴────┘
```

**Get Started Section:**
- Simplified layout (no side-by-side)
- Image above content
- Larger touch targets
- Collapsible by default (save space)

---

#### **Onboarding Wizard → Mobile**

**Desktop: Sidebar + Content**  
**Mobile: Top stepper + Content**

```
Desktop:
┌──────┬─────────┐
│ Side │ Content │
│ bar  │         │
└──────┴─────────┘

Mobile:
┌─────────────────┐
│ Top Stepper     │
├─────────────────┤
│                 │
│ Content         │
│ (scrollable)    │
│                 │
├─────────────────┤
│ Sticky Footer   │
└─────────────────┘
```

**Changes:**
- Stepper: Horizontal dots at top
- Content: Full-width, scrollable
- Footer: Sticky with Back/Continue

---

#### **Assignment Modal → Mobile**

**Desktop: Modal (600px wide)**  
**Mobile: Full-screen or bottom sheet**

**Recommendation: Bottom Sheet**
- Slides up from bottom
- Dismissible by swiping down
- Takes 75-90% of screen height
- Header with drag handle
- Scrollable content

---

### Component Patterns for Mobile

#### **1. Cards**
- Full-width or 2-column grid
- Larger padding (16px min)
- Stack content vertically
- Collapsible sections if needed

#### **2. Forms**
- Single column layout
- Larger input heights (48px min)
- Input types optimized for mobile keyboards
  - `type="email"` for email fields
  - `type="tel"` for phone fields
  - `type="number"` for numeric fields
- Clear button in search fields
- Date/time pickers native to platform

#### **3. Tables**
- Avoid tables if possible
- Convert to card list on mobile
- Or: horizontal scroll with fixed first column
- Or: Show most important columns only

#### **4. Charts**
- Simplified on mobile (fewer data points)
- Larger touch areas for tooltips
- Horizontal scroll if needed
- Alternative: Show summary stats instead

#### **5. Navigation**
- Bottom navigation bar (4-5 items max)
- Hamburger menu for secondary items
- Floating action button for primary action
- Breadcrumbs → Back button

---

### Mobile-Friendly Flows

#### **Business Bid Assignment (Mobile)**

**Step 1: Bid List**
- Card-based list (not table)
- Swipe left to assign
- Tap for details

**Step 2: Assignment (Bottom Sheet)**
- Slides up from bottom
- Team member selection: Large touch targets
- Simplified view (essential info only)

**Step 3: Confirmation**
- Toast notification
- Updates list immediately

---

## 🧱 COMPONENT ARCHITECTURE

### Reusable Components to Build

#### **1. DashboardMetricCard**
```typescript
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
}
```

**Usage:**
```jsx
<MetricCard
  label="Total Bids"
  value={12}
  trend={{ direction: 'up', value: '2', isPositive: true }}
  icon={FileText}
  onClick={() => navigate('/requests')}
/>
```

---

#### **2. GetStartedSection**
```typescript
interface GetStartedProps {
  tasks: Task[];
  currentTask: Task;
  onTaskClick: (taskId: string) => void;
  onDismiss: () => void;
  completionPercentage: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  completed: boolean;
  imageUrl?: string;
  ctaText: string;
  ctaAction: () => void;
}
```

**Usage:**
```jsx
<GetStartedSection
  tasks={onboardingTasks}
  currentTask={nextTask}
  onTaskClick={handleTaskClick}
  onDismiss={handleDismiss}
  completionPercentage={60}
/>
```

---

#### **3. OnboardingSidebar**
```typescript
interface OnboardingSidebarProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
}

interface OnboardingStep {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}
```

**Usage:**
```jsx
<OnboardingSidebar
  steps={onboardingSteps}
  currentStepIndex={2}
/>
```

---

#### **4. AssignmentModal**
```typescript
interface AssignmentModalProps {
  bid: Bid;
  teamMembers: TeamMember[];
  onAssign: (memberId: string, note: string, priority: Priority) => void;
  onCancel: () => void;
  recommendations?: Recommendation[];
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  currentWorkload: number;
  rating: number;
  specialties: string[];
  isRecommended: boolean;
  workloadStatus: 'available' | 'busy' | 'full';
}
```

**Usage:**
```jsx
<AssignmentModal
  bid={selectedBid}
  teamMembers={team}
  onAssign={handleAssign}
  onCancel={closeModal}
  recommendations={smartRecommendations}
/>
```

---

#### **5. WorkloadIndicator**
```typescript
interface WorkloadIndicatorProps {
  activeJobs: number;
  maxCapacity: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
```

**Usage:**
```jsx
<WorkloadIndicator
  activeJobs={6}
  maxCapacity={10}
  size="md"
  showLabel={true}
/>
// Renders: 🟡 6 active jobs (Busy)
```

---

### Folder Structure

```
vendors-circle-app/
├── components/
│   ├── dashboard/
│   │   ├── metric-card.tsx
│   │   ├── get-started-section.tsx
│   │   ├── active-work-widget.tsx
│   │   └── chart-components/
│   │       ├── turnaround-chart.tsx
│   │       └── team-performance-chart.tsx
│   ├── onboarding/
│   │   ├── welcome-screen.tsx
│   │   ├── onboarding-sidebar.tsx
│   │   ├── onboarding-footer.tsx
│   │   └── onboarding-wizard.tsx
│   ├── business/
│   │   ├── assignment-modal.tsx
│   │   ├── unassigned-bids-list.tsx
│   │   ├── team-member-card.tsx
│   │   └── workload-indicator.tsx
│   ├── auth/
│   │   ├── split-pane-layout.tsx
│   │   ├── auth-form.tsx
│   │   └── hero-visual.tsx
│   └── shared/
│       ├── navigation/
│       ├── buttons/
│       └── forms/
```

---

## ✅ SUMMARY & NEXT STEPS

### What We've Defined

1. ✅ **Business vs Individual Structure** - Clear differentiation
2. ✅ **Bids & Assignment Flow** - Complete workflow for businesses
3. ✅ **5 Critical Design Specs** - Detailed specifications ready
4. ✅ **Implementation Roadmap** - Phased approach (5 phases)
5. ✅ **Mobile Strategy** - How to adapt all features for mobile
6. ✅ **Component Architecture** - Reusable building blocks

### Your Immediate Next Steps

**This Week (Week 1):**
1. Start with **Dashboard Restructure** (SPEC 1)
   - Biggest impact
   - Both individual & business
   - Foundation for other work

2. Design **Welcome Screen** (SPEC 3)
   - Quick win
   - Sets tone
   - Based on Ed's exact requirements

3. Remove **Account Type Selection**
   - Architectural change
   - Unblocks other work

**Next Week (Week 2):**
4. **Onboarding Visual Updates** (SPEC 4)
   - Specretary pattern
   - Clean, modern
   - Reduces friction

5. **Get Started Section** (SPEC 2)
   - Replaces guided tours
   - Persistent value
   - Encourages completion

**Week 3-4:**
6. **Business Bid Assignment Flow**
   - Major differentiator
   - Complex but valuable
   - Follow specs above

7. **Auth Pages Redesign** (SPEC 5)
   - Visual polish
   - Better first impression

**Week 4-5:**
8. Navigation reorganization
9. Charts implementation
10. State/license map

**Week 5-6:**
11. Mobile adaptation for all new features

---

### Questions to Resolve

Still waiting on:
1. ❓ **Vendor Circle / Uconnect Integration** - Ed + Jeff meeting
2. ❓ **AI Reviews Examples** - Ed to share

Can design around these for now, implement later.

---

### How to Use This Document

**For Each Feature:**
1. Read the **spec section** completely
2. Review the **design references** (screenshots)
3. Create **wireframes/mockups** in Figma
4. Get **feedback from Cody** if needed
5. **Implement** component by component
6. **Test** on desktop and mobile
7. **Check accessibility**
8. Move to next feature

**For Questions:**
- Reference this document
- Check processed call notes
- Ask clarifying questions early
- Better to confirm than guess wrong

---

## 🎯 SUCCESS CRITERIA

### How We Know We're Done

**Phase 1 Complete When:**
- ✅ No account type selection (unified flow)
- ✅ Dashboard shows business metrics (not structural)
- ✅ Get Started section functional and helpful
- ✅ Welcome screen delights users
- ✅ Onboarding looks like Specretary (clean, modern)
- ✅ Guided tours optional, not forced
- ✅ Invites in main navigation

**Phase 2 Complete When:**
- ✅ Business can receive and assign bids
- ✅ Team members see assigned work
- ✅ Smart recommendations work
- ✅ Workload indicators accurate
- ✅ Reassignment flow functional

**Overall Success:**
- ✅ **Zero account type friction**
- ✅ **Business metrics drive decisions**
- ✅ **Onboarding is welcoming, not overwhelming**
- ✅ **Business bid assignment is smooth**
- ✅ **Mobile works perfectly**
- ✅ **Feels modern and professional**

---

**Document Status:** Complete - Ready for Implementation  
**Created:** January 20, 2026  
**For:** Val Vinnakota  
**Next Action:** Start with Dashboard Restructure (SPEC 1)  

**Questions? Let's discuss! 🚀**
