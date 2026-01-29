# USER PERSONAS - VENDORS CIRCLE

This folder contains detailed user personas for all authentication entry points in the Vendors Circle passwordless authentication system.

## Persona Categories

### Individual Appraisers
1. **New Individual (Direct Signup)** - Discovers and signs up directly
2. **New Individual (Bank Invite)** - Invited by a bank
3. **Existing Individual (Returning)** - Returning user login
4. **Existing Individual (Bank Invite)** - Receives new bank invite

### Business Accounts
5. **New Business Admin** - Creates new business account
6. **Existing Business Admin** - Returning business owner

### Team Members
7. **New Team Member (Team Invite)** - Invited by business admin
8. **Existing Appraiser (Team Invite)** - Multi-business contractor

### Administrators
9. **Realwired Admin** - Platform administrator

## Entry Points Matrix

| Persona | Entry Point | User Status | Auth Method | Onboarding |
|---------|-------------|-------------|-------------|------------|
| 1 | Direct Signup | New | Magic Link | Full |
| 2 | Bank Invite | New | Magic Link | Full + Bank Connect |
| 3 | Direct Signin | Existing | Magic Link | None |
| 4 | Bank Invite | Existing | Magic Link | None + Bank Connect |
| 5 | Direct Signup | New | Magic Link | Full (Business) |
| 6 | Direct Signin | Existing | Magic Link | None |
| 7 | Team Invite | New | Magic Link | Limited (No Business) |
| 8 | Team Invite | Existing | Magic Link | None + Add to Business |
| 9 | Direct Signin | Existing | Magic Link | None |

## Testing Scenarios

Each persona has:
- Background story
- Entry point
- Step-by-step journey
- Expected UI states
- Success criteria
- Edge cases to test
