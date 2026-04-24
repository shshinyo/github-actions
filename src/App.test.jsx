import { describe, it, expect } from 'vitest';

describe('Demo Test Suite', () => {
  it('should pass for the CI demo', () => {
    expect(true).toBe(true);
  });

  it('should verify basic math', () => {
    expect(1 + 1).toBe(2);
  });
});
