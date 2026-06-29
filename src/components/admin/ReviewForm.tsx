"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTestimonial, updateTestimonial } from "@/app/admin/reviews/actions";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ReviewFormProps {
  initialData?: any;
}

export function ReviewForm({ initialData }: ReviewFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    label: initialData?.label || "Verified Buyer",
    avatar: initialData?.avatar || "",
    headline: initialData?.headline || "",
    quote: initialData?.quote || "",
    rating: initialData?.rating || 5,
    is_published: initialData?.is_published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.avatar) {
      toast.error("Please upload an avatar image.");
      return;
    }

    startTransition(async () => {
      const result = initialData 
        ? await updateTestimonial(initialData.id, formData)
        : await createTestimonial(formData);

      if (result.success) {
        toast.success(initialData ? "Review updated!" : "Review created!");
        router.push("/admin/reviews");
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/reviews" className="p-2 hover:bg-[#1E1E1E] rounded-md transition-colors text-[#9CA3AF] hover:text-[#F5F0E8]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-[28px] tracking-widest uppercase">
            {initialData ? "Edit Review" : "New Review"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#1E1E1E] rounded-[8px] p-8 space-y-8">
        
        {/* Avatar Upload */}
        <div className="flex flex-col gap-4">
          <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Customer Avatar *</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border border-[#333] overflow-hidden flex items-center justify-center relative shrink-0">
              {formData.avatar ? (
                <Image src={formData.avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-[#333]" />
              )}
            </div>
            
            <CldUploadWidget 
              uploadPreset="owl_family_products"
              onSuccess={(result: any) => {
                setFormData({ ...formData, avatar: result.info.secure_url });
                toast.success("Avatar uploaded");
              }}
              onError={(error: any) => {
                console.error("Upload error:", error);
                toast.error("Failed to upload image");
              }}
            >
              {({ open }) => (
                <button 
                  type="button" 
                  onClick={() => open()}
                  className="px-4 py-2 border border-[#333] hover:border-[#C4622D] text-[#E5E5E5] rounded-[4px] font-mono text-[11px] uppercase tracking-widest transition-colors"
                >
                  {formData.avatar ? "Change Avatar" : "Upload Avatar"}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Customer Name *</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[16px] md:text-[14px] text-[#F5F0E8] outline-none transition-colors"
              placeholder="e.g. John D."
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Label</label>
            <input 
              type="text" 
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[16px] md:text-[14px] text-[#F5F0E8] outline-none transition-colors"
              placeholder="e.g. Verified Buyer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Headline / Title *</label>
            <input 
              required
              type="text" 
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[16px] md:text-[14px] text-[#F5F0E8] outline-none transition-colors"
              placeholder="e.g. Exceptional Quality"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Star Rating (1-5)</label>
            <select 
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full h-[40px] bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] px-4 text-[16px] md:text-[14px] text-[#F5F0E8] outline-none transition-colors"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">Full Review Quote *</label>
          <textarea 
            required
            rows={4}
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-[#1E1E1E] focus:border-[#C4622D] rounded-[4px] p-4 text-[16px] md:text-[14px] text-[#F5F0E8] outline-none transition-colors resize-none"
            placeholder="The full text of the customer's review..."
          />
        </div>

        <div className="flex items-center gap-3 py-4 border-t border-[#1E1E1E]">
          <input 
            type="checkbox" 
            id="is_published"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-4 h-4 accent-[#C4622D] bg-[#1A1A1A] border-[#333] rounded"
          />
          <label htmlFor="is_published" className="text-[#E5E5E5] text-[14px] cursor-pointer">
            Publish this review to the homepage
          </label>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#1E1E1E]">
          <button 
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-[#C4622D] hover:bg-[#A04F22] text-[#F5F0E8] px-8 py-3 rounded-[4px] font-mono text-[11px] uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isPending ? "Saving..." : "Save Review"}
          </button>
        </div>

      </form>
    </div>
  );
}
