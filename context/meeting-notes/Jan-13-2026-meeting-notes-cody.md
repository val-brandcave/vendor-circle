# Jan 13, 2026

# Agenda

- Walkthrough “Vendor’s Circle” Application’s redesign first draft (Phase 1) with Ed.

---

## Big Idea

- The appraiser / business admin experience should be the same experience
- Combine Team and Appraiser Profiles ← all appraiser profiles will be a user
    - This means that when I add a user to my account, if I select them as an appraiser, then I need to complete all of the other values.
    - Business Admin can add details and/or just invite the user
    - User can complete their own profile

## [Auth Pages](auth-screen-vendor-circle.png)

- I don’t love this pattern. Go with a pattern more similar to Alchemyca with the split pane.(Alchemyca-auth-pattern-split-screen.png)

## Onboarding Flow

- Add a intro screen that tells them how long it’s going to take and what they’re going to gain and what they’re going to need
    - “We’re happy you’re here. We’re going to ask you six sections, you can skip this any time”
- [Change this to match Specretary](navigation-controls-vendor-circle.png)(app.specretary.com_workspaces-onboarding-steps-1.png)
- Remove “Skip for Now”
- [Change this pattern to be more like how we did in Pegasus](account-setup-steps-vendor-circle.png)(app.specretary.com_workspaces-onboarding-steps-1.png)
- [Remove this Skip button too](extra-skip-button-vendor-circle.png)
- [Remove the description here](onboarding-header-description-vendor-circle.png)
- Show Confetti after completing this flow
- Onboarding flow should ask the user if they’re an appraiser. Forks the path.(app.specretary.com_workspaces-onboarding-steps-5-role-fork.png)
- When adding other users
    - Minimum number of inputs on this (app.specretary.com_workspaces-onboarding-steps-2.png)(app.specretary.com_workspaces-onboarding-steps-3.png)

## [Onboarding Modal](guided-tour-prompt-vendor-circle.png)

- Change this to be more like Specretary onboarding flow if you create a new workspace.(app.specretary.com_workspaces-get-started-1.png),(app.specretary.com_workspaces-get-started-2.png),(app.specretary.com_workspaces-get-started-3.png),(app.specretary.com_workspaces-get-started-4.png),(app.specretary.com_workspaces-get-started-5.png),(app.specretary.com_workspaces-get-started-6.png),(app.specretary.com_workspaces-get-started-landing.png)

## [Onboarding (Business Admin)](team-setup-step-vendor-circle.png)

- No need to select size of team or appraisal profiles ← You can look at SynkedUP’s budget builder for how to handle repeaters like this.(app.specretary.com_workspaces-onboarding-steps-2.png),(app.specretary.com_workspaces-onboarding-steps-3.png)
- Business area coverage ← this should be a search and select

## Dashboard

- There should be an account completion section if they didn’t complete the onboarding flow
- Add a “Get Started” section on the dashboard that has a section if their profile is not complete. Specretary has a good pattern for this (create a new workspace)
    - This would show all incomplete profiles on the account
- Metric Cards
    - Show things like Total Bids, Tunaround Time, Business Rating etc instead of “Team Accounts”
    - Completion Rate, etc should be at top
- Don’t need team overview
- Activity log is good

## General

- Remove in-app product tours, and instead do first time modals. Ask Esther for some examples from SynkedUP
- Look at Specretary as an example of the settings being at the bottom of the main nav

## Messages

- Remove this feature

## Invites

- Add this missing feature