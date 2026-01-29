# Admin Role - User Journey Maps

**Created:** December 26, 2025  
**For:** Vendors Circle Phase 1  
**Role:** Admin (System Administrator)

---

## Journey 1: Finding a Vendor for Support

**Persona:** Sarah Chen (System Admin)  
**Goal:** Find vendor's profile to answer support ticket  
**Frequency:** Multiple times daily

### Journey Flow

```
Support Ticket → Login as Admin → Vendors List → Search → View Profile → Get Info → Respond to Ticket → COMPLETE
```

### Detailed Steps

**1. Trigger: Support Ticket**
- Receive: Email or support system notification
- Issue: "Vendor Tom Reynolds can't access his account"
- Need: Find vendor's information to help

**2. Login to Circle**
- Navigate: To Vendors Circle
- Select: Admin role card
- Land: Vendors List page (default for admin)

**3. Search for Vendor**
- See: Search bar at top
- Type: "Tom Reynolds" or "tom@reynoldsappraisals.com"
- Real-time: Results filter as typing
- Find: Tom Reynolds appears in results

**4. Quick Info from List**
- See in table:
  - Name: Tom Reynolds
  - Company: Reynolds Appraisal Services
  - Email: tom@reynoldsappraisals.com
  - States: FL, GA, AL (badges)
  - Specialties: Commercial, Residential, +1

**5. View Full Profile**
- Action: Click "View Profile" button
- Navigate: To /admin/vendors/vendor-001
- Breadcrumb: Shows "Vendors > Tom Reynolds"

**6. Review Vendor Details**
- **Overview Tab:** (default)
  - Contact info (phone numbers)
  - Address
  - Licensed states
  - Specialties
  - Stats (connected banks, licenses, joined date)
  
- **Licenses Tab:**
  - All state licenses
  - Expiration dates
  - License files
  - Insurance documents
  
- **Coverage Areas Tab:**
  - States and counties
  - Visualized as pills/badges

**7. Gather Information**
- Copy: Email address for correspondence
- Note: Last login date (if shown)
- Check: Account status (Active)
- Find: Whatever info needed for support

**8. Return to List**
- Action: Click breadcrumb "Vendors" or Back button
- Return: To vendors list
- Preserve: Search filters if needed for more tickets

**9. Respond to Ticket**
- External: Use gathered info to help vendor
- Resolution: Answer question, reset password, etc.
- Close: Support ticket

### Alternative: Quick Search Path

**For simple lookups:**
- Search → See in table → Done (no need for full profile)

### Emotional Journey

- **Ticket:** Task-focused (need information)
- **Search:** Efficiency (fast results)
- **Profile:** Comprehensive (all info in one place)
- **Resolution:** Satisfaction (helped vendor quickly)

### Pain Points Solved

❌ **Old Way:** Query database directly, multiple tables, SQL required  
✅ **New Way:** Search interface, instant results, all info organized

### Success Metrics

- Time to find vendor: < 30 seconds
- Support ticket resolution time: Reduced 50%
- Admin satisfaction: High (efficient tools)

---

## Journey 2: Managing Specialty List

**Persona:** Sarah Chen (Admin)  
**Goal:** Add new specialty type requested by business team  
**Frequency:** Occasional (monthly)

### Journey Flow

```
Business Request → Login as Admin → Specialties Page → Add Specialty → Save → Confirmation → COMPLETE
```

### Detailed Steps

**1. Business Request**
- Receive: Email from product team
- Request: "Please add 'Warehouse & Distribution' specialty"
- Reason: New market segment, vendors requesting it

**2. Navigate to Specialties**
- Login: Admin role
- See: Side navigation
- Click: "Specialties" menu item
- Land: Specialties management page

**3. Review Current List**
- See: Table of 10 current specialties
- Check: "Warehouse & Distribution" doesn't exist
- Confirm: Need to add new one

**4. Add New Specialty**
- Action: Click "+ Add Specialty" button (top right)
- Modal: Opens with form
- Fill:
  - Specialty Name: "Warehouse & Distribution"
  - Key: "warehouse-distribution" (auto-suggested)
- Action: Click "Add Specialty"

**5. Confirmation & Update**
- Modal: Closes automatically
- Snackbar: Slides in from top-right (green)
  - "Specialty added successfully!"
  - Auto-dismisses after 3 seconds
- Table: Updates immediately
- New row: "Warehouse & Distribution" appears
- Sort: Alphabetical order maintained

**6. Verification**
- Scroll: Find new specialty in list
- See: "0 vendors" (none selected it yet)
- Available: Now shows in vendor profile specialty options

**7. Notify Team**
- External: Reply to email
- Confirm: "Added! Vendors can now select it."
- Impact: All vendors see new option immediately

### Alternative: Edit Specialty

**If typo or name change needed:**
- Click: "Edit" button next to specialty
- Modal: Opens with current values pre-filled
- Edit: Specialty name or key
- Save: Updates immediately
- Snackbar: "Specialty updated successfully!"

### Alternative: Delete Specialty

**If specialty no longer needed:**
- Click: "Delete" button
- Confirmation Modal: "Are you sure?"
  - Shows: Specialty name
  - Warns: "This action cannot be undone"
  - Buttons: "Delete" (red) | "Cancel"
- Confirm: Click "Delete"
- Result: Removed from table
- Snackbar: "Specialty deleted successfully!"

### Emotional Journey

- **Request:** Helpful (supporting business needs)
- **Add:** Efficient (quick, easy process)
- **Confirmation:** Confident (clear feedback)
- **Complete:** Productive (task done quickly)

### Success Metrics

