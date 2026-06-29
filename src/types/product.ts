import { z } from 'zod';

export const CATEGORIES = [
  'streetwear', 
  'smart_casual', 
  'casual_wear', 
  'corporate_wear', 
  'vintage', 
  'native_wear', 
  'formal_wear', 
  'ceremonial_wear', 
  'luxury_editions'
] as const;

export type Category = typeof CATEGORIES[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  streetwear: 'Street Wear',
  smart_casual: 'Smart Casual',
  casual_wear: 'Casual',
  corporate_wear: 'Corporate',
  vintage: 'Vintage',
  native_wear: 'Native Wears',
  formal_wear: 'Formal Wears',
  ceremonial_wear: 'Ceremonial Wears',
  luxury_editions: 'Luxury Editions'
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number; // in kobo
  original_price?: number | null;
  badge?: string | null;
  sizes: string[];
  images: string[];
  description?: string | null;
  in_stock: boolean;
  stock_count: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum(CATEGORIES, {
    message: 'Invalid category'
  }),
  price: z.number().min(0, 'Price must be positive'),
  original_price: z.number().min(0).optional().nullable(),
  badge: z.string().optional().nullable(),
  sizes: z.array(z.string()).min(1, 'At least one size required'),
  images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image required'),
  description: z.string().optional().nullable(),
  in_stock: z.boolean().default(true),
  stock_count: z.number().min(0).default(0),
  featured: z.boolean().default(false),
});

export type ProductFormData = z.infer<typeof productSchema>;
