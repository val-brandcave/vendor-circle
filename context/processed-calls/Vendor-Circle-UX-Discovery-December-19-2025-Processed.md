# Vendor Circle – UX Discovery Call (Processed)
**Date:** December 19, 2025  
**Duration:** 57 minutes  
**Recording:** https://fathom.video/share/q3TxtohkWAiZDbGYPEp6MX8-xeNgVh87

---

## Participants

### Realwired Team
- **Edward Kruger (Ed)** - Product Leadership
- **Jeff Hicks** - Subject Matter Expert (SME), Industry Expert
- **Sunda Scanlon** - Product/Technical Lead
- **Jason** - Development Lead

### Design Team (Brand Cave)
- **Val Vinnakota** - Design Lead
- **Cody Miles** - UX Designer

---

## Executive Summary

This discovery session established the vision, scope, and phased approach for redesigning the Vendors Circle platform. The conversation revealed critical insights about the appraisal industry relationship dynamics and identified a two-phase approach: **Phase 1** focuses on modernizing the UI/UX of existing functionality, while **Phase 2** (future) will introduce community features and feedback mechanisms to transform the traditionally transactional vendor-bank relationship.

### Key Decisions
- **Phase 1 Scope:** Redesign Profile and Licenses pages; improve overall UX of Vendors Circle
- **Phase 1 Timeline:** Q1 2025 launch target
- **Phase 2 Vision:** Community features, feedback loops, gamification elements
- **Core Problem:** Vendors face repetitive credential updates across multiple banks
- **Core Solution:** Centralized profile with one-time updates distributed to all banks

### Critical Insights
- The vendor-bank relationship is "arm's length" - transactional, not collaborative
- Vendors rarely receive positive feedback, only criticism when issues arise
- Calling appraisers "vendors" is "lightly offensive" - they view themselves as professionals
- 50% of submitted appraisals require revisions (industry-wide problem)
- No current mechanism exists for constructive relationship building

---

## Part 1: Project Context & Current State Demo (0:00 - 12:08)

### Background: The Credential Problem
**Presented by:** Sunda Scanlon (5:04 - 10:23)

#### Current Painful Workflow
**The Existing Process:**
1. Vendors support multiple banks
2. Vendors provide appraisal reports
3. Each bank requires up-to-date credentials (licenses, insurance, etc.)
4. Vendors receive email links to bank-specific web forms
5. **Problem:** If a vendor works for 10 banks, they must update the same credentials 10 times

**Sunda's Example:**
> "The issue with that is, is that if you work for 10 of our banks, you'd have to update these same exact credentials 10 different times for 10 different banks."

#### Current Web Form Limitations
- Each bank has custom web forms
- Some require 2FA, some don't
- Vendors can't change core identifiers (name, company) - bank-controlled
- Must upload licenses, insurance, samples for each bank separately
- No centralization or synchronization

### The Vendors Circle Solution

**Core Innovation:** Central server for all vendor credentials
- **Single Entry:** Update credentials once
- **Multi-Bank Distribution:** Changes propagate to all connected banks
- **Bank Control:** Each bank reviews and accepts/rejects changes independently
- **Vendor Privacy:** Banks don't see each other's relationship with vendor

**Sunda's Explanation:**
> "So what we did to resolve that issue is we made a vendor circle, which is a central server, and all of our vendors are going to be in that central server... they service one bank or 10 of our banks, at that point in time, that is going to now be available to them to go in and update their credentials the one time."

### My Requests Page - The Familiar Hub
**Importance:** Vendors are already familiar with this page format from current system

**Current Usage:**
- Vendors bookmark this page
- If serving 10 banks = 10 bookmarked pages
- Each bank's page shows only that bank's work

**New Approach:**
- **One unified My Requests page** in Vendors Circle
- Shows work across ALL banks
- Organized by workflow stage, then by bank
- Preserves familiar mental model

**Workflow Stages** (Critical to preserve):
1. **Bids Needed** - Action required
2. **Bids Submitted** - Waiting for response
3. **Bids Needing Confirmation** - Requires vendor confirmation
4. **Reports in Process** - Active work
5. **Reports Needing Rework** - Revisions requested
6. **Basic Information** - Profile updates

**Why This Matters:**
> "It's very important to keep the workflow stage because if we just had links out there, that would not tell them or give them the proper overview of the actions needed to be taken." - Sunda

**Links Still Go to Bank-Specific Web Forms:**
- Each bank has customized questions
- Web forms remain outside redesign scope (Phase 1)
- Circle provides navigation layer only

### My Invites
**Purpose:** Banks can search Circle and invite new vendors

**Workflow:**
1. Bank finds vendor in search
2. Sends invitation
3. Vendor sees invite in "My Invites"
4. Vendor reviews and accepts/declines
5. If accepted, vendor fills out bank-specific forms
6. Relationship established

**Current State:** Simple line-item display with accept/decline options

### Licenses Page - Credential Central

**What Vendors Upload:**
- **W-9:** Tax documents
- **Sample Work:** Up to 4 samples (matches bank form slots)
- **Resume:** Professional background
- **State Licenses:** By state, with file, number, expiration
- **Insurance Documents:**
  - Errors & Omissions (E&O)
  - General Commercial Liability
  - Auto Liability
- **Master Agreements:** If applicable

**Key Point:** NOT all required - vendors upload what they have
> "None of these things are required to fill in, but it's whatever the vendor chooses to fill in on this in order to be looked at." - Sunda

**Bank Interaction:**
- Banks can accept or reject specific credentials
- Example: Bank may not need Alabama license if vendor doesn't work there
- Banks can request additional specific documentation

