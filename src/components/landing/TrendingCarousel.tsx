"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { Product } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import { Carousel } from "@/components/ui/Carousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface TrendingCarouselProps {
  products: Product[];
}

export function TrendingCarousel({ products }: TrendingCarouselProps) {
  // Use products explicitly marked as featured, or fallback to the newest 8 items
  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = featuredProducts.length > 0
    ? (featuredProducts.length > 8 ? featuredProducts.slice(0, 8) : featuredProducts)
    : (products.length > 8 ? products.slice(0, 8) : products);

  return (
    <section className="w-full bg-[#E8E0D0] py-20 px-6 md:px-12 border-b border-[#D8D0C0] relative overflow-hidden">
      <AnimatedSection className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
          <SectionHeader 
            title="Trending Products" 
            subtitle="Most loved products, chosen by our customers" 
            align="left"
          />
        </div>

        {/* Reusable Carousel */}
        <Carousel visibleCount={4} autoPlay={false}>
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>

      </AnimatedSection>
    </section>
  );
}
