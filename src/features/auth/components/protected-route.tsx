import { ReactNode } from 'react';
import { getServerSession } from '../lib/get-session';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export async function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const session = await getServerSession();

  if (!session?.session) {
    return fallback || <div>Unauthorized. Please log in.</div>;
  }

  return <>{children}</>;
}
