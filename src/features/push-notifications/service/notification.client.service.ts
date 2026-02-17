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
