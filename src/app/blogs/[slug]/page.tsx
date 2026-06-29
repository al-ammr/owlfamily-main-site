import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { ViewTracker } from '@/components/blog/ViewTracker';
import { StickySidebar } from '@/components/blog/StickySidebar';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return {};

  const ogImage = getCloudinaryUrl(post.coverImage, { width: 1200, height: 630, crop: "fill" }) || "/images/og-image.jpg";

  return {
    title: `${post.title} — OWL FAMILY`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.authorName],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function extractToc(content: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  const regex = /^(##|###)\s+(.*)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1] === '##' ? 2 : 3;
    const text = match[2];
    const id = text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
    toc.push({ id, text, level });
  }
  return toc;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, shopProducts] = await Promise.all([
    getRelatedPosts(post.slug, post.category),
    Promise.resolve(PRODUCTS.filter(p => p.featured).slice(0, 3))
  ]);

  const toc = extractToc(post.content);
  
  const coverUrl = getCloudinaryUrl(post.coverImage, { width: 1920, height: 1080, crop: "fill" });

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen flex flex-col">
      <ViewTracker slug={post.slug} />

      {/* 2. HERO IMAGE SECTION */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        {/* Parallax Image Wrapper */}
        <div className="absolute inset-0 w-full h-full transform translate-z-0 bg-[#1E1E1E]">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          )}
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.4)] to-transparent pointer-events-none" />

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-20 lg:pb-16 z-10 max-w-[1440px] mx-auto">
          <span className="inline-block bg-[#C4622D] text-[#F5F0E8] font-mono text-[9px] uppercase tracking-widest px-3 py-1 mb-4">
            {post.categoryLabel}
          </span>
          <h1 className="font-display text-[#F5F0E8] text-[clamp(32px,5vw,52px)] leading-tight tracking-wider uppercase max-w-4xl mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#C8C0B0] uppercase tracking-widest">
            <span>BY {post.authorName}</span>
            <span className="w-1 h-1 rounded-full bg-[#C8C0B0]/50" />
            <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-[#C8C0B0]/50" />
            <span>{post.readTime} MIN READ</span>
          </div>
        </div>
      </section>

      {/* 3. ARTICLE LAYOUT */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* Left: Article Body */}
          <article className="w-full lg:w-[65%] max-w-[720px] shrink-0">
            <MarkdownRenderer content={post.content} />
            
            {/* 4. TAGS ROW */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mt-16 pt-8 border-t border-[#1E1E1E]">
                <span className="font-mono text-[10px] text-[#F5F0E8] uppercase tracking-widest mr-2">Tags:</span>
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/blogs?tag=${tag.toLowerCase()}`}
                    className="border border-[#333] px-4 py-2 font-mono text-[9px] text-[#8A9A9E] uppercase tracking-widest hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Right: Sticky Sidebar */}
          <div className="w-full lg:w-[30%]">
            <StickySidebar 
              toc={toc} 
              relatedPosts={relatedPosts} 
              title={post.title}
              slug={post.slug}
            />
          </div>

        </div>
      </section>

      {/* 5. RELATED POSTS SECTION */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#141414] py-20 px-6 md:px-10 lg:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between border-b border-[#333] pb-6 mb-12">
              <h2 className="font-display text-[#F5F0E8] text-3xl md:text-4xl tracking-widest uppercase">
                More From OWL FAMILY
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(p => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. SHOP THE LOOK SECTION */}
      {shopProducts.length > 0 && (
        <section className="w-full bg-[#0D0D0D] py-20 px-6 md:px-10 lg:px-20 border-t border-[#1E1E1E]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between border-b border-[#333] pb-6 mb-12">
              <h2 className="font-display text-[#F5F0E8] text-3xl md:text-4xl tracking-widest uppercase">
                Complete the Look
              </h2>
              <Link 
                href={`/shop?category=${post.category}`}
                className="font-mono text-[11px] text-[#C4622D] uppercase tracking-[0.2em] hover:text-[#F5F0E8] transition-colors"
              >
                Shop {post.categoryLabel} →
              </Link>
            </div>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {shopProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
