import { createClient } from '@/lib/supabase/server';
import { OrderDetailClient } from '@/components/admin/OrderDetailClient';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Order Details | Admin',
};

export default async function AdminOrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !order) {
    console.error('Error fetching order:', error);
    notFound();
  }

  return <OrderDetailClient order={order} />;
}
