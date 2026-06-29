import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface FeaturedBlogCardProps {
  post: BlogPost;
  reverse?: boolean;
}

export function FeaturedBlogCard({ post, reverse = false }: FeaturedBlogCardProps) {
  // Use Cloudinary builder to auto-optimize uploaded images, local placeholders pass through
  const imageUrl = getCloudinaryUrl(post.coverImage, { width: 800, height: 800, crop: "fill" });

  return (
    <AnimatedSection animation="fadeIn" delay={100} className="w-full max-w-[1440px] mx-auto px-6 md:px-10 mb-20">
      <div className={`flex flex-col md:flex-row w-full h-auto md:h-[520px] bg-[#141414] border border-[#1E1E1E] overflow-hidden group ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Image Half */}
        <Link href={`/blogs/${post.slug}`} className="relative w-full md:w-1/2 h-[300px] md:h-full overflow-hidden block">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] ease-[cubic-bezier(0.16,1,0.3,1)]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </Link>

        {/* Content Half */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-[#0D0D0D]">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#C4622D]/10 text-[#C4622D] font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-[#C4622D]/20">
              {post.categoryLabel}
            </span>
            <span className="font-mono text-[10px] text-[#8A9A9E] tracking-widest uppercase">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <Link href={`/blogs/${post.slug}`} className="block mb-6">
            <h3 className="font-display text-[#F5F0E8] text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-wider uppercase group-hover:text-[#C4622D] transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="font-serif italic text-[#8A9A9E] text-lg lg:text-xl mb-8 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-[#1E1E1E] pt-6">
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={post.authorAvatar} alt={post.authorName} fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#F5F0E8] font-mono text-xs border border-[#333]">
                  {post.authorName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#F5F0E8] tracking-widest uppercase">{post.authorName}</span>
                <span className="font-mono text-[9px] text-[#8A9A9E] tracking-widest uppercase">{post.readTime} Min Read</span>
              </div>
            </div>

            <Link 
              href={`/blogs/${post.slug}`}
              className="flex items-center gap-2 font-mono text-[11px] text-[#C4622D] uppercase tracking-[0.2em] group/btn"
            >
              Read Article 
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
