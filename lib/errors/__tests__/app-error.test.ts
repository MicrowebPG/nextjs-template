import { AppError, AppErrors, isUniqueConstraintViolation } from '../app-error';

describe('AppErrors', () => {
  it.each([
    [AppErrors.duplicate('User'), 409, 'User already exists'],
    [AppErrors.notFound('User'), 404, 'User not found'],
    [AppErrors.unauthorized(), 401, 'Unauthorized'],
    [AppErrors.unauthorized('Nope'), 401, 'Nope'],
    [AppErrors.validation('Bad input'), 400, 'Bad input']
  ])('%o has status %i and message %s', (error, status, message) => {
    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  });
});

describe('isUniqueConstraintViolation', () => {
  const pgError = { code: '23505', constraint: 'users_email_unique' };

  it('matches a raw pg error with the constraint', () => {
    expect(isUniqueConstraintViolation(pgError, 'users_email_unique')).toBe(true);
  });

  it('reads the pg error from a wrapper error’s cause', () => {
    const wrapped = new Error('query failed', { cause: pgError });
    expect(isUniqueConstraintViolation(wrapped, 'users_email_unique')).toBe(true);
  });

  it('rejects a different constraint, a different code, and non-objects', () => {
    expect(isUniqueConstraintViolation(pgError, 'other')).toBe(false);
    expect(isUniqueConstraintViolation({ ...pgError, code: '23503' }, 'users_email_unique')).toBe(
      false
    );
    expect(isUniqueConstraintViolation(null, 'x')).toBe(false);
    expect(isUniqueConstraintViolation('boom', 'x')).toBe(false);
  });
});
