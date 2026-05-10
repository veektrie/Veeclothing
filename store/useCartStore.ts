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
  measurements?: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  hasGiftPackaging: boolean;
  addItem: (item: CartItem) => void;
  decreaseQuantity: (id: string, size?: string, color?: string, monogramText?: string, measurements?: Record<string, string>) => void;
  removeItem: (id: string, size?: string, color?: string, monogramText?: string, measurements?: Record<string, string>) => void;
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
        const itemMeasStr = JSON.stringify(item.measurements || {});
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color && i.monogramText === item.monogramText && JSON.stringify(i.measurements || {}) === itemMeasStr
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color && i.monogramText === item.monogramText && JSON.stringify(i.measurements || {}) === itemMeasStr
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          };
        }
        return { items: [...state.items, item], isOpen: true };
      }),

      decreaseQuantity: (id, size, color, monogramText, measurements) => set((state) => {
        const measStr = JSON.stringify(measurements || {});
        const existingItem = state.items.find(
          (i) => i.id === id && i.size === size && i.color === color && i.monogramText === monogramText && JSON.stringify(i.measurements || {}) === measStr
        );
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((i) =>
              i.id === id && i.size === size && i.color === color && i.monogramText === monogramText && JSON.stringify(i.measurements || {}) === measStr
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        }
        return {
          items: state.items.filter((i) =>
            !(i.id === id && i.size === size && i.color === color && i.monogramText === monogramText && JSON.stringify(i.measurements || {}) === measStr)
          ),
        };
      }),

      removeItem: (id, size, color, monogramText, measurements) => set((state) => {
        const measStr = JSON.stringify(measurements || {});
        return {
          items: state.items.filter((i) =>
            !(i.id === id && i.size === size && i.color === color && i.monogramText === monogramText && JSON.stringify(i.measurements || {}) === measStr)
          ),
        };
      }),

      clearCart: () => set({ items: [], hasGiftPackaging: false }),
    }),
    { 
      name: 'vinono-cart-storage',
      partialize: (state) => ({ items: state.items, hasGiftPackaging: state.hasGiftPackaging })
    }
  )
);