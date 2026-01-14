export { useLogin } from './hooks/use-login';
export { useRegister } from './hooks/use-register';
export { useSession } from './hooks/use-session';

export { AuthGuard } from './components/auth-guard';
export { ProtectedRoute } from './components/protected-route';

export { getSessionServer } from './actions/get-session';
export { serverSignOut } from './actions/sign-out';

export type { AuthContextType, Session, User } from './types';

export type { LoginInput, LoginSchema } from './schemas/login.schema';
export type { RegisterInput, RegisterSchema } from './schemas/register.schema';

export * from './constants';
