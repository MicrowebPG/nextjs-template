import { AUTH_SESSION_UPDATE_AGE, AUTH_TOKEN_EXPIRY } from '../constants';

describe('auth constants', () => {
  it('AUTH_TOKEN_EXPIRY is 7 days in seconds', () => {
    expect(AUTH_TOKEN_EXPIRY).toBe(60 * 60 * 24 * 7);
  });

  it('AUTH_SESSION_UPDATE_AGE is 1 day in seconds', () => {
    expect(AUTH_SESSION_UPDATE_AGE).toBe(60 * 60 * 24);
  });

  it('session update age is less than token expiry', () => {
    expect(AUTH_SESSION_UPDATE_AGE).toBeLessThan(AUTH_TOKEN_EXPIRY);
  });
});
