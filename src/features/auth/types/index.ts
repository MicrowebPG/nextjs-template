import type { auth } from '../lib/auth';

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}
