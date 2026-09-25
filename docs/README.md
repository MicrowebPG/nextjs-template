# Documentation

The repository README remains the project entry point. This page indexes the deeper documentation in its intended reading order.

## Purpose

- A reusable web application template for the agency's web projects.
- A starting point for internal developers, not a finished product.
- `app/page.tsx` is a starter session-status screen rather than a product surface.

<!-- TODO: define product-specific requirements when a project is created from this template. -->

## Contents

1. [Architecture](architecture.md) — runtime, feature layers, request flow, data model
2. [Engineering](engineering.md) — setup, conventions, tests, adding a feature
3. [Operations](operations.md) — environment variables, local hooks, CI status
4. [Authentication](features/auth.md)
5. Architecture decisions:
   - [ADR template](adr/template.md)
   - [0001 — Drizzle ORM](adr/0001-use-drizzle-over-prisma.md)
   - [0002 — Better Auth](adr/0002-use-better-auth.md)
   - [0003 — Service/repository pattern](adr/0003-service-repository-pattern.md)
