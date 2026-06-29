import { createClient } from '@/lib/supabase/server';
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from 'next/navigation';

export const metadata = {
  title: "Edit Product | Admin",
};

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    console.error('Error fetching product:', error);
    notFound();
  }

  return <ProductForm initialData={product} />;
}
