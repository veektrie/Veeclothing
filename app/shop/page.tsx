'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Category = 'all' | 'corporate' | 'bespoke' | 'kaftan' | 'accessories';

const products = [
  { id: 1, name: 'The Executive Blazer',       price: '₦85,000',   cat: 'corporate', src: '/cop01.jpg',    tag: 'BESTSELLER', desc: 'Structured authority. Engineered for the boardroom.' },
  { id: 2, name: 'The Boardroom Suit',          price: '₦145,000',  cat: 'bespoke',   src: '/suit01.jpg',   tag: 'SIGNATURE',  desc: 'Two-piece. Full canvas. Hand-finished lapels.' },
  { id: 3, name: 'Premium Kaftan — Grand Boubou', price: '₦120,000', cat: 'kaftan',  src: '/kaftan01.jpg', tag: 'NEW',        desc: 'Flowing silhouette. Premium damask fabric.' },
  { id: 4, name: 'Corporate Uniform Set',       price: 'From ₦45,000 / staff', cat: 'corporate', src: '/cop02.png', tag: 'CORPORATE', desc: 'Minimum 5 units. Brand alignment guaranteed.' },
  { id: 5, name: 'Agbada — Full Set',           price: '₦180,000',  cat: 'bespoke',   src: '/kaftan02.jpg', tag: 'BESPOKE',   desc: 'Three-piece. Aso-oke or Damask. Commission only.' },
  { id: 6, name: 'The Senator Kaftan',          price: '₦65,000',   cat: 'kaftan',    src: '/kaftan05.jpg', tag: null,         desc: 'Clean lines. Premium linen. Ready in 2 weeks.' },
  { id: 7, name: 'Executive Shirt — Embroidered', price: '₦38,000', cat: 'bespoke',   src: '/cop04.png',   tag: null,         desc: 'Bespoke embroidery on premium cotton poplin.' },
  { id: 8, name: 'Staff Polo — Branded',        price: 'From ₦15,000 / unit', cat: 'corporate', src: '/cop05.jpg', tag: null,  desc: 'Bulk production. Custom colours and logo.' },
  { id: 9, name: 'Luxury Suit — Linen',         price: '₦130,000',  cat: 'bespoke',   src: '/suit02.png',  tag: 'LIMITED',   desc: 'Italian linen. Two-button slim. Summer edition.' },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all',         label: 'All Pieces'       },
  { key: 'corporate',  label: 'Corporate'         },
  { key: 'bespoke',    label: 'Bespoke Suiting'  },
  { key: 'kaftan',     label: 'Kaftans & Agbada'  },
  { key: 'accessories', label: 'Accessories'      },
];

const tagColor = (tag: string | null) => {
  if (!tag) return null;
  const map: Record<string, string> = {
    BESTSELLER: '#D4AF37', SIGNATURE: '#1A5276', NEW: '#27AE60',
    CORPORATE: '#2980B9', BESPOKE: '#8E44AD', LIMITED: '#C0392B',
  };
  return map[tag] ?? '#1A5276';
};

