# ADR-0002: Use Better Auth for authentication

- **Status:** Accepted (retroactive)
- **Date:** 2026-09-25 (documentation date)
- **Deciders:** Not recorded

<!-- TODO: add original deciders -->

## Context

This is a retroactive ADR. It documents a decision already made in the repository, not a proposal under discussion.

- `package.json` includes `better-auth`.
- `lib/auth/index.ts` creates a `betterAuth` instance, enables email/password authentication, configures session durations, and uses the Drizzle adapter with the `pg` provider.
- `lib/auth/client.ts` creates the React auth client and exposes sign-in, sign-up, session, user, and credential-management helpers.
- `app/api/auth/[...all]/route.ts` delegates `GET` and `POST` requests to the configured instance.

## Considered Options

- Better Auth is the implemented option.

<!-- TODO: add evaluated alternatives -->

## Decision Outcome

Chosen option: **Better Auth**, configured in `lib/auth/index.ts` and exposed through `lib/auth/client.ts` and the catch-all route.

## Consequences

### Positive

- Email/password authentication is explicitly enabled.
- The `admin` plugin is configured with `USER` as the default role and `ADMIN`/`DEVELOPER` as admin roles.
- The auth schema has users, sessions, account, and verifications tables.

### Negative

- The original rationale and alternative authentication choices were not recorded.

### Neutral

- Session values come from `features/auth/constants.ts`: seven-day expiry and one-day update age.
- The route file intentionally exposes the framework handler rather than separate local endpoint functions.
