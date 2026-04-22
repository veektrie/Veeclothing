'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { products, Category, tagColor } from './data';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all',         label: 'All Pieces'       },
  { key: 'corporate',  label: 'Corporate'         },
  { key: 'bespoke',    label: 'Bespoke Suiting'  },
  { key: 'kaftan',     label: 'Kaftans & Agbada'  },
  { key: 'accessories', label: 'Accessories'      },
];

export default function ShopPage() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);

  return (
    <main style={{ background: '#08101A', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Background Atmosphere ── */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.12) 0%, transparent 50%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Subtle Grain Texture */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.04, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(120px, 15vh, 180px)' }}>

        {/* ── Shop Hero Banner ── */}
        <div style={{
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 4rem)',
          position: 'relative', 
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 24 }}>
              <Link href="/" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Home</Link>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(212,175,55,0.3)' }} />
              <span style={{ fontSize: 10, color: '#D4AF37', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>The Archive</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800, display: 'block', marginBottom: 16 }}>Boutique Collection</span>
              <div style={{ height: 1, width: 80, background: 'rgba(212,175,55,0.2)', marginBottom: 24 }} />
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif', 
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
                color: '#fff', 
                lineHeight: 1.05, 
                marginBottom: 20,
                letterSpacing: '-0.02em'
              }}>
                The Collection.<br />
                <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Made to Measure.</em>
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.5)', 
                fontSize: 'clamp(14px, 1.2vw, 16px)', 
                fontWeight: 300,
                lineHeight: 1.8, 
                maxWidth: 520, 
                fontFamily: 'Inter, sans-serif',
              }}>
                Every piece in our shop is engineered to order. We combine heritage craftsmanship with modern silhouettes to create garments that project authority and timeless style.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Offer Strip (Glassmorphic) ── */}
        <div style={{
          background: 'rgba(212,175,55,0.05)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          padding: '12px clamp(1rem, 5vw, 4rem)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 24,
        }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', 
            fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
            fontStyle: 'italic', 
            color: '#D4AF37',
            fontWeight: 400
          }}>
            Exclusive Heritage Fabrics Now in Stock
          </span>
          <div style={{ height: 12, width: 1, background: 'rgba(212,175,55,0.2)', display: 'none' }} className="md:block" />
          <span style={{
            fontSize: 9, 
            letterSpacing: '0.2em', 
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Inter, sans-serif', 
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'none'
          }} className="md:block">Complimentary Fitting on All Commissions</span>
        </div>

        {/* ── Filter & Search Bar ── */}
        <div style={{ 
          maxWidth: 1440, 
          margin: '0 auto', 
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 4rem) 0' 
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            overflowX: 'auto', 
            paddingBottom: 15,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }} className="hide-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                style={{
                  padding: '12px 24px', 
                  fontSize: 10, 
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: active === c.key ? 800 : 600,
                  background: active === c.key ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  color: active === c.key ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                  border: '1px solid',
                  borderColor: active === c.key ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)',
                  borderRadius: 100,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Grid (Glassmorphic) ── */}
        <div style={{ 
          maxWidth: 1440, 
          margin: '0 auto', 
          padding: 'clamp(1rem, 3vw, 2.5rem) clamp(1rem, 5vw, 4rem) 8rem' 
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
          }}>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i % 4 * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/shop/product/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      borderRadius: 24,
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 60px rgba(0,0,0,0.4)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    {/* Image Container */}
                    <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                      <Image
                        src={product.src}
                        alt={`${product.name} — Vee Clothing Company`}
                        fill className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)', filter: 'brightness(0.9)' }}
                      />
                      {product.tag && (
                        <div style={{
                          position: 'absolute', top: 20, left: 20,
                          padding: '6px 14px',
                          borderRadius: 8,
                          backdropFilter: 'blur(10px)',
                          background: tagColor(product.tag) ? `${tagColor(product.tag)}bb` : 'rgba(26,82,118,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          zIndex: 2
                        }}>
                          <span style={{
                            fontSize: 8, letterSpacing: '0.2em', fontWeight: 800,
                            color: '#fff',
                            fontFamily: 'Inter, sans-serif',
                            textTransform: 'uppercase'
                          }}>{product.tag}</span>
                        </div>
                      )}
                    </div>

                    {/* Details Container */}
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
                          fontWeight: 400, color: '#fff', marginBottom: 4,
                          lineHeight: 1.2
                        }}>{product.name}</h3>
                        <p style={{
                          fontFamily: 'Inter, sans-serif', fontSize: 13,
                          color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300,
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                        }}>{product.desc}</p>
                      </div>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                        <span style={{
                          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
                          color: '#D4AF37', fontWeight: 600,
                        }}>{product.price}</span>
                        
                        <div style={{ 
                          width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37',
                          transition: 'all 0.3s ease', background: 'rgba(212,175,55,0.05)'
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
