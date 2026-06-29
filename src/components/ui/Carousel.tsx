"use client";

import { useState, useRef, useEffect, ReactNode, Children } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode[];
  visibleCount?: number;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  children,
  visibleCount = 4,
  autoPlay = false,
  interval = 5000,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const items = Children.toArray(children);
  const totalItems = items.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Check boundaries for disabled arrows
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);

    // Calculate active dot index (approximation based on scroll percentage)
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const maxIndex = totalItems - 1;
    const newIndex = Math.round(scrollPercentage * maxIndex);
    
    if (!isNaN(newIndex)) {
      setActiveIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    }
  };

  const scrollBy = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    // Scroll by the width of the container
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToDot = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    
    const maxIndex = totalItems - 1;
    // Target scroll position
    const targetScroll = ((scrollWidth - clientWidth) / maxIndex) * index;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Auto Play Logic
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
        // At the end, loop back to start
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right
        scrollBy("right");
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <div className="relative w-full flex flex-col items-center">
      
      {/* Navigation Arrows & Track Wrapper */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* Left Arrow */}
        <button
          onClick={() => scrollBy("left")}
          disabled={isAtStart}
          className={cn(
            "absolute left-2 md:-left-5 z-10 w-[44px] h-[44px] rounded-full bg-[#F5F0E8] border border-[#D8D0C0] flex items-center justify-center text-[#0D0D0D] transition-colors",
            "hover:bg-[#C4622D] hover:text-[#F5F0E8]",
            isAtStart && "opacity-30 cursor-not-allowed hover:bg-[#F5F0E8] hover:text-[#0D0D0D]"
          )}
          aria-label="Previous Slide"
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 h-full"
              style={{
                // Responsive width handled via inline vars/styles based on visibleCount prop
                width: `calc(100% / var(--visible-mobile))`,
              }}
              // Tailwind doesn't support dynamic arbitrary variables easily without inline styles for generic props.
              // Instead, we inject custom properties that we use in a style block or direct percentage.
            >
              {/* To handle exact responsive widths while keeping gap/padding clean, we use custom wrapper width logic */}
              <div 
                className="w-full h-full px-2"
                style={{
                  width: "100%",
                }}
              >
                {child}
              </div>
            </div>
          ))}
        </div>

        {/* Global style for responsive custom property based on visibleCount */}
        <style jsx>{`
          .snap-start {
            /* Desktop */
            width: calc(100% / ${visibleCount});
          }
          @media (max-width: 1024px) {
            .snap-start {
              /* Tablet */
              width: calc(100% / 2);
            }
          }
          @media (max-width: 768px) {
            .snap-start {
              /* Mobile */
              width: calc(100% / 1.2);
            }
          }
        `}</style>

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy("right")}
          disabled={isAtEnd}
          className={cn(
            "absolute right-2 md:-right-5 z-10 w-[44px] h-[44px] rounded-full bg-[#F5F0E8] border border-[#D8D0C0] flex items-center justify-center text-[#0D0D0D] transition-colors",
            "hover:bg-[#C4622D] hover:text-[#F5F0E8]",
            isAtEnd && "opacity-30 cursor-not-allowed hover:bg-[#F5F0E8] hover:text-[#0D0D0D]"
          )}
          aria-label="Next Slide"
        >
          <ChevronRight strokeWidth={1.5} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => scrollToDot(idx)}
              className={cn(
                "h-2 rounded-[4px] transition-all duration-300 pointer-events-auto",
                isActive ? "w-6 bg-[#C4622D]" : "w-2 bg-[#D8D0C0]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
      
    </div>
  );
}
