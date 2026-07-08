import { headers } from 'next/headers';
import 'server-only';

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  return `${protocol}://${host}`;
}
