'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const whatsappUrl = 'https://wa.me/c/2348103031020';
  const corporateRef = useRef<HTMLDivElement>(null);
  const bespokeRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (corporateRef.current) corporateRef.current.style.transform = `translateY(${y * 0.15}px)`;
      if (bespokeRef.current) bespokeRef.current.style.transform = `translateY(${y * 0.1}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-split" style={{ minHeight: '100vh' }}>

      {/* ── CORPORATE SIDE (60%) ── */}
      <div className="hero-corporate" style={{ flex: '1.6' }}>
        {/* Background image */}
        <div
          ref={corporateRef}
          className="absolute inset-0"
          style={{ willChange: 'transform', height: '115%', top: '-7.5%' }}
        >
          <Image
            src="/hero2.png"
            alt="Vee Clothing Company corporate executive menswear Lagos"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
          />
        </div>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          {/* Glassmorphic badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-2"
            style={{
              background: 'rgba(26, 82, 118, 0.35)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', display: 'inline-block' }} />
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
              Corporate Identity &amp; Uniform Engineering
            </span>
          </div>

          <h1
            className="hero-title mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#fff' }}
          >
            Engineering<br />
            Your Brand's<br />
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Authority.</em>
          </h1>

          <p
            className="mb-8"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 380, lineHeight: 1.7, fontWeight: 300 }}
          >
            From boardroom blazers to bespoke corporate gifting — we engineer the visual identity of Lagos's most recognisable institutions.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="#corporate">
              <button className="btn-solid-gold">
                Corporate Partnerships
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </Link>
            <Link href="#consultation">
              <button className="btn-ghost-navy">Request Consultation</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="hero-divider" />

      {/* ── BESPOKE SIDE (40%) ── */}
      <div className="hero-bespoke" style={{ flex: '1' }}>
        {/* Background */}
        <div
          ref={bespokeRef}
          className="absolute inset-0"
          style={{ willChange: 'transform', height: '115%', top: '-7.5%' }}
        >
          <Image
            src="/hero2.png"
            alt="Bespoke tailoring for discerning gentlemen Lagos Nigeria"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 38vw"
            style={{ filter: 'grayscale(25%)' }}
          />
        </div>

        {/* Overlay */}
        <div className="hero-overlay-bespoke" />

        {/* Content */}
        <div className="hero-content" style={{ padding: '2rem 2.5rem' }}>
          <span className="hero-label">Private Commissions</span>

          <h2
            className="hero-title mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color: '#fff' }}
          >
            Architecture<br />
            for the Body.
          </h2>

          <p
            className="mb-6"
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, maxWidth: 280, lineHeight: 1.75, fontWeight: 300 }}
          >
            One garment. Crafted for one individual. The pinnacle of personal expression.
          </p>

          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-ghost-navy" style={{ fontSize: 10 }}>
              Begin Your Commission
            </button>
          </Link>
        </div>

        {/* Corner label */}
        <div
          className="absolute top-8 right-6 text-right"
          style={{ zIndex: 3 }}
        >
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 11,
              color: 'rgba(212,175,55,0.6)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
            }}
          >
            Est. Lagos, Nigeria
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', zIndex: 20 }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
