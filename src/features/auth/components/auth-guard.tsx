'use client';

import { ReactNode } from 'react';
import { useSession } from '../hooks/use-session';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export function AuthGuard({ children, fallback, loadingFallback }: AuthGuardProps) {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return loadingFallback || <div>Loading...</div>;
  }

  if (!session) {
    return fallback || <div>Unauthorized. Please log in.</div>;
  }

  return <>{children}</>;
}
