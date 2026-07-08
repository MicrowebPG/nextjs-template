export class AppError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
  status: number;
}

export class DuplicateResourceError extends AppError {
  constructor(resourceLabel: string) {
    super(`${resourceLabel} already exists`, 409);
    this.name = 'DuplicateResourceError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends AppError {
  constructor(resourceLabel: string) {
    super(`${resourceLabel} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

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
