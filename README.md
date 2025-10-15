# Next.js 15 Template

A modern web application template built with Next.js 15, Better Auth for authentication, Prisma ORM (MySQL), Shadcn UI components, Husky for git hooks, and Commitizen for conventional commits.

## Tech Stack

- **Next.js 15**: React framework with Turbopack for blazing fast builds
- **Better Auth**: Modern authentication library with email/password support
- **Prisma**: Type-safe ORM for MySQL with custom client generation
- **Shadcn UI**: Beautiful, accessible React components (New York style)
- **Tailwind CSS v4**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
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

Create a `.env` file with the following variables:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
BETTER_AUTH_SECRET="your-secret-key-here"
```

### Prisma Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
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
- **Middleware Protection**: Route protection based on authentication and roles
- **Database Integration**: Seamless Prisma adapter for MySQL

### Authentication Setup

- Better Auth is configured in `src/lib/auth.ts`
- Client-side auth utilities in `src/lib/auth-client.ts`
- API routes under `src/app/api/auth/[...all]/route.ts`
- Route protection middleware in `src/middleware.ts`

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

- **User**: Core user data with email, username, password, and role
- **Session**: Session management with expiration and device tracking
- **Account**: External account linking support
- **Verification**: Email verification and password reset tokens

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

## Project Structure

```
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/  # Better Auth API routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts            # Better Auth server config
│   │   ├── auth-client.ts     # Better Auth client config
│   │   ├── get-session.ts     # Session utilities
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # General utilities
│   └── middleware.ts          # Route protection middleware
├── prisma/
│   └── schema.prisma          # Prisma schema with Better Auth models
├── generated/
│   └── prisma/                # Generated Prisma client
├── public/                    # Static assets
├── components.json            # Shadcn UI configuration
├── package.json               # Project dependencies & scripts
└── README.md                  # Project documentation
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit with `npm run commit`
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request
