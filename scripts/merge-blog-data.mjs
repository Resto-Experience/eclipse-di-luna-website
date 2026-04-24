import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('blog-content.json', 'utf8'));
const METADATA = {
  'tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga': { title: 'Tapas Bar: Good Food and Fresh Drinks in Alpharetta GA', image: '/images/blog/tapas-bar-alpharetta.avif', publishedAt: '2026-03-12' },
  'ensalada-de-manzana-a-fresh-counterpoint-on-the-tapas-table-y4321': { title: 'Ensalada de Manzana: A Fresh Counterpoint on the Tapas Table', image: '/images/blog/ensalada-manzana.avif', publishedAt: '2026-03-05' },
  'ceviche-de-pescado-at-eclipse-di-luna': { title: 'Ceviche de Pescado at Eclipse di Luna', image: '/images/blog/ceviche.avif', publishedAt: '2026-02-26' },
  'mejillones-en-salsa-de-jitomate-the-perfect-coastal-meal': { title: 'Mejillones en Salsa de Jitomate, the Perfect Coastal Meal', image: '/images/blog/mejillones.avif', publishedAt: '2026-02-19' },
  'pulpo-a-la-gallega-experience-galicias-signature-octopus': { title: 'Pulpo a la Gallega: Experience Galicia\u2019s Signature Octopus', image: '/images/blog/pulpo.avif', publishedAt: '2026-02-12' },
  'macarrones-con-queso-101-the-complete-guide-to-mac-and-cheese': { title: 'Macarrones con Queso 101: The Complete Guide to Mac and Cheese', image: '/images/blog/macarrones-con-queso.avif', publishedAt: '2026-02-05' },
  'panqueques-a-sweet-way-to-start-the-day': { title: 'Panqueques: A Sweet Way to Start the Day', image: '/images/blog/panqueques.avif', publishedAt: '2026-01-29' },
  'platanos-fritos-the-perfect-start-to-your-night': { title: 'Pl\u00e1tanos Fritos: The Perfect Start to Your Night', image: '/images/blog/platanos-fritos.avif', publishedAt: '2026-01-22' },
  'patatas-bravas-why-these-spanish-potatoes-are-our-tapas-superstar': { title: 'Patatas Bravas: Why These Spanish Potatoes Are Our Tapas Superstar', image: '/images/blog/patatas-bravas.avif', publishedAt: '2026-01-15' },
};

const posts = raw.map(({ slug, blocks }) => {
  const meta = METADATA[slug];
  if (!meta) throw new Error(`No metadata for ${slug}`);
  const firstP = blocks.find(b => b.type === 'p');
  const preview = firstP ? firstP.text.slice(0, 220) : '';
  return { slug, title: meta.title, preview, image: meta.image, publishedAt: meta.publishedAt, blocks };
});

// Emit TypeScript file
const ts = `export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'img'; src: string; alt?: string }
  | { type: 'quote'; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  preview: string;
  image: string;
  publishedAt: string;
  blocks: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}
`;

fs.writeFileSync('src/data/blog.ts', ts);
console.log(`Wrote src/data/blog.ts — ${posts.length} posts`);
