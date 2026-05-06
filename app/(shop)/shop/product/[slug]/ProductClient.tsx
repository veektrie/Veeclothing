'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Check, MessageSquare, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import RecentlyViewed from '@/components/RecentlyViewed';
import { BLUR_DATA_URL } from '@/lib/imageUtils';
import SizeGuideModal from '@/components/SizeGuideModal';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getTagColor = (tag: string) => {
    switch (tag?.toUpperCase()) {
        case 'LIMITED': return '#C0392B';
        default: return '#1A5276';
    }
};

/** Build a WhatsApp commission message pre-filled with the product name */
function buildCommissionUrl(productName: string, slug: string): string {
    const msg = encodeURIComponent(
        `Hello, I'd like to commission a bespoke version of "${productName}".\n\nProduct link: https://www.veeclothingcompany.com/shop/product/${slug}`
    );
    return `https://wa.me/2348103031020?text=${msg}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState<any>(product.colors?.[0] || null);
    const [isAdding, setIsAdding] = useState(false);
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { toggleItem, hasItem } = useWishlistStore();
    // Wait for Zustand persist to hydrate before reading wishlist state
    const isWishlisted = mounted && hasItem(product._id);

    const addItem = useCartStore((state) => state.addItem);
    const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);
    const { convert } = useCurrencyStore();

    useEffect(() => {
        setMounted(true);
        if (product) addRecentlyViewed(product);
    }, [product, addRecentlyViewed]);

    const handleAddToCart = () => {
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error('Please select a size first.');
            return;
        }
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error('Please select a color first.');
            return;
        }
        setIsAdding(true);
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

    const blurUrl = BLUR_DATA_URL;
    const commissionUrl = buildCommissionUrl(product.name, product.slug ?? '');

    return (
        <main className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden pt-[clamp(100px,12vh,140px)]">

            {/* Background Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 20% 30%, rgba(26,82,118,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(26,82,118,0.05) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-20 pb-24">

                {/* Back link */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#1A5276] transition-colors font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                {/* Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT: Image (#11 blur placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#E2E8F0] border border-black/5 shadow-xl"
                    >
                        {product.src && (
                            <Image
                                src={product.src}
                                alt={`${product.name} — Vee Clothing Company`}
                                fill
                                priority
                                placeholder="blur"
                                blurDataURL={blurUrl}
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        )}

                        {product.tag && (
                            <div
                                className="absolute top-6 left-6 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 z-10"
                                style={{ background: getTagColor(product.tag) }}
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

                        <div className="flex justify-between items-center mb-8">
                            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl text-[#1A5276] font-bold mb-0">
                                {convert(product.price).symbol}{(convert(product.price).value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            
                            {/* Wishlist toggle */}
                            <button
                                id="product-wishlist-toggle"
                                aria-label={isWishlisted ? 'Remove from saved pieces' : 'Save this piece'}
                                onClick={() => {
                                    toggleItem(product);
                                    toast(isWishlisted ? 'Removed from saved pieces' : 'Saved to your selection', {
                                        icon: isWishlisted ? '🗑' : '♡',
                                    });
                                }}
                                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border"
                                style={{
                                    background: isWishlisted ? 'rgba(212,175,55,0.08)' : 'white',
                                    borderColor: isWishlisted ? '#D4AF37' : 'rgba(0,0,0,0.08)',
                                    color: isWishlisted ? '#D4AF37' : '#94a3b8',
                                }}
                            >
                                <Heart size={20} fill={isWishlisted ? '#D4AF37' : 'none'} />
                            </button>
                        </div>

                        <div className="h-[1px] w-full bg-black/5 mb-8" />

                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-[15px] text-[#64748b] leading-[1.8] font-light mb-10">
                            {product.longDesc || product.desc}
                        </p>

                        {/* Colors */}
                        {product.colors?.length > 0 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">
                                        Select Color
                                    </span>
                                    <span className="font-sans text-[11px] text-[#64748b]">{selectedColor?.name}</span>
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

                        {/* Sizes */}
                        {product.sizes?.length > 0 && (
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">
                                        Select Size
                                    </span>
                                    <button
                                        onClick={() => setSizeGuideOpen(true)}
                                        className="font-sans text-[10px] tracking-[0.1em] text-[#1A5276] hover:underline uppercase font-bold"
                                    >
                                        Size Guide
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size: string) => {
                                        const isSoldOut = product.soldOutSizes?.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-3 font-sans text-[11px] tracking-[0.1em] uppercase font-bold rounded-lg border transition-all duration-300 relative overflow-hidden ${
                                                    selectedSize === size
                                                        ? 'bg-[#1A5276] border-[#1A5276] text-white'
                                                        : isSoldOut
                                                            ? 'bg-gray-100 border-gray-200 text-gray-400 opacity-60 hover:opacity-100'
                                                            : 'bg-white border-black/10 text-[#64748b] hover:border-[#1A5276]/30 hover:bg-[#F8FAFC]'
                                                    }`}
                                            >
                                                {size}
                                                {isSoldOut && (
                                                    <span className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400 -translate-y-1/2 rotate-[15deg]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {product.soldOutSizes?.includes(selectedSize) ? (
                            <div className="mb-6">
                                <button
                                    onClick={() => {
                                        // In a real app, this would open a modal to collect email
                                        toast.success('We will notify you when this size is back in stock.', { icon: '📩' });
                                    }}
                                    className="w-full shadow-xl bg-white border border-[#1A5276] text-[#1A5276] hover:bg-[#F8FAFC] py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center transition-all duration-300"
                                >
                                    Notify Me When Available
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3 mb-6">
                                <button
                                    id="product-add-to-cart"
                                    onClick={handleAddToCart}
                                    disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
                                    className="flex-1 shadow-xl bg-[#1A5276] hover:bg-[#154360] disabled:bg-black/10 disabled:text-black/30 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all duration-300"
                                >
                                    {isAdding ? (
                                        <>Adding...</>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </button>

                                <button
                                    id="product-buy-now"
                                    onClick={() => {
                                        handleAddToCart();
                                        useCartStore.getState().setIsOpen(true);
                                    }}
                                    disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
                                    className="group relative flex-1 overflow-hidden shadow-xl bg-[#1A5276] disabled:bg-black/10 disabled:text-black/30 disabled:cursor-not-allowed text-white py-5 px-8 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(26,82,118,0.25)]"
                                >
                                    <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <span className="relative z-10">Buy Now</span>
                                </button>
                            </div>
                        )}

                        {/* ── #2: Commission This Piece CTA ──────────────────────── */}
                        <a
                            href={commissionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="product-commission-cta"
                            className="group flex items-center justify-between w-full rounded-xl px-6 py-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] mb-10"
                            style={{
                                border: '1px solid rgba(212,175,55,0.35)',
                                background: 'rgba(212,175,55,0.04)',
                            }}
                        >
                            <div>
                                <p
                                    className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1C1C1E] mb-0.5"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Want this in your exact measurements?
                                </p>
                                <p
                                    className="text-[12px] font-light text-[#64748b]"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Commission a bespoke version — made precisely to you.
                                </p>
                            </div>
                            <div
                                className="flex-shrink-0 flex items-center gap-2 ml-4 px-4 py-2 rounded-full text-[9px] tracking-[0.2em] uppercase font-bold transition-all duration-300 group-hover:shadow-md"
                                style={{
                                    color: '#D4AF37',
                                    border: '1px solid #D4AF37',
                                    background: 'transparent',
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            >
                                <MessageSquare size={12} />
                                Commission →
                            </div>
                        </a>

                        {/* Features */}
                        {product.features?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.features.map((f: any, i: number) => (
                                    <div key={i} className="bg-white rounded-xl p-5 border border-black/[0.05]">
                                        <p className="text-[11px] tracking-[0.1em] uppercase font-bold text-[#1C1C1E] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {f.title}
                                        </p>
                                        <p className="text-[12px] text-[#64748b] font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {f.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reviews Section */}
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="mt-16 pt-16 border-t border-black/5">
                                <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-bold text-[#1C1C1E] mb-8 tracking-tight">
                                    Client Reviews ({product.reviews.length})
                                </h3>
                                <div className="space-y-8">
                                    {product.reviews.map((review: any, idx: number) => (
                                        <div key={idx} className="pb-8 border-b border-black/5 last:border-0 last:pb-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[#1C1C1E] text-sm">{review.reviewerName}</span>
                                                    {review.isVerifiedPurchase && (
                                                        <span className="text-[#1A5276] text-[10px] uppercase tracking-wider font-bold bg-[#1A5276]/10 px-2 py-0.5 rounded-sm">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-1 text-[#D4AF37]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < review.rating ? '' : 'opacity-30'}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[#64748b] text-sm leading-relaxed font-light">
                                                {review.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts?.length > 0 && (
                <div className="bg-[#FDFBF7] py-24 px-[clamp(1rem,5vw,4rem)] border-t border-black/5 w-full">
                    <div className="max-w-[1440px] mx-auto text-center">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#1A5276] font-bold block mb-4">EXPLORE</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-black mb-16">You Might Also Like</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 text-left">
                            {relatedProducts.map((item) => (
                                <Link key={item._id} href={`/shop/product/${item.slug}`} className="no-underline text-inherit block h-full group">
                                    <div className="bg-white shadow-xl rounded-[24px] overflow-hidden cursor-pointer h-full flex flex-col border border-black/[0.06] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(26,82,118,0.12)] hover:-translate-y-2 hover:border-[#1A5276]/20">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-[#E2E8F0]">
                                            {item.src && (
                                                <Image
                                                    src={item.src}
                                                    alt={item.name}
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL={BLUR_DATA_URL}
                                                    className="object-cover transition-transform duration-1000 brightness-90 group-hover:scale-105 group-hover:brightness-100"
                                                    sizes="(max-width: 768px) 100vw, 25vw"
                                                />
                                            )}
                                            {item.tag && (
                                                <div
                                                    className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10 z-10"
                                                    style={{ background: `${getTagColor(item.tag)}bb` }}
                                                >
                                                    <span className="text-[8px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                                                        {item.tag}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
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
                                                    {convert(item.price).symbol}{(convert(item.price).value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                </span>
                                                <div className="w-8 h-8 rounded-full border border-[#1A5276]/30 flex items-center justify-center text-[#1A5276] bg-[#F8FAFC] transition-all duration-300 group-hover:bg-[#1A5276] group-hover:text-white">
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

            {/* Size Guide Modal (#1) */}
            <SizeGuideModal
                isOpen={sizeGuideOpen}
                onClose={() => setSizeGuideOpen(false)}
                category={product.cat}
            />
        </main>
    );
}