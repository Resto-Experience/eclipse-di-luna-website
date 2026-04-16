import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges two string classes', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('filters falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('returns empty string with no args', () => {
    expect(cn()).toBe('');
  });

  it('returns single class when one arg', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('handles all falsy values', () => {
    expect(cn(false, null, undefined)).toBe('');
  });

  it('merges multiple valid classes', () => {
    expect(cn('a', 'b', 'c', 'd')).toBe('a b c d');
  });
});
