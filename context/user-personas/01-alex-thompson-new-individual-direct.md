# PERSONA 1: Alex Thompson
## New Individual Appraiser (Direct Signup)

---

### Background

**Name:** Alex Thompson  
**Age:** 32  
**Location:** Austin, Texas  
**Experience:** 5 years as licensed appraiser  
**Current Situation:** Working independently, heard about Vendor Circle from a colleague

**Goals:**
- Simplify credential management across multiple banks
- Increase visibility to potential clients
- Reduce administrative overhead

**Pain Points:**
- Tired of emailing updated licenses to 8 different banks
- Misses opportunities because banks don't know he's available
- Spends too much time on paperwork

---

### Entry Point

**Discovery Method:** Word of mouth / Google search  
**Landing:** Vendor Circle website or catalogue page  
**Motivation:** "I need a better way to manage my credentials"

---

### User Journey (Passwordless)

#### Step 1: Discovery & Signup
```
Discovers Vendor Circle
  ↓
Clicks "Create Account" (or "Start Signup" in catalogue)
  ↓
Lands on /signup
```

**Expected UI:**
- Clean, professional design
- Vendor Circle + "Powered by Realwired" branding
- Email input field (NO password field)
- Button: "Send Magic Link"

**User Action:** Enters email: `alex.thompson@gmail.com`

---

#### Step 2: Magic Link Request
```
Clicks "Send Magic Link"
  ↓
System sends email
  ↓
Redirects to /check-email
```

**Expected UI:**
- "Check your email" heading
- Message: "We sent a magic link to alex.thompson@gmail.com"
- Instructions: "Click the link in the email to continue"
- Resend button (appears after 60 seconds)

**User Action:** Opens Gmail, finds email from Vendor Circle

---

#### Step 3: Email & Magic Link
```
Receives email: "Sign in to Vendor Circle"
  ↓
Email contains:
  - Friendly greeting
  - "Sign In" button (magic link)
  - Expiry notice (15 minutes)
  - "Powered by Realwired" footer
```

**User Action:** Clicks "Sign In" button

---

#### Step 4: Magic Link Verification
```
Clicks link → Opens /verify-magic?token=xxx
  ↓
System validates token
  ↓
Creates user account (status: active, emailVerified: true)
  ↓
Redirects to /onboarding
```

**Expected UI (verify-magic):**
- Loading spinner
- Message: "Verifying your email..."
- Auto-redirects after 1-2 seconds

---

#### Step 5: Onboarding
```
Completes standard onboarding:
  1. Welcome screen
  2. User type selection (Individual Appraiser)
  3. Personal information
  4. Business information (optional)
  5. Contact information
  6. State licenses
  7. Coverage areas
  8. Specialties & designations
  9. Review & submit
```

**User Experience:**
- Specretary-style stepper UI
- Progress indicator sidebar
- Save progress automatically
- Can skip and complete later

**Expected Data Collected:**
- First Name: Alex
- Last Name: Thompson
- Title: Certified Residential Appraiser
- Years Experience: 5
- Primary Email: alex.thompson@gmail.com
- Phone: (512) 555-1234
- State Licenses: TX
- Coverage: Travis County, Williamson County
- Specialties: Residential, Multi-Family

---

#### Step 6: Dashboard (First-Time)
```
Completes onboarding
  ↓
Redirects to /vendor/dashboard
```

**Expected UI:**
- Welcome message: "Welcome to Vendor Circle, Alex!"
- Metrics cards (all zeros)
- Empty charts ("Not enough data yet")
- "Get Started" section with remaining tasks
- Null states for work, invites, documents

**Remaining Tasks (Get Started):**
- ☑️ Create account
- ☑️ Complete onboarding
- ☐ Upload state license documents
- ☐ Upload E&O insurance
- ☐ Connect with your first bank
- ☐ Complete profile (add photo, bio)

**User Action:** Explores dashboard, notices empty states

---

### Success Criteria

**Account Creation:**
- ✅ User can sign up with email only (no password)
- ✅ Magic link sent within 5 seconds
- ✅ Email is deliverable and not spam

**Magic Link:**
- ✅ Link works when clicked
- ✅ Link expires after 15 minutes
- ✅ Link is single-use (can't be reused)

**Onboarding:**
- ✅ All steps are clear and intuitive
- ✅ Progress is saved automatically
- ✅ User can complete in ~10 minutes

**Dashboard:**
- ✅ Shows appropriate first-time user experience
- ✅ Null states are helpful, not confusing
- ✅ Get Started tasks are actionable

---

### Edge Cases to Test

1. **Email not received:**
   - User clicks "Resend link"
   - System sends new email after 60 seconds
   - Original link is invalidated

2. **Expired link:**
   - User clicks link after 15 minutes
   - Shows error: "This link has expired. Request a new one."
   - Provides button to return to signup

3. **Link already used:**
   - User clicks link twice
   - Shows error: "This link has already been used."
   - If signed in, redirects to dashboard
   - If not signed in, redirects to signin

4. **Different browser/device:**
   - User requests link on desktop
   - Opens link on mobile
   - Should work seamlessly

5. **Slow email delivery:**
   - User doesn't see email after 60 seconds
   - Can click "Resend"
   - Check spam folder reminder

---

### User Quotes (Fictional)

> "Wait, no password? That's actually nice. I hate remembering passwords."

> "The magic link thing is cool, but I wish it told me how long it would take to get the email."

> "Onboarding was smooth. I like that it saves my progress."

> "The dashboard is empty now, but I can see it will be useful once I have data."

---

### Testing Checklist

- [ ] Sign up with valid email
- [ ] Receive magic link email within 5 seconds
- [ ] Click magic link and verify
- [ ] Complete onboarding
- [ ] Land on dashboard with appropriate first-time UI
- [ ] Test "Resend link" functionality
- [ ] Test expired link error
- [ ] Test already-used link error
- [ ] Test link on different device/browser
- [ ] Verify email formatting (desktop + mobile)

---

**Persona Type:** Primary (Most common first-time user)  
**Priority:** High  
**Complexity:** Medium  
**Estimated Completion Time:** 15-20 minutes (including email verification)
