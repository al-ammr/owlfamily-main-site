"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/useParallax";

// Static imports for Next.js image optimization
import streetwearImg from "../../../public/images/hero/streetwear.jpg";
import smartCasualImg from "../../../public/images/hero/smart-casual.jpg";
import corporateImg from "../../../public/images/hero/corporate.jpg";
import vintageImg from "../../../public/images/hero/vintage.jpg";
import cultureImg from "../../../public/images/hero/culture.jpg";

const slides = [
  {
    id: "streetwear",
    src: streetwearImg,
    category: "streetwear",
    title: "The New Standard",
    subtitle: "Street Wear",
    cta: "Shop Street Wear"
  },
  {
    id: "smart-casual",
    src: smartCasualImg,
    category: "smart_casual",
    title: "Effortless Edge",
    subtitle: "Smart Casual",
    cta: "Shop Smart Casual"
  },
  {
    id: "corporate",
    src: corporateImg,
    category: "corporate_wear",
    title: "Modern Ambition",
    subtitle: "Corporate",
    cta: "Shop Corporate"
  },
  {
    id: "vintage",
    src: vintageImg,
    category: "vintage",
    title: "Timeless Heritage",
    subtitle: "Vintage",
    cta: "Shop Vintage"
  },
  {
    id: "culture",
    src: cultureImg,
    category: "native_wear",
    title: "The Culture",
    subtitle: "Native Wears",
    cta: "Shop Native Wears"
  }
];

export function GalleryHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const offsetY = useParallax(0.15);

  // Auto-advance slides every 6 seconds.
  // Including currentSlide in the dependency array ensures that manual clicks reset the timer.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[100svh] bg-[#0D0D0D] overflow-hidden">
      
      {/* =========================================
          BACKGROUND: MOBILE GRID (< 768px)
          ========================================= */}
      <div className="absolute inset-0 w-full h-full md:hidden grid grid-cols-2 grid-rows-3 z-0">
        <div className="col-span-2 row-span-1 relative overflow-hidden">
          <Image src={slides[0].src} alt={slides[0].title} fill placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <Image src={slides[1].src} alt={slides[1].title} fill placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <Image src={slides[2].src} alt={slides[2].title} fill placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <Image src={slides[3].src} alt={slides[3].title} fill placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <Image src={slides[4].src} alt={slides[4].title} fill placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* =========================================
          BACKGROUND: DESKTOP CAROUSEL (>= 768px)
          ========================================= */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-0">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div 
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <div 
                className="absolute inset-0 w-full h-[130%]"
                style={{ transform: `translateY(${offsetY}px)`, top: "-15%" }}
              >
                <Image 
                  src={slide.src} 
                  alt={slide.title} 
                  fill 
                  placeholder="blur"
                  priority={index === 0}
                  className={cn(
                    "object-cover object-center transition-transform duration-[6000ms] ease-out",
                    isActive ? "scale-100" : "scale-110"
                  )} 
                />
              </div>
              <div 
                className="absolute inset-0 transition-opacity duration-[1500ms]" 
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 30%, transparent 100%)" }}
              />
            </div>
          );
        })}
      </div>

      {/* Grain texture overlay for luxury editorial feel */}
      <div className="grain-overlay opacity-[0.03] absolute inset-0 z-20 pointer-events-none mix-blend-overlay" />

      {/* =========================================
          CENTERED TYPOGRAPHY & UI OVERLAY
          ========================================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-between z-30 pointer-events-none pt-0 md:pt-24 pb-0 md:pb-32 bg-black/20 md:bg-transparent">
        
        {/* Middle: Dynamic Titles */}
        <div className="relative w-full h-[300px] flex justify-center items-center">
          {slides.map((slide, index) => (
            <div 
              key={`title-${slide.id}`}
              className={cn(
                "absolute flex flex-col items-center text-center transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                index === currentSlide 
                  ? "opacity-100 translate-y-0 z-10 pointer-events-auto md:block" 
                  : "opacity-0 translate-y-8 z-0 pointer-events-none hidden md:block",
                "md:flex", // desktop keeps crossfade, mobile just shows first slide always? 
                // wait, if mobile shows all images in a grid, the text should just be static on mobile.
                // Let's make mobile static for text too!
                "hidden md:flex" 
              )}
            >
              <h3 className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-[0.3em] mb-4 drop-shadow-md">
                Est. 2026 · Abuja
              </h3>
              <h1 className="font-display text-[#F5F0E8] text-[clamp(60px,18vw,100px)] leading-[0.9] tracking-[0.02em] drop-shadow-2xl">
                {slide.title}
              </h1>
              <h2 className="font-serif italic text-[#B8962E] text-[clamp(24px,4vw,40px)] mt-2 drop-shadow-lg">
                {slide.subtitle}
              </h2>
              
              {/* Slide-specific CTA */}
              <div className="mt-8 md:mt-10">
                <Link 
                  href={`/shop?category=${slide.category}`} 
                  className="group inline-flex items-center justify-center gap-3 bg-[#1A1A1A]/40 border border-[#E8E0D0] px-8 py-4 overflow-hidden relative transition-colors duration-300 hover:bg-[#E8E0D0] backdrop-blur-md cursor-pointer"
                >
                  {/* Button Text */}
                  <span className="font-mono text-[12px] text-[#F5F0E8] group-hover:text-[#0D0D0D] font-bold uppercase tracking-[0.2em] relative z-10 transition-colors duration-300">
                    {slide.cta}
                  </span>
                  
                  {/* Hover Arrow */}
                  <span className="font-mono text-[14px] text-[#F5F0E8] group-hover:text-[#0D0D0D] relative z-10 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}

          {/* Static Mobile Text Overlay */}
          <div className="absolute flex md:hidden flex-col items-center text-center z-10 pointer-events-auto w-full px-6">
            <h3 className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-[0.3em] mb-4 drop-shadow-md">
              Est. 2026 · Abuja
            </h3>
            <h1 className="font-display text-[#F5F0E8] text-[clamp(60px,18vw,100px)] leading-[0.9] tracking-[0.02em] drop-shadow-2xl">
              OWL FAMILY
            </h1>
            <h2 className="font-serif italic text-[#B8962E] text-2xl mt-2 drop-shadow-lg">
              Wear the culture.
            </h2>
            
            <div className="mt-8">
              <Link 
                href="/shop" 
                className="group inline-flex items-center justify-center gap-3 bg-[#C4622D] px-8 py-4 relative transition-colors duration-300 hover:bg-[#B8962E] cursor-pointer"
              >
                <span className="font-mono text-[12px] text-[#F5F0E8] font-bold uppercase tracking-[0.2em]">
                  Explore Collection
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-[20px]" />
      </div>

      {/* =========================================
          PROGRESS INDICATORS (SLIDE NAVIGATION)
          ========================================= */}
      <div className="hidden absolute bottom-10 left-0 right-0 md:flex justify-center gap-2 md:gap-4 z-30 pointer-events-auto px-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-4 px-1 cursor-pointer flex-1 max-w-[60px] md:max-w-[80px]"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="relative w-full h-[2px] bg-[#E8E0D0]/20 overflow-hidden">
              <div 
                className={cn(
                  "absolute top-0 left-0 h-full bg-[#EAE5D9]",
                  index === currentSlide ? "w-full transition-all ease-linear" : "w-0",
                  index === currentSlide ? "duration-[6000ms]" : "duration-300"
                )}
                style={index < currentSlide ? { width: '100%', transitionDuration: '300ms' } : {}}
              />
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}
