# Vendors Circle – Current State Walkthrough (Processed)
**Presenter:** Jason (Development Lead)  
**Recording Date:** December 2025  
**Duration:** 9:16  
**Purpose:** Technical walkthrough of Vendors Circle application in its current state

---

## Executive Summary

Jason provides a comprehensive technical walkthrough of the Vendors Circle application, demonstrating both the vendor-facing portal and the bank-side administrative interface. This walkthrough reveals the current functionality, identifies UX opportunities, and establishes baseline understanding for the redesign effort.

**Key Takeaways:**
- Vendors Circle centralizes vendor management across multiple banks
- Current UI is functional but lacks polish and modern UX principles
- System architecture is event-driven with message broker pattern
- Profile and licensing pages identified as primary UX improvement areas
- Vendor onboarding process needs streamlining

---

## Part 1: Introduction & Context (0:00 - 0:33)

### Overview
**Timestamp:** 0:00 - 0:19  
**Screenshot Reference:** `vendors-circle-login.png` (0:14)

Jason introduces Vendors Circle as the vendor management tool that provides:
- Central location for vendors to manage licenses
- Profile management
- Coverage area management
- Single portal for all work requests across all banks

**Current Landing Page:**
- No marketing landing page exists
- Generic placeholder logo (identified as "ripe for change")
- Simple sign-in interface with email field
- "Create an account" option available

**Jason's Commentary:**
> "The landing page here, so we don't have a marketing landing page, the logo is just a generic logo that's there right now, so all this stuff is ripe for change."

---

## Part 2: My Requests Page (Vendor Landing Page) (0:33 - 1:19)

### Primary Vendor Dashboard
**Timestamp:** 0:33 - 0:58  
**Screenshot References:** 
- `vendors-circle-my-requests-1.png` (0:39)
- `vendors-circle-my-requests-2.png` (0:51)

**Navigation Structure:**
Top navigation shows: My Requests | My Invites | Licenses | Profile

### Workflow Categories
The page organizes vendor work into distinct workflow stages:

1. **Bids Needed**
   - Shows properties requiring bid submission
   - Grouped by bank (Finance Bank, Zenith Bank in examples)
   - File links with property addresses
   - Example: "File # 1 1110 N Florida Ave, Tampa, FL 33602"

2. **Bids Submitted**
   - Shows submitted bids with pricing
   - Example: "File # 7 123 Test Street, Tampa, FL 33618 - $4000.00"
   - Organized by bank

3. **Bids Needing My Confirmation**
   - Bids requiring vendor confirmation
   - Shows pricing: "$4400.00"

4. **Reports in Process**
   - Active assignments
   - Bank-grouped display

5. **Reports Needing Rework**
   - Items returned for revision
   - Requires vendor action

6. **Reports Needing Reupload**
   - Technical resubmission category

7. **Bids Lost (Last 30 Days)**
   - Historical tracking
   - 30-day window
   - Bank-categorized

### Technical Implementation
**Jason's Key Points:**
- Each link redirects to existing bank-specific web forms
- Web forms are custom per bank and will NOT be redesigned in Phase 1
- Links serve as navigation layer to external forms
- Multi-bank vendors see all their work in one consolidated view

**Jason's Commentary:**
> "When they click those links, it's going to then go out to a separate web form. We're not going to touch those during this process... we're going to leave those alone for the time being for this introduction and rollout and just have this be the piece that we're really focused on getting this out the door here."

### Business Value
- Eliminates need for vendors to maintain multiple bookmarked pages (one per bank)
- Provides unified view across all banking relationships
- Preserves workflow stage context that vendors are familiar with
- Critical for vendor productivity and task management

---

## Part 3: Profile Page (1:19 - 2:06)

### Profile Overview
**Timestamp:** 1:24 - 1:50  
**Screenshot References:**
- `vendors-circle-profile-1.png` (1:24) - Email and basic info
- `vendors-circle-profile-2.png` (1:29) - Address fields
- `vendors-circle-profile-3.png` (1:32) - Coverage Areas & Specialties
- `vendors-circle-profile-4.png` (1:50) - Bottom section with Banks list

**UX CONCERN IDENTIFIED:**
Jason notes: "You notice that there's opportunities here to make this even better, which is what I want to do. We'll make this feel good when you're using it."

### Profile Fields Structure

#### Contact Information Section
- **My Email:** Primary vendor email
- **Bid Coordinator Email:** Team member who coordinates bids
- **Assistant Email:** Support staff email

