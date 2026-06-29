"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-8 right-6 md:bottom-12 md:right-10 z-[500]",
        "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full",
        "bg-[#1A1A1A]/80 backdrop-blur-md border border-[#333] hover:border-[#C4622D]",
        "text-[#F5F0E8] hover:text-[#C4622D] shadow-lg",
        "transition-all duration-500 ease-out",
        "group",
        isVisible 
          ? "translate-y-0 opacity-100 pointer-events-auto scale-100" 
          : "translate-y-8 opacity-0 pointer-events-none scale-90"
      )}
    >
      <ArrowUp 
        strokeWidth={1.5} 
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1" 
      />
    </button>
  );
}
