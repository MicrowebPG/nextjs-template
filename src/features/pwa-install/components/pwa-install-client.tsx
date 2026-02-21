'use client';
import dynamic from 'next/dynamic';

export const PwaInstallPrompt = dynamic(
  () => import('./pwa-install-prompt').then((m) => m.PwaInstallPrompt),
  { ssr: false },
);