### Profile Page

**Core Information:**
- Email addresses (primary, bid coordinator, assistant)
- Personal details (name, company, title, phones, fax)
- Multiple addresses (vendors often have multiple locations)
- **Coverage Areas:** States and counties where vendor operates
- **Specialties:** Types of appraisals (Agricultural, Industrial, Lodging/Hospitality, Office, Single Family, etc.)
- **Banks:** List of banks vendor serves

**Change Approval Flow:**
- Vendors can update anything in Circle
- Banks receive notification of changes
- Banks can reject changes for their local records
- Example: Name change triggers special bank approval process

**Why Banks Can Reject:**
Sunda explains the name change scenario:
> "If they change their last name, the bank may not want the new last name because they have to go through an approval process in order to be able to change something."

**Specialty vs. Designation:**
- Specialties = Generic categories in Circle
- Designations = Bank-specific requirements (handled separately)

### UX Concern Raised
**Sunda's Assessment:**
> "The larger portion of this is that the profile, the way that this is displayed with the screen, you know, kind of so large, the readability or the aesthetic is not what the business was looking for."

**Specific Issues:**
- Coverage areas display: Long county lists not visually appealing
- Profile page: Needs better organization
- Licensing page: Sections need better visual hierarchy
- Overall: Functional but not palatable

---

## Part 2: The Vision - Beyond UI/UX (17:10 - 24:33)

### Ed's Big Picture
**Edward Kruger (17:10 - 18:23)**

**The Tinder Profile Analogy:**
> "You can obviously see like this is the Tinder profile for vendors... And I feel like we want them to spend some time on this page. We want them to kind of like interact and be sticky."

**Vision Beyond Phase 1:**
- Not just an inbox - should feel like a conversation
- Community-driven approach between vendors and banks
- Facilitate faster communication
- Make vendors feel: *"Without this product, they won't be able to have successful communication within the banking space"*

**Future Product Integration:**
Reference to AI Review Forms product rolling out in new year
- Currently serves banks only
- Future: Could serve vendors before submission
- Opt-in review before sending to bank
- Self-correction opportunity
- Reduces revision loops

**Strategic Goal:**
> "If we can drive a little bit more activity from this side, then maybe before they send it, they can opt in to do the review, you know, and then self-direct and then send it back to the bank, minimizing repetitive loops, reducing anxiety." - Ed

---

## Part 3: Understanding the Relationship Dynamic (18:23 - 23:20)

### Jeff's Industry Expertise
**Jeff Hicks - Subject Matter Expert**

#### The Appraisal Industry Relationship Problem

**Current Dynamic (18:46 - 19:19):**
> "The relationship between the two has always been arm's length. So there isn't a great community. It's not hostile or anything, but it's definitely – they want work from the banks. The banks have to review their work, so they get criticized on their work, and the fees are a little bit competitive."

**Key Tensions:**
1. **Vendors want work** from banks
2. **Banks must review critically** for risk management
3. **Fees are competitive** - creates price pressure
4. **Reviews feel nitpicky** to vendors
5. **No positive feedback** mechanisms exist

**The "Vendor" Problem:**
> "Even calling somebody a vendor is lightly offensive. It's not a relationship, right?" - Jeff

**Vendor Reality:**
- Fee appraisers are licensed professionals
- Many have their own companies (Jeff himself is a fee appraiser)
- 50% of revenue comes from bank work
- Yet the term "vendor" feels derogatory
- Want to be viewed as professional partners, not commodity suppliers

#### The Feedback Vacuum (20:05 - 22:05)

**Jeff's Personal Example:**
> "I'm a fee appraiser as well. I still have an appraisal company. Calling me a vendor is lightly offensive... I'll send in my work. I don't know how I'm doing. If I send 10 appraisals to this bank, I don't know if they love my work."

**What Vendors Experience:**
- Submit 10 appraisals
- Hear nothing when work is good
- Only contacted when problems arise
- No kudos, no emoji, no acknowledgment
- **Only feedback = criticism**

**The Emotional Impact:**
> "I don't get any kudos. I don't get like, hey, guess what? You've uploaded the last 10 appraisals... I don't get back a thumbs up, an emoji, just nothing. It's just crickets. The only time I hear back is when they have a problem." - Jeff

**Both Sides Need Each Other:**
- Vendors: 50% of revenue from bank work
- Banks: Need qualified appraisers for loans
- Yet relationship is deteriorating
- Industry-wide issue never addressed

#### The Opportunity (20:59 - 22:05)

**Why This Matters:**
> "Improving that relationship would be fantastic from both sides of the fence. And it's never really been viewed that way. It's never been tried." - Jeff

**Gamification Vision:**
- Professional, light-touch approach
- Encourage communication
- Build relationship without forcing it
- Elevate both fee appraisers and chief appraisers
- Industry elevation, not just transaction processing

**The Challenge:**
> "I don't know how you do it." - Jeff

Finding the right balance between:
- Professional tone
- Meaningful engagement
- Not feeling forced or artificial
- Providing value without creating burden

---

## Part 4: Critical Constraints & Audit Requirements (22:05 - 23:20)

### Sunda's Critical Warning
**Important Boundary (22:05 - 22:21):**

> "Jeff, as long as we know that we can't have communication about a report in here, it's got to stay on the order because audit purposes requires that all information stays there. So we can't have them making the comments about orders in here."

**Regulatory Constraint:**
- ALL order-specific communication must remain in bank system
- Audit trail requirements
- Can't have report discussions in Circle
- This is a hard boundary, not negotiable

