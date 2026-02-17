export function isNotificationSupported(): boolean {
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'showNotification' in ServiceWorkerRegistration.prototype
  );
}

export function getNotificationPermission(): NotificationPermission {
  return Notification.permission;
}

export async function subscribeToPush(): Promise<PushSubscription> {
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  });
}

export async function saveSubscription(subscription: PushSubscription): Promise<void> {
  const json = subscription.toJSON();
  await fetch('/api/notifications/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: json.endpoint,
      auth: json.keys?.auth,
      p256dh: json.keys?.p256dh,
    }),
  });
}

export async function removeSubscription(endpoint: string): Promise<void> {
  await fetch('/api/notifications/subscriptions', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint }),
  });
}
