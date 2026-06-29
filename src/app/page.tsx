import { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { LatestCollection } from "@/components/landing/LatestCollection";
import { PromoBanner } from "@/components/landing/PromoBanner";
import { TrendingCarousel } from "@/components/landing/TrendingCarousel";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { BlogSection } from "@/components/landing/BlogSection";
import { RecommendedSection } from "@/components/landing/RecommendedSection";
import { PRODUCTS } from "@/data/products";
import { CATEGORY_LABELS } from "@/types";

export const metadata: Metadata = {
  title: "OWL FAMILY | Wear the Culture. Own the Look.",
  description: "Discover the latest in premium streetwear, native wear, and corporate fashion. Shop the newest collections curated for those who define the culture.",
  openGraph: {
    title: "OWL FAMILY | Wear the Culture",
    description: "Discover the latest in premium streetwear, native wear, and corporate fashion.",
    url: "https://owlfamily.com",
    siteName: "OWL FAMILY",
    images: [
      {
        url: "/images/hero/streetwear.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch Testimonials
  const { data: testimonials, error: testimonialsError } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (testimonialsError) console.error("Error fetching testimonials:", testimonialsError);

  // Fetch Blog Posts
  const { data: blogPosts, error: blogsError } = await supabase
    .from("blog_posts")
    .select("id, title, excerpt, cover_image, slug, category, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (blogsError) console.error("Error fetching blog posts:", blogsError);

  // Fetch Products
  const { data: dbProducts, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (productsError) console.error("Error fetching products:", productsError);

  // Map DB Products to UI Product interface
  const formattedProducts = dbProducts && dbProducts.length > 0 
    ? dbProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        categoryLabel: CATEGORY_LABELS[p.category as keyof typeof CATEGORY_LABELS] || p.category,
        price: p.price / 100,
        originalPrice: p.original_price ? p.original_price / 100 : undefined,
        badge: p.badge,
        sizes: p.sizes || [],
        images: p.images || [],
        description: p.description || '',
        inStock: p.in_stock,
        stockCount: p.stock_count,
        featured: p.featured,
        createdAt: p.created_at
      }))
    : PRODUCTS;

  // Fallback Data
  const defaultTestimonials = [
    {
      id: "1",
      name: "Tunde O.",
      label: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80",
      headline: "Exceptional Quality",
      quote: "The fabric quality of the native wear is absolutely unmatched. It feels premium, breathes well, and the fit is tailored to perfection.",
      rating: 5
    },
    {
      id: "2",
      name: "Sarah M.",
      label: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
      headline: "Perfect Streetwear",
      quote: "Finally a brand that understands the balance between culture and modern streetwear. The oversized hoodie has been my daily go-to.",
      rating: 5
    }
  ];

  const defaultBlogs = [
    {
      id: "1",
      title: "The Evolution of African Streetwear in 2026",
      excerpt: "How traditional prints and modern oversized silhouettes are merging to create a new global standard in fashion.",
      cover_image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=450&fit=crop&q=80",
      slug: "evolution-african-streetwear-2026",
      category: "culture",
      published_at: "2026-06-12T00:00:00.000Z"
    },
    {
      id: "2",
      title: "Mastering Smart Casual for the Abuja Boardroom",
      excerpt: "Striking the perfect balance between professional respect and personal style in the corporate world.",
      cover_image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=450&fit=crop&q=80",
      slug: "mastering-smart-casual",
      category: "tips",
      published_at: "2026-05-28T00:00:00.000Z"
    },
    {
      id: "3",
      title: "Why Vintage Will Never Go Out of Style",
      excerpt: "A deep dive into the sustainability and timeless aesthetic of reviving classic garments for the modern wardrobe.",
      cover_image: "https://images.unsplash.com/photo-1550614000-4b95d466f16b?w=800&h=450&fit=crop&q=80",
      slug: "vintage-never-out-of-style",
      category: "style-guide",
      published_at: "2026-04-15T00:00:00.000Z"
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const displayBlogs = blogPosts && blogPosts.length > 0 ? blogPosts : defaultBlogs;

  return (
    <main className="w-full bg-[#0D0D0D] min-h-screen flex flex-col">
      <HeroSection />
      <MarqueeStrip />
      <TrustBadges />
      <LatestCollection products={formattedProducts} />
      <PromoBanner />
      <TrendingCarousel products={formattedProducts} />
      <TestimonialsCarousel testimonials={displayTestimonials} />
      <BlogSection posts={displayBlogs} />
      <RecommendedSection />
    </main>
  );
}
