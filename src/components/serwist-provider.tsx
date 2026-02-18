'use client';

import { SerwistProvider as BaseSerwistProvider } from '@serwist/turbopack/react';

export function SerwistProvider({ swUrl }: { swUrl: string }) {
  return <BaseSerwistProvider swUrl={swUrl} />;
}
