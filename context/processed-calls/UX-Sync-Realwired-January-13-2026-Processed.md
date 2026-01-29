# UX Sync | Realwired - January 13, 2026 - PROCESSED

**Date:** January 13, 2026  
**Recording:** https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM (37 mins)  
**Attendees:** Ed Kruger (Realwired), Cody Miles (Brand Cave), Val Vinnakota (Brand Cave)  
**Type:** Client Feedback Session - Phase 1 Redesign Review  

---

## EXECUTIVE SUMMARY

Critical pivot in onboarding and account architecture. **Remove account type distinction** between individual and business - make single unified experience. Replace guided tours with "Get Started" dashboard sections. Simplify onboarding flow with welcome screen. Major dashboard restructuring needed to focus on business metrics over team/profile counts.

**Key Decision:** Users and Profiles should be unified - all users are appraisers with varying levels of profile completion.

---

## MAJOR DECISIONS & CLIENT FEEDBACK

### 1. **REMOVE ACCOUNT TYPE SELECTION** ⚠️ CRITICAL CHANGE
**Decision Maker:** Ed Kruger (validated by Cody)  
**Timestamp:** 4:34 - 5:15  

**Ed's Feedback:**
> "Yeah, this just seems like friction. Yeah. Yeah, this just feels like now, Sonia, I have to decide I'm a one-man business. Does that mean I'm a desk? No."

**Cody's Position:**
> "I am not convinced there needs to be any form of a concept of account type. I think it could just be the same account serves everyone. And whether or not you add more than one appraiser profile is kind of up to you."

**Implication:** 
- Single unified account experience for all users
- Individual vs Business distinction removed from signup
- User adds appraiser profiles as needed (1 or many)
- Drastically simplifies onboarding architecture

---

### 2. **ONBOARDING FLOW RESTRUCTURE** ⚠️ CRITICAL CHANGE
**Decision Maker:** Ed Kruger (with Cody validation)  
**Timestamp:** 6:16 - 9:49  

#### **Ed's Requirements:**
- **ADD Welcome Screen** with:
  - Celebration/excitement ("So stoked that you are here!")
  - Time commitment ("5 minutes to fill in")
  - Number of questions ("6 different questions")
  - What they'll gain
  - Clear skip option ("You can skip this at any time and come back to it")
  - Get paperwork ready callout
  
**Ed's Key Quote:**
> "First stage is, hey, you know, why can't we be so stoked that you are here? You know, this is going to take you five minutes to fill in. We're going to ask you six different questions. You know, get your paperwork ready after this. You'll be able to explore. Remember, you can skip this at any time and come back to it."

#### **Cody's Follow-Up Approach:**
**Timestamp:** 9:49 - 10:05  
> "And then following completion of this or skipping it, there should be a onboarding section of the dashboard where we kind of see either their profile is incomplete and or they're next steps."

**Design Pattern Reference:** Specretary "Get Started" section

---

### 3. **REMOVE GUIDED TOURS, ADD DASHBOARD "GET STARTED"** ⚠️ CRITICAL CHANGE
**Decision Maker:** Ed Kruger + Cody Miles  
**Timestamp:** 10:30 - 11:52  

**Ed's Concerns:**
> "Yeah. Yeah. I like the, I mean, the guided tour is good... but you just did an onboarding flow, and now you're doing a guided tour. So it's like, again, man, it's maybe too many walls."

**Ed's Alternative:**
> "Once you go through the onboarding page and you hit this first, maybe just do a cool animation, you know, around the, you know, the question mark, just to say, like, hey, something cool is happening here, and have them explore and discover it."

**Cody's Solution:**
**Timestamp:** 11:52  
> "In a world where we add the 'get started' onboarding section, that serves all of the need. And then minimally what you could do is if they go to a page for the first time, you serve an education modal on what the page is, but you don't have to do an in-app product tour."

