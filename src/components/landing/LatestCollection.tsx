"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface LatestCollectionProps {
  products: Product[];
}

export function LatestCollection({ products }: LatestCollectionProps) {
  const latestProducts = products.slice(0, 8);

  return (
    <section className="w-full bg-[#DFD8C8] py-20 px-6 md:px-12 border-b border-[#D8D0C0]">
      <AnimatedSection className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          title="Latest Collection" 
          subtitle="Discover the newest styles curated for you" 
        />

        {/* CSS Grid - 4 Columns */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {latestProducts.map((product, index) => (
            <AnimatedSection 
              key={product.id}
              animation="fadeUp"
              delay={index * 60}
            >
              <ProductCard product={product} priority={index < 4} />
            </AnimatedSection>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/shop"
            className="border border-[#0D0D0D] text-[#0D0D0D] hover:text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.2em] px-8 py-4 btn-primary"
          >
            <span className="relative z-10 transition-colors duration-400">View All Products</span>
          </Link>
        </div>

      </AnimatedSection>
    </section>
  );
}

