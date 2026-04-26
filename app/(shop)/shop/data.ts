export type Category = 'all' | 'corporate' | 'bespoke' | 'kaftan' | 'accessories';

export interface Product {
  id: number;
  name: string;
  price: string;
  cat: Category;
  src: string;
  tag: string | null;
  desc: string;
  longDesc?: string;
  features?: { title: string; desc: string; icon?: string }[];
  colors?: { name: string; hex: string; src?: string }[];
  sizes?: string[];
}


export const tagColor = (tag: string | null) => {
  if (!tag) return null;
  const map: Record<string, string> = {
    BESTSELLER: '#D4AF37', SIGNATURE: '#1A5276', NEW: '#27AE60',
    CORPORATE: '#2980B9', BESPOKE: '#8E44AD', LIMITED: '#C0392B',
  };
  return map[tag] ?? '#1A5276';
};


