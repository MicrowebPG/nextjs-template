import { NextResponse } from 'next/server';
import { getUser } from '@/features/users/services/users.service';
import { withErrorHandling } from '@/lib/api/handle-route';
import { getServerSession } from '@/lib/auth/session';
import { AppErrors } from '@/lib/errors/app-error';

export const GET = withErrorHandling(async () => {
  const session = await getServerSession();
  if (!session) throw AppErrors.unauthorized();

  return NextResponse.json(await getUser(session.user.id));
});
