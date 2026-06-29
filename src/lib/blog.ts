"use server";

import { createClient } from '@supabase/supabase-js';
import { BlogPost, BLOG_CATEGORIES } from '@/types';

// Create a public client without cookies for SSG compatibility
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper to format raw database row into BlogPost interface
function formatBlogPost(row: any): BlogPost {
  const categoryLabel = BLOG_CATEGORIES.find(c => c.id === row.category)?.label || 'Style Guide';
  
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    category: row.category,
    categoryLabel,
    tags: row.tags || [],
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    published: row.published,
    featured: row.featured,
    views: row.views,
    readTime: row.read_time,
    createdAt: row.created_at,
    publishedAt: row.published_at,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error || !data) return [];
  return data.map(formatBlogPost);
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return formatBlogPost(data);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error || !data) return [];
  return data.map(formatBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return formatBlogPost(data);
}

export async function getRelatedPosts(currentSlug: string, category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(3);

  if (error || !data) return [];
  return data.map(formatBlogPost);
}

export async function incrementViews(slug: string): Promise<void> {
  // Read first to get current views
  const { data: post } = await supabase
    .from('blog_posts')
    .select('views')
    .eq('slug', slug)
    .single();
    
  if (post) {
    await supabase
      .from('blog_posts')
      .update({ views: post.views + 1 })
      .eq('slug', slug);
  }
}
