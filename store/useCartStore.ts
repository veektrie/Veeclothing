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
  monogramText?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  hasGiftPackaging: boolean;
  addItem: (item: CartItem) => void;
  decreaseQuantity: (id: string, size?: string, color?: string, monogramText?: string) => void;
  removeItem: (id: string, size?: string, color?: string, monogramText?: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleGiftPackaging: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hasGiftPackaging: false,

      setIsOpen: (isOpen) => set({ isOpen }),
      toggleGiftPackaging: () => set((state) => ({ hasGiftPackaging: !state.hasGiftPackaging })),

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color && i.monogramText === item.monogramText
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color && i.monogramText === item.monogramText
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          };
        }
        return { items: [...state.items, item], isOpen: true };
      }),

      decreaseQuantity: (id, size, color, monogramText) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === id && i.size === size && i.color === color && i.monogramText === monogramText
        );
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((i) =>
              i.id === id && i.size === size && i.color === color && i.monogramText === monogramText
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        }
        return {
          items: state.items.filter((i) =>
            !(i.id === id && i.size === size && i.color === color && i.monogramText === monogramText)
          ),
        };
      }),

      removeItem: (id, size, color, monogramText) => set((state) => ({
        items: state.items.filter((i) =>
          !(i.id === id && i.size === size && i.color === color && i.monogramText === monogramText)
        ),
      })),

      clearCart: () => set({ items: [], hasGiftPackaging: false }),
    }),
    { 
      name: 'vinono-cart-storage',
      partialize: (state) => ({ items: state.items, hasGiftPackaging: state.hasGiftPackaging })
    }
  )
);