'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Script from 'next/script';
import { useToast } from '@/components/ui/Toast';
import { Loader2 } from 'lucide-react';
import { useCartStore, selectCartTotal, selectCartItemCount } from '@/store/cartStore';
import { generateReference, formatAmountToKobo } from '@/lib/paystack';
const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryMethod: string;
}

interface CheckoutClientProps {
  paystackPublicKey: string;
  shippingStandardPrice: number;
  shippingExpressPrice: number;
  freeShippingThreshold: number;
}

export default function CheckoutClient({ paystackPublicKey, shippingStandardPrice, shippingExpressPrice, freeShippingThreshold }: CheckoutClientProps) {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const toast = useToast();
  
  // Calculate totals
  const subtotalNaira = selectCartTotal(useCartStore.getState()); // We assume this returns Naira based on our mock data config
  
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      deliveryMethod: 'standard'
    }
  });

  const selectedDelivery = watch('deliveryMethod');

  const SHIPPING_RATES: Record<string, number> = {
    'standard': shippingStandardPrice,
    'express': shippingExpressPrice,
    'pickup': 0
  };

  let shippingCostNaira = SHIPPING_RATES[selectedDelivery] || 0;
  if (subtotalNaira >= freeShippingThreshold && freeShippingThreshold > 0) {
    shippingCostNaira = 0;
  }
  const totalNaira = subtotalNaira + shippingCostNaira;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch for cart store

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6">
        <h1 className="font-serif text-3xl mb-4 text-[#0D0D0D]">Your cart is empty</h1>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-[#C4622D] text-[#F5F0E8] font-mono text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-[#A8521E] transition-colors"
        >
          Return to Shop
        </button>
      </main>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    const reference = generateReference();

    try {
      // 1. Create Order in Supabase
      // Convert Naira to kobo for Supabase/Paystack storage
      const subtotalKobo = formatAmountToKobo(subtotalNaira);
      const shippingKobo = formatAmountToKobo(shippingCostNaira);
      const totalKobo = formatAmountToKobo(totalNaira);

      const orderPayload = {
        reference,
        customer_name: data.fullName,
        customer_email: data.email,
        customer_phone: data.phone,
        customer_address: `${data.address}, ${data.city}, ${data.state}`,
        items,
        subtotal: subtotalKobo,
        shipping: shippingKobo,
        total: totalKobo
      };

      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!res.ok) {
        throw new Error('Failed to record order securely.');
      }

      // 2. Open Paystack Inline
      const paystackHandler = (window as any).PaystackPop.setup({
        key: paystackPublicKey,
        email: data.email,
        amount: totalKobo,
        ref: reference,
        currency: 'NGN',
        callback: async (response: any) => {
          // 3. Verify Payment via GET
          const verifyRes = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(response.reference)}`);

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            clearCart();
            toast.success('Payment successful!');
            router.push('/order-success');
          } else {
            toast.error('Payment verification failed. Please contact support.');
            setIsProcessing(false);
          }
        },
        onClose: () => {
          toast.info('Payment window closed');
          setIsProcessing(false);
        }
      });

      paystackHandler.openIframe();

    } catch (error: any) {
      toast.error(error.message || 'An error occurred during checkout');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#0D0D0D]">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      
      {/* Header */}
      <header className="py-6 px-6 md:px-10 border-b border-[#D8D0C0] bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="font-display text-2xl tracking-widest text-[#0D0D0D]">
            OWL <span className="text-[#C4622D]">FAMILY</span>
          </span>
          <span className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-widest">
            Secure Checkout
          </span>
        </div>
      </header>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: Form */}
          <div className="w-full lg:w-[60%]">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              
              {/* SECTION 1: CONTACT */}
              <div className="space-y-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A9A9E] border-b border-[#D8D0C0] pb-2">
                  1. Contact
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif text-[15px] mb-1">Full Name</label>
                    <input 
                      {...register('fullName', { required: 'Full name is required' })}
                      className={`w-full bg-transparent border ${errors.fullName ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors`}
                      placeholder="e.g. Ebuka Adebayo"
                    />
                    {errors.fullName && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-serif text-[15px] mb-1">Email Address</label>
                      <input 
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                        })}
                        className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block font-serif text-[15px] mb-1">Phone Number</label>
                      <input 
                        {...register('phone', { 
                          required: 'Phone is required',
                          pattern: { value: /^(08|\+234)[0-9]{9,10}$/, message: 'Must be valid Nigerian format (08XX or +234XX)' }
                        })}
                        className={`w-full bg-transparent border ${errors.phone ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors`}
                        placeholder="+234 or 08..."
                      />
                      {errors.phone && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DELIVERY */}
              <div className="space-y-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A9A9E] border-b border-[#D8D0C0] pb-2">
                  2. Delivery
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif text-[15px] mb-1">Street Address</label>
                    <input 
                      {...register('address', { required: 'Address is required' })}
                      className={`w-full bg-transparent border ${errors.address ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors`}
                      placeholder="123 Culture Street, Garki"
                    />
                    {errors.address && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-serif text-[15px] mb-1">City</label>
                      <input 
                        {...register('city', { required: 'City is required' })}
                        className={`w-full bg-transparent border ${errors.city ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors`}
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block font-serif text-[15px] mb-1">State</label>
                      <select 
                        {...register('state', { required: 'State is required' })}
                        className={`w-full bg-transparent border ${errors.state ? 'border-red-500' : 'border-[#D8D0C0]'} px-4 py-3 font-mono text-[13px] focus:outline-none focus:border-[#C4622D] transition-colors appearance-none`}
                      >
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 font-mono text-[10px] mt-1">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="block font-serif text-[15px] mb-2">Delivery Method</label>
                    
                    <label className={`block border p-4 cursor-pointer transition-colors ${selectedDelivery === 'standard' ? 'border-[#C4622D] bg-[#C4622D]/5' : 'border-[#D8D0C0] hover:border-[#0D0D0D]'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" value="standard" {...register('deliveryMethod')} className="w-4 h-4 accent-[#C4622D]" />
                          <span className="font-mono text-[12px] uppercase">Standard Delivery (3-5 Days)</span>
                        </div>
                        <span className="font-mono text-[12px]">₦{shippingStandardPrice.toLocaleString()}</span>
                      </div>
                    </label>

                    <label className={`block border p-4 cursor-pointer transition-colors ${selectedDelivery === 'express' ? 'border-[#C4622D] bg-[#C4622D]/5' : 'border-[#D8D0C0] hover:border-[#0D0D0D]'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" value="express" {...register('deliveryMethod')} className="w-4 h-4 accent-[#C4622D]" />
                          <span className="font-mono text-[12px] uppercase">Express Delivery (1-2 Days)</span>
                        </div>
                        <span className="font-mono text-[12px]">₦{shippingExpressPrice.toLocaleString()}</span>
                      </div>
                    </label>

                    <label className={`block border p-4 cursor-pointer transition-colors ${selectedDelivery === 'pickup' ? 'border-[#C4622D] bg-[#C4622D]/5' : 'border-[#D8D0C0] hover:border-[#0D0D0D]'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" value="pickup" {...register('deliveryMethod')} className="w-4 h-4 accent-[#C4622D]" />
                          <span className="font-mono text-[12px] uppercase">Lagos / Abuja Pickup</span>
                        </div>
                        <span className="font-mono text-[12px]">FREE</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 3: PAYMENT */}
              <div className="space-y-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A9A9E] border-b border-[#D8D0C0] pb-2">
                  3. Payment
                </h2>
                
                <div className="space-y-3">
                  <div className="border border-[#C4622D] bg-[#C4622D]/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-[#C4622D] flex-shrink-0" />
                      <div>
                        <p className="font-mono text-[12px] uppercase text-[#0D0D0D]">Paystack Secure</p>
                        <p className="font-serif text-[14px] text-[#8A9A9E]">Card, Bank Transfer, USSD</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[#D8D0C0] p-4 flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-[#8A9A9E] flex-shrink-0" />
                      <div>
                        <p className="font-mono text-[12px] uppercase text-[#0D0D0D]">Manual Bank Transfer</p>
                        <p className="font-serif text-[14px] text-[#8A9A9E]">Manual confirmation required</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white border border-[#D8D0C0] p-6 sticky top-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D0D0D] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-[#E8E0D0] flex-shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-serif text-[15px] leading-snug">{item.name}</p>
                      <p className="font-mono text-[10px] text-[#8A9A9E] uppercase tracking-widest mt-1">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="font-mono text-[12px] text-[#C4622D] mt-2">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D8D0C0] pt-4 space-y-3 mb-6">
                <div className="flex justify-between font-mono text-[12px] text-[#4A4A4A]">
                  <span>Subtotal</span>
                  <span>₦{subtotalNaira.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-mono text-[12px] text-[#4A4A4A]">
                  <span>Shipping</span>
                  <span>{shippingCostNaira === 0 ? 'FREE' : `₦${shippingCostNaira.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="border-t border-[#D8D0C0] pt-4 mb-8 flex items-end justify-between">
                <span className="font-mono text-[12px] uppercase text-[#0D0D0D] tracking-widest pb-1">Total</span>
                <span className="font-display text-4xl tracking-wider text-[#0D0D0D]">
                  ₦{totalNaira.toLocaleString()}
                </span>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-[#0D0D0D] text-[#F5F0E8] font-mono text-[12px] uppercase tracking-[0.2em] h-14 hover:bg-[#C4622D] transition-colors flex items-center justify-center disabled:opacity-80 disabled:hover:bg-[#0D0D0D]"
              >
                {isProcessing ? (
                  <Loader2 size={18} className="animate-spin text-[#F5F0E8]" />
                ) : (
                  `Place Order — ₦${totalNaira.toLocaleString()}`
                )}
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
