# Design Tasks & Changes - January 13, 2026 Meeting
## Comprehensive Action Plan from Client Feedback

**Date:** January 20, 2026  
**Based On:** Jan 13, 2026 UX Sync Meeting with Ed Kruger  
**Priority Levels:** 🔴 Critical | 🟡 High | 🟢 Medium | 🔵 Low  
**Status:** Ready for Implementation  

---

## 📋 TABLE OF CONTENTS

1. [Critical Architecture Changes](#critical-architecture-changes)
2. [Onboarding Flow Overhaul](#onboarding-flow-overhaul)
3. [Dashboard Restructuring](#dashboard-restructuring)
4. [Navigation & Information Architecture](#navigation--information-architecture)
5. [Auth Pages Redesign](#auth-pages-redesign)
6. [Feature Removals](#feature-removals)
7. [New Features to Add](#new-features-to-add)
8. [Visual & UX Polish](#visual--ux-polish)
9. [Questions & Clarifications Needed](#questions--clarifications-needed)

---

## 🔴 CRITICAL ARCHITECTURE CHANGES

These are fundamental changes to the product structure that affect multiple areas.

### 1. Remove Account Type Distinction 🔴
**Status:** Not Started  
**Impact:** High - Affects entire signup and user flow  
**Design References:** None needed (removal)  

**What Needs to Change:**
- ❌ Remove `/account-type` page entirely
- ❌ Remove "Individual Appraiser" vs "Appraisal Office" selection
- ✅ Create single unified account creation flow
- ✅ All users get same base account
- ✅ Users add appraiser profiles as needed (1 to many)

**Why:**
- Ed: "This just seems like friction"
- Cody: "Not convinced there needs to be any form of account type concept"
- Simplifies mental model: Everyone is a user, they may have 1+ appraiser profiles

**Design Considerations:**
- How do we handle first-time setup without asking "are you individual or business?"
- Answer: Ask during onboarding "Are you an appraiser?" to fork the flow
- If yes → complete their profile + option to add team
- If no → just business setup

---

### 2. Users = Profiles (Consolidate Architecture) 🔴
**Status:** Not Started  
**Impact:** Critical - Changes data model and UI architecture  
**Decision:** Ed's directive from meeting  

**What This Means:**
- Every user IS an appraiser profile
- No concept of "user without profile"
- No concept of "profile without user"
- Business admin is just a user who manages other users/profiles

**UI Changes Needed:**
- Combine Team and Appraiser Profiles management
- When adding user, collect profile information
- Profile completion becomes user profile completion
- Remove separate "create profile" flow (it's part of add user)

**Business Logic:**
- User creation = Profile creation
- User invite = Profile invite
- Profile incomplete = User profile incomplete

**Benefits:**
- Simpler architecture
- Less cognitive load
- Faster onboarding
- Matches Ed's v1 use case: "Just log in and do the job"

---

### 3. Single Unified Dashboard Experience 🔴
**Status:** Partially Started  
**Impact:** High - Requires dashboard redesign  
**Client Feedback:** Cody + Ed strong alignment  

**Problem Statement (Cody):**
> "We need to optimize for is a single user experience where someone could either be a single appraiser or they could be a business admin. What does that dashboard look like when you're not optimizing for one or the other?"

**Current Issues:**
- Dashboard shows "Team Accounts: 7" and "Appraiser Profiles: 5"
- These metrics aren't valuable even to business admins
- Feels like settings, not business intelligence

**Solution:**
- Single dashboard serves all users
- Metrics focus on business performance, not structure
- If user has team, show team performance (not team counts)
- If user is solo, show their performance
- Same layout, data adapts to user context

---

## 🟡 ONBOARDING FLOW OVERHAUL

Complete redesign of the onboarding experience.

### 4. Add Welcome Screen (First Step) 🟡
**Status:** Not Started  
**Impact:** Medium - New screen to design  
**Design Reference:** Specretary get-started-1.png pattern  
**Client Quote:** Ed's specific requirements  

**Required Elements:**
1. **Celebration Message**
   - "We're so stoked that you are here!"
   - Welcoming, enthusiastic tone
   - Make user feel valued

2. **Time Commitment**
   - "This is going to take you 5 minutes to fill in"
   - Set clear expectations
   - Reduces anxiety

3. **Number of Questions**
   - "We're going to ask you 6 different questions"
   - Or whatever the actual count is
   - Transparency builds trust

4. **What They'll Gain**
   - "After this, you'll be able to explore..."
   - Benefits-focused
   - Motivation to complete

5. **Paperwork Callout**
   - "Get your paperwork ready"
   - Helps them prepare
   - Reduces mid-flow abandonment

6. **Skip Option**
   - "Remember, you can skip this at any time and come back to it"
   - Reduces pressure
   - Option to explore first

**Design Layout:**
- Split modal or full-screen
- Consider image on right (Specretary pattern)
- "Let's Go" or "Get Started" CTA button
- "Skip" option (subtle, bottom left)

**Copy Tone:**
- Enthusiastic but not over the top
- Professional but friendly
- Clear and concise

---

### 5. Update Onboarding Visual Controls 🟡
**Status:** Partially Complete  
**Impact:** Medium - Visual redesign of existing flow  
**Design Reference:** Specretary onboarding screenshots  

**Changes Needed:**

#### A. Progress Sidebar (Left Side)
**Current:** Basic step list  
**Change To:** Specretary-style sidebar
- Numbered steps with icons
- Current step highlighted (orange/brand color)
- Completed steps show checkmark
- Upcoming steps grayed out
- Shows step title + subtitle if needed

**Visual Example:** See `app.specretary.com_workspaces-onboarding-steps-1.png`

#### B. Bottom Navigation
**Current:** Centered "Previous" and "Next" with step count (5/6)  
**Change To:** Specretary-style navigation
- "Back" button (left aligned, ghost style)
- "Continue" button (right aligned, primary CTA)
- Remove step count from buttons (it's in sidebar)

**Visual Example:** See bottom of Specretary onboarding screenshots

#### C. Remove Extra "Skip" Buttons
**Current:** Multiple skip options throughout  
**Change To:** 
- Single skip option on welcome screen
- Maybe subtle skip in top-right corner
- Remove all "Skip for Now" buttons on individual steps

**Why:** Too many walls, creates friction (Ed's feedback)

#### D. Remove Step Descriptions
**Current:** "Contact - How to reach you"  
**Change To:** Just "Contact"

**Design Reference:** See `onboarding-header-description-vendor-circle.png` (what to remove)

**Why:** Cleaner, less cluttered, title is self-explanatory

---

### 6. Add Onboarding Fork: "Are You an Appraiser?" 🟡
**Status:** Not Started  
**Impact:** High - Creates two onboarding paths  
**Design Reference:** `app.specretary.com_workspaces-onboarding-steps-5-role-fork.png`  

**When:** After basic business info (if applicable) or early in flow

**Question Screen:**
- Title: "Are you an appraiser?"
- Subtitle: "This helps us customize your setup"
- Two large button options:
  - "Yes, I'm an appraiser" → Complete profile path
  - "No, I'm admin only" → Business-only path

**Path A: Yes, I'm an Appraiser**
- Collect their profile information
- License, coverage, specialties, etc.
- Then option to add team members
- Classic single-user-who-grows path

**Path B: No, I'm Admin Only**
- Business information only
- Add team members (who are appraisers)
- Simpler admin path

**Design Pattern:**
- Big visual distinction between choices
- Maybe icons (person with badge vs. person with clipboard)
- Clear consequences of choice

---

### 7. Simplify Team Setup - Remove Dropdowns, Add Repeater 🟡
**Status:** Not Started  
**Impact:** Medium - Better UX for team addition  
**Design Reference:** Specretary steps 2-3 + SynkedUP budget builder  
**Cody's Note:** "Look at SynkedUP's budget builder for repeater pattern"

**Current Problems:**
- "Select Team Size" dropdown - artificial limit
- "How many appraiser profiles?" - confusing with new architecture

**New Pattern:**
- Remove "Select Team Size" entirely
- Show: "Add your team members"
- Default: One empty input set (Name, Email, Role)
- "+ Add Another Team Member" button below
- Can add as many as needed
- No predetermined limit (except subscription tier)

**Input Fields Per Team Member:**
- Name (required)
- Email (required)
- Role dropdown (Admin, Appraiser, etc.)
- Maybe: Phone (optional)

**Visual Example:** See `app.specretary.com_workspaces-onboarding-steps-2.png` and `-3.png`

**Benefits:**
- Flexible, not restrictive
- Clear what you're adding
- Easy to add more
- No artificial cognitive load ("how many do I have?")

---

### 8. Add Confetti Celebration on Completion 🟢
**Status:** Not Started  
**Impact:** Low - Polish/delight moment  
**Design Reference:** Common pattern, can use library  

**When:** Immediately after clicking "Complete" on final onboarding step

**Implementation:**
- Confetti animation (2-3 seconds)
- Success message: "You're all set!" or "Welcome to Vendors Circle!"
- Then redirect to dashboard

**Libraries to Consider:**
- canvas-confetti (lightweight)
- react-confetti (if already using)

**Why:** Positive reinforcement, celebration moment, makes completion feel rewarding

---

## 🔴 DASHBOARD RESTRUCTURING

Critical changes to make dashboard actually useful for business users.

### 9. Move Key Business Metrics to Top 🔴
**Status:** Not Started  
**Impact:** Critical - Core business value  
**Client Feedback:** Ed emphatic, Val committed  

**Current Problem:**
- Team/profile counts at top
- Performance metrics hidden at bottom
- Ed: "You're bottom. You're bottom."

**New Structure:**

#### **Top Section: Business Performance**
Priority metrics that answer Ed's questions:
- "How many licenses am I using?"
- "What's late?"
- "How long does it take to turn around?"
- "Who's stuck?"
- "Who should I whack with a stick?"
- "Who's doing the most work?"

**Specific Metric Cards to Show:**
1. **Total Bids** - Active bids count + trend
2. **Turnaround Time** - Average days + comparison
3. **Completion Rate** - % of jobs completed on time
4. **Business Rating** - Aggregate vendor rating from banks
5. **Connected Banks** - Number of active bank relationships
6. **License Coverage** - States/areas covered
7. **Late Items** - Number of overdue jobs (warning state)
8. **Top Performer** - Who's doing most volume

**Visual Design:**
- Grid layout (2x4 or 3x3)
- Each card: Large number, label, trend indicator
- Use color: green (good), yellow (warning), red (urgent)
- Hover for more detail

#### **Middle Section: Charts** (New!)
**Val mentioned:** "I want to introduce some charts"

**Chart Ideas:**
- Turnaround time trend (last 30 days)
- Bid volume by week
- Team performance comparison
- License utilization by state

**Design:**
- 1-2 larger chart cards
- Clean, simple visualizations
- Use brand colors

#### **Activity Log** (Keep, Move Down)
- Recent team activity
- Job updates
- Status changes

**What Moves to Settings:**
- Team member count (just show count in nav or settings)
- Profile completion (settings concern)
- Subscription tier (settings concern)

---

### 10. Add "Get Started" Dashboard Section 🔴
**Status:** Not Started  
**Impact:** Critical - Replaces guided tour  
**Design Reference:** `app.specretary.com_workspaces-get-started-landing.png`  

**Purpose:** 
- Show incomplete setup tasks
- Guide new users without forcing them
- Gamify completion
- Replace guided tour concept

**Location:** 
- Top of dashboard (if any tasks incomplete)
- Collapsible section
- Dismissible once complete

**Design Pattern (from Specretary):**

#### **Header Card: "Your Next Step"**
- Prominent card with image on right
- Shows current priority task
- Example: "Build Your First Profile"
- Step indicator: "Step 1 of 3"
- Estimated time: "5 minutes"
- Primary CTA button: "Complete Profile"

#### **Upcoming Steps (Expandable)**
- "2 remaining" text with expand arrow
- Shows list of remaining tasks:
  - Icon + Task name + Time estimate
  - Example: "Add Team Members - 3 minutes"
  - Example: "Set Coverage Areas - 2 minutes"

**Tasks to Track:**
1. Complete your appraiser profile (if applicable)
2. Add team members (if business admin)
3. Set coverage areas
4. Upload license documents
5. Connect bank account (if needed for payments)
6. Set notification preferences

**Completion Logic:**
- As tasks complete, check them off
- Show progress: "3 of 5 completed - 60%"
- When all done: Replace with success message
- "All Set! You're ready to start bidding."
- Option to dismiss permanently

**Visual Design:**
- Warm, welcoming colors (orange/yellow accents)
- Clear hierarchy
- Images make it less intimidating
- Progress indicators throughout

---

### 11. Show Incomplete Profiles in Get Started Section 🟡
**Status:** Not Started (Depends on #10)  
**Impact:** Medium - Helps complete setup  
**Cody's Direction:** Gamify profile completion  

**Context:** If business admin adds team members but they haven't completed profiles

**Display:**
- Section: "Incomplete Profiles"
- List: Each team member with incomplete profile
  - Name, email
  - Completion percentage
  - "Remind" button (sends email)
  - "Complete for them" button (admin can fill in)

**Why:** 
- Business may need to be operational before all profiles complete
- Gives visibility to what's pending
- Provides actions (remind or complete)

---

## 🟡 NAVIGATION & INFORMATION ARCHITECTURE

Changes to sidebar navigation structure.

### 12. Reorganize Sidebar Navigation 🟡
**Status:** Not Started  
**Impact:** Medium - Better organization  
**Cody's Direction:** Specretary pattern  

**Current Structure:** Everything in one list

**New Structure:**

#### **Top Section (Frequent Actions):**
- 🏠 Dashboard
- 📊 Bids (or My Requests)
- 📝 Reports
- ✉️ **Invites** ← **CURRENTLY MISSING!**
- 👤 My Profile / Profiles (context-dependent)

#### **Divider Line**

#### **Bottom Section (Settings/Less Frequent):**
- 👥 Team (if applicable)
- 🏢 Business Settings
- ⚙️ Account Settings
- 🔔 Notifications (or in top nav, design decision)
- ❓ Help & Support

**Visual Design:**
- Clear visual separation (border, spacing, or subtle bg change)
- Bottom section can be slightly muted color
- Icons for all items
- Active state clearly highlighted

**Design Reference:** 
- Specretary navigation structure
- See any Specretary screenshot for nav example

---

### 13. Add Invites to Main Navigation 🔴
**Status:** Not Started  
**Impact:** High - Currently missing feature  
**Cody's Note:** "Invites, which is obviously a missing item"  

**What's Missing:**
- Invites page/section doesn't exist in current nav
- User can't see pending invitations from banks
- Critical for vendor workflow

**What to Add:**
- "Invites" nav item in top section
- Badge count showing pending invites
- Page shows all invitations to bid on jobs
- Can accept/decline from here

**Design Needs:**
- Icon: envelope or inbox icon
- Badge: small red circle with number (if pending)
- Page: table or card layout of invitations
- Filters: by bank, by date, by status

---

## 🟡 AUTH PAGES REDESIGN

Visual redesign of login and signup pages.

### 14. Implement Split-Pane Auth Pattern 🟡
**Status:** Not Started  
**Impact:** Medium - Visual polish, better first impression  
**Design Reference:** `Alchemyca-auth-pattern-split-screen.png`  
**Cody's Note:** "I don't love this pattern. Go with pattern more similar to Alchemyca"

**Current Design:** Simple centered card on blank background

**New Design Pattern:**

#### **Layout:**
- 50/50 split (desktop)
- Left pane: Auth form content
- Right pane: Hero image or brand visual

#### **Left Pane - Auth Form:**
- Logo top-left
- Form centered vertically
- Sign in / Sign up toggle
- Social auth options (if applicable)
- Email/password inputs
- "Forgot Password?" link
- Primary CTA button
- Footer: links, copyright

#### **Right Pane - Visual:**
- High-quality image or illustration
- Relevant to appraisal industry
- Could be: Office setting, professional at work, or abstract brand visual
- Slight overlay with brand color
- Maybe testimonial or key value prop

**Mobile Adaptation:**
- Stack vertically
- Image at top (shorter)
- Form below

**Pages to Apply:**
- `/signin`
- `/signup`
- `/verify-email` (maybe simpler version)
- `/forgot-password`

**Visual Considerations:**
- High-quality photography
- Brand colors as overlay/accent
- Professional, trustworthy feel
- Not too corporate, approachable

---

## ❌ FEATURE REMOVALS

Features to completely remove to reduce complexity.

### 15. Remove Guided Tour Auto-Start 🔴
**Status:** Partially Done (Need to remove auto-start)  
**Impact:** High - Changes first-time user experience  
**Client Feedback:** Ed + Cody alignment  

**Why Remove:**
- Ed: "You just did an onboarding flow, and now you're doing a guided tour. So it's like, again, man, it's maybe too many walls."
- Replaced by "Get Started" dashboard section

**What to Keep:**
- Help menu icon (top-right)
- "Take Product Tour" option in help menu (user-initiated)
- Tour itself can stay, just not auto-triggered

**Alternative Approach (Cody Suggested):**
- Subtle animation on help icon after onboarding
- Draws attention without forcing
- User discovers on their own

**What to Remove:**
- Auto-start tour logic
- Modal prompting tour immediately after onboarding
- 2-second delay trigger

---

### 16. Remove Team Messaging Feature Entirely 🔴
**Status:** Need to Remove  
**Impact:** High - Scope reduction, removes complexity  
**Client Decision:** Ed final call, Cody agreed  

**Why Remove:**
- Ed: "In the world of teams and slacks... to duplicate this on a profile, I'm not quite sure"
- Ed: "It's like a lot of complexity to keep alive... for something that [isn't core]"
- Cody: "Your main use case will be single appraiser... even for business admins, messaging doesn't make sense"

**What to Remove:**
- `/messages` page
- Messages nav item
- Message threads
- Message sending/receiving logic
- Notifications related to messages
- Database tables for messages

**Rationale:**
- Users already use email, Slack, Teams
- Adding another messaging system is friction
- Not core to v1 use case
- Legal issues with vendor-bank messaging (must go through orders)

**Future Consideration (Phase 2+):**
- If needed, could add order-specific commenting
- Or natural language AI assistant (Cody's idea)

---

### 17. Remove Multiple "Skip" Buttons 🟡
**Status:** Not Started  
**Impact:** Medium - Cleaner onboarding  
**Cody's Note:** Multiple references to removing skip buttons  

**Current State:** Multiple skip options throughout onboarding

**Change To:**
- Welcome screen: Clear skip option
- Maybe subtle "Skip" in top-right throughout
- Remove all "Skip for Now" buttons on individual steps

**Why:**
- Less decision fatigue
- Cleaner interface
- User knows they can skip from welcome message
- Don't need to remind them every step

---

## ✅ NEW FEATURES TO ADD

New functionality to implement.

### 18. Add State/License Map Visualization 🟡
**Status:** Not Started  
**Impact:** Medium - Valuable feature for admins and businesses  
**Client Feedback:** Ed enthusiastic approval  

**Ed's Response:**
> "This is great. And even if you kind of select your license, maybe you select your state and then it makes it a little bit easier for you to do the sub-selection. So I think this is a lot of value."

**Where to Use:**

#### **Admin Dashboard (Realwired Admin):**
- Shows vendor distribution across US
- Color-coded by density
  - Dark color: Many vendors
  - Light color: Few vendors
  - Gray: No vendors
- Click state → see vendors in that state
- Helps identify coverage gaps

#### **Business Dashboard:**
- Shows team's license coverage
- Which states can we service?
- Color-coded by:
  - Green: Fully licensed
  - Yellow: Some coverage
  - Gray: No coverage
- Click state → see which team members licensed there

#### **Onboarding (License Selection):**
- Visual map for selecting states
- Click states to toggle selection
- Clearer than dropdown or checkbox list
- More engaging interaction

**Implementation Notes:**
- Use SVG map of US
- Interactive, clickable
- Responsive design
- Consider Alaska/Hawaii positioning

**Design Considerations:**
- Keep it simple, not cluttered
- Clear legend
- Tooltip on hover (state name, count)
- Brand color palette

---

### 19. Add Charts to Dashboard 🟡
**Status:** Not Started  
**Impact:** Medium - Enhanced data visualization  
**Val's Commitment:** "I want to introduce some charts as well"  

**Chart Types to Consider:**

#### **1. Turnaround Time Trend**
- Line chart
- Last 30 or 90 days
- Shows if improving or declining
- Benchmark line for target

#### **2. Bid Volume Over Time**
- Bar or area chart
- Weekly or monthly
- Shows business activity trend

#### **3. Team Performance Comparison**
- Horizontal bar chart
- Each team member
- Metric: Jobs completed or turnaround time
- Helps identify top performers and bottlenecks

#### **4. License Utilization**
- Donut or bar chart
- Which states getting most work
- Shows where business is strong

**Design Guidelines:**
- Simple, clean charts
- Brand colors
- Consistent style
- Responsive
- Accessible
- Not too many (2-3 max on dashboard)

**Libraries to Consider:**
- Chart.js (lightweight)
- Recharts (React-friendly)
- D3.js (if complex customization needed)

---

### 20. Add First-Time Page Modals 🟢
**Status:** Not Started  
**Impact:** Low - Optional enhancement  
**Cody's Direction:** Replace guided tour with page-specific modals  

**Concept:** 
- First time user visits a page → show education modal
- Explains what the page is for
- Key features to notice
- Dismiss and never show again

**Example Pages:**
- Dashboard: "Welcome to your dashboard. Here's what each section means..."
- Bids: "This is where you'll see all job invitations..."
- Profile: "Keep your profile up to date..."

**Design Pattern:**
- Simple modal overlay
- Clean design, not intrusive
- Image or screenshot if helpful
- "Got it" or "Let's Go" button
- "Don't show this again" checkbox

**Cody's Note:**
> "If they go to a page for the first time, you serve an education modal on what the page is, but you don't have to do an in-app product tour."

**Ask Esther:** Cody mentioned Esther has examples from SynkedUP

---

## 🎨 VISUAL & UX POLISH

Smaller refinements and improvements.

### 21. Add Subtle Animation on Help Icon 🟢
**Status:** Not Started  
**Impact:** Low - Discoverability enhancement  
**Ed's Suggestion:** Draw attention without forcing  

**When:** After user completes onboarding and lands on dashboard

**Animation Options:**
1. Gentle pulse (1-2 times)
2. Subtle glow effect
3. Bounce once
4. Color shift (gray → brand color → gray)

**Timing:**
- Wait 3-5 seconds after page load
- Animate once or twice
- Stop, don't loop

**Goal:** User notices help is available without being intrusive

---

### 22. Improve Repeater Pattern Visual Design 🟢
**Status:** Not Started  
**Impact:** Low - UX enhancement  
**Reference:** SynkedUP budget builder  

**For:** Team member addition, coverage area addition, etc.

**Design Elements:**
- Clear card or row per item
- "+ Add Another" button prominent but not primary
- Easy to remove items (X icon)
- Drag handles if reordering matters
- Visual distinction between items (subtle borders/shadows)

---

### 23. Clean Up Onboarding Visual Hierarchy 🟢
**Status:** Not Started  
**Impact:** Low - Visual polish  

**Changes:**
- Consistent spacing
- Clear typography hierarchy
- Remove clutter
- Adequate white space
- Focus on one action per step

**Cody's Direction:** Make it feel like Specretary (clean, uncluttered)

---

## ❓ QUESTIONS & CLARIFICATIONS NEEDED

Items that require decisions or more information.

### 24. Vendor Circle / Uconnect Integration Architecture 🔴
**Status:** Awaiting Ed + Jeff Meeting  
**Impact:** High - Affects bank-side design  
**Action Item:** Ed to schedule call with Jeff  

**Questions:**
- Is Vendor Circle a tab in Uconnect?
- Separate page?
- Embedded iframe?
- Shared authentication?
- How do banks access vendor list?
- Where do scorecards live?

**Why Important:** Val needs to design bank-side vendor selection and scorecard UI, but unclear where it lives.

**Val's Question:**
> "Is that an extra tab or a section within Uconnect or do they have a separate page for the vendor circle?"

**Ed's Response:**
> "That's a great question, Val. Well, we need to probably spend some time with Jeff on this."

**Next Steps:**
- Ed schedules call with Jeff
- Val joins to understand integration
- Then design bank-side features

---

### 25. AI Reviews Visual Design 🟡
**Status:** Awaiting Examples from Ed  
**Impact:** Medium - Need reference for scorecard design  
**Action Item:** Ed to share examples  

**Val's Request:**
> "I haven't seen the AI reviews, how they really look. I know we go through that on Scrum every time, but I haven't really seen what it looks like. If I could get a glimpse of it, I'll have an idea how I could model that over here."

**What's Needed:**
- Screenshots of AI review interface
- How reviews are displayed
- Rating system details
- Comment format
- Any categorization

**Then Val Can:**
- Design vendor scorecard UI
- Match patterns to existing AI reviews
- Create consistent experience

---

### 26. Business Operational vs Profile Complete 🟡
**Status:** Needs Discussion  
**Impact:** Medium - Affects onboarding logic  

**Ed's Question:** Can business be "operational" (able to bid on jobs) based on aggregate licenses, even if individual user profiles aren't complete?

**Scenario:**
- Business has 10 licensed appraisers
- Admin uploads all licenses during onboarding
- Business is now "operational" (can bid on jobs in those states)
- Individual appraisers added later or invited to complete profiles
- Jobs get routed to appropriate licensed user

**Design Implications:**
- How do we show "business ready" vs "profiles complete"?
- Two different completion metrics?
- Business completion: License coverage, bank connections
- Profile completion: Individual appraiser details

**Needs:** Product discussion with Cody and Ed to define requirements.

---

### 27. Minimum Viable User Invitation Inputs 🟡
**Status:** Needs Definition  
**Impact:** Medium - Affects onboarding flow  

**Question:** What's the absolute minimum information needed to invite a user?

**Options Discussed:**
1. **Minimal:** Name, Email, Role
   - Fast, low friction
   - User completes profile when they accept
   
2. **Medium:** Name, Email, Role, Phone
   - Slightly more, still reasonable
   
3. **Upload License Parsing (Complex):**
   - Upload license document
   - AI parses information
   - Auto-creates user
   - High friction, complex

**Cody's Preference:** Option 1 (minimal) with gamified profile completion

**Needs:** Final decision on what fields are required vs optional.

---

### 28. Get Started Task List Definition 🟡
**Status:** Needs Definition  
**Impact:** Medium - Affects dashboard logic  

**Questions:**
- What tasks go in "Get Started" section?
- What order/priority?
- What completion criteria?
- How do they differ by user type?

**Suggested Tasks:**
1. Complete your profile
2. Upload license
3. Set coverage areas
4. Add team members (if business)
5. Connect bank account
6. Set notification preferences

**Needs:** Prioritize and define exact criteria for each.

---

### 29. Subscription Tier Limits 🟢
**Status:** Needs Business Rules  
**Impact:** Low - Affects team size limits  

**Question:** If we remove "Select Team Size" dropdown, what are the actual limits?

**Considerations:**
- Free tier: X users
- Pro tier: Y users
- Enterprise: Unlimited?

**UI Behavior:**
- When adding user, show "X of Y seats used"
- If at limit, prompt upgrade
- Or just let them add and bill accordingly?

**Needs:** Business rules from Ed/product team.

---

## 📊 SUMMARY: CHANGES BY CATEGORY

### 🔴 CRITICAL (Must Have):
1. Remove account type selection
2. Users = Profiles architecture
3. Single unified dashboard experience
4. Remove guided tour auto-start
5. Remove team messaging feature
6. Add "Get Started" dashboard section
7. Move business metrics to top of dashboard
8. Add Invites to navigation

### 🟡 HIGH PRIORITY (Should Have):
9. Add welcome screen to onboarding
10. Update onboarding visual controls (Specretary pattern)
11. Add "Are you an appraiser?" fork
12. Simplify team setup (repeater pattern)
13. Reorganize sidebar navigation
14. Implement split-pane auth design
15. Show incomplete profiles in Get Started
16. Remove multiple skip buttons
17. Add state/license map visualization
18. Add charts to dashboard

### 🟢 MEDIUM/NICE TO HAVE:
19. Add confetti celebration
20. Add first-time page modals
21. Add subtle animation on help icon
22. Improve repeater pattern design
23. Clean up onboarding visual hierarchy

### ❓ NEEDS CLARIFICATION:
24. Vendor Circle / Uconnect integration (Ed + Jeff call)
25. AI reviews examples (Ed to share)
26. Business operational vs profile complete logic
27. Minimum viable user invitation inputs
28. Get Started task list definition
29. Subscription tier limits

---

## 📅 SUGGESTED IMPLEMENTATION PHASES

### Phase 1: Critical Architecture (Week 1-2)
- Remove account type selection
- Users = Profiles consolidation
- Dashboard restructure (metrics to top)
- Add "Get Started" section
- Add Invites to nav

### Phase 2: Onboarding Overhaul (Week 2-3)
- Welcome screen
- Specretary-style controls
- Fork for appraiser question
- Team setup repeater
- Remove skip buttons
- Confetti

### Phase 3: Visual Polish (Week 3-4)
- Split-pane auth pages
- Navigation reorganization
- Charts on dashboard
- State/license map

### Phase 4: Fine-Tuning (Week 4+)
- First-time modals
- Help icon animation
- Visual hierarchy cleanup
- Incomplete profile tracking

### Parallel Workstreams:
- Clarification meetings (Ed + Jeff for Uconnect)
- AI reviews examples (waiting on Ed)
- Business rules definitions
- Content writing for welcome/modals

---

## 🎯 MAJOR IMPROVEMENTS SUMMARY

### User Experience Improvements:
1. **Reduced Friction:** Removed account type decision, multiple skips, forced tours
2. **Clearer Path:** Welcome screen sets expectations, Get Started guides completion
3. **Unified Experience:** Same dashboard serves solo and business users
4. **Better Information:** Metrics focus on business value, not structure
5. **Simplified Onboarding:** Cleaner UI, fewer steps, more flexible

### Product Improvements:
1. **Simpler Architecture:** Users = Profiles reduces complexity
2. **Reduced Scope:** Removed messaging reduces maintenance burden
3. **Better Discoverability:** Invites in main nav, help always available
4. **Enhanced Visualization:** Charts and maps make data actionable
5. **Flexible Growth:** Repeater patterns allow users to scale naturally

### Business Value:
1. **Faster Onboarding:** Less friction = higher completion rates
2. **Better Engagement:** Get Started section drives profile completion
3. **Actionable Insights:** Dashboard shows what matters (turnaround, late items)
4. **Professional Polish:** Split-pane auth, Specretary patterns = modern feel
5. **Scalable Foundation:** v1 architecture supports future enhancements

---

## 🚀 NEXT STEPS FOR VAL

### Immediate Actions:
1. ✅ Review this document thoroughly
2. ✅ Ask clarifying questions if anything is unclear
3. ⏳ Await Ed's meeting with Jeff (Uconnect integration)
4. ⏳ Await AI reviews examples from Ed
5. ⏳ Start design work on critical items (Phase 1)

### Design Priorities:
1. **Start with:** Dashboard restructure (biggest impact)
2. **Then:** Welcome screen and onboarding updates
3. **Then:** Get Started section design
4. **Then:** Auth pages and navigation
5. **Then:** Charts and maps

### Documentation:
- Create design specs for each major change
- Update user flows to reflect new architecture
- Create component library for new patterns
- Document design decisions

---

**Document Status:** Ready for Review  
**Created:** January 20, 2026  
**Next Review:** After Val's questions and Ed's additional inputs  
**Living Document:** Will update as implementation progresses  

---

## 💬 VAL'S QUESTIONS & NOTES

[Space for Val to add questions, concerns, or notes during review]

---

**END OF DOCUMENT**
