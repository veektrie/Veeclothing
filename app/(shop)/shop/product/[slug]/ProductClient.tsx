'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';

export default function ProductClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState<any>(product.colors?.[0] || null);
    const [isAdding, setIsAdding] = useState(false);

    const addItem = useCartStore((state: { addItem: any; }) => state.addItem);

    const handleAddToCart = () => {
        // Validation: Make sure they picked a size if sizes exist
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error('Please select a size first.');
            return;
        }

        // Validation: Make sure they picked a color if colors exist
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error('Please select a color first.');
            return;
        }

        setIsAdding(true);

        // 3. SEND DATA TO STORE
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.src,
            quantity: 1,
            size: selectedSize,
            color: selectedColor?.name,
        });

        // 4. SHOW SUCCESS TOAST
        toast.success(`${product.name} added to your cart.`);

        // Reset button state quickly
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <main className="bg-[#08101A] min-h-screen relative font-sans overflow-x-hidden">

            {/* --- TOP SECTION (DARK) --- */}
            <div className="pt-32 pb-24 px-[clamp(1rem,5vw,4rem)] max-w-[1440px] mx-auto">

                {/* Breadcrumb */}
                <div className="flex gap-2 text-[10px] tracking-[0.2em] font-bold uppercase mb-8">
                    <Link href="/shop" className="text-white/40 hover:text-white transition-colors">ARCHIVE</Link>
                    <span className="text-white/20">/</span>
                    <span className="text-[#D4AF37]">{product.name}</span>
                </div>

                {/* 3-Column Main Product Card */}
                <div className="bg-[#111822] rounded-[3rem] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center shadow-2xl border border-white/[0.02]">

                    {/* Column 1: Text Details */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase font-bold mb-6">
                            VEE ATELIER
                            <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-6">
                            {product.name}
                        </h1>

                        <p className="font-serif text-2xl text-[#D4AF37] font-bold mb-12">
                            {String(product.price).toLowerCase().includes('from')
                                ? product.price
                                : `₦${product.price?.toLocaleString()}`}
                        </p>

                        <span className="text-[9px] tracking-[0.2em] text-white/40 uppercase font-bold mb-3 block">
                            ENGINEERING & SOUL
                        </span>
                        <p className="text-sm text-white/60 leading-[1.8] font-light max-w-sm">
                            {product.longDesc || product.desc}
                        </p>
                    </div>

                    {/* Column 2: Center Image */}
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/20 shadow-2xl transform lg:scale-110 z-10">
                        {product.src && (
                            <Image
                                src={product.src}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover"
                            />
                        )}
                    </div>

                    {/* Column 3: Options & Buttons */}
                    <div className="flex flex-col lg:pl-10">

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-10">
                                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold mb-4 block">
                                    SELECT SIZE
                                </span>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                        min-w-[4rem] px-5 py-3 text-[10px] tracking-[0.1em] uppercase font-bold rounded-full transition-all duration-300
                        ${selectedSize === size
                                                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                                                    : 'bg-transparent border border-white/20 text-white/80 hover:border-white/50'}
                      `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-12">
                                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold mb-4 block">
                                    THE PALETTE
                                </span>
                                <div className="flex flex-wrap gap-4">
                                    {product.colors.map((color: any) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            title={color.name}
                                            className={`
                        w-8 h-8 rounded-full transition-all duration-300
                        ${selectedColor?.name === color.name ? 'ring-2 ring-offset-4 ring-offset-[#111822] ring-[#D4AF37] scale-110' : 'hover:scale-110'}
                      `}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col gap-4 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="w-full bg-[#D4AF37] text-black hover:bg-[#b5952f] py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-extrabold transition-colors disabled:opacity-50"
                            >
                                {isAdding ? 'ADDING...' : 'ADD TO CART'}
                            </button>
                            <Link href='/cart'>
                                <button className="w-full bg-transparent border border-white/20 text-white hover:border-white/60 py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-colors">
                                    Go To Cart
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- BOTTOM SECTION (LIGHT / RELATED PRODUCTS) --- */}
            {relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-[#FDFBF7] py-24 px-[clamp(1rem,5vw,4rem)]">
                    <div className="max-w-[1440px] mx-auto text-center">

                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#1A5276] font-bold block mb-4">
                            EXPLORE
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-black mb-16">
                            You Might Also Like
                        </h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                            {relatedProducts.map((item) => (
                                <Link key={item._id} href={`/shop/product/${item.slug}`} className="group no-underline ">
                                    <div className="flex flex-col items-center ">
                                        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
                                            {item.src && (
                                                <Image
                                                    src={item.src}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-sm font-sans text-gray-900 mb-2">{item.name}</h3>
                                        <p className="text-xs font-sans text-[#1A5276] font-semibold">
                                            {String(item.price).toLowerCase().includes('from')
                                                ? item.price
                                                : `₦${item.price?.toLocaleString()}`}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </main>
    );
}