import { CartItem } from '@/types';

// ═══════════════════════════════════════
// Paystack Constants
// ═══════════════════════════════════════

export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

// ═══════════════════════════════════════
// Currency Helpers
// ═══════════════════════════════════════

/**
 * Convert Naira to Kobo for Paystack/Supabase storage.
 * Paystack expects amounts in the smallest currency unit (kobo).
 */
export function formatAmountToKobo(naira: number): number {
  return Math.round(naira * 100);
}

/**
 * Convert Kobo back to Naira for display purposes.
 */
export function formatKoboToNaira(kobo: number): number {
  return kobo / 100;
}

// ═══════════════════════════════════════
// Reference Generator
// ═══════════════════════════════════════

/**
 * Generate a unique order reference in the format:
 * OWL-[timestamp]-[4 random uppercase chars]
 * e.g. OWL-1718963200000-A7KX
 */
export function generateReference(): string {
  const timestamp = Date.now();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `OWL-${timestamp}-${random}`;
}

// ═══════════════════════════════════════
// WhatsApp Fallback Checkout
// ═══════════════════════════════════════

const WHATSAPP_NUMBER = '2347067415318';

/**
 * Build a formatted WhatsApp order message from the cart contents.
 * Opens the wa.me link when called in a browser environment.
 */
export function buildWhatsAppMessage(cart: CartItem[], customerName: string): string {
  const divider = '─'.repeat(28);

  const itemLines = cart.map((item, i) => {
    const lineTotal = item.price * item.quantity;
    return [
      `${i + 1}. ${item.name}`,
      `   Size: ${item.size}`,
      `   Qty: ${item.quantity}`,
      `   Price: ₦${lineTotal.toLocaleString()}`,
    ].join('\n');
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = [
    `🦉 *OWL FAMILY — New Order*`,
    divider,
    ``,
    `*Customer:* ${customerName}`,
    ``,
    `*Items:*`,
    ...itemLines,
    ``,
    divider,
    `*Subtotal:* ₦${subtotal.toLocaleString()}`,
    `*Shipping:* To be confirmed`,
    divider,
    ``,
    `Please confirm availability and send payment details. Thank you!`,
  ].join('\n');

  return message;
}

/**
 * Open WhatsApp with a pre-filled order message.
 * Call this from a click handler in the browser.
 */
export function openWhatsAppCheckout(cart: CartItem[], customerName: string): void {
  const message = buildWhatsAppMessage(cart, customerName);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}
