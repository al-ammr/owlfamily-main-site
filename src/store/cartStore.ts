import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Product } from '@/types/product';
import { CartItem } from '@/types/index';
import { formatPriceFromKobo } from '@/lib/utils/product-helpers';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, quantity = 1) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (item) => item.productId === product.id && item.size === size
        );

        if (existingItemIndex >= 0) {
          // Increment quantity up to max 10
          const currentQty = state.items[existingItemIndex].quantity;
          const newQty = Math.min(currentQty + quantity, 10);
          state.items[existingItemIndex].quantity = newQty;
        } else {
          // Create new CartItem
          state.items.push({
            id: `${product.id}-${size}`,
            productId: product.id,
            name: product.name,
            price: product.price, // Stored in kobo from DB
            size,
            quantity: Math.min(quantity, 10),
            image: product.images && product.images.length > 0 ? product.images[0] : '',
            category: product.category,
          });
        }
        
        // Auto-open cart when item is added
        state.isOpen = true;
      }),

      removeItem: (productId, size) => set((state) => {
        state.items = state.items.filter(
          (item) => !(item.productId === productId && item.size === size)
        );
      }),

      updateQuantity: (productId, size, quantity) => set((state) => {
        const item = state.items.find(
          (item) => item.productId === productId && item.size === size
        );
        if (item) {
          item.quantity = Math.max(1, Math.min(quantity, 10));
        }
      }),

      clearCart: () => set((state) => {
        state.items = [];
      }),

      openCart: () => set((state) => {
        state.isOpen = true;
      }),

      closeCart: () => set((state) => {
        state.isOpen = false;
      }),

      toggleCart: () => set((state) => {
        state.isOpen = !state.isOpen;
      }),
    })),
    {
      name: 'owlfamily-cart',
    }
  )
);

// Derived Selectors (Computed Getters)
export const selectCartTotal = (state: CartState): number => 
  state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectCartItemCount = (state: CartState): number =>
  state.items.reduce((count, item) => count + item.quantity, 0);

export const selectFormattedCartTotal = (state: CartState): string =>
  formatPriceFromKobo(selectCartTotal(state));

export const selectHasItem = (productId: string, size: string) => (state: CartState): boolean =>
  state.items.some(item => item.productId === productId && item.size === size);
