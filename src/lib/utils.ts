import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes and resolve conflicts safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Nigerian Naira (₦) string
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate URL-friendly slug from string
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Returns display label for category
 */
export function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    streetwear: 'Street Wear',
    smart_casual: 'Smart Casual',
    casual_wear: 'Casual Wear',
    corporate_wear: 'Corporate Wear',
    vintage: 'Vintage',
    native_wear: 'Native Wear',
    formal_wear: 'Formal Wear',
    ceremonial_wear: 'Ceremonial Wear',
    luxury_editions: 'Luxury Editions'
  };
  return labels[cat] || cat;
}

/**
 * Returns emoji for category
 */
export function getCategoryEmoji(cat: string): string {
  const emojis: Record<string, string> = {
    streetwear: '🛹',
    smart_casual: '👔',
    casual_wear: '👕',
    corporate_wear: '💼',
    vintage: '📼',
    native_wear: '👑',
    formal_wear: '🎩',
    ceremonial_wear: '✨',
    luxury_editions: '💎'
  };
  return emojis[cat] || '🏷️';
}
