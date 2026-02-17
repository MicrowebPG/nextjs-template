import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import webpush, { PushSubscription } from 'web-push';

const LOG_FILE = path.join(process.cwd(), 'push-notifications.log');

function logPush(message: string): void {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
}

interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  url: string;
}

function getVapidDetails() {
  return {
    subject: 'mailto:sviluppo@microweb.pg.it',
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

  const { publicKey } = getVapidDetails();
  logPush(`VAPID publicKey (server): ${publicKey}`);
  logPush(`Sending to user ${userId} | title="${title}" | ${subscriptions.length} subscription(s)`);

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        logPush(`Sending to endpoint: ${sub.endpoint}`);
        logPush(`  auth (${sub.auth.length} chars): ${sub.auth}`);
        logPush(`  p256dh (${sub.p256dh.length} chars): ${sub.p256dh}`);
        await sendNotification(
          { endpoint: sub.endpoint, keys: { auth: sub.auth, p256dh: sub.p256dh } },
          title,
          message,
        );
        logPush(`OK for endpoint: ${sub.endpoint}`);
      } catch (error) {
        const errorMsg =
          error instanceof webpush.WebPushError
            ? `WebPushError ${error.statusCode}: ${error.body}`
            : String(error);
        logPush(`FAILED for endpoint ${sub.endpoint}: ${errorMsg}`);
        if (error instanceof webpush.WebPushError && error.statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
          logPush(`Deleted stale subscription: ${sub.id}`);
        }
      }
    }),
  );

  await prisma.notification.create({
    data: { title, message, userId },
  });
  logPush(`Notification saved to DB for user ${userId}`);
}
