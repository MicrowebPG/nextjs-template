export class AppError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const AppErrors = {
  duplicate: (resourceLabel: string) => new AppError(`${resourceLabel} already exists`, 409),
  notFound: (resourceLabel: string) => new AppError(`${resourceLabel} not found`, 404),
  unauthorized: (message = 'Unauthorized') => new AppError(message, 401),
  validation: (message: string) => new AppError(message, 400)
};

const UNIQUE_VIOLATION = '23505';

export function isUniqueConstraintViolation(error: unknown, constraintName: string): boolean {
  const cause = error instanceof Error ? (error.cause ?? error) : error;
  return (
    typeof cause === 'object' &&
    cause !== null &&
    'code' in cause &&
    cause.code === UNIQUE_VIOLATION &&
    'constraint' in cause &&
    cause.constraint === constraintName
  );
}
