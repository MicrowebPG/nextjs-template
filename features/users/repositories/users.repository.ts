import { eq } from 'drizzle-orm';
import type { User } from '@/db/types';
import { db } from '@/db';
import { user } from '@/db/schema';

export async function findUserById(id: string): Promise<User | undefined> {
  const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);
  return row;
}
