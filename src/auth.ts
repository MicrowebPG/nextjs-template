import bcrypt from 'bcrypt';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '../generated/prisma';

export class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new CustomAuthError('Missing username or password');
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { username: username },
        });

        if (!user || !user.password) {
          throw new CustomAuthError('Utente non trovato');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new CustomAuthError('Password errata');
        }

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      // Al primo login, copia i dati dell'utente nel token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
      }

      // Quando viene chiamato update(), i nuovi dati arrivano nel parametro session
      if (trigger === 'update' && session) {
        // I dati aggiornati sono in session
        token.name = session.name ?? token.name;
        token.surname = session.surname ?? token.surname;
        token.email = session.email ?? token.email;
        token.username = session.username ?? token.username;
        token.role = session.role ?? token.role;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          surname: token.surname,
          username: token.username,
          role: token.role,
        },
      };
    },
  },
});
