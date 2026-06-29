import { createClient } from '@/lib/supabase/server';
import { OrdersTableClient } from '@/components/admin/OrdersTableClient';

export const metadata = {
  title: 'Manage Orders | Admin',
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
  }

  return <OrdersTableClient initialOrders={orders || []} />;
}
