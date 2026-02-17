'use client';

import { useState } from 'react';
import { signIn, signUp } from '../lib/auth-client';

export const AuthForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message ?? 'Login failed');
    }
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    const { error } = await signUp.email({ email, password, name: email, username: email });
    setLoading(false);
    if (error) {
      setError(error.message ?? 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 p-2"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
          >
            Accedi
          </button>
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="flex-1 rounded-lg border border-blue-500 px-4 py-2 font-semibold text-blue-500 transition hover:bg-blue-50 disabled:opacity-50"
          >
            Registrati
          </button>
        </div>
      </div>
    </div>
  );
};
