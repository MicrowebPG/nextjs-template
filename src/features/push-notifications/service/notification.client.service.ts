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

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

export async function subscribeToPush(): Promise<PushSubscription> {
  const registration = await navigator.serviceWorker.ready;
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidKey) throw new Error('VAPID public key is not configured');
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey),
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
