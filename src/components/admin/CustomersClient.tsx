"use client";

import { Users, Mail, Phone, Calendar } from "lucide-react";

interface Customer {
  email: string;
  name: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

interface CustomersClientProps {
  customers: Customer[];
}

export function CustomersClient({ customers }: CustomersClientProps) {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Customers</h1>
      </div>

      <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
        <div className="flex items-start gap-4 mb-6 p-4 bg-[#1E1E1E] border border-[#333] rounded text-[#F5F0E8] font-mono text-[11px]">
          <Users className="w-5 h-5 text-[#9CA3AF] shrink-0" />
          <p className="leading-relaxed text-[#9CA3AF]">
            <strong className="text-[#F5F0E8] uppercase tracking-widest">Customer Directory:</strong> This directory automatically aggregates customer data from your incoming store orders. Every time someone successfully places an order, their profile is created or updated here.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1A1A1A] border-y border-[#1E1E1E]">
              <tr>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-center">Orders</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Total Spent</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Last Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#9CA3AF] font-mono text-[12px] border-b border-[#1E1E1E]">
                    No customers found yet. Profiles will appear here once orders are placed!
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.email} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-serif text-[15px] font-semibold text-[#F5F0E8] mb-1">{c.name}</div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[#9CA3AF]">
                        <Mail size={12} className="text-[#C4622D]" /> {c.email}
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-2 font-mono text-[11px] text-[#9CA3AF]">
                          <Phone size={12} className="text-[#C4622D]" /> {c.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-[#1E1E1E] border border-[#333] text-[#F5F0E8] font-mono text-[11px] h-6 w-6 rounded-full">
                        {c.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-display text-[16px] tracking-wider text-[#C4622D] text-right">
                      ₦{(c.totalSpent / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 font-mono text-[11px] text-[#9CA3AF]">
                        <Calendar size={12} /> {new Date(c.lastOrderDate).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
