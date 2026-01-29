# PERSONA 7: David Kim
## New Team Member (Team Invite - New User)

---

### Background

**Name:** David Kim  
**Age:** 26  
**Location:** San Diego, California  
**Experience:** 1 year as licensed appraiser (recently passed exam)  
**Current Situation:** Just hired by Sarah Martinez at Coastal Appraisal Group as contractor appraiser

**Goals:**
- Start working with Coastal Appraisal Group
- Build his portfolio and experience
- Eventually work for multiple companies

**Pain Points:**
- New to the industry, doesn't have established systems
- Wants to make a good impression on Sarah
- Unsure about what documentation he needs

---

### Entry Point

**Discovery Method:** Team invite email from Sarah Martinez  
**Landing:** Email → /join-team page  
**Motivation:** "Sarah hired me, I need to complete my profile to start working"

---

### User Journey (Passwordless + Team Invite)

#### Step 1: Team Invitation Email
```
Sarah Martinez sends invitation via Vendor Circle
  ↓
David receives email: "Sarah Martinez added you to Coastal Appraisal Group"
```

**Email Content:**
- **From:** Vendor Circle <invites@vendorscircle.com>
- **Subject:** Sarah Martinez added you to Coastal Appraisal Group's Vendor Circle account
- **Body:**
  ```
  Hi David,

  Sarah Martinez has added you to Coastal Appraisal Group's 
  Vendor Circle account as an Appraiser.

  To start receiving opportunities, complete your profile:
  • Add your licenses and credentials
  • Set your coverage areas and specialties
  • Upload required documents

  [Complete Your Profile Button]

  Once your profile is complete, you'll be able to receive and 
  respond to bid invitations on behalf of Coastal Appraisal Group.

  Questions? Contact Sarah Martinez or your business administrator.

  Powered by Realwired
  ```

**User Reaction:**
- "Okay, I need to set up my profile"
- "This looks official, Sarah mentioned it"
- Clicks "Complete Your Profile"

---

#### Step 2: Team Invite Landing Page
```
Clicks "Complete Your Profile"
  ↓
Opens /join-team?token=xxx&business=coastal-appraisal
```

**Expected UI:**
- **Headline:** "Join Coastal Appraisal Group"
- **Subheading:** "Sarah Martinez has invited you to join their team"

**Information Displayed:**
- Business Name: Coastal Appraisal Group
- Invited By: Sarah Martinez (Business Admin)
- Your Role: Appraiser

**Message:**
"Complete your appraiser profile to start receiving work from Coastal Appraisal Group and their connected banks."

**CTAs:**
- **Primary Button:** "Create Account"
- **Secondary Link:** "Already have an account? Log in"

**Footer:** "Powered by Realwired"

**User Action:** Clicks "Create Account"

---

#### Step 3: Email Entry (Pre-filled)
```
Clicks "Create Account"
  ↓
Modal or new page with email input
```

**Expected UI:**
- Headline: "Create your appraiser profile"
- Message: "We'll send you a magic link to verify your email"
- Email field: **Pre-filled** with `david.kim@gmail.com` (from invite token)
- Email field: **Disabled**
- Button: "Send Magic Link"

**User Action:** Clicks "Send Magic Link"

---

#### Step 4: Magic Link Request
```
Clicks "Send Magic Link"
  ↓
System sends email
  ↓
Stores invite context (businessId, businessName, role, invitedBy) in session
  ↓
Redirects to /check-email
```

**Expected UI:**
- "Check your email" heading
- Message: "We sent a magic link to david.kim@gmail.com"
- Special note: "After verifying, you'll create your appraiser profile for Coastal Appraisal Group"

---

#### Step 5: Magic Link Email & Click
```
Receives email: "Complete your profile setup"
  ↓
Clicks "Complete Setup" button
  ↓
Opens /verify-magic?token=xxx
```

---

#### Step 6: Magic Link Verification
```
System validates magic link token
  ↓
Creates user account (accountType: 'individual_vendor', isTeamMember: true)
  ↓
Retrieves invite context from session
  ↓
Redirects to /onboarding with team context
```

**What happens behind the scenes:**
- User account created
- Team connection queued (will be completed after onboarding)
- User is marked as "team member" (not business owner)

---

#### Step 7: Simplified Onboarding (Team Member Version)
```
Completes SIMPLIFIED onboarding:
  - Welcome (mentions Coastal Appraisal Group)
  - Personal information
  - State licenses
  - Coverage areas (pre-filled with business coverage, can modify)
  - Specialties & designations
  - Review
```

**Key Differences from Full Onboarding:**
✅ **INCLUDED:**
- Personal information (name, title, experience)
- State licenses
- Coverage areas (pre-filled with business coverage)
- Specialties and designations
- Review step