**New Approach:**
- Remove auto-start guided tours
- Add "Get Started" section on dashboard (Specretary pattern)
- Optional: Page-specific education modals on first visit
- Optional: Subtle animation on help icon to draw attention

---

### 4. **DASHBOARD RESTRUCTURE - FOCUS ON BUSINESS METRICS** ⚠️ CRITICAL CHANGE
**Decision Maker:** Ed Kruger + Cody Miles  
**Timestamp:** 15:39 - 18:03  

#### **Cody's Strategic Insight:**
> "We need to consider that the actual experience that we should be optimizing for is a single user experience where someone could either be a single appraiser or they could be a business admin. What does that dashboard look like then when you're not optimizing for one or the other?"

**Current Problem (Cody):**
> "You're showing appraiser profiles and team members here as counts and metric cards. I don't think that is necessary even if you're a business admin."

**What Should Be Shown Instead (Cody):**
> "What you might start showing is like number of bids, connected banks."

#### **Ed's Enthusiastic Agreement:**
**Timestamp:** 16:22  
> "Now you're talking, now you're talking of, yeah, now you're bringing me back into the, you know, that's for conversation, yeah."

#### **Ed's Specific Requirements:**
**Timestamp:** 17:32 - 17:51  
> "What I want to know is I want a business I'm doing. I don't know how many licenses I'm using... what's late? How long does it take to turn around? Who's stuck? Who should I whack with a stick? You know, who's doing the most work?"

#### **Metrics to Show:**
- **Business Performance Metrics:**
  - Number of bids
  - Turnaround time
  - Who's late/stuck
  - Who's doing most work
  - Aggregate ratings
  - Connected banks
  - License usage/coverage
  
- **Move to Top:** Charts, team performance metrics
- **Remove/Minimize:** Team counts, profile counts (move to settings)
- **Keep:** Activity log

**Ed's Visual Preference:**
**Timestamp:** 17:55 - 18:03  
> "That stuff is great, but, you know, hiding it on the bottom, you know, that's... You're bottom. You're bottom."

**Val's Response:**
> "Thank I'll bring that into the top. I kind of want to introduce some charts as well."

---

### 5. **REMOVE TEAM MESSAGING FEATURE** ⚠️ SCOPE REDUCTION
**Decision Maker:** Ed Kruger + Cody Miles  
**Timestamp:** 20:08 - 22:50  

**Ed's Position:**
> "In the world of themes and slacks and whatever, to duplicate this on a profile, I'm not quite sure if... I'm not trying to build a HR information [system]."

> "It's like a lot of complexity, like to keep alive in the back and then to manage and to maintain for something that..."

**Cody's Agreement:**
> "Your main use case will be like probably the single appraiser. And, you know, I don't know what the percent would be, but even for the business admins, messaging in here just doesn't, I don't see it making sense."

**Ed's Clarification on Communication:**
**Timestamp:** 21:10 - 21:42  
- Vendor-to-bank messaging must go through orders (legal requirement)
- Direct vendor-bank communication is **illegal** (HVCC compliance)
- Cannot contact bank directly to negotiate fees

**Alternative Considered (Cody):**
**Timestamp:** 22:03  
> "I could see... natural language and LLMs and MCP servers. Is there any value where they were able to ask questions about their account or orders... natural language response."

**Ed's Response:**
> "I think you're talking about a lot of the engagement that I do want to drive, but it's not maybe off of version one. For version one, I need to get this up and running."

**Decision:** Remove all messaging features to reduce complexity for v1.

---

### 6. **USERS = PROFILES (CONSOLIDATE ARCHITECTURE)** ⚠️ CRITICAL ARCHITECTURE CHANGE
**Decision Maker:** Ed Kruger (after discussion with Cody)  
**Timestamp:** 24:19 - 25:10  

**Context:** Discussion about separating users from profiles

**Cody's Question:**
> "Users and profiles don't have to be the same thing. I could have just a business admin who's just managing profiles, and the profile doesn't have to be tied to a user. But maybe that's a bad move. Maybe the profile always is another appraiser."

