"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { Check, Copy, Share2, MessageCircle } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface StickySidebarProps {
  toc: TocItem[];
  relatedPosts: BlogPost[];
  title: string;
  slug: string;
}

export function StickySidebar({ toc, relatedPosts, title, slug }: StickySidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Set up IntersectionObserver to highlight active TOC item
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // trigger when near the top
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blogs/${slug}`);
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      const url = shareUrl || `${window.location.origin}/blogs/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const encodedText = encodeURIComponent(`${title} \n${shareUrl}`);

  return (
    <aside className="hidden lg:flex flex-col gap-12 sticky top-[100px] w-full max-w-[320px]">
      
      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="flex flex-col">
          <h4 className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-widest mb-6 pb-4 border-b border-[#1E1E1E]">
            Table of Contents
          </h4>
          <nav className="flex flex-col gap-3 border-l border-[#1E1E1E]">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-serif italic text-[15px] transition-colors duration-300 py-1 border-l-[2px] -ml-[1px] pl-4 ${
                  activeId === item.id 
                    ? "text-[#C4622D] border-[#C4622D]" 
                    : "text-[#8A9A9E] border-transparent hover:text-[#F5F0E8]"
                } ${item.level === 3 ? "ml-4" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(item.id);
                }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="flex flex-col">
          <h4 className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-widest mb-6 pb-4 border-b border-[#1E1E1E]">
            Related Posts
          </h4>
          <div className="flex flex-col gap-6">
            {relatedPosts.map((post) => {
              const imgUrl = post.coverImage.startsWith('/')
                ? getCloudinaryUrl(post.coverImage, { width: 150, height: 150, crop: "fill" })
                : post.coverImage;

              return (
                <Link key={post.id} href={`/blogs/${post.slug}`} className="flex items-center gap-4 group">
                  <div className="relative w-16 h-16 shrink-0 bg-[#141414] overflow-hidden">
                    <Image 
                      src={imgUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <h5 className="font-display text-[#F5F0E8] text-lg leading-tight uppercase tracking-wider group-hover:text-[#C4622D] transition-colors line-clamp-2">
                    {post.title}
                  </h5>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div className="flex flex-col">
        <h4 className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-widest mb-6 pb-4 border-b border-[#1E1E1E]">
          Share
        </h4>
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#8A9A9E] hover:text-[#F5F0E8] hover:border-[#F5F0E8] transition-colors"
            aria-label="Share on Instagram"
          >
            <Share2 className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#8A9A9E] hover:text-[#F5F0E8] hover:border-[#F5F0E8] transition-colors"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#8A9A9E] hover:text-[#F5F0E8] hover:border-[#F5F0E8] transition-colors relative"
            aria-label="Copy Link"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#333] text-white text-[10px] font-mono px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
