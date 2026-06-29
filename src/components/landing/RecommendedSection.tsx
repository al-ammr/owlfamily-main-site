"use client";

import { ProductCard } from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/products";

import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function RecommendedSection() {
  // Grab a different slice of 4 products for recommended
  // Assuming PRODUCTS has at least 12 items. If not, fallback to first 4.
  const recommendedProducts = PRODUCTS.length > 12 ? PRODUCTS.slice(12, 16) : PRODUCTS.slice(0, 4);

  return (
    <section className="w-full bg-[#DFD8C8] py-20 px-6 md:px-12 border-b border-[#D8D0C0]">
      <AnimatedSection className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          title="Recommended for You" 
          subtitle="Because your style deserves something special" 
        />

        {/* CSS Grid - 4 Columns */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {recommendedProducts.map((product, index) => (
            <AnimatedSection 
              key={product.id}
              animation="fadeUp"
              delay={index * 60}
            >
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>

      </AnimatedSection>
    </section>
  );
}
