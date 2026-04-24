import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { getBlogPost, getAllBlogPosts } from '@/data/blog';

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found | Eclipse di Luna' };
  return {
    title: `${post.title} | Eclipse di Luna`,
    description: post.preview,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <>
      <InnerPageHero
        title={post.title}
        subtitle=""
        icon="/images/menu/hero-icon.svg"
        bgDesktop={post.image}
        bgMobile={post.image}
      />
      <section
        className="relative pt-[60px] pb-[240px] lg:pb-[360px]"
        style={{
          backgroundImage: 'url(/images/menu/grid-bg.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 0',
        }}
      >
        <div className="max-w-[800px] mx-auto px-4 lg:px-9">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#83342F',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="relative aspect-[16/9] rounded-[8px] overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" priority />
          </div>
          <article className="flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: '#333333',
                }}
              >
                {p}
              </p>
            ))}
          </article>

          {/* Related posts */}
          <div className="mt-16">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                lineHeight: 1.1,
                fontWeight: 400,
                color: '#3C1816',
                marginBottom: '20px',
              }}
            >
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="block rounded-[8px] overflow-hidden bg-black">
                  <div className="relative aspect-[16/9]">
                    <Image src={r.image} alt={r.title} fill className="object-cover" sizes="240px" />
                  </div>
                  <div className="px-4 py-3">
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', lineHeight: 1.15, color: '#F6D8B2' }}>
                      {r.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
