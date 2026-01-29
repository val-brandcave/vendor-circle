# Jan 20, 2026

# Agenda

- Walkthrough “Vendor’s Circle” Application’s redesign and feedback first draft (Phase 1) with Ed and Jeff.

---

## Context

- Jeff is on this call.
- The bank’s policy approves the appraiser, not the firm
- The vendor approval processes is clunky
- Banks don’t don’t like to mess with this after they’ve approved the appraiser

## Auth Pages

- There should be “Powered by Realwired” under the logo

## Onboarding Stepper (General)

- You still have not updated it to the UI I asked you to do. It needs to better match the stepper flows in Specretary

## Onboarding / Account Type

- Use the description for the radio options

## Onboarding / Business Info

- This should be in both onboarding flows

## Onboarding / Contact

- This should be in both onboarding flows
- Combine this with Business Info to make it one step
- Remove Fax
- Remove Business Emails
- [This should have dropdowns in the appropriate places](https://loom.com/i/d4bdffc1ce2f447f982034b5f6c895c9)

## Onboarding / Welcome

- [Combine this with Let’s Get You Setup](https://loom.com/i/3d7451fcebdc46cb9fd7a9e2d0261713)

## Missing Experience / Accept Invite (via Bank)

- We need an experience where an appraiser is invited by a bank to work together.
- They would receive an email and open up an accept invite page where they either login or create an account. They should see the bank logo on this page with the Vendor’s Circle and some language around “Bank A is inviting you to receive and manage bids on Vendor’s Circle”

## Missing Experience / Accept Invite (via Vendor Admin)

- There needs to be an onboarding flow for appraisers that are invited into an existing account. In that flow, they’d provide their documentation as part of the onboarding.

## Onboarding / Coverage

- Counties
    - A textarea is really terrible UX here. Counties would be based on the state you selected. This should be a search and select / multi-select for each state you selected.
- Zip Codes
    - Remove Zip Codes
- [Your Coverage in the Business Flow is entirely different than the single profile](https://loom.com/i/cb3da39f9f2e4ff980a0fede121128ac). Why?
- Coverage should be consistent between individual and business flows.
- Coverage is conceptually a company-level capability, but execution happens at the appraiser level.
- The current model is mixing these concepts inconsistently.
- We need to clearly define:
    - What coverage is declared at the business level
    - What coverage is enforced at the appraiser level
- Radius-based coverage may exist in edge cases, but is not MVP.
- Default to State → County selection.
- No free-text entry for coverage areas.

## [Onboarding / Specialties](https://loom.com/i/9611e091b5cb404c8f543558ca374938)

- The specialities should show the checkbox in each card.
- Some specialities like Commercial or Multi-Family have sub-specialities. Show these conditionally when the user selects the parent speciality, and the user should be able to select one or many of the conditionally-shown sub-specialities. There could be 80 things, so this should be a search and select / multi-select. If the user selects all sub-specialties, they should see an alert that says, “are you sure you are a specialist in every category?” etc et
- Designations should be a multi-select
- Specialties are a critical matching signal.
- High-level specialties (Commercial, Multi-Family, etc.) are not sufficient on their own.
- We need a two-level taxonomy:
    - Parent specialty
    - Sub-specialties (potentially large lists)
- The UX should actively discourage “select all” behavior.
- If a user selects an excessive number of sub-specialties, show a system warning or nudge explaining that over-selection reduces match quality.
- This should feel corrective, not punitive.
- We will need real data for sub-specialties eventually, but the UX pattern needs to be designed now.

## Account Model / Org vs Individual (Unresolved)

- The distinction between “individual appraiser” and “business account” is still not clearly resolved.
- We should not be designing two entirely separate products.
- There needs to be:
    - One account entry point
    - Optional organization context
    - One or more appraiser profiles attached to that account
- An admin may or may not be an appraiser.
- An appraiser is always a user.
- A user does not necessarily represent the entire organization.
- Reduce friction wherever possible in onboarding.
- Avoid forcing admins to complete all appraiser profiles upfront.

## **Missing Experience / Team Onboarding**

- When a business admin adds appraisers:
    - They should be able to invite via email.
    - Invited appraisers should complete their own onboarding and documentation.
- Admins should not be required to upload documentation for every appraiser during initial onboarding.
- This should be deferred to a “Get Started” or post-onboarding flow.
- The system should clearly show which appraiser profiles are incomplete.
- Gamify completion if possible (progress indicators, completion states).

## Dashboard (General)

- Dashboard is the primary reason users should log into Vendor Circle.
- It should not feel like a settings page.
- Metrics should be surfaced immediately.
- For business admins, dashboard metrics should focus on:
    - Performance
    - Turnaround times
    - Ratings
    - Bottlenecks
- Team member counts and setup progress are not primary value metrics.
- Avoid optimizing the dashboard for a single user type.
- The dashboard must work for:
    - Solo appraisers
    - Business admins managing teams

## Community (Future, Not MVP)

- Community features are not a v1 requirement.
- Ranking and percentile-based metrics are a potential foundation for future community features.
- Peer comparison could be a strong engagement lever.
- Ratings will likely be captured at the end of workflows (reviewer → appraiser).
- Any community concept should be additive, not blocking core workflows.

## Invites vs Bids (Needs Clarification)

- There is ambiguity between:
    - Invitations to join a bank’s preferred vendor list
    - Day-to-day bid invitations
- Everyday bids are a major driver of engagement.
- We need to decide:
    - Whether “invites” are a separate concept
    - Or whether bidding implicitly establishes a bank–vendor relationship
- Bidding experience is not V1.
- This is likely a V2 scope item, but we should reserve space for it in the IA.
- Do not over-design this until scope is confirmed.

## Documents / Credentials

- Documents are required at the appraiser level.
- Admins must be able to upload documents on behalf of appraisers.
- The IA for documents should support:
    - Self-managed uploads
    - Admin-managed uploads
- License expiration reminders are useful.
- Automated license verification with states is out of scope.
- Do not design workflows that imply system-level license validation.

## Auth / Branding

- Vendor Circle should stand on its own as a product.
- There is value in brand association with Realwired / UConnect.
- “Powered by Realwired” is a reasonable compromise.
- Bank branding should be visible during invite-based entry points to establish trust and context.

## Delivery / Build Considerations

- Current UI work is largely production-ready from a frontend perspective.
- Backend implementation is still PHP-based.
- Frontend should be treated as a reference and target state.
- Backend should expose APIs to support a modern frontend.
- Do not optimize designs around current technical limitations.
- Design for the correct product first.