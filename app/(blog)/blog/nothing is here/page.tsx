'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const allArticles = [
  {
    id: 1,
    category: 'Craft & Heritage',
    title: 'The Anatomy of a Bespoke Suit: What Separates Artisanal from Average',
    excerpt: 'From the canvas chest piece to the hand-padded lapels — a deep dive into why bespoke tailoring is the ultimate investment piece for the discerning gentleman.',
    readTime: '7 min read',
    date: 'Oct 12, 2026',
  },
  {
    id: 2,
    category: 'Corporate Identity',
    title: 'Brand Cohesion in Modern Business: Why Your Team\'s Uniform is Your Handshake',
    excerpt: 'In high-stakes industries, the first impression your team makes is worn, not spoken. We explore how Nigeria\'s leading corporations are using apparel to signal authority.',
    readTime: '6 min read',
    date: 'Oct 05, 2026',
  },
  {
    id: 3,
    category: 'Sustainable Luxury',
    title: 'Sustainable Luxury in African Fashion: Quality Over Volume',
    excerpt: 'The future of African menswear is not fast fashion — it is intentional craftsmanship. Here is how Vee Clothing Company approaches sustainable luxury from Lagos.',
    readTime: '8 min read',
    date: 'Sep 28, 2026',
  },
  {
    id: 4,
    category: 'Style Guide',
    title: 'Navigating Wedding Season in Lagos: A Gentleman\'s Guide',
    excerpt: 'When to wear Agbada versus a Tuxedo. Decoding the unspoken rules of society weddings and dressing with quiet confidence.',
    readTime: '5 min read',
    date: 'Sep 15, 2026',
  },
  {
    id: 5,
    category: 'Culture',
    title: 'The Evolution of the Senator Style',
    excerpt: 'How a simple traditional garment became the de facto business casual uniform for Nigerian executives across the globe.',
    readTime: '4 min read',
    date: 'Sep 02, 2026',
  },
  {
    id: 6,
    category: 'Craft & Heritage',
    title: 'Understanding Luxury Fabrics: Wool, Linen, and Silk',
    excerpt: 'Selecting the right material is half the commission. A primer on thread counts, weaves, and selecting fabrics for the tropical climate.',
    readTime: '9 min read',
    date: 'Aug 20, 2026',
  },
];

const ARTICLES_PER_PAGE = 3;

export default function JournalPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const currentArticles = allArticles.slice(start, start + ARTICLES_PER_PAGE);

  return (
      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 80 }}>
        {/* Banner */}
        <div style={{
          background: 'var(--navy)', padding: '4rem 4rem 3rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
              <Link href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>Home</Link>
              <span style={{ color: 'rgba(212,175,55,0.4)', fontSize: 10 }}>›</span>
              <span style={{ fontSize: 11, color: 'rgba(212,175,55,0.7)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>The Journal</span>
            </div>
            <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>Editorial</span>
            <div className="gold-divider" style={{ marginBottom: 16 }} />
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#fff', lineHeight: 1.08, marginBottom: 14,
            }}>
              Thoughts on Craft, <br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Style & Identity.</em>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 300,
              lineHeight: 1.7, maxWidth: 480, fontFamily: 'Inter, sans-serif',
            }}>
              Long-form perspectives on bespoke tailoring, corporate branding, and the heritage of African menswear.
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 2rem' }}>
          {currentArticles.map(a => (
            <article key={a.id} style={{
              marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(28,28,30,0.1)'
            }}>
              <span style={{
                fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#D4AF37', display: 'block', marginBottom: 12, fontFamily: 'Inter, sans-serif'
              }}>
                {a.category} · {a.date}
              </span>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
                color: 'var(--charcoal)', marginBottom: 16, lineHeight: 1.2
              }}>
                {a.title}
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--stone)',
                lineHeight: 1.7, marginBottom: 20
              }}>
                {a.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'rgba(28,28,30,0.4)', fontFamily: 'Inter, sans-serif' }}>{a.readTime}</span>
                <button style={{
                  background: 'none', border: 'none', color: 'var(--navy)',
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  borderBottom: '1px solid var(--navy)', paddingBottom: 2, cursor: 'pointer'
                }}>Read Article</button>
              </div>
            </article>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: '2rem' }}>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                style={{
                  padding: '8px 16px', border: '1px solid rgba(28,28,30,0.2)',
                  background: 'transparent', cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.4 : 1, fontFamily: 'Inter, sans-serif', fontSize: 12
                }}
              >
                Previous
              </button>
              <span style={{ padding: '8px 16px', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                style={{
                  padding: '8px 16px', border: '1px solid rgba(28,28,30,0.2)',
                  background: 'transparent', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  opacity: page === totalPages ? 0.4 : 1, fontFamily: 'Inter, sans-serif', fontSize: 12
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
  );
}
