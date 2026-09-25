import type { User } from '@/db/types';
import { AppErrors } from '@/lib/errors/app-error';
import { findUserById } from '../repositories/users.repository';

export async function getUser(id: string): Promise<User> {
  const user = await findUserById(id);

  if (!user) throw AppErrors.notFound('User');

  return user;
}
