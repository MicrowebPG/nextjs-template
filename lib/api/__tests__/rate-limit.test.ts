import { checkRateLimit, clearRateLimitStore } from '../rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearRateLimitStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const options = { limit: 3, windowMs: 60_000 };

  it('allows requests up to the limit', () => {
    expect(checkRateLimit('a', options).allowed).toBe(true);
    expect(checkRateLimit('a', options).allowed).toBe(true);
    expect(checkRateLimit('a', options).allowed).toBe(true);
  });

  it('blocks requests over the limit', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('a', options);
    const result = checkRateLimit('a', options);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('tracks keys independently', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('a', options);
    expect(checkRateLimit('b', options).allowed).toBe(true);
  });

  it('resets after the window elapses', () => {
    for (let i = 0; i < 4; i++) checkRateLimit('a', options);
    expect(checkRateLimit('a', options).allowed).toBe(false);

    vi.advanceTimersByTime(60_001);
    const result = checkRateLimit('a', options);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('reports decreasing remaining count', () => {
    expect(checkRateLimit('a', options).remaining).toBe(2);
    expect(checkRateLimit('a', options).remaining).toBe(1);
    expect(checkRateLimit('a', options).remaining).toBe(0);
  });
});
