"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogPost, BLOG_CATEGORIES } from "@/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface BlogClientContentProps {
  initialPosts: BlogPost[];
  defaultCategory?: string;
}

const POSTS_PER_PAGE = 9;

export function BlogClientContent({ initialPosts, defaultCategory }: BlogClientContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryParam = searchParams.get('category') || defaultCategory || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Sync state with URL parameter
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    if (cat !== activeCategory) {
      setActiveCategory(cat);
      setVisibleCount(POSTS_PER_PAGE); // Reset count on category change
    }
  }, [searchParams]);

  const handleTabClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(POSTS_PER_PAGE);
    const newUrl = categoryId === 'all' ? '/blogs' : `/blogs?category=${categoryId}`;
    router.push(newUrl, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return initialPosts;
    return initialPosts.filter(p => p.category === activeCategory);
  }, [initialPosts, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE);
  };

  return (
    <>
      {/* 4. CATEGORY FILTER TABS */}
      <section className="sticky top-[60px] md:top-[72px] z-40 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#1E1E1E] overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-6 md:gap-10 h-16 w-max">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className="group relative h-full flex items-center justify-center transition-colors duration-300"
                >
                  <span className={`font-mono text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#C4622D] font-bold' : 'text-[#8A9A9E] group-hover:text-[#F5F0E8]'}`}>
                    {cat.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4622D]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BLOG GRID */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 min-h-[50vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-16">
          {visiblePosts.map((post, index) => (
            <AnimatedSection 
              key={post.id}
              animation="fadeUp" 
              delay={(index % POSTS_PER_PAGE) * 100}
            >
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-serif italic text-[#C8C0B0] text-xl mb-4">
              No articles found in this category.
            </p>
            <button 
              onClick={() => handleTabClick('all')}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4622D] hover:text-[#F5F0E8] transition-colors"
            >
              View All Posts
            </button>
          </div>
        )}

        {/* 6. PAGINATION / LOAD MORE */}
        {hasMore && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="bg-transparent border border-[#333] text-[#F5F0E8] font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:border-[#F5F0E8] transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
}
