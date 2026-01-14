import prisma from '@/lib/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { Role } from '../../../../generated/prisma/enums';
import { AUTH_SESSION_UPDATE_AGE, AUTH_TOKEN_EXPIRY } from '../constants';
import { ac, roles } from './permissions';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  session: {
    expiresIn: AUTH_TOKEN_EXPIRY,
    updateAge: AUTH_SESSION_UPDATE_AGE,
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: ['ADMIN', 'DEVELOPER', 'USER'],
        input: false,
      },
    },
  },
  plugins: [
    admin({
      ac,
      defaultRole: Role.USER,
      adminRoles: [Role.ADMIN, Role.DEVELOPER],
      roles,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
