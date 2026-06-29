"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCartStore,
  selectCartItemCount,
  selectCartTotal,
} from "@/store/cartStore";

function formatNaira(kobo: number): string {
  const naira = kobo / 100;
  return `₦${naira.toLocaleString("en-NG")}`;
}

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const itemCount = useCartStore(selectCartItemCount);
  const subtotal = useCartStore(selectCartTotal);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // Swipe to close
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchEndX.current - touchStartX.current > 50) {
      closeCart();
    }
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* ——— Dark Overlay ——— */}
      <div
        className={cn(
          "fixed inset-0 z-[600] bg-black/60 backdrop-blur-[2px] transition-opacity duration-400",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ——— Drawer Panel ——— */}
      <aside
        ref={drawerRef}
        className={cn(
          "fixed top-0 right-0 z-[601] h-full w-full sm:w-[420px] bg-[#0D0D0D] border-l border-[#1E1E1E] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ——— Header ——— */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E1E] shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[#F5F0E8] text-2xl tracking-widest">
              YOUR CART
            </h2>
            {itemCount > 0 && (
              <span className="bg-[#C4622D] text-[#F5F0E8] font-mono text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-[#C8C0B0] hover:text-[#F5F0E8] transition-colors duration-200 w-11 h-11 flex items-center justify-center -mr-2"
            aria-label="Close cart"
          >
            <X strokeWidth={1.5} className="w-6 h-6" />
          </button>
        </div>

        {/* ——— Cart Items (Scrollable) ——— */}
        {items.length === 0 ? (
          /* ——— Empty State ——— */
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <ShoppingBag
                strokeWidth={1}
                className="w-10 h-10 text-[#C8C0B0]/40"
              />
            </div>
            <div className="text-center">
              <p className="font-serif text-[#F5F0E8] text-lg">
                Your cart is empty
              </p>
              <p className="font-mono text-[10px] text-[#C8C0B0] uppercase tracking-[0.15em] mt-2">
                Discover the collection
              </p>
            </div>
            <Link
              href="/shop"
              onClick={closeCart}
              className="font-mono text-[11px] text-[#0D0D0D] uppercase tracking-[0.2em] bg-[#C4622D] hover:bg-[#B8962E] px-8 py-3 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* ——— Populated Cart ——— */
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-[#1E1E1E]">
              {items.map((item) => (
                <div key={item.id} className="px-6 py-5 flex gap-4 group">
                  {/* Product Image */}
                  <div className="relative w-[72px] h-[96px] bg-[#1A1A1A] rounded shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag
                          strokeWidth={1}
                          className="w-6 h-6 text-[#C8C0B0]/30"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-[#F5F0E8] text-sm leading-tight truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-[#C8C0B0]/50 hover:text-[#C4622D] transition-colors duration-200 shrink-0 w-11 h-11 flex items-center justify-center -mt-2 -mr-3"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X strokeWidth={1.5} className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-mono text-[9px] text-[#C8C0B0] uppercase tracking-[0.15em] mt-1">
                        {item.category} · Size {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#1E1E1E] rounded">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeItem(item.productId, item.size);
                            } else {
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1
                              );
                            }
                          }}
                          className="w-11 h-11 flex items-center justify-center text-[#C8C0B0] hover:text-[#F5F0E8] hover:bg-[#1A1A1A] transition-colors duration-150"
                          aria-label="Decrease quantity"
                        >
                          <Minus strokeWidth={1.5} className="w-4 h-4" />
                        </button>
                        <span className="w-10 h-11 flex items-center justify-center font-mono text-[13px] text-[#F5F0E8] border-x border-[#1E1E1E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= 10}
                          className="w-11 h-11 flex items-center justify-center text-[#C8C0B0] hover:text-[#F5F0E8] hover:bg-[#1A1A1A] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus strokeWidth={1.5} className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-display text-[#C4622D] text-lg tracking-wide">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ——— Footer (only when items exist) ——— */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-[#1E1E1E] px-6 py-5 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-[#C8C0B0] uppercase tracking-[0.15em]">
                  Subtotal
                </span>
                <span className="font-mono text-[12px] text-[#F5F0E8]">
                  {formatNaira(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-[#C8C0B0] uppercase tracking-[0.15em]">
                  Shipping
                </span>
                <span className="font-mono text-[10px] text-[#B8962E] uppercase tracking-[0.15em]">
                  {subtotal >= 3000000 ? "FREE" : formatNaira(150000)}
                </span>
              </div>
              <div className="w-full h-px bg-[#1E1E1E] my-2" />
              <div className="flex justify-between items-baseline">
                <span className="font-display text-[#F5F0E8] text-lg tracking-widest">
                  TOTAL
                </span>
                <span className="font-display text-[#C4622D] text-2xl tracking-wide">
                  {formatNaira(
                    subtotal + (subtotal >= 3000000 ? 0 : 150000)
                  )}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="group flex items-center justify-center gap-2 w-full bg-[#C4622D] hover:bg-[#B8962E] text-[#0D0D0D] font-mono text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors duration-300"
            >
              Proceed to Checkout
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>

            {/* Continue Shopping */}
            <Link
              href="/shop"
              onClick={closeCart}
              className="block text-center font-mono text-[10px] text-[#C8C0B0] uppercase tracking-[0.15em] hover:text-[#F5F0E8] transition-colors duration-200 py-1"
            >
              or continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
