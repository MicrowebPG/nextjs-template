import { NextResponse } from 'next/server';
import { AppError } from '@/lib/errors/app-error';

const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';

export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<NextResponse>
): (...args: Args) => Promise<NextResponse> {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ message: error.message }, { status: error.status });
      }

      console.error(error);
      return NextResponse.json({ message: UNEXPECTED_ERROR_MESSAGE }, { status: 500 });
    }
  };
}
