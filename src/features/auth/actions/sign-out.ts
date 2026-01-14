'use server';

import { auth } from '../lib/auth';

export async function serverSignOut() {
  const session = await auth.api.getSession({
    headers: {},
  });

  if (!session?.session) {
    throw new Error('No active session');
  }

  return await auth.api.signOut({
    headers: {},
  });
}