**What CAN Happen in Circle:**
- General relationship feedback
- Performance indicators
- Kudos and acknowledgment
- Profile updates
- Credential management
- Non-order-specific communication

### Jeff's Relationship Vision (Within Constraints)

**What's Possible (22:21 - 23:20):**
> "What I'm talking about is if I work with you guys and I did 10 projects for you and I don't know any feedback at all, there's not a relationship there."

**The LinkedIn/Facebook Parallel:**
> "I do think there's a way of engagement, just like the reason we all stare at LinkedIn and Facebook every day. There's an engagement where we want to keep it professional, we're not looking to make this sharing pictures of our kids kind of thing."

**Desired Subtle Engagement:**
- Feel valued as a professional
- General relationship health indicators
- Constructive suggestions:
  - "How's our relationship going?"
  - "Should I change something?"
  - "Should I stop doing something?"
  - "How can I help you?"

**Not About Specific Reports:**
Light, professional community features that improve communication without crossing audit boundaries

---

## Part 5: The Personality Challenge (25:14 - 27:37)

### Understanding the User Personas

**Jeff on Fee Appraisers (25:18 - 25:43):**
> "These are older, typically men that are professional. They're very smart. They're very analytical... they're more of technicians."

**Personality Profile:**
- Analytical, not emotional
- Technicians, not necessarily business-oriented
- Smart and professional
- Older demographic (generally)
- Male-dominated field

**Why Relationship is Difficult (25:43 - 25:52):**
> "The reason the relationship isn't, it's not bad, but it could be a lot better, is because they're a technician. And if I send you, let's say you're my client, I send the report and you critique it, I feel bad. I feel embarrassed."

**Emotional Response to Criticism:**
Even though they're analytical professionals:
- Feel embarrassed by revisions
- May feel mad about criticism
- Take critique personally despite professional demeanor
- Struggle with business-side of relationship

**The Challenge (26:27 - 27:37):**
They desperately want feedback and elevation, but don't know how to ask for it or engage with it constructively.

### Cody's Insight - The Feedback Theory

**Cody Miles (26:27 - 26:54):**
> "Your theory, Jeff, just to make sure I'm following, is you improve the relationship by not just being German and providing feedback only when it's bad feedback, but also providing positive feedback and encouragement."

**The Uber Example (26:45 - 27:37):**

**Jeff's Analogy:**
> "Let's say I'm an Uber driver and I don't have any ratings. I keep picking up people and dropping off people. I have no idea how I'm doing. If I get three, three out of five stars, I know I need room for improvement."

**But Here's the Problem:**
> "If I'm an appraiser and I got the three stars, I might be confused. It might generate maybe questions and unwarranted where the chief appraiser, I don't want to answer these appraisers why I gave them three stars and he thinks they deserve five stars."

**Why Traditional Rating Won't Work:**
- Appraisers might dispute ratings
- Chief appraisers don't want to defend scores
- Creates confrontation, not collaboration
- Appraisers are sensitive despite being technical
- Different interpretations of quality

**The Unique Relationship:**
> "These are, again, these are, I won't say sensitive, might be the wrong word, but it's a unique relationship to where I think if it was just improve the communication a little bit, it would be a lot of it." - Jeff

---

## Part 6: Bank-Side Constraints (27:37 - 29:36)

### The Practical Reality

**Sunda's Reality Check (27:37 - 28:07):**
> "Consider this, sometimes you have an appraisal department that has three reviewers or four job managers and you have a thousand reports that came in that week. You are not going to want to comment or give ratings on each item."

**Operational Constraints:**
- 1,000 reports per week (example)
- 3-4 reviewers/job managers
- **Cannot force feedback on every transaction**
- Bandwidth limitations
- Process burden

**Design Implication:**
Any feedback mechanism must be:
- **Optional, not forced**
- Low friction
- Quick to provide
- Easy to skip
- Value-add, not burden

**Sunda's Guidance:**
> "We're not talking about maybe forcing it, right? For just any giving availability for them that 15 stars or something on that?"

---

## Part 7: Current Feedback Mechanisms (29:36 - 31:22)

### What Exists Today

**Jeff Explains Current State (29:39 - 31:22):**

**Scenario 1: No Issues**
> "Let's say I submit an appraisal to my platform or anybody's platform. I get it, and there's been a review and there's no issues. I get nothing. No email. Just nothing. You either get paid or you don't. That's how you know it was okay."

**Maybe:**
- Generic automated email: "Appraisal review is complete"
- No personal touch
- No acknowledgment of quality
- 20-page report → crickets

**The Emotional Experience:**
> "When you submit reports, you kind of hold your breath going, okay, is it going to come back? Especially if it's a complex appraisal. So you're really just waiting."

**Scenario 2: Issues Found**
> "If you get any feedback whatsoever, it's going to be a reviewer going to say, hey, I've got 10 questions on your appraisal."

**The Revision Process:**
1. Reviewer sends 10 questions
2. Appraiser may disagree with some
3. Back-and-forth occurs
4. Example response: "I disagree with points three and four, but I fixed the typos on questions number one, seven, and nine"
5. Sometimes disagreements escalate
6. Non-cooperative appraisers get removed from approved list

**After Revision:**
> "You send it back. Thanks. That's it."

---

## Part 8: The Revision Process Detail (31:22 - 33:31)

### How Communication Currently Happens

**Cody's Question (31:22 - 31:36):**
> "That's currently happening through the portal currently, right, through the order. So they have to log in to submit that."

**Jeff Confirms (31:42 - 33:13):**
**Chat Window in Current System:**
Banks have chat functionality for order-specific discussion

