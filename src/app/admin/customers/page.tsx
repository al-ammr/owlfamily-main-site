import { createClient } from '@/lib/supabase/server';
import { CustomersClient } from '@/components/admin/CustomersClient';

export const metadata = {
  title: 'Customers | Admin',
};

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  
  // Fetch all orders
  const { data: orders } = await supabase
    .from('orders')
    .select('customer_email, customer_name, customer_phone, total, created_at')
    .order('created_at', { ascending: false });

  // Aggregate orders into unique customers
  const customerMap = new Map<string, any>();

  (orders || []).forEach((order) => {
    const email = order.customer_email;
    if (!customerMap.has(email)) {
      customerMap.set(email, {
        email,
        name: order.customer_name,
        phone: order.customer_phone,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order.created_at, // Since it's sorted desc, the first one seen is the latest
      });
    }

    const customer = customerMap.get(email);
    customer.totalOrders += 1;
    customer.totalSpent += order.total; // Assumes total is in kobo
  });

  const customers = Array.from(customerMap.values());

  return <CustomersClient customers={customers} />;
}
