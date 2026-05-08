'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickViewStore } from '@/store/useQuickViewStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

const CATEGORIES = [
  { key: 'all', label: 'All Pieces' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'bespoke', label: 'Bespoke Suiting' },
  { key: 'kaftan', label: 'Kaftans & Agbada' },
  { key: 'tees', label: 'Tees' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'polo', label: 'Polo' },
  { key: 'accessories', label: 'Accessories' },
];

const getTagColor = (tag: string) => {
  if (!tag) return null;
  switch (tag.toUpperCase()) {
      case 'BESTSELLER': return '#1A5276'; // Navy
      case 'NEW': return '#1A5276'; // Navy
      case 'LIMITED': return '#C0392B'; // Red
      case 'SIGNATURE': return '#1A5276'; // Navy
      case 'CORPORATE': return '#2980B9'; // Blue
      case 'BESPOKE': return '#1A5276'; // Navy
      default: return '#1A5276';
  }
};

const previews = [
  { id: 2, src: '/suit01.jpg',   label: 'Executive Suits',   tag: 'SIGNATURE'  },
  { id: 3, src: '/kaftan01.webp', label: 'Premium Kaftans',   tag: 'BESTSELLER' },
  { id: 1, src: '/cop01.jpg',    label: 'Corporate Branding', tag: 'CORPORATE'  },
];

const ShopPreview = ({ products }: { products?: any[] }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { convert } = useCurrencyStore();

  const allItems = products && products.length > 0 
    ? products.map(p => ({
        id: p.slug || p._id,
        src: p.src || '/suit01.jpg',
        label: p.name,
        tag: p.tag || p.cat || 'SIGNATURE',
        price: p.price,
        desc: p.desc || 'Made with care. Available for custom orders in premium fabrics.',
        cat: p.cat || 'bespoke'
      }))
    : previews.map(p => ({ ...p, desc: 'Made with care. Available for custom orders in premium fabrics.', price: null, cat: 'bespoke' }));

  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.cat === activeCategory);

  return (
    <section
      id="collection"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(5rem, 10vw, 12rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Brand Elements */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'radial-gradient(circle at 80% 20%, rgba(26, 82, 118, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', position: 'relative', zIndex: 2 }}>
        
        {/* Header Block */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#1C1C1E',
              lineHeight: 1,
              marginBottom: 24,
              textAlign: 'center'
            }}>
              Pick Your <em style={{ color: '#1A5276', fontStyle: 'italic' }}>Style.</em>
            </h2>
          </motion.div>
        </div>

        {/* 1. Category Filtering Tabs */}
        <div className="flex justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto pb-4 mb-8 hide-scrollbar snap-x -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap rounded-full border transition-all duration-300 snap-center ${
                activeCategory === c.key
                  ? 'font-extrabold bg-[#1A5276] text-white border-[#1A5276]'
                  : 'font-semibold bg-white text-[#64748b] border-black/10 hover:border-[#1A5276]/30 hover:text-[#1A5276]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 2 & 3. Sleek Product Carousel & Hover Actions */}
        <motion.div 
          layout
          className="flex overflow-x-auto gap-[clamp(1.5rem,3vw,2.5rem)] pb-12 pt-4 snap-x snap-mandatory hide-scrollbar -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="min-w-[280px] max-w-[320px] md:min-w-[340px] md:max-w-[340px] flex-shrink-0 snap-center group"
              >
                <Link
                  href={`/shop/product/${item.id}`}
                  className="no-underline text-inherit block h-full"
                >
                  <div className="bg-white shadow-xl rounded-[24px] overflow-hidden cursor-pointer h-full flex flex-col border border-black/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_48px_rgba(26,82,118,0.12)] hover:-translate-y-2 hover:border-[#1A5276]/20">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                      {item.src && (
                        <Image
                          src={item.src}
                          alt={item.label}
                          fill
                          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-90 group-hover:scale-105 group-hover:brightness-100"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}

                      {/* Quick View Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20 pointer-events-none">
                         <button 
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             useQuickViewStore.getState().openQuickView(item);
                           }}
                           className="group relative pointer-events-auto bg-white/95 text-[#1A5276] px-6 py-3 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-[#1A5276] hover:text-white overflow-hidden"
                         >
                           <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></span>
                           <span className="relative z-10">Quick Add</span>
                         </button>
                      </div>

                      {item.tag && (
                        <div
                          className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10 z-10"
                          style={{
                            background: getTagColor(item.tag) ? `${getTagColor(item.tag)}bb` : 'rgba(26,82,118,0.7)',
                          }}
                        >
                          <span className="text-[8px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details Container */}
                    <div className="p-8 flex-1 flex flex-col gap-3">
                      <div>
                        <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.15rem] font-bold text-[#1C1C1E] mb-1 leading-[1.3] tracking-[-0.02em]">
                          {item.label}
                        </h3>
                        <p className="font-sans text-[13px] text-[#64748b] leading-[1.6] font-light line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2.5">
                        <span suppressHydrationWarning style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.15rem] text-[#1A5276] font-bold">
                          {item.price ? `${convert(item.price).symbol}${convert(item.price).value.toLocaleString()}` : 'Price on request'}
                        </span>

                        <div className="w-8 h-8 rounded-full border border-[#1A5276]/30 flex items-center justify-center text-[#1A5276] bg-[#F8FAFC] transition-all duration-300 ease-out group-hover:bg-[#1A5276] group-hover:text-white">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* 6. View Full Collection Final Tile */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="min-w-[280px] max-w-[320px] md:min-w-[340px] md:max-w-[340px] flex-shrink-0 snap-center"
            >
              <Link href="/shop" className="no-underline text-inherit block h-full">
                <div style={{
                  background: '#1A5276',
                  borderRadius: 24,
                  padding: 40,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: '0 20px 40px rgba(26,82,118,0.2)',
                  minHeight: '400px',
                  position: 'relative',
                  overflow: 'hidden'
                }} className="group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(26,82,118,0.3)] border border-transparent">
                  <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></span>
                  <div className="relative z-10 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-white bg-white/5">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                     </svg>
                  </div>
                  <h4 style={{ 
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', 
                    color: '#FFFFFF', fontWeight: 400, marginBottom: 12, lineHeight: 1.1,
                    position: 'relative', zIndex: 10
                  }}>
                    Explore The<br />Full Range
                  </h4>
                  <span style={{ 
                    fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase', position: 'relative', zIndex: 10
                  }}>View All Pieces</span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ShopPreview;
