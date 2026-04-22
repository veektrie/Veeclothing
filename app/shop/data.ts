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

export const products: Product[] = [
  { 
    id: 1, 
    name: 'The Executive Blazer', 
    price: '₦85,000', 
    cat: 'corporate', 
    src: '/cop01.jpg', 
    tag: 'BESTSELLER', 
    desc: 'Structured authority. Engineered for the boardroom.',
    longDesc: 'A masterpiece of corporate engineering. Our Executive Blazer features a structured shoulder and a slightly tapered waist to project authority while maintaining comfort during long days in the boardroom. Crafted from high-twist wool that resists creasing.',
    features: [
      { title: 'Crease Resistant', desc: 'High-twist wool ensures a sharp look from 8 AM to 8 PM.' },
      { title: 'Breathable Lining', desc: 'Silk-blend lining for maximum comfort in tropical climates.' },
      { title: 'Reinforced Stitched', desc: 'Double-stitched seams for durability in active roles.' }
    ],
    colors: [
      { name: 'Red', hex: '#C0392B' },
      { name: 'Yellow', hex: '#F1C40F' },
      { name: 'Green', hex: '#27AE60' },
      { name: 'Blue', hex: '#2980B9' },
      { name: 'Navy (Standard)', hex: '#1A5276' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  { 
    id: 2, 
    name: 'The Boardroom Suit', 
    price: '₦145,000', 
    cat: 'bespoke', 
    src: '/suit01.jpg', 
    tag: 'SIGNATURE', 
    desc: 'Two-piece. Full canvas. Hand-finished lapels.',
    longDesc: 'Our signature two-piece suit. Each garment is hand-canvassed to ensure the fabric drapes perfectly over your silhouette. Featuring pick-stitched lapels and functional sleeve buttons, this is the pinnacle of bespoke tailoring.',
    features: [
      { title: 'Full Canvas', desc: 'Hand-canvassed construction for the ultimate fit.' },
      { title: 'Pick Stitched', desc: 'Traditional hand-finished details on lapels and pockets.' },
      { title: 'Bespoke Fit', desc: 'Tailored to your exact measurements in our Lagos atelier.' }
    ],
    colors: [
      { name: 'Onion Pink', hex: '#D7BDE2' },
      { name: 'Steel Grey', hex: '#5D6D7E' },
      { name: 'Midnight Blue', hex: '#1B2631' },
      { name: 'Oxblood', hex: '#641E16' }
    ],
    sizes: ['Bespoke']
  },
  { 
    id: 3, 
    name: 'Premium Kaftan — Grand Boubou', 
    price: '₦120,000', 
    cat: 'kaftan', 
    src: '/kaftan01.webp', 
    tag: 'NEW', 
    desc: 'Flowing silhouette. Premium damask fabric.',
    longDesc: 'The Grand Boubou redefined. We use only the finest damask and polished cotton to create a garment that feels as regal as it looks. The intricate embroidery is done by hand, taking over 40 hours per piece.',
    features: [
      { title: 'Hand Embroidered', desc: 'Artisan embroidery that tells a story of heritage.' },
      { title: 'Premium Damask', desc: 'Sourced from the finest mills for a superior sheen.' },
      { title: 'Flowing Cut', desc: 'Designed for comfort and commanding presence.' }
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Burnt Orange', hex: '#BA4A00' },
      { name: 'Deep Emerald', hex: '#0E6251' },
      { name: 'Dusty Rose', hex: '#A93226' }
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 4, 
    name: 'Corporate Uniform Set', 
    price: 'From ₦45,000', 
    cat: 'corporate', 
    src: '/cop02.png', 
    tag: 'CORPORATE', 
    desc: 'Minimum 5 units. Brand alignment guaranteed.',
    longDesc: 'A complete uniform solution for your organization. We work with your brand guidelines to create a cohesive look that empowers your staff and communicates your values to every client.',
    features: [
      { title: 'Brand Alignment', desc: 'Custom colors and logos integrated seamlessly.' },
      { title: 'Scale Ready', desc: 'Efficient production for teams of 5 to 500.' },
      { title: 'Easy Care', desc: 'Fabrics selected for durability and low maintenance.' }
    ],
    colors: [
      { name: 'Red', hex: '#E74C3C' },
      { name: 'Orange', hex: '#E67E22' },
      { name: 'Yellow', hex: '#F1C40F' },
      { name: 'Green', hex: '#2ECC71' },
      { name: 'Blue', hex: '#3498DB' },
      { name: 'Indigo', hex: '#2980B9' },
      { name: 'Violet', hex: '#8E44AD' }
    ],
    sizes: ['Bulk Sizing']
  },
  { 
    id: 5, 
    name: 'Agbada — Full Set', 
    price: '₦180,000', 
    cat: 'bespoke', 
    src: '/kaftan02.webp', 
    tag: 'BESPOKE', 
    desc: 'Three-piece. Aso-oke or Damask. Commission only.',
    longDesc: 'The ultimate statement piece. Our three-piece Agbada set includes the inner tunic, trousers, and the grand outer robe. Each set is a unique commission, crafted from hand-woven Aso-oke or premium Damask.',
    features: [
      { title: 'Three Piece', desc: 'Complete set for maximum ceremonial impact.' },
      { title: 'Custom Weaving', desc: 'Aso-oke options woven specifically for your commission.' },
      { title: 'Heritage Design', desc: 'Modernizing traditional silhouettes for the today\'s leader.' }
    ],
    colors: [
      { name: 'Rich Aubergine', hex: '#4A235A' },
      { name: 'Ivory Cream', hex: '#FDFEFE' },
      { name: 'Charcoal Noir', hex: '#17202A' }
    ],
    sizes: ['Bespoke']
  },
  { 
    id: 6, 
    name: 'The Senator Kaftan', 
    price: '₦65,000', 
    cat: 'kaftan', 
    src: '/kaftan05.jpg', 
    tag: null, 
    desc: 'Clean lines. Premium linen. Ready in 10 working days.',
    longDesc: 'The modern classic. Our Senator Kaftan is designed for the man who values simplicity and precision. Made from premium linen-cotton blends, it offers the perfect balance of breathability and structure.',
    features: [
      { title: 'Linen Blend', desc: 'Breathable and structured for the African sun.' },
      { title: 'Modern Fit', desc: 'Slimmer silhouette for a contemporary look.' },
      { title: 'Rapid Craft', desc: 'Commission to delivery in just 10 working days.' }
    ],
    colors: [
      { name: 'Desert Sand', hex: '#F5B041' },
      { name: 'Powder Blue', hex: '#AED6F1' },
      { name: 'Olive Drab', hex: '#3E4F39' },
      { name: 'Terracotta', hex: '#CC5500' }
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 7, 
    name: 'Executive Shirt — Embroidered', 
    price: '₦38,000', 
    cat: 'bespoke', 
    src: '/cop04.png', 
    tag: null, 
    desc: 'Bespoke embroidery on premium cotton poplin.',
    longDesc: 'Elevate your daily attire. Our Executive Shirt features subtle, hand-guided embroidery on the cuff or collar. Crafted from 100% Giza cotton poplin with a silky finish.',
    features: [
      { title: 'Giza Cotton', desc: 'World-renowned cotton for its strength and softness.' },
      { title: 'Monogramming', desc: 'Complimentary monogramming on every commission.' },
      { title: 'French Cuffs', desc: 'Standard on all executive series commissions.' }
    ],
    colors: [
      { name: 'Pristine White', hex: '#FFFFFF' },
      { name: 'Ice Blue', hex: '#D6EAF8' },
      { name: 'Pale Lilac', hex: '#E8DAEF' }
    ],
    sizes: ['Bespoke']
  },
  { 
    id: 8, 
    name: 'Staff Polo — Branded', 
    price: 'From ₦15,000', 
    cat: 'corporate', 
    src: '/cop05.jpg', 
    tag: null, 
    desc: 'Bulk production. Custom colours and logo.',
    colors: [
      { name: 'Red', hex: '#E74C3C' },
      { name: 'Orange', hex: '#E67E22' },
      { name: 'Yellow', hex: '#F1C40F' },
      { name: 'Green', hex: '#2ECC71' },
      { name: 'Blue', hex: '#3498DB' },
      { name: 'Indigo', hex: '#2980B9' },
      { name: 'Violet', hex: '#8E44AD' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  { 
    id: 9, 
    name: 'Luxury Suit — Linen', 
    price: '₦130,000', 
    cat: 'bespoke', 
    src: '/suit02.png', 
    tag: 'LIMITED', 
    desc: 'Italian linen. Two-button slim. Summer edition.',
    longDesc: 'Effortless elegance. Our limited edition linen suit is perfect for destination weddings or tropical events. The Italian linen is pre-washed for a soft feel and a refined, relaxed texture.',
    features: [
      { title: 'Italian Linen', desc: 'Sourced from the finest mills in Northern Italy.' },
      { title: 'Half Lined', desc: 'Extra breathability for warm weather comfort.' },
      { title: 'Natural Horn', desc: 'Genuine horn buttons for a luxurious finish.' }
    ],
    colors: [
      { name: 'Muted Sage', hex: '#A9DFBF' },
      { name: 'Tobacco Tan', hex: '#D35400' },
      { name: 'Stone Grey', hex: '#CCD1D1' }
    ],
    sizes: ['Bespoke']
  },
];

export const tagColor = (tag: string | null) => {
  if (!tag) return null;
  const map: Record<string, string> = {
    BESTSELLER: '#D4AF37', SIGNATURE: '#1A5276', NEW: '#27AE60',
    CORPORATE: '#2980B9', BESPOKE: '#8E44AD', LIMITED: '#C0392B',
  };
  return map[tag] ?? '#1A5276';
};
