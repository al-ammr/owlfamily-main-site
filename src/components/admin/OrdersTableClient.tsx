"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Order {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  items: any[];
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export function OrdersTableClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter logic
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.reference.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || o.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Simple date filter (matches YYYY-MM-DD prefix)
    const matchesDate = !dateFilter || o.created_at.startsWith(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI update
    const previousOrders = [...orders];
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

    const supabase = createClient();
    
    // We also need to append to status_history
    const orderToUpdate = orders.find(o => o.id === id);
    if (!orderToUpdate) return;
    
    const newHistoryEvent = {
      status: newStatus,
      date: new Date().toISOString(),
      user: "Admin (Inline)",
      note: "Status updated from list view"
    };

    // Note: To append to JSONB in Supabase via JS client cleanly, we fetch the current history first, 
    // but to avoid extra fetches in this inline update, we can just rely on an RPC or do a fetch-then-update.
    // For safety, we fetch current history:
    const { data: currentData } = await supabase.from("orders").select("status_history").eq("id", id).single();
    const history = currentData?.status_history || [];

    const { error } = await supabase
      .from("orders")
      .update({ 
        status: newStatus,
        status_history: [...history, newHistoryEvent]
      })
      .eq("id", id);

    if (error) {
      alert("Failed to update status.");
      setOrders(previousOrders); // Revert
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      case "pending": return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
      case "processing": return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
      case "shipped": return "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20";
      case "delivered": return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      case "cancelled":
      case "failed":
      case "refunded": return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Orders</h1>
      </div>

      {/* CONTROLS ROW */}
      <div className="bg-[#141414] border border-[#1E1E1E] p-4 rounded-[8px] flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search by reference, name, or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] pl-10 pr-4 text-[13px] text-[#F5F0E8] font-sans outline-none transition-colors"
          />
        </div>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[13px] text-[#F5F0E8] font-sans outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input 
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[13px] text-[#9CA3AF] font-sans outline-none color-scheme-dark"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] border-b border-[#1E1E1E]">
              <tr>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Reference</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Items</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Total (₦)</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Payment</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#9CA3AF] font-mono text-[12px]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${o.id}`} className="font-mono text-[11px] text-[#F5F0E8] hover:text-[#C4622D] transition-colors">
                        #{o.reference.substring(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-sans text-[13px] text-[#F5F0E8]">{o.customer_name}</p>
                      <p className="font-mono text-[9px] text-[#9CA3AF]">{o.customer_email}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[#9CA3AF]">
                      {Array.isArray(o.items) ? o.items.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0} items
                    </td>
                    <td className="px-6 py-4 font-display text-[15px] tracking-wider text-[#C4622D]">
                      ₦{(o.total / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase">
                      {o.payment_method || 'Paystack'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className={`px-2 py-1 rounded-full border font-mono text-[9px] uppercase tracking-widest outline-none cursor-pointer appearance-none text-center ${getStatusColor(o.status)}`}
                      >
                        <option value="pending" className="bg-[#1A1A1A] text-[#F5F0E8]">Pending</option>
                        <option value="paid" className="bg-[#1A1A1A] text-[#F5F0E8]">Paid</option>
                        <option value="processing" className="bg-[#1A1A1A] text-[#F5F0E8]">Processing</option>
                        <option value="shipped" className="bg-[#1A1A1A] text-[#F5F0E8]">Shipped</option>
                        <option value="delivered" className="bg-[#1A1A1A] text-[#F5F0E8]">Delivered</option>
                        <option value="cancelled" className="bg-[#1A1A1A] text-[#F5F0E8]">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF]">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/orders/${o.id}`} className="inline-block p-1.5 text-[#9CA3AF] hover:text-[#F5F0E8] hover:bg-[#1E1E1E] rounded transition-colors">
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#1E1E1E] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-[#1A1A1A] border border-[#1E1E1E] rounded-[4px] text-[#C8C0B0] hover:text-[#F5F0E8] disabled:opacity-50 font-mono text-[10px] uppercase tracking-wider transition-colors"
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-[#1A1A1A] border border-[#1E1E1E] rounded-[4px] text-[#C8C0B0] hover:text-[#F5F0E8] disabled:opacity-50 font-mono text-[10px] uppercase tracking-wider transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
