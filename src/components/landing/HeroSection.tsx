"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/useParallax";

import streetwearImg from "../../../public/images/hero/streetwear.jpg";
import smartCasualImg from "../../../public/images/hero/smart-casual.jpg";
import corporateImg from "../../../public/images/hero/corporate.jpg";
import vintageImg from "../../../public/images/hero/vintage.jpg";
import cultureImg from "../../../public/images/hero/culture.jpg";

const BACKGROUND_IMAGES = [
  streetwearImg,
  smartCasualImg,
  corporateImg,
  vintageImg,
  cultureImg
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const offsetY = useParallax(0.15);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100vh] bg-[#0D0D0D] overflow-hidden flex items-center justify-center">
      
      {/* 1. Background Slider Container */}
      <div 
        className="absolute inset-0 flex transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {BACKGROUND_IMAGES.map((img, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <div 
              className="absolute inset-0 w-full h-[130%]"
              style={{ transform: `translateY(${offsetY}px)`, top: "-15%" }}
            >
              <Image
                src={img}
                alt={`Hero Background ${idx + 1}`}
                fill
                className={cn(
                  "object-cover object-top transition-transform duration-[10000ms]",
                  activeIndex === idx ? "scale-105" : "scale-100"
                )}
                priority={idx === 0}
                placeholder="blur"
              />
            </div>
            {/* Dark gradient overlay to ensure text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/40 to-[#0D0D0D]/30" />
          </div>
        ))}
      </div>

      {/* 2. Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="font-display text-[25vw] leading-none text-[#F5F0E8] opacity-10 whitespace-nowrap tracking-tighter mix-blend-overlay">
          OWL FAMILY
        </h1>
      </div>

      {/* 3. Center Typography Block */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-16">
        <span 
          className="font-serif italic text-[#B8962E] text-[28px] md:text-[32px] mb-4 animate-fade-up"
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}
        >
          New Season
        </span>
        
        <h2 
          className="font-display text-[#F5F0E8] text-[clamp(48px,8vw,96px)] leading-[0.9] tracking-[0.02em] uppercase mb-6 animate-fade-up drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
          style={{ 
            animationDelay: '100ms',
            textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)' 
          }}
        >
          Discover Trends That Match Your Style
        </h2>
        
        <p 
          className="font-serif italic text-[#E8E0D0] text-[18px] md:text-[22px] mb-10 max-w-lg animate-fade-up font-semibold"
          style={{ 
            animationDelay: '200ms',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)'
          }}
        >
          Wear the culture. Own the look.
        </p>

        <Link 
          href="/shop"
          className="bg-[#C4622D] text-[#F5F0E8] font-mono text-[12px] md:text-[14px] uppercase tracking-[0.2em] px-10 py-5 btn-primary animate-fade-up shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: '300ms' }}
        >
          <span>Explore Collection →</span>
        </Link>
      </div>

      {/* 4. Pagination Dots for Background Slider */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {BACKGROUND_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
              activeIndex === idx ? "w-10 bg-[#C4622D]" : "w-3 bg-[#EAE5D9]/50 hover:bg-[#EAE5D9]"
            }`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
