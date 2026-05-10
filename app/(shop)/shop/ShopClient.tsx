'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuickViewStore } from '@/store/useQuickViewStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import RecentlyViewed from '@/components/RecentlyViewed';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  tag?: string;
  cat?: string;
  desc?: string;
  src?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Dynamically extract unique categories from products array using a Set */
function extractCategories(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => {
    if (p.cat) set.add(p.cat);
  });
  return Array.from(set);
}

/** Capitalise a raw Sanity category value for display */
function formatCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    suits: 'Suits',
    corporate: 'Corporate', // Fallback for old data
    bespoke: 'Bespoke Suiting',
    kaftan: 'Kaftans',
    agbada: 'Agbada',
    hoodies: 'Hoodies',
    tees: 'Tees',
    polo: 'Polo',
    pants: 'Pants',
    jacket: 'Jackets',
    shirts: 'Shirts',
  };
  return map[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
}

/**
 * Round-Robin / Curated Mix interleaving.
 * Groups products by category then flattens one-from-each cyclically.
 * Fills the first PAGE_SIZE slots — remaining products are in original order.
 */
function curatedInterleave(products: Product[], limit: number): Product[] {
  if (products.length === 0) return [];

  const groups = new Map<string, Product[]>();
  products.forEach((p) => {
    const key = p.cat ?? '__none__';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });

  const buckets = Array.from(groups.values());
  const interleaved: Product[] = [];
  let idx = 0;

  while (interleaved.length < limit) {
    let added = false;
    for (const bucket of buckets) {
      if (idx < bucket.length && interleaved.length < limit) {
        interleaved.push(bucket[idx]);
        added = true;
      }
    }
    if (!added) break;
    idx++;
  }

  // Append remaining products (not already in interleaved) in original order
  const interleavedIds = new Set(interleaved.map((p) => p._id));
  const rest = products.filter((p) => !interleavedIds.has(p._id));

  return [...interleaved, ...rest];
}

const getTagColor = (tag: string) => {
  switch (tag?.toUpperCase()) {
    case 'LIMITED': return '#C0392B';
    default: return '#1A5276';
  }
};

const PAGE_SIZE = 12;

