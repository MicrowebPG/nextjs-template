import { headers } from 'next/headers';
import 'server-only';

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host');

  if (!host) {
    throw new Error('Missing "host" header; cannot determine base URL');
  }

  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  return `${protocol}://${host}`;
}
