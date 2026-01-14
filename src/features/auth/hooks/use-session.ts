'use client';

import { useCallback, useEffect, useState } from 'react';
import { authClient } from '../lib/auth-client';
import type { Session } from '../types';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setError(null);
        const response = await authClient.getSession();
        setSession(response.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch session';
        setError(message);
        console.error('Failed to fetch session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      await authClient.signOut();
      setSession(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      console.error('Failed to sign out:', err);
    }
  }, []);

  return { session, isLoading, error, signOut };
}
