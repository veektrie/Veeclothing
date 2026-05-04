import { create } from 'zustand';

interface QuickViewStore {
  isOpen: boolean;
  product: any | null;
  openQuickView: (product: any) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewStore>((set) => ({
  isOpen: false,
  product: null,
  openQuickView: (product) => set({ isOpen: true, product }),
  closeQuickView: () => set({ isOpen: false, product: null }),
}));