#### Personal Information (Two-Column Layout)
- First Name | Last Name
- Middle Name | Suffix
- Company | Title
- Work Phone | Cell Phone
- Fax

#### Address Section
**Primary Address Fields:**
- Address
- Address 2
- City | County | State | Zip
- **Save Button** (Green)

#### Additional Addresses
- Shows list of additional addresses
- Example: "987 Business Way, Minneapolis, Ramsey, MN Ramsey, 55101"
- **Delete icon** available for each address
- **"+ Add Address" button** (Green)

**Purpose:** Vendors often have multiple business locations across states

### Coverage Areas Section
**Timestamp:** 1:32 - 2:06  
**Screenshot References:**
- `vendors-circle-profile-3.png` (1:32)
- `vendors-circle-add-new-coverage-area-modal-1.png` (1:52)
- `vendors-circle-add-new-coverage-area-modal-2.png` (1:54)

**Current Display:**
Shows extensive county lists by state with edit/delete icons:

**Arizona Example:**
"Arizona: Apache, Cochise, Coconino, Gila, Graham, Greenlee, La Paz, Maricopa, Mohave, Navajo, Pima, Pinal, Santa Cruz, Yuma"

**Florida Example:**
"Florida: Alachua, Baker, Bay, Bradford, Broward, Calhoun, Charlotte, Citrus, Clay, Collier, Columbia, DeSoto, Dixie, Duval, Escambia, Flagler, Franklin, Gadsden, Gilchrist, Glades, Gulf, Hamilton, Hardee, Hendry, Hernando, Highlands, Hillsborough, Holmes, Indian River, Jackson, Jefferson, Lafayette, Lake, Lee, Leon, Levy, Liberty, Madison, Manatee, Marion, Martin, Miami-Dade, Monroe, Nassau, Okaloosa, Okeechobee, Orange, Osceola, Palm Beach, Pasco, Pinellas, Polk, Putnam, Santa Rosa, Sarasota, Seminole, St. Johns, St. Lucie, Sumter, Suwannee, Taylor, Union, Volusia, Wakulla, Walton, Washington"

**UX PROBLEM IDENTIFIED:**
Jason: "This is something that the team wasn't real fond of."
- Long comma-separated lists are difficult to scan
- Overwhelming visual presentation
- Needs better organization (rows, columns, or alternative display)

#### Add Coverage Area Modal
**Screenshot Reference:** `vendors-circle-add-new-coverage-area-modal-1.png` (1:52)

**Modal Features:**
- **National Checkbox:** Option for nationwide coverage
- **State Dropdown:** Full state list including DC
  - Shows highlighted selection (Arkansas in example)
  - Alphabetical order from Alaska to Washington

**Screenshot Reference:** `vendors-circle-add-new-coverage-area-modal-2.png` (1:54)

**County Selection (Arizona Example):**
- **Select All / Unselect All** toggle
- Three-column checkbox layout showing all counties:
  - Column 1: Apache, Gila, La Paz, Navajo, Santa Cruz
  - Column 2: Cochise, Graham, Maricopa, Pima, Yavapai (unchecked)
  - Column 3: Coconino, Greenlee, Mohave, Pinal, Yuma
- **"Save Coverage Area" button** (Green)

**Functionality:**
- Vendors can select individual counties or all counties
- Can add multiple states
- Edit and remove capabilities
- Standard CRUD operations

### Specialties Section
**Timestamp:** 2:05  
**Screenshot Reference:** `vendors-circle-edit-specialities-modal.png` (2:05)

**Current Selection Display:**
List format showing:
- Agricultural
- Industrial
- Lodging/Hospitality
- Office
- Single Family

**Edit Specialties Modal:**
Two-column checkbox layout:

**Left Column (Selected):**
- ✓ Agricultural
- ✓ Industrial
- ✓ Lodging/Hospitality
- ✓ Office
- ✓ Single Family

**Right Column (Available):**
- Equipment
- Land
- Multi-Family
- Retail
- Special Purpose

**"Save Specialties" button** (Green)

**Purpose:** Generic vendor specialties. Bank-specific designations are handled separately during bank engagement.

### Banks Section
**Located at bottom of profile page**

**Purpose:** Shows list of banks the vendor currently serves
- Example: Finance Bank, Zenith Bank
- Read-only display
- Populated when vendor accepts bank invitations

**Note:** This is distinct from bank-specific profiles and designations.

---

## Part 4: Licenses & Credentials (2:09 - 2:48)

