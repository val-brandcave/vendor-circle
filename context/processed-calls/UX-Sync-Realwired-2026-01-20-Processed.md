# UX Sync | Realwired - January 20, 2026 (Processed)

**Meeting Date:** January 20, 2026  
**Duration:** 56 minutes  
**Attendees:** Ed Kruger (Realwired CEO), Jeff McCall (Subject Matter Expert), Cody Miles (Brand Cave UX Lead), Val Vinnakota (Brand Cave Developer)  
**Recording:** https://fathom.video/share/kxoXF8RZ1byu51uMhvuAwYBNRjru61p4

---

## Executive Summary

This was a critical design review session where Ed and Jeff provided extensive feedback on the Vendor Circle Phase 1 prototype. The session revealed several fundamental UX issues that need resolution before the product can move to backend development. The primary concern is that the "individual" vs "business" account model is still creating two separate experiences when it should be unified.

**Key Decision:** Ed confirmed that the frontend work (Next.js/Tailwind) should become the production UI, and Jason's PHP backend will be converted to APIs to support it.

---

## Critical Issues Identified

### 1. **Unified Account Model Not Yet Achieved**

**Problem:**  
Despite previous discussions, the onboarding flow still treats individual appraisers and business accounts as two completely separate products with different steps, different UIs, and different information architecture.

**Why This Matters:**
- Banks approve individual appraisers, not firms
- A business owner may also be an appraiser
- The system needs ONE account entry point with optional organization context
- Current approach creates maintenance burden and user confusion

**Required Fix:**
- Single onboarding flow for all users
- Optional "I also work as an appraiser" checkbox for business owners
- Unified information architecture that works for both contexts
- Consistent step progression regardless of account type

---

### 2. **Onboarding Stepper UI Pattern**

**Problem:**  
The onboarding stepper UI doesn't match the Specretary pattern that Cody specified in previous feedback.

**Required Pattern (from Specretary):**
- No progress bar at top
- Full-width header and footer
- Sidebar sandwiched between header/footer (not full-page height)
- Current step: light blue background with dark blue 1px border
- Step icons: Lucide React icons (no emojis)
- Footer buttons: "Back" (left with left arrow), "Continue" (right with right arrow)
- Step titles: centered H1 with larger description text

**Status:** ❌ NOT IMPLEMENTED despite being requested in previous sessions

---

### 3. **Business Info Step Should Be Universal**

**Problem:**  
Business Information and Contact steps are only shown to business accounts, but individual appraisers also need to provide this information.

**Correct Approach:**
- Business Info step appears for BOTH account types
- Fields include:
  - Business Name (optional for individuals)
  - Business Type (dropdown)
  - EIN (optional)
  - Year Established (optional)
  - Primary Email (required)
  - Primary Phone (required)
  - Business Address with city autocomplete
  - Website (optional)
- Remove: Fax field (deprecated)
- Combine: Business Info + Contact into ONE step

**Rationale:**  
Even individual appraisers operate as businesses. Banks need consistent contact information regardless of account type.

---

### 4. **Coverage Area Inconsistency**

**Problem:**  
Coverage area selection is completely different between individual and business flows. Individual flow has a map + ZIP codes, business flow has different UI.

**Correct Approach:**
- **Remove:** ZIP codes field entirely
- **Remove:** Interactive map (can be archived for future toggle feature)
- **Implement:** Unified state → county selection for BOTH flows
- **UX Pattern:**
  - Multi-select dropdown for states
  - For each selected state, show accordion with searchable county list
  - "Select All" and "Clear All" bulk actions per state
  - No free-text entry for counties

**Conceptual Model:**
- Coverage is declared at business/profile level
- Execution happens at appraiser level
- System should support both without creating separate experiences

