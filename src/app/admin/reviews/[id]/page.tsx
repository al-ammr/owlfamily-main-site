import { createClient } from '@/lib/supabase/server';
import { ReviewForm } from '@/components/admin/ReviewForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Review | Admin',
};

export default async function EditReviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !testimonial) {
    console.error('Error fetching testimonial:', error);
    notFound();
  }

  return <ReviewForm initialData={testimonial} />;
}
