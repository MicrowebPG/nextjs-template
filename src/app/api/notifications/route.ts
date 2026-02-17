import { sendNotification } from '@/features/push-notifications/service/notification.server.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { subscription, title, message } = await req.json();
  await sendNotification(subscription, title, message);
  return Response.json({ message: 'Push sent.' });
}
