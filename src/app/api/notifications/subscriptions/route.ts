import { getServerSession } from '@/features/auth/lib/get-session';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { endpoint, auth, p256dh } = await req.json();

  await prisma.pushSubscription.upsert({
    where: { endpoint },
    create: {
      endpoint,
      auth,
      p256dh,
      userId: session.user.id,
    },
    update: {
      auth,
      p256dh,
      userId: session.user.id,
    },
  });

  return Response.json({ message: 'Subscription saved.' }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { endpoint } = await req.json();

  await prisma.pushSubscription.deleteMany({
    where: {
      endpoint,
      userId: session.user.id,
    },
  });

  return Response.json({ message: 'Subscription removed.' });
}
