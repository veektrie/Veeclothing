'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, addItem, decreaseQuantity, removeItem } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isMounted) return null;

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[2001] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-black/[0.05]">
                            <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-bold text-[#1C1C1E]">
                                Your <span className="text-[#1A5276]">Selection.</span>
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-[#64748b] hover:text-[#1A5276] hover:bg-[#F8FAFC] rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <ShoppingBag className="w-8 h-8 text-[#1A5276]/20" />
                                    </div>
                                    <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1C1C1E] mb-2">Cart is empty</h3>
                                    <p className="text-[#64748b] text-sm mb-8">You haven't added any bespoke pieces yet.</p>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="bg-[#1A5276] text-white px-8 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360]"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {items.map((item) => (
                                        <div
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            className="bg-white rounded-2xl border border-black/[0.05] p-4 flex gap-4 shadow-sm"
                                        >
                                            <div className="relative w-24 aspect-[4/5] rounded-xl overflow-hidden bg-[#F8FAFC] shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[15px] font-bold text-[#1C1C1E] leading-tight pr-4">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                                        className="text-[#64748b] hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 text-[9px] tracking-[0.1em] text-[#64748b] uppercase font-bold mb-4">
                                                    {item.size && <span>Size: {item.size}</span>}
                                                    {item.size && item.color && <span className="text-black/10">|</span>}
                                                    {item.color && <span>Color: {item.color}</span>}
                                                </div>

                                                <div className="mt-auto flex items-center justify-between">
                                                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-bold text-[#1A5276]">
                                                        ₦{(item.price * item.quantity).toLocaleString()}
                                                    </p>

                                                    <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-full px-2 py-1 border border-black/[0.05]">
                                                        <button
                                                            onClick={() => decreaseQuantity(item.id, item.size, item.color)}
                                                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all shadow-sm"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-[#1C1C1E] text-[12px] font-bold w-4 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => addItem(item)}
                                                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all shadow-sm"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-black/[0.05] bg-white">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#64748b] text-sm font-medium">Subtotal</span>
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl font-bold text-[#1A5276]">
                                        ₦{subtotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                                        <button className="w-full bg-[#F8FAFC] text-[#1A5276] border border-[#1A5276]/20 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-white hover:border-[#1A5276]">
                                            View Full Cart
                                        </button>
                                    </Link>
                                    <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                        <button className="w-full bg-[#1A5276] text-white py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360] hover:shadow-xl hover:shadow-blue-900/10 flex items-center justify-center gap-3">
                                            Checkout
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