**Status:** ✅ PARTIALLY IMPLEMENTED (Jan 21 update shows unified coverage, but needs verification it's in both flows)

---

### 5. **Specialties Need Two-Level Taxonomy**

**Problem:**  
Current specialty selection only shows high-level categories (Commercial, Multi-Family, etc.) without sub-specialties.

**Required Implementation:**
- Parent specialties shown as cards with checkboxes
- When parent selected, conditionally show sub-specialties
- Sub-specialties: search and multi-select (could be 80+ items)
- **Anti-Pattern Prevention:** If user selects all sub-specialties, show warning:
  - "Wow! We see you've selected 80+ specialties. Are you really a specialist in all of these?"
  - Explain that over-selection reduces match quality
  - Tone: Corrective, not punitive (system acting surprised)

**Example Sub-Specialties:**
- Commercial → Office Buildings, Shopping Centers, Restaurants, Bars, Bowling Alleys, Funeral Homes, Marinas
- Multi-Family → Affordable Housing, Apartments, Quad, Duplex, etc.

**Why This Matters:**  
Specialty matching is critical for bank-vendor pairing. High-level categories alone are insufficient.

**Status:** ❌ NOT IMPLEMENTED

---

### 6. **Missing: Bank Invite Experience**

**Problem:**  
No experience exists for when a bank invites an appraiser to join Vendor Circle.

**Required Flow:**
1. Appraiser receives email from bank
2. Email contains link to "Accept Invite" page
3. Page shows:
   - Bank logo (prominently)
   - Vendor Circle logo
   - Message: "Bank A is inviting you to receive and manage bids on Vendor Circle"
   - Options: "Log In" or "Create Account"
4. After login/signup, user completes onboarding

**Why This Matters:**  
Without bank branding and context, appraisers don't understand why they're receiving the invite and may delete it as spam.

**Status:** ❌ NOT IMPLEMENTED

---

### 7. **Missing: Team Member Invite Flow**

**Problem:**  
Business admins have no way to invite team members to complete their own onboarding.

**Required Flow:**
1. Business admin adds team member email during onboarding
2. System sends invite email to team member
3. Team member receives link to complete their own appraiser profile
4. Team member uploads their own documentation
5. Admin can see completion status in dashboard

**Why This Matters:**  
Forcing admins to upload all documentation for all appraisers during initial onboarding creates massive friction. Deferring to post-onboarding "Get Started" steps improves completion rates.

**Status:** ❌ NOT IMPLEMENTED

---

### 8. **Dashboard Purpose Misalignment**

**Problem:**  
Dashboard is not yet the primary reason users would log into Vendor Circle daily.

**Current State:**  
Shows metrics like turnaround time, bid acceptance rate, ratings, etc. This is good but incomplete.

**Missing Elements:**
- **Ranking/Percentile:** "You're in the top 10% of appraisers in your region"
- **Peer Comparison:** Compare performance to similar-sized businesses
- **Engagement Hooks:** Reasons to visit daily beyond checking metrics
- **Community Foundation:** Rankings set up future community features

**Strategic Goal:**  
Dashboard should make users feel competitive and want to improve their standing. This drives adoption of AI Review Forms and other premium features.

**Status:** ⚠️ PARTIALLY IMPLEMENTED (metrics exist, but no ranking/comparison)

---

### 9. **Invites vs. Bids Ambiguity**

**Problem:**  
Unclear distinction between:
- Invitations to join a bank's preferred vendor list
- Day-to-day bid invitations for specific appraisal jobs

**Current Implementation:**  
"Invites" page shows bank invitations to connect, separate from "My Work" bids.

**Feedback from Ed/Jeff:**
- Everyday bidding is the biggest engagement driver
- Current email-based bidding UX is simple and works well
- Question: Should bidding be part of Vendor Circle V1?

**Decision:**  
- Bidding is **NOT V1 scope**
- Bidding is **V2 feature**
- Reserve space in IA for future bidding experience
- Focus V1 on credential management and bank connections

**Status:** ✅ CORRECTLY SCOPED (bidding deferred to V2)

---

### 10. **Documents/Credentials IA**

**Problem:**  
Documents are shown at account level, but they should be at appraiser profile level.

**Correct Model:**
- Documents belong to individual appraiser profiles
- Admins can upload documents on behalf of appraisers
- Self-managed uploads also supported
- License expiration reminders are useful
- **Do NOT implement:** Automated state license verification (out of scope)

**Current State:**  
Documents page exists but may not properly separate by appraiser profile.

**Status:** ⚠️ NEEDS VERIFICATION (unclear if documents are properly scoped to profiles)

---

### 11. **Branding & Trust Signals**

**Problem:**  
Auth pages don't show "Powered by Realwired" branding.

**Required:**
- Add "Powered by Realwired" to login/signup pages
- Show bank logos prominently on invite acceptance pages
- Vendor Circle should stand alone as a product but maintain brand association

**Why This Matters:**  
Appraisers need to trust the platform. Seeing Realwired/UConnect branding establishes legitimacy.

**Status:** ⚠️ PARTIALLY IMPLEMENTED (may exist in app but not on auth pages)

---

## Design Feedback Details

### Onboarding / Welcome Screen

**Current:**  
Separate "Welcome" and "Let's Get You Setup" screens.

**Required:**  
Combine into one screen that:
- Shows bank logo (if coming from bank invite)
- Explains benefits of Vendor Circle
- Lists what user will need (documents, licenses, etc.)
- Estimates time to complete (10 minutes)
- Emphasizes value proposition: "Update once, notify all banks"

**Rationale:**  
Reduce drop-off by setting expectations upfront.

---

### Onboarding / Account Type Selection

**Current:**  
Two radio options: "Individual Appraiser" vs "Business/Office Manager"

**Feedback:**  
- Use description text for radio options (currently missing)
- Add tooltip explaining that business owners can also be appraisers

**Status:** ⚠️ NEEDS IMPROVEMENT (descriptions exist but could be clearer)

---

### Onboarding / Contact Step

**Current:**  
Separate contact step with multiple fields.

**Required Changes:**
- Merge with Business Info (one step)
- Remove Fax field
- Remove "Business Email" (use primary email)
- Add dropdowns for State, Business Type
- Add city autocomplete (state-dependent)

**Status:** ✅ PARTIALLY DONE (city autocomplete added Jan 21, but merge not complete)

---

### Onboarding / Coverage Step

**Current:**  
Map-based selection with ZIP codes and county text input.

**Required:**  
- State multi-select dropdown
- County accordion per selected state
- Search within counties
- "Select All" / "Clear All" per state
- Remove ZIP codes
- Remove map (archive for future)

**Status:** ✅ IMPLEMENTED (Jan 21 update confirms unified coverage step)

---

### Onboarding / Specialties Step

**Current:**  
Grid of specialty cards (Commercial, Residential, Multi-Family, etc.)

**Required:**
- Keep parent specialty cards
- Add checkboxes to cards (currently missing)
- When parent selected, show conditional sub-specialty search/multi-select
- Warning if user selects all sub-specialties
- Designations should be multi-select dropdown

**Status:** ❌ NOT IMPLEMENTED (sub-specialties missing)

---

## Technical Decisions

### Frontend Technology

**Decision:** Next.js/Tailwind frontend becomes production UI

**Context:**  
Val's work is 75-80% production-ready code. Jason's PHP version looks dated and doesn't match the modern UX. Ed confirmed Jason will convert backend to APIs and the Next.js frontend will be the official UI.

**Implications:**
- No need to rebuild UI in PHP
- Focus shifts to API design and integration
- Frontend work should continue to completion

---

### Backend Strategy

**Current:** Jason has PHP-based backend with basic CRUD

**Plan:**
1. Jason converts existing logic to REST APIs
2. Frontend connects to APIs
3. No need to replicate UI in PHP

**Timeline:**  
Ed wants to deliver mid-February to end-February.

---

## What's Working Well

### ✅ Strengths of Current Design

1. **Visual Design Quality**  
   - Modern, professional UI
   - Exceeds competitor RIMS
   - Dark mode support throughout

2. **Dashboard Metrics**  
   - Good foundation for performance tracking
   - Turnaround time, bid acceptance, ratings
   - Team performance for business accounts

3. **Mobile Experience**  
   - Separate `/m/*` routes with native feel
   - 100% feature parity with desktop

4. **Null States**  
   - 17 null states for first-time users
   - Guided tours available

5. **Coverage Step (Post Jan 21 Update)**  
   - Unified state → county selection
   - Performance optimized
   - Good UX patterns (accordion, search, bulk actions)

6. **City Autocomplete**  
   - State-dependent city selection
   - Allows free-text for unlisted cities
   - Keyboard navigation support

---

## Action Items Summary

### 🔴 Critical (Must Fix Before V1)

1. **Unified Onboarding Flow**
   - Merge individual and business flows into one experience
   - Single entry point with optional organization context
   - Consistent steps regardless of account type

2. **Onboarding Stepper UI**
   - Implement Specretary pattern (full-width header/footer, sidebar styling)
   - Remove progress bar
   - Update button styling and positioning

3. **Business Info Universalization**
   - Show Business Info step to ALL users (individual + business)
   - Merge Contact step into Business Info
   - Remove Fax, remove Business Email

4. **Specialties Two-Level Taxonomy**
   - Implement sub-specialty selection
   - Add "select all" warning
   - Make designations multi-select

5. **Bank Invite Experience**
   - Create accept invite page with bank branding
   - Show bank logo + Vendor Circle logo
   - Login or create account options

6. **Team Member Invite Flow**
   - Email-based invite system
   - Team members complete own onboarding
   - Admin sees completion status

7. **Documents IA**
   - Ensure documents are scoped to appraiser profiles
   - Support admin-managed and self-managed uploads

### 🟡 Important (Should Have for V1)

8. **Dashboard Enhancements**
   - Add ranking/percentile metrics
   - Peer comparison features
   - Engagement hooks for daily login

9. **Branding on Auth Pages**
   - Add "Powered by Realwired" to login/signup
   - Ensure consistent branding throughout

10. **Coverage Verification**
    - Confirm unified coverage step is in BOTH flows
    - Test state → county selection thoroughly

### 🟢 Nice to Have (V2 or Polish)

11. **Map Toggle for Coverage**
    - Optional map view alongside dropdown
    - Use archived map component

12. **Community Features**
    - Ranking system
    - Peer comparison
    - Professional networking (LinkedIn-style, not Facebook)

13. **Bidding Experience**
    - Day-to-day bid management
    - Bid acceptance/rejection
    - Bid history and tracking

---

## Quotes & Key Insights

### On the Core Problem

**Ed Kruger:**
> "The problem that is slightly complex is the vendor that's a small business that's got five or six vendors reporting into a business that is bidding for banks."

> "The bank's policy typically approves the appraiser, not the firm. So if you've got an appraisal firm, let's say there's five appraisers, you may have one guy or girl that's the approved appraiser for that bank."

### On Coverage Complexity

**Ed Kruger:**
> "Sometimes, I don't know if our system can do it based on, hey, you're allowed to appraise houses within a three-mile radius of your office."

**Jeff McCall:**
> "Generally speaking, it's probably five to 15 counties [per appraiser]."

### On Specialties

**Jeff McCall:**
> "If you clicked on commercial and I've got 30 different specialties within commercial, most appraisers click all, like select all. And that's what we want to discourage because it's unlikely that I would be capable but not competent to appraise every single commercial property there is."

### On Dashboard & Engagement

**Ed Kruger:**
> "I need these guys to use AI Review Forms. And the way you do auto review is because now that number suddenly matters because I want to be number one. You know, I don't want to be in the top 50%."

> "If I have the dashboard, a reason for you to have this open on your desktop day-to-day. If you don't have the dashboard, you only have communication, you're just going to rely on being in your inbox."

### On Timeline

**Ed Kruger:**
> "If we want to roll out, let's say, mid-Feb, you know, end-of-Feb, what do we need to start delivering to the team to finish?"

---

## Next Steps

### Immediate (This Week)

1. **Cody & Val:** Align on unified onboarding flow architecture
2. **Val:** Implement Specretary stepper pattern
3. **Val:** Merge Business Info + Contact into one step
4. **Val:** Verify coverage step is in both flows
5. **Cody:** Design two-level specialty taxonomy

### Short-Term (Next 2 Weeks)

6. **Val:** Implement sub-specialty selection with warning
7. **Val:** Create bank invite acceptance page
8. **Val:** Build team member invite flow
9. **Val:** Add "Powered by Realwired" to auth pages
10. **Cody:** Design dashboard ranking/percentile features

### Before Backend Integration

11. **Val:** Complete all critical UX fixes
12. **Cody & Ed:** Final design review
13. **Jason:** Begin API development
14. **Val:** Document API requirements for frontend integration

---

## Open Questions

1. **Coverage Radius:** Do we need to support radius-based coverage (3-mile radius from office)? Or is state → county sufficient for V1?
   - **Answer Needed From:** Sunda/Jason (check current system capabilities)

2. **License Verification:** Should system validate licenses against state databases?
   - **Decision:** No, out of scope for V1

3. **Bidding in V1?** Is bidding part of V1 or V2?
   - **Decision:** V2 scope, not V1

4. **SSO:** Will users have SSO from UConnect, or is this a separate login?
   - **Answer:** Separate login (no SSO in V1)

5. **Existing Data Migration:** How do we migrate existing UConnect vendors to Vendor Circle?
   - **Answer Needed From:** Jason/Ed

---

## Alignment with Previous Feedback

### From Jan 13 Meeting (Cody's Notes)

**Onboarding Stepper:**  
✅ Requested Specretary pattern → ❌ Still not implemented

**Business Info Universal:**  
✅ Requested for both flows → ⚠️ Partially done, needs merge

**Coverage Consistency:**  
✅ Requested unified experience → ✅ Implemented Jan 21

**Specialties Sub-Categories:**  
✅ Requested two-level taxonomy → ❌ Not implemented

**Bank Invite Experience:**  
✅ Identified as missing → ❌ Not implemented

**Team Invite Flow:**  
✅ Identified as missing → ❌ Not implemented

### Conclusion

**Progress:** Significant frontend work completed, but fundamental UX architecture issues remain unresolved.

**Blocker:** Unified account model is still not achieved despite multiple discussions.

**Path Forward:** Focus on critical fixes (unified flow, specialties, invite experiences) before backend integration begins.

**Timeline Risk:** Mid-Feb delivery is at risk if critical UX issues aren't resolved this week.

---

**Document Created:** January 21, 2026  
**Author:** AI Assistant (processed from raw transcript)  
**Status:** Ready for Review
