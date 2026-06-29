"use client";

import { useState, useEffect } from "react";

export function useParallax(speed: number = 0.15) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Disable on mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}
