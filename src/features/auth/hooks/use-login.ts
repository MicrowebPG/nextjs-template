'use client';

import { useCallback, useState } from 'react';
import { authClient } from '../lib/auth-client';

interface LoginInputs {
  email: string;
  password: string;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authClient.signIn.email(credentials);
      if (response.error) {
        throw new Error(response.error?.message || 'Login failed');
      }
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading, error };
}
