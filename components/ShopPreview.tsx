'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const previews = [
  { src: '/suit01.jpg',   label: 'Executive Suits',   tag: 'SIGNATURE'  },
  { src: '/kaftan01.jpg', label: 'Premium Kaftans',   tag: 'BESTSELLER' },
  { src: '/cop01.jpg',    label: 'Corporate Blazers', tag: 'CORPORATE'  },
];

const ShopPreview = () => (
  <section
    id="collection"
    style={{
      background: 'var(--navy)',
      padding: 'clamp(4rem, 8vw, 7rem) 0',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Ambient glow */}
    <div style={{
      position: 'absolute', top: '-180px', right: '-180px',
      width: 700, height: 700,
      background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
      pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: '4rem', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>The Collection</span>
          <div className="gold-divider" style={{ marginBottom: 18 }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
            color: '#fff',
            lineHeight: 1.08,
          }}>
            Wear the Standard.<br />
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Shop the Collection.</em>
          </h2>
        </div>

        {/* Seasonal offer badge */}
        <div style={{
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.3)',
          backdropFilter: 'blur(10px)',
          padding: '1.2rem 1.8rem',
          maxWidth: 260,
        }}>
          <span style={{
            fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#D4AF37', display: 'block', marginBottom: 8,
            fontFamily: 'Inter, sans-serif',
          }}>
            New Season Offer
          </span>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem',
            color: '#fff', fontWeight: 300, lineHeight: 1.5, marginBottom: 10,
          }}>
            Executive Essentials — Now Available. Free fitting consultation with every order.
          </p>
          <span style={{ fontSize: 11, color: 'rgba(212,175,55,0.6)', fontFamily: 'Inter, sans-serif' }}>
            Limited availability
          </span>
        </div>
      </div>

      {/* Product preview grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {previews.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            style={{
              position: 'relative', overflow: 'hidden',
              aspectRatio: '3/4', cursor: 'pointer',
              border: '1px solid rgba(212,175,55,0.1)',
            }}
          >
            <Image
              src={item.src}
              alt={`${item.label} — Vee Clothing Company Shop`}
              fill className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ transition: 'transform 0.6s ease' }}
            />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(28,28,30,0.9) 0%, transparent 55%)',
            }} />
            {/* Tag */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              padding: '4px 10px',
              background: i === 1 ? '#D4AF37' : 'rgba(26,82,118,0.7)',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontSize: 8, letterSpacing: '0.25em',
                color: i === 1 ? 'var(--charcoal)' : '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
              }}>{item.tag}</span>
            </div>
            {/* Label */}
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
                fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: 8,
              }}>{item.label}</p>
              <Link href="/shop">
                <span style={{
                  fontSize: 9, letterSpacing: '0.2em', color: '#D4AF37',
                  textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  Shop Now
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <Link href="/shop">
          <button className="btn-solid-gold" style={{ padding: '16px 40px' }}>
            Enter The Shop
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </Link>
        <p style={{
          color: 'rgba(255,255,255,0.3)', fontSize: 12,
          fontFamily: 'Inter, sans-serif', fontWeight: 300,
        }}>
          Every piece is crafted to order · No off-the-shelf
        </p>
      </div>
    </div>
  </section>
);

export default ShopPreview;
