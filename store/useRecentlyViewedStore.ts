import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedStore {
  items: any[];
  addRecentlyViewed: (item: any) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addRecentlyViewed: (item) => set((state) => {
        const id = item._id || item.id;
        const filtered = state.items.filter((i) => (i._id || i.id) !== id);
        const newItems = [item, ...filtered].slice(0, 8); // Keep up to 8 recently viewed items
        return { items: newItems };
      }),
      clearRecentlyViewed: () => set({ items: [] }),
    }),
    { name: 'vcc-recently-viewed' }
  )
);