**Three Appraiser Behaviors:**

1. **Silent Fixers:**
   - Make revisions
   - Upload revised report
   - No comments
   - Forces reviewer to search entire document for changes

2. **Confrontational Communicators:**
   - Disagree in chat
   - Request phone calls or emails
   - Push back on criticism
   - Can become uncooperative

3. **Smart Communicators:**
   > "The smarter appraisers will, at the end, say to expedite your review because you've already read this entire report, let me tell you what I've done. I've changed page 20, 48, 98, and the value... the value went from 10 million to 2.2 million."

**Best Practice Not Universal:**
Many appraisers don't provide change summaries, creating extra work for reviewers.

**Sunda's Confirmation (33:13 - 33:31):**
> "They do have an open communication... It's a chat window that they can go back and forth. And most reviewers just, as Jeff said, just do the review. You do have some reviewers that will go back and if they didn't find any errors, they'll say, hey, great report. Thanks for your business or, you know, whatever. So they do have the ability to do it. They just don't do it."

**Key Insight:** The mechanism exists; the behavior doesn't.

---

## Part 9: Quick Win Ideas & Focus Realignment (33:31 - 34:35)

### Jason's Brainstorm

**Jason (33:31 - 33:55):**
> "When that report comes through and they accept it and move the status inside you connect, what if we showed a five random of a pool of 100 or so, like quick emote responses where they close, they hit one of them, and that is what it could send back. So something easy and quick for the JM, the process."

**Concept:**
- Pool of ~100 positive response templates
- Show 5 random options when accepting report
- One-click selection
- Sends acknowledgment to vendor
- Low friction for reviewers

**Ed's Refocus (33:55 - 34:35):**
> "Team, let's just keep focused. That's the problem. That's the problem of community is one that we want to fix in the near future. Where we are today is just making sure that we find a UI/UX with this."

**Critical Redirect:**
- Lots to unpack
- **Version 1 exists** (current functionality)
- **Version Future** = community features
- Need to separate concerns
- Today's focus = UI/UX improvements

**Ed's Guidance:**
> "I want to leave Cody with that. Like, I think there's a lot for him to unpack and to do. Like, there's a version one, and there's definitely the version of the future that we need to discuss here."

---

## Part 10: Phase 1 Scope Definition (34:35 - 35:43)

### Primary Concerns for Launch

**Sunda's Priority (34:35 - 35:28):**
> "The number one issue right now to be resolved because we're about to be launching this in the first quarter is making the profile more palatable of a page as well as the licensing."

**Phase 1 Focus Areas:**

1. **Profile Page**
   - Currently spread across two columns
   - Needs better layout
   - More "palatable" visual design
   - Improved organization

2. **Licensing Page**
   - Similar layout issues
   - Better section organization
   - Clearer visual hierarchy

3. **My Requests Page**
   - Vendors very familiar with this format
   - Must preserve workflow stage headers
   - Maintains mental model
   - Navigation to web forms (out of scope)

4. **My Invites Page**
   - Simple line display
   - Accept/decline functionality
   - Minimal complexity

**What's NOT Changing in Phase 1:**
- Web forms (bank-specific, custom)
- Core functionality
- Workflow stages
- Data structure

**Jeff's Confirmation (35:24 - 35:28):**
> "Yeah, the UI UX. The layout, the UI UX for the profile and the licenses."

---

## Part 11: Bank-Side Interface Discussion (35:28 - 43:37)

### Bank Administrator Experience

**Sunda Demonstrates Bank Side (35:43 - 40:14)**

**Navigation:** Bank users have "Circle" tab in their UConnect system

### Vendor Search & Preview

**Search Functionality:**
- Search entire Vendors Circle database
- Filter by specialty, location, etc.
- Find vendors they don't currently use
- Invite new vendors

**Preview Modal (Eye Icon):**
- Click eye icon to preview vendor profile
- Shows centralized Circle data
- All licenses visible
- All coverage areas visible
- Same view admins see in Circle

**Sunda's Note:**
> "All that does is just show the profile information of the vendor."

### Vendor Invitation

**Two Invitation Methods:**

1. **From Preview:**
   - View profile
   - Click invite button
   - Vendor receives invitation

2. **From Search List:**
   - Email icon next to vendor
   - Click to invite
   - Generic invitation sent

**Invite Result:**
- Shows in vendor's My Invites
- Vendor fills bank-specific information
- Relationship established

### Pending Invites List

**What Banks See:**
- List of sent invitations
- Vendor names (when service running properly)
- Status: Sent, Accepted, Declined
- Ability to track invitation state

**Note:** During demo, data was blank due to service being down for maintenance

### Vendor Updates Queue

**Critical Feature (39:02 - 40:14):**

**Purpose:**
Credentials update approval system - drastically improved from old process

**Old Process:**
- Go to vendor record
- Click each item
- Validate item
- Move to vendor record
- Repeat for each change

**New Process:**
- All updates appear in queue
- Click item → modal opens
- Can view license files
- Accept or ignore with one click
- Item disappears when processed

**Workflow:**
> "They're able to click on the item, and it pops up a box, and they can actually do the whole thing right there where they can get that license and everything. If they don't want something, they can just click the X and they don't accept that change." - Sunda

---

## Part 12: The Name Change Question (40:14 - 43:06)

### Understanding Data Sovereignty

**Ed's Learning Question (40:14 - 40:47):**
> "Let's say I'm a vendor... What happens when John Smith says, sorry, my name is actually John Casey, and he updates it, they reject it over a year. Does John Smith's surname change in his own system? Like, does it propagate to everybody else?"

