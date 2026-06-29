"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeIn" | "scaleUp" | "slideInLeft" | "slideInRight" | "none";
  delay?: number; // in ms
  threshold?: number;
  triggerOnce?: boolean;
}

export function AnimatedSection({
  children,
  animation = "fadeUp",
  delay = 0,
  className,
  threshold = 0,
  triggerOnce = true,
  ...props
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold, triggerOnce });

  // Let's map specific animations
  let specificAnimClass = "";
  switch (animation) {
    case "fadeUp": specificAnimClass = "anim-fadeUp"; break;
    case "fadeIn": specificAnimClass = "anim-fadeIn"; break;
    case "scaleUp": specificAnimClass = "anim-scaleUp"; break;
    case "slideInLeft": specificAnimClass = "anim-slideInLeft"; break;
    case "slideInRight": specificAnimClass = "anim-slideInRight"; break;
    case "none": specificAnimClass = ""; break;
    default: specificAnimClass = "anim-fadeUp";
  }

  return (
    <div
      ref={ref}
      className={cn(
        // If specific animation is provided, use opacity-0 initially, remove when in view.
        // If no specific animation, fallback to animate-on-scroll base class.
        specificAnimClass ? (!isInView ? "opacity-0" : "") : "animate-on-scroll",
        isInView && "in-view",
        isInView && specificAnimClass,
        className
      )}
      style={{
        ...props.style,
        animationDelay: delay ? `${delay}ms` : undefined,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
