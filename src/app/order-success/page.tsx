'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { Copy, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface OrderData {
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
}

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  const toast = useToast();

  const reference = searchParams.get('ref') || searchParams.get('reference') || '';

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Fetch order from Supabase via API
  useEffect(() => {
    if (!reference) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/checkout/order?ref=${encodeURIComponent(reference)}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch {
        // Silently fail — we still show the success state
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [reference]);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    toast.success('Reference copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const itemCount = order?.items?.length || 0;
  const totalNaira = order ? order.total / 100 : 0; // Convert kobo back to Naira
  const shippingNaira = order ? order.shipping / 100 : 0;
  const deliveryMethod = shippingNaira === 0 ? 'Pickup' : shippingNaira <= 2500 ? 'Standard Delivery' : 'Express Delivery';
  const customerName = order?.customer_name || 'Valued Customer';
  const customerEmail = order?.customer_email || '';

  return (
    <div className="max-w-lg w-full flex flex-col items-center text-center">

      {/* Animated Checkmark */}
      <div className="mb-10">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          className="checkmark-svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#C4622D"
            strokeWidth="3"
            fill="none"
            className="checkmark-circle"
          />
          <path
            d="M30 52 L44 66 L72 38"
            stroke="#C4622D"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="checkmark-tick"
          />
        </svg>
      </div>

      {/* ORDER CONFIRMED */}
      <h1 className="font-display text-[clamp(48px,10vw,64px)] tracking-widest leading-none uppercase mb-4">
        Order Confirmed
      </h1>

      {/* Thank you line */}
      <p className="font-serif italic text-2xl text-[#C8C0B0] mb-8">
        Thank you, {customerName}
      </p>

      {/* Reference */}
      {reference && (
        <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#1E1E1E] px-6 py-3 mb-8">
          <span className="font-mono text-[13px] tracking-widest text-[#C8C0B0]">
            {reference}
          </span>
          <button
            onClick={handleCopyRef}
            className="text-[#8A9A9E] hover:text-[#C4622D] transition-colors"
            title="Copy reference"
          >
            <Copy size={14} />
          </button>
          {copied && (
            <span className="font-mono text-[9px] text-[#C4622D] uppercase tracking-widest">
              Copied
            </span>
          )}
        </div>
      )}

      {/* Order Summary */}
      {!loading && order && (
        <div className="space-y-2 mb-10">
          <p className="font-mono text-[12px] text-[#8A9A9E] uppercase tracking-widest">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} · ₦{totalNaira.toLocaleString()} · {deliveryMethod}
          </p>
          <p className="font-serif text-[16px] text-[#C8C0B0]">
            Expected delivery: <span className="text-[#F5F0E8]">
              {shippingNaira >= 5000 ? '1–2 business days' : shippingNaira > 0 ? '3–5 business days' : 'Ready for pickup'}
            </span>
          </p>
          {customerEmail && (
            <p className="font-serif text-[15px] text-[#8A9A9E] mt-4">
              A confirmation will be sent to{' '}
              <span className="text-[#C4622D]">{customerEmail}</span>
            </p>
          )}
        </div>
      )}

      {/* Fallback when no order data */}
      {!loading && !order && (
        <div className="space-y-2 mb-10">
          <p className="font-serif text-[16px] text-[#C8C0B0]">
            Your payment was processed successfully.
          </p>
          <p className="font-serif text-[15px] text-[#8A9A9E]">
            You will receive an email confirmation shortly.
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mb-10">
          <div className="w-6 h-6 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {/* Separator */}
      <div className="w-16 h-px bg-[#1E1E1E] mb-10" />

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => router.push('/shop')}
          className="bg-[#C4622D] text-[#F5F0E8] font-mono text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:bg-[#A8521E] transition-colors flex items-center justify-center gap-2"
        >
          Continue Shopping <ArrowRight size={14} />
        </button>

        <a
          href={`https://wa.me/2347067415318?text=${encodeURIComponent(`Hi OWL FAMILY! I'd like to track my order: ${reference}`)}`}
          target="_blank"
          rel="noreferrer"
          className="border border-[#1E1E1E] text-[#C8C0B0] font-mono text-[11px] uppercase tracking-[0.2em] px-8 h-12 hover:border-[#C4622D] hover:text-[#F5F0E8] transition-colors flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Track on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8] flex items-center justify-center px-6 py-16">
      <Suspense fallback={
        <div className="w-6 h-6 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
      }>
        <OrderSuccessContent />
      </Suspense>

      {/* Checkmark CSS Animations */}
      <style jsx global>{`
        .checkmark-circle {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          animation: drawCircle 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
        }
        .checkmark-tick {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawTick 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.9s forwards;
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawTick {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}
