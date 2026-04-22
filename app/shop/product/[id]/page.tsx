'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products, Product } from '../../data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
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
    <main style={{ background: '#fcfbf9', minHeight: '100vh', color: '#1c1c1e', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />

      {/* Subtle Grain Texture Overlay */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* ── Product Hero Section ── */}
      <section style={{ padding: 'clamp(100px, 12vh, 140px) 5vw 60px', maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumbs - Responsive visibility */}
        <div style={{ display: 'flex', gap: 10, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8e8e93', marginBottom: 'clamp(20px, 4vh, 40px)', fontFamily: 'Inter, sans-serif' }}>
          <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
          <span>/</span>
          <span style={{ color: '#1c1c1e' }}>{product.cat}</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>{product.name}</span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2rem, 5vw, 6rem)', 
          alignItems: 'start' 
        }}>
          
          {/* Column 1: Product Story (Top on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 30, order: 1 }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800 }}>Vee Premium</span>
                <div style={{ height: 1, flex: 1, background: 'rgba(212,175,55,0.2)' }} />
              </div>
              <h1 style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                lineHeight: 1.05, 
                fontWeight: 300, 
                marginBottom: 15,
                letterSpacing: '-0.02em'
              }}>
                {product.name}
              </h1>
              <p style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontFamily: 'Cormorant Garamond, serif', color: '#1c1c1e', opacity: 0.9, fontWeight: 500 }}>
                {product.price}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8e8e93', fontWeight: 700 }}>Our Craft</h3>
              <p style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.7, color: '#3a3a3c', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                {product.longDesc || product.desc}
              </p>
            </div>

            {/* Feature chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              {product.features?.map((f, i) => (
                <div key={i} style={{ 
                  padding: '8px 16px', borderRadius: '999px', background: 'rgba(212,175,55,0.05)', 
                  border: '1px solid rgba(212,175,55,0.1)', fontSize: 10, letterSpacing: '0.1em', 
                  textTransform: 'uppercase', color: '#1c1c1e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37' }} />
                  {f.title}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Large Visual (Center) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: 'relative', 
              aspectRatio: '4/5', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              order: 2
            }}
          >
            {/* Background Halo */}
            <div style={{ position: 'absolute', inset: '5%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
            
            <Image 
              src={product.src} 
              alt={product.name} 
              fill 
              className="object-contain" 
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 35vw"
              priority
              style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12))', zIndex: 1 }}
            />
          </motion.div>

          {/* Column 3: Customization (Bottom on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 40,
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              padding: 'clamp(20px, 3vw, 40px)',
              borderRadius: 32,
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
              order: 3
            }}
          >
            
            {/* Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1c1c1e', fontWeight: 800 }}>Select Size</h3>
                <button style={{ 
                  fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF37', 
                  background: 'none', border: 'none', borderBottom: '1px solid #D4AF37', cursor: 'pointer', paddingBottom: 2, fontWeight: 700
                }}>Guide</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 12 }}>
                {product.sizes?.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '12px 0', borderRadius: 12, border: '1px solid',
                      borderColor: selectedSize === size ? '#1c1c1e' : 'rgba(28,28,30,0.1)',
                      background: selectedSize === size ? '#1c1c1e' : 'transparent',
                      color: selectedSize === size ? '#fff' : '#1c1c1e',
                      fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1c1c1e', fontWeight: 800, marginBottom: 20 }}>Colorway</h3>
              <div style={{ display: 'flex', gap: 15 }}>
                {product.colors?.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    style={{
                      width: 44, height: 44, borderRadius: '50%', padding: 4,
                      border: '2px solid', borderColor: selectedColor === color.name ? '#1c1c1e' : 'transparent',
                      background: 'transparent', cursor: 'pointer', transition: 'all 0.4s ease'
                    }}
                  >
                    <div style={{ 
                      width: '100%', height: '100%', borderRadius: '50%', 
                      background: color.hex, border: color.hex === '#FFFFFF' ? '1px solid #e5e5ea' : 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                    }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 10 }}>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '24px', borderRadius: 16, background: '#1c1c1e', border: 'none',
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
                  fontWeight: 700, cursor: 'pointer', transition: 'all 0.4s ease',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                Add To Bag
              </motion.button>
              <button style={{
                padding: '20px', borderRadius: 16, background: 'transparent', border: '1px solid rgba(28,28,30,0.1)',
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1c1c1e',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.4s ease'
              }}>
                Save to Wishlist
              </button>
            </div>

            <p style={{ fontSize: 11, textAlign: 'center', color: '#8e8e93', fontFamily: 'Inter, sans-serif' }}>
              Complimentary shipping on all premium commissions.
            </p>
          </motion.div>
        </div>

        {/* Feature Ribbon (Responsive Grid) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 40, marginTop: 100,
          padding: '60px 0', borderTop: '1px solid rgba(28,28,30,0.05)'
        }}>
          {product.features?.map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800 }}>{f.title}</span>
              <p style={{ fontSize: 13, color: '#8e8e93', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 800 }}>Heritage</span>
            <p style={{ fontSize: 13, color: '#8e8e93', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Crafted with precision in our Lagos & Abuja ateliers.
            </p>
          </div>
        </div>
      </section>

      {/* ── You Might Also Like Section ── */}
      <section style={{ padding: 'clamp(60px, 10vh, 120px) 5vw', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label" style={{ marginBottom: 15 }}>Curation</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#1c1c1e' }}>
              You Might Also <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Like</em>
            </h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 40 
          }}>
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/shop/product/${p.id}`} style={{ textDecoration: 'none' }}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20, cursor: 'pointer' }}
                >
                  <div style={{ 
                    position: 'relative', aspectRatio: '3/4', background: '#fcfbf9', 
                    borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)' 
                  }}>
                    <Image 
                      src={p.src} 
                      alt={p.name} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 45vw, 22vw" 
                      style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                    />
                  </div>
                  <div style={{ padding: '0 10px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#1c1c1e', marginBottom: 5, fontWeight: 400 }}>{p.name}</h3>
                    <p style={{ fontSize: 13, color: '#D4AF37', fontWeight: 600, letterSpacing: '0.05em' }}>{p.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
