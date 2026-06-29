import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getPostsByCategory } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/types';
import { NewsletterStrip } from '@/components/shared/NewsletterStrip';
import { BlogClientContent } from '../../BlogClientContent';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return BLOG_CATEGORIES
    .filter(cat => cat.id !== 'all')
    .map(cat => ({ category: cat.id }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category;
  const categoryData = BLOG_CATEGORIES.find(c => c.id === categoryId);
  
  if (!categoryData) return {};

  return {
    title: `${categoryData.label} — OWL FAMILY Blog`,
    description: `Read the latest articles about ${categoryData.label} from OWL FAMILY.`,
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category;
  
  const categoryData = BLOG_CATEGORIES.find(c => c.id === categoryId);
  
  if (!categoryData) {
    notFound();
  }

  // Only fetch posts for this specific category
  const posts = await getPostsByCategory(categoryId);

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen flex flex-col">
      {/* BLOG HERO BANNER (Modified for Category) */}
      <header className="relative w-full pt-32 pb-20 px-6 md:px-10 bg-[#0D0D0D] border-b border-[#1E1E1E] overflow-hidden flex flex-col items-center justify-center text-center z-10">
        <div 
          className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none bg-[url('/images/textures/noise.png')] bg-repeat"
          aria-hidden="true"
        />
        
        <div className="relative z-10 animate-fade-up" style={{ animationFillMode: 'both', animationDuration: '1s' }}>
          <h1 className="font-display text-[#F5F0E8] text-[clamp(64px,10vw,120px)] leading-[0.85] tracking-widest uppercase mb-6">
            {categoryData.label}
          </h1>
          <p className="font-serif italic text-[#B8962E] text-[22px]">
            Stories, Style & Culture
          </p>
        </div>
      </header>

      {/* CATEGORY FILTER & GRID (Client Component) */}
      {/* We pass the filtered posts as initialPosts, and set the defaultCategory so the tab highlights correctly */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin" /></div>}>
        <BlogClientContent initialPosts={posts} defaultCategory={categoryId} />
      </Suspense>

      <NewsletterStrip />
    </main>
  );
}
