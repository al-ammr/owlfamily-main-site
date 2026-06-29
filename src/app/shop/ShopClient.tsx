'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ProductCard } from '@/components/shop/ProductCard';
import { CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import { formatPriceFromKobo } from '@/lib/utils/product-helpers';

const EMOJI_MAP: Record<string, string> = {
  all: '',
  streetwear: '🔥',
  smart_casual: '👔',
  casual_wear: '🛋️',
  corporate_wear: '🕴️',
  vintage: '🕰️',
  native_wear: '🎭',
  formal_wear: '🎩',
  ceremonial_wear: '🎉',
  luxury_editions: '✨',
};

function ShopContent({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read category from URL, default to 'all'
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Sync state when URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    if (cat !== activeCategory) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Handle Tab Click
  const handleTabClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Update URL without full reload, preserving shareable link
    const newUrl = categoryId === 'all' ? '/shop' : `/shop?category=${categoryId}`;
    router.push(newUrl, { scroll: false });
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return initialProducts;
    return initialProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, initialProducts]);

  // Get active category label for the section header
  const activeLabel = useMemo(() => {
    const catObj = CATEGORIES.find(c => c.id === activeCategory);
    return catObj ? catObj.label : 'All Pieces';
  }, [activeCategory]);

  return (
    <>
      {/* 1. Header Section */}
      <header className="pt-24 pb-12 bg-[#0D0D0D] border-b border-[#1E1E1E]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <h1 className="font-display text-[#F5F0E8] text-[clamp(40px,8vw,80px)] leading-[0.9] tracking-widest uppercase animate-fade-up">
            The Collection
          </h1>
          <p className="font-serif italic text-[#C8C0B0] text-xl mt-4 max-w-2xl animate-fade-up" style={{ animationDelay: '100ms' }}>
            Pieces designed to define the culture. From the streets of Abuja to the boardroom.
          </p>
        </div>
      </header>

      {/* 2. Structured JSON-LD Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredProducts.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://owlfamily.com/shop/${p.slug}`,
              "name": p.name
            }))
          })
        }}
      />

      {/* 3. Filter Navigation Strip */}
      <section className="sticky top-16 md:top-20 z-40 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#1E1E1E] overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-6 md:gap-10 h-16 w-max">
            {CATEGORIES.map((cat, index) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className="group relative h-full flex items-center justify-center transition-colors duration-300"
                >
                  <span className={`font-mono text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#C4622D] font-bold' : 'text-[#8A9A9E] group-hover:text-[#F5F0E8]'}`}>
                    {EMOJI_MAP[cat.id]} {cat.label}
                  </span>
                  
                  {/* Active Indicator Line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4622D]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Product Grid Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 min-h-[50vh]">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 border-b border-[#D8D0C0] pb-4">
          <h2 className="font-display text-3xl md:text-4xl tracking-widest text-[#0D0D0D] uppercase">
            {activeLabel === 'All Collections' ? 'All Pieces' : activeLabel}
          </h2>
          <span className="font-mono text-xs text-[#8A9A9E] uppercase tracking-widest">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* CSS Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <ProductCard product={product} priority={index < 4} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-serif italic text-[#C8C0B0] text-xl mb-4">
              No pieces currently available in this collection.
            </p>
            <button 
              onClick={() => handleTabClick('all')}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4622D] hover:text-[#F5F0E8] transition-colors"
            >
              View All Collections
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  return (
    <main className="w-full bg-[#E8E4DC] min-h-screen">
      <Suspense fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0D0D0D]">
          <div className="w-8 h-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <ShopContent initialProducts={initialProducts} />
      </Suspense>
    </main>
  );
}
