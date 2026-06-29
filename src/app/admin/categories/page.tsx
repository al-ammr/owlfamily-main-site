import { createClient } from '@/lib/supabase/server';
import { CategoriesClient } from '@/components/admin/CategoriesClient';

export const metadata = {
  title: 'Categories | Admin',
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('category');
  
  // Aggregate counts
  const counts = (products || []).reduce((acc: any, p: any) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return <CategoriesClient counts={counts} />;
}