### Credentials Section
**Timestamp:** 2:09 - 2:14  
**Screenshot Reference:** 
- `vendors-circle-licenses-1.png` (2:09)
- `vendors-circle-licenses-2.png` (2:14)

**Navigation:** Licenses tab in top navigation

### Document Upload Categories

#### W-9
- Single file upload
- File: "w9.pdf"
- Delete icon available

#### Résumé
- Single file upload
- File: "resume.pdf"
- Delete icon available

#### Sample Reports (Up to 4)
- Sample Report 1: "sample1.pdf"
- Sample Report 2: "sample2.pdf"
- Sample Report 3: "sample3.pdf"
- Sample Report 4: "sample4.pdf"
- Each with delete capability

**Note:** Four slots match bank receptor form requirements

### Additional Miscellaneous Documentation

#### Errors and Omissions Insurance
- File upload: "eo.pdf"
- **Expiration Date:** 02/18/2026
- **Limits of Liability:** $2,000,000.00

#### General Commercial Liability
- File upload: "gcl.pdf"
- **Expiration Date:** 09/10/2026
- **Insurance Company:** Hartford
- **Policy Number:** 748383493

#### Auto Liability
- File upload: "auto.pdf"
- **Expiration Date:** 12/22/2027
- **Insurance Company:** State Farm
- **Policy Number:** YC-230320234

**Save Button** (Green) at bottom

**Important Note:** These fields are NOT required. Vendors upload what they have; banks accept or request additional documentation as needed.

### State Licenses Section
**Timestamp:** 2:14 - 2:35  
**Screenshot References:**
- `vendors-circle-add-license.png` (2:22) - State selection
- `vendors-circle-licenses-3.png` (2:27) - Adding Florida license
- `vendors-circle-licenses-4.png` (2:35) - License list view

#### Licenses List Display
Shows licenses organized by state with expandable/collapsible sections:

**Arizona License:**
- State name with delete icon
- License/Cert file: "state-ar.pdf" with delete icon
- License #: 123425
- Expiration Date: 01/02/2027

**Florida Licenses:**
Multiple licenses shown:
- First license: 
  - File: "state-fl.pdf"
  - License #: 9887665
  - Expiration Date: 06/30/2026
- Second license:
  - File: Browse... (no file selected)
  - License #: [empty]
  - Expiration Date: mm/dd/yyyy placeholder

**Add State License functionality at bottom of section**

#### Add State License Process
**Screenshot Reference:** `vendors-circle-add-license.png` (2:22)

**Modal: "Select a State"**
- State dropdown showing full US state list
- Connecticut highlighted in example
- Alphabetical ordering

**After State Selection:**
Shows form fields:
- License/Cert: Browse button - "No file selected"
- License #: Text input
- Expiration Date: Date picker (mm/dd/yyyy)

**Notification Toast:**
"Adding... just now" followed by "State has been added to your list."

### Technical Notes
**Jason's Commentary:**
> "This is important as the banks will consume this and import into their systems."

**Bank Integration:**
- Banks import license data automatically
- PDF files transfer to bank systems
- License numbers and expiration dates sync
- Provides single source of truth for credentials

**Management Philosophy:**
- One-time entry for vendors
- Multi-bank distribution
- Banks validate and accept/decline
- Reduces duplicate data entry across banks

---

## Part 5: My Invites (2:34 - 2:55)

### My Invites Page
**Timestamp:** 2:41  
**Screenshot Reference:** `vendors-circle-my-invites.png` (2:41)

**Current State:**
Shows empty state with table headers:
- Bank
- Invited On
- Actions

**Purpose & Workflow:**
1. Bank sends invitation to vendor
2. Vendor receives email notification
3. Email redirects to My Invites page
4. Vendor can review invite details
5. Accept or Decline options available
6. Response flows back to bank system

**Jason's Note:**
> "Right now, this vendor doesn't have any pending invites, but if there were, they would get an email, they click it to go to this page and they can review the invite, accept or decline."

**Once Accepted:**
- Vendor appears in bank's system
- Vendor fills out bank-specific information
- Bank-vendor relationship established
- Vendor begins receiving work through My Requests page

---

## Part 6: Admin Side (2:55 - 3:21)

### Admin Overview
**Timestamp:** 2:55 - 3:21  

**Jason's Observation:**
> "There is an admin side. I don't see a heavy usage on the admin side."

**Admin Capabilities:**

#### 1. Specialties Management
**Screenshot Reference:** `vendors-circle-admin-specialities.png` (3:10)

