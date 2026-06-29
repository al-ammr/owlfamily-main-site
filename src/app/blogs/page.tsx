import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard';
import { NewsletterStrip } from '@/components/shared/NewsletterStrip';
import { BlogClientContent } from './BlogClientContent';

export const metadata: Metadata = {
  title: "Blog — OWL FAMILY | Fashion, Style & Culture",
  description: "Style guides, brand stories, Nigerian fashion culture and tips from OWL FAMILY.",
};

export default async function BlogsPage() {
  const [posts, featuredPost] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
  ]);

  // Remove featured post from the general list if it exists to prevent duplication
  const remainingPosts = featuredPost 
    ? posts.filter(p => p.id !== featuredPost.id)
    : posts;

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen flex flex-col">
      {/* 2. BLOG HERO BANNER */}
      <header className="relative w-full pt-32 pb-20 px-6 md:px-10 bg-[#0D0D0D] border-b border-[#1E1E1E] overflow-hidden flex flex-col items-center justify-center text-center z-10">
        {/* Subtle background texture/image placeholder */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none bg-[url('/images/textures/noise.png')] bg-repeat"
          aria-hidden="true"
        />
        
        <div className="relative z-10 animate-fade-up" style={{ animationFillMode: 'both', animationDuration: '1s' }}>
          <span className="inline-block font-mono text-[#C4622D] text-[11px] uppercase tracking-[0.3em] mb-4">
            The Journal
          </span>
          <h1 className="font-display text-[#F5F0E8] text-[clamp(56px,8vw,100px)] leading-[0.85] tracking-widest uppercase mb-6">
            Editorials
          </h1>
          <p className="font-serif italic text-[#8A9A9E] text-[20px] max-w-lg mx-auto leading-relaxed">
            Curated style guides, brand stories, and the pulse of Nigerian fashion culture.
          </p>
        </div>
      </header>

      {/* 3. FEATURED POST CARD */}
      {featuredPost && (
        <section className="w-full pt-16 md:pt-24 pb-8 bg-[#0D0D0D] z-10">
          <FeaturedBlogCard post={featuredPost} />
        </section>
      )}

      {/* 4 & 5 & 6. CATEGORY FILTER, GRID & LOAD MORE (Client Component) */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin" /></div>}>
        <BlogClientContent initialPosts={remainingPosts} />
      </Suspense>

      {/* 7. NEWSLETTER STRIP */}
      <NewsletterStrip />
    </main>
  );
}
