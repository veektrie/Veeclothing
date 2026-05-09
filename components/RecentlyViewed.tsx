'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Derive a plausible material line from stored product data */
function getMaterialLine(item: any): string {
  if (item.material) return item.material;
  const cat: string = (item.cat ?? item.category ?? '').toLowerCase();
  const map: Record<string, string> = {
    bespoke:   'Super 120s Italian Wool',
    corporate: 'Premium Woven Fabric',
    kaftan:    'Heritage Silk-Cotton Blend',
    agbada:    'Hand-Embroidered Damask',
    hoodies:   'Heavyweight French Terry',
    tees:      'Supima Cotton Piqué',
    polo:      'Mercerised Cotton Piqué',
    pants:     'Stretch Worsted Wool',
    jacket:    'Structured Twill Weave',
    shirts:    'Egyptian Cotton Poplin',
  };
  return map[cat] ?? 'Artisan-Crafted Fabric';
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const { items } = useRecentlyViewedStore();
  const { convert } = useCurrencyStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const displayed = (
    currentProductId
      ? items.filter((i) => (i._id ?? i.id) !== currentProductId)
      : items
  ).slice(0, 4);

  if (displayed.length === 0) return null;

  return (
    <section
      aria-label="Your Selection"
      className="border-t border-black/[0.06] bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.5rem,6vw,5rem)]">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-[clamp(2.5rem,5vw,4rem)]"
        >
          {/* Eyebrow */}
          <span
            className="block text-[9px] tracking-[0.28em] uppercase font-bold mb-4"
            style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
          >
            Curated For You
          </span>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold tracking-[-0.035em] leading-[1.1] text-[#1C1C1E]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Your Selection.
              </h2>
              <p
                className="mt-2 text-[13px] font-light text-[#94a3b8] tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Pieces held for your consideration.
              </p>
            </div>

            {/* Thin gold rule */}
            <div
              className="flex-1 hidden md:block max-w-[220px] h-[1px] mb-2"
              style={{ background: 'linear-gradient(90deg, #D4AF37 0%, transparent 100%)' }}
            />
          </div>
        </motion.div>

        {/* ── Card Grid ──────────────────────────────────────────────── */}
        {/*
          Desktop: exactly 4 columns with generous gaps.
          Tablet:  2 columns.
          Mobile:  horizontal scroll (2-item peek).
        */}
        <div
          className="
            flex gap-[clamp(1.25rem,3vw,2.25rem)]
            overflow-x-auto pb-2
            sm:grid sm:grid-cols-2 sm:overflow-visible
            lg:grid-cols-4
            hide-scrollbar
          "
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayed.map((item, idx) => {
            const id   = item._id ?? item.id;
            const slug = item.slug ?? id;
            const name = item.name ?? 'Untitled Piece';
            const material = getMaterialLine(item);
            const price = item.price ?? 0;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex-shrink-0 w-[72vw] sm:w-auto"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Link href={`/shop/product/${slug}`} className="block no-underline text-inherit">

                  {/* ── Image Container ──────────────────────────────── */}
                  <div
                    className="relative overflow-hidden rounded-[18px] bg-[#F0F2F5]"
                    style={{ aspectRatio: '3 / 4' }}
                  >
                    {item.src && (
                      <Image
                        src={item.src}
                        alt={`${name} — Vee Clothing`}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-[0.93] group-hover:scale-[1.04] group-hover:brightness-100"
                        sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 25vw"
                      />
                    )}

                    {/* Glassmorphic lower-quarter overlay — visible on hover */}
                    <div
                      className="
                        absolute bottom-0 left-0 right-0
                        opacity-0 group-hover:opacity-100
                        transition-all duration-400 ease-out
                        flex items-end justify-center pb-5
                      "
                      style={{
                        height: '38%',
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.18) 0%, transparent 100%)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                      }}
                    >
                      {/* Ghost "Revisit Details" button */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        aria-label={`Revisit details for ${name}`}
                        className="
                          translate-y-3 group-hover:translate-y-0
                          opacity-0 group-hover:opacity-100
                          transition-all duration-350 ease-out
                          text-white text-[9px] tracking-[0.22em] uppercase font-semibold
                          px-5 py-2.5 rounded-full
                        "
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: 'transparent',
                          border: '1px solid #D4AF37',
                          boxShadow: '0 2px 16px rgba(212,175,55,0.15)',
                        }}
                      >
                        Revisit Details
                      </button>
                    </div>
                  </div>

                  {/* ── Text Hierarchy ───────────────────────────────── */}
                  <div className="pt-5 px-1">
                    {/* Product Title */}
                    <h3
                      className="text-[14.5px] font-semibold text-[#1C1C1E] leading-[1.3] tracking-[-0.01em] mb-1.5 line-clamp-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {name}
                    </h3>

                    {/* Material line — the luxury detail */}
                    <p
                      className="text-[11px] text-[#94a3b8] font-light tracking-[0.03em] mb-3 line-clamp-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {material}
                    </p>

                    {/* Price — understated, no emphasis */}
                    <p className="font-sans text-[10px] tracking-wide text-[#64748b]">
                      {convert(price ?? 0).symbol}{(convert(price ?? 0).value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
