'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import images from '../constants/images';

// Editorial lookbook images
const lookbookItems = [
  { src: images.hero1,     alt: 'Vee Clothing Company bespoke kaftan collection Lagos', label: 'The Kaftan Edit',   category: 'Kaftans' },
  { src: images.kaftan02,  alt: 'Vee Clothing Company luxury kaftan artisan tailoring',  label: 'Structural Volume',  category: 'Kaftans' },
  { src: images.kaftan03,  alt: 'Premium kaftan menswear Nigeria bespoke tailored',       label: 'Clean Drape',        category: 'Kaftans' },
  { src: images.suit01,    alt: 'Bespoke slim fit suit custom tailored Lagos menswear',   label: 'The Power Suit',     category: 'Suiting' },
  { src: images.suit02,    alt: 'Premium African menswear executive suit Lagos',          label: 'Executive Cut',      category: 'Suiting' },
  { src: images.cop4,      alt: 'Vee Clothing Company corporate branded uniform',         label: 'Corporate Identity', category: 'Corporate' },
];

const Lookbook = () => {
  const whatsappUrl = 'https://wa.me/c/2348103031020';

  return (
    <section className="lookbook-section" id="collection">
      {/* Header */}
      <div className="lookbook-header">
        <div>
          <span className="section-label">The Collection</span>
          <div className="gold-divider my-4" />
          <h2
            className="hero-title"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.8rem)',
              color: '#1C1C1E',
              maxWidth: 480,
            }}
          >
            Garments That Speak Before You Do.
          </h2>
        </div>
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button className="btn-ghost-gold" style={{ flexShrink: 0 }}>
            View Full Catalog
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Lookbook Grid */}
      <div className="lookbook-grid">
        {lookbookItems.map((item, i) => (
          <motion.div
            key={i}
            className={`lookbook-card ${i === 0 ? 'lookbook-card--featured' : ''}`}
            style={i === 0 ? { gridRow: 'span 2', aspectRatio: 'auto' } : {}}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                style={{ transition: 'transform 0.8s ease' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Hover overlay */}
            <div className="lookbook-card-overlay">
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginBottom: 6,
                }}
              >
                {item.category}
              </span>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.4rem',
                  color: '#fff',
                  fontWeight: 400,
                  marginBottom: 16,
                }}
              >
                {item.label}
              </p>
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="btn-ghost-navy"
                  style={{ fontSize: 10, padding: '10px 20px' }}
                >
                  Enquire
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        className="mt-12 flex items-center justify-center gap-12 flex-wrap"
        style={{ padding: '0 4rem' }}
      >
        {['Kaftans', 'Suiting', 'Corporate Uniforms', 'Wedding Collections', 'Ready-to-Wear'].map((cat) => (
          <span
            key={cat}
            className="section-label cursor-pointer transition-colors duration-300"
            style={{ color: '#6B6B6B' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#D4AF37')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6B6B6B')}
          >
            {cat}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Lookbook;