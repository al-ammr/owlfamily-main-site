"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Carousel } from "@/components/ui/Carousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface Testimonial {
  id: string;
  name: string;
  label: string;
  avatar: string;
  headline: string;
  quote: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  return (
    <section className="w-full bg-[#DFD8C8] py-20 px-6 md:px-12 border-b border-[#D8D0C0] relative overflow-hidden">
      <AnimatedSection className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          title="Loved by Our Customers" 
          subtitle="Shopping experiences shared with love" 
        />

        {/* Reusable Carousel */}
        <Carousel visibleCount={4} autoPlay={true} interval={6000}>
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="flex flex-col bg-white border border-[#D8D0C0] p-8 h-full min-h-[320px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-[#0D0D0D] text-sm">
                    {t.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#544E45] uppercase tracking-[0.2em] mt-0.5">
                    {t.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4 text-[#B8962E]">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <h3 className="font-serif font-semibold text-[#0D0D0D] text-lg mb-2">
                "{t.headline}"
              </h3>
              
              <p className="font-serif italic text-[#544E45] text-sm leading-relaxed">
                {t.quote}
              </p>
            </div>
          ))}
        </Carousel>

      </AnimatedSection>
    </section>
  );
}
