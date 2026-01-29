# Vendor Role - User Journey Maps

**Created:** December 26, 2025  
**For:** Vendors Circle Phase 1  
**Role:** Vendor (Fee Appraiser)

---

## Journey 1: Daily Work Check

**Persona:** Tom Reynolds (Multi-bank vendor)  
**Goal:** Check for new bids and assignments  
**Frequency:** Daily (mornings)

### Journey Flow

```
START → Login/Role Selection → My Requests (Landing) → Review Work Items → External Forms → COMPLETE
```

### Detailed Steps

**1. Entry Point**
- Trigger: Start of workday
- Action: Navigate to http://vendors-circle.com or bookmark
- Page: Role Selection

**2. Role Selection**
- See: Vendor and Admin cards
- Action: Click "Vendor" card
- Transition: Navigate to /vendor (My Requests)

**3. My Requests Dashboard**
- See: Workflow stages (Bids Needed, Bids Submitted, etc.)
- See: Work organized by bank
- See: Count badges (e.g., "Bids Needed (2)")
- Scan: Bids Needed section first (highest priority)

**4. Review Work Items**
- For each bank (Finance Bank, Zenith Bank, etc.):
  - See: Property address, File number, Due date
  - Decide: Which bids to respond to
  - Priority: Urgent items (red badges) first

**5. Respond to Bid**
- Action: Click work item card
- Transition: Opens external bank web form (new tab)
- Context: Vendors Circle stays open in background
- Complete: Fill out bid form on bank site
- Return: Back to My Requests to continue

**6. Check Other Stages**
- Scroll through: Bids Submitted, Reports in Process
- Monitor: Status of ongoing work
- Note: Items needing rework or confirmation

**7. Exit**
- Satisfaction: "All caught up!" or note items for later
- Frequency: Return throughout day for updates

### Emotional Journey

- **Entry:** Organized, ready to work
- **Scanning:** Efficient (all work in one place)
- **Action:** Confident (clear what needs doing)
- **Completion:** Satisfied (progress visible)

### Pain Points Solved

❌ **Old Way:** Check 8 different bank portals, multiple bookmarks  
✅ **New Way:** One dashboard, all work visible

### Success Metrics

- Time to find work: < 30 seconds
- Bids responded to: +25% (easier access)
- User satisfaction: High (consolidated view)

---

## Journey 2: Accepting Bank Invitation

**Persona:** Sarah Chen (Independent appraiser)  
**Goal:** Accept invitation from new bank to expand business  
**Frequency:** Occasional (1-2 times per quarter)

### Journey Flow

```
Email Notification → Login → My Invites → Review Invitation → Accept → Bank Onboarding → COMPLETE
```

### Detailed Steps

**1. Email Notification**
- Trigger: Bank sends invitation
- Receive: Email with subject "Zenith Bank has invited you to join Vendors Circle"
- Content: Brief message, CTA button "View Invitation"
- Action: Click email link

**2. Login (if needed)**
- Redirect: To Vendors Circle
- May need: Authentication
- Navigate: Directly to My Invites page

**3. My Invites Page**
- See: Pending invitation card
- Information shown:
  - Bank name (Zenith Bank)
  - Invitation date
  - Expiry date
  - Personal message from bank
  - Status badge (Pending)

**4. Review Invitation**
- Read: Bank's message
- Consider: Do I want to work with this bank?
- Check: Service areas align with coverage
- Decision: Accept or Decline

**5. Accept Invitation**
- Action: Click "Accept Invitation" button
- Confirmation: Snackbar appears (green) "Invitation accepted! Redirecting..."
- Transition: Auto-redirect to bank onboarding form
- New tab: Opens bank-specific form

**6. Bank-Specific Onboarding**
- Fill out: Bank's custom requirements
- May include: Specific designations, local coverage, agreements
- Complete: Submit bank form
- Result: Relationship established

**7. Return to Circle**
- Navigate: Back to Vendors Circle
- Check: My Requests for new work from this bank
- See: Bank appears in Profile → Connected Banks list

