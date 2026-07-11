import { type NextRequest, NextResponse } from 'next/server';
import { type RateLimitOptions, withRateLimit } from '@/lib/api/rate-limit';
import { AppError } from '@/lib/errors/app-error';

const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';

type RouteHandler<Args extends [NextRequest, ...unknown[]]> = (
  ...args: Args
) => Promise<NextResponse>;

type RouteOptions = {
  /** Per-route rate limit, keyed by client IP and pathname. Omit to disable. */
  rateLimit?: RateLimitOptions;
};

function toErrorResponse(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  console.error(error);
  return NextResponse.json({ message: UNEXPECTED_ERROR_MESSAGE }, { status: 500 });
}

/**
 * Wraps a route handler with centralized error handling and optional rate limiting.
 *
 * Thrown {@link AppError}s become JSON responses with their status; any other
 * error is logged and returned as a generic 500. When `options.rateLimit` is
 * set, requests over the limit get a 429 with a `Retry-After` header before
 * the handler runs.
 *
 * @example
 * export const GET = withErrorHandling(
 *   async () => NextResponse.json({ ok: true }),
 *   { rateLimit: { limit: 5, windowMs: 60_000 } }
 * );
 */
export function withErrorHandling<Args extends [NextRequest, ...unknown[]]>(
  handler: RouteHandler<Args>,
  options?: RouteOptions
): RouteHandler<Args> {
  const wrapped = options?.rateLimit ? withRateLimit(options.rateLimit, handler) : handler;
  return (...args) => wrapped(...args).catch(toErrorResponse);
}
