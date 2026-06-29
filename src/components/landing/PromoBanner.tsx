"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import streetwearImg from "../../../public/images/hero/streetwear.jpg";
import smartCasualImg from "../../../public/images/hero/smart-casual.jpg";
import corporateImg from "../../../public/images/hero/corporate.jpg";
import vintageImg from "../../../public/images/hero/vintage.jpg";

import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useParallax } from "@/hooks/useParallax";

const TILES = [
  { label: "Streetwear", href: "/shop?category=streetwear", src: streetwearImg },
  { label: "Smart Casual", href: "/shop?category=smart_casual", src: smartCasualImg },
  { label: "Corporate", href: "/shop?category=corporate_wear", src: corporateImg },
  { label: "Vintage", href: "/shop?category=vintage", src: vintageImg },
];

export function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const offsetY = useParallax(0.1);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TILES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full flex flex-col lg:flex-row h-auto lg:h-[500px] overflow-hidden">
      
      {/* Left: Text Content (45%) */}
      <AnimatedSection 
        animation="slideInLeft"
        className="w-full lg:w-[45%] bg-[#0D0D0D] flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 shrink-0 border-b lg:border-b-0 lg:border-r border-[#1E1E1E] z-10"
      >
        <span className="font-mono text-[10px] text-[#C4622D] uppercase tracking-[0.3em] mb-4">
          Season Exclusive
        </span>
        
        <div className="mb-4">
          <SectionHeader 
            title="New Arrivals" 
            subtitle="Discover Fashion That Complements Your Lifestyle" 
            align="left"
            light={true}
          />
        </div>

        <Link 
          href={TILES[activeIndex].href}
          className="inline-flex items-center justify-center bg-[#C4622D] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#A8521E] transition-colors w-max"
        >
          Shop {TILES[activeIndex].label}
        </Link>
      </AnimatedSection>

      {/* Right: Automated Slider (55%) */}
      <div className="w-full lg:w-[55%] h-[500px] lg:h-full relative group overflow-hidden">
        
        {/* Sliding Container */}
        <div 
          className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {TILES.map((tile) => (
            <div key={tile.label} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                style={{ objectPosition: `50% calc(50% + ${offsetY * 0.5}px)` }}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[#0D0D0D]/30" />
            </div>
          ))}
        </div>

        {/* Floating Category Label & Progress Dots */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          <div className="overflow-hidden mb-6">
            <span 
              key={activeIndex}
              className="block font-display text-[#F5F0E8] text-4xl md:text-5xl tracking-[0.15em] uppercase drop-shadow-lg animate-[fadeUp_0.5s_ease-out_forwards]"
            >
              {TILES[activeIndex].label}
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {TILES.map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${
                  activeIndex === idx ? "w-8 bg-[#C4622D]" : "w-3 bg-[#EAE5D9]/50 hover:bg-[#EAE5D9]"
                }`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Clickable Overlay for current active link */}
        <Link 
          href={TILES[activeIndex].href} 
          className="absolute inset-0 z-10"
          aria-label={`Shop ${TILES[activeIndex].label}`}
        />

      </div>

    </section>
  );
}
