import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      email: string;
      username: string;
    };
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    username?: string;
  }
}
