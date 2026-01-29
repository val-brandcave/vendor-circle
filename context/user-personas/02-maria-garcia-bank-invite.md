# PERSONA 2: Maria Garcia
## New Individual Appraiser (Bank Invite)

---

### Background

**Name:** Maria Garcia  
**Age:** 28  
**Location:** San Diego, California  
**Experience:** 3 years as licensed appraiser  
**Current Situation:** Works with Wells Fargo, receives email invitation to join Vendor Circle

**Goals:**
- Maintain good relationship with Wells Fargo
- Make credential management easier
- Potentially connect with more banks

**Pain Points:**
- Doesn't know what Vendor Circle is
- Skeptical of new platforms
- Worried about spam

---

### Entry Point

**Discovery Method:** Email invitation from Wells Fargo  
**Landing:** Email → /accept-invite page  
**Motivation:** "Wells Fargo invited me, so it must be legitimate"

---

### User Journey (Passwordless + Bank Invite)

#### Step 1: Bank Invitation Email
```
Wells Fargo sends invitation via Vendor Circle
  ↓
Maria receives email: "Wells Fargo invites you to Vendor Circle"
```

**Email Content:**
- **From:** Vendor Circle <invites@vendorscircle.com>
- **Subject:** Wells Fargo invites you to Vendor Circle
- **Body:**
  ```
  Hi Maria,

  Wells Fargo has invited you to join Vendor Circle to streamline 
  your credential management and receive opportunities.

  With Vendor Circle, you can:
  • Update your credentials once, notify all banks automatically
  • Manage licenses, coverage areas, and specialties in one place
  • Track your performance and ratings

  [Accept Invitation Button]

  This invitation was sent by Wells Fargo via Realwired's 
  Vendor Circle platform.

  Questions? Contact Wells Fargo or visit our help center.

  Powered by Realwired
  ```

**User Reaction:**
- "Wells Fargo logo is prominent, so this seems legit"
- "Vendor Circle? Never heard of it, but if Wells Fargo uses it..."
- Clicks "Accept Invitation"

---

#### Step 2: Bank Invite Landing Page
```
Clicks "Accept Invitation"
  ↓
Opens /accept-invite?token=xxx&bank=wells-fargo
```

**Expected UI:**
- **Wells Fargo logo** (large, centered, prominent)
- **Vendor Circle logo** (below Wells Fargo logo)
- **Headline:** "Wells Fargo invites you to Vendor Circle"
- **Subheading:** "Manage your credentials and receive opportunities from Wells Fargo and other banks"

**Benefits List:**
- ✓ Update once, notify all banks automatically
- ✓ Professional profile that stands out
- ✓ Track your performance across all clients
- ✓ Secure document storage

