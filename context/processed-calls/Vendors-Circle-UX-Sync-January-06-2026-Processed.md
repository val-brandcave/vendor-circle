# Vendors Circle UX Sync - January 6, 2026 (Processed)

**Date:** January 6, 2026  
**Duration:** 35 minutes  
**Attendees:** Ed (Realwired CEO), Val Vinnakota (Brand Cave), Cody Miles (Brand Cave)  
**Recording:** https://fathom.video/share/iGcB_PCzRTR1m9pYahAWVisbG7Uxy3Pn

---

## Executive Summary

This sync session presented the Phase 1 redesign to Ed and gathered critical feedback that significantly impacts the project scope. The meeting revealed a **major architectural requirement**: support for multi-user businesses (e.g., appraisal offices with multiple appraisers). Ed emphasized the current goal is **parity** with competitor RIMS 360, followed by phased community/engagement features.

### Key Decisions Made:
1. ✅ **Logo/Branding**: Ed approved Val creating custom Vendors Circle logo (no existing brand)
2. ⚠️ **CRITICAL**: Must support multi-user business model (offices with multiple appraisers)
3. ✅ **Parity First**: Replace as-is functionality, then evolve to community features (Phase 2)
4. ✅ **Add Onboarding**: First-time user setup flow required
5. ✅ **Add Sign-Up**: Vendors can register without invitation

---

## Meeting Flow & Detailed Notes

### Opening & Context (0:00 - 12:29)

**Val's Presentation Setup:**
- Showcased two user flows: Vendor and Admin
- Clarified naming: "Vendor Circle" internally, "UConnect Circle" externally
- **Logo Discussion:**
  - Ed confirmed: No existing logo, completely unlaunched product
  - Product referred to as "Circle" internally
  - **Decision**: Ed requested Val create custom logo/identity
  - **Action**: Val to create couple of logo options (time-boxed)

**Quote - Ed (12:00):**
> "The clients haven't seen it, you know, it's a completely unlaunched product, you know, so I think we've just been talking, you know, around it as Circle, we don't have a logo, you know, we don't have an identity associated with it, so I'm very happy if you would help us to create it. So, absolutely."

---

### Vendor Experience Walkthrough (12:29 - 18:58)

**Val Demonstrated:**

1. **My Requests Page** (Landing)
   - Tabbed table view (Bids/Reports)
   - Filters: Bank, Status
   - Clear functionality
   - **Val's Question**: "Are you interested in more than redesign? Maybe metrics, visuals (pie charts for bid conversion)?"
   - **Ed's Response**: "Yeah, absolutely" *(but see context below)*

2. **My Invites**
   - Stacked invite list
   - Shows: Bank sender, scope, contact, address
   - Actions: Accept (send thanks) or Decline (with reason)

3. **My Documents** (renamed from "Licenses")
   - Three tabs: Credentials, License, Insurance
   - **Credentials**: W9 (edit/delete with confirmation), Resume, Sample Reports (max 4, with titles)
   - **State Licenses**: Table view with expiry notifications, CRUD operations
   - **Coverage/Insurance**: Multiple document types, modal-based upload with dynamic fields for MSAs, etc.

4. **Profile**
   - Avatar upload
   - Email addresses, contact numbers, password management
   - **Addresses**: List with primary designation, edit capabilities
   - **Coverage Areas**: Pill-based display by state/county, add new states
   - **Specialties**: Add/edit specialties
   - **Professional Designations**: Card-based display with CRUD
   - **Connected Banks**: Tiles with logo, connection date, departments, view profile/disconnect actions

5. **Dark/Light Mode**: Demonstrated theme toggle

---

### CRITICAL DISCUSSION: Multi-User Business Model (18:58)

**Ed's Major Concern:**

**Quote - Ed (18:58):**
> "How are you dealing with businesses? So, for example, let's say I'm an appraisal office, right? And I've got six people that work for me, right? And so how do we navigate that complexity? Because I was thinking when you were uploading the license and then you had the person associated with, like, where he is and what he does and, you know, what states he works in. And, you know, something that jumped to me is just your information hierarchy is from the profile perspective and making that very individualistic, you know, but, like, you might be part of an office and that office might serve as an area, you know, and that's kind of like some of the complexity that we have to deal with."

