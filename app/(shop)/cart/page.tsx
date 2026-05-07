'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { items, addItem, decreaseQuantity, removeItem, hasGiftPackaging, toggleGiftPackaging } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const giftPackagingPrice = hasGiftPackaging ? 15000 : 0;
    const total = subtotal + giftPackagingPrice;

    return (
        <main className="bg-[#F8FAFC] min-h-screen relative font-sans overflow-x-hidden pt-[clamp(100px,12vh,140px)] pb-24">
            
            {/* Subtle Gradient Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 10% 10%, rgba(26, 82, 118, 0.03) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(16, 185, 129, 0.03) 0%, transparent 40%)',
                }}
            />

            <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] relative z-20">
                
                {/* Navigation Back */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A5276] mb-8 hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-3 h-3" />
                    Back to Shop
                </Link>

                <header className="mb-12">
                    <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="text-4xl md:text-5xl font-extrabold text-[#1C1C1E] tracking-tight leading-none mb-4">
                        Your <span className="text-[#1A5276]">Selection.</span>
                    </h1>
                    <p className="text-[#64748b] text-sm font-medium">
                        {items.length} {items.length === 1 ? 'item' : 'items'} in your commission.
                    </p>
                </header>

                {items.length === 0 ? (
                    <div className="bg-white rounded-[2rem] border border-black/[0.05] p-16 text-center shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-8 h-8 text-[#1A5276]/20" />
                        </div>
                        <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-bold text-[#1C1C1E] mb-3">Your selection is empty</h2>
                        <p className="text-[#64748b] text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                            You haven't added any bespoke pieces to your commission yet. Explore our archive to find your signature style.
                        </p>
                        <Link href="/shop">
                            <button className="bg-[#1A5276] text-white px-10 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360] hover:shadow-xl hover:shadow-blue-900/10 active:scale-95">
                                Return to Shop
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* LEFT: Cart Items List */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {items.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${item.size}-${item.color}-${item.monogramText}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-3xl border border-black/[0.05] p-5 md:p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {/* Item Image */}
                                    <div className="relative w-full md:w-36 aspect-[4/5] rounded-2xl overflow-hidden bg-[#F8FAFC] shrink-0 border border-black/[0.03]">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 w-full flex flex-col py-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E]">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id, item.size, item.color, item.monogramText)}
                                                className="text-[#64748b] hover:text-red-500 transition-colors p-2 -mr-2"
                                                title="Remove from cart"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.1em] text-[#64748b] uppercase font-bold mb-8">
                                            {item.size && (
                                                <span className="bg-[#F8FAFC] px-3 py-1 rounded-full border border-black/[0.05]">
                                                    Size: <span className="text-[#1A5276]">{item.size}</span>
                                                </span>
                                            )}
                                            {item.color && (
                                                <span className="bg-[#F8FAFC] px-3 py-1 rounded-full border border-black/[0.05]">
                                                    Color: <span className="text-[#1A5276]">{item.color}</span>
                                                </span>
                                            )}
                                            {item.monogramText && (
                                                <span className="bg-[#D4AF37]/5 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                                                    Monogram: <span className="text-[#D4AF37]">{item.monogramText}</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold text-[#1A5276]">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-full px-2 py-1 border border-black/[0.05]">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id, item.size, item.color, item.monogramText)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-[#1C1C1E] text-sm font-bold w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => addItem(item)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2rem] border border-black/[0.05] p-8 shadow-sm sticky top-32">
                                <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E] mb-8 border-b border-black/[0.05] pb-5">
                                    Commission Summary
                                </h3>

                                {/* Gift Packaging Toggle */}
                                <div className="mb-8 p-6 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">🎁</span>
                                            <span className="text-[11px] font-bold text-[#1C1C1E] uppercase tracking-wider">Luxury Packaging</span>
                                        </div>
                                        <button
                                            onClick={toggleGiftPackaging}
                                            className={`w-10 h-5 rounded-full transition-all relative ${hasGiftPackaging ? 'bg-[#1A5276]' : 'bg-[#E2E8F0]'}`}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${hasGiftPackaging ? 'left-5.5' : 'left-0.5'}`} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-[#64748b] leading-relaxed">
                                        Signature box, acid-free tissue, and a handwritten card. (+₦15,000)
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4 text-sm font-medium mb-8">
                                    <div className="flex justify-between items-center text-[#64748b]">
                                        <span>Subtotal</span>
                                        <span className="text-[#1C1C1E]">₦{subtotal.toLocaleString()}</span>
                                    </div>
                                    {hasGiftPackaging && (
                                        <div className="flex justify-between items-center text-[#D4AF37]">
                                            <span>Gift Packaging</span>
                                            <span>+₦15,000</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-[#64748b]">
                                        <span>Delivery</span>
                                        <span className="text-[#1A5276]">Calculated at next step</span>
                                    </div>
                                </div>

                                <div className="border-t border-black/[0.05] pt-6 mb-8 flex justify-between items-center">
                                    <span className="text-[#1C1C1E] text-lg font-bold">Total</span>
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-black text-[#1A5276]">
                                        ₦{total.toLocaleString()}
                                    </span>
                                </div>

                                <Link href="/checkout">
                                    <button className="w-full bg-[#1A5276] text-white py-5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360] hover:shadow-xl hover:shadow-blue-900/10 flex items-center justify-center gap-3 active:scale-95">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                                
                                <p className="text-center text-[10px] text-[#94a3b8] mt-6 leading-relaxed">
                                    Secured payment via Paystack & Flutterwave.<br/>
                                    Terms & Conditions apply.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}