# Jan 6, 2026

# Agenda

- Walkthrough “Vendor’s Circle” Application’s redesign first draft (Phase 1) with Ed.

---

# Vendor’s Circle

- Create a couple logo options (time box this; don’t do a lot of options)
- ***Big Change***
    - We need to support Businesses that have multiple appraisers. Talk to Cody about a pattern for this. We need to support multiple profiles. In this case, you might have one administrative person.
    - You also need to support the single vendor experience.
- Add User Management
    - Note that users are not the same appraiser profiles. Profiles should be managed separate from users.
- Add a phase 2 example of an AI review on a per vendor basis
    - Also add a overall AI review across all banks
    - Review the transcript where Ed described some of the things that are possible to show. It’s around 32 minutes into the meeting.
- We need an onboarding flow for the first time user who needs to setup their profile. They need to setup their account all the way through. This should be a creation flow like I have in specretary — full page modal stepper.(first-time-setup-modal-reference.png)
- Add sign up flow so vendors can just setup their account without having to be invited. Note that this could still have multiple profiles for multiple appraisers.
- The message threads for orders should be available in this app.
- General
    - Make sure you have null states on everything
    - Add skeleton loading to all views
    - Table Filters
        - Change this pattern to be more like Specretary, where the action opens a modal with the filter configuration(specretary-table-filters-modal.png). Then use the pill row like you have
- Modals should have
    - A max height
    - Sticky header
    - Sticky footer
    - content that scrolls on Y overflow
    - [It should not look like this](https://loom.com/i/b0551ac68897457ba760109764dad720)(modal-feedback-1.png)
- Top Bar
    - [Make this text a little smaller](https://loom.com/i/c53d2bf6a0d94771882f27740329fb5b)(header-title-feedback-1.png)
- Requests
    - Accepting a request doesn’t need a text area
    - See my comments in Loom
- My Documents
    - [Show values like this a little differently](https://loom.com/i/25ea292bb457417483c4fc2dd7c0ded9)(sample-reports-remaining-feedback-1.png). Pattern should be N in a badge and a label of “remaining” next to it

# Admin Side

- We need to allow the admin to do scorecards. This functionality already exists.

## Other Notes

- Current goal is parity
- What could be the best way to do this to replace the as-is, and then involve the secondary
    - Add the ability to give a vendor feedback after an order or just in general