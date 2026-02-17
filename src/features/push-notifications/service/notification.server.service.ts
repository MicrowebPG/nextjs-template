import webpush, { PushSubscription } from 'web-push';

interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  url: string;
}

function getVapidDetails() {
  return {
    subject: 'mailto:microweb@example.com',
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '',
    privateKey: process.env.VAPID_PRIVATE_KEY ?? '',
  };
}

export async function sendNotification(
  subscription: PushSubscription,
  title: string,
  message: string,
): Promise<void> {
  const { subject, publicKey, privateKey } = getVapidDetails();
  webpush.setVapidDetails(subject, publicKey, privateKey);

  const payload: NotificationPayload = {
    title,
    body: message,
    icon: '/user.png',
    url: process.env.NOTIFICATION_URL ?? '/',
  };

  await webpush.sendNotification(subscription, JSON.stringify(payload));
}
