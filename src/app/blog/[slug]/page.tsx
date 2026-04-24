import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { Reveal } from '@/components/ui/Reveal';
import { getBlogPost, getAllBlogPosts } from '@/data/blog';
import type { BlogBlock } from '@/data/blog';

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

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <InnerPageHero
        title={post.title}
        subtitle="LATIN & SPANISH BAR CULTURE"
        bgDesktop="/images/blog/hero-bg-v2.avif"
        bgMobile="/images/blog/hero-bg-v2.avif"
        titleMaxWidth="940px"
        lineHeight="72px"
        height="lg:h-[600px]"
      />
      <section
        className="relative pt-[64px] pb-[360px] lg:bg-[url(/images/locations/shared/menu-bg.avif)] lg:bg-cover lg:bg-no-repeat lg:bg-fixed lg:bg-left-top"
        style={{ backgroundColor: '#DDD3C6' }}
      >
        <div className="max-w-[940px] mx-auto px-4 lg:px-0">
          <Reveal variant="fade-up" duration={500} delay={100}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#780C06]"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6C4627',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <time
                dateTime={post.publishedAt}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#83342F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {publishedLabel}
              </time>
            </div>
          </Reveal>

          <Reveal
            variant="fade-up"
            duration={600}
            delay={200}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '16/9', borderRadius: '10px', marginBottom: '40px' }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 940px"
              className="object-cover"
            />
          </Reveal>

          <Reveal variant="fade-up" duration={700} delay={300}>
            <article
              className="bg-white"
              style={{ borderRadius: '10px', padding: 'clamp(24px, 4vw, 48px)' }}
            >
              {post.blocks.map((block, i) => (
                <Block key={i} block={block} isFirst={i === 0} />
              ))}
            </article>
          </Reveal>

          {related.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <Reveal variant="fade-up" duration={600}>
                <h2
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    lineHeight: '44px',
                    fontWeight: 400,
                    color: '#3C1816',
                    marginBottom: '32px',
                  }}
                >
                  Keep Reading
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ columnGap: '20px', rowGap: '24px' }}>
                {related.map((r, i) => (
                  <Reveal key={r.slug} variant="fade-up" duration={500} delay={Math.min(i, 2) * 100}>
                    <RelatedCard slug={r.slug} image={r.image} title={r.title} preview={r.preview} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function parseImgDims(src: string): { width: number; height: number } {
  const m = src.match(/(\d+)x(\d+)\.(avif|webp|png|jpe?g)/i);
  if (m) return { width: parseInt(m[1], 10), height: parseInt(m[2], 10) };
  return { width: 1024, height: 683 };
}

function Block({ block, isFirst }: { block: BlogBlock; isFirst: boolean }) {
  switch (block.type) {
    case 'p':
      return (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: isFirst ? '20px' : '18px',
            lineHeight: '30px',
            fontWeight: isFirst ? 500 : 400,
            color: isFirst ? '#1F1F1F' : '#333333',
            margin: isFirst ? '0 0 24px' : '0 0 20px',
          }}
        >
          {block.text}
        </p>
      );
    case 'h2':
      return (
        <h2
          style={{
            fontFamily: 'var(--font-abhaya), Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 32px)',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#1F1F1F',
            margin: '32px 0 16px',
          }}
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          style={{
            fontFamily: 'var(--font-abhaya), Georgia, serif',
            fontSize: '22px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#1F1F1F',
            margin: '24px 0 12px',
          }}
        >
          {block.text}
        </h3>
      );
    case 'ul':
    case 'ol': {
      const Tag = block.type;
      return (
        <Tag
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: '30px',
            fontWeight: 400,
            color: '#333333',
            paddingLeft: '1.4em',
            margin: '0 0 20px',
            listStyleType: block.type === 'ul' ? 'disc' : 'decimal',
          }}
        >
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>
              {item}
            </li>
          ))}
        </Tag>
      );
    }
    case 'img': {
      const { width, height } = parseImgDims(block.src);
      return (
        <Image
          src={block.src}
          alt={block.alt || ''}
          width={width}
          height={height}
          sizes="360px"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '360px',
            maxHeight: '400px',
            borderRadius: '8px',
            margin: '24px 0',
            display: 'block',
          }}
        />
      );
    }
    case 'quote':
      return (
        <blockquote
          style={{
            fontFamily: 'var(--font-abhaya), Georgia, serif',
            fontSize: '22px',
            lineHeight: '32px',
            fontStyle: 'italic',
            color: '#3C1816',
            borderLeft: '3px solid #780C06',
            paddingLeft: '20px',
            margin: '24px 0',
          }}
        >
          {block.text}
        </blockquote>
      );
    default:
      return null;
  }
}

function RelatedCard({ slug, image, title, preview }: { slug: string; image: string; title: string; preview: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden h-full"
      style={{ borderRadius: '10px' }}
    >
      <div
        className="bg-white transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] h-full flex flex-col"
        style={{ borderRadius: '10px', padding: '16px' }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16/9', borderRadius: '8px' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-abhaya), Georgia, serif',
            fontSize: '20px',
            lineHeight: '26px',
            fontWeight: 700,
            color: '#1F1F1F',
            marginTop: '14px',
            marginBottom: '8px',
          }}
        >
          {title}
        </h3>
        <p
          className="line-clamp-3"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            lineHeight: '18px',
            fontWeight: 400,
            color: '#4A4A4A',
            margin: 0,
          }}
        >
          {preview}
        </p>
      </div>
    </Link>
  );
}
