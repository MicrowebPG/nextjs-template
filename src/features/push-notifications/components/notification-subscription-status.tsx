'use client';

import { AlertTriangle, Bell, BellOff, BellRing, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNotification } from '../hook/use-notification';

const NotificationSubscriptionStatus = () => {
  const { isSubscribed, handleSubscribe, handleUnsubscribe, isGranted, isDenied, errorMessage } =
    useNotification();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    setLoading(true);
    await handleSubscribe();
    setLoading(false);
  };

  const onUnsubscribe = async () => {
    setLoading(true);
    await handleUnsubscribe();
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isGranted ? 'bg-green-100' : isDenied ? 'bg-red-100' : 'bg-gray-100'
          }`}
        >
          {isGranted ? (
            <BellRing className="h-5 w-5 text-green-600" />
          ) : isDenied ? (
            <BellOff className="h-5 w-5 text-red-600" />
          ) : (
            <Bell className="h-5 w-5 text-gray-500" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">Push Notifications</h2>
          <p className="text-sm text-gray-500">
            {isGranted
              ? 'You will receive push notifications'
              : isDenied
                ? 'Notifications are blocked'
                : 'Stay updated in real time'}
          </p>
        </div>
        {isGranted && (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
            Active
          </span>
        )}
      </div>

      {isDenied && (
        <div className="mb-4 flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Notifications are blocked. Enable them in your browser settings to continue.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>
      )}

      {!isSubscribed ? (
        <button
          onClick={onSubscribe}
          disabled={isDenied || loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
          {loading ? 'Enabling…' : 'Enable Notifications'}
        </button>
      ) : (
        <button
          onClick={onUnsubscribe}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellOff className="h-4 w-4" />}
          {loading ? 'Disabling…' : 'Disable Notifications'}
        </button>
      )}
    </div>
  );
};

export default NotificationSubscriptionStatus;
