export function isNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'Notification' in window &&
    'PushManager' in window &&
    'showNotification' in ServiceWorkerRegistration.prototype
  );
}

export function getNotificationPermission(): NotificationPermission {
  return Notification.permission;
}

export async function subscribeToPush(): Promise<PushSubscription> {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission denied');
  }

  const registration = await navigator.serviceWorker.ready;
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidKey) throw new Error('VAPID public key is not configured');
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKey,
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
