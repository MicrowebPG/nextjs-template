export const DB_FEATURES = [
  {
    title: 'Type-safe queries',
    desc: 'Full TypeScript inference from schema definition to query result.'
  },
  {
    title: 'PostgreSQL native',
    desc: 'Direct pg driver — no abstraction layers standing in the way.'
  },
  {
    title: 'Schema-driven',
    desc: 'Define your schema in TypeScript, then push or generate migrations.'
  },
  {
    title: 'Zero overhead',
    desc: 'Drizzle compiles to raw SQL at build time. No runtime query builder penalty.'
  }
];

export const SCHEMA_LINES: { text: string; accent?: boolean; dim?: boolean }[] = [
  { text: '// src/db/schema/auth.ts', dim: true },
  { text: '' },
  { text: 'export const roleEnum = pgEnum(' },
  { text: '  "role", ["USER", "ADMIN", "DEV"]', accent: true },
  { text: ');' },
  { text: '' },
  { text: 'export const users = pgTable("users", {' },
  { text: '  id: text("id").primaryKey(),' },
  { text: '  email: text("email").notNull().unique(),', accent: true },
  { text: '  username: text("username").notNull(),' },
  { text: '  name: text("name").notNull(),' },
  { text: '  role: roleEnum("role").default("USER"),', accent: true },
  { text: '  emailVerified: boolean("email_verified")' },
  { text: '    .default(false),' },
  { text: '  ...timestamps,' },
  { text: '});' }
];
