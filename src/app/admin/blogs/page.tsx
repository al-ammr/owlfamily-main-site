import { createClient } from '@/lib/supabase/server';
import { BlogsTableClient } from '@/components/admin/BlogsTableClient';

export const metadata = {
  title: 'Manage Blog Posts | Admin',
};

export default async function AdminBlogsPage() {
  const supabase = await createClient();

  // Fetch blogs ordered by newest first
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, published, views, published_at, cover_image')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  return <BlogsTableClient initialPosts={posts || []} />;
}
