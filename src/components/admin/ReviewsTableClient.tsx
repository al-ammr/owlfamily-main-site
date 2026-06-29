"use client";

import { useState, useTransition } from "react";
import { Star, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { deleteTestimonial, toggleTestimonialStatus } from "@/app/admin/reviews/actions";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  label: string;
  avatar: string;
  headline: string;
  quote: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

interface ReviewsTableClientProps {
  testimonials: Testimonial[];
}

export function ReviewsTableClient({ testimonials }: ReviewsTableClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    startTransition(async () => {
      const result = await deleteTestimonial(id);
      if (result.success) {
        toast.success("Review deleted");
        setOpenDropdown(null);
      } else {
        toast.error("Failed to delete review");
      }
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const result = await toggleTestimonialStatus(id, currentStatus);
      if (result.success) {
        toast.success(currentStatus ? "Review hidden" : "Review published");
        setOpenDropdown(null);
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-display text-[28px] tracking-widest uppercase">Customer Reviews</h1>
        <Link 
          href="/admin/reviews/new"
          className="bg-[#C4622D] hover:bg-[#A04F22] text-[#F5F0E8] px-6 py-3 rounded-[4px] font-mono text-[11px] uppercase tracking-widest transition-colors"
        >
          Add New Review
        </Link>
      </div>

      <div className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1A1A1A] border-b border-[#1E1E1E]">
              <tr>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest">Review Content</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[#9CA3AF] font-mono text-[12px]">
                    No reviews found. Click "Add New Review" to create one.
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#333]">
                          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-serif text-[15px] font-semibold text-[#F5F0E8]">{t.name}</div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-[#9CA3AF] mt-0.5">{t.label}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 mb-1 text-[#C4622D]">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <div className="font-serif font-semibold text-[#F5F0E8] text-[14px]">{t.headline}</div>
                      <div className="font-sans text-[12px] text-[#9CA3AF] mt-1 line-clamp-2 max-w-[400px]">"{t.quote}"</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleToggleStatus(t.id, t.is_published)}
                        disabled={isPending}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest border transition-colors ${
                          t.is_published 
                            ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/20" 
                            : "bg-[#9CA3AF]/10 text-[#9CA3AF] border-[#9CA3AF]/20 hover:bg-[#9CA3AF]/20"
                        }`}
                      >
                        {t.is_published ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        {t.is_published ? "Published" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setOpenDropdown(openDropdown === t.id ? null : t.id)}
                        className="p-2 hover:bg-[#1E1E1E] rounded-md transition-colors text-[#9CA3AF] hover:text-[#F5F0E8]"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openDropdown === t.id && (
                        <div className="absolute right-6 top-12 w-48 bg-[#1A1A1A] border border-[#333] rounded-[8px] shadow-xl z-10 py-1 overflow-hidden">
                          <Link 
                            href={`/admin/reviews/${t.id}`}
                            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#E5E5E5] hover:bg-[#222] transition-colors"
                          >
                            <Edit size={14} className="text-[#9CA3AF]" />
                            Edit Review
                          </Link>
                          <button 
                            onClick={() => handleDelete(t.id)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-left"
                          >
                            <Trash2 size={14} />
                            Delete Review
                          </button>
                        </div>
                      )}
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
