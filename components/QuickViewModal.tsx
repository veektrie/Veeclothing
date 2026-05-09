'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';
import { useQuickViewStore } from '@/store/useQuickViewStore';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import toast from 'react-hot-toast';

export default function QuickViewModal() {
    const { isOpen, product, closeQuickView } = useQuickViewStore();
    const addItem = useCartStore((state) => state.addItem);
    const { convert } = useCurrencyStore();

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<any>(null);

    // Reset selection when product changes
    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes?.[0] || '');
            setSelectedColor(product.colors?.[0] || null);
        }
    }, [product]);

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup if component unmounts while open
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error('Please select a size first.');
            return;
        }
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error('Please select a color first.');
            return;
        }

        addItem({
            id: product._id || product.id, // handle both cases
            name: product.name || product.label, // handle ShopPreview's mapped name
            price: product.price,
            image: product.src,
            quantity: 1,
            size: selectedSize,
            color: selectedColor?.name,
        });

        toast.success(`${product.name || product.label} added to your commission.`);
        closeQuickView();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeQuickView}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                    >
                        <button
                            onClick={closeQuickView}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-black/60 hover:text-black rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left: Image */}
                        <div className="w-full md:w-1/2 relative bg-[#F8FAFC] min-h-[300px] md:min-h-full">
                            {product.src && (
                                <Image
                                    src={product.src}
                                    alt={product.name || product.label}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </div>

                        {/* Right: Details */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-[#1A5276] font-extrabold block mb-2">
                                {product.cat} Collection
                            </span>

                            <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="font-bold text-3xl text-[#1C1C1E] leading-[1.1] mb-2 tracking-[-0.02em]">
                                {product.name || product.label}
                            </h2>

                            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl text-[#1A5276] font-bold mb-6">
                                {product.price ? `${convert(product.price).symbol}${convert(product.price).value.toLocaleString()}` : 'Price on request'}
                            </p>

                            <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-[#64748b] leading-[1.6] font-light mb-8">
                                {product.desc}
                            </p>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">Color</span>
                                        <span className="font-sans text-[10px] text-[#64748b]">{selectedColor?.name}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color: any) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                    selectedColor?.name === color.name
                                                        ? 'ring-2 ring-offset-2 ring-[#1A5276] scale-110'
                                                        : 'ring-1 ring-black/10 hover:scale-110'
                                                }`}
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            >
                                                {selectedColor?.name === color.name && (
                                                    <Check className={`w-3 h-3 ${['#FFFFFF', '#FDFEFE', '#F1C40F'].includes(color.hex?.toUpperCase()) ? 'text-black' : 'text-white'}`} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1E] font-bold">Size</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size: string) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 font-sans text-[10px] tracking-[0.1em] uppercase font-bold rounded-lg border transition-all ${
                                                    selectedSize === size
                                                        ? 'bg-[#1A5276] border-[#1A5276] text-white'
                                                        : 'bg-white border-black/10 text-[#64748b] hover:border-[#1A5276]/30'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto pt-4 border-t border-black/5">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#1A5276] hover:bg-[#154360] text-white py-4 rounded-xl font-sans text-[11px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-3 transition-all"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
