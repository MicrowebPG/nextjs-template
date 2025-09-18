# Next.js 15 Template

A modern web application template built with Next.js 15, AuthJS for authentication, Prisma ORM (MySQL), Shadcn UI components, Husky for git hooks, and Commitizen for conventional commits.

## Tech Stack

- **Next.js 15**: React framework for building fast, scalable web apps
- **AuthJS**: Authentication for Next.js (formerly NextAuth.js)
- **Prisma**: Type-safe ORM for MySQL
- **Shadcn UI**: Beautiful, accessible React components
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
git clone <repo-url>˚
cd nextjs-template

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MySQL credentials and AuthJS secrets
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
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

## Authentication

- AuthJS is configured in `src/auth.ts` and API routes under `src/app/api/auth/[...nextauth]/route.ts`.
- Update providers and secrets in `.env` as needed.

## UI Components

- Shadcn UI components are used throughout the app. See [shadcn/ui docs](https://ui.shadcn.com/) for usage and customization.

## Code Quality & Commits

- **Husky**: Pre-commit hooks for linting and formatting
- **Commitizen**: Use `npm run commit` for conventional commit messages

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run commit` — Start Commitizen CLI

## Project Structure

```
├── src/
│   ├── app/         # Next.js app directory
│   ├── lib/         # Utility functions
│   ├── types/       # Type definitions
│   ├── auth.ts      # AuthJS config
│   └── middleware.ts# Middleware
├── prisma/
│   └── schema.prisma# Prisma schema
├── public/          # Static assets
├── package.json     # Project metadata & scripts
├── README.md        # Project documentation
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit with `npm run commit`
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request