**Ed's Response:**
**Timestamp:** 24:24  
> "A user is always an appraiser."

**Ed's Reasoning:**
**Timestamp:** 25:01 - 25:10  
> "In version one just purely because the only use case I have is do the job. You know, just log in and do the job and, you know, push the appraisal through. So it's hard for me to see anyone else use it."

**Future Consideration:**
> "In a future world where we are suddenly talking about metrics and community, it suddenly makes a little bit more sense. But this future world is not three months away."

**Ed's Directive:**
> "I want to reduce friction to get these guys on board in the easiest way possible. So maybe we should just combine."

**Decision:** Users = Profiles. Every user is an appraiser. Simplifies architecture significantly for v1.

---

### 7. **APPRAISER PROFILE COMPLETION FLOW** ⚠️ IMPORTANT UX DECISION
**Decision Maker:** Ed Kruger (after discussion with Cody)  
**Timestamp:** 26:01 - 29:32  

#### **The Question:** Who completes appraiser profiles?

**Cody's Options:**
> "Do you see that as something the business admin sets on behalf of them or that they can invite it and then they kind of complete their own profile?"

**Ed's Answer:**
> "I can see both happening. I can see like, John, I've created your profile, just log in and follow the flow. And I can see I'm responsible for everybody's licenses and I have all of that information. So let me do it on behalf of them."

#### **Business License Complexity:**
**Ed's Critical Point:**
**Timestamp:** 27:05  
> "Your business profile is your individual appraiser profile. If you've got one appraiser that's an appraiser in Atlanta, like that's the capability of your business. Your business needs, it doesn't have its own license. The individuals have licenses. It's just contracted through the business. And so it bubbles up."

#### **Cody's Proposed Solution:**
**Timestamp:** 27:05 - 27:41  
- **Onboarding fork:** Ask if admin is also an appraiser
- **If Yes:** Complete their profile + option to add other users
- **If No:** Just business setup + add users later

#### **Ed's Onboarding Concern:**
**Timestamp:** 27:41 - 28:48  
> "It would be really frustrating for me when I'm setting up an account and I want to complete this profile, but now I have to load every, you know, 10 people that's working for me."

**Ed's Preferred Flow:**
> "Can I just upload the licenses, tick the boxes, you know, get the state approval, and then the business is operational, but then the person who does the job or gets it assigned to, you know, or whatever that flow is, you know, I can add on later?"

#### **Cody's Solution:**
**Timestamp:** 28:48 - 29:32  
- **Option 1:** Upload license, parse info, auto-add user (complex)
- **Option 2:** Minimum inputs (name, email, role) in onboarding
  - User accepts invite, completes own profile
  - "Get Started" section shows incomplete profiles
  - Gamify completion

**Ed's Business Workflow:**
**Timestamp:** 29:32 - 30:40  
- Business bids on jobs (aggregate capability)
- Business wins job
- Business routes to appropriate licensed appraiser
- Appraiser responds as officer of business
- All communication from "Company X" not individual

**Key Insight:** Business operational capability (licenses) can exist before individual user profiles are complete.

---

### 8. **NAVIGATION INFORMATION ARCHITECTURE** 📝 IMPORTANT
**Decision Maker:** Cody Miles  
**Timestamp:** 18:22 - 19:15  

**Cody's Direction:**
> "From your main nav being a left sidebar nav, I would put your main actions that we want for the user dashboard or reporting or whatever, you know, profile management, messages, invites, which is obviously a missing item at the top of your nav. But then bottom of the nav, you can separate, you know, the two sections. Like you have all your settings, like team and business settings. So like the menu items that are going to be less frequently used, we put at the bottom of the main nav."

**Pattern Reference:** Specretary navigation structure

**Top Nav (Frequent Actions):**
- Dashboard
- Bids/Reports
- Invites (currently missing!)
- Profile Management

**Bottom Nav (Settings/Less Frequent):**
- Team
- Business Settings
- Other settings

