import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { getAllBlogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog | Eclipse di Luna',
  description:
    'Stories, recipes, and highlights from the Eclipse di Luna kitchens and tapas bars across Atlanta.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <InnerPageHero
        title="Blog"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/blog/hero-icon.avif"
        iconWidth={72}
        iconHeight={79}
        bgDesktop="/images/blog/hero-bg-v2.avif"
        bgMobile="/images/blog/hero-bg-v2.avif"
      />
      <section
        className="relative pt-[80px] pb-[280px] lg:bg-[url(/images/locations/shared/menu-bg.avif)] lg:bg-cover lg:bg-no-repeat lg:bg-fixed lg:bg-left-top"
        style={{ backgroundColor: '#DDD3C6' }}
      >
        <div className="max-w-[940px] mx-auto px-4 lg:px-0">
          {/* Section intro: decoration + H2 — matches live (container-140 + heading-18) */}
          <div className="flex flex-col items-center text-center mx-auto" style={{ marginBottom: '48px' }}>
            <Image
              src="/images/blog/intro-ornament.svg"
              alt=""
              width={45}
              height={45}
              style={{ width: '45px', height: '45px' }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: '52px',
                fontWeight: 400,
                color: '#3C1816',
                margin: '16px 0 0',
              }}
            >
              From intimate gatherings to large celebrations, we&rsquo;re closer than you think.
            </h2>
          </div>

          {/* Cards grid — 2 cols × 460w (live .w-col-6) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ columnGap: '20px', rowGap: '24px' }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} slug={post.slug} image={post.image} title={post.title} preview={post.preview} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogCard({ slug, image, title, preview }: { slug: string; image: string; title: string; preview: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden"
      style={{ borderRadius: '10px' }}
    >
      {/* White inner card (.container-142): bg white, radius 10, padding 20 — matches live */}
      <div
        className="bg-white transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        style={{ borderRadius: '10px', padding: '20px' }}
      >
        {/* Image 418×235 aspect on live; use aspect-[16/9] so it scales with card width */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16/9', borderRadius: '10px' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-abhaya), Georgia, serif',
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 700,
            color: '#1F1F1F',
            marginTop: '16px',
            marginBottom: '10px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
            color: '#1F1F1F',
            margin: 0,
          }}
        >
          {preview}
        </p>
      </div>
    </Link>
  );
}
