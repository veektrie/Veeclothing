'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuickViewStore } from '@/store/useQuickViewStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShopItem {
  id: string | number;
  src: string;
  label: string;
  tag: string;
  price: number | null;
  desc: string;
  cat: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all',         label: 'All Pieces'      },
  { key: 'corporate',   label: 'Corporate'        },
  { key: 'bespoke',     label: 'Bespoke Suiting'  },
  { key: 'kaftan',      label: 'Kaftans & Agbada' },
  { key: 'tees',        label: 'Tees'             },
  { key: 'hoodies',     label: 'Hoodies'          },
  { key: 'polo',        label: 'Polo'             },
  { key: 'accessories', label: 'Accessories'      },
];

const getTagColor = (tag: string) => {
  if (!tag) return '#1A5276';
  switch (tag.toUpperCase()) {
    case 'LIMITED': return '#C0392B';
    case 'CORPORATE': return '#2980B9';
    default: return '#1A5276';
  }
};

const fallbackPreviews: ShopItem[] = [
  { id: 2, src: '/suit01.jpg',    label: 'Executive Suits',   tag: 'SIGNATURE',  price: null, desc: 'Made with care. Available for custom orders in premium fabrics.', cat: 'bespoke',   colors: [], sizes: [] },
  { id: 3, src: '/kaftan01.webp', label: 'Premium Kaftans',   tag: 'BESTSELLER', price: null, desc: 'Made with care. Available for custom orders in premium fabrics.', cat: 'kaftan',    colors: [], sizes: [] },
  { id: 1, src: '/cop01.jpg',     label: 'Corporate Branding', tag: 'CORPORATE', price: null, desc: 'Made with care. Available for custom orders in premium fabrics.', cat: 'corporate', colors: [], sizes: [] },
];

// ─── Sub-component: Product Card ─────────────────────────────────────────────

