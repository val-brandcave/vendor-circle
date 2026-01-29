# Business Admin Who Is Also An Appraiser
## Architectural Clarification

**Created:** January 20, 2026  
**Purpose:** Define how business admin + appraiser role works  

---

## 🤔 THE SCENARIO

**Sarah Martinez:**
- Owner of Coastal Appraisal Group, LLC
- **Business Admin** (manages the company)
- **ALSO a licensed appraiser** (does appraisal work herself)

**Question:** How do we handle her documents, profiles, and data?

---

## ✅ THE ANSWER: TWO SEPARATE PROFILES

Sarah has **TWO distinct profiles** that serve different purposes:

### 1. **Business Profile** (Company-Level)

**What It Is:** The company entity itself

```
📊 Coastal Appraisal Group, LLC
├── Business Information
│   ├── Company Name: Coastal Appraisal Group, LLC
│   ├── Type: LLC
│   ├── EIN: 12-3456789 (Company Tax ID)
│   ├── Founded: 2010
│   ├── Business Address: 123 Office Park Dr, San Diego
│   └── Business Phone/Email
│
├── Business Documents (Company-Level)
│   ├── Business W-9 (Company EIN for vendor payments)
│   ├── General Liability Insurance (Company coverage)
│   ├── Workers Compensation (for employees)
│   ├── Business License (if required by state)
│   └── Master Service Agreements (Company contracts)
│
├── Business Settings
│   ├── Subscription: Professional ($199/mo)
│   ├── Billing: Company credit card
│   └── Account Status: Active
│
└── Team & Profiles
    ├── 7 Team Members (users)
    └── 5 Appraiser Profiles (including Sarah's)
```

**Managed In:** `/business/settings` page

---

### 2. **Sarah's Appraiser Profile** (Individual Appraiser)

**What It Is:** Sarah's personal appraiser credentials (one of the team)

```
👤 Sarah Martinez (Appraiser Profile)
├── Personal Information
│   ├── Name: Sarah Martinez
│   ├── Title: Owner & Chief Appraiser
│   ├── Email: sarah@coastalappraisals.com
│   ├── Phone: (555) 123-4567
│   └── Part of: Coastal Appraisal Group
│
├── Professional Documents (Personal)
│   ├── Personal W-9 (Sarah's SSN for 1099 income)
│   ├── Resume (Sarah's professional history)
│   ├── Sample Reports (Sarah's work samples)
│   └── E&O Insurance (Sarah's personal coverage)
│
├── Licenses (Personal)
│   ├── CA Certified General Appraiser
│   ├── License #: CA-AG-123456
│   ├── Expiration: Dec 31, 2026
│   └── License Document
│
├── Coverage Areas (What Sarah Services)
│   ├── States: California
│   ├── Counties: San Diego, Orange, Riverside
│   └── Specialties: Residential, Commercial
│
└── Work Performance (Sarah's Personal Stats)
    ├── Jobs Completed: 187 this year
    ├── Avg Turnaround: 3.1 days
    ├── Rating: 4.8/5
    └── Active Jobs: 5
```

**Managed In:** `/business/profiles` (shows up as one of the team profiles)

---

## 🔄 HOW IT WORKS IN THE UI

### When Sarah Logs In:

**She sees Business Dashboard:**
```
┌─────────────────────────────────────────┐
│ Coastal Appraisal Group Dashboard      │
│ (Business View)                         │
├─────────────────────────────────────────┤
│ Business Metrics (Team-wide)            │
│ ├── Total Bids: 47 (entire team)       │
│ ├── Team Utilization: 82%              │
│ ├── Business Rating: 4.6/5 (avg)       │
│ └── Late Items: 3                       │
│                                         │
│ Team's Active Work                      │
│ ├── Sarah Martinez (5 jobs) 🟢         │
│ ├── David Kim (6 jobs) 🟡              │
│ └── Maria Gonzalez (8 jobs) 🔴         │
└─────────────────────────────────────────┘
```

### Navigation Options:

**Sarah can access:**
```
Business Admin Navigation:
├── 🏠 Dashboard (Business overview)
├── 📊 Bids & Assignments (Assign to team)
├── 👥 Team & Profiles (Manage all appraisers, including herself)
├── 🏢 Business Settings (Company info)
└── ... other business features

Personal Work Navigation:
├── My Work (Sarah's personal jobs) ← Maybe quick link
└── My Profile (Sarah's appraiser profile) ← One of team profiles
```

### In Team & Profiles Page:

```
Appraiser Profiles (5 total)

┌─────────────────────────────────────────┐
│ Sarah Martinez                    ADMIN │
│ Owner & Chief Appraiser                 │
│ CA License: CA-AG-123456                │
│ Coverage: 3 counties                    │
│ Active Jobs: 5 🟢                       │
│ Rating: 4.8/5 ⭐                        │
│ [View Profile] [View My Work]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ David Kim                               │
│ Senior Appraiser                        │
│ CA License: CA-AG-789012                │
│ Coverage: 5 counties                    │
│ Active Jobs: 6 🟡                       │
│ Rating: 4.9/5 ⭐                        │
│ [View Profile] [Assign Work]            │
└─────────────────────────────────────────┘

... other team members ...
```

**Sarah's profile is just another appraiser profile in the list!**

---

## 📋 TWO DIFFERENT W-9s?

**YES! This is normal in business structures:**

