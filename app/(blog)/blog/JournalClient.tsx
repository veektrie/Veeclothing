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
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Hero Banner */}
      <div style={{ background: '#1A5276', padding: '140px 32px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Home</span>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>›</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>The Journal</span>
          </div>

          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'white', margin: '0 auto 20px', maxWidth: 700, textAlign: 'center' }}>
            Thoughts on Craft,<br />
            <em style={{ color: 'white', fontStyle: 'normal' }}>Style & Identity.</em>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480, lineHeight: 1.7, margin: '0 auto', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            Long-form perspectives on bespoke tailoring, corporate branding, and the heritage of African menswear.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        {current.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {current.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${a.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ background: 'white', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(26,82,118,0.12)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,82,118,0.2)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.07)';
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', width: '100%', height: 200, background: '#EBF5FB', overflow: 'hidden' }}>
                      {a.imageUrl ? (
                        <Image src={a.imageUrl} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #EBF5FB 0%, #D6EAF8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A5276" strokeWidth="1" opacity="0.3">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: 14, left: 14 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'white', color: '#1A5276', padding: '5px 12px', borderRadius: 999, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                          {a.category || 'Journal'}
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div style={{ padding: '24px 24px 28px' }}>
                      <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#1C1C1E', lineHeight: 1.4, marginBottom: 10, letterSpacing: '-0.01em' }}>
                        {a.title}
                      </h2>
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 20 }}>
                        {a.excerpt}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{formatDate(a.publishedAt)}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#1A5276', display: 'flex', alignItems: 'center', gap: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
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
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            No journal entries found.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 64 }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{ padding: '10px 24px', border: '1px solid rgba(26,82,118,0.2)', background: 'white', borderRadius: 999, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A5276' }}
            >
              ← Previous
            </button>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748b' }}>Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              style={{ padding: '10px 24px', border: '1px solid rgba(26,82,118,0.2)', background: 'white', borderRadius: 999, cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A5276' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}