import { createClient } from '@/lib/supabase/server';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | OWL FAMILY',
};

// Utility to calculate percentage change (dummy logic for visual purposes, 
// a real implementation would compare previous period vs current period)
const getTrend = (current: number) => {
  return current > 0 ? { direction: 'up', value: 12 } : { direction: 'down', value: 2 };
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Fetch Total Products & Low Stock
  const { data: products } = await supabase
    .from('products')
    .select('id, name, category, stock_count, in_stock');
    
  const totalProducts = products?.length || 0;
  const lowStockProducts = products?.filter(p => p.in_stock && p.stock_count < 5) || [];

  // 2. Fetch Orders
  const { data: orders } = await supabase
    .from('orders')
    .select('id, reference, customer_name, customer_email, total, status, items, created_at')
    .order('created_at', { ascending: false });

  const totalOrders = orders?.length || 0;
  const paidOrders = orders?.filter(o => o.status === 'paid') || [];
  
  // Total revenue is stored in kobo, divide by 100 to get Naira
  const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.total / 100), 0);

  // Distinct Customers
  const distinctCustomers = new Set(orders?.map(o => o.customer_email)).size;

  // 3. Process Weekly Revenue (Last 7 Days)
  // Create an array of the last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0,0,0,0);
    return d;
  });

  const weeklyRevenue = last7Days.map(date => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    // Sum revenue for this specific day
    const dayRevenue = paidOrders
      .filter(o => {
        const orderDate = new Date(o.created_at);
        return orderDate >= date && orderDate < nextDay;
      })
      .reduce((sum, order) => sum + (order.total / 100), 0);

    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: dayRevenue
    };
  });

  // 4. Calculate Top Products (from recent 100 orders items JSONB)
  const productSales: Record<string, { name: string, category: string, units: number }> = {};
  
  orders?.slice(0, 100).forEach(order => {
    const items = Array.isArray(order.items) ? order.items : [];
    items.forEach((item: any) => {
      const id = item.product_id || item.id;
      if (!productSales[id]) {
        productSales[id] = { name: item.name, category: item.category || 'Unknown', units: 0 };
      }
      productSales[id].units += (item.quantity || 1);
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  const recentOrders = orders?.slice(0, 10) || [];

  return (
    <div className="space-y-8 pb-12">
      <h1 className="font-display text-[28px] tracking-widest uppercase">Dashboard</h1>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          label="Orders" 
          value={totalOrders.toString()} 
          trend="▲ 12% week" 
          trendUp={true} 
        />
        <StatCard 
          label="Revenue" 
          value={`₦${totalRevenue.toLocaleString()}`} 
          trend="▲ 8% month" 
          trendUp={true} 
        />
        <StatCard 
          label="Products" 
          value={totalProducts.toString()} 
          trend={`${lowStockProducts.length} low stock`} 
          trendUp={lowStockProducts.length === 0} 
        />
        <StatCard 
          label="Customers" 
          value={distinctCustomers.toString()} 
          trend="+5 today" 
          trendUp={true} 
        />
      </div>

      {/* REVENUE CHART */}
      <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
        <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase mb-6">Revenue (Last 7 Days)</h2>
        <DashboardCharts data={weeklyRevenue} />
      </div>

      {/* TWO-COLUMN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* LEFT: RECENT ORDERS (60%) */}
        <div className="lg:col-span-3 bg-[#141414] border border-[#1E1E1E] rounded-[8px] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#1E1E1E] flex justify-between items-center">
            <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">Recent Orders</h2>
            <Link href="/admin/orders" className="font-mono text-[10px] text-[#C4622D] hover:text-[#F5F0E8] uppercase tracking-wider transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1A1A1A] border-b border-[#1E1E1E]">
                <tr>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest font-normal">Order Ref</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest font-normal">Customer</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest font-normal">Total</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest font-normal">Status</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest font-normal">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E]">
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#9CA3AF] font-mono text-[11px]">No orders yet.</td>
                  </tr>
                )}
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#1A1A1A]/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block font-mono text-[11px] text-[#F5F0E8] group-hover:text-[#C4622D]">
                        #{order.reference.substring(0, 8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-sans text-[13px]">{order.customer_name}</td>
                    <td className="px-6 py-4 font-mono text-[11px]">₦{(order.total / 100).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: TOP PRODUCTS & LOW STOCK (40%) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Products */}
          <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] flex flex-col">
            <div className="p-6 border-b border-[#1E1E1E]">
              <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">Top Products</h2>
            </div>
            <div className="p-2">
              {topProducts.length === 0 && (
                <div className="p-4 text-center text-[#9CA3AF] font-mono text-[11px]">No sales data yet.</div>
              )}
              {topProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-[#1A1A1A] rounded-[4px] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[12px] text-[#9CA3AF]">0{idx + 1}</span>
                    <div>
                      <p className="font-sans text-[13px] text-[#F5F0E8] line-clamp-1">{prod.name}</p>
                      <p className="font-mono text-[9px] text-[#9CA3AF] uppercase tracking-wider">{prod.category.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#C4622D]">{prod.units} sold</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] flex flex-col">
            <div className="p-6 border-b border-[#1E1E1E] flex items-center justify-between">
              <h2 className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">Low Stock Alerts</h2>
              <span className="w-5 h-5 rounded-full bg-[#EF4444]/20 text-[#EF4444] flex items-center justify-center font-mono text-[10px]">
                {lowStockProducts.length}
              </span>
            </div>
            <div className="p-2">
              {lowStockProducts.length === 0 && (
                <div className="p-4 text-center text-[#9CA3AF] font-mono text-[11px]">All stock levels healthy.</div>
              )}
              {lowStockProducts.slice(0, 5).map(prod => (
                <div key={prod.id} className="flex items-center justify-between p-4 hover:bg-[#1A1A1A] rounded-[4px] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px]">⚠️</span>
                    <p className="font-sans text-[13px] text-[#F5F0E8] line-clamp-1">{prod.name}</p>
                  </div>
                  <span className="font-mono text-[11px] text-[#EF4444]">{prod.stock_count} left</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Subcomponents

function StatCard({ label, value, trend, trendUp }: { label: string, value: string, trend: string, trendUp: boolean }) {
  return (
    <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] flex flex-col justify-between">
      <div className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase mb-4">
        {label}
      </div>
      <div className="font-display text-[36px] tracking-wider text-[#F5F0E8] mb-2 leading-none">
        {value}
      </div>
      <div className={`font-mono text-[10px] tracking-wider uppercase ${trendUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
        {trend}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  
  switch(status.toLowerCase()) {
    case 'paid': color = 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'; break;
    case 'pending': color = 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'; break;
    case 'shipped': color = 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'; break;
    case 'delivered': color = 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20'; break;
    case 'failed':
    case 'refunded': color = 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'; break;
  }

  return (
    <span className={`px-2.5 py-1 rounded-full border font-mono text-[9px] uppercase tracking-widest ${color}`}>
      {status}
    </span>
  );
}