**Admin Specialties Page:**
- Success message: "Specialty updated successfully!"
- Table with columns:
  - Key (identifier)
  - Name (display name)
  - Actions (Edit | Delete)

**Specialty List:**
- Agricultural | Agricultural
- Equipment | Equipment
- Industrial | Industrial
- Land | Land
- Lodging/Hospitality | Lodging/Hospitality
- Multi-Family | Multi-Family
- Office | Office
- Retail | Retail
- Single Family | Single Family
- Special Purpose | Special Purpose

**"+ Add Specialty" button** (top right)

**Purpose:** Centralized management of specialty types available to all vendors

#### 2. Vendor Search
**Screenshot Reference:** `vendors-circle-admin-vendors-list-search-criteria.png`

**Search Interface:**
Top banner: "Search all of YouConnect Circle to find and bring in new vendors into your YouConnect."

**Search Criteria:**
- **Within:** All (dropdown)
- **State:** (dropdown)
- **of Postal Code:** (text input)
- **County:** (text input)
- **Specialty:** -- Select Specialty -- (dropdown)
- **First Name:** jill (example shown)
- **Last Name:** (text input)
- **National:** (dropdown)

**Actions:** Search | Clear buttons

**Purpose:**
- Admins search entire Vendors Circle database
- Find vendors matching criteria
- View vendor profiles
- Can perform administrative actions

**Technical Note:**
Jason mentions being unable to click through due to being logged in as regular user, but describes functionality.

---

## Part 7: Bank-Side Integration (UConnect Circle) (3:21 - 5:46)

### Bank Portal Overview
**Timestamp:** 3:21 - 3:47

