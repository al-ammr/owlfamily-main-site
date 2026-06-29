import { createClient } from '@/lib/supabase/server';
import { ReviewsTableClient } from '@/components/admin/ReviewsTableClient';

export const metadata = {
  title: 'Reviews | Admin',
};

export default async function AdminReviewsPage() {
  const supabase = await createClient();
  
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return <ReviewsTableClient testimonials={testimonials || []} />;
}
