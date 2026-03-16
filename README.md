# Next.js 16 Template

A modern web application template built with Next.js 16, Better Auth for authentication, Drizzle ORM (PostgreSQL), Shadcn UI components, Husky for git hooks, and Commitlint for enforcing conventional commits.

## Tech Stack

- **Next.js**: React framework with Turbopack for blazing fast builds
- **React**: Latest React with improved performance
- **Better Auth**: Modern authentication library with email/password support
- **Drizzle ORM**: Lightweight, type-safe ORM for PostgreSQL
- **Shadcn UI**: Beautiful, accessible React components
- **Tailwind CSS**: Latest utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Lucide React**: Beautiful, customizable icons
- **OXLint / OXFmt**: Fast Rust-based linter and formatter
- **Husky**: Git hooks for code quality
- **Commitlint**: Enforces conventional commit message standards

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd nextjs-template

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

- Better Auth is configured in `src/features/auth/lib/auth.ts`
- Client-side auth utilities in `src/features/auth/lib/auth-client.ts`
- API routes under `src/app/api/auth/[...all]/route.ts`

## UI Components

- **Shadcn UI**: Modern component library with New York styling
- **Tailwind CSS v4**: Latest version with enhanced performance
- **Lucide React**: Beautiful, customizable icons
- **Responsive Design**: Mobile-first approach with modern layouts

## Database & ORM

### Drizzle Configuration

- **Dialect**: PostgreSQL (`pg` driver)
- **Schema Location**: `src/db/schema/`
- **Migrations Output**: `drizzle/`
- **Config File**: `drizzle.config.ts`

### Database Schema

The project includes the following tables:

- **users**: Core user data with email, username, name, role, and email verification status
- **sessions**: Session management with token, expiration, IP address, and user agent tracking
- **account**: OAuth and password-based account management with token handling
- **verifications**: Email verification and password reset token management
- **Role Enum**: USER, ADMIN, DEVELOPER

## Code Quality & Commits

- **OXLint**: Fast Rust-based linter (`npm run lint`)
- **OXFmt**: Fast Rust-based formatter (`npm run fmt`)
- **Husky**: Pre-commit hooks for linting and formatting
- **Commitlint**: Use `npm run commit` for conventional commit messages

## Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build for production with Turbopack
- `npm run start` — Start production server
- `npm run lint` — Run OXLint
- `npm run fmt` — Run OXFmt formatter
- `npm run commit` — Start Commitlint CLI for conventional commits
- `npm run prepare` — Set up Husky git hooks
- `npm run clean` — Remove `.next` folder and clean npm cache

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts           # Better Auth handler
│   │   ├── globals.css                    # Global styles
│   │   ├── layout.tsx                     # Root layout
│   │   └── page.tsx                       # Home page
│   ├── db/
│   │   ├── index.ts                       # Drizzle client
│   │   ├── utils.ts                       # DB utilities (timestamps, etc.)
│   │   └── schema/
│   │       ├── auth.ts                    # Auth-related tables & enums
│   │       └── index.ts                   # Schema barrel export
│   ├── features/
│   │   └── auth/                          # Authentication feature module
│   │       ├── components/
│   │       │   └── protected-route.tsx
│   │       ├── lib/
│   │       │   ├── auth-client.ts
│   │       │   ├── auth.ts
│   │       │   ├── get-session.ts
│   │       │   └── permissions.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       ├── constants.ts
│   │       └── index.ts
│   └── lib/
│       └── utils.ts                       # Utilities (cn, etc.)
├── drizzle/                               # Generated migrations
│   └── meta/
├── public/                                # Static assets
├── components.json                        # Shadcn UI configuration
├── drizzle.config.ts                      # Drizzle Kit configuration
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit with `npm run commit`
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request
