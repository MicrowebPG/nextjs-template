import { getServerSession } from '@/features/auth/lib/get-session';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.notification.deleteMany({
    where: { id, userId: session.user.id },
  });

  return Response.json({ message: 'Deleted' });
}