**Impact:**
- Current design assumes individual vendors
- **Reality**: Many vendors are offices with 6+ appraisers
- Information hierarchy needs to support:
  - Individual appraiser profiles (licenses, specialties, coverage)
  - Office/business entity (company info, collective coverage)
  - Administrative users managing multiple appraiser profiles

---

### Strategic Context: Parity & Phased Approach (13:23 - 14:45)

**Ed's Strategic Vision:**

**Quote - Ed (13:23):**
> "So I think like a big thing for us here is the product development in this product that's been done very poorly. So there's definitely this idea of like a, you know, a phased implementation where, you know, right now I just need to hit parity. So parity means that I've got a customer like our biggest competitor called RIMS. They've got a product called 360. And they do this, you know, this vendors, vendors, you know, bidding solicitation side is something that they have, you know, well offered. And then what they provide their customers are like, listen, you have one profile and RIMS and, you know, you can do all of the selection, you know, through that one profile."

**Parity Requirements:**
- Competitor: RIMS 360
- Need: One profile for all bank interactions
- Vendor selection/bidding/solicitation functionality

**Future Vision (Post-Parity):**
> "We definitely want to get into that space. We believe the best approach to do that is via community, you know, like start the facilitation and engagement between these two parties, know, bring in, have people, you know, give them a reason to use this and then make this a tool for them to be successful."

**Phased Approach:**
1. **Phase 1 (Current)**: Parity - Replace as-is, launch
2. **Phase 2**: Community/engagement features
3. **Phase 3**: Advanced success tools

**Ed's Question (14:45):**
> "My question just to you is what would be the best way that we could do this in a way where we see this is where we are right now. We just want to replace the as-is and launch. And then we want to figure out like how do we evolve into, you know, this secondary and this third goal that we have."

**Val's Response:**
- Agreed to walk through what's built
- Will address how to phase evolution

---

## Cody's Meeting Notes - Action Items

**From Cody's Jan 6, 2026 Meeting Notes:**

### Logo/Branding
- ✅ Create a couple logo options
- ⚠️ **Time-box this**: Don't create too many options

### **BIG CHANGE: Multi-User Business Support**
- ⚠️ **CRITICAL REQUIREMENT**
- Support businesses with multiple appraisers
- **Pattern Needed**: Talk to Cody about implementation pattern
- Must support **multiple profiles** per business
- Need administrative person role
- **ALSO** support single vendor experience
- **Key Distinction**: Users ≠ Appraiser Profiles
  - Users: Login accounts, permissions
  - Profiles: Appraiser credentials, licenses, specialties
  - Profiles should be managed separately from users

### User Management (NEW FEATURE)
- Add user management capabilities
- Users are not the same as appraiser profiles
- Profiles managed separate from users

### Phase 2 Example Features (Future)
- **AI Review per Vendor Basis**: Show AI feedback for individual vendor
- **AI Review Across All Banks**: Aggregate AI feedback
- Reference transcript ~32 minutes for Ed's description of possibilities

### Onboarding Flow (NEW FEATURE)
- **First-time user setup** flow required
- Should be full-page modal stepper
- **Reference**: Specretary creation flow (first-time-setup-modal-reference.png)
- Guide users through complete account/profile setup
- Account setup all the way through

### Sign-Up Flow (NEW FEATURE)
- **Vendors can sign up without invitation**
- Still supports multiple profiles for multiple appraisers
- Self-service registration

### Message Threads (NEW FEATURE)
- Message threads for orders should be available in this app
- Part of parity requirements

### General UI/UX Improvements

**Null States:**
- ✅ Make sure you have null states on everything

**Skeleton Loading:**
- ✅ Add skeleton loading to all views

**Table Filters:**
- ⚠️ **Pattern Change Required**
- Current: Inline filters
- **New Pattern**: Modal-based (like Specretary)
- Action opens modal with filter configuration (specretary-table-filters-modal.png)
- Then use pill row like current design

**Modals:**
- ⚠️ **All modals must have:**
  - Max height
  - Sticky header
  - Sticky footer
  - Content scrolls on Y overflow
