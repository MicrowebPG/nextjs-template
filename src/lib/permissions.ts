import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements, userAc } from 'better-auth/plugins/admin/access';

const statements = {
  ...defaultStatements,
  // For Example : posts: ['create', 'read', 'update', 'delete', 'update:own', 'delete:own'],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  USER: ac.newRole({
    ...userAc.statements,
  }),

  ADMIN: ac.newRole({
    ...adminAc.statements,
  }),

  DEVELOPER: ac.newRole({
    ...adminAc.statements,
  }),
};