**Sunda's Answer (40:47 - 41:26):**
> "So what happens is it would change in vendor circle. And if this specific bank rejected that change in their vendor list, which is different from every other banks and their vendor list, he would not have that update."

**How Name Changes Work:**

1. **Vendor Updates in Circle:**
   - John Smith → John Casey
   - Circle profile updates immediately

2. **Banks Receive Notification:**
   - All connected banks see update in queue
   - Each bank decides independently

3. **Bank Acceptance:**
   - Bank A accepts → John Casey in Bank A's system
   - Bank B rejects → Still John Smith in Bank B's system

4. **Real-World Process:**
   - Name changes (especially marriage) require documentation
   - Banks have compliance processes
   - Often rejected in Circle, handled via formal process
   - Bank requires proof of name change
   - Paperwork submitted separately
   - Bank updates manually after validation

**Jason's Clarification (41:26 - 41:35):**
> "To Ed's question, the answer is yes, though. So all the other banks who receive that update, they have the option to accept or decline as well."

**Sunda's Additional Context (41:35 - 42:08):**
> "Some banks will accept because it's not in their policy to validate. Some banks won't accept the name change, which is why we don't let them change their name right now [in the old system]."

**Three Protected Fields:**
1. First Name
2. Last Name  
3. Company

**Why Company Matters:**
> "Some banks approve companies, not the vendor. So essentially, they would just have to send in a chat to them and say, hey, I need to do a name change, and then the bank will tell them how to validate that."

### Technical Architecture

**Ed's Follow-up (42:08 - 42:38):**
> "What is the unique identifier between us and the backend in the system?"

**Jason's Answer (42:15 - 42:25):**
> "They have a vendor ID in Circle, and there's a bank ID as well... Each bank has their own bank identifier and their own set of IDs. And there's a link, there's linkage that links all that stuff together."

**Data Structure:**
- **Circle Vendor ID:** Unique identifier in Vendors Circle
- **Bank Vendor IDs:** Each bank has own vendor ID system
- **Bank IDs:** Each bank has unique identifier
- **Linkage Table:** Connects Circle vendors to bank vendors
- **Independence:** Banks maintain separate records, optionally sync from Circle

**Ed's Realization (42:38 - 43:06):**
> "So we really have to leave the control in the bank's hands because we can't force upon them."

**Sunda's Confirmation:**
> "Hey, you're taking this name change because they have their own processes and things, but that's only with first name, last name, and company."

**Special Case - Company Changes:**
Example: Appraiser leaves national firm, starts own company
- Bank may not approve independent operation
- Various compliance reasons
- Bank's decision to work with new entity
- Must respect bank autonomy

---

## Part 13: Vendor Visibility & Bank Privacy (43:06 - 43:42)

### What Vendors Can't See

**Cody's Clarification (43:06 - 43:32):**
> "So this isn't really like a rejection flow. Like I see it's written here as just ignore. Like we're just not going to update that record on our side. But in your profile, on the vendor circle side of things, they can update whatever they want."

**Sunda: "Whatever they want."**

**Cody (43:20 - 43:32):**
> "But they don't have any visibility on what the bank has actually accepted or ignored... Just like they don't have any visibility on bank grading or any other comment they put about the vendors."

**Sunda (43:32 - 43:37):**
> "Because that's the bank's information and they don't want them to know."

**Privacy Model:**
- Vendors control Circle profile (their "source of truth")
- Banks control their local vendor records
- No visibility into bank decisions
- No visibility into bank ratings/grades
- No visibility into acceptance/rejection
- Banks maintain proprietary evaluation systems

---

## Part 14: Bank Grading Systems (43:37 - 45:28)

### Understanding Vendor Evaluation

**Cody's Request (43:37 - 43:42):**
> "Can we show the grading by any chance? Is that possible for us to show what grading looks like right now?"

**Ed's Response (43:42 - 43:47):**
> "Yeah, it's different for every single bank."

### Grading Variety

**Sunda's Examples (43:47 - 44:32):**

**Format Variations:**
- Dropdown with A, B, C, D, F
- Word-based: Good, Okay, Bad
- One bank used: "Horrible" (no longer a client)
- Weighted averages
- Numeric scales

**Rating Scale Differences:**
- 1-5 (1 being highest)
- 5-1 (5 being highest)
- A through F
- Words instead of letters/numbers
- Custom labels per bank

**Technical Implementation:**
> "On the back end, it's numbers, and we just switch the numbers and the label to what they want, and then they can put in weighted averages for those grades."

**Sunda's Observation:**
> "And I've not seen any two banks have the same grading scale."

### The Aggregation Problem

**Cody's Question (44:32 - 44:44):**
> "So it's kind of hard, even though you're kind of normalizing it on the back end, you really couldn't take an aggregate across banks because the scale could be just entirely different."

**Sunda: "And the requirements as well."**

### Criteria Differences (44:44 - 45:28)

**Weighting Examples:**
- Bank A: On-time delivery = 50% of grade
- Bank B: On-time delivery = 10% of grade

**Explanation Variations:**
- Banks have different tolerance levels
- Size of bank affects criteria
- Geographic area affects standards
- Regulatory strictness varies
- Bylaws differ per institution

**Approval/Removal Criteria:**
> "Some banks can't even get some people off they don't want on there because they have such strict requirements that they haven't failed X amount of times or whatever else, they still have to continue on the approved list." - Sunda

**Implication:**
Cannot create universal vendor score or rating visible to vendor that aggregates across banks

---

## Part 15: Revision Chat Window Demo (45:42 - 47:49)

