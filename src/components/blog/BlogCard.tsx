import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Use Cloudinary builder to auto-optimize uploaded images, local placeholders pass through
  const imageUrl = getCloudinaryUrl(post.coverImage, { width: 600, height: 400, crop: "fill" });

  return (
    <div className="flex flex-col group w-full">
      <Link href={`/blogs/${post.slug}`} className="relative w-full aspect-[16/9] overflow-hidden mb-5 bg-[#141414] border border-[#1E1E1E]">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute top-4 left-4 bg-[#0D0D0D]/80 backdrop-blur-md text-[#F5F0E8] font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-[#333]">
          {post.categoryLabel}
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 text-[#8A9A9E] font-mono text-[9px] uppercase tracking-widest">
          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span>{post.readTime} MIN READ</span>
        </div>

        <Link href={`/blogs/${post.slug}`} className="block mb-3">
          <h4 className="font-display text-[#F5F0E8] text-2xl tracking-wide uppercase leading-tight group-hover:text-[#C4622D] transition-colors">
            {post.title}
          </h4>
        </Link>

        <p className="font-serif italic text-[#8A9A9E] text-base leading-relaxed line-clamp-2 mb-6">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1E1E1E]">
          <span className="font-mono text-[10px] text-[#F5F0E8] tracking-widest uppercase">
            BY {post.authorName}
          </span>
          <Link 
            href={`/blogs/${post.slug}`}
            className="flex items-center gap-1.5 font-mono text-[10px] text-[#C4622D] uppercase tracking-[0.2em] group/link"
          >
            Read More 
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
