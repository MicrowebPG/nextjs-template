# Next.js 16 Template

A modern web application template built with Next.js 16, Better Auth for authentication, Prisma ORM (MySQL), Shadcn UI components, Husky for git hooks, and Commitizen for conventional commits.

## Tech Stack

- **Next.js**: React framework with Turbopack for blazing fast builds
- **React**: Latest React with improved performance
- **Better Auth**: Modern authentication library with email/password support
- **Prisma**: Type-safe ORM for MySQL with custom client generation
- **Shadcn UI**: Beautiful, accessible React components
- **Tailwind CSS**: Latest utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Lucide React**: Beautiful, customizable icons
- **Husky**: Git hooks for code quality
- **Commitizen**: Standardized commit messages

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MySQL database

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd nextjs-template

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MySQL DATABASE_URL
```

### Environment Variables

Create a `.env` file with the variables in `.env.example`.

### Prisma Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
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
- **Database Integration**: Seamless Prisma adapter for MySQL

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

### Prisma Configuration

- **Custom Client Path**: Generated to `generated/prisma/` for better organization
- **MySQL Provider**: Optimized for MySQL databases
- **Schema Models**: User, Session, Account, Verification tables
- **Role System**: Enum-based user roles (USER, ADMIN, DEVELOPER)

### Database Schema

The project includes the following models:

- **User**: Core user data with email, username, name, role, and email verification status
- **Session**: Session management with token, expiration, IP address, and user agent tracking
- **Account**: OAuth and password-based account management with token handling
- **Verification**: Email verification and password reset token management
- **Role Enum**: USER, ADMIN, DEVELOPER

## Code Quality & Commits

- **Husky**: Pre-commit hooks for linting and formatting
- **Commitizen**: Use `npm run commit` for conventional commit messages

## Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build for production with Turbopack
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run commit` — Start Commitizen CLI for conventional commits
- `npm run prepare` — Set up Husky git hooks
- `npm run clean` — Remove `.next` and `generated/prisma/` folders, clean npm cache and regenerate Prisma client

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
│   ├── lib/
│   │   ├── prisma.ts                      # Prisma client singleton
│   │   └── utils.ts                       # Utilities (cn, etc.)
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/
│   └── prisma/
│       ├── browser.ts
│       ├── client.ts
│       ├── commonInputTypes.ts
│       ├── enums.ts
│       ├── internal/
│       ├── models/
│       └── models.ts
├── public/                                # Static assets (SVGs)
├── components.json                        # Shadcn UI configuration
├── eslint.config.mjs                      # ESLint 9 flat config
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit with `npm run commit`
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request
