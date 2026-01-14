'use client';

import { ReactNode } from 'react';
import { getSessionServer } from '../actions/get-session';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export async function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const session = await getSessionServer();

  if (!session?.session) {
    return fallback || <div>Unauthorized. Please log in.</div>;
  }

  return <>{children}</>;
}
