import { getServerSession } from '@/features/auth/lib/get-session';
import { sendToUser } from '@/features/push-notifications/service/notification.server.service';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, message, userId } = await req.json();
  if (!userId) {
    return Response.json({ error: 'Missing userId' }, { status: 400 });
  }

  await sendToUser(userId, title, message);
  return Response.json({ message: 'Push sent.' });
}
