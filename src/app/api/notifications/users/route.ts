import { getServerSession } from '@/features/auth/lib/get-session';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: {
      pushSubscriptions: { some: {} },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return Response.json(users);
}