### Current Communication Tools

**Sunda Demonstrates (45:52 - 47:49):**

**Chat Windows in System:**

**Multiple Chat Types:**
1. **Lending ↔ Job Manager**
2. **Job Manager ↔ Vendor**
3. **Reviewer ↔ Vendor** (during review stage)

**Chat Features:**
- Shows who made comment
- Timestamp
- Back-and-forth conversation
- Attachment capability
- Add comment with or without files
- Persistent thread per order

**Usage Patterns:**

**During Dispute/Revision:**
> "Sometimes they'll just say, Hey, you need to fix this. And it's a disputed type report where they need them to make corrections."

**Occasionally Positive:**
> "Sometimes you'll see it to where they say, Hey, great job. You know, nothing's needed. It just depends on the reviewer and their personality."

### Reviewer Personality Differences

**Sunda's Observations (47:11 - 47:49):**

**By Generation:**
> "I find is that they're even more dry than an appraiser. They're very cut and dry... the younger ones seem to be a little bit nicer. No offense, Jeff, or anything. But the younger reviewers seem to be a little bit more where they'll give a little bit more feedback to the vendor versus the seasoned reviewers."

**Seasoned Reviewers:**
- Matter of fact
- Only communicate when issues exist
- Just want corrections, no discussion
- "Maybe they're just tired of doing reviews"

**Communication Preferences:**
Example scenario:
- Appraiser: "Hey, can we have a conversation?"
- Reviewer: "No, put it in the chat."

**Why:**
> "They're just... they're doing a bunch of reviews. They just don't have the time to facilitate all the stuff with all these different appraisers because they have certain SLAs they have to meet for the bank and get the reviews done." - Sunda

**Service Level Agreements (SLAs):**
Reviewers have deadlines, quotas, performance metrics that limit their ability to provide extensive feedback

---

## Part 16: The Technician Problem (47:49 - 50:31)

### Jeff's Industry Psychology Insights

**Jeff (47:49 - 49:33):**

**Core Issue:**
> "I think because they're technicians and not business people. So they desperately would love feedback, but they've never had it historically."

**The Desired Honesty:**
> "If I do 10 appraisals, it would be good. Say, hey, Jeff, you did great on seven of them. Two of them had issues. One was a piece of crap. They're not going to do it that way. But that's really, you know, the honesty."

**What Actually Happens:**
> "Internally, they're kind of digging appraisers but not really telling them."

**Implicit Feedback:**
> "An appraiser could tell if they're getting a lot of pushback and if they submit, let's say they do five submittals and three of them get review comments, they can tell they're not doing well with that bank's particular reviewer."

**The Professor Grading Analogy:**
> "I think the reviewer, to Sunda's point, the personality is kind of like somebody grading your, like a professor grading your test, only looking for mistakes, not giving kudos. Even though there are times when there are kudos, they never hear it."

**Rare Positive Feedback:**
> "There's an occasional less than 5% sentence where somebody would email or chat. I mean, that was an amazing report. That was very rare."

### The Opportunity (49:33 - 50:31)

**Why UX Can Make a Difference:**
> "But I think it's required, and I think that's the point. When you create something new, especially with the UX, that you are creating a community, even if it's subtle."

**Jeff's Confetti Example:**
> "Like, for example, I was on some site, I did something, and I got a little fake... Not that it has to be cheesy, but I got, like, confetti. Yay! You know, that's kind of stupid, but it didn't make me feel like, oh, that was kind of nice."

**The Real Desire:**
> "But I'd really like the feedback from the reviewer teaching them to elevate the industry. Maybe that's just too much to ask in a UX."

**Industry Elevation:**
This is part of Realwired's broader mission - not just technology, but elevating the entire appraisal profession through better practices, relationships, and tools.

---

## Part 17: Chocolate vs. Broccoli (49:33 - 50:46)

### The Change Management Challenge

**Jeff's Framework (49:39 - 50:26):**
> "I call it chocolate and broccoli. So the chocolate is what they want, which is to continue to do it the same way. The broccoli is what they need, which is to improve the relationship between each other."

**The 50% Problem:**
> "What's happening right now, I call it the 50% problem. On average, and it varies a lot, bank to bank, but on commercial appraisals, 50% of every report submitted is sent back for a revision. It could be a small typo. It could be a structural issue. That's a very – that's poor."

**Recognition Without Solution:**
> "And those sides want to improve it, but they don't know how. Does that make sense?"

**Sunda's Response:**
> "AI review."

**The Solution Pipeline:**
AI Review Forms product can:
- Catch errors before submission
- Reduce revision rate
- Self-correction opportunity
- But needs vendor engagement in platform

---

## Part 18: Focus Realignment & Deliverables (50:31 - 51:06)

### Sunda Redirects to Phase 1

**Sunda (50:31 - 51:06):**
> "What we want them to concentrate on other than thinking about how we might be able to do a community is making the UI UX on the vendor circle itself since it's the new thing rolling out to make this look a little bit more inviting and whatnot."

**Future Additions:**
> "I'm sure eventually we'll have another tab up here that would be maybe stats or some other things that we could give them across all banks... used to make 10 reports and five of them were returned. Right. You know, in the month of October or whatever, some stuff like that. So we'll eventually have some pretty stuff."

**Phase 1 Clarity:**
- Make existing pages more inviting
- Better UI/UX
- Visual improvements
- Prepare for future tabs (stats, community features)

---

## Part 19: The Radical Idea - Vendor Rating Banks (51:06 - 52:43)

### Flipping the Script

