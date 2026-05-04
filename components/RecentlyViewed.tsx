'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import { useQuickViewStore } from '@/store/useQuickViewStore';

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
    const { items } = useRecentlyViewedStore();
    const openQuickView = useQuickViewStore((state) => state.openQuickView);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Filter out the current product being viewed
    const filteredItems = currentProductId 
        ? items.filter(item => (item._id || item.id) !== currentProductId)
        : items;

    if (filteredItems.length === 0) return null;

    return (
        <section className="py-20 border-t border-black/5 bg-[#F8FAFC]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)]">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl font-bold text-[#1C1C1E] mb-2">
                            Recently Viewed
                        </h2>
                        <p className="text-[#64748b] text-sm">Pick up where you left off.</p>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                    {filteredItems.slice(0, 4).map((item) => (
                        <div key={item._id || item.id} className="group relative">
                            <Link href={`/shop/product/${item.slug || item.id}`} className="block">
                                <div className="bg-white shadow-md rounded-[20px] overflow-hidden flex flex-col border border-black/[0.04] transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#1A5276]/20">
                                    <div className="relative aspect-[3/4] bg-black/5 overflow-hidden">
                                        {item.src && (
                                            <Image
                                                src={item.src}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                            />
                                        )}
                                        
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20 pointer-events-none">
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    openQuickView(item);
                                                }}
                                                className="pointer-events-auto bg-white/95 text-[#1A5276] px-6 py-3 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-[#1A5276] hover:text-white"
                                            >
                                                Quick Add
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[14px] font-bold text-[#1C1C1E] truncate mb-1">
                                            {item.name}
                                        </h3>
                                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-[#1A5276] font-bold text-sm">
                                            ₦{(item.price || 0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