- **Reference**: Should NOT look like modal-feedback-1.png (content cut off)

**Top Bar:**
- ⚠️ Make header title text smaller (header-title-feedback-1.png)
- Current: "My Invites" with large font
- Reduce font size

**Requests Page:**
- ✅ Accepting a request doesn't need a text area
- Simplify accept action

**My Documents:**
- ⚠️ **Sample Reports Remaining Display**
- Current: "Sample Reports (3 of 4)"
- **New Pattern**: Show "N" in a badge + "remaining" label next to it
- Example: Badge with "1" + text "remaining"
- Reference: sample-reports-remaining-feedback-1.png

### Admin Side

**Scorecards (NEW FEATURE):**
- ⚠️ Allow admin to do scorecards
- **Note**: This functionality already exists (in old system)
- Need to surface in new UI

---

## Strategic Context

### Current Goal: PARITY

**Ed's Statement:**
> "Right now I just need to hit parity."

**What Parity Means:**
- Match competitor RIMS 360 functionality
- One profile for vendor interactions across banks
- Vendor selection/bidding/solicitation
- **Replace as-is and launch**

### Post-Parity Evolution

**Phase 2 Goals:**
- Community features
- Engagement/facilitation between vendors and banks
- Give vendors tools for success
- **Feedback mechanism**: Give vendors feedback after order or in general

**Ed's Note on Phasing:**
> "What could be the best way to do this to replace the as-is, and then evolve the secondary"

---

## Questions & Clarifications Needed

### From Transcript:
1. **Multi-User Business Model**:
   - What's the administrative hierarchy?
   - How do permissions work?
   - Can individual appraisers have their own logins?
   - How do bank connections work at office vs. individual level?

2. **Metrics & Enhancements**:
   - Val asked about metrics/charts
   - Ed said "absolutely" but in context of parity discussion
   - **Clarify**: Are these Phase 1 or Phase 2?

3. **AI Review Feature**:
   - Transcript mentions ~32 minutes for details
   - **Need**: Full transcript to capture Ed's description

### From Cody's Notes:
4. **Pattern Discussion**:
   - "Talk to Cody about a pattern for this" (multi-user)
   - **Action**: Val and Cody need design session

5. **Message Threads**:
   - Which orders?
   - What level of messaging? (vendor-bank, vendor-vendor?)

6. **Scorecards**:
   - What does "already exists" mean?
   - Need specs for current scorecard functionality

---

## Immediate Next Steps

### CRITICAL PATH ITEMS:

1. **Multi-User Architecture Decision**
   - [ ] Val + Cody design session
   - [ ] Define user vs. profile data model
   - [ ] Create multi-profile management UX pattern
   - [ ] Determine administrative permissions structure

2. **Scope Clarification with Ed/Jason**
   - [ ] Confirm metrics/charts: Phase 1 or 2?
   - [ ] Get complete AI review requirements (~32 min transcript)
   - [ ] Understand scorecard functionality details
   - [ ] Clarify message thread requirements

3. **New Feature Design (Phase 1)**
   - [ ] Onboarding flow (modal stepper pattern)
   - [ ] Sign-up flow (without invitation)
   - [ ] User management interface
   - [ ] Message threads UI

4. **UI/UX Refinements**
   - [ ] Update all modals (max height, sticky header/footer)
   - [ ] Change table filters to modal pattern
   - [ ] Reduce header title font size
   - [ ] Update sample reports remaining display
   - [ ] Add null states everywhere
   - [ ] Add skeleton loading states

5. **Logo Design**
   - [ ] Create 2-3 logo concepts
   - [ ] Time-boxed effort
   - [ ] Present to Ed for selection

6. **Admin Features**
   - [ ] Research existing scorecard functionality
   - [ ] Design scorecard UI for new app

---

## Phase Redefinition Required

### Current Phase 1 (Pre-Meeting):
- Vendor: My Requests, My Invites, My Documents, Profile
- Admin: Vendors List, Specialties, Vendor Detail
- Basic CRUD, modern UI

### Revised Phase 1 (Post-Meeting):
**Must Include:**
- Everything above PLUS:
- Multi-user business support
- User management
- Onboarding flow
- Sign-up flow (without invitation)
- Message threads
- Admin scorecards
- All UI/UX refinements from feedback

