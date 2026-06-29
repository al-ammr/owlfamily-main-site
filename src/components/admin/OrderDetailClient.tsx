"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, Flag, CheckCircle2, Circle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface OrderDetailClientProps {
  order: any;
}

export function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const [order, setOrder] = useState(initialOrder);
  const [newStatus, setNewStatus] = useState(initialOrder.status);
  const [note, setNote] = useState("");
  const [updating, setUpdating] = useState(false);

  // Parse items safely
  const items = Array.isArray(order.items) ? order.items : [];
  const history = Array.isArray(order.status_history) ? order.status_history : [];

  const handleStatusUpdate = async () => {
    if (newStatus === order.status) return;
    setUpdating(true);

    const supabase = createClient();
    
    const newHistoryEvent = {
      status: newStatus,
      date: new Date().toISOString(),
      user: "Admin",
      note: note.trim() || undefined
    };

    const newHistory = [...history, newHistoryEvent];

    const { error } = await supabase
      .from("orders")
      .update({ 
        status: newStatus,
        status_history: newHistory
      })
      .eq("id", order.id);

    if (error) {
      alert("Failed to update status.");
    } else {
      setOrder({ ...order, status: newStatus, status_history: newHistory });
      setNote("");
      
      // MOCK EMAIL NOTIFICATION
      console.log(`
      ================================================
      [MOCK EMAIL NOTIFICATION]
      To: info.owlfamily@gmail.com
      Subject: Order #${order.reference.toUpperCase()} Status Updated to ${newStatus.toUpperCase()}
      
      Body:
      Hello ${order.customer_name},
      
      Your order status has been updated to: ${newStatus}.
      
      View your order details here: https://owlfamily.com/orders/${order.reference}
      
      Thank you for shopping with OWL FAMILY!
      ================================================
      `);
      alert("Status updated! Email notification mock logged to console.");
    }
    setUpdating(false);
  };

  const timelineSteps = ["pending", "paid", "processing", "shipped", "delivered"];
  const currentStepIndex = timelineSteps.indexOf(order.status.toLowerCase());
  
  // Find the first occurrence of each status in history to show the date
  const getStepDate = (stepStatus: string) => {
    const event = history.find((h: any) => h.status.toLowerCase() === stepStatus);
    return event ? new Date(event.date).toLocaleString() : null;
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 bg-[#1A1A1A] hover:bg-[#333] rounded text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="font-display text-[28px] tracking-widest uppercase">
            Order #{order.reference.substring(0, 8)}
          </h1>
          <span className={`px-2.5 py-1 rounded-full border font-mono text-[9px] uppercase tracking-widest ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <p className="font-mono text-[11px] text-[#9CA3AF]">
          Placed on {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: ORDER ITEMS (60%) */}
        <div className="w-full lg:w-[60%] space-y-6">
          <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
            <div className="p-6 border-b border-[#1E1E1E]">
              <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase">Order Items</h2>
            </div>
            
            <table className="w-full text-left">
              <thead className="bg-[#1A1A1A] border-b border-[#1E1E1E]">
                <tr>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Size</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Qty</th>
                  <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E]">
                {items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-[#1A1A1A] rounded overflow-hidden relative shrink-0">
                          {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                        </div>
                        <span className="font-sans text-[13px] text-[#F5F0E8]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[#9CA3AF]">{item.size || '-'}</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[#9CA3AF]">₦{(item.price / 100).toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-[#F5F0E8]">{item.quantity}</td>
                    <td className="px-6 py-4 font-display text-[14px] text-[#C4622D] text-right">
                      ₦{((item.price * item.quantity) / 100).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-6 bg-[#1A1A1A] border-t border-[#1E1E1E]">
              <div className="flex justify-end">
                <div className="w-[240px] space-y-3">
                  <div className="flex justify-between font-mono text-[11px] text-[#9CA3AF]">
                    <span>Subtotal</span>
                    <span>₦{(order.subtotal / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-[#9CA3AF]">
                    <span>Shipping</span>
                    <span>₦{(order.shipping / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-display text-[18px] text-[#F5F0E8] pt-3 border-t border-[#333]">
                    <span>Total</span>
                    <span className="text-[#C4622D]">₦{(order.total / 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="w-full lg:w-[40%] space-y-6">
          
          {/* Customer Card */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
            <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase border-b border-[#1E1E1E] pb-4 mb-4">Customer Details</h2>
            
            <div>
              <p className="font-sans text-[14px] text-[#F5F0E8] font-semibold">{order.customer_name}</p>
              <p className="font-mono text-[11px] text-[#9CA3AF] mt-1">{order.customer_email}</p>
              <p className="font-mono text-[11px] text-[#9CA3AF] mt-1">{order.customer_phone || "No phone provided"}</p>
            </div>
            
            <div className="pt-4 border-t border-[#1E1E1E]">
              <h3 className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Delivery Address</h3>
              <p className="font-sans text-[13px] text-[#F5F0E8] leading-relaxed">
                {order.customer_address || "No address provided"}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1E1E1E]">
              <h3 className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Payment Reference</h3>
              <a 
                href={`https://dashboard.paystack.com/#/transactions/${order.reference}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-[#3B82F6] hover:underline"
              >
                {order.reference}
              </a>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px]">
            <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase border-b border-[#1E1E1E] pb-4 mb-6">Status Timeline</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#333] before:to-transparent">
              {timelineSteps.map((step, idx) => {
                const isCompleted = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                const date = getStepDate(step);

                return (
                  <div key={step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#141414] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow
                      ${isCompleted ? 'bg-[#10B981] text-[#141414]' : 'bg-[#1A1A1A] text-[#333]'}
                    `}>
                      {isCompleted ? <CheckCircle2 size={12} /> : <Circle size={8} />}
                    </div>
                    
                    {/* Content */}
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-[#1E1E1E] bg-[#1A1A1A]">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[11px] uppercase tracking-wider ${isCurrent ? 'text-[#F5F0E8]' : 'text-[#9CA3AF]'}`}>
                          {step}
                        </span>
                        {date && <span className="font-mono text-[9px] text-[#666]">{date}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-[#141414] border border-[#1E1E1E] p-6 rounded-[8px] space-y-4">
            <h2 className="font-mono text-[12px] text-[#C4622D] tracking-widest uppercase mb-4">Update Status</h2>
            
            <select 
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded px-3 text-[#F5F0E8] outline-none font-mono text-[11px] uppercase"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Internal note (optional)"
              rows={2}
              className="w-full bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded p-3 text-[#F5F0E8] outline-none font-sans text-[13px] resize-none"
            />
            
            <button 
              onClick={handleStatusUpdate}
              disabled={updating || newStatus === order.status}
              className="w-full h-[40px] bg-[#C4622D] hover:bg-[#A34E21] text-[#F5F0E8] rounded font-mono text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Status"}
            </button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-[#141414] border border-[#1E1E1E] hover:border-[#C4622D] rounded text-[#9CA3AF] hover:text-[#C4622D] transition-colors group">
              <Printer size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider">Print</span>
            </button>
            <a href={`mailto:${order.customer_email}`} className="flex flex-col items-center justify-center gap-2 p-4 bg-[#141414] border border-[#1E1E1E] hover:border-[#C4622D] rounded text-[#9CA3AF] hover:text-[#C4622D] transition-colors group">
              <Mail size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider">Contact</span>
            </a>
            <button className="flex flex-col items-center justify-center gap-2 p-4 bg-[#141414] border border-[#1E1E1E] hover:border-red-500 rounded text-[#9CA3AF] hover:text-red-500 transition-colors group">
              <Flag size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider">Flag</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function getStatusColor(status: string) {
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
}
