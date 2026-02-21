'use client';

import { cn } from '@/lib/utils';
import { Download, MoreVertical, PlusSquare, Share, X } from 'lucide-react';
import { useState } from 'react';
import { usePwaInstall } from '../hooks/use-pwa-install';
import { InstructionStep } from '../lib/instructions';

export interface PwaInstallPromptProps {
  className?: string;
  title?: string;
  description?: string;
  cooldownDays?: number;
  storageKey?: string;
  forceShowHowTo?: boolean;
  onInstalled?: () => void;
}

const StepIcon = ({ type }: { type?: InstructionStep['icon'] }) => {
  if (!type) return null;
  return (
    <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded border border-neutral-200 bg-neutral-50 text-neutral-600 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
      {type === 'share' && <Share className="h-4 w-4" strokeWidth={2} />}
      {type === 'plus' && <PlusSquare className="h-4 w-4" strokeWidth={2} />}
      {type === 'more' && <MoreVertical className="h-4 w-4" strokeWidth={2} />}
      {type === 'install' && <Download className="h-4 w-4" strokeWidth={2} />}
    </span>
  );
};

export function PwaInstallPrompt({
  className,
  title = 'Install App',
  description = 'Install this application on your device for quick, native access.',
  cooldownDays = 7,
  storageKey = 'pwa_install_dismiss_until',
  forceShowHowTo = false,
  onInstalled,
}: PwaInstallPromptProps) {
  const [showHowTo, setShowHowTo] = useState(forceShowHowTo);

  const {
    isInstalled,
    isDismissed,
    canPrompt,
    needsManualInstall,
    instructions,
    promptInstall,
    dismiss,
  } = usePwaInstall({
    cooldownDays,
    storageKey,
    onInstalled,
  });

  if (isInstalled || isDismissed) return null;
  if (!canPrompt && !needsManualInstall && !instructions) return null; // Only hide if no instructions available

  const handlePrimaryAction = async () => {
    if (canPrompt) {
      await promptInstall();
    } else {
      setShowHowTo(true);
    }
  };

  const handleClose = () => {
    if (showHowTo && !forceShowHowTo) {
      setShowHowTo(false);
    } else {
      dismiss(cooldownDays);
    }
  };

  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 left-0 z-50 p-4 transition-all duration-300 ease-in-out',
        'sm:right-4 sm:bottom-4 sm:left-auto sm:w-100 sm:p-0',
        className,
      )}
      role="dialog"
      aria-labelledby="pwa-install-title"
      aria-modal="false"
    >
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-lg sm:shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
        {!showHowTo ? (
          <>
            <div className="space-y-2">
              <h2
                id="pwa-install-title"
                className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
              >
                {title}
              </h2>
              {description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
              )}
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:focus:ring-neutral-800 dark:focus:ring-offset-neutral-950"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={handlePrimaryAction}
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus:ring-neutral-800 dark:focus:ring-offset-neutral-950"
              >
                {canPrompt ? 'Install' : 'Learn how'}
              </button>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                {instructions?.title || 'Install Instructions'}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close instructions"
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {instructions?.steps && (
              <ol className="ml-2 flex flex-col gap-4 border-l-2 border-neutral-100 py-1 pl-4 dark:border-neutral-800">
                {instructions.steps.map((step, idx) => (
                  <li key={idx} className="relative">
                    <span className="absolute -left-6.25 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-medium text-neutral-900 ring-4 ring-white dark:bg-neutral-800 dark:text-neutral-50 dark:ring-neutral-950">
                      {idx + 1}
                    </span>
                    <p className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                      {step.text}
                      <StepIcon type={step.icon} />
                    </p>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => dismiss(cooldownDays)}
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                Remind me later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
