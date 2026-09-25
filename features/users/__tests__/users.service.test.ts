import { AppError } from '@/lib/errors/app-error';
import { findUserById } from '../repositories/users.repository';
import { getUser } from '../services/users.service';

vi.mock('../repositories/users.repository');

describe('getUser', () => {
  it('returns the user when found', async () => {
    const found = { id: 'u1' } as Awaited<ReturnType<typeof findUserById>>;
    vi.mocked(findUserById).mockResolvedValue(found);

    await expect(getUser('u1')).resolves.toBe(found);
  });

  it('throws a 404 AppError when the user does not exist', async () => {
    vi.mocked(findUserById).mockResolvedValue(undefined);

    await expect(getUser('missing')).rejects.toMatchObject({
      constructor: AppError,
      status: 404,
      message: 'User not found'
    });
  });
});