❌ **SKIPPED:**
- User type selection (already known: team member)
- Business information (not needed, joining existing business)
- Business contact (using business's contact info)

**Pre-filled Data:**
- Coverage Areas: Pre-populated with Coastal Appraisal Group's coverage (San Diego County, Orange County, Riverside County)
- Note: "These are your business's coverage areas. You can modify them for your profile."

**Estimated Time:** 8-10 minutes (vs 15-20 for full onboarding)

---

#### Step 8: Dashboard (Team Member + Business Connection)
```
Completes simplified onboarding
  ↓
System adds David to Coastal Appraisal Group team
  ↓
Redirects to /vendor/dashboard
  ↓
Shows success toast
```

**Expected UI:**
- **Success Toast (Top-right):**
  ```
  ✓ You're now part of Coastal Appraisal Group!
  
  You can receive and respond to work assigned by Sarah Martinez.
  ```
  [Dismiss button]

- **Dashboard:**
  - Same first-time experience (null states)
  - BUT: "Team Account" badge visible
  - Shows: "Coastal Appraisal Group" in profile
  - Get Started tasks:
    - ☑️ Create account
    - ☑️ Complete profile
    - ☐ Upload license documents
    - ☐ Upload E&O insurance
    - ☐ Add profile photo

**Team Context Indicator:**
- Top navigation shows: "Coastal Appraisal Group" (can't switch, only one team)

---

#### Step 9: Sarah's View (Business Admin Dashboard)
```
Meanwhile, on Sarah's dashboard:
  ↓
Team member list updates automatically
```

**Sarah's Team Management Page:**
```
TEAM MEMBERS (3)

[Profile Photo]  Sarah Martinez (You)
                 Owner / Chief Appraiser
                 Status: Active
                 
[Profile Photo]  Maria Gonzalez
                 Team Appraiser
                 Status: Active
                 Joined: Dec 15, 2025
                 
[Profile Photo]  David Kim  ← NEW!
                 Team Appraiser
                 Status: Active
                 Joined: Jan 22, 2026  ← Just now!
                 
                 [View Profile] [Assign Work]
```

**Notification for Sarah:**
- Toast or bell notification: "David Kim completed their profile and joined your team"

---

### Success Criteria

**Invite Email:**
- ✅ Email clearly identifies the business and admin
- ✅ Email explains the purpose (complete profile to receive work)
- ✅ Email is trustworthy (not spam)

**Simplified Onboarding:**
- ✅ Onboarding is shorter than full version (8-10 min vs 15-20 min)
- ✅ Coverage areas are pre-filled with business coverage
- ✅ User can modify pre-filled coverage
- ✅ No business setup questions

**Team Connection:**
- ✅ User is added to business team automatically
- ✅ User sees success toast
- ✅ Business admin sees new team member
- ✅ Business admin gets notification

**Permission Model:**
- ✅ Team member can view/edit their own profile
- ✅ Team member can upload their own documents
- ✅ Team member can see work assigned to them
- ❌ Team member cannot edit business settings
- ❌ Team member cannot manage other team members

---

### Edge Cases to Test

1. **User already has account (Multi-Business Contractor):**
   ```
   David has existing account → Works for Business A
     ↓
   Business B invites David
     ↓
   David clicks "Log in" on join team page
     ↓
   Magic link sent to existing email
     ↓
   David signs in
     ↓
   System adds Business B to David's teamAccounts array
     ↓
   Dashboard shows: "You're now part of Business B!"
     ↓
   David can switch between Business A and Business B contexts
   ```

2. **Admin removes team member before they join:**
   - David receives invite
   - Sarah removes David before he completes signup
   - David clicks link → Shows error: "This invitation is no longer valid"
   - Provides Sarah's contact information

3. **Team member already exists in business:**
   - Sarah accidentally sends duplicate invite
   - David clicks both links
   - Second link shows: "You're already a member of Coastal Appraisal Group"
   - Redirects to dashboard

4. **Invite expired (30 days):**
   - David doesn't complete signup for 30 days
   - Clicks invite link
   - Shows error: "This invitation has expired"
   - Provides button: "Request New Invitation from Sarah"

5. **Sarah's business is deactivated:**
   - Sarah's business account is deactivated
   - David tries to complete signup
   - Shows error: "This business account is no longer active"

---

### Multi-Business Contractor Scenario

**David's Evolution:**
```
Month 1:
- Works only for Coastal Appraisal Group (Sarah)
- Dashboard shows single team context

Month 3:
- Receives invite from another business (Martinez Appraisals)
- Accepts invite (signs in with existing account)
- Now has 2 team accounts:
  - Coastal Appraisal Group (Sarah)
  - Martinez Appraisals (Carlos)

Dashboard:
- Top navigation shows dropdown:
  [Coastal Appraisal Group ▼]
  - Switch to Martinez Appraisals
  
- Each context shows different work:
  - Coastal: Shows work from Sarah's clients
  - Martinez: Shows work from Carlos's clients
  
- Profile settings:
  - Global: Licenses, coverage, specialties (shared)
  - Per-business: Availability, notes, business-specific settings
```

---

### User Quotes (Fictional)

> "The setup was pretty quick. I thought it would take an hour."

> "I like that it pre-filled the coverage areas from Coastal Appraisal's settings."

> "As a new appraiser, I'm not sure I should change the coverage areas. I'll just keep what Sarah set."

> "Would be nice to see what work I'll be getting before I complete signup."

---

### Testing Checklist

- [ ] Send team invite from catalogue (Sarah → David)
- [ ] Receive team invite email
- [ ] Click invite link
- [ ] See business name and admin name
- [ ] Create account with pre-filled email
- [ ] Receive magic link
- [ ] Complete SIMPLIFIED onboarding (verify no business questions)
- [ ] Verify coverage pre-fill
- [ ] Complete onboarding
- [ ] See success toast
- [ ] Check team member list on Sarah's dashboard
- [ ] Test "Log in" path (existing user)
- [ ] Test multi-business scenario (existing user joins second business)
- [ ] Test team member permissions
- [ ] Test invite expiration
- [ ] Test duplicate invite

---

**Persona Type:** Primary (Common onboarding scenario for businesses)  
**Priority:** Critical  
**Complexity:** High (simplified onboarding + team permissions)  
**Estimated Completion Time:** 12-15 minutes (including email verification)

**Note:** This persona represents the **team member onboarding flow**, which is critical for business accounts to scale their team without admin burden.