**CTAs:**
- **Primary Button:** "Create Account" (large, prominent)
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
- Headline: "Create your Vendor Circle account"
- Message: "We'll send you a magic link to verify your email"
- Email field: **Pre-filled** with `maria.garcia@gmail.com` (from invite token)
- Email field: **Disabled** (can't change)
- Button: "Send Magic Link"

**Note:** Email is pre-filled from the invite token to ensure invite goes to correct person

**User Action:** Clicks "Send Magic Link"

---

#### Step 4: Magic Link Request
```
Clicks "Send Magic Link"
  ↓
System sends email
  ↓
Stores invite context (bankId, bankName, inviteToken) in session
  ↓
Redirects to /check-email
```

**Expected UI:**
- "Check your email" heading
- Message: "We sent a magic link to maria.garcia@gmail.com"
- Special note: "After verifying your email, you'll be connected to Wells Fargo automatically"

---

#### Step 5: Magic Link Email & Click
```
Receives email: "Complete your Vendor Circle signup"
  ↓
Clicks "Complete Signup" button
  ↓
Opens /verify-magic?token=xxx
```

**Magic Link Email:**
- Subject: "Complete your Vendor Circle signup"
- Body includes context: "You're signing up via invitation from Wells Fargo"

---

#### Step 6: Magic Link Verification
```
System validates magic link token
  ↓
Creates user account
  ↓
Retrieves invite context from session (Wells Fargo connection)
  ↓
Redirects to /onboarding with bank context
```

**What happens behind the scenes:**
- User account created
- Wells Fargo connection queued (will be completed after onboarding)
- User is marked as "invited by bank" (analytics)

---

#### Step 7: Onboarding (Same as Persona 1)
```
Completes standard onboarding:
  - Welcome (mentions Wells Fargo invitation)
  - Personal info
  - Business info
  - Licenses
  - Coverage
  - Specialties
  - Review
```

**Difference from Direct Signup:**
- Welcome screen mentions: "You're joining via invitation from Wells Fargo"
- No other changes (same onboarding flow)

---

#### Step 8: Dashboard (First-Time + Bank Connection)
```
Completes onboarding
  ↓
System auto-connects to Wells Fargo
  ↓
Redirects to /vendor/dashboard
  ↓
Shows success toast
```

**Expected UI:**
- **Success Toast (Top-right):**
  ```
  ✓ You're now connected with Wells Fargo!
  
  Wells Fargo can now see your credentials and 
  send you bid invitations.
  ```
  [Dismiss button]

- **Dashboard:**
  - Same first-time experience (null states)
  - BUT: "Connected Banks" shows Wells Fargo (1 bank)
  - Get Started tasks include "Wells Fargo connected ✓"

**User Action:**
- Dismisses toast
- Explores dashboard
- Clicks "Connected Banks" to see Wells Fargo

---

#### Step 9: Connected Banks Page
```
Clicks "Connected Banks" in profile or dashboard
  ↓
Opens /vendor/profile/banks
```

**Expected UI:**
- **Wells Fargo Card:**
  ```
  [Wells Fargo Logo]
  Wells Fargo
  
  Connected: Today, 10:45 AM
  Status: Active
  
  [View Details]
  ```

**User Satisfaction:**
- ✓ Connection is confirmed
- ✓ Bank logo is visible (trust signal)
- ✓ Automatic connection worked

---

### Success Criteria

**Invite Email:**
- ✅ Email is not marked as spam
- ✅ Bank logo is prominent
- ✅ Messaging is clear and trustworthy

**Landing Page:**
- ✅ Bank branding is dominant
- ✅ Benefits are compelling
- ✅ Vendor Circle branding is visible but secondary

**Auto-Connection:**
- ✅ Wells Fargo connection happens automatically after onboarding
- ✅ User sees success toast
- ✅ Bank appears in "Connected Banks" list

**User Trust:**
- ✅ User feels confident this is legitimate (not spam)
- ✅ User understands the value proposition
- ✅ User completes signup (high conversion rate)

---

### Edge Cases to Test

1. **User already has account:**
   - User clicks "Log in" instead of "Create Account"
   - Signs in with magic link
   - Wells Fargo is added to their existing account
   - Shows toast: "Wells Fargo added to your account"

2. **Invite link expired:**
   - User clicks invite after 7 days
   - Shows error: "This invitation has expired"
   - Provides contact information for Wells Fargo

3. **User invited by multiple banks:**
   - User receives invites from Wells Fargo and Chase
   - Accepts both (separate emails, separate tokens)
   - Dashboard shows 2 connected banks

4. **Suspicious user:**
   - User doesn't recognize the invite
   - Sees "Powered by Realwired" and Wells Fargo logo
   - Googles "Vendor Circle Realwired"
   - Finds legitimate information, proceeds

5. **Mobile email open:**
   - User opens invite email on mobile
   - Landing page is responsive
   - Magic link process works on mobile

---

### User Quotes (Fictional)

> "I was skeptical at first, but seeing Wells Fargo's logo made me trust it."

> "The magic link thing was different, but actually easier than creating a password."

> "I like that it automatically connected me to Wells Fargo. One less thing to do."

> "The email could have been clearer about what Vendor Circle actually is."

---

### Testing Checklist

- [ ] Send bank invite from catalogue
- [ ] Receive invite email with bank logo
- [ ] Click invite link
- [ ] See bank branding on landing page
- [ ] Create account with pre-filled email
- [ ] Receive magic link
- [ ] Complete onboarding
- [ ] Verify auto-connection to bank
- [ ] See success toast
- [ ] Check Connected Banks list
- [ ] Test "Log in" path (existing user)
- [ ] Test expired invite
- [ ] Test multiple bank invites

---

**Persona Type:** Primary (Most important acquisition channel)  
**Priority:** Critical  
**Complexity:** High (involves bank integration)  
**Estimated Completion Time:** 20-25 minutes (including email verification)

**Note:** This is the **primary user acquisition flow** for Vendor Circle. Banks inviting appraisers is how most users will join the platform.
