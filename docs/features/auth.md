# Authentication

## Configuration

- Server configuration lives in `lib/auth/index.ts` and uses `betterAuth`.
- Persistence uses `drizzleAdapter(db, { provider: 'pg', usePlural: true })`.
- Email/password authentication is enabled.
- User deletion is enabled.
- The additional `role` field accepts `ADMIN`, `DEVELOPER`, or `USER`; its Better Auth `input` setting is `false`.
- The `admin` plugin uses `USER` as `defaultRole` and treats `ADMIN` and `DEVELOPER` as admin roles.

## Role rules

| Role        | Definition in `lib/auth/permissions.ts` | Repository tests document                                                    |
| ----------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| `USER`      | `userAc.statements`                     | No user-management or session-management statements.                         |
| `ADMIN`     | `adminAc.statements`                    | User `create`, `delete`, `ban`, and `set-role`; session `list` and `revoke`. |
| `DEVELOPER` | `adminAc.statements`                    | The same statement set as `ADMIN`.                                           |

The same three values are the PostgreSQL `role` enum in `db/schema/auth.ts`.

## Session rules

- `AUTH_TOKEN_EXPIRY` is `60 * 60 * 24 * 7` seconds (7 days).
- `AUTH_SESSION_UPDATE_AGE` is `60 * 60 * 24` seconds (1 day).
- `lib/auth/index.ts` passes both values to Better Auth's `session` configuration.

## `app/api/auth/[...all]/route.ts`

This file has no named endpoint functions. It exports only the `POST` and `GET` handlers returned by `toNextJsHandler(auth)`:

| Export | Local behavior                                                               |
| ------ | ---------------------------------------------------------------------------- |
| `GET`  | Passes a GET request under `/api/auth/*` to the configured `auth` instance.  |
| `POST` | Passes a POST request under `/api/auth/*` to the configured `auth` instance. |

`lib/auth/client.ts` exposes these client operations: `signUp`, `signIn`, `signOut`, `useSession`, `sendVerificationEmail`, `updateUser`, `deleteUser`, `changePassword`, and `changeEmail`. They are client helpers; the route file delegates their transport to Better Auth rather than defining separate local handlers.

For server reads, `lib/auth/session.ts` exports cached `getServerSession()`, which calls `auth.api.getSession` with the request headers. `app/page.tsx` uses it to show the current session state.

## Current boundary

`features/auth/` currently contains `constants.ts` and focused tests for the constants and roles. The access-control implementation is in `lib/auth/permissions.ts`; there are currently no auth repositories, services, or custom auth routes.

<!-- TODO: document concrete Better Auth subpaths and email delivery setup when those are explicitly configured in the app. -->
