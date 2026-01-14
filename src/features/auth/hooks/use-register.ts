'use client';

import { useCallback, useState } from 'react';
import { authClient } from '../lib/auth-client';
import type { RegisterInput } from '../schemas/register.schema';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (credentials: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authClient.signUp.email(credentials);
      if (response.error) {
        throw new Error(response.error?.message || 'Registration failed');
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

  return { register, isLoading, error };
}
