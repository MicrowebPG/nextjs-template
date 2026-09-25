import { NextResponse } from 'next/server';
// @vitest-environment node
import { AppErrors } from '@/lib/errors/app-error';
import { withErrorHandling } from '../handle-route';

describe('withErrorHandling', () => {
  it('passes through the handler response and arguments', async () => {
    const handler = vi.fn(async (name: string) => NextResponse.json({ name }));

    const response = await withErrorHandling(handler)('a');

    expect(handler).toHaveBeenCalledWith('a');
    expect(await response.json()).toEqual({ name: 'a' });
  });

  it('turns an AppError into its message and status', async () => {
    const response = await withErrorHandling(async () => {
      throw AppErrors.notFound('Post');
    })();

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ message: 'Post not found' });
  });

  it('hides unexpected errors behind a generic 500 and logs them', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await withErrorHandling(async () => {
      throw new Error('db password is hunter2');
    })();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: 'An unexpected error occurred' });
    expect(log).toHaveBeenCalledOnce();
    log.mockRestore();
  });
});
