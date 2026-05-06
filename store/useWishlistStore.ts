import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  _id: string;
  id?: string;
  name: string;
  price: number;
  src?: string;
  slug?: string;
  cat?: string;
  desc?: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (id: string) => boolean;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const id = item._id ?? item.id ?? '';
          if (state.items.some((i) => (i._id ?? i.id) === id)) return state;
          return { items: [item, ...state.items] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => (i._id ?? i.id) !== id),
        })),

      toggleItem: (item) => {
        const id = item._id ?? item.id ?? '';
        if (get().hasItem(id)) {
          get().removeItem(id);
        } else {
          get().addItem(item);
        }
      },

      hasItem: (id) => get().items.some((i) => (i._id ?? i.id) === id),

      clearAll: () => set({ items: [] }),
    }),
    { name: 'vcc-wishlist' }
  )
);
