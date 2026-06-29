import { Category, CATEGORY_LABELS as PRODUCT_CATEGORY_LABELS } from './product';

// Re-export from the canonical source
export type { Category } from './product';
export { CATEGORIES, CATEGORY_LABELS } from './product';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: 'new' | 'hot' | 'sale' | null;
  sizes: string[];
  images: string[];
  description: string;
  inStock: boolean;
  stockCount?: number;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  category: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'paystack' | 'stripe' | 'transfer' | 'whatsapp';
  createdAt: string;
}

export interface FilterOption {
  id: string;
  label: string;
  emoji?: string;
  count?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

// ProductCategory includes 'all' for filter UI usage
export type ProductCategory = 'all' | Category;

export const FILTER_CATEGORY_LABELS: Record<ProductCategory, string> = {
  all: 'All Collections',
  ...PRODUCT_CATEGORY_LABELS,
};

export type FORMAT_PRICE = (amount: number) => string;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'style-guide' | 'brand-story' | 'culture' | 'tips';
  categoryLabel: string;
  tags: string[];
  authorName: string;
  authorAvatar?: string;
  published: boolean;
  featured: boolean;
  views: number;
  readTime: number;
  createdAt: string;
  publishedAt: string;
}

export const BLOG_CATEGORIES = [
  { id: 'all',         label: 'All Posts' },
  { id: 'style-guide', label: 'Style Guide' },
  { id: 'brand-story', label: 'Brand Story' },
  { id: 'culture',     label: 'Culture' },
  { id: 'tips',        label: 'Style Tips' },
];
