import prisma from '@/lib/prisma';
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

export async function sendToUser(userId: string, title: string, message: string): Promise<void> {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await sendNotification(
          { endpoint: sub.endpoint, keys: { auth: sub.auth, p256dh: sub.p256dh } },
          title,
          message,
        );
      } catch (error) {
        console.error(`[Push] Failed for endpoint ${sub.endpoint}:`, error);
        if (error instanceof webpush.WebPushError && error.statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        }
      }
    }),
  );

  await prisma.notification.create({
    data: { title, message, userId },
  });
}
