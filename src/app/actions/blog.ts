'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function saveBlogPost(postPayload: any, id?: string) {
  const supabase = createAdminClient();
  
  if (id) {
    const { data, error } = await supabase.from('blog_posts').update(postPayload).eq('id', id).select();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("Update failed: Post not found or no changes made.");
    console.log("Updated post:", data[0].id);
  } else {
    const { data, error } = await supabase.from('blog_posts').insert([postPayload]).select();
    if (error) throw new Error(error.message);
    console.log("Inserted post:", data[0].id);
  }
  
  // Revalidate routes to immediately reflect changes and avoid caching stale data
  revalidatePath('/admin/blogs');
  revalidatePath('/admin/blogs/[id]', 'page');
  if (id) {
    revalidatePath(`/admin/blogs/${id}`);
  }
  revalidatePath('/blogs');
  if (postPayload.slug) {
    revalidatePath(`/blogs/${postPayload.slug}`);
  }
  revalidatePath('/'); // Refresh landing page blog section
  
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/blogs');
  revalidatePath('/blogs');
  revalidatePath('/');
  
  return { success: true };
}
