import { createClient } from '@/lib/supabase/server';
import { BlogForm } from "@/components/admin/BlogForm";
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Edit Post | Admin",
};

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  return <BlogForm initialData={post} />;
}
