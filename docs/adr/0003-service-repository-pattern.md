# ADR-0003: Use a service and repository boundary for features

- **Status:** Accepted (retroactive)
- **Date:** 2026-09-25 (documentation date)
- **Deciders:** Not recorded

<!-- TODO: add original deciders -->

## Context

This is a retroactive ADR. It documents a decision already stated in the repository, not a proposal under discussion.

- The README defines a one-way custom-feature dependency rule: API route → service → repository.
- Repositories are described as the only custom-feature layer allowed to query `db`; services own business rules and `AppError` instances; routes are thin HTTP adapters.
- The current tree has no custom `features/<feature>/repositories/` or `features/<feature>/services/` implementation. `features/auth/` contains constants and tests, while Better Auth is configured under `lib/auth/`.

## Considered Options

- The repository/service/route split is the implemented convention.

<!-- TODO: add evaluated alternatives -->

## Decision Outcome

Chosen option: **Keep custom feature dependencies one-way from API route to service to repository**.

## Consequences

### Positive

- Database access, business rules, and HTTP concerns have separate homes.
- `withErrorHandling` and the `AppErrors` factories provide the route error boundary expected by the convention.

### Negative

- A new feature needs explicit layer files and discipline; the current auth integration is not a local example of that split.

### Neutral

- `db/types.ts` supplies plain row types to repositories and services.
- The Better Auth catch-all route delegates to `auth` and does not pass through local service or repository functions.
