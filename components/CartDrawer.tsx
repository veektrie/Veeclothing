'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Component ───────────────────────────────────────────────────────────────

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, addItem, decreaseQuantity, removeItem } = useCartStore();
    const { convert } = useCurrencyStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    if (!isMounted) return null;

    const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
    const itemCount = items.reduce((t, i) => t + i.quantity, 0);

    // ── Shared inner content ─────────────────────────────────────────────────
    const inner = (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/[0.05] flex-shrink-0">
                <div>
                    <h2
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        className="text-xl font-bold text-[#1C1C1E] leading-tight"
                    >
                        Your <span style={{ color: '#1A5276' }}>Selection.</span>
                    </h2>
                    {itemCount > 0 && (
                        <p className="text-[10px] text-[#94a3b8] tracking-[0.12em] uppercase mt-0.5"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            {itemCount} piece{itemCount !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                <button
                    id="cart-drawer-close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close cart"
                    className="p-2 text-[#64748b] hover:text-[#1A5276] hover:bg-[#F8FAFC] rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 bg-[#F8FAFC] overscroll-contain">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm border border-black/[0.05]">
                            <ShoppingBag className="w-7 h-7 text-[#1A5276]/20" />
                        </div>
                        <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[15px] font-bold text-[#1C1C1E] mb-1.5">
                            Cart is empty
                        </h3>
                        <p className="text-[#94a3b8] text-[12px] mb-7">
                            You haven't added any bespoke pieces yet.
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-[#1A5276] text-white px-7 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360]"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.size}-${item.color}`}
                                className="bg-white rounded-2xl border border-black/[0.05] p-4 flex gap-4 shadow-sm"
                            >
                                <div className="relative w-20 aspect-[4/5] rounded-xl overflow-hidden bg-[#F8FAFC] shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                                </div>
                                <div className="flex-1 flex flex-col min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[13px] font-bold text-[#1C1C1E] leading-tight pr-3 line-clamp-2">
                                            {item.name}
                                        </h4>
                                        <button
                                            onClick={() => removeItem(item.id, item.size, item.color)}
                                            aria-label={`Remove ${item.name}`}
                                            className="text-[#94a3b8] hover:text-red-400 transition-colors flex-shrink-0"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {item.size && (
                                            <span className="text-[9px] tracking-[0.12em] text-[#94a3b8] uppercase font-bold bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-black/[0.05]">
                                                {item.size}
                                            </span>
                                        )}
                                        {item.color && (
                                            <span className="text-[9px] tracking-[0.12em] text-[#94a3b8] uppercase font-bold bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-black/[0.05]">
                                                {item.color}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-[13px] font-bold text-[#1A5276]">
                                            {convert(item.price * item.quantity).symbol}{convert(item.price * item.quantity).value.toLocaleString()}
                                        </p>
                                        <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-full px-2 py-1 border border-black/[0.05]">
                                            <button onClick={() => decreaseQuantity(item.id, item.size, item.color)} aria-label="Decrease" className="w-5 h-5 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all">
                                                <Minus className="w-2.5 h-2.5" />
                                            </button>
                                            <span className="text-[#1C1C1E] text-[11px] font-bold w-4 text-center tabular-nums">{item.quantity}</span>
                                            <button onClick={() => addItem(item)} aria-label="Increase" className="w-5 h-5 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-white transition-all">
                                                <Plus className="w-2.5 h-2.5" />
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
                <div className="p-5 border-t border-black/[0.05] bg-white flex-shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[#64748b] text-[12px] font-medium">Subtotal</span>
                        <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg font-bold text-[#1A5276]">
                            {convert(subtotal).symbol}{convert(subtotal).value.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <Link href="/cart" onClick={() => setIsOpen(false)}>
                            <button className="w-full bg-[#F8FAFC] text-[#1A5276] border border-[#1A5276]/20 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-white hover:border-[#1A5276]">
                                View Full Cart
                            </button>
                        </Link>
                        <Link href="/checkout" onClick={() => setIsOpen(false)}>
                            <button className="w-full bg-[#1A5276] text-white py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#154360] hover:shadow-xl flex items-center justify-center gap-2.5">
                                Checkout <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-[2000]"
                    />

                    {/*
                     * Mobile bottom sheet — CSS only, no JS media-query detection.
                     * Shown below sm breakpoint. Slides up from bottom.
                     * Drag downward to dismiss.
                     */}
                    <motion.div
                        key="cart-mobile"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                        className="sm:hidden fixed bottom-0 left-0 right-0 z-[2001] flex flex-col bg-white rounded-t-[28px] shadow-2xl"
                        style={{ maxHeight: '92dvh' }}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={{ top: 0, bottom: 0.25 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 350) {
                                setIsOpen(false);
                            }
                        }}
                    >
                        {/* Drag handle pill */}
                        <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing flex-shrink-0" style={{ touchAction: 'none' }}>
                            <div className="w-10 h-1 rounded-full bg-black/10" />
                        </div>
                        {inner}
                    </motion.div>

                    {/*
                     * Desktop side drawer — shown at sm and above.
                     * Slides in from the right. No drag.
                     */}
                    <motion.div
                        key="cart-desktop"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                        className="hidden sm:flex fixed top-0 right-0 h-full w-full max-w-[420px] z-[2001] flex-col bg-white shadow-2xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                    >
                        {inner}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
