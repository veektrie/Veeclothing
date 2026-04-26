'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';

// Helper for tag colors (matching your shop page)
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

export default function ProductClient({ product }: { product: any }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState<any>(product.colors?.[0] || null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        // Add your cart logic here (e.g., useCartStore().addItem({...}))
        console.log("Added to cart:", { product, selectedSize, selectedColor });

        setTimeout(() => setIsAdding(false), 1500); // Simulate network/UI delay
    };

    return (
        <main className="bg-[#08101A] min-h-screen relative overflow-x-hidden pt-[clamp(100px,12vh,140px)] pb-24">

            {/* Background Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(26, 82, 118, 0.15) 0%, transparent 50%)',
                }}
            />
            <div
                className="fixed inset-0 z-10 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-20">

                {/* Top Navigation */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Archive
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl shadow-2xl"
                    >
                        {product.src && (
                            <Image
                                src={product.src}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        )}

                        {product.tag && (
                            <div
                                className="absolute top-6 left-6 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 z-10"
                                style={{ background: getTagColor(product.tag) ? `${getTagColor(product.tag)}bb` : 'rgba(26,82,118,0.7)' }}
                            >
                                <span className="text-[10px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                                    {product.tag}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col pt-4 lg:pt-10"
                    >
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-extrabold block mb-3">
                            {product.cat} Collection
                        </span>

                        <h1 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4">
                            {product.name}
                        </h1>

                        <p className="font-serif text-3xl text-[#D4AF37] mb-8">
                            ₦{product.price?.toLocaleString()}
                        </p>

                        <div className="h-[1px] w-full bg-white/10 mb-8" />

                        <p className="font-sans text-[14px] text-white/60 leading-[1.8] font-light mb-10">
                            {product.longDesc || product.desc}
                        </p>

                        {/* Colors Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold">
                                        Select Color
                                    </span>
                                    <span className="font-sans text-[11px] text-white/40">
                                        {selectedColor?.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {product.colors.map((color: any) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedColor?.name === color.name
                                                ? 'ring-2 ring-offset-2 ring-offset-[#08101A] ring-[#D4AF37] scale-110'
                                                : 'ring-1 ring-white/20 hover:scale-110'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        >
                                            {selectedColor?.name === color.name && (
                                                <Check className={`w-4 h-4 ${['#FFFFFF', '#FDFEFE', '#F1C40F'].includes(color.hex?.toUpperCase()) ? 'text-black' : 'text-white'}`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold">
                                        Select Size
                                    </span>
                                    <Link href="#" className="font-sans text-[10px] tracking-[0.1em] text-[#D4AF37] hover:underline uppercase">
                                        Size Guide
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                        px-6 py-3 font-sans text-[11px] tracking-[0.1em] uppercase font-bold rounded-lg border backdrop-blur-sm transition-all duration-300
                        ${selectedSize === size
                                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#08101A]'
                                                    : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/30 hover:bg-white/[0.05]'}
                      `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-12">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
                                className="flex-1 bg-[#D4AF37] hover:bg-[#b5952f] disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-[#08101A] py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all duration-300"
                            >
                                {isAdding ? (
                                    <>Adding to Commission...</>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Begin Commission
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features Accordion / List */}
                        {product.features && product.features.length > 0 && (
                            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                                <h3 className="font-serif text-2xl text-white mb-6 border-b border-white/10 pb-4">
                                    Engineering Details
                                </h3>
                                <ul className="flex flex-col gap-5">
                                    {product.features.map((feature: any, idx: number) => (
                                        <li key={idx} className="flex flex-col gap-1">
                                            <span className="font-sans text-[12px] font-bold tracking-[0.1em] uppercase text-[#D4AF37]">
                                                {feature.title}
                                            </span>
                                            <span className="font-sans text-[14px] font-light text-white/60 leading-[1.6]">
                                                {feature.desc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </motion.div>
                </div>
            </div>
        </main>
    );
}