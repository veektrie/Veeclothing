'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartBadge() {
    const items = useCartStore((state) => state.items);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration errors because Zustand uses localStorage
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculate the total number of items (sums up the quantities)
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const setIsOpen = useCartStore((state) => state.setIsOpen);

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] transition-colors"
            title="View Commission"
        >
            <ShoppingBag className="w-6 h-6" />

            {/* The Notification Badge */}
            <AnimatePresence>
                {isMounted && totalItems > 0 && (
                    <motion.span
                        // The 'key' tells Framer Motion to re-animate every time the total changes
                        key={totalItems}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-extrabold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md shadow-[#D4AF37]/20"
                    >
                        {totalItems}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}