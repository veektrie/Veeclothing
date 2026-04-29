'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { items, addItem, decreaseQuantity, removeItem } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch by ensuring we render on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Or a loading spinner

    // Calculations
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal;

    return (
        <main className="bg-[#08101A] min-h-screen relative font-sans overflow-x-hidden pt-[clamp(100px,12vh,140px)] pb-24">

            {/* Background Atmosphere */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(26, 82, 118, 0.15) 0%, transparent 50%)',
                }}
            />

            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] relative z-20">

                <header className="mb-12">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-extrabold block mb-3">
                        YOUR SELECTION
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                        The Commission.
                    </h1>
                </header>

                {items.length === 0 ? (
                    <div className="bg-[#111822] rounded-[2rem] border border-white/[0.02] p-16 text-center shadow-2xl flex flex-col items-center">
                        <ShoppingBag className="w-16 h-16 text-white/10 mb-6" />
                        <h2 className="font-serif text-2xl text-white mb-4">Your cart is empty</h2>
                        <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
                            You haven't added any pieces to your commission yet. Explore our archive to find your signature style.
                        </p>
                        <Link href="/shop">
                            <button className="bg-[#D4AF37] text-black hover:bg-[#b5952f] px-8 py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-extrabold transition-colors">
                                Return to Archive
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* LEFT: Cart Items List */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {items.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${item.size}-${item.color}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#111822] rounded-[2rem] border border-white/[0.02] p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg"
                                >
                                    {/* Item Image */}
                                    <div className="relative w-full md:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-black/20 shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 w-full flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-2xl text-white">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id, item.size, item.color)}
                                                className="text-red-400 hover:text-red-900 transition-colors"
                                                title="Remove from cart"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 text-[10px] tracking-[0.1em] text-white/50 uppercase font-bold mb-6">
                                            {item.size && <span>Size: <span className="text-[#D4AF37]">{item.size}</span></span>}
                                            {item.size && item.color && <div className="w-1 h-1 bg-white/20 rounded-full" />}
                                            {item.color && <span>Color: <span className="text-[#D4AF37]">{item.color}</span></span>}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <p className="font-serif text-xl text-[#D4AF37]">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4 bg-white/5 rounded-full px-2 py-1 border border-white/10">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id, item.size, item.color)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-white text-sm font-medium w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => addItem(item)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT: Order Summary (Glassmorphic) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/[0.02] backdrop-blur-[40px] rounded-[2rem] border border-white/[0.08] p-8 shadow-2xl sticky top-32">
                                <h3 className="font-serif text-2xl text-white mb-8 border-b border-white/10 pb-4">
                                    Summary
                                </h3>

                                <div className="flex flex-col gap-4 text-sm font-sans mb-8">
                                    <div className="flex justify-between items-center text-white/60">
                                        <span>Subtotal</span>
                                        <span>₦{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/60">
                                        <span>Shipping</span>
                                        {/* <span>₦{shipping.toLocaleString()}</span> */}
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-center">
                                    <span className="text-white text-lg font-medium">Total</span>
                                    <span className="font-serif text-2xl text-[#D4AF37]">
                                        ₦{total.toLocaleString()}
                                    </span>
                                </div>

                                <Link href="/checkout">
                                    <button className="w-full bg-[#D4AF37] text-black hover:bg-[#b5952f] py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-extrabold transition-colors flex items-center justify-center gap-2">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}