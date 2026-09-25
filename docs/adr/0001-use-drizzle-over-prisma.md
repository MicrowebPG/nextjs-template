# ADR-0001: Use Drizzle ORM instead of Prisma

- **Status:** Accepted (retroactive)
- **Date:** 2026-09-25 (documentation date)
- **Deciders:** Not recorded

<!-- TODO: add original deciders -->

## Context

This is a retroactive ADR. It documents a decision already made in the repository, not a proposal under discussion.

- `package.json` includes `drizzle-orm`, `drizzle-kit`, and `pg`; it does not include Prisma.
- `drizzle.config.ts` selects the `postgresql` dialect, reads `DATABASE_URL`, uses `db/schema` as the schema source, and writes migrations to `drizzle`.
- `db/schema/`, `drizzle/0000_init.sql`, `db/types.ts`, and the `db:*` scripts are present.

## Considered Options

- Drizzle ORM is the implemented option.

<!-- TODO: add evaluated alternatives -->

## Decision Outcome

Chosen option: **Drizzle ORM with Drizzle Kit and PostgreSQL**.

## Consequences

### Positive

- PostgreSQL schema definitions live in `db/schema/`.
- `pnpm db:push`, `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:pull`, and `pnpm db:studio` are available.
- `pnpm db:types` regenerates inferred row and insert types in `db/types.ts`.

### Negative

- The original rationale and any Prisma comparison were not retained in the repository.

### Neutral

- `drizzle.config.ts` centralizes the schema path, migration output, dialect, and database URL.
