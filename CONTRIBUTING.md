# Contributing to Next.js 16 Template

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- Node.js >= 18
- npm
- PostgreSQL database
- Git

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/nextjs-template.git
cd nextjs-template
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your PostgreSQL DATABASE_URL
npx drizzle-kit push
```

### 3. Create a Branch

Follow **Conventional Branches** naming (see below):

```bash
git checkout -b feature/my-new-feature
git checkout -b fix/my-bug-fix
git checkout -b docs/update-readme
```

## Conventional Branches

Branch names follow this format: `<type>/<description>`

### Type

- **feature/** — New feature or enhancement

  ```bash
  git checkout -b feature/user-authentication
  git checkout -b feature/dark-mode-support
  ```

- **fix/** — Bug fix

  ```bash
  git checkout -b fix/login-redirect-issue
  git checkout -b fix/type-error-in-auth
  ```

- **docs/** — Documentation updates

  ```bash
  git checkout -b docs/api-guide
  git checkout -b docs/setup-instructions
  ```

- **refactor/** — Code refactoring (no functional changes)

  ```bash
  git checkout -b refactor/auth-middleware
  git checkout -b refactor/database-layer
  ```

- **test/** — Test additions or fixes

  ```bash
  git checkout -b test/auth-coverage
  git checkout -b test/api-endpoints
  ```

- **chore/** — Build, deps, config, CI/CD (no code change)
  ```bash
  git checkout -b chore/update-dependencies
  git checkout -b chore/fix-lint-config
  ```

### Description

- Use lowercase
- Use hyphens to separate words
- Be concise and descriptive
- Examples: `feature/add-user-roles`, `fix/session-expiry`

## Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.

> **💡 Tip:** Use `npm run commit` instead of `git commit` to create commits interactively.
> This ensures your commits follow the conventional format automatically.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Using the CLI Helper

Instead of `git commit`, always use:

```bash
npm run commit
```

This launches **czg** — an interactive CLI that guides you through the commit structure step-by-step:

1. Select the commit type (feat, fix, docs, etc.)
2. Choose the scope (auth, db, ui, etc.)
3. Write a subject line
4. Add an optional description
5. Confirm breaking changes (if any)

Your commit message is then validated by **Commitlint** to ensure it follows conventions.

### Type

- **feat:** A new feature

  ```
  feat(auth): add two-factor authentication
  feat(ui): add dark mode toggle
  ```

- **fix:** A bug fix

  ```
  fix(auth): prevent session hijacking
  fix(db): correct user role assignment
  ```

- **docs:** Documentation changes

  ```
  docs: update API endpoints guide
  docs(readme): clarify setup steps
  ```

- **style:** Code style changes (formatting, semicolons, etc.) — **no functional change**

  ```
  style: reformat auth module with prettier
  ```

- **refactor:** Code refactoring — **no feature or bug fix**

  ```
  refactor(auth): simplify session logic
  refactor(db): extract query utilities
  ```

- **test:** Add or update tests

  ```
  test(auth): add login flow tests
  test(permissions): improve coverage
  ```

- **chore:** Build, deps, config, CI/CD

  ```
  chore(deps): update Next.js to 16.1.0
  chore(ci): add coverage threshold
  ```

- **perf:** Performance improvements
  ```
  perf(db): add query indexing
  ```

### Scope (optional)

Scope indicates what part of the codebase is affected:

- `auth` — Authentication module
- `db` — Database and ORM
- `ui` — UI components and styling
- `api` — API routes and handlers
- `config` — Configuration files
- `ci` — CI/CD pipelines

### Subject

- Start with lowercase (unless it's a proper noun)
- Use imperative mood: "add" not "added" or "adds"
- Don't end with a period
- Max 50 characters
- Examples:
  - ✅ `feat(auth): add password reset flow`
  - ❌ `feat(auth): Added password reset flow`
  - ❌ `feat(auth): Adds password reset flow`
  - ❌ `feat(auth): password reset flow implemented.`

### Body (optional)

Explain what and why, not how:

```
feat(auth): add email verification

Users can now verify their email address before account activation.
This improves security by preventing bot registrations.

Implements email verification token generation and expiration.
```

### Footer (optional)

Reference issues or breaking changes:

```
fix(auth): prevent concurrent session creation

Fixes #123

BREAKING CHANGE: Sessions are now limited to one per user.
Existing multi-session workflows will need adjustment.
```

## Pull Requests

### 1. Before Creating a PR

- ✅ Run tests locally

  ```bash
  npm run test
  ```

- ✅ Lint and format your code

  ```bash
  npm run lint
  npm run fmt
  ```

- ✅ Verify Husky hooks pass

  ```bash
  npm run prepare
  git commit -m "feat: test commit"  # Will run linting and tests
  ```

- ✅ Pull latest `main` and resolve conflicts
  ```bash
  git fetch origin
  git rebase origin/main
  ```

### 2. Push and Create PR

```bash
git push origin feature/my-new-feature
```

Then open a Pull Request on GitHub.

### 3. PR Title and Description

**Title** — Follow Conventional Commits format:

```
feat(auth): add two-factor authentication
fix(db): correct user role assignment
docs: update contributing guide
```

**Description** — Use this template:

```markdown
## Summary

Brief description of what this PR does (1-3 sentences).

## Changes

- What was changed
- Why it was changed
- How it addresses the issue

## Testing

- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Tested locally (describe how)

## Checklist

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Docs updated if needed
- [ ] Conventional commits used
```

### 4. Review Process

- Maintainers will review for:
  - Code quality and style
  - Test coverage
  - Documentation
  - Conventional commits/branches

- Make requested changes and push again (no new PR needed)

- Once approved, the PR will be squash-merged to `main`

## Code Quality

### Linting

```bash
npm run lint
```

Uses **OXLint** (Rust-based, fast linter).

### Formatting

```bash
npm run fmt
```

Uses **OXFmt** (Rust-based formatter).

### Testing

```bash
npm run test         # Watch mode
npm run test:coverage # Generate coverage report
```

Uses **Vitest**. Aim for >80% coverage on new code.

### Git Hooks (Husky)

Hooks run automatically:

- **pre-commit** — Lints and formats staged files
- **pre-push** — Runs tests and builds the project

If a hook fails, fix the issue and try again:

```bash
npm run lint
npm run fmt
git add .
git commit -m "..."
```

## Questions?

Open an issue or discuss in PRs. We're here to help!

---

**Happy contributing!** 🚀
