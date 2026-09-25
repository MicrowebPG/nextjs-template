# Operations

## Variables in `.env.example`

| Variable             | Example                                           | Code evidence and handling                                                                                                                                       |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | `postgresql://user:password@host:port/mydatabase` | `db/index.ts` passes it to Drizzle, and `drizzle.config.ts` passes it to Drizzle Kit. Both use a non-null assertion and have no fallback.                        |
| `BETTER_AUTH_URL`    | `http://localhost:3000`                           | Better Auth reads this as its base URL; the app does not pass a `baseURL` option in `lib/auth/index.ts`.                                                         |
| `BETTER_AUTH_SECRET` | `your-secret-key`                                 | Better Auth reads this as its auth secret; replace the placeholder outside local examples. The installed package rejects a missing/default secret in production. |

`db/index.ts` and `drizzle.config.ts` both import `dotenv/config`, so the local `.env` file is loaded by those modules. `.env` and `.env.local` are ignored by Git.

## Detectable development setup

- `.env.example` uses `http://localhost:3000` for `BETTER_AUTH_URL`.
- `pnpm dev` starts the Next.js development server with Turbopack.
- `pnpm build` creates the production build and `pnpm start` starts it.
- No `.env.staging`, `.env.production`, deployment manifest, or environment-specific configuration is present in the inspected tree.

<!-- TODO: document staging and production variable sources, secret rotation, and database differences when those environments are defined. -->

## CI/CD

No `.github/` workflow files are present in the inspected repository. The current checks are local Husky hooks; there is not yet a repository CI pipeline or deployment configuration to document.

### Local hooks

| Hook                | Command                          | Result                                                     |
| ------------------- | -------------------------------- | ---------------------------------------------------------- |
| `.husky/pre-commit` | `pnpm exec lint-staged`          | Runs the staged-file rules in `.lintstagedrc.mjs`.         |
| `.husky/commit-msg` | `pnpm exec commitlint --edit $1` | Validates the commit message against `.commitlintrc.json`. |
| `.husky/pre-push`   | `pnpm test`, then `pnpm build`   | Runs the Vitest script and the production build.           |

`pnpm prepare` runs `husky`; the hook files above are the checked-in local automation.

The staged-file rules are summarized in [Engineering](engineering.md). In particular, TypeScript changes run `tsc --noEmit`, JavaScript/TypeScript changes run OXLint and OXFmt, and JSON/Markdown/CSS/SCSS changes run OXFmt.

<!-- TODO: add the CI workflow, required checks, and deployment steps when a pipeline is introduced. -->