/** #10 — Trigger a subtle haptic pulse on supported mobile browsers */
function haptic(ms = 10) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(ms);
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShopClient({ initialProducts = [] }: { initialProducts: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL params for SEO-friendly state
  const urlCategory = searchParams?.get('category') ?? 'all';
  const urlSearch = searchParams?.get('search') ?? '';
  const urlPage = parseInt(searchParams?.get('page') ?? '1', 10);

  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [sortOrder, setSortOrder] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(urlPage * PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterVersion, setFilterVersion] = useState(0); // triggers fade animation

  // Dynamic categories derived from product data
  const dynamicCategories = useMemo(() => extractCategories(initialProducts), [initialProducts]);

  // ── Update URL when filters change ──────────────────────────────────────
  const syncUrl = useCallback(
    (cat: string, search: string, page: number) => {
      const params = new URLSearchParams();
      if (cat !== 'all') params.set('category', cat);
      if (search) params.set('search', search);
      if (page > 1) params.set('page', String(page));
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    },
    [router, pathname]
  );

  const handleCategoryChange = (cat: string) => {
    haptic();
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setFilterVersion((v) => v + 1);
    syncUrl(cat, searchQuery, 1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(PAGE_SIZE);
    setFilterVersion((v) => v + 1);
    syncUrl(activeCategory, val, 1);
  };

  const handleLoadMore = () => {
    const nextCount = visibleCount + PAGE_SIZE;
    setVisibleCount(nextCount);
    const nextPage = Math.ceil(nextCount / PAGE_SIZE);
    syncUrl(activeCategory, searchQuery, nextPage);
  };

  // ── Filter & Sort ────────────────────────────────────────────────────────
  const filteredAndSorted = useMemo(() => {
    let result = initialProducts.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.cat === activeCategory;
      const matchesSearch =
        !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cat?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (sortOrder === 'price_asc') result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortOrder === 'price_desc') result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else {
      // "featured" → use curated interleave only when viewing all products
      if (activeCategory === 'all' && !searchQuery) {
        result = curatedInterleave(result, PAGE_SIZE);
      }
    }

    return result;
  }, [initialProducts, activeCategory, searchQuery, sortOrder]);

  const visibleProducts = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <main className="bg-[#F8FAFC] min-h-screen relative overflow-x-hidden">

      {/* Background atmosphere */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(26,82,118,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26,82,118,0.12) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-20 pt-[clamp(120px,15vh,180px)]">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,5vw,4rem)]">
          <div className="max-w-[1440px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex gap-2.5 items-center mb-6">
              <Link href="/" className="text-[10px] text-[#64748b] font-sans tracking-[0.15em] uppercase no-underline hover:text-[#1A5276] transition-colors">
                Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-[#1A5276]/30" />
              <span className="text-[10px] text-[#1A5276] font-sans tracking-[0.15em] uppercase font-semibold">
                The Shop
              </span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#1C1C1E] font-bold inline-block border border-black/10 rounded-full px-4 py-2 mb-5">
                Boutique Collection
              </span>
              <h1
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="font-bold text-[clamp(2.2rem,5vw,4rem)] text-[#1C1C1E] leading-[1.05] mb-5 tracking-[-0.04em]"
              >
                The Collection.<br />
                <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Made to Measure.</em>
              </h1>
              <p className="text-[#64748b] text-[clamp(14px,1.2vw,16px)] font-light leading-[1.8] max-w-[520px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Every piece is engineered to order. Heritage craftsmanship meets modern silhouettes — garments that project authority and timeless style.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Offer Strip ───────────────────────────────────────────────── */}
        <div className="bg-white border-y border-black/5 py-3 px-[clamp(1rem,5vw,4rem)] flex items-center justify-center gap-6">
          <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(0.9rem,1.1vw,1.1rem)] italic text-[#1A5276]">
            Exclusive Heritage Fabrics Now in Stock
          </span>
          <div className="h-3 w-[1px] bg-[#1A5276]/20 hidden md:block" />
          <span className="text-[9px] tracking-[0.2em] text-[#64748b] font-sans uppercase font-bold hidden md:block">
            Complimentary Fitting on All Commissions
          </span>
        </div>

        {/* ── Main Layout: Sidebar + Grid ───────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-[clamp(1rem,5vw,4rem)] pt-[clamp(2rem,5vw,3rem)] pb-32">

          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#64748b] font-sans">
              {filteredAndSorted.length} pieces
            </span>
            <button
              id="mobile-filter-toggle"
              onClick={() => { haptic(8); setMobileFiltersOpen((o) => !o); }}
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold text-[#1A5276] border border-[#1A5276]/30 px-4 py-2.5 rounded-full hover:bg-[#1A5276] hover:text-white transition-all duration-300"
            >
              <SlidersHorizontal size={13} />
              {mobileFiltersOpen ? 'Close' : 'Filters'}
            </button>
          </div>

          <div className="flex gap-[clamp(1.5rem,4vw,4rem)] items-start">

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside
              className={`
                ${mobileFiltersOpen ? 'flex' : 'hidden'} lg:flex
                flex-col gap-8
                w-full lg:w-[220px] xl:w-[240px] flex-shrink-0
                sticky top-[120px]
              `}
            >
              {/* Search Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.2em] uppercase text-[#94a3b8] font-sans font-bold">
                  Search
                </label>
                <div className="relative group/search">
                  <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within/search:text-[#1A5276] transition-colors pointer-events-none" />
                  <input
                    id="shop-search"
                    type="text"
                    placeholder="Search the Collection"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-transparent pl-6 pr-6 py-2.5 text-[12px] text-[#1C1C1E] font-sans tracking-wide focus:outline-none border-b border-[#1A5276]/30 focus:border-[#1A5276] transition-all duration-300 placeholder:text-[#94a3b8]"
                    style={{
                      boxShadow: 'none',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1A5276] transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter List */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] tracking-[0.2em] uppercase text-[#94a3b8] font-sans font-bold mb-2">
                  Categories
                </label>

                {/* "All Pieces" option */}
                <CategoryItem
                  label="All Pieces"
                  isActive={activeCategory === 'all'}
                  onClick={() => handleCategoryChange('all')}
                  count={initialProducts.length}
                />

                {/* Dynamic categories derived from product data */}
                {dynamicCategories.map((cat) => {
                  const count = initialProducts.filter((p) => p.cat === cat).length;
                  return (
                    <CategoryItem
                      key={cat}
                      label={formatCategoryLabel(cat)}
                      isActive={activeCategory === cat}
                      onClick={() => handleCategoryChange(cat)}
                      count={count}
                    />
                  );
                })}
              </div>

              {/* Sort */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] tracking-[0.2em] uppercase text-[#94a3b8] font-sans font-bold">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    id="shop-sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                    className="w-full bg-transparent border-b border-[#1A5276]/30 py-2.5 text-[12px] text-[#1C1C1E] font-sans tracking-wide focus:outline-none focus:border-[#1A5276] cursor-pointer appearance-none transition-all pr-6"
                  >
                    <option value="featured">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>

              {/* Result count */}
              <p className="text-[10px] text-[#94a3b8] font-sans tracking-widest uppercase hidden lg:block">
                {filteredAndSorted.length} piece{filteredAndSorted.length !== 1 ? 's' : ''} found
              </p>
            </aside>

            {/* ── Product Grid ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Search result indicator */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-5 flex items-center gap-3"
                  >
                    <span className="text-[10px] text-[#64748b] uppercase tracking-[0.2em]">Results for:</span>
                    <span className="text-[10px] text-[#1A5276] uppercase tracking-[0.2em] font-bold">"{searchQuery}"</span>
                    <button
                      onClick={() => handleSearchChange('')}
                      className="text-[10px] text-[#94a3b8] hover:text-[#1A5276] transition-colors uppercase tracking-[0.2em]"
                    >
                      (Clear)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Grid */}
              {filteredAndSorted.length > 0 ? (
                <>
                  {/* Using filterVersion as key forces re-mount → fade-in on filter change */}
                  <motion.div
                    key={filterVersion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[clamp(1rem,2.5vw,2rem)]"
                  >
                    {visibleProducts.map((product, i) => (
                      <ProductCard key={product._id} product={product} index={i} />
                    ))}
                  </motion.div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="mt-14 flex flex-col items-center gap-3">
                      <button
                        id="shop-load-more"
                        onClick={handleLoadMore}
                        className="relative group px-10 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-bold text-[#1A5276] transition-all duration-300 hover:text-white overflow-hidden"
                        style={{
                          background: 'rgba(248,250,252,0.6)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid #D4AF37',
                          boxShadow: '0 4px 24px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
                        }}
                      >
                        <span className="relative z-10">
                          Load More — {filteredAndSorted.length - visibleCount} remaining
                        </span>
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #1A5276, #2980B9)' }}
                        />
                      </button>
                      <span className="text-[9px] tracking-[0.15em] text-[#94a3b8] uppercase">
                        Showing {visibleCount} of {filteredAndSorted.length}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24 text-[#94a3b8] font-sans tracking-widest text-sm uppercase">
                  No products found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed />
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryItem({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between py-2.5 px-0 text-left w-full transition-colors duration-200 relative"
    >
      {/* Gold active indicator */}
      {isActive && (
        <motion.div
          layoutId="cat-indicator"
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
          style={{ background: '#D4AF37' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span
        className="pl-3 text-[11px] font-sans tracking-[0.08em] transition-colors duration-200"
        style={{
          color: isActive ? '#1A5276' : '#64748b',
          fontWeight: isActive ? 700 : 500,
        }}
      >
        {label}
      </span>
      <span
        className="text-[9px] font-sans tabular-nums transition-colors duration-200"
        style={{ color: isActive ? '#D4AF37' : '#94a3b8' }}
      >
        {count}
      </span>
      {/* Sky blue hover glow */}
      {!isActive && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm pointer-events-none"
          style={{ background: 'rgba(133,193,233,0.08)' }}
        />
      )}
    </button>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { convert } = useCurrencyStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
      className="group h-full relative"
    >
      <div className="bg-white shadow-xl rounded-[24px] overflow-hidden h-full flex flex-col border border-black/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_48px_rgba(26,82,118,0.12)] hover:-translate-y-2 hover:border-[#1A5276]/20 relative">

        {/* 1. Link wraps content natively — no z-index hacks */}
        <Link
          href={`/shop/product/${product.slug}`}
          className="flex flex-col h-full w-full no-underline text-inherit"
          aria-label={`View ${product.name}`}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-black/10">
            {product.src && (
              <Image
                src={product.src}
                alt={`${product.name} — Vee Clothing Company`}
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-90 group-hover:scale-105 group-hover:brightness-100"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            )}

            {/* Dark hover overlay — visual only, no interactive children */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] pointer-events-none" />

            {/* Tag badge */}
            {product.tag && (
              <div
                className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10 pointer-events-none"
                style={{ background: `${getTagColor(product.tag)}bb` }}
              >
                <span className="text-[8px] tracking-[0.2em] font-extrabold text-white font-sans uppercase">
                  {product.tag}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex-1 flex flex-col gap-3">
            <div>
              <h3
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-[1.05rem] font-bold text-[#1C1C1E] mb-1 leading-[1.3] tracking-[-0.02em]"
              >
                {product.name}
              </h3>
              <p className="font-sans text-[12px] text-[#64748b] leading-[1.6] font-light line-clamp-2">
                {product.desc}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-2.5">
              <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.05rem] text-[#1A5276] font-bold">
                {convert(product.price ?? 0).symbol}{(convert(product.price ?? 0).value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <div className="w-8 h-8 rounded-full border border-[#1A5276]/30 flex items-center justify-center text-[#1A5276] bg-[#F8FAFC] transition-all duration-300 group-hover:bg-[#1A5276] group-hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* 2. Quick Add — direct sibling to Link, NOT nested inside it */}
        <button
          className="absolute top-[28%] left-1/2 -translate-x-1/2 z-20 bg-white/95 text-[#1A5276] px-6 py-3 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-[#1A5276] hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            useQuickViewStore.getState().openQuickView(product);
          }}
        >
          Quick Add
        </button>

      </div>
    </motion.div>
  );
}