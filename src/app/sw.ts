/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultCache } from '@serwist/turbopack/worker';
import { NetworkOnly, Serwist, type PrecacheEntry } from 'serwist';

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    { matcher: ({ request }) => request.mode === 'navigate', handler: new NetworkOnly() },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [{ url: '/_offline', matcher: ({ request }) => request.destination === 'document' }],
  },
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  const { title, body, icon, url } = event.data.json() as {
    title: string;
    body?: string;
    icon?: string;
    url?: string;
  };
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      vibrate: [100, 50, 100],
      data: { url },
    } as NotificationOptions & { vibrate: number[] }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow((event.notification.data as { url?: string })?.url ?? '/'),
  );
});

serwist.addEventListeners();
