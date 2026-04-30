'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ARTICLES_PER_PAGE = 6;

function formatDate(dateString: string) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function JournalClient({ articles = [] }: { articles: any[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const current = articles.slice(start, start + ARTICLES_PER_PAGE);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      {/* Hero Banner */}
      <div className="bg-navy pt-[120px] md:pt-[140px] pb-16 md:pb-20 px-6 md:px-8 text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Link href="/" className="text-[10px] text-white/40 font-inter tracking-[0.15em] uppercase hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20 text-xs">›</span>
            <span className="text-[10px] text-white/70 font-inter tracking-[0.15em] uppercase font-bold">The Journal</span>
          </div>

          <h1 className="font-inter text-[clamp(2rem,7vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] text-white mb-6 max-w-4xl mx-auto">
            Thoughts on Craft,<br className="hidden sm:block" />
            <span className="text-white opacity-90">Style & Identity.</span>
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-[480px] leading-relaxed mx-auto font-inter">
            Long-form perspectives on bespoke tailoring, corporate branding, and the heritage of African menswear.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-20">
        {current.length > 0 ? (
          <div className="blog-listing-grid">
            {current.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${a.slug}`} className="group block no-underline">
                  <div className="bg-white rounded-[24px] border border-black/5 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(26,82,118,0.15)] hover:-translate-y-1 hover:border-navy/10">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] bg-blue-50 overflow-hidden">
                      {a.imageUrl ? (
                        <Image 
                          src={a.imageUrl} 
                          alt={a.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A5276" strokeWidth="1" className="opacity-20">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-navy px-3 py-1.5 rounded-full shadow-sm">
                          {a.category || 'Journal'}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8">
                      <h2 className="font-inter text-lg md:text-xl font-bold text-[#1C1C1E] leading-tight mb-3 group-hover:text-navy transition-colors">
                        {a.title}
                      </h2>
                      <p className="text-[13px] md:text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                        {a.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-black/[0.03]">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{formatDate(a.publishedAt)}</span>
                        <span className="text-[10px] font-bold text-navy flex items-center gap-1.5 uppercase tracking-widest">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          {a.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-inter italic">
            The archive is currently being curated.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-16 md:mt-24">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`p-3.5 md:px-8 rounded-full border border-navy/10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                ${page === 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white text-navy hover:bg-navy hover:text-white shadow-lg shadow-navy/5 active:scale-95'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="hidden sm:inline">Prev</span>
            </button>
            
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              {page} <span className="mx-1.5 md:mx-2 opacity-30">/</span> {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`p-3.5 md:px-8 rounded-full border border-navy/10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                ${page === totalPages ? 'opacity-30 cursor-not-allowed' : 'bg-white text-navy hover:bg-navy hover:text-white shadow-lg shadow-navy/5 active:scale-95'}`}
            >
              <span className="hidden sm:inline">Next</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}

      </div>
    </main>
  );
}