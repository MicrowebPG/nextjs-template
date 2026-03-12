import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db } from '@/db';
import { AUTH_SESSION_UPDATE_AGE, AUTH_TOKEN_EXPIRY } from '../constants';
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
        type: ['ADMIN', 'DEVELOPER', 'USER'],
        input: false
      }
    }
  },
  plugins: [
    admin({
      ac,
      defaultRole: 'USER',
      adminRoles: ['ADMIN', 'DEVELOPER'],
      roles
    })
  ]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