**Jeff's Provocative Question (51:06 - 51:12):**
> "One thing that hasn't been done, which I'm not sure how it would be acceptable, would be if as a fee appraiser, how would I rate the bank?"

**What If Vendors Could Rate:**
- Reviewer professionalism
- Platform usability (UConnect)
- Document quality provided
- Timeliness
- Overall professionalism

**Current Reality:**
> "There is no, there's a grading going from the bank to the vendor. There is none going back. And that's, that's really alien. That hasn't been done."

**Jeff's Reflection (51:52 - 52:43):**
> "All I'm trying to do is improve the communication a little bit, because I think a little bit is a lot of it."

**The Leadership Seminar Example:**
Reference to Realwired's non-profit work:
- Chief appraisers reluctant: "I don't want to go to a seminar on leadership"
- After experiencing it: "Oh, wow, that is so cool"
- They haven't had elevation before
- Small changes make big impact

**The Bigger Picture:**
> "The reason that these platforms are arm's length is because nobody's tried to even hint at a community, to hint at improving their relationship between fee appraisers that, again, 50% of the revenue comes from bank work, yet they're derogatory towards bank work because of that arm's length, vendor, no feedback."

**The Terminology Problem Again:**
> "Calling them a vendor is like they're selling potato chips as opposed to professional that really is well-educated. That's the disconnect."

---

## Part 20: Phase 2 Concept - Vendor Kudos (52:43 - 53:50)

### Sunda's Kudos Proposal

**Sunda (52:43 - 53:11):**
> "What if you add something in Circle, right, when they go to Circle, what if we add another tab over here, if we start the community thing, that would be maybe a vendor kudos tab. And if they put it in here, it would then appear for, they could do an at or whatever vendor by their email or whatever. And then it would be a kudos that shows up over on the portal for that vendor."

**Concept:**
- New "Kudos" tab in Circle
- Banks can @ mention vendors
- Public (or semi-public) acknowledgment
- Shows in vendor's portal
- Opt-in for banks
- Non-order-specific
- Relationship building

**Jeff's Caution (53:11 - 53:32):**
> "Yeah, I do think there needs to be an easy way and not to be overdone and not to be generic. So if I got a, if uploaded a report and I got this generic, you're the best. You know what I mean? Every time I get the same message, that's disingenuous. And that's actually going to turn me off even more than getting no feedback."

**The Authenticity Requirement:**
- Must be genuine, not automated generic messages
- Personalized, not template-spammed
- Meaningful, not perfunctory
- Less is more if it's real

---

## Part 21: Final Scope Confirmation (53:50 - 56:15)

### Cody's Summary

**Cody Miles (53:50 - 55:09):**
> "So just to make sure I'm kind of following the narrative well and just tell me where I get this wrong. But the scope of the effort here that is expected of Val and I..."

**Phase 1: Bank Side**
- Identify mechanisms to encourage positive feedback
- Work into UX/product design
- Following approval of appraisal
- OR generic kudos ability

**Phase 1: Vendor Side**
- Overall better UX of platform
- Surface feedback loops
- Maybe aggregate data: "How are we doing?"
- Positive things being said
- Benchmarks
- Maybe NOT specific feedback yet (Phase 2)

**Sunda's Confirmation (55:09 - 55:24):**
> "Our phase one is for the UI UX for the vendors when they come into the new platform here. So phase one is just an overall better UX of the current functionality... in vendor circle."

**Cody (55:20 - 55:24):**
> "And vendor circle, correct? Is that right?"

**Sunda & Ed: "Yeah."**

### Future Phases

**Sunda (55:25 - 55:42):**
> "And then after we have this and we launch it because it's not launched yet, then we can start, you know, brainstorming about what can we do for maybe community or to add benefit."

**Sequencing:**
1. **Phase 1:** Launch improved UI/UX for Vendors Circle
2. **Post-Launch:** Evaluate success
3. **Phase 2:** Add community features, feedback mechanisms

**Cody's Appreciation (55:42 - 56:09):**
> "Well, I appreciate the sync on this, guys. I appreciate understanding the vision and the goals of what you're doing and also the phase one goals. So it makes sense just looking at like my request page, for example, there's some UX principles that we can just really easily incorporate into here. Make a big lift in terms of user experience."

**Dev Environment Request:**
> "The thing that would help me would, of course, be access to this dev environment. So if that's possible, that'd be nice."

---

## Part 22: Access & Next Steps (56:09 - 57:12)

### Setting Up Design Team

**Ed (56:09 - 56:19):**
> "Sunda, could you just get the credentials to..."

**Sunda (56:19 - 56:35):**
> "Well, it's not a set of credentials. You have to do an email address. So you would do your own email... So what I can do is give you this link..."

**Jason's Process (56:35 - 56:43):**
> "Send us one or two email addresses or however many you need, and we'll set you up because I want to make sure there's data there."

**Importance:**
Need real data in environment for design team to work with, not empty state

**Cody (56:43 - 57:01):**
> "Jason, I'm happy to do that. It'll just be Val and I, though. So Val at Brand Cave and Cody at Brand Cave.co."

**Ed's Closing (57:01 - 57:12):**
> "All right. Thanks, everybody. Okay. Have a great weekend and holidays."

---

## Key Deliverables Defined

### Phase 1: Q1 2025 Launch
**Scope: Vendors Circle UI/UX Redesign**

#### Vendor Portal
1. **Profile Page Redesign**
   - Better layout and visual hierarchy
   - Improved coverage area display
   - Enhanced address management
   - Clearer specialty selection
   - Modern, professional aesthetic

