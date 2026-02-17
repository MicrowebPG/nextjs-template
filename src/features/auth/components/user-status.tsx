'use client';

import { signOut, useSession } from '../lib/auth-client';

export const UserStatus = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <span className="font-medium text-gray-700">
        Ciao, <strong>{session.user.name}</strong>
      </span>
      <button
        onClick={() => signOut()}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
