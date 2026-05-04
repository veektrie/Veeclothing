'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import RecentlyViewed from '@/components/RecentlyViewed';

// Helper for tag colors (matching your shop page)
const getTagColor = (tag: string) => {
    if (!tag) return null;
    switch (tag.toUpperCase()) {
        case 'BESTSELLER': return '#1A5276'; // Navy
        case 'NEW': return '#1A5276'; // Navy
        case 'LIMITED': return '#C0392B'; // Red
        case 'SIGNATURE': return '#1A5276'; // Navy
        case 'CORPORATE': return '#1A5276'; // Navy
        case 'BESPOKE': return '#1A5276'; // Navy
        default: return '#1A5276';
    }
};

export default function ProductClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState<any>(product.colors?.[0] || null);
    const [isAdding, setIsAdding] = useState(false);

    const addItem = useCartStore((state) => state.addItem); // Zustand Hook
    const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);

    useEffect(() => {
        if (product) {
            addRecentlyViewed(product);
        }
    }, [product, addRecentlyViewed]);

    const handleAddToCart = () => {
        // Validations
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error('Please select a size first.');
            return;
        }
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error('Please select a color first.');
            return;
        }

        setIsAdding(true);

        // Add to Zustand
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.src,
            quantity: 1,
            size: selectedSize,
            color: selectedColor?.name,
        });

        toast.success(`${product.name} added to your commission.`);
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <main className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden pt-[clamp(100px,12vh,140px)]">

            {/* Background Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 20% 30%, rgba(26,82,118,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(26, 82, 118, 0.05) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-20 pb-24">

                {/* Top Navigation */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#1A5276] transition-colors font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                {/* PRODUCT GRID SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-xl"
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
                                style={{ background: getTagColor(product.tag) ? `${getTagColor(product.tag)}` : 'rgba(26,82,118,0.9)' }}
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
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#1A5276] font-extrabold block mb-3">
                            {product.cat} Collection
                        </span>

                        <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#1C1C1E] leading-[1.1] mb-4 tracking-[-0.04em]">
                            {product.name}
                        </h1>

                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl text-[#1A5276] font-bold mb-8">
                            ₦{product.price?.toLocaleString()}
                        </p>

                        <div className="h-[1px] w-full bg-black/5 mb-8" />

                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-[15px] text-[#64748b] leading-[1.8] font-light mb-10">
                            {product.longDesc || product.desc}
                        </p>

                        {/* Colors Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">
                                        Select Color
                                    </span>
                                    <span className="font-sans text-[11px] text-[#64748b]">
                                        {selectedColor?.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {product.colors.map((color: any) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedColor?.name === color.name
                                                ? 'ring-2 ring-offset-2 ring-offset-[#F8FAFC] ring-[#1A5276] scale-110'
                                                : 'ring-1 ring-black/10 hover:scale-110'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        >
                                            {selectedColor?.name === color.name && (
                                                <Check className={`w-4 h-4 ${['#FFFFFF', '#FDFEFE', '#F1C40F', '#F8FAFC'].includes(color.hex?.toUpperCase()) ? 'text-black' : 'text-white'}`} />
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
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">
                                        Select Size
                                    </span>
                                    <Link href="#" className="font-sans text-[10px] tracking-[0.1em] text-[#1A5276] hover:underline uppercase font-bold">
                                        Size Guide
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-3 font-sans text-[11px] tracking-[0.1em] uppercase font-bold rounded-lg border transition-all duration-300 ${selectedSize === size
                                                ? 'bg-[#1A5276] border-[#1A5276] text-white'
                                                : 'bg-white border-black/10 text-[#64748b] hover:border-[#1A5276]/30 hover:bg-[#F8FAFC]'
                                                }`}
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
                                className="flex-1 shadow-xl bg-[#1A5276] hover:bg-[#154360] disabled:bg-black/10 disabled:text-black/30 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-900/10"
                            >
                                {isAdding ? (
                                    <>Adding to Cart...</>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    useCartStore.getState().setIsOpen(true);
                                }}
                                disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
                                className="group relative flex-1 overflow-hidden shadow-xl bg-[#1A5276] disabled:bg-black/10 disabled:text-black/30 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(26,82,118,0.25)]"
                            >
                                <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></span>
                                <span className="relative z-10 flex items-center gap-3">
                                    Buy Now
                                </span>
                            </button>
                        </div>


                    </motion.div>
                </div>
            </div>
            {/* End of main max-w container */}

            {/* --- BOTTOM SECTION (RELATED PRODUCTS) MOVED OUTSIDE --- */}
            {relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-[#FDFBF7] py-24 px-[clamp(1rem,5vw,4rem)] border-t border-black/5 w-full">
                    <div className="max-w-[1440px] mx-auto text-center">

                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#1A5276] font-bold block mb-4">
                            EXPLORE
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-black mb-16">
                            You Might Also Like
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 text-left">
                            {relatedProducts.map((item) => (
                                <Link key={item._id} href={`/shop/product/${item.slug}`} className="no-underline text-inherit block h-full group">
                                    <div className="bg-white shadow-xl rounded-[24px] overflow-hidden cursor-pointer h-full flex flex-col border border-black/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_48px_rgba(26,82,118,0.12)] hover:-translate-y-2 hover:border-[#1A5276]/20">
                                        {/* Image Container */}
                                        <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
                                            {item.src && (
                                                <Image
                                                    src={item.src}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-90 group-hover:scale-105 group-hover:brightness-100"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                />
                                            )}
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
                                        <div className="p-6 flex-1 flex flex-col gap-3">
                                            <div>
                                                <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.05rem] font-bold text-[#1C1C1E] mb-1 leading-[1.3] tracking-[-0.02em]">
                                                    {item.name}
                                                </h3>
                                                <p className="font-sans text-[12px] text-[#64748b] leading-[1.6] font-light line-clamp-2">
                                                    {item.desc || 'Premium tailoring with meticulous attention to detail.'}
                                                </p>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between pt-2.5">
                                                <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.05rem] text-[#1A5276] font-bold">
                                                    {String(item.price).toLowerCase().includes('from')
                                                        ? item.price
                                                        : `₦${item.price?.toLocaleString()}`}
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
                            ))}
                        </div>

                    </div>
                </div>
            )}
            
            <RecentlyViewed currentProductId={product._id} />
        </main>
    );
}