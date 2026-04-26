'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Hardcoded categories to ensure labels look nice (matches your Sanity values)
type Category = 'all' | 'corporate' | 'bespoke' | 'kaftan' | 'accessories';

const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'all', label: 'All Pieces' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'bespoke', label: 'Bespoke Suiting' },
    { key: 'kaftan', label: 'Kaftans & Agbada' },
    { key: 'accessories', label: 'Accessories' },
];

// Helper to assign colors to tags
const getTagColor = (tag: string) => {
    if (!tag) return null;
    switch (tag.toUpperCase()) {
        case 'BESTSELLER': return '#D4AF37'; // Gold
        case 'NEW': return '##27AE60'; // Green
        case 'LIMITED': return '#C0392B'; // Red
        case 'SIGNATURE': return '#1A5276'; // Purple
        case 'CORPORATE': return '#2980B9'; // Blue
        case 'BESPOKE': return '#8E44AD'; // Navy
        default: return '#1A5276';
    }
};

export default function ShopClient({ initialProducts = [] }: { initialProducts: any[] }) {
    const [active, setActive] = useState<Category>('all');

    // Filter based on active category
    const filtered = active === 'all'
        ? initialProducts
        : initialProducts.filter(p => p.cat === active);

    return (
        <main className="bg-[#08101A] min-h-screen relative overflow-x-hidden">

            {/* ── Background Atmosphere ── */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.12) 0%, transparent 50%)',
                }}
            />

            {/* Subtle Grain Texture */}
            <div
                className="fixed inset-0 z-10 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-20 pt-[clamp(120px,15vh,180px)]">

                {/* ── Shop Hero Banner ── */}
                <div className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,5vw,4rem)] relative">
                    <div className="max-w-[1440px] mx-auto relative z-20">

                        {/* Breadcrumb */}
                        <div className="flex gap-2.5 items-center mb-6">
                            <Link href="/" className="text-[10px] text-white/30 font-sans tracking-[0.15em] uppercase no-underline hover:text-white transition-colors">
                                Home
                            </Link>
                            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                            <span className="text-[10px] text-[#D4AF37] font-sans tracking-[0.15em] uppercase font-semibold">
                                The Archive
                            </span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] font-extrabold block mb-4">
                                Boutique Collection
                            </span>
                            <div className="h-[1px] w-20 bg-[#D4AF37]/20 mb-6" />

                            <h1 className="font-serif font-light text-[clamp(2.5rem,6vw,4.8rem)] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                                The Collection.<br />
                                <em className="text-[#D4AF37] italic">Made to Measure.</em>
                            </h1>

                            <p className="text-white/50 text-[clamp(14px,1.2vw,16px)] font-light leading-[1.8] max-w-[520px] font-sans">
                                Every piece in our shop is engineered to order. We combine heritage craftsmanship with modern silhouettes to create garments that project authority and timeless style.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ── Offer Strip (Glassmorphic) ── */}
                <div className="bg-[#D4AF37]/5 backdrop-blur-[20px] border-y border-[#D4AF37]/10 py-3 px-[clamp(1rem,5vw,4rem)] flex items-center justify-center gap-6">
                    <span className="font-serif text-[clamp(0.9rem,1.1vw,1.1rem)] italic text-[#D4AF37] font-normal">
                        Exclusive Heritage Fabrics Now in Stock
                    </span>
                    <div className="h-3 w-[1px] bg-[#D4AF37]/20 hidden md:block" />
                    <span className="text-[9px] tracking-[0.2em] text-white/50 font-sans uppercase font-bold hidden md:block">
                        Complimentary Fitting on All Commissions
                    </span>
                </div>

                {/* ── Filter & Search Bar ── */}
                <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] pt-[clamp(2rem,5vw,4rem)]">
                    <div className="flex gap-3 overflow-x-auto pb-[15px] hide-scrollbar touch-pan-x">
                        {CATEGORIES.map((c) => {
                            const isActive = active === c.key;
                            return (
                                <button
                                    key={c.key}
                                    onClick={() => setActive(c.key)}
                                    className={`
                    px-6 py-3 text-[10px] tracking-[0.2em] uppercase cursor-pointer font-sans whitespace-nowrap
                    rounded-full border backdrop-blur-[20px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isActive
                                            ? 'font-extrabold bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                                            : 'font-semibold bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white/70'}
                  `}
                                >
                                    {c.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Product Grid (Glassmorphic) ── */}
                <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] pt-[clamp(1rem,3vw,2.5rem)] pb-32">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[clamp(1rem,3vw,2.5rem)]">
                            {filtered.map((product, i) => (
                                <motion.div
                                    key={product._id} // Using Sanity's unique _id
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i % 4 * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <Link
                                        href={`/shop/product/${product.slug}`} // Using Sanity's slug for routing
                                        className="no-underline text-inherit block h-full"
                                    >
                                        <div className="bg-white/[0.02] backdrop-blur-[40px] rounded-[24px] overflow-hidden cursor-pointer h-full flex flex-col border border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2.5 hover:border-[#D4AF37]/20 hover:bg-white/[0.04]">

                                            {/* Image Container */}
                                            <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                                                {product.src && (
                                                    <Image
                                                        src={product.src}
                                                        alt={`${product.name} — Vee Clothing Company`}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-90 group-hover:scale-105 group-hover:brightness-100"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                )}

                                                {product.tag && (
                                                    <div
                                                        className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10 z-10"
                                                        style={{
                                                            background: getTagColor(product.tag) ? `${getTagColor(product.tag)}bb` : 'rgba(26,82,118,0.7)',
                                                        }}
                                                    >
                                                        <span className="text-[8px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                                                            {product.tag}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details Container */}
                                            <div className="p-8 flex-1 flex flex-col gap-3">
                                                <div>
                                                    <h3 className="font-serif text-[1.6rem] font-normal text-white mb-1 leading-[1.2]">
                                                        {product.name}
                                                    </h3>
                                                    <p className="font-sans text-[13px] text-white/40 leading-[1.6] font-light line-clamp-2">
                                                        {product.desc}
                                                    </p>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between pt-2.5">
                                                    <span className="font-serif text-[1.2rem] text-[#D4AF37] font-semibold">
                                                        {/* Dynamically format number to Naira string */}
                                                        ₦{product.price?.toLocaleString()}
                                                    </span>

                                                    <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] bg-[#D4AF37]/5 transition-all duration-300 ease-out group-hover:bg-[#D4AF37] group-hover:text-black">
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
                        </div>
                    ) : (
                        <div className="text-center py-24 text-white/40 font-sans tracking-widest text-sm uppercase">
                            No products found in this category.
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}