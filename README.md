# Next.js 16 Template

A modern web application template built with Next.js 16, Better Auth for authentication, Drizzle ORM (PostgreSQL), Husky for git hooks, and Commitlint for enforcing conventional commits.

## Tech Stack

- **Next.js**: React framework with Turbopack for blazing fast builds
- **React**: Latest React with improved performance
- **Better Auth**: Modern authentication library with email/password support
- **Drizzle ORM**: Lightweight, type-safe ORM for PostgreSQL
- **Tailwind CSS**: Latest utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **OXLint / OXFmt**: Fast Rust-based linter and formatter
- **Vitest**: Fast unit test framework with great DX
- **Husky**: Git hooks for code quality
- **Commitlint**: Enforces conventional commit message standards

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL database

### Installation

```bash
npx create-next-app@latest --example "https://github.com/MicrowebPG/nextjs-template" my-app
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL DATABASE_URL
```

### Environment Variables

Create a `.env` file with the variables in `.env.example`.

### Drizzle Setup

```bash
# Push schema to the database
npx drizzle-kit push

# Or generate and run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Running the App

```bash
# Development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start
```

App will be available at [http://localhost:3000](http://localhost:3000)

## Authentication

This project uses **Better Auth** for authentication with the following features:

- **Email/Password Authentication**: Built-in support for email and password login
- **Role-Based Access Control**: Three user roles - USER, ADMIN, DEVELOPER
- **Session Management**: Secure sessions with 7-day expiry and daily updates
- **Database Integration**: Drizzle adapter for PostgreSQL

### Authentication Setup

- Better Auth is configured in `lib/auth/index.ts`
- Client-side auth utilities in `lib/auth/client.ts`
- API routes under `app/api/auth/[...all]/route.ts`

### Adding a Component Library

This template ships without a component library to keep things flexible. You can plug in whichever one fits your project best, for example:

- [shadcn/ui](https://ui.shadcn.com/) — Copy-paste components built on Radix UI and Tailwind
- [Radix UI](https://www.radix-ui.com/) — Unstyled, accessible primitives
- [Mantine](https://mantine.dev/) — Full-featured React components
- [Headless UI](https://headlessui.com/) — Accessible, unstyled components from the Tailwind team
- [Chakra UI](https://chakra-ui.com/) — Component library with a built-in design system

The `cn()` utility in `lib/utils.ts` (powered by `clsx` + `tailwind-merge`) is already in place and compatible with most Tailwind-based libraries.

## API Utilities

- **`withErrorHandling`** (`lib/api/handle-route.ts`): Wraps a route handler and converts thrown `AppError` instances into JSON error responses with the correct status code.
- **`AppError`** (`lib/errors/app-error.ts`): Base error class plus `DuplicateResourceError`, `UnauthorizedError`, `NotFoundError`, and `ValidationError` subclasses, along with an `isUniqueConstraintViolation()` helper for detecting Postgres unique-constraint violations.
- **`getBaseUrl`** (`lib/api/base-url.ts`): Resolves the request's base URL (protocol + host) from headers, for use in server components and route handlers.

## Architecture

Features are organized by domain under `features/<feature>/`, each split into three layers with a single direction of dependency: **API route → service → repository**.

- **Repositories** (`features/<feature>/repositories/`): The only layer allowed to import `db` and query Drizzle tables. A repository knows how to read and write rows — it has no business rules and returns plain data (typed via `db/types.ts`).
- **Services** (`features/<feature>/services/`): Own the business logic. A service calls one or more repositories, enforces rules (uniqueness, permissions, invariants), and is the only layer allowed to `throw` an `AppError` subclass. Services are framework-agnostic — no `NextRequest`/`NextResponse`, no `headers()`.
- **API routes** (`app/api/**/route.ts`): Thin adapters between HTTP and a service. A route parses/validates the request, calls a service, and shapes the response. Wrap every handler with `withErrorHandling` so a thrown `AppError` is turned into the right JSON error response automatically — routes should not `try/catch` themselves.

```
features/
└── <feature>/
    ├── repositories/
    │   └── <feature>.repository.ts   # db queries only
    ├── services/
    │   └── <feature>.service.ts      # business logic, throws AppError
```

A route should never query `db` directly, and a repository should never throw an `AppError` — keep each layer talking only to the one below it.

## Database & ORM

### Drizzle Configuration

- **Dialect**: PostgreSQL (`pg` driver)
- **Schema Location**: `db/schema/`
- **Migrations Output**: `drizzle/`
- **Config File**: `drizzle.config.ts`

### Database Schema

The project includes the following tables:

- **users**: Core user data with email, username, name, role, and email verification status
- **sessions**: Session management with token, expiration, IP address, and user agent tracking
- **account**: OAuth and password-based account management with token handling
- **verifications**: Email verification and password reset token management
- **Role Enum**: USER, ADMIN, DEVELOPER

## Code Quality & Testing

### Linting & Formatting

- **OXLint**: Fast Rust-based linter (`npm run lint`)
- **OXFmt**: Fast Rust-based formatter (`npm run fmt`)
- **Husky**: Pre-commit hooks for linting and formatting
- **Commitlint**: Use `npm run commit` for conventional commit messages

### Testing

- **Vitest**: Fast unit test framework with great developer experience
  - Run tests: `npm run test`
  - Run tests in watch mode: `npm run test:watch`
  - Generate coverage report: `npm run test:coverage`

## Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build for production with Turbopack
- `npm run start` — Start production server
- `npm run lint` — Run OXLint
- `npm run fmt` — Run OXFmt formatter
- `npm run test` — Run Vitest tests
- `npm run test:watch` — Run Vitest in watch mode
- `npm run test:coverage` — Generate test coverage report
- `npm run commit` — Start Commitlint CLI for conventional commits
- `npm run prepare` — Set up Husky git hooks
- `npm run clean` — Remove `.next` folder and clean npm cache
- `npm run db:types` — Generate TypeScript types from the database schema
- `npm run db:generate` — Generate database schema
- `npm run db:migrate` — Run database migrations
- `npm run db:push` — Push database schema changes to the database
- `npm run db:pull` — Pull database schema changes from the database
- `npm run db:studio` — Open Drizzle Studio

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit with `npm run commit`
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request
