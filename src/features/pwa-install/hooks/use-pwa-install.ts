'use client';

import { useState, useEffect, useCallback } from 'react';
import { detectPlatform, Platform } from '../lib/platform';
import { instructions, PlatformInstructions } from '../lib/instructions';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface UsePwaInstallOptions {
  cooldownDays?: number;
  storageKey?: string;
  onInstalled?: () => void;
}

const MANUAL_PLATFORMS = ['ios', 'ios26', 'macos', 'macos26', 'unknown'];

function getStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
  // @ts-expect-error iOS Safari fallback
  const isStandaloneNav = !!navigator.standalone;
  return isStandaloneMedia || isStandaloneNav;
}

function readDismissed(storageKey: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const dismissStr = localStorage.getItem(storageKey);
    if (dismissStr) {
      const dismissTime = parseInt(dismissStr, 10);
      if (Date.now() < dismissTime) return true;
      localStorage.removeItem(storageKey);
    }
  } catch (e) {
    // Ignore
  }
  return false;
}

export function usePwaInstall({
  cooldownDays = 7,
  storageKey = 'pwa_install_dismiss_until',
  onInstalled,
}: UsePwaInstallOptions = {}) {
  const [isInstalled, setIsInstalled] = useState(() => getStandaloneMode());
  const [isDismissed, setIsDismissed] = useState(() => readDismissed(storageKey));
  const [platform] = useState<Platform>(() =>
    typeof window !== 'undefined' ? detectPlatform() : 'unknown',
  );
  const [platformInstructions] = useState<PlatformInstructions | null>(() => {
    if (typeof window === 'undefined') return null;
    return instructions[detectPlatform()] ?? null;
  });
  const [needsManualInstall, setNeedsManualInstall] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      MANUAL_PLATFORMS.includes(detectPlatform()) &&
      !getStandaloneMode() &&
      !readDismissed(storageKey)
    );
  });
  const [canPrompt, setCanPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const dismissed = readDismissed(storageKey);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!dismissed) setCanPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanPrompt(false);
      setNeedsManualInstall(false);
      setDeferredPrompt(null);
      onInstalled?.();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [storageKey, onInstalled]);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null;
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setCanPrompt(false);
      }
      return choiceResult;
    } catch (e) {
      return null;
    }
  }, [deferredPrompt]);

  const dismiss = useCallback(
    (days: number = cooldownDays) => {
      setIsDismissed(true);
      setCanPrompt(false);
      setNeedsManualInstall(false);
      try {
        const dismissUntil = Date.now() + days * 24 * 60 * 60 * 1000;
        localStorage.setItem(storageKey, dismissUntil.toString());
      } catch (e) {
        // Ignore
      }
    },
    [cooldownDays, storageKey],
  );

  return {
    isInstalled,
    canPrompt,
    needsManualInstall,
    isDismissed,
    platform,
    instructions: platformInstructions,
    promptInstall,
    dismiss,
  };
}
