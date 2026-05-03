'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { key: 'all', label: 'All Pieces' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'bespoke', label: 'Bespoke Suiting' },
  { key: 'kaftan', label: 'Kaftans & Agbada' },
  { key: 'accessories', label: 'Accessories' },
];

const previews = [
  { id: 2, src: '/suit01.jpg',   label: 'Executive Suits',   tag: 'SIGNATURE'  },
  { id: 3, src: '/kaftan01.webp', label: 'Premium Kaftans',   tag: 'BESTSELLER' },
  { id: 1, src: '/cop01.jpg',    label: 'Corporate Branding', tag: 'CORPORATE'  },
];

const ShopPreview = ({ products }: { products?: any[] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

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
        <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto pb-4 mb-8 hide-scrollbar snap-x">
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
          className="flex overflow-x-auto gap-[2.5rem] pb-12 pt-4 snap-x snap-mandatory hide-scrollbar -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]"
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
                className="min-w-[300px] max-w-[320px] md:min-w-[340px] md:max-w-[340px] flex-shrink-0 snap-center"
              >
                <div 
                  className="galleria-card group"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: 24,
                    padding: 12,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                  }}
                >
                  <Link href={`/shop/product/${item.id}`} className="block relative aspect-[4/5] overflow-hidden mb-6 rounded-[20px]">
                    <div style={{ height: '100%', width: '100%' }}>
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    
                    {/* Floating Tag */}
                    <div style={{
                      position: 'absolute', top: 15, right: 15,
                      padding: '6px 12px', background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)', border: '1px solid rgba(26, 82, 118, 0.3)',
                      color: '#1A5276', fontSize: 8, letterSpacing: '0.25em',
                      fontWeight: 700, textTransform: 'uppercase', borderRadius: 6,
                      zIndex: 10
                    }}>
                      {item.tag}
                    </div>

                    {/* Quick View Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                       <div className="bg-white/95 text-[#1A5276] px-6 py-3 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                         View Details
                       </div>
                    </div>
                  </Link>

                  <div style={{ padding: '0 10px 10px' }}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
                      color: '#1C1C1E', fontWeight: 400, marginBottom: 12, letterSpacing: '0.02em'
                    }}>
                      {item.label}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 13,
                      color: 'rgba(28,28,30,0.5)', lineHeight: 1.6, fontWeight: 300,
                      marginBottom: 24,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {item.desc}
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem',
                        color: '#1C1C1E', fontWeight: 600
                      }}>
                        {item.price ? `₦${item.price.toLocaleString()}` : 'Price on request'}
                      </div>
                      <Link href={`/shop/product/${item.id}`} style={{ 
                        display: 'flex', alignItems: 'center', gap: 10,
                        color: '#1A5276', fontSize: 9, letterSpacing: '0.2em',
                        fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none'
                      }}>
                        Customize
                        <div style={{ width: 20, height: 1, background: '#1A5276', opacity: 0.5 }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 6. View Full Collection Final Tile */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="min-w-[300px] max-w-[320px] md:min-w-[340px] md:max-w-[340px] flex-shrink-0 snap-center py-2"
            >
              <Link href="/shop" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
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
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 20px 40px rgba(26,82,118,0.2)'
                }} className="hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(26,82,118,0.3)]">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-white bg-white/5">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                     </svg>
                  </div>
                  <h4 style={{ 
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', 
                    color: '#FFFFFF', fontWeight: 400, marginBottom: 12, lineHeight: 1.1 
                  }}>
                    Explore The<br />Full Range
                  </h4>
                  <span style={{ 
                    fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase'
                  }}>View All Pieces</span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
      
      <style jsx>{`
        .galleria-card:hover {
          transform: translateY(-10px);
          border-color: #1A5276;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
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
