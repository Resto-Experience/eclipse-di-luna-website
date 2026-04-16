import { describe, it, expect } from 'vitest';
import type { BlogPost } from './blog';
import type { FormStatus, FormState } from './forms';
import type { NavItem, SocialLink, Review } from './site';

describe('BlogPost type', () => {
  it('constructs a valid BlogPost', () => {
    const post: BlogPost = {
      slug: 'best-tapas-atlanta',
      title: 'Best Tapas in Atlanta',
      excerpt: 'A guide to the best tapas.',
      content: '<p>Content here</p>',
      image: '/images/blog/tapas.jpg',
      publishedAt: '2026-01-15T00:00:00Z',
      tags: ['tapas', 'atlanta'],
    };
    expect(post.slug).toBe('best-tapas-atlanta');
    expect(post.tags).toHaveLength(2);
    expect(post.publishedAt).toContain('2026');
  });
});

describe('FormStatus and FormState types', () => {
  it('accepts valid FormStatus values', () => {
    const statuses: FormStatus[] = ['idle', 'pending', 'success', 'error'];
    expect(statuses).toHaveLength(4);
  });

  it('constructs a valid FormState with all fields', () => {
    const state: FormState = {
      status: 'error',
      message: 'Validation failed',
      errors: { email: ['Invalid email'] },
    };
    expect(state.status).toBe('error');
    expect(state.errors?.email).toContain('Invalid email');
  });

  it('constructs a minimal FormState', () => {
    const state: FormState = { status: 'idle' };
    expect(state.status).toBe('idle');
    expect(state.message).toBeUndefined();
    expect(state.errors).toBeUndefined();
  });
});

describe('NavItem type', () => {
  it('constructs a valid NavItem', () => {
    const item: NavItem = { label: 'Menu', href: '/menu' };
    expect(item.label).toBe('Menu');
    expect(item.href).toBe('/menu');
  });
});

describe('SocialLink type', () => {
  it('constructs a valid SocialLink with optional icon', () => {
    const link: SocialLink = {
      label: 'Instagram',
      href: 'https://instagram.com/eclipsediluna',
      icon: 'instagram',
    };
    expect(link.label).toBe('Instagram');
    expect(link.icon).toBe('instagram');
  });

  it('constructs a SocialLink without icon', () => {
    const link: SocialLink = { label: 'Instagram', href: 'https://instagram.com' };
    expect(link.icon).toBeUndefined();
  });
});

describe('Review type', () => {
  it('constructs a valid Review', () => {
    const review: Review = {
      quote: 'Amazing food!',
      author: 'Gwala G',
      url: 'https://share.google/I8rbrVySj3HWspHtQ',
    };
    expect(review.author).toBe('Gwala G');
    expect(review.url).toContain('share.google');
  });
});
