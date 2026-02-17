'use client';

import { useEffect } from 'react';

const SERVICE_WORKER_PATH = '/sw.js';

/**
 * Registers the service worker once on mount.
 * Renders nothing — just handles registration as a side effect.
 */
export function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(SERVICE_WORKER_PATH).catch(console.error);
    }
  }, []);

  return null;
}