function ShopPreviewCard({ item, isCarousel = false }: { item: ShopItem; isCarousel?: boolean }) {
  const { convert } = useCurrencyStore();
  const { toggleItem, hasItem } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  // Prevent SSR/client mismatch for persisted wishlist state
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const itemId = String(item.id);
  const isWishlisted = mounted ? hasItem(itemId) : false;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const alreadySaved = hasItem(itemId);
    toggleItem({
      _id: itemId,
      name: item.label,
      price: item.price || 0,
      src: item.src,
      slug: itemId,
      cat: item.cat,
      desc: item.desc,
    });
    if (alreadySaved) {
      toast('Removed from saved pieces', { icon: '🗑️' });
    } else {
      toast.success('Saved to your collection ♥');
    }
  };

  const handleSizeAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: itemId,
      name: item.label,
      price: item.price || 0,
      image: item.src,
      quantity: 1,
      size,
    });
    toast.success(`${item.label} · ${size} added`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    useQuickViewStore.getState().openQuickView(item);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const hasSizes = item.sizes && item.sizes.length > 0;
  const hasColors = item.colors && item.colors.length > 0;

  return (
    <div
      className={`group relative h-full ${
        isCarousel
          ? 'min-w-[280px] max-w-[320px] md:min-w-[340px] md:max-w-[360px] flex-shrink-0 snap-center'
          : 'w-full'
      }`}
    >
      {/* ── Card shell ─────────────────────────────────────────────────── */}
      <div className="bg-white shadow-xl rounded-[24px] overflow-hidden h-full flex flex-col border border-black/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_48px_rgba(26,82,118,0.12)] hover:-translate-y-2 hover:border-[#1A5276]/20 relative">

        {/* ── Wishlist heart — sits outside Link, always visible ─────── */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from saved' : 'Save piece'}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
          style={{
            background: isWishlisted ? '#1A5276' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <Heart
            size={14}
            fill={isWishlisted ? 'white' : 'none'}
            stroke={isWishlisted ? 'white' : '#1A5276'}
            className="transition-all duration-300"
          />
        </button>

        {/* ── Main link: image + details ──────────────────────────────── */}
        <Link href={`/shop/product/${item.id}`} className="no-underline text-inherit flex flex-col h-full">

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-black/10">
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-90 group-hover:scale-105 group-hover:brightness-100"
              sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 33vw"
            />

            {/* Subtle hover scrim */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Tag badge */}
            {item.tag && (
              <div
                className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10 z-10 pointer-events-none"
                style={{ background: `${getTagColor(item.tag)}cc` }}
              >
                <span className="text-[8px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                  {item.tag}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex-1 flex flex-col gap-2">
            <div>
              <h3
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-[1.08rem] font-bold text-[#1C1C1E] mb-1 leading-[1.3] tracking-[-0.02em]"
              >
                {item.label}
              </h3>
              <p className="font-sans text-[12px] text-[#64748b] leading-[1.6] font-light line-clamp-2">
                {item.desc}
              </p>
            </div>

            {/* Color swatches */}
            {hasColors && (
              <div className="flex items-center gap-1.5 mt-0.5">
                {item.colors.slice(0, 5).map((color) => (
                  <span
                    key={color.name}
                    title={color.name}
                    className="w-[14px] h-[14px] rounded-full border-2 border-white shadow-sm transition-transform hover:scale-125 cursor-pointer"
                    style={{
                      backgroundColor: color.hex,
                      outline: '1px solid rgba(0,0,0,0.08)',
                    }}
                  />
                ))}
                {item.colors.length > 5 && (
                  <span className="text-[9px] text-[#94a3b8] font-sans font-bold">
                    +{item.colors.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Price row */}
            <div className="mt-auto flex items-center justify-between pt-2.5">
              <span
                suppressHydrationWarning
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-[1.08rem] text-[#1A5276] font-bold"
              >
                {item.price
                  ? `${convert(item.price).symbol}${convert(item.price).value.toLocaleString()}`
                  : 'Price on request'
                }
              </span>
              <div className="w-8 h-8 rounded-full border border-[#1A5276]/30 flex items-center justify-center text-[#1A5276] bg-[#F8FAFC] transition-all duration-300 group-hover:bg-[#1A5276] group-hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* ── Size picker / Quick Add — outside Link ───────────────────── */}
        {hasSizes ? (
          /* Inline size picker — slides up on hover */
          <div
            className="
              absolute bottom-0 left-0 right-0 z-20
              opacity-0 translate-y-3
              group-hover:opacity-100 group-hover:translate-y-0
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 ease-out
            "
          >
            <div className="bg-white/97 backdrop-blur-md border-t border-black/[0.06] px-5 pt-3 pb-4 rounded-b-[24px] shadow-lg">
              <p className="text-[8px] tracking-[0.2em] uppercase font-bold text-[#94a3b8] mb-2.5 font-sans">
                Quick Add — Select Size
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeAdd(e, size)}
                    className="
                      px-3.5 py-1.5 rounded-lg
                      border border-[#1A5276]/20
                      text-[9px] font-bold tracking-[0.12em] uppercase
                      text-[#1A5276] font-sans
                      transition-all duration-200
                      hover:bg-[#1A5276] hover:text-white hover:border-[#1A5276]
                      active:scale-95
                    "
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* No sizes: Quick Add button opens QuickViewModal */
          <button
            className="
              absolute top-[32%] left-1/2 -translate-x-1/2 z-20
              bg-white/95 text-[#1A5276]
              px-5 py-2.5 rounded-full
              text-[9px] tracking-[0.2em] font-bold uppercase font-sans
              opacity-0 translate-y-2
              group-hover:opacity-100 group-hover:translate-y-0
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 shadow-lg
              hover:bg-[#1A5276] hover:text-white
              flex items-center gap-2 whitespace-nowrap
            "
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={11} />
            Quick Add
          </button>
        )}
      </div>
    </div>
  );
}

// ─── "View Full Collection" tile ──────────────────────────────────────────────

function ViewAllTile({ isCarousel = false }: { isCarousel?: boolean }) {
  return (
    <div
      className={isCarousel
        ? 'min-w-[280px] max-w-[320px] md:min-w-[340px] md:max-w-[360px] flex-shrink-0 snap-center'
        : 'w-full'
      }
    >
      <Link href="/shop" className="no-underline text-inherit block h-full">
        <div
          className="group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(26,82,118,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent"
          style={{
            background: '#1A5276',
            borderRadius: 24,
            padding: 40,
            height: '100%',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(26,82,118,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <div className="relative z-10 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-white bg-white/5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <h4
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.8rem',
              color: '#FFFFFF',
              fontWeight: 400,
              marginBottom: 12,
              lineHeight: 1.1,
              position: 'relative',
              zIndex: 10,
            }}
          >
            Explore The<br />Full Range
          </h4>
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 10,
            }}
          >
            View All Pieces
          </span>
        </div>
      </Link>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ShopPreview = ({ products }: { products?: any[] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Map Sanity products → ShopItem, now including colors + sizes
  const allItems: ShopItem[] = products && products.length > 0
    ? products.map((p) => ({
        id: p.slug || p._id,
        src: p.src || '/suit01.jpg',
        label: p.name,
        tag: p.tag || p.cat || 'SIGNATURE',
        price: p.price ?? null,
        desc: p.desc || 'Made with care. Available for custom orders in premium fabrics.',
        cat: p.cat || 'bespoke',
        colors: p.colors ?? [],
        sizes: p.sizes ?? [],
      }))
    : fallbackPreviews;

  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter((item) => item.cat === activeCategory);

  return (
    <section
      id="collection"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient glow */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 80% 20%, rgba(26,82,118,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26,82,118,0.04) 0%, transparent 50%)',
        }}
      />

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#1C1C1E',
                lineHeight: 1,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Pick Your <em style={{ color: '#1A5276', fontStyle: 'italic' }}>Style.</em>
            </h2>
          </motion.div>
        </div>

        {/* Category filter tabs */}
        <div className="flex justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-5 mb-8 hide-scrollbar snap-x -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap rounded-full border transition-all duration-300 snap-center ${
                activeCategory === c.key
                  ? 'font-extrabold bg-[#1A5276] text-white border-[#1A5276] shadow-md'
                  : 'font-semibold bg-white text-[#64748b] border-black/10 hover:border-[#1A5276]/30 hover:text-[#1A5276]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── MOBILE: Horizontal scroll carousel ─────────────────────────── */}
        <div className="md:hidden">
          <AnimatePresence mode="popLayout">
            <div className="flex overflow-x-auto gap-5 pb-10 pt-2 snap-x snap-mandatory hide-scrollbar -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <ShopPreviewCard item={item} isCarousel />
                </motion.div>
              ))}
              <ViewAllTile isCarousel />
            </div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP: Responsive grid (2-col → 3-col) ────────────────── */}
        <div className="hidden md:block">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-2 xl:grid-cols-3 gap-6 pb-6 pt-2"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                  className="h-full"
                >
                  <ShopPreviewCard item={item} />
                </motion.div>
              ))}

              {/* View Full Collection tile — last grid cell */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="h-full"
              >
                <ViewAllTile />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ShopPreview;
