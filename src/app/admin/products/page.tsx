import { createClient } from '@/lib/supabase/server';
import { ProductsTableClient } from '@/components/admin/ProductsTableClient';

export const metadata = {
  title: 'Manage Products | Admin',
};

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  return <ProductsTableClient initialProducts={products || []} />;
}
