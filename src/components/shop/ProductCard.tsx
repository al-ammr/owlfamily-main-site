"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useToast } from "@/components/ui/Toast";

const BG_GRADIENTS: Record<string, string> = {
  streetwear: 'linear-gradient(160deg, #E8E4DC 0%, #D8D0C4 100%)',
  smart: 'linear-gradient(160deg, #EBE8E1 0%, #DFD9CE 100%)',
  corporate: 'linear-gradient(160deg, #E5E2DC 0%, #D5D0C6 100%)',
  vintage: 'linear-gradient(160deg, #E6E1D8 0%, #D6CEC2 100%)',
  'smart casual': 'linear-gradient(160deg, #EAE6DF 0%, #DCD6CD 100%)',
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize) {
      setIsShaking(true);
      toast.error('Please select a size');
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    addItem(product as any, selectedSize);
    toast.success(`${product.name} added to cart ✓`);
    setSelectedSize(null);
  };

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size === selectedSize ? null : size);
  };

  const bgStyle = {
    background: BG_GRADIENTS[product.category] || 'linear-gradient(160deg, #E8E4DC 0%, #D8D0C4 100%)'
  };

  return (
    <div className="group flex flex-col transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-transparent">
      {/* Image Wrapper (3:4) */}
      <Link href={`/shop/${product.slug}`} className="relative aspect-[3/4] overflow-hidden mb-4 cursor-pointer block bg-[#F8F6F2]">
        
        {/* Badge */}
        {product.badge && (
          <div 
            className={`absolute top-2 left-2 z-10 font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 
              ${product.badge === 'new' ? 'bg-[#C4622D] text-[#F5F0E8]' : ''}
              ${product.badge === 'hot' ? 'bg-[#B8962E] text-[#0D0D0D]' : ''}
              ${product.badge === 'sale' ? 'bg-[#C42D2D] text-[#F5F0E8]' : ''}
            `}
          >
            {product.badge}
          </div>
        )}

        {/* Product Image */}
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized={true}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDQiPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjQiIGZpbGw9IiNFMkU4RjAiPjwvcmVjdD48L3N2Zz4="
            className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#0D0D0D] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-widest py-3 btn-primary border-t border-[#1A1A1A]"
          >
            <span>+ Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Info Section */}
      <div className="flex flex-col px-1 pb-2">
        <Link href={`/shop/${product.slug}`} className="cursor-pointer block group-hover:opacity-90 transition-opacity duration-500">
          <h3 className="font-serif font-semibold text-[15px] text-[#0D0D0D] leading-tight mb-1">
            {product.name}
          </h3>
          <p className="font-mono text-[10px] text-[#544E45] uppercase tracking-widest mb-2">
            Category · {product.categoryLabel}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-[20px] text-[#C4622D] tracking-wider leading-none mt-1">
              ₦{product.price.toLocaleString()}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[#B8962E] text-[10px] tracking-tighter">★★★★★</span>
              <span className="font-mono text-[9px] text-[#544E45] mt-0.5">4.9</span>
            </div>
          </div>
        </Link>

        {/* Size Selector Dots */}
        <div className={`flex gap-1.5 mt-auto transition-transform ${isShaking ? 'animate-[cartBounce_0.5s_ease]' : ''}`}>
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => handleSizeClick(e, size)}
              className={`relative after:absolute after:-inset-2 w-7 h-7 rounded-full font-mono text-[9px] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${selectedSize === size 
                  ? 'bg-[#0D0D0D] text-[#F5F0E8] border border-[#0D0D0D] scale-110 shadow-md' 
                  : 'bg-transparent text-[#0D0D0D] border border-[#D8D0C4] hover:border-[#8A9A9E] hover:bg-[#F5F0E8]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
