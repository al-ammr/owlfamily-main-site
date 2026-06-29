'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { Plus, Minus, Share2, Link as LinkIcon, Loader2 } from 'lucide-react';

export function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity(prev => Math.min(10, prev + 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart');
      return;
    }

    setLoading(true);
    // Simulate network delay for the loading spinner
    setTimeout(() => {
      addItem(product as any, selectedSize, quantity);
      toast.success(`${product.name} added to cart ✓`);
      setLoading(false);
    }, 400);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Product link copied to clipboard');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase text-[#544E45] tracking-widest">
            Select Size
          </span>
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="font-mono text-[10px] uppercase text-[#C4622D] tracking-widest underline hover:text-[#0D0D0D] transition-colors"
          >
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  w-[40px] h-[40px] flex items-center justify-center border text-[12px] font-mono transition-colors
                  ${isSelected 
                    ? 'border-[#C4622D] text-[#C4622D] bg-[#C4622D]/5' 
                    : 'border-[#D8D0C0] text-[#544E45] hover:border-[#0D0D0D] hover:text-[#0D0D0D]'
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex gap-4">
        {/* Quantity Pill */}
        <div className="flex items-center border border-[#1E1E1E] rounded-full px-2">
          <button 
            onClick={decreaseQuantity}
            className="w-10 h-12 flex items-center justify-center text-[#0D0D0D] hover:text-[#C4622D] transition-colors"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="w-8 text-center font-mono text-[13px] text-[#0D0D0D]">
            {quantity}
          </span>
          <button 
            onClick={increaseQuantity}
            className="w-10 h-12 flex items-center justify-center text-[#0D0D0D] hover:text-[#C4622D] transition-colors"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 bg-[#C4622D] text-[#F5F0E8] font-mono text-[12px] uppercase tracking-[0.2em] h-12 rounded-full hover:bg-[#A8521E] transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : '+ Add to Cart'}
        </button>
      </div>

      {/* Share Row */}
      <div className="flex items-center gap-6 pt-6 border-t border-[#D8D0C0]">
        <span className="font-mono text-[10px] uppercase text-[#544E45] tracking-widest flex items-center gap-2">
          <Share2 size={14} /> Share
        </span>
        <div className="flex items-center gap-4">
          <button className="text-[#544E45] hover:text-[#0D0D0D] transition-colors" title="Share to Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </button>
          <button className="text-[#544E45] hover:text-[#0D0D0D] transition-colors" title="Share to WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </button>
          <button onClick={copyLink} className="text-[#544E45] hover:text-[#0D0D0D] transition-colors">
            <LinkIcon size={18} />
          </button>
        </div>
      </div>

      {/* Simple Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#F5F0E8] border border-[#1E1E1E] p-8 max-w-md w-full animate-fade-up">
            <div className="flex justify-between items-center mb-6 border-b border-[#D8D0C0] pb-4">
              <h3 className="font-display text-2xl tracking-widest text-[#0D0D0D] uppercase">Nigerian Size Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-[#544E45] hover:text-[#0D0D0D]">
                <Minus size={24} className="rotate-45" /> {/* Close icon */}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs text-[#0D0D0D] border-b border-[#D8D0C0]/50 pb-2">
                <span>Small (S)</span>
                <span>Chest: 36" - 38"</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#0D0D0D] border-b border-[#D8D0C0]/50 pb-2">
                <span>Medium (M)</span>
                <span>Chest: 38" - 40"</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#0D0D0D] border-b border-[#D8D0C0]/50 pb-2">
                <span>Large (L)</span>
                <span>Chest: 40" - 42"</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#0D0D0D] border-b border-[#D8D0C0]/50 pb-2">
                <span>X-Large (XL)</span>
                <span>Chest: 42" - 44"</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-[#0D0D0D] pb-2">
                <span>XX-Large (XXL)</span>
                <span>Chest: 44" - 46"</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-8 w-full bg-[#0D0D0D] text-[#F5F0E8] font-mono text-[10px] uppercase tracking-widest py-3 hover:bg-[#C4622D] transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