export default function ShopPage() {
  const [active, setActive] = useState<Category>('all');
  const [inquiry, setInquiry] = useState<number | null>(null);

  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 80 }}>

        {/* ── Shop Hero Banner ── */}
        <div style={{
          background: 'var(--navy)', padding: '4rem 4rem 3rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: '-200px', right: '-100px',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
              <Link href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>Home</Link>
              <span style={{ color: 'rgba(212,175,55,0.4)', fontSize: 10 }}>›</span>
              <span style={{ fontSize: 11, color: 'rgba(212,175,55,0.7)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>The Shop</span>
            </div>
            <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>Vee Clothing Company</span>
            <div className="gold-divider" style={{ marginBottom: 16 }} />
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#fff', lineHeight: 1.08, marginBottom: 14,
            }}>
              The Collection.<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Made to Order. Built to Last.</em>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 300,
              lineHeight: 1.7, maxWidth: 480, fontFamily: 'Inter, sans-serif',
            }}>
              Every garment is commissioned to your exact measurements. No off-the-shelf. No compromise.
            </p>
          </div>
        </div>

        {/* ── Offer Banner ── */}
        <div style={{
          background: '#D4AF37', padding: '0.9rem 4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
        }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem',
            fontStyle: 'italic', color: 'var(--charcoal)',
          }}>
            New Season — Executive Essentials Now Available
          </span>
          <span style={{
            fontSize: 9, letterSpacing: '0.25em', color: 'rgba(28,28,30,0.6)',
            fontFamily: 'Inter, sans-serif', textTransform: 'uppercase',
          }}>· Free Fitting Consultation with Every Commission</span>
        </div>

        {/* ── Category Filter ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '3rem 4rem 0' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                style={{
                  padding: '9px 22px', fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  background: active === c.key ? 'var(--navy)' : 'transparent',
                  color: active === c.key ? '#fff' : 'rgba(28,28,30,0.5)',
                  border: active === c.key ? '1px solid var(--navy)' : '1px solid rgba(28,28,30,0.2)',
                  transition: 'all 0.3s ease',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '2.5rem 4rem 6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(28,28,30,0.08)',
                  transition: 'all 0.35s ease',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,82,118,0.1)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,28,30,0.08)';
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                  <Image
                    src={product.src}
                    alt={`${product.name} — Vee Clothing Company`}
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ transition: 'transform 0.6s ease' }}
                  />
                  {product.tag && (
                    <div style={{
                      position: 'absolute', top: 14, left: 14,
                      padding: '4px 10px',
                      background: tagColor(product.tag) ?? '#1A5276',
                    }}>
                      <span style={{
                        fontSize: 8, letterSpacing: '0.2em', fontWeight: 600,
                        color: product.tag === 'BESTSELLER' ? 'var(--charcoal)' : '#fff',
                        fontFamily: 'Inter, sans-serif',
                      }}>{product.tag}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: '1.5rem' }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
                    fontWeight: 400, color: 'var(--charcoal)', marginBottom: 6,
                  }}>{product.name}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12,
                    color: 'var(--stone)', lineHeight: 1.6, marginBottom: 14,
                  }}>{product.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem',
                      color: '#D4AF37', fontWeight: 500,
                    }}>{product.price}</span>
                    <button
                      onClick={() => setInquiry(product.id)}
                      style={{
                        padding: '8px 18px', fontSize: 9, letterSpacing: '0.2em',
                        textTransform: 'uppercase', cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif', fontWeight: 500,
                        background: 'transparent',
                        color: 'var(--navy)',
                        border: '1px solid rgba(26,82,118,0.4)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--navy)'; }}
                    >
                      Commission
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Commission Inquiry Overlay ── */}
        {inquiry !== null && (
          <div
            onClick={() => setInquiry(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(28,28,30,0.75)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(26,82,118,0.95)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.25)',
                padding: '3rem', maxWidth: 480, width: '100%',
              }}
            >
              <p className="section-label" style={{ marginBottom: 12 }}>Commission Request</p>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
                color: '#fff', fontWeight: 300, marginBottom: 8,
              }}>
                {products.find(p => p.id === inquiry)?.name}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
                To commission this piece, please reach out via WhatsApp or complete our consultation form. We&apos;ll respond within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/2348103031020?text=I'd like to commission: ${products.find(p => p.id === inquiry)?.name}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                    background: '#D4AF37', color: 'var(--charcoal)',
                    textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                  }}
                >
                  WhatsApp Us
                </a>
                <Link href="/#consultation">
                  <button style={{
                    padding: '12px 24px',
                    border: '1px solid rgba(212,175,55,0.4)', background: 'transparent',
                    color: '#D4AF37', fontFamily: 'Inter, sans-serif',
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}>
                    Consultation Form
                  </button>
                </Link>
              </div>
              <button
                onClick={() => setInquiry(null)}
                style={{
                  position: 'absolute', top: 16, right: 16, background: 'none',
                  border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 18,
                  cursor: 'pointer', lineHeight: 1,
                }}
              >×</button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
