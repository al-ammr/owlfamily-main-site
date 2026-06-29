"use client";

import { useEffect } from "react";
import { incrementViews } from "@/lib/blog";

interface ViewTrackerProps {
  slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Fire and forget server action to increment views
    incrementViews(slug).catch(console.error);
  }, [slug]);

  return null;
}
