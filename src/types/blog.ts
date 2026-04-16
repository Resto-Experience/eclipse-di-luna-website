export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  image: string; // path under public/images/blog/
  publishedAt: string; // ISO date string
  tags: string[];
}