**8. Exit**
- Feeling: Excited (new business opportunity)
- Benefit: Can now receive work from new bank

### Alternative Path: Decline

**If vendor declines:**
- Action: Click "Decline" button
- Confirm: "Are you sure?" dialog
- Optional: Provide reason
- Result: Snackbar "Invitation declined"
- Invitation: Moves to declined status or removed
- Bank: Receives notification

### Emotional Journey

- **Email:** Curiosity (new opportunity?)
- **Review:** Evaluation (is this right for me?)
- **Decision:** Confidence (clear options)
- **Onboarding:** Commitment (establishing relationship)
- **Complete:** Satisfaction (business growth)

### Success Metrics

- Invitation acceptance rate: Track
- Time to accept: < 5 minutes
- Onboarding completion: High %
- User feedback: Positive (clear process)

---

## Journey 3: Updating License Renewal

**Persona:** Tom Reynolds  
**Goal:** Upload renewed Georgia license before expiration  
**Frequency:** Annually per state (1-3 times per year)

### Journey Flow

```
Expiration Warning → Login → Licenses Page → Update License → Save → Banks Notified → COMPLETE
```

### Detailed Steps

**1. Trigger: Expiration Warning**
- Email: "Your Georgia license expires in 30 days"
- Alternative: See warning banner in app
- Alternative: Notification badge on Licenses nav item
- Action: Navigate to Licenses page

**2. Login & Navigate**
- Role: Select Vendor
- Automatic: Warning banner shows at top
  - "You have 2 licenses expiring soon"
  - Link to Licenses page
- Click: "Licenses" in navigation

**3. Licenses Page - Scan**
- See: State Licenses section
- Identify: Georgia license with "Expiring Soon" badge (yellow)
- Banner: Expiration warning at top (dismissible)

**4. Renew License Offline**
- External: Complete state renewal process
- Receive: New license certificate (PDF)
- Have: New license number and expiration date

**5. Update in Circle**
- Find: Georgia license in list
- Action: Click Edit (or could delete and re-add)
- Form appears: Pre-filled with current info
- Update:
  - Upload new license file (PDF)
  - Enter new expiration date
  - Update license number (if changed)
- Action: Click "Save"

**6. Confirmation**
- Snackbar: "License updated successfully!" (green, top-right)
- Visual: Badge changes from "Expiring Soon" to "Active"
- Auto: All connected banks receive notification

**7. Banks Review Update**
- Background: Update sent to all 8 banks
- Banks: Review new license in their Vendor Updates queue
- Banks: Accept or decline the update
- Result: Banks' vendor records update automatically

**8. Verification**
- Check: License shows as "Active"
- Peace of mind: Won't lose work due to expired license
- Continue: Regular work

### Emotional Journey

