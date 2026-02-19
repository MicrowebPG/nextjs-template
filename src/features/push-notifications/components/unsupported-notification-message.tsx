import { BellOff } from 'lucide-react';

export const UnsupportedNotificationMessage = () => {
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <BellOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
      <div>
        <p className="text-sm font-medium text-amber-800">Push notifications not supported</p>
        <p className="mt-0.5 text-sm text-amber-700">
          Your browser doesn&apos;t support push notifications. On iOS, try adding this page to your
          Home Screen as a PWA.
        </p>
      </div>
    </div>
  );
};