### Business W-9:
- **Purpose:** For payments TO the company
- **EIN:** Company tax ID (12-3456789)
- **Used When:** Bank pays Coastal Appraisal Group for services
- **Goes To:** Business accounts receivable

### Sarah's Personal W-9:
- **Purpose:** For Sarah's personal 1099 income (if applicable)
- **SSN:** Sarah's personal tax ID
- **Used When:** Sarah does independent work OR for payroll/distributions
- **Goes To:** Sarah's personal tax filing

**Real-World Example:**
- Bank pays "Coastal Appraisal Group" $2,500 for an appraisal → Uses Business W-9
- Sarah (as owner) takes distribution from company → Uses Personal W-9 for her taxes

---

## 📊 IN THE UI - TWO TABS/SECTIONS

### Business Settings Page:

```
┌─────────────────────────────────────────┐
│ Business Settings                       │
├─────────────────────────────────────────┤
│                                         │
│ 📋 Business Information                 │
│ ├── Company Name: Coastal Appraisal... │
│ ├── EIN: XX-XXXXXXX                     │
│ └── ... other company info              │
│                                         │
│ 📄 Business Documents                   │
│ ├── Business W-9 (EIN: 12-3456789)     │
│ ├── General Liability Insurance         │
│ ├── Workers Compensation                │
│ └── Business Licenses                   │
│                                         │
│ 💳 Subscription & Billing               │
│ └── Professional Plan - $199/mo         │
│                                         │
└─────────────────────────────────────────┘
```

### Team & Profiles Page → Sarah's Profile:

```
┌─────────────────────────────────────────┐
│ Sarah Martinez (Your Profile)     ADMIN │
├─────────────────────────────────────────┤
│                                         │
│ 👤 Personal Information                 │
│ ├── Name: Sarah Martinez                │
│ ├── Title: Owner & Chief Appraiser      │
│ └── ... contact info                    │
│                                         │
│ 📄 Professional Documents (Personal)    │
│ ├── Personal W-9 (SSN: XXX-XX-6789)    │
│ ├── Resume                              │
│ ├── Sample Reports                      │
│ └── E&O Insurance (Personal)            │
│                                         │
│ 📜 Licenses (Sarah's Personal)          │
│ ├── CA License: CA-AG-123456            │
│ └── Expiration: 2026-12-31              │
│                                         │
│ 🗺️ Coverage & Specialties (Sarah's)     │
│ ├── Counties: San Diego, Orange         │
│ └── Specialties: Residential, Commercial│
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 SUMMARY

**Two Profiles, Different Purposes:**

| Aspect | Business Profile | Sarah's Appraiser Profile |
|--------|------------------|---------------------------|
| **Entity** | Company (LLC) | Individual (Sarah) |
| **Tax ID** | EIN (12-3456789) | SSN (XXX-XX-6789) |
| **W-9** | Business W-9 | Personal W-9 |
| **Insurance** | GL, Workers Comp | E&O (personal) |
| **Purpose** | Company operations | Sarah's appraisal work |
| **Managed By** | Business Settings | Team & Profiles |
| **Who Sees** | Banks (company) | Banks (Sarah as appraiser) |

**Key Insight:** Sarah wears two hats:
1. **Business Owner** (manages company)
2. **Appraiser** (does appraisal work)

Both profiles exist separately. Business profile is company-level. Appraiser profile is Sarah as an individual professional.

---

## 💡 REAL-WORLD ANALOGY

**Think of it like a law firm:**
- **Law Firm Profile:** Smith & Associates, LLC (company EIN, business insurance, firm documents)
- **Partner's Profile:** John Smith, Esq. (personal bar license, resume, work samples)

John manages the firm (business admin) AND practices law (attorney). Two profiles, two roles.

---

## ✅ IMPLEMENTATION IN CODE

### Data Structure:

```typescript
// Business Entity
interface BusinessEntity {
  id: string;
  name: string; // "Coastal Appraisal Group, LLC"
  ein: string; // Company tax ID
  documents: {
    businessW9: Document;
    generalLiability: Document;
    workersComp: Document;
  };
  subscription: Subscription;
  settings: BusinessSettings;
}

// Sarah's User Account
interface User {
  id: string;
  email: string; // "sarah@coastalappraisals.com"
  role: 'admin'; // Business admin
  businessId: string; // Links to Coastal Appraisal Group
  appraiserProfileId: string; // Links to her appraiser profile
}

// Sarah's Appraiser Profile (one of many in business)
interface AppraiserProfile {
  id: string;
  businessId: string; // Coastal Appraisal Group
  userId: string; // Sarah's user account
  firstName: string; // "Sarah"
  lastName: string; // "Martinez"
  licenses: License[]; // HER CA license
  documents: {
    personalW9: Document; // Her SSN
    resume: Document;
    sampleReports: Document[];
    eoInsurance: Document; // Her personal E&O
  };
  coverageAreas: CoverageArea[]; // HER coverage
  specialties: string[]; // HER specialties
}
```

### In the UI:

**Business Settings shows:** Company profile (business W-9, EIN, GL insurance)  
**Team & Profiles shows:** Sarah's appraiser profile (personal W-9, SSN, E&O, license)  

**They're completely separate!**

---

**Does this make sense? This is the correct structure! ✅**

---

**Next: I'll implement everything with this structure in mind!**
