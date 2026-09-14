'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useQuickViewStore } from '@/store/useQuickViewStore';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// ─── Category shortcut bar config ────────────────────────────────────────────

const CATEGORY_SHORTCUTS = [
  { label: 'Bespoke Suits', href: '/shop?category=bespoke' },
  { label: 'Kaftans',       href: '/shop?category=kaftan'  },
  { label: 'Corporate',     href: '/shop?category=corporate' },
  { label: 'Hoodies',       href: '/shop?category=hoodies' },
  { label: 'All Pieces →',  href: '/shop'                  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeaturedProduct {
  _id?: string;
  id?: string;
  name?: string;
  label?: string;
  price?: number;
  src?: string;
  tag?: string;
  cat?: string;
  slug?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  desc?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Hero = ({ featuredProduct }: { featuredProduct?: FeaturedProduct }) => {
  const [mounted, setMounted] = React.useState(false);
  const detectedCity = useCurrencyStore((state) => state.detectedCity);
  const { convert } = useCurrencyStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Geo-personalised sub-headline
  let subHeadline = 'Bespoke style for the modern man, wherever you are.';
  if (detectedCity) {
    const city = detectedCity.toLowerCase();
    if (city === 'lagos')         subHeadline = 'High-impact style for Lagos professionals.';
    else if (city === 'port harcourt') subHeadline = "Sharp, custom looks for Port Harcourt's best.";
    else if (city === 'abuja')    subHeadline = "Elite tailoring for Abuja's leaders.";
    else if (city === 'onitsha')  subHeadline = "Premium style for Onitsha's business class.";
    else if (city === 'dublin')   subHeadline = 'Fine tailoring for Dublin professionals.';
    else if (city === 'london')   subHeadline = "Bespoke excellence for London's elite.";
  }

  // Derived product fields
  const productName  = featuredProduct?.name  || featuredProduct?.label || '';
  const productPrice = featuredProduct?.price;
  const productSrc   = featuredProduct?.src   || '';

  const handleQuickAdd = () => {
    if (featuredProduct) {
      useQuickViewStore.getState().openQuickView(featuredProduct);
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* ── Background Video ───────────────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.8,
        }}
      >
        <source src="/herovideo.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlay ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Main content: left text + right featured card ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          /* Leaves room for category bar (~90px) */
          paddingBottom: 'clamp(5.5rem, 14vh, 150px)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1440px',
            padding: '0 clamp(1.5rem, 5vw, 80px)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '32px',
          }}
        >
          {/* ─── LEFT: Text block ────────────────────────────────────────── */}
          <div style={{ flex: 1, maxWidth: 680 }}>

            {/* Google Reviews pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2vw, 12px)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '999px',
                padding: 'clamp(6px,1.5vw,10px) clamp(12px,3vw,24px)',
                width: 'fit-content',
                marginBottom: 'clamp(16px,3vw,24px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 700, letterSpacing: '0.02em' }}>4.9/5</span>
              </div>
              <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: '#F1C40F', fontSize: '10px' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: '9px', color: '#FFF', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Reviews
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.1rem, 7vw, 4.5rem)',
                color: '#FFFFFF',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                margin: '0 0 16px 0',
                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              Bespoke Tailoring for<br />
              the Discerning Gentleman.
            </motion.h1>

            {/* Dynamic sub-headline (min-height prevents layout shift) */}
            <div style={{ minHeight: '32px', marginBottom: '36px' }}>
              {mounted && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    margin: 0,
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  {subHeadline}
                </motion.h2>
              )}
            </div>

            {/* ── Dual CTA row ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              {/* Primary CTA: Shop the Collection */}
              <Link href="/shop">
                <button
                  style={{
                    padding: 'clamp(14px,3vw,18px) clamp(28px,4vw,44px)',
                    background: '#1A5276',
                    color: '#FFFFFF',
                    borderRadius: '999px',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(11px,2vw,13px)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: '0 16px 40px rgba(26,82,118,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = '#2980B9';
                    e.currentTarget.style.boxShadow = '0 24px 50px rgba(26,82,118,0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = '#1A5276';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,82,118,0.45)';
                  }}
                >
                  Shop the Collection
                  <ArrowRight size={14} />
                </button>
              </Link>

              {/* Secondary CTA: Book a Fitting */}
              <Link href="/#consultation">
                <button
                  style={{
                    padding: 'clamp(14px,3vw,18px) clamp(28px,4vw,44px)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(11px,2vw,13px)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                >
                  Book a Fitting
                </button>
              </Link>
            </motion.div>
          </div>

          {/* ─── RIGHT: Featured product drop card (desktop only) ─────────── */}
          {featuredProduct && productSrc && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
              style={{
                width: '260px',
                flexShrink: 0,
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Product image */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <Image
                  src={productSrc}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="260px"
                  priority
                />
                {/* Gradient over image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />

                {/* "Featured" label */}
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'rgba(212,175,55,0.92)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                }}>
                  <span style={{
                    fontSize: '7px', letterSpacing: '0.2em', fontWeight: 800,
                    color: 'white', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                  }}>
                    Featured Drop
                  </span>
                </div>

                {/* Product tag badge */}
                {featuredProduct.tag && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(26,82,118,0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span style={{
                      fontSize: '7px', letterSpacing: '0.2em', fontWeight: 800,
                      color: 'white', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                    }}>
                      {featuredProduct.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div style={{ padding: '16px 18px 18px' }}>
                {/* Category label */}
                {featuredProduct.cat && (
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: 'rgba(212,175,55,0.9)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    margin: '0 0 4px 0',
                  }}>
                    {featuredProduct.cat} Collection
                  </p>
                )}
                {/* Product name */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'white',
                  margin: '0 0 6px 0',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}>
                  {productName}
                </p>
                {/* Price */}
                <p
                  suppressHydrationWarning
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#D4AF37',
                    margin: '0 0 14px 0',
                  }}
                >
                  {mounted && productPrice
                    ? `${convert(productPrice).symbol}${convert(productPrice).value.toLocaleString()}`
                    : 'Price on request'
                  }
                </p>
                {/* Quick Add button */}
                <button
                  onClick={handleQuickAdd}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: '#1A5276',
                    color: 'white',
                    border: 'none',
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: '0 8px 24px rgba(26,82,118,0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2980B9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,82,118,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1A5276';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,82,118,0.35)';
                  }}
                >
                  <ShoppingBag size={13} />
                  Quick Add
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Category Jump Bar ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 3.5vh, 2rem)',
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '4px 2px',
          }}
        >
          {CATEGORY_SHORTCUTS.map((cat) => (
            <Link key={cat.label} href={cat.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.background = 'rgba(255,255,255,0.2)';
                  el.style.borderColor = 'rgba(255,255,255,0.4)';
                  el.style.color = 'white';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.background = 'rgba(255,255,255,0.09)';
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.color = 'rgba(255,255,255,0.85)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
