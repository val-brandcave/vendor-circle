# Jan 27, 2026

# Agenda

- Walkthrough “Vendor’s Circle” Application’s redesign and feedback (Auth, Onboarding and dashboard)(Phase 1) with Ed and Jeff.

---

## Context

- Magic-link authentication + entry-point variations
- Updated onboarding (individual vs “business” path)
- Team invites + bank invites
- Coverage + specialties model
- Early dashboard concepts and V1 vs V2 scope boundaries

## Auth / Entry Points

- Magic link sign-in is the default flow (demo uses console logging / impersonation for now).
- Signup entry points covered:
    - Signup from website (new user)
    - Invite from bank
    - Invite from team/admin
- Auth UI update:
    - “Powered by Realwired” shown on entry/success UI (good improvement).
- Client request:
    - Provide Ed a link to the demo + instructions for how to use the magic link / how to bypass steps during demo.
- Val action:
    - Improve impersonation/testing experience so Ed can self-serve the demo more easily.

## Onboarding

### Individual Flow

- Optional business name step (can skip).
- Personal info + titles/experience.
- Licenses:
    - Expired / expiring license shows warning but does not block progress (good).
- Coverage:
    - Map deferred; replaced with search + select flow:
        - Select state(s)
        - Expand accordion per state to select counties
        - Select all / clear all supported
        - At least one county required for a state to count

### Coverage Validation Feedback (Ed)

- If a user selects a state but no counties, we must block progression.
- Need clear “you haven’t selected anything” modal/state validation to force completion.
- Val action:
    - Add blocking validation + clearer empty-state messaging.

### Work Area / Radius (New Requirement)

- Jeff asked whether “radius” belongs in Uconnect or here.
- Ed confirmed: radius/work radius should be captured here.
- Direction:
    - Separate “License coverage” vs “Work area willing to travel”
    - Add a distinct left-nav step/tab: **Work Area**
    - Work Area behavior:
        - Option A: willing to travel anywhere in coverage counties
        - Option B: willing to travel X miles from address (office location / chosen location)
        - Allow overriding business address / enter location for radius
    - This radius influences matching so banks only see vendors in intersected criteria.

### Specialties / Sub-specialties

- Property type list currently from mock/static JSON (AI-derived).
- Jeff noted: bank lists are similar but subtly different; need standardization strategy.
- Direction:
    - We need a Realwired-defined standard list and banks operate within that standard
    - Support up to ~3 levels (category → specialty → sub-specialty)
    - “Other” bucket possible
    - Continuously refine based on usage data
- UX behavior:
    - Warn when selecting too many / selecting all specialties
    - Keep “review selection” escape hatch

### Business / Team Model Clarification (Captured in this call)

- Business onboarding is for the “owner/admin” first.
- Team members get invited and complete their own profile (coverage + specialties).
- Business coverage becomes cumulative based on team members’ profiles.
- Important business rule reiterated:
    - Banks approve **individual appraisers**, not firms.
    - Organization is primarily a management + billing construct.
    - Work and matching still happen at the individual level.

## Admin / Realwired Backend

- “Realwired admin” view shown as internal management:
    - Geo map of vendors
    - Vendor table
    - Specialty management (including sub-specialties)
    - Read-only vendor detail “CRM-like” view for support
- Clarification:
    - Banks won’t see/admin this in V1; this is internal operational tooling for Realwired (CS/onboarding).
- Jeff question:
    - Ability to change labels/words per customer
- Ed response:
    - Not necessarily custom per bank; more about filling gaps and managing the taxonomy centrally.

## Dashboards & Metrics

### Vendor dashboard priority

- Ed: **expiring licenses** must be the #1 thing surfaced.
- Jeff also wants “bank-related expiry/credential status” surfaced prominently for vendors.

### Bids / Actions (V1 vs V2)

- Jeff asked if vendors will bid inside VendorCircle.
- Decision:
    - **V1:** no bidding inside VendorCircle (use existing web form)
    - **V1 should still show statuses and stats**
    - “View/Action” should open the existing web form / email link
    - **V2:** bring bidding into VendorCircle for real-time engagement and stickiness

### Connected Banks / Activity Signals

- New idea: show “recency + activity” per connected bank:
    - badges like “last 30 days” bid volume
    - trend indicators (up/down)
    - potential 3-metric model per bank card:
        - invitations received
        - bids responded/submitted
        - jobs won / win rate (needs clear definitions)

### Ratings / Cohorts

- Rating concept resonated strongly (“game changer”).
- Needs clarification:
    - star meaning is currently placeholder
    - rating might be an average across banks with different scoring systems
- Direction:
    - Show rating + cohort average + percentile
    - Define cohort logic (region/coverage/peer set)

## Subscriptions / Tiers

- Ed sees future tiering based on:
    - additional products (ex: AR/auto review)
    - enhanced insights
    - team size (0–5, 5–10, etc.)
- Decision:
    - **V1:** parity, no tier selection during onboarding
    - Tiering likely later (Q3/Q4 timeframe mentioned)

## Bank Side (Future / V2)

- Jeff wants bank-side maintenance eventually (add/remove vendors at scale).
- Ed wants to move that out of Uconnect long-term, but not now.
- Direction:
    - **V1:** vendor side only; bank uses Uconnect
    - **V2:** bank maintenance flows move here once V1 is shipped and stable

## License Verification / Approval Process (Future)

- Jeff noted banks sometimes manually open each PDF and verify legitimacy.
- Future direction:
    - incorporate human verification workflow later
    - possible “verified by X banks” indicator (blue check) later
    - avoid AI approvals

## Next Steps / Actions (Val)

- Coverage step:
    - Add blocking validation when state selected but no county chosen
    - Improve empty-state clarity
- Add “Work Area” step:
    - radius option + address selection/override
    - keep counties selection as alternative (OR model)
- Dashboard:
    - make expiring licenses the primary callout
    - add connected-bank activity signals (badges/trends)
    - clarify bank vs vendor dashboard separation
- V1 bid action:
    - ensure “View” opens web form link and still shows statuses/stats in VendorCircle
- Send Ed:
    - demo link
    - clear instructions for impersonation/magic-link testing