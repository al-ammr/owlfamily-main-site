"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoImg from "../../../public/images/brand/logo.png";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Only show on first visit by checking session storage
    const hasVisited = sessionStorage.getItem("owl-family-visited");
    
    if (hasVisited) {
      setIsVisible(false);
      setIsRendered(false);
      return;
    }

    sessionStorage.setItem("owl-family-visited", "true");

    // Fade out after 1.2 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    // Completely remove from DOM after fade transition completes (1200 + 800ms)
    const removeTimer = setTimeout(() => {
      setIsRendered(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0D0D0D] transition-opacity duration-[800ms] ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]">
        <Image 
          src={logoImg}
          alt="OWL FAMILY Logo"
          fill
          className="object-contain invert"
          priority
        />
      </div>
      
      <div className="flex flex-col items-center opacity-0 animate-[fadeUp_0.6s_ease-out_0.2s_forwards]">
        <span className="font-display text-[#F5F0E8] text-4xl tracking-[0.2em]">
          OWL FAMILY
        </span>
        <span className="font-serif italic text-[#B8962E] text-sm mt-2 tracking-widest">
          Wear The Culture
        </span>
      </div>
    </div>
  );
}
