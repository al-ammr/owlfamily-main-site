import { CATEGORY_LABELS, Category, productSchema, ProductFormData } from '@/types/product';

/**
 * Converts Kobo to Naira and formats as string
 * 100 kobo = 1 Naira
 */
export function formatPriceFromKobo(priceInKobo: number): string {
  const amountInNaira = priceInKobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInNaira);
}

/**
 * Generates URL-friendly slug from string
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Validates product data against Zod schema
 */
export function validateProduct(data: unknown): { success: true; data: ProductFormData } | { success: false; error: string } {
  const result = productSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: (result as any).error.errors[0].message };
}

/**
 * Returns display label for category
 */
export function getCategoryLabel(category: Category): string {
  return CATEGORY_LABELS[category] || 'Unknown Category';
}
