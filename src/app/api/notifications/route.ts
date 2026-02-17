import { getServerSession } from '@/features/auth/lib/get-session';
import {
  sendNotification,
  sendToUser,
} from '@/features/push-notifications/service/notification.server.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, message } = body;

  if (body.userId) {
    const session = await getServerSession();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await sendToUser(body.userId, title, message);
    return Response.json({ message: 'Push sent to user.' });
  }

  if (body.subscription) {
    await sendNotification(body.subscription, title, message);
    return Response.json({ message: 'Push sent.' });
  }

  return Response.json({ error: 'Missing userId or subscription' }, { status: 400 });
}
