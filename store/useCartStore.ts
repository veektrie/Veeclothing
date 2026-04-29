import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decreaseQuantity: (id: string, size?: string, color?: string) => void; // <-- New
  removeItem: (id: string, size?: string, color?: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),

      // --- NEW FUNCTION TO DECREASE ---
      decreaseQuantity: (id, size, color) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === id && i.size === size && i.color === color
        );
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((i) =>
              i.id === id && i.size === size && i.color === color
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        }
        // If quantity is 1, remove it entirely
        return {
          items: state.items.filter((i) =>
            !(i.id === id && i.size === size && i.color === color)
          ),
        };
      }),

      removeItem: (id, size, color) => set((state) => ({
        items: state.items.filter((i) =>
          !(i.id === id && i.size === size && i.color === color)
        ),
      })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'vinono-cart-storage' }
  )
);