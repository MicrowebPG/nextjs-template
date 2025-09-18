import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      email: string;
      username: string;
      role?: 'USER' | 'ADMIN' | 'DEVELOPER';
    };
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string;
    role?: 'USER' | 'ADMIN' | 'DEVELOPER';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    username?: string;
    role?: 'USER' | 'ADMIN' | 'DEVELOPER';
  }
}
