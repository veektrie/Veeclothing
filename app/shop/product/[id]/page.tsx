'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products, Product } from '../../data';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');

  if (!product) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfbf9' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>Product not found</h1>
        <Link href="/shop" style={{ marginLeft: 20, color: '#D4AF37' }}>Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.cat === product.cat && p.id !== product.id)
    .slice(0, 4);

  return (
    <main style={{ background: '#08101A', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Background Atmosphere (Hero Style) ── */}
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

      <section style={{ padding: 'clamp(100px, 15vh, 160px) 4vw 80px', maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 'clamp(30px, 5vh, 50px)', fontFamily: 'Inter, sans-serif' }}>
          <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>The Archive</Link>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ color: '#D4AF37' }}>{product.name}</span>
        </div>

        {/* ── UNIFIED GRAND COMMISSION CARD ── */}
        <motion.div 
          className="flex flex-col lg:grid lg:grid-cols-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderRadius: 'clamp(32px, 5vw, 64px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 'clamp(2rem, 6vw, 6rem)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: '0 50px 150px -30px rgba(0,0,0,0.7)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Glow inside Card */}
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', zIndex: 0 }} />

          {/* Left Column: Product Story (Grid Span 4) */}
          <div className="lg:col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: 40, zIndex: 2, order: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800 }}>Vee Atelier</span>
                <div style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.2)' }} />
              </div>
              <h1 style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: 'clamp(2.5rem, 4vw, 4rem)', 
                lineHeight: 1.05, 
                fontWeight: 300, 
                marginBottom: 20,
                letterSpacing: '-0.01em',
                color: '#fff'
              }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontFamily: 'Inter, sans-serif', color: '#D4AF37', fontWeight: 600, letterSpacing: '0.05em' }}>
                {product.price}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Engineering & Soul</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                {product.longDesc || product.desc}
              </p>
            </div>

            {/* Feature chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {product.features?.map((f, i) => (
                <div key={i} style={{ 
                  padding: '10px 18px', borderRadius: '999px', background: 'rgba(212,175,55,0.05)', 
                  border: '1px solid rgba(212,175,55,0.1)', fontSize: 9, letterSpacing: '0.15em', 
                  textTransform: 'uppercase', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37' }} />
                  {f.title}
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: 3D Image Showcase (Grid Span 5) */}
          <div className="lg:col-span-5" style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 2,
            order: 2,
            minHeight: '400px'
          }}>
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{ 
                width: '100%', 
                height: '100%', 
                minHeight: '400px',
                position: 'relative', 
                perspective: 1000 
              }}
            >
              {/* Internal Halo */}
              <div style={{ position: 'absolute', inset: '5%', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
              
              <Image 
                src={product.src} 
                alt={product.name} 
                fill 
                className="object-contain" 
                sizes="(max-width: 1200px) 50vw, 40vw"
                priority
                style={{ 
                  filter: 'drop-shadow(0 50px 100px rgba(0,0,0,0.6))', 
                  zIndex: 1,
                  padding: '20px'
                }}
              />
            </motion.div>
          </div>

          {/* Right Column: Customization (Grid Span 3) */}
          <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-5" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 40, 
            zIndex: 2,
            order: 3
          }}>
            {/* Sizing Section */}
            <div>
              <h3 style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 800, marginBottom: 25 }}>
                {['bespoke', 'kaftan'].includes(product.cat) ? 'Sizing Protocol' : 'Select Size'}
              </h3>

              {['bespoke', 'kaftan'].includes(product.cat) ? (
                <div style={{ 
                  padding: '24px', borderRadius: 24, background: 'rgba(212,175,55,0.03)', 
                  border: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column', gap: 15 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#D4AF37' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Bespoke Service</span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                    Crafted to your exact specifications. A consultant will contact you post-purchase for measurements.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {product.sizes?.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '16px 0', borderRadius: 100, border: '1px solid',
                        borderColor: selectedSize === size ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                        background: selectedSize === size ? '#D4AF37' : 'transparent',
                        color: selectedSize === size ? '#000' : '#fff',
                        fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.4s ease'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Palette */}
            <div>
              <h3 style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 800, marginBottom: 20 }}>The Palette</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {product.colors?.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      width: 44, height: 44, borderRadius: '50%', padding: 4,
                      border: '2px solid', borderColor: selectedColor === color.name ? '#D4AF37' : 'transparent',
                      background: 'transparent', cursor: 'pointer', transition: 'all 0.4s ease'
                    }}
                    title={color.name}
                  >
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: color.hex, boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3)' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 10 }}>
              <motion.button 
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '24px', borderRadius: 100, background: '#D4AF37', border: 'none',
                  fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#000',
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.4s ease'
                }}
              >
                Add to Cart
              </motion.button>
              <button style={{
                padding: '20px', borderRadius: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.4s ease'
              }}>
                Add to Wishlist
              </button>
            </div>
          </div>
        </motion.div>

        {/* Technical Specification Banner */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 60, marginTop: 80,
          padding: '60px 4vw', borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          {product.features?.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800 }}>{f.title}</span>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Products Section (Light Theme) ── */}
      <section style={{ padding: 'clamp(80px, 15vh, 120px) 4vw', background: '#FAF8F5', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A5276', fontWeight: 700, display: 'block', marginBottom: 15 }}>
              Explore
            </span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1C1C1E' }}>
              You Might Also Like
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 40 }}>
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/shop/product/${p.id}`} style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ y: -8 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ 
                    position: 'relative', aspectRatio: '4/5', background: '#fff', 
                    borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                  }}>
                    <Image src={p.src} alt={p.name} fill className="object-cover" sizes="300px" style={{ transition: 'transform 1s ease' }} />
                  </div>
                  <div style={{ padding: '0 5px', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#1C1C1E', marginBottom: 6, fontWeight: 500 }}>{p.name}</h3>
                    <p style={{ fontSize: 13, color: '#1A5276', fontWeight: 700, letterSpacing: '0.05em' }}>{p.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
