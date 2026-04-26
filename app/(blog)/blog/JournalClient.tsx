'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ARTICLES_PER_PAGE = 3;

export default function JournalClient({ articles = [] }: { articles: any[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

  // Helper to format Sanity dates nicely (e.g., "Oct 12, 2026")
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-20">
      
      {/* Banner */}
      <div className="bg-[#1A5276] px-8 py-16 md:px-16 md:pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex gap-2 items-center mb-5">
            <Link href="/" className="text-[11px] text-white/40 font-sans tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D4AF37]/40 text-[10px]">›</span>
            <span className="text-[11px] text-[#D4AF37]/70 font-sans tracking-widest uppercase">
              The Journal
            </span>
          </div>

          <span className="block mb-3 text-xs tracking-widest uppercase text-white/60">
            Editorial
          </span>
          <div className="w-12 h-[1px] bg-[#D4AF37] mb-4" />
          
          <h1 className="font-serif font-light text-4xl md:text-5xl lg:text-[4.5rem] text-white leading-[1.08] mb-4">
            Thoughts on Craft, <br />
            <em className="text-[#D4AF37] not-italic italic">Style & Identity.</em>
          </h1>
          
          <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-lg font-sans">
            Long-form perspectives on bespoke tailoring, corporate branding, and the heritage of African menswear by thevinonobrand.
          </p>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {currentArticles.length > 0 ? (
          currentArticles.map((a) => (
            <article key={a._id} className="mb-12 pb-12 border-b border-gray-900/10 last:border-b-0">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] block mb-3 font-sans">
                {a.category || 'Editorial'} · {formatDate(a.publishedAt)}
              </span>
              
              <Link href={`/blog/${a.slug}`} className="group">
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {a.title}
                </h2>
              </Link>
              
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
                {a.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-900/40 font-sans">
                  {a.readTime}
                </span>
                <Link href={`/blog/${a.slug}`}>
                  <button className="bg-transparent border-none text-gray-900 text-[11px] tracking-[0.1em] uppercase border-b border-gray-900 pb-[2px] cursor-pointer hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                    Read Article
                  </button>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 font-sans">
            No journal entries found.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border border-gray-900/20 bg-transparent cursor-pointer font-sans text-xs transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 font-sans text-xs text-gray-600">
              Page {page} of {totalPages}
            </span>
            
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border border-gray-900/20 bg-transparent cursor-pointer font-sans text-xs transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}