**Moved to Phase 2:**
- Metrics/dashboards (pie charts, conversion tracking)
- AI review features (per vendor, across banks)
- Community features
- Feedback mechanisms (vendor-to-bank feedback)
- Kudos system
- Performance metrics

---

## Risk Assessment

### High Risk:
1. **Multi-User Architecture**: Significant design and development effort
2. **Scope Creep**: Adding features while maintaining "parity" goal
3. **Timeline Impact**: New requirements will extend Phase 1 delivery

### Medium Risk:
1. **Pattern Consistency**: New Specretary patterns need integration
2. **Data Model Changes**: User vs. Profile separation affects all pages
3. **Admin Scorecards**: Unknown complexity (existing functionality)

### Low Risk:
1. **UI/UX Refinements**: Straightforward improvements
2. **Logo Design**: Time-boxed, manageable
3. **Null States/Loading**: Standard patterns

---

## Success Criteria (Updated)

### Phase 1 Launch Criteria:
- ✅ Parity with RIMS 360 core functionality
- ✅ Support both single vendors AND multi-user businesses
- ✅ User management with proper permissions
- ✅ Self-service sign-up (with and without invitation)
- ✅ Complete onboarding flow for new users
- ✅ Message threads for order communication
- ✅ Admin scorecards functional
- ✅ All UI/UX feedback implemented
- ✅ Custom logo and branding
- ✅ Null states and loading states throughout
- ✅ Modal patterns consistent with Specretary

### Phase 2 Goals (Future):
- Community engagement features
- AI review and feedback systems
- Performance metrics and dashboards
- Vendor-bank feedback mechanisms

---

## Quotes Library

**Ed on Logo/Branding (12:00):**
> "The clients haven't seen it, you know, it's a completely unlaunched product, you know, so I think we've just been talking, you know, around it as Circle, we don't have a logo, you know, we don't have an identity associated with it, so I'm very happy if you would help us to create it."

**Ed on Multi-User Complexity (18:58):**
> "How are you dealing with businesses? So, for example, let's say I'm an appraisal office, right? And I've got six people that work for me, right? And so how do we navigate that complexity?"

**Ed on Parity & Phased Approach (13:23):**
> "Right now I just need to hit parity. So parity means that I've got a customer like our biggest competitor called RIMS. They've got a product called 360."

**Ed on Future Vision (14:00):**
> "We definitely want to get into that space. We believe the best approach to do that is via community, you know, like start the facilitation and engagement between these two parties."

**Ed's Strategic Question (14:45):**
> "What would be the best way that we could do this in a way where we see this is where we are right now. We just want to replace the as-is and launch. And then we want to figure out like how do we evolve into, you know, this secondary and this third goal that we have."

---

## Action Items Summary

### Val's Actions:
- [ ] Create 2-3 logo concepts (time-boxed)
- [ ] Design session with Cody for multi-user pattern
- [ ] Update all modal designs (max height, sticky elements)
- [ ] Redesign table filters (modal pattern)
- [ ] Create onboarding flow mockups
- [ ] Create sign-up flow mockups
- [ ] Design user management interface
- [ ] Design message threads UI
- [ ] Update header typography (smaller)
- [ ] Update sample reports display
- [ ] Add null states to all views
- [ ] Add skeleton loading states
- [ ] Simplify invite acceptance (remove textarea)

### Cody's Actions:
- [ ] Design pattern session with Val (multi-user architecture)
- [ ] Clarify metrics/charts scope with Ed
- [ ] Get full transcript details (~32 min AI review discussion)
- [ ] Research existing scorecard functionality with Jason
- [ ] Define message thread requirements with Ed/Jason

### Team Actions:
- [ ] Update PRDs with new Phase 1 requirements
- [ ] Redefine Phase 1 vs. Phase 2 scope
- [ ] Update project timeline based on expanded scope
- [ ] Schedule follow-up with Ed to confirm updated scope

---

**Document Status:** DRAFT - Pending complete transcript and clarifications  
**Next Review:** After Cody-Val design session on multi-user pattern  
**Last Updated:** January 7, 2026
