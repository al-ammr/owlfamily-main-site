"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string;
  slug: string;
  published_at: string;
  category: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="w-full bg-[#E8E0D0] py-20 px-6 md:px-12 border-b border-[#D8D0C0]">
      <AnimatedSection className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <SectionHeader 
          title="Our Blogs" 
          subtitle="Stay inspired with our latest stories and updates" 
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <AnimatedSection 
              key={post.id}
              animation="fadeUp"
              delay={index * 60}
            >
              <Link 
                href={`/blogs/${post.slug}`}
                className="group flex flex-col bg-[#DFD8C8] border border-[#D8D0C0] hover:border-[#C4622D] transition-colors duration-300 h-full"
              >
                {/* 16:9 Image Container */}
                <div className="relative w-full aspect-video overflow-hidden border-b border-[#D8D0C0] bg-[#1E1E1E]">
                  {post.cover_image ? (
                    <Image
                      src={getCloudinaryUrl(post.cover_image, { width: 600, height: 400, crop: "fill" })}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#9CA3AF] font-mono text-[10px]">
                      No Image Available
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 font-mono text-[10px] text-[#544E45] uppercase tracking-[0.2em]">
                    <span className="text-[#C4622D]">{post.category.replace("-", " ")}</span>
                    <span>•</span>
                    <span>{new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  
                  <h3 className="font-serif font-semibold text-[#0D0D0D] text-xl md:text-2xl leading-tight mb-3 group-hover:text-[#C4622D] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="font-serif text-[#544E45] text-base leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="font-mono text-[11px] text-[#0D0D0D] uppercase tracking-[0.2em] font-bold group-hover:text-[#C4622D] transition-colors">
                    Read Article →
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/blogs"
            className="border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.2em] px-8 py-4 transition-colors duration-300"
          >
            View All Articles
          </Link>
        </div>

      </AnimatedSection>
    </section>
  );
}