- Time to add specialty: < 1 minute
- Errors: None (simple form)
- Availability: Immediate (real-time for vendors)
- Admin satisfaction: High (empowered to manage)

---

## Journey 3: Discovering Qualified Vendors

**Persona:** Sarah Chen (Admin) - Supporting bank administrator  
**Goal:** Help bank find appraisers in specific market  
**Frequency:** Weekly

### Journey Flow

```
Bank Request → Login as Admin → Advanced Search → Apply Filters → Review Results → Share Profiles → COMPLETE
```

### Detailed Steps

**1. Trigger: Bank Request**
- Contact: From bank administrator
- Request: "Need commercial appraisers in Florida"
- Goal: Find qualified vendors

**2. Navigate to Vendors List**
- Login: Admin role
- Default: Lands on Vendors page
- See: 20 vendors in table

**3. Apply Quick Filters**
- **State Filter:**
  - Click: "All States" dropdown
  - Select: "FL" (Florida)
  - Auto: Table filters to Florida vendors
  
- **Specialty Filter:**
  - Click: "All Specialties" dropdown
  - Select: "Commercial"
  - Auto: Table shows only commercial appraisers in FL

**4. See Active Filters**
- Display: Filter pills below dropdowns
  - "State: FL" (with X to remove)
  - "Specialty: Commercial" (with X to remove)
- Count: "Showing 5 of 20 vendors"

**5. Use Advanced Filters** (if needed)
- Click: "Advanced" button
- Expand: Additional filter fields
  - Within [X] miles of Postal Code
  - County: Hillsborough
  - National coverage checkbox
- Apply: Filters narrow results further

**6. Review Filtered Results**
- Table shows: Matched vendors
- Each row:
  - Name
  - Company
  - Email
  - State badges (FL)
  - Specialty badges (Commercial)
  - "View Profile" link

**7. Investigate Vendors**
- For each promising vendor:
  - Click: "View Profile"
  - Review: Full details
    - Contact info
    - License count (qualification indicator)
    - Connected banks (experience indicator)
    - Joined date (tenure)
  - Switch tabs: View licenses, coverage areas
  - Decision: Suitable for bank's needs?
  - Navigate back: Check next vendor

**8. Compile List**
- Note: 3-5 qualified vendors
- Information: Names, emails, strengths
- Optional: Export (Phase 2 feature)

**9. Share with Bank**
- External: Email bank administrator
- Provide: Vendor contact information
- Suggest: Top recommendations
- Result: Bank can invite these vendors

### Emotional Journey

- **Request:** Helpful (serving bank client)
- **Search:** Powerful (precise filtering)
- **Results:** Confident (right matches)
- **Review:** Thorough (complete information)
- **Delivery:** Satisfied (quality recommendations)

### Pain Points Solved

❌ **Old Way:** Manual database queries, export to Excel, email attachments  
✅ **New Way:** Search interface, instant results, sharable profiles

### Success Metrics

- Search accuracy: High % match
- Time to find 5 vendors: < 5 minutes
- Bank satisfaction: Qualified recommendations
- Conversion: Vendors accept invitations

---

## Journey 4: Routine System Maintenance

**Persona:** Sarah Chen (Admin)  
**Goal:** Keep system data clean and current  
**Frequency:** Weekly maintenance

### Journey Flow

```
Scheduled Task → Login → Review Specialties → Update/Clean → Review Vendors → Flag Issues → COMPLETE
```

### Detailed Steps

**1. Scheduled Maintenance**
- Calendar: Weekly admin task
- Goals:
  - Review specialty list
  - Check vendor data quality
  - Identify issues

**2. Specialties Review**
- Navigate: Specialties page
- Check: Vendor counts
  - High counts: Popular specialties
  - Zero counts: Consider removing
  - Missing: Add if requested
- Actions:
  - Delete unused specialties
  - Edit names for clarity
  - Add new ones as needed

**3. Vendors Overview**
- Navigate: Vendors list
- Review: Latest registrations
- Sort: By "Last Updated" (if available)
- Check: Profile completion rates

**4. Quality Checks**
- Random sampling: View a few vendor profiles
- Verify: Contact info looks valid
- Check: License expiration dates
- Flag: Any data quality issues

**5. Report Findings**
- Document: Any issues found
- Escalate: To tech team if needed
- Metrics: Track system health

### Emotional Journey

- **Routine:** Professional (part of job)
- **Review:** Diligent (attention to detail)
- **Actions:** Empowered (can fix issues)
- **Complete:** Organized (system maintained)

---

## Summary: Admin Journey Touchpoints

### Navigation Touchpoints
1. **Vendors List** - Primary workspace (landing page)
2. **Vendor Detail** - Deep investigation
3. **Specialties** - System configuration

### Interaction Touchpoints
1. **Search & Filters** - Finding vendors
2. **Table Navigation** - Scanning results
3. **Profile Tabs** - Detailed review
4. **CRUD Modals** - Managing specialties
5. **Breadcrumbs** - Returning to list
6. **Snackbars** - Action feedback

### Key Admin Actions
- **Search:** Find vendors quickly
- **Filter:** Narrow by criteria
- **View:** Read-only vendor profiles
- **Manage:** Specialties CRUD
- **Navigate:** Between views
- **Report:** Support and maintenance

### Emotional Touchpoints
- **Efficiency:** Fast search and navigation
- **Clarity:** Well-organized information
- **Control:** Manage system settings
- **Confidence:** Complete data access
- **Productivity:** Tools support workflow

---

**Admin experience designed for:**  
> "Quick access to vendor data and easy system management without technical expertise."

Empowers administrators to support vendors and banks efficiently.


