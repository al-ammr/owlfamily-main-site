import { Product, FilterOption, Category, CATEGORY_LABELS } from '@/types';

// Unsplash placeholder images for each product (until real photos are shot)
// Format: https://images.unsplash.com/photo-{ID}?w=600&q=80
const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80`;

// The 18 core OWL FAMILY products spanning all 9 categories
export const PRODUCTS: Product[] = [
  // STREET WEAR
  {
    id: 'owl-001',
    name: 'OWL Signature Hoodie',
    slug: 'owl-signature-hoodie',
    category: 'streetwear',
    categoryLabel: CATEGORY_LABELS['streetwear'],
    price: 18500, // Naira
    badge: 'hot',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [UNSPLASH('photo-1556821840-3a63f15732ce')],
    description: 'The hoodie that started the movement. Premium heavyweight cotton with the iconic OWL signature branding.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-002',
    name: 'Oversized Drop Shoulder Shirt',
    slug: 'oversized-drop-shoulder-shirt',
    category: 'streetwear',
    categoryLabel: CATEGORY_LABELS['streetwear'],
    price: 11000,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1578587018452-892bacefd3ef')],
    description: 'Comfortable oversized fit for a relaxed, confident streetwear look.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // SMART CASUAL
  {
    id: 'owl-003',
    name: 'Linen Button-Down Shirt',
    slug: 'linen-button-down-shirt',
    category: 'smart_casual',
    categoryLabel: CATEGORY_LABELS['smart_casual'],
    price: 12500,
    badge: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1507679799987-c73779587ccf')],
    description: 'Lightweight linen shirt tailored for warm weather sophistication and effortless charm.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-004',
    name: 'Slim-Fit Dark Jeans',
    slug: 'slim-fit-dark-jeans',
    category: 'smart_casual',
    categoryLabel: CATEGORY_LABELS['smart_casual'],
    price: 16500,
    badge: null,
    sizes: ['30', '32', '34', '36'],
    images: [UNSPLASH('photo-1598554747436-c9293d6a588f')],
    description: 'Premium dark wash jeans, an absolute essential for the modern wardrobe.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // CASUAL
  {
    id: 'owl-005',
    name: 'OWL Comfort Tee',
    slug: 'owl-comfort-tee',
    category: 'casual_wear',
    categoryLabel: CATEGORY_LABELS['casual_wear'],
    price: 6500,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1503342217505-b0a15ec3261c')],
    description: 'The softest everyday tee you will ever wear, crafted for superior all-day comfort.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-006',
    name: 'Relaxed Fit Joggers',
    slug: 'relaxed-fit-joggers',
    category: 'casual_wear',
    categoryLabel: CATEGORY_LABELS['casual_wear'],
    price: 8000,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1542291026-7eec264c27ff')],
    description: 'Perfect joggers for lounging or running errands without sacrificing your style.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // CORPORATE
  {
    id: 'owl-007',
    name: 'Two-Piece Suit Charcoal',
    slug: 'two-piece-suit-charcoal',
    category: 'corporate_wear',
    categoryLabel: CATEGORY_LABELS['corporate_wear'],
    price: 65000,
    badge: 'hot',
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1594938298603-c8148c4b4e43')],
    description: 'Professional charcoal two-piece suit tailored for the modern executive who commands the room.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-008',
    name: 'Silk Tie Burgundy',
    slug: 'silk-tie-burgundy',
    category: 'corporate_wear',
    categoryLabel: CATEGORY_LABELS['corporate_wear'],
    price: 5500,
    badge: null,
    sizes: ['ONE SIZE'],
    images: [UNSPLASH('photo-1591085686350-798c0f9faa9d')],
    description: '100% pure silk tie in a rich burgundy shade. The perfect finishing touch.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // VINTAGE
  {
    id: 'owl-009',
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    category: 'vintage',
    categoryLabel: CATEGORY_LABELS['vintage'],
    price: 22000,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1576566588028-4147f3842f27')],
    description: 'Vintage washed denim jacket for effortless layering and timeless appeal.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-010',
    name: 'Vintage Washed Tee',
    slug: 'vintage-washed-tee',
    category: 'vintage',
    categoryLabel: CATEGORY_LABELS['vintage'],
    price: 7500,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1521572163474-6864f9cf17ab')],
    description: 'Garment-dyed tee with a faded vintage finish. Feels like you have owned it for years.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // NATIVE WEARS
  {
    id: 'owl-011',
    name: 'Agbada Royal Blue',
    slug: 'agbada-royal-blue',
    category: 'native_wear',
    categoryLabel: CATEGORY_LABELS['native_wear'],
    price: 45000,
    badge: 'new',
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1591047139829-d91aecb6caea')],
    description: 'Premium royal blue Agbada set with intricate embroidery. Wear the culture with pride.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-012',
    name: 'Kente Pattern Dashiki',
    slug: 'kente-pattern-dashiki',
    category: 'native_wear',
    categoryLabel: CATEGORY_LABELS['native_wear'],
    price: 22000,
    badge: null,
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1610878180933-123728745d21')],
    description: 'Vibrant Dashiki featuring authentic Kente patterns for an unmistakably bold look.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // FORMAL WEARS
  {
    id: 'owl-013',
    name: 'Premium Tuxedo Set',
    slug: 'premium-tuxedo-set',
    category: 'formal_wear',
    categoryLabel: CATEGORY_LABELS['formal_wear'],
    price: 85000,
    badge: 'hot',
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1593030761757-71fae45fa0e7')],
    description: 'The ultimate black-tie tuxedo set for special occasions. Tailored to absolute perfection.',
    inStock: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-014',
    name: 'Executive Vest & Tie Set',
    slug: 'executive-vest-tie-set',
    category: 'formal_wear',
    categoryLabel: CATEGORY_LABELS['formal_wear'],
    price: 35000,
    badge: null,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [UNSPLASH('photo-1602810318383-e386cc2a3ccf')],
    description: 'Complete your formal look with this premium vest and tie combo.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // CEREMONIAL WEARS
  {
    id: 'owl-015',
    name: 'Wedding Anniversary Suit',
    slug: 'wedding-anniversary-suit',
    category: 'ceremonial_wear',
    categoryLabel: CATEGORY_LABELS['ceremonial_wear'],
    price: 55000,
    badge: null,
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1543076447-215ad9ba6923')],
    description: 'A celebratory suit designed exclusively to make a lasting impression on your big day.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-016',
    name: 'Traditional Ceremonial Gown',
    slug: 'traditional-ceremonial-gown',
    category: 'ceremonial_wear',
    categoryLabel: CATEGORY_LABELS['ceremonial_wear'],
    price: 40000,
    badge: null,
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1509551388413-e18d0ac5d495')],
    description: 'Rich traditional ceremonial wear featuring exquisite cultural detailing.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // LUXURY EDITIONS
  {
    id: 'owl-017',
    name: 'Gold Label Hoodie',
    slug: 'gold-label-hoodie',
    category: 'luxury_editions',
    categoryLabel: CATEGORY_LABELS['luxury_editions'],
    price: 45000,
    badge: 'hot',
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1581803118522-7b72a50f7e9f')],
    description: 'Exclusive gold label hoodie crafted from the finest heavyweight materials. A true statement piece.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'owl-018',
    name: 'Cashmere Blend Blazer',
    slug: 'cashmere-blend-blazer',
    category: 'luxury_editions',
    categoryLabel: CATEGORY_LABELS['luxury_editions'],
    price: 95000,
    badge: null,
    sizes: ['M', 'L', 'XL'],
    images: [UNSPLASH('photo-1473966968600-fa801b869a1a')],
    description: 'Luxurious cashmere blend blazer for unparalleled elegance and absolute comfort.',
    inStock: true,
    featured: false,
    createdAt: new Date().toISOString(),
  }
];

// Dynamically generate filter categories with counts
export const CATEGORIES: FilterOption[] = [
  {
    id: 'all',
    label: 'All Collections',
    count: PRODUCTS.length
  },
  {
    id: 'streetwear',
    label: CATEGORY_LABELS['streetwear'],
    count: PRODUCTS.filter(p => p.category === 'streetwear').length
  },
  {
    id: 'smart_casual',
    label: CATEGORY_LABELS['smart_casual'],
    count: PRODUCTS.filter(p => p.category === 'smart_casual').length
  },
  {
    id: 'casual_wear',
    label: CATEGORY_LABELS['casual_wear'],
    count: PRODUCTS.filter(p => p.category === 'casual_wear').length
  },
  {
    id: 'corporate_wear',
    label: CATEGORY_LABELS['corporate_wear'],
    count: PRODUCTS.filter(p => p.category === 'corporate_wear').length
  },
  {
    id: 'vintage',
    label: CATEGORY_LABELS['vintage'],
    count: PRODUCTS.filter(p => p.category === 'vintage').length
  },
  {
    id: 'native_wear',
    label: CATEGORY_LABELS['native_wear'],
    count: PRODUCTS.filter(p => p.category === 'native_wear').length
  },
  {
    id: 'formal_wear',
    label: CATEGORY_LABELS['formal_wear'],
    count: PRODUCTS.filter(p => p.category === 'formal_wear').length
  },
  {
    id: 'ceremonial_wear',
    label: CATEGORY_LABELS['ceremonial_wear'],
    count: PRODUCTS.filter(p => p.category === 'ceremonial_wear').length
  },
  {
    id: 'luxury_editions',
    label: CATEGORY_LABELS['luxury_editions'],
    count: PRODUCTS.filter(p => p.category === 'luxury_editions').length
  }
];

// Helper functions for the UI layer
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(product => product.featured);
}

export function getProductsByCategory(cat: string): Product[] {
  if (cat === 'all' || !cat) return PRODUCTS;
  return PRODUCTS.filter(product => product.category === cat);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug);
}