---

### 9. **AUTH PAGES DESIGN PATTERN** 📝 DESIGN CHANGE
**Decision Maker:** Cody Miles  
**Source:** Cody's meeting notes

**Current:** Simple centered card layout
**Requested:** Split-pane pattern similar to Alchemyca

**Design Reference:** Alchemyca-auth-pattern-split-screen.png
- Left pane: Form content (login/signup)
- Right pane: Hero image/visual
- More engaging, modern feel

---

### 10. **ONBOARDING VISUAL PATTERNS** 📝 DESIGN CHANGES
**Decision Maker:** Cody Miles  
**Source:** Cody's meeting notes + Specretary references

#### **Changes to Current Vendor Circle Onboarding:**

1. **Progress Indicator**
   - Current: "Previous / 5/6 / Next" button pattern
   - Change to: Specretary-style sidebar step indicator
   - Shows all steps, current step highlighted
   - Completed steps show checkmark

2. **Remove "Skip for Now" Buttons**
   - Change to: Single "Skip" option (if needed)
   - Reduce multiple skip points

3. **Remove Step Descriptions Under Headers**
   - Current: "Contact - How to reach you"
   - Change to: Just "Contact" (cleaner)

4. **Navigation Controls**
   - Current: Centered "Previous / Next" with page count
   - Change to: Back/Continue buttons (left/right aligned)
   - Specretary pattern

5. **Add Confetti After Completion**
   - Celebration moment
   - Positive reinforcement

#### **Team Setup Simplification:**
- Remove "Select Team Size" dropdown
- Use repeater pattern (add as many as needed)
- Reference: SynkedUP budget builder pattern
- Show: Name, Email, Role inputs
- "+ Add Another" button

---

### 11. **VENDOR CIRCLE / UCONNECT INTEGRATION** ⚠️ NEEDS CLARIFICATION
**Decision Maker:** Ed Kruger (Action needed)  
**Timestamp:** 33:51 - 35:29  

**Val's Question:**
> "Is that an extra tab or a section within Uconnect or do they have a separate page for the vendor circle?"

**Ed's Response:**
> "That's a great question, Val. Well, we need to probably spend some time with Jeff on this... let me get him on a call and we can just sort it out."

**Bank-Side Features Needed:**
- Vendor selection
- Distribution view (map)
- Filter vendors
- View scorecards
- Manage vendor lists

**Action Item:** Ed to schedule call with Jeff to clarify Vendor Circle/Uconnect integration architecture.

---

### 12. **VENDOR SCORECARDS & AI REVIEWS** 📝 FEATURE REQUEST
**Decision Maker:** Ed Kruger  
**Timestamp:** 35:29 - 36:26  

**Val's Request:**
> "I haven't seen the AI reviews, how they really look. I know we go through that on Scrum every time, but I haven't really seen what it looks like. If I could get a glimpse of it, I'll have an idea how I could model that over here."

**Ed's Scorecard Context:**
> "You would rate that individual report, and you would rate the vendor, because the vendor selection... if you get a job, and you select, you know, you want this job to be appraised... we'll already know what location it is, so we can filter some of that list, but then what you kind of want to do is you want to present that list in... from high to low. Based on some of the score code criteria."

**Action Item:** Ed to share AI reviews examples with Val for design reference.

---

### 13. **STATE/LICENSE MAP VISUALIZATION** 📝 NEW FEATURE
**Decision Maker:** Ed Kruger (enthusiastic approval)  
**Timestamp:** 32:59 - 33:17  

**Val's Proposal:**
> "For the admin themselves, just wanted to see like what is the vendor circle distribution is like, so that real-wide would have better metrics on what their distribution is like."

**Ed's Response:**
> "This is great. And even if you kind of select your license, maybe you select your state and then it makes it a little bit easier for you to do the sub-selection. So I think this is a lot of value."

