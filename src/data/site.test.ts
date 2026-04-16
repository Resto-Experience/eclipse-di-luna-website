import { describe, it, expect } from 'vitest';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_INSTAGRAM,
  SITE_INSTAGRAM_HANDLE,
  NAV_ITEMS,
  FOOTER_MORE_LINKS,
  SITE_CREDIT,
} from './site';

describe('site constants', () => {
  it('SITE_NAME is correct', () => {
    expect(SITE_NAME).toBe('Eclipse di Luna');
  });

  it('SITE_TAGLINE is correct', () => {
    expect(SITE_TAGLINE).toBe('Restaurant & Tapas Bar');
  });

  it('SITE_INSTAGRAM is correct', () => {
    expect(SITE_INSTAGRAM).toBe('https://www.instagram.com/eclipsediluna/?hl=en');
  });

  it('SITE_INSTAGRAM_HANDLE is correct', () => {
    expect(SITE_INSTAGRAM_HANDLE).toBe('@eclipsediluna');
  });

  it('NAV_ITEMS has exactly 5 items', () => {
    expect(NAV_ITEMS).toHaveLength(5);
  });

  it('NAV_ITEMS contains Menu, Locations, Private Events, Catering, Blog', () => {
    const labels = NAV_ITEMS.map((item) => item.label);
    expect(labels).toContain('Menu');
    expect(labels).toContain('Locations');
    expect(labels).toContain('Private Events');
    expect(labels).toContain('Catering');
    expect(labels).toContain('Blog');
  });

  it('FOOTER_MORE_LINKS has exactly 5 items', () => {
    expect(FOOTER_MORE_LINKS).toHaveLength(5);
  });

  it('FOOTER_MORE_LINKS contains Private Party, Catering, Jobs, Blog, Contact Us', () => {
    const labels = FOOTER_MORE_LINKS.map((item) => item.label);
    expect(labels).toContain('Private Party');
    expect(labels).toContain('Catering');
    expect(labels).toContain('Jobs');
    expect(labels).toContain('Blog');
    expect(labels).toContain('Contact Us');
  });

  it('SITE_CREDIT has correct values', () => {
    expect(SITE_CREDIT.label).toBe('Restaurant Marketing, Content & Web Design');
    expect(SITE_CREDIT.year).toBe('2026');
    expect(SITE_CREDIT.href).toBe('https://restoexp.com/');
  });
});