**Location:** Within UConnect (bank's system)
**New Section:** "UConnect Circle"

**Purpose:**
Banks can:
- Search Vendors Circle database via API
- View vendor profiles from central Circle database
- Invite vendors to their bank
- Import vendor data into their local system

**Jason's Commentary:**
> "If I were inside of a bank and I'm consuming that, what that central circle site, I might be able to go to a new spot inside Uconnect called Uconnect Circle. And from here, I'll be able to do any sort of search I need to directly from that other external database using the API available there."

### Vendor Search & Profile View
**Timestamp:** 3:47 - 4:19

**Search Example:**
- Search for all vendors in system
- Results: ~50,000 vendors
- Click vendor to view profile
- Profile pulls live data from Circle

**Jason notes:**
> "I'm going to see all 50,000 vendors are in the system. And say I want to see, okay, here's somebody that might fit our profile here... I can click on that profile. And now it's pulling a view right from that circle."

**Profile View:**
- Centralized view of vendor data
- All state licenses displayed
- All coverage areas shown
- Same view admins see in Circle admin side

### Inviting Vendors
**Timestamp:** 5:03 - 5:46  
**Screenshot Reference:** `vendors-circle-admin-invite-new-cendor-modal.png`

#### Scenario 1: Vendor Already in Circle
**Process:**
1. Bank finds vendor in search results
2. Clicks email icon next to vendor
3. System sends invitation
4. Invitation appears in vendor's "My Invites" page
5. Vendor accepts/declines

**Example:**
> "I can click this email icon. It's going to invite that vendor... this works if the vendor is already inside Circle. And this is going to show up for Jill in the invite list over here. So Jill will get an email and do a redirect here and accept that."

#### Scenario 2: Vendor NOT in Circle
**Screenshot Reference:** `vendors-circle-admin-invite-new-cendor-modal.png`

**Modal: "YouConnect Circle: Invite Vendor"**
- Message: "The vendor will be sent an invite to join YouConnect Circle. Upon accepting, an email will be sent to you to complete the import process."
- **Vendor Name:** JasonTest (example)
- **Vendor Email:** jason+23423@giances.co (example)
- **Send Invite** button | Cancel link

**Process:**
1. Bank enters vendor name and email
2. System sends invitation email
3. Vendor clicks email link
4. Vendor goes through account creation process
5. Vendor creates Circle profile
6. Bank receives notification when vendor accepts
7. Bank can then import vendor

**Jason's Commentary:**
> "If the vendor does not exist yet, let's say they're not there at all, the person inside the bank can enter the name... This is going to send an email to that vendor. And when the vendor clicks it, they'll then go through the process of creating a new account inside Circle."

---

## Part 8: Vendor Updates & Bank Acceptance Flow (5:46 - 7:41)

### Updates Notification System
**Timestamp:** 5:46 - 6:24

**Core Concept:**
When vendors update their profile or licenses in Circle AND they're already engaged with banks:
- Updates automatically notify all connected banks
- Each bank receives notification in "Vendor Updates" section
- Banks review and accept/decline changes individually

**Jason's Explanation:**
> "As the vendor updates their profile or their licenses inside Circle and they're engaged with banks already, they are already connected with the banks, those updates are going to go to each bank they're engaged with."

### Vendor Updates Section (Bank Side)
**Timestamp:** 6:01 - 6:34

**Purpose:**
- Inbox for vendor profile/license changes
- Review queue for bank administrators
- Accept/Decline workflow
- "Inbox Zero" approach

**Standard Field Updates:**
**Display:**
- Shows field change
- Old value → New value
- **Arrow icon** to accept
- **X icon** to ignore/decline

**Workflow:**
1. Bank admin reviews change
2. Options:
   - **Accept:** Pulls change into bank's vendor record
   - **Ignore:** Dismisses notification, doesn't update bank record
3. Item disappears from list after action
4. Goal: Process all updates to reach "zero"

**Jason's Commentary:**
> "Each bank will be able to review the change and accept or decline it... We don't want inside of our bank. It's not useful to us. I'm gonna go ahead and ignore it. If I want to accept it, I hit the accept button and it pulls it right in."

### Special Handling: State Licenses
**Timestamp:** 6:29 - 7:11

**Different UI for Licenses:**
- More detailed information display
- **Eye icon** instead of arrow
- Opens detailed review modal

**License Review Modal:**
**Features:**
- View uploaded license file
- Click to open/download PDF
- See license details:
  - State
  - License number
  - Expiration date

**Vendor Type Approval:**
Key differentiator - vendors can have multiple roles:
- Appraiser
- Reviewer
- Evaluator
- Other vendor types

**Approval Options per Vendor Type:**
For each vendor type the vendor serves in:
- ✓ **Approve:** License valid for this vendor type
- **Unapprove:** Revoke previous approval
- **Pending:** Leave for later review
- Can approve for some types, not others

**Example Scenario:**
Vendor submits Florida appraiser license:
- Bank approves for "Appraiser" vendor type
- Bank declines for "Reviewer" vendor type
- Different approval levels per role

**After Acceptance:**
- Item disappears from Vendor Updates list
- Works like standard accept process
- Updates bank's vendor record

---

## Part 9: Vendor Import Process (7:41 - 8:49)

### Pending Invites Section
**Timestamp:** 7:17 - 7:41

**Current Display:**
Shows invitation status tracking
- Normally shows vendor name and details
- Jason notes: "Right now the data is blank because I got to get the service running"

**Technical Architecture Note:**
> "It runs on services behind the scenes. It's very much a data message broker system and event-driven architecture."

**Invitation States:**
- **Sent:** Email delivered
- **Errors:** Shows if delivery failed, with resend option
- **Declined:** Vendor rejected invitation
- **Accepted:** Vendor accepted, ready for import

### Import Vendor Workflow
**Timestamp:** 7:52 - 8:49

**Trigger:**
When vendor (example: Zach) has accepted invitation:
- "Import Vendor" button appears
- Clicking initiates import process

**Import Interface:**
**Two-Panel Display:**

**Right Panel: Circle Profile**
- Live data from Vendors Circle
- Shows all profile information vendor entered
- Licenses, coverage areas, etc.

**Left Panel: Bank's Vendor Form**
- Pre-populated with Circle data where possible
- Bank-specific fields
- Example shown:
  - First Name: Zach (auto-filled from Circle)
  - Last Name: [from Circle]
  - Email: [from Circle]
  - Other fields: Empty (vendor didn't complete in Circle)

**Auto-Mapping:**
- System automatically checks applicable fields
- Designations may require manual selection
- Reduces manual data entry

**Behind the Scenes:**
- All licenses automatically queue for transfer
- PDFs copy to bank system
- Policy numbers transfer
- License metadata syncs

**Import Process:**
1. Click "Save" button
2. Vendor record created in bank system
3. Vendor-bank connection established in Circle
4. Vendor sees bank in their "Banks" list
5. All licenses/documents automatically copy
6. Vendor can now receive work from this bank

**Jason's Summary:**
> "Once I hit here, I hit the save button, it's going to create the vendor record inside of the bank here. It's going to connect them with the circle one. So they'll now see this bank in their bank list. And it's going to pull the licenses over automatically behind the scenes on that save process. So all licenses, all those PDFs and policy numbers, all that's going to come over to their record as well."

---

## Part 10: Closing Notes & Next Steps (8:49 - 9:12)

### Jason's Priorities

**Primary Focus Areas:**
1. **Vendor Onboarding:**
   > "I might start another video that's going to walk through the new user onboarding. There's always potential to make that a little bit smoother. We want that process as clean as possible so that there's no sticking points for the vendors lost and not knowing what to do next."

2. **Onboarding Goals:**
   - Eliminate confusion points
   - Clear next-step guidance
   - Streamlined profile completion
   - Smooth license upload process
   - Get vendors operational quickly

**Jason's Closing:**
> "We want to just get them to the next step of getting that profile filled out, the license filled out and on their way. So let me know if you have any questions or thoughts."

---

## Technical Architecture Notes

### System Design
- **Event-Driven Architecture:** Changes trigger events
- **Message Broker System:** Asynchronous processing
- **Service-Based:** Background services handle notifications
- **API Integration:** Banks consume Circle data via API
- **Database Sync:** Automated but bank-controlled

### Data Flow
1. Vendor updates profile in Circle
2. Event triggered in message queue
3. Services process event
4. Notifications sent to connected banks
5. Banks review in their UConnect interface
6. Acceptance triggers data sync to bank database

---

## UX Improvement Opportunities Identified

### Critical (Phase 1 Priority)

1. **Profile Page Layout**
   - Current: Two-column form feels cluttered
   - Opportunity: Better visual hierarchy, sectioning, progressive disclosure

2. **Coverage Areas Display**
   - Current: Long comma-separated county lists
   - Jason's note: "Team wasn't real fond of"
   - Opportunity: Grid layout, collapsible sections, better organization

3. **Licensing Page**
   - Current: Spread out, difficult to scan
   - Opportunity: Better grouping, clearer sections, improved document management

4. **Landing Page**
   - Current: Generic logo, no marketing
   - Opportunity: Branded experience, onboarding guidance

### Secondary Opportunities

5. **My Requests Page**
   - Current: Functional but basic
   - Opportunity: Better visual distinction between sections, status indicators

6. **Vendor Onboarding Flow**
   - Current: No explicit guidance
   - Opportunity: Wizard/step-by-step approach, progress indication

7. **Overall Visual Design**
   - Current: Functional but not modern
   - Opportunity: Consistent design system, better use of whitespace, modern UI patterns

---

## Screenshot Reference Index

### Vendor Portal
- **Login:** `vendors-circle-login.png` (0:14)
- **My Requests:** 
  - `vendors-circle-my-requests-1.png` (0:39)
  - `vendors-circle-my-requests-2.png` (0:51)
- **Profile:**
  - `vendors-circle-profile-1.png` (1:24)
  - `vendors-circle-profile-2.png` (1:29)
  - `vendors-circle-profile-3.png` (1:32)
  - `vendors-circle-profile-4.png` (1:50)
- **Modals:**
  - `vendors-circle-add-new-coverage-area-modal-1.png` (1:52)
  - `vendors-circle-add-new-coverage-area-modal-2.png` (1:54)
  - `vendors-circle-edit-specialities-modal.png` (2:05)
- **Licenses:**
  - `vendors-circle-licenses-1.png` (2:09)
  - `vendors-circle-licenses-2.png` (2:14)
  - `vendors-circle-add-license.png` (2:22)
  - `vendors-circle-licenses-3.png` (2:27)
  - `vendors-circle-licenses-4.png` (2:35)
- **Invites:**
  - `vendors-circle-my-invites.png` (2:41)

### Admin Portal
- `vendors-circle-admin-specialities.png` (3:10)
- `vendors-circle-admin-vendors-list-search-criteria.png`
- `vendors-circle-admin-invite-new-cendor-modal.png`

---

## Key Business Rules Captured

1. **Multi-Bank Management:** Vendors can serve multiple banks from one profile
2. **Bank Independence:** Each bank maintains separate vendor records but can sync from Circle
3. **Bank Control:** Banks must accept/decline all vendor updates
4. **Name Changes:** Special handling - can't be changed freely, requires bank approval process
5. **License Distribution:** Automatic but requires per-vendor-type approval
6. **Web Forms:** Bank-specific, custom, NOT part of Circle redesign scope
7. **Onboarding:** Two paths - existing Circle vendors vs. new vendor creation
8. **Data Sovereignty:** Vendors control Circle profile; banks control their local copies