**Val's Additional Insight:**
> "We could use something like this, a map in the business admin as well... they would know what kind of vendors they have in their company that can work in Texas."

**Feature:** Interactive US map showing license/coverage distribution
- Admin view: All vendors by state
- Business view: Their team's coverage by state
- Color-coded by license count or coverage density

---

## VAL'S PROMISES & COMMITMENTS

### Immediate Changes (Confirmed During Call):
1. ✅ Move business metrics to top of dashboard (18:03)
2. ✅ Add charts to dashboard (18:14)
3. ✅ Will look at Specretary patterns for navigation (19:15)

### Post-Meeting Work (Referenced in Cody's Notes):
1. 📋 Redesign auth pages with split-pane pattern
2. 📋 Add welcome screen to onboarding flow
3. 📋 Remove account type selection
4. 📋 Implement Specretary-style onboarding controls
5. 📋 Remove guided tour auto-start
6. 📋 Add "Get Started" dashboard section
7. 📋 Restructure dashboard metrics
8. 📋 Remove team messaging feature
9. 📋 Add Invites to main navigation
10. 📋 Simplify team setup in onboarding

---

## CODY'S DESIGN DIRECTION & NOTES

### From Meeting Notes Document:

#### **Big Idea:**
> "The appraiser / business admin experience should be the same experience"

> "Combine Team and Appraiser Profiles ← all appraiser profiles will be a user"
> - When I add a user, if I select them as appraiser, I need to complete all values
> - Business Admin can add details and/or just invite the user
> - User can complete their own profile

#### **Design Pattern Sources:**
- **Specretary** - Primary reference for:
  - Navigation structure
  - Onboarding flow controls
  - "Get Started" section pattern
  - Settings placement

- **Alchemyca** - Reference for:
  - Auth page split-pane design

- **SynkedUP** - Reference for:
  - Budget builder repeater pattern
  - First-time modals (ask Esther)

#### **Specific Changes from Cody's Notes:**

**Auth Pages:**
- Don't love current pattern
- Use Alchemyca split-pane pattern

**Onboarding:**
- Add intro screen (time, gain, requirements)
- Remove "Skip for Now" buttons
- Remove step descriptions
- Show confetti after completion
- Fork based on "are you an appraiser?" question
- Minimum inputs when adding users

**Dashboard:**
- Add account completion section if onboarding incomplete
- Add "Get Started" section (Specretary pattern)
- Show incomplete profiles
- Metric cards: Total Bids, Turnaround Time, Business Rating
- Completion Rate at top
- Don't need team overview
- Keep activity log

**General:**
- Remove in-app product tours
- Instead: First-time modals per page
- Settings at bottom of main nav
- Remove Messages feature
- Add Invites feature (currently missing!)

---

## ACTION ITEMS

