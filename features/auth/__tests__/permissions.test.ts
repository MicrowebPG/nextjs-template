import { roles } from '@/lib/auth/permissions';

describe('auth roles', () => {
  describe('USER role', () => {
    it('has no user management permissions', () => {
      expect(roles.USER.statements.user).toEqual([]);
    });

    it('has no session management permissions', () => {
      expect(roles.USER.statements.session).toEqual([]);
    });
  });

  describe('ADMIN role', () => {
    it('can manage users', () => {
      const permissions = roles.ADMIN.statements.user;
      expect(permissions).toContain('create');
      expect(permissions).toContain('delete');
      expect(permissions).toContain('ban');
      expect(permissions).toContain('set-role');
    });

    it('can manage sessions', () => {
      const permissions = roles.ADMIN.statements.session;
      expect(permissions).toContain('list');
      expect(permissions).toContain('revoke');
    });
  });

  describe('DEVELOPER role', () => {
    it('has the same permissions as ADMIN', () => {
      expect(roles.DEVELOPER.statements).toEqual(roles.ADMIN.statements);
    });
  });
});
