import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { Role } from '../../generated/prisma/enums';
import { ac, roles } from './permissions';
import prisma from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
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
