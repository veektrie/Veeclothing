'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  excerpt: string;
  readTime: string;
}

interface JournalProps {
  articles: Article[];
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const Journal = ({ articles }: JournalProps) => {
  return (
    <section id="journal" style={{ background: '#ffffff', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999,
            padding: '7px 16px', display: 'inline-block', marginBottom: 20,
          }}>
            The Journal
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#1C1C1E', margin: 0, maxWidth: 560,
            }}>
              Stories About <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Style & Craft</em>
            </h2>
            <Link href="/blog">
              <button
                style={{
                  background: '#1A5276', color: 'white', border: 'none',
                  padding: '12px 28px', borderRadius: 999, fontWeight: 700,
                  fontSize: 13, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', gap: 8, transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#154360'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1A5276'; }}
              >
                See All Posts
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* 3-Column Article Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {articles.length === 0 ? (
            // Skeleton placeholders when no articles
            [0, 1, 2].map(i => (
              <div key={i} style={{ background: '#F8FAFC', borderRadius: 20, overflow: 'hidden', height: 420 }} />
            ))
          ) : (
            articles.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${a.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{
                      background: 'white', borderRadius: 20,
                      border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(26,82,118,0.12)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,82,118,0.2)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.07)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Cover Image */}
                    <div style={{ position: 'relative', width: '100%', height: 220, background: '#F0F4F8', overflow: 'hidden' }}>
                      {a.imageUrl ? (
                        <Image
                          src={a.imageUrl}
                          alt={a.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          sizes="(max-width: 768px) 100vw, 400px"
                          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                        />
                      ) : (
                        // Placeholder when no image
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #EBF5FB 0%, #D6EAF8 100%)' }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A5276" strokeWidth="1" opacity="0.3">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      {/* Category pill overlaid on image */}
                      <div style={{ position: 'absolute', top: 14, left: 14 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                          textTransform: 'uppercase', background: 'white',
                          color: '#1A5276', padding: '5px 12px', borderRadius: 999,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}>
                          {a.category || 'Journal'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '24px 24px 28px' }}>
                      <h3 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.05rem', fontWeight: 700,
                        color: '#1C1C1E', lineHeight: 1.4,
                        marginBottom: 10, letterSpacing: '-0.01em',
                      }}>
                        {a.title}
                      </h3>
                      <p style={{
                        fontSize: 13, color: '#64748b', lineHeight: 1.65,
                        marginBottom: 20,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}>
                        {a.excerpt}
                      </p>

                      {/* Footer: date + read time */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
                          {formatDate(a.publishedAt)}
                        </span>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: '#1A5276',
                          display: 'flex', alignItems: 'center', gap: 5,
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {a.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Journal;