2. **Licenses Page Redesign**
   - Better organization of credentials
   - Improved document upload UX
   - Clearer section grouping
   - State license management
   - Insurance documentation flow

3. **My Requests Page**
   - Preserve workflow stage structure
   - Improve visual design
   - Better bank/work organization
   - Clear action indicators

4. **My Invites Page**
   - Simple, clean interface
   - Clear accept/decline flow

#### Bank Portal (UConnect Circle Integration)
5. **Vendor Search Interface**
   - Improved search UX
   - Better results display
   - Clearer vendor preview

6. **Vendor Updates Queue**
   - Better notification display
   - Clearer accept/decline UX
   - Improved license review flow

7. **Invitation Flow**
   - Streamlined invite process
   - Clear status tracking

### Phase 2: Future (Post-Launch)
**Scope: Community & Feedback Features**

#### Potential Features (Concepts to Explore)
1. **Feedback Mechanisms**
   - Kudos system
   - Aggregate performance metrics
   - Positive reinforcement opportunities
   - Non-invasive rating system

2. **Vendor Dashboard Enhancements**
   - Performance statistics
   - Relationship health indicators
   - Improvement suggestions
   - Industry benchmarking

3. **Bank Communication Tools**
   - Easy positive feedback options
   - Template responses (avoid generic feel)
   - Recognition system
   - Professional engagement features

**Critical Constraints:**
- Cannot discuss specific orders (audit requirements)
- Must be optional, not forced
- Cannot show bank ratings to vendors
- Cannot aggregate cross-bank ratings
- Must respect bank privacy/proprietary systems
- Must maintain professional tone
- Cannot create vendor confrontation opportunities

---

## Strategic Insights for Design

### User Psychology

**Fee Appraisers (Vendors):**
- Analytical, technical professionals
- Older, predominantly male demographic
- View themselves as professionals, not "vendors"
- Want recognition but struggle with criticism
- Desperate for feedback but don't know how to ask
- 50% of income from bank work
- Feel devalued despite professional credentials
- Hold breath when submitting complex work
- Rarely receive positive acknowledgment

**Bank Reviewers/Chief Appraisers:**
- Also technical, analytical
- High workload (1000 reports/week, 3-4 reviewers)
- Risk management focus
- Tend to be critical by nature
- Younger reviewers more communicative
- Seasoned reviewers very matter-of-fact
- SLA pressure limits communication time
- Want to elevate industry but constrained by time/process

### Relationship Dynamics

**Current State:**
- Arm's length, transactional
- Not hostile, but not collaborative
- One-way criticism flow
- No positive feedback loop
- Vendors feel undervalued
- Both sides want improvement
- Neither knows how to achieve it
- Industry-wide problem, never addressed

**Desired State:**
- Professional community
- Mutual respect
- Constructive communication
- Value recognition
- Industry elevation
- Relationship improvement through subtle engagement
- Not forced, organic growth

### Design Principles to Consider

1. **Respect Professionalism**
   - Avoid "vendor" terminology where possible
   - Elevate, don't patronize
   - Professional tone, not casual

2. **Subtle, Not Forced**
   - Optional engagement
   - Easy to skip
   - Low friction
   - Natural integration

3. **Authentic, Not Generic**
   - Avoid template-feel
   - Personalized when possible
   - Meaningful over frequent
   - Quality over quantity

4. **Progressive Disclosure**
   - Don't overwhelm
   - Reveal complexity gradually
   - Clear next steps
   - Guided without hand-holding

5. **Preserve Familiarity**
   - Don't break existing mental models
   - Evolution, not revolution
   - Maintain workflow stage structure
   - Respect learned behaviors

6. **Visual Clarity**
   - Better organization
   - Clear hierarchy
   - Scannable information
   - Purposeful whitespace
   - Modern but not trendy

---

## Questions for Future Discussion

### Clarifications Needed
1. What happens when vendor declines bank invitation?
2. How do banks discover vendors to invite?
3. What triggers vendor removal from bank's list?
4. How do vendors request to work with new banks?
5. What's the new vendor onboarding flow?
6. Are there vendor success metrics currently tracked?

### Phase 2 Exploration
1. What data exists for aggregate vendor performance?
2. What positive feedback currently occurs (even if rare)?
3. What would reviewers need to make feedback easier?
4. How might gamification work for this demographic?
5. What industry benchmarks exist?
6. What recognition would be meaningful?

---

## Referenced Materials

### Provided by Client
- Loom walkthrough video (Jason): https://www.loom.com/share/cb94ec4ce7b1495eb35372ce635158f0
- Fathom recording (this call): https://fathom.video/share/q3TxtohkWAiZDbGYPEp6MX8-xeNgVh87
- Screenshots of current application (vendors-circle-walkthrough-jason folder)

### To Be Provided
- Dev environment access for Val and Cody
- Test data in environment
- Updated logo from Jeff
- Additional bank-side screenshots (if needed)

---

## Success Metrics (Implied)

### Phase 1
- Vendors complete profile setup more quickly
- Reduced confusion during onboarding
- Increased profile completion rates
- Positive feedback on visual design
- Faster license upload process
- Reduced support requests

### Phase 2
- Increased positive feedback instances
- Improved vendor satisfaction scores
- Reduced revision rates (50% → lower)
- More vendor engagement with platform
- Better relationship indicators
- Industry elevation markers

---

## Cultural Context

### Realwired's Mission
Beyond just software - elevating the appraisal industry through:
- Better tools
- Better relationships
- Better practices
- Leadership development
- Professional recognition
- Industry standards improvement

This project is part of a larger vision to transform how appraisers and banks interact, moving from transactional to collaborative relationships.

