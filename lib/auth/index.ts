import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db } from '@/db';
import {
  ADMIN_ROLES,
  AUTH_SESSION_UPDATE_AGE,
  AUTH_TOKEN_EXPIRY,
  DEFAULT_ROLE,
  ROLES
} from '@/features/auth/constants';
import { ac, roles } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true
  }),
  session: {
    expiresIn: AUTH_TOKEN_EXPIRY,
    updateAge: AUTH_SESSION_UPDATE_AGE
  },
  emailAndPassword: {
    enabled: true
  },
  user: {
    deleteUser: {
      enabled: true
    },
    additionalFields: {
      role: {
        type: [...ROLES],
        input: false
      }
    }
  },
  plugins: [
    admin({
      ac,
      defaultRole: DEFAULT_ROLE,
      adminRoles: [...ADMIN_ROLES],
      roles
    })
  ]
});

export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
