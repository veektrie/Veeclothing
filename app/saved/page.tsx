'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { BLUR_DATA_URL } from '@/lib/imageUtils';
import toast from 'react-hot-toast';

export default function SavedPage() {
  const { items, removeItem, clearAll } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden pt-[clamp(100px,13vh,150px)]">

      {/* Atmosphere */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(26,82,118,0.05) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-10 pb-32">

        {/* Back */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#1A5276] transition-colors font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-10"
        >
          <ArrowLeft size={14} />
          Back to Shop
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-[clamp(2rem,5vw,4rem)]"
        >
          <span
            className="block text-[9px] tracking-[0.28em] uppercase font-bold mb-3"
            style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
          >
            Your Curation
          </span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-[#1C1C1E] leading-[1.1]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Saved Pieces.
              </h1>
              <p className="mt-1.5 text-[13px] font-light text-[#94a3b8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {items.length} piece{items.length !== 1 ? 's' : ''} held for your consideration.
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => { clearAll(); toast('Collection cleared'); }}
                className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold text-[#94a3b8] hover:text-[#C0392B] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Trash2 size={13} />
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <Heart size={28} style={{ color: '#D4AF37' }} />
              </div>
              <h2
                className="text-[1.3rem] font-semibold tracking-[-0.02em] text-[#1C1C1E] mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Your selection is empty.
              </h2>
              <p className="text-[13px] text-[#94a3b8] font-light mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                Browse the collection and save pieces that speak to you.
              </p>
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white no-underline transition-all duration-300 hover:shadow-[0_8px_24px_rgba(26,82,118,0.2)]"
                style={{ background: 'linear-gradient(135deg, #1A5276, #2980B9)', fontFamily: 'Inter, sans-serif' }}
              >
                Explore the Collection
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {items.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(1rem,2.5vw,2rem)]"
          >
            <AnimatePresence>
              {items.map((item, idx) => {
                const id = item._id ?? item.id ?? '';
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group relative"
                  >
                    <Link href={`/shop/product/${item.slug ?? id}`} className="block no-underline text-inherit">
                      <div className="bg-white rounded-[20px] overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">

                        {/* Image */}
                        <div className="relative aspect-[3/4] bg-[#E2E8F0] overflow-hidden">
                          {item.src && (
                            <Image
                              src={item.src}
                              alt={item.name}
                              fill
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                              className="object-cover brightness-95 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <h3
                            className="text-[13.5px] font-semibold text-[#1C1C1E] mb-1 leading-[1.3] tracking-[-0.01em] line-clamp-1"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="text-[12px] font-normal text-[#64748b] tabular-nums"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            ₦{(item.price ?? 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Remove button */}
                    <button
                      aria-label={`Remove ${item.name} from saved`}
                      onClick={() => { removeItem(id); toast('Removed from saved pieces'); }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        color: '#94a3b8',
                      }}
                    >
                      <Heart size={15} fill="#D4AF37" color="#D4AF37" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}
