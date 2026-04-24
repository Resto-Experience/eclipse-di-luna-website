import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';

const SITE = 'https://www.eclipsediluna.com';
const SLUGS = ['alpharetta', 'beltline', 'buckhead', 'dunwoody'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/menu`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/private-party`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/catering`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/contact-us`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE}/jobs`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = SLUGS.flatMap((slug) => [
    { url: `${SITE}/location-${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/menu/menu-${slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]);

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}
