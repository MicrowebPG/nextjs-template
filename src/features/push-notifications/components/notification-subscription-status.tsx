'use client';

import { useNotification } from '../hook/use-notification';

const NotificationSubscriptionStatus = () => {
  const { isSubscribed, handleSubscribe, isGranted, isDenied, errorMessage } = useNotification();

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-center text-2xl font-bold">Push Notification Subscription</h1>

      {isDenied && (
        <p className="mb-4 text-center text-red-600">
          You have denied permission for push notifications. To enable, please update your browser
          settings.
        </p>
      )}

      {errorMessage && <p className="mb-4 text-center text-red-600">Error: {errorMessage}</p>}

      <div>
        {!isSubscribed && (
          <button
            onClick={handleSubscribe}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            disabled={isDenied}
          >
            Subscribe to Push Notifications
          </button>
        )}

        {isGranted && (
          <div className="text-center">
            <p className="font-semibold text-green-600">You are subscribed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSubscriptionStatus;