### For Val (Design):
- [ ] **CRITICAL:** Remove account type selection flow
- [ ] **CRITICAL:** Add welcome screen to onboarding (specs in Ed's quote)
- [ ] **CRITICAL:** Restructure dashboard - metrics at top, charts added
- [ ] **CRITICAL:** Remove guided tours, design "Get Started" dashboard section
- [ ] **CRITICAL:** Design unified single-user experience (not individual vs business)
- [ ] Redesign auth pages with split-pane Alchemyca pattern
- [ ] Redesign onboarding controls to match Specretary
- [ ] Remove team messaging feature entirely
- [ ] Add Invites to main navigation
- [ ] Simplify team setup (remove size selector, use repeater)
- [ ] Add state/license map visualization
- [ ] Add confetti celebration after onboarding completion
- [ ] Wait for AI reviews examples from Ed to design scorecard UI
- [ ] Reorganize navigation: main actions top, settings bottom

### For Ed:
- [ ] Schedule call with Jeff to clarify Vendor Circle/Uconnect integration
- [ ] Share AI reviews examples with Val

### For Team Discussion:
- [ ] Define minimum viable inputs for user invitation
- [ ] Clarify business operational requirements (licenses vs user profiles)
- [ ] Define "Get Started" section tasks and priority
- [ ] Determine first-time modal content for each page

---

## DESIGN REFERENCES PROVIDED

### Specretary Screenshots:
1. `app.specretary.com_workspaces-onboarding-steps-1.png` - Sidebar progress, step 1
2. `app.specretary.com_workspaces-onboarding-steps-2.png` - Team selection, repeater
3. `app.specretary.com_workspaces-onboarding-steps-3.png` - Add employee form
4. `app.specretary.com_workspaces-onboarding-steps-5-role-fork.png` - Fork question pattern
5. `app.specretary.com_workspaces-get-started-1.png` - Initial modal with goals
6. `app.specretary.com_workspaces-get-started-2.png` - Educational modal (step 1 of 4)
7. `app.specretary.com_workspaces-get-started-3.png` - Educational modal (step 2)
8. `app.specretary.com_workspaces-get-started-4.png` - Educational modal (step 3)
9. `app.specretary.com_workspaces-get-started-5.png` - Educational modal (step 4)
10. `app.specretary.com_workspaces-get-started-6.png` - Final recommendations
11. `app.specretary.com_workspaces-get-started-landing.png` - Dashboard "Get Started" section

### Alchemyca Screenshot:
1. `Alchemyca-auth-pattern-split-screen.png` - Split-pane login design

### Current Vendor Circle Screenshots (For Comparison):
1. `auth-screen-vendor-circle.png` - Current email verification screen
2. `navigation-controls-vendor-circle.png` - Current Previous/Next pattern
3. `account-setup-steps-vendor-circle.png` - Current sidebar progress
4. `extra-skip-button-vendor-circle.png` - Skip button to remove
5. `onboarding-header-description-vendor-circle.png` - Description to remove
6. `guided-tour-prompt-vendor-circle.png` - Tour modal to replace
7. `team-setup-step-vendor-circle.png` - Team size selector to remove

---

## KEY INSIGHTS & STRATEGIC NOTES

### User Psychology (Ed's Expertise):
1. **Reduce Friction:** Multiple walls create abandonment
2. **Paywalls Feel Bad:** Don't force-complete before seeing value
3. **Older Demographic:** "All white guys, you know, they don't use a computer to do this"
4. **Email-First Users:** Not tech-forward, use email primarily
5. **Need Quick Wins:** Show value before asking for full commitment

### Version 1 Priorities (Ed's Direction):
1. **Get people on platform** (Cold start problem)
2. **Enable basic workflow** (Bid, accept, complete)
3. **Reduce complexity** (No advanced features like messaging)
4. **Show insights** (Dashboards, clarity on rates, flow)
5. **Simplicity & less friction** over feature richness

### Future Vision (Phase 2+):
1. Community features
2. Advanced messaging/collaboration
3. More complex metrics
4. Enhanced AI features
5. Natural language account queries (LLM/MCP)

### Legal Constraints:
- Vendors cannot directly contact banks (except through orders)
- Communication must go through appraisal management system
- HVCC compliance required

---

## MEETING TONE & DYNAMICS

**Ed:** Collaborative, decisive, focused on user friction, experienced with product design, pragmatic about v1 scope

**Cody:** Strategic thinker, experience-driven design, good at pattern recognition, validates with Ed before committing

**Val:** Receptive to feedback, quick to adapt, asks clarifying questions, showing progress

**Overall:** Productive session with clear decisions made. Ed provided specific, actionable feedback. Team aligned on direction forward.

---

**Document Created:** January 20, 2026  
**Processed By:** AI Assistant (Claude)  
**Source Material:** 
- Raw transcript: UX-Sync-Realwired-January-13-2025.md
- Cody's notes: Jan-13-2026-meeting-notes-cody.md
- Design references: 18 screenshots in jan-13-2026-meeting-notes-screenshots/

**Next Steps:** Val to implement design changes; Team to schedule Jeff call for Uconnect integration clarity.
