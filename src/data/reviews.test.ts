import { describe, it, expect } from 'vitest';
import { REVIEWS } from './reviews';

describe('REVIEWS', () => {
  it('exports exactly 5 reviews', () => {
    expect(REVIEWS).toHaveLength(5);
  });

  it('each review has non-empty quote, author, url', () => {
    REVIEWS.forEach((review) => {
      expect(review.quote).toBeTruthy();
      expect(review.author).toBeTruthy();
      expect(review.url).toBeTruthy();
    });
  });

  it('review 1 author is Gwala G', () => {
    expect(REVIEWS[0].author).toBe('Gwala G');
  });

  it('review 1 URL starts with https://share.google/', () => {
    expect(REVIEWS[0].url).toMatch(/^https:\/\/share\.google\//);
  });

  it('review 2 author is Chad Baniecki', () => {
    expect(REVIEWS[1].author).toBe('Chad Baniecki');
  });

  it('review 3 author is Yan', () => {
    expect(REVIEWS[2].author).toBe('Yan');
  });

  it('review 4 author is Tyrone Washington', () => {
    expect(REVIEWS[3].author).toBe('Tyrone Washington');
  });

  it('review 5 author is Melike Saylam', () => {
    expect(REVIEWS[4].author).toBe('Melike Saylam');
  });
});