- **Warning:** Concern (don't want to miss renewal)
- **Upload:** Relief (easy process)
- **Confirmation:** Satisfaction (one upload, all banks notified)
- **Complete:** Confidence (credentials current)

### Pain Points Solved

❌ **Old Way:** Upload same license to 8 different bank portals  
✅ **New Way:** Upload once, notifies all 8 banks automatically

### Success Metrics

- License renewals completed: 100% before expiration
- Time to update: < 5 minutes
- Vendor uploads: 1 vs 8 (87.5% time saved)
- Banks receive updates: Automatic, 100%

---

## Journey 4: Setting Up Profile (New Vendor Onboarding)

**Persona:** Sarah Chen (New independent appraiser)  
**Goal:** Complete profile to start receiving work  
**Frequency:** Once (onboarding)

### Journey Flow

```
Account Creation → Login → Profile Page → Add Coverage Areas → Add Specialties → Upload Licenses → COMPLETE
```

### Detailed Steps

**1. Account Creation** (Outside app scope)
- Receive: Invitation email or discover Circle
- Create: Account with email/password
- Verify: Email address
- First login: Guided to complete profile

**2. Navigate to Profile**
- Click: "Profile" in navigation
- See: Empty or partially filled form
- Goal: Complete all sections

**3. Contact Information**
- Fill: Email (may be pre-filled)
- Fill: Work phone, Cell phone
- Optional: Bid coordinator email, Assistant email

**4. Personal Information**
- Fill: First name, Last name (may be pre-filled)
- Fill: Company name
- Fill: Title/Position
- Note: Some fields may be locked (protected by banks)

**5. Primary Address**
- Fill: Street address, City, State, ZIP
- Optional: Address line 2
- Note: County may auto-populate
- Action: Click "Save" (section saves)

**6. Add Coverage Areas** (Critical!)
- Action: Click "Add Coverage Area" button
- Modal opens: State selection
- Select: California (Sarah's state)
- See: County checkboxes appear
- Options:
  - "Select All" for entire state
  - OR individual counties (San Francisco, Alameda, etc.)
- Select: Relevant counties
- Action: Click "Save Coverage Area"
- Result: Counties display as pills (not comma list!)
- Repeat: For additional states if licensed in multiple

**7. Select Specialties**
- Action: Click "Edit Specialties" button
- Modal opens: Checkbox list
- Select: Residential, Multi-Family
- Action: Click "Save Specialties"
- Result: Specialties display as badges

**8. Navigate to Licenses**
- Click: "Licenses" in navigation
- Goal: Upload credentials

**9. Upload Credentials**
- Upload: W-9 tax form
- Upload: Resume/CV
- Upload: Sample work (1-4 samples)
- Each upload: Snackbar confirms success

**10. Add State License**
- Action: Click "Add State License"
- Select: California
- Upload: License certificate (PDF)
- Enter: License number
- Enter: Expiration date
- Action: Click "Save"
- Result: License appears in list with "Active" badge

**11. Insurance (Optional)**
- Upload: E&O insurance
- Enter: Expiration, Limits
- Upload: General Liability
- Upload: Auto Liability
- Note: Not all required, upload what available

**12. Review & Finalize**
- Navigate: Back to Profile
- Review: All sections complete
- Feeling: Accomplished
- Action: Click "Save Changes" (final)
- Snackbar: "Profile updated successfully!"

**13. Ready for Work**
- Status: Profile complete
- Visible: To banks searching in Circle
- Can: Receive invitations
- Can: Start accepting work

### Emotional Journey

- **Start:** Motivated (want to get started)
- **Form Filling:** Focused (clear sections)
- **Coverage Areas:** Satisfied (easy county selection)
- **Licenses:** Confident (secure upload)
- **Complete:** Pride (professional profile complete)

### Pain Points Solved

❌ **Old Way:** Fill profile separately for each bank  
✅ **New Way:** Fill once, available to all banks

### Guidance Needs

- **First-time users:** May need onboarding tour
- **Progress indicator:** Show % complete (Phase 2)
- **Help tooltips:** Explain protected fields
- **Next steps:** Clear call-to-action after completion

### Success Metrics

- Profile completion rate: > 80%
- Time to complete: < 15 minutes
- Field errors: Low (good validation)
- User returns: High (sticky product)

---

## Journey 5: Checking Notifications

**Persona:** Tom Reynolds  
**Goal:** Stay informed about bid requests, invitations, and license expirations  
**Frequency:** Multiple times daily

### Journey Flow

```
Login → See Badge → Click Bell → Review Notifications → Take Action → Mark as Read → COMPLETE
```

### Detailed Steps

**1. Login & Badge Notification**
- See: Red badge on bell icon (top right)
- Shows: "2" unread notifications
- Curiosity: What needs attention?

**2. Click Notifications Bell**
- Action: Click bell icon
- Drawer: Slides in from right
- Header: "Notifications (2 unread)"

**3. Review Notifications**
- **Notification 1:** "New Bid Request"
  - From: Finance Bank
  - Property: 1110 N Florida Ave
  - Time: 5 minutes ago
  - Badge: Blue dot (unread)
  
- **Notification 2:** "License Expiring Soon"
  - Your Georgia license expires in 30 days
  - Time: 1 hour ago
  - Badge: Blue dot (unread)
  
- **Notification 3:** "Bank Invitation"
  - Zenith Bank invited you
  - Time: 2 hours ago
  - Badge: None (read)

**4. Take Action**
- Click: "New Bid Request" notification
- Transition: Navigate to My Requests
- Or: Click notification link to go directly to item

**5. Drawer Closes**
- Auto: Closes when clicking notification
- Or: Click outside drawer to close
- Or: Press Escape key

**6. Badge Updates**
- After viewing: Unread count decreases
- Visual: Badge updates from "2" to "0"

### Notification Types

**Vendor Role:**
- New bid requests
- Bids accepted/declined
- Reports in review
- Rework needed
- License expirations
- Bank invitations
- Profile update confirmations

### Emotional Journey

- **Badge:** Attention (something new)
- **Review:** Information (stay current)
- **Action:** Productive (direct link to task)
- **Complete:** Informed (nothing missed)

### Design Principles

- **Non-intrusive:** Drawer, not popup
- **Contextual:** Role-specific notifications
- **Actionable:** Click to navigate
- **Clear:** Unread vs read distinction
- **Dismissible:** Easy to close

---

## Journey 6: Toggling Dark Mode

**Persona:** Any vendor  
**Goal:** Switch to dark mode for evening work  
**Frequency:** Once per session or as needed

### Journey Flow

```
Any Page → Click Avatar → Click "Appearance" → Theme Toggles → Preference Saved → COMPLETE
```

### Detailed Steps

**1. Current State**
- Default: Light mode
- Working: Evening or low-light environment
- Desire: Reduce eye strain

**2. Access Theme Toggle**
- Action: Click user avatar (top right, "T" initials)
- Dropdown: Opens showing:
  - Name: Tom Reynolds
  - Email: tom@reynoldsappraisals.com
  - Role: Vendor badge
  - **Appearance: Light** (current theme shown)
  - Sign Out option

**3. Toggle Theme**
- Action: Click "Appearance" button
- Icon: Shows moon (for current light mode)
- Click!

**4. Instant Transformation**
- All elements transition smoothly:
  - Background: White → Dark navy
  - Sidebar: Light gray → Dark gray
  - Cards: White → Dark gray
  - Text: Dark → Light
  - Icons: Adjust colors
  - Logo: Maintains brand color (no invert)
- Badge: Updates to show "Dark"
- Icon: Changes to sun (for switching back)

**5. Preference Saved**
- Auto: Saved to localStorage
- Next visit: Opens in dark mode
- Persistent: Across sessions

**6. Continue Working**
- Experience: Comfortable in dark mode
- Eyes: Less strain
- Productivity: Maintained

### Return Journey

**Switching Back to Light:**
- Same process: Avatar → Appearance → Toggle
- Instant: Back to light mode
- Saved: Preference updated

### Emotional Journey

- **Need:** Comfort (reduce eye strain)
- **Discovery:** Easy (accessible toggle)
- **Activation:** Delight (smooth transition)
- **Use:** Satisfaction (better working environment)

### Success Metrics

- Toggle usage: Track light vs dark preference
- Session persistence: 100%
- User satisfaction: High (comfort feature)

---

## Summary: Vendor Journey Touchpoints

### Navigation Touchpoints
1. **Role Selection** - Entry point
2. **My Requests** - Primary dashboard (landing page)
3. **My Invites** - Opportunity management
4. **Licenses** - Credential management
5. **Profile** - Information management

### Interaction Touchpoints
1. **Side Navigation** - Always accessible, collapsible
2. **Notifications** - Stay informed
3. **User Menu** - Settings and preferences
4. **Theme Toggle** - Personalization
5. **Modals** - Focused tasks
6. **Snackbars** - Feedback on actions

### Emotional Touchpoints
- **Efficiency:** All work in one place
- **Confidence:** Clear navigation and feedback
- **Control:** Edit, update, manage independently
- **Recognition:** Professional interface (not "vendor commodity")
- **Peace of mind:** Credentials current, work tracked

---

**All journeys designed to make vendors feel:**  
> "Without Vendors Circle, I can't manage my banking relationships efficiently."

This is the Phase 1 foundation for Phase 2's community features and relationship building.


