'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Mode = 'corporate' | 'bespoke';

const Hero = () => {
  const [mode, setMode]                       = useState<Mode>('corporate');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const corporateRef = useRef<HTMLDivElement>(null);
  const bespokeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (corporateRef.current) corporateRef.current.style.transform = `translateY(${y * 0.12}px)`;
      if (bespokeRef.current)   bespokeRef.current.style.transform   = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setIsTransitioning(true);
    setTimeout(() => { setMode(next); setIsTransitioning(false); }, 350);
  };

  const isCorporate = mode === 'corporate';

  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Corporate BG */}
      <div ref={corporateRef} className="absolute inset-0" style={{
        willChange: 'transform', height: '115%', top: '-7.5%',
        opacity: isCorporate ? 1 : 0, transition: 'opacity 0.7s ease', zIndex: 0,
      }}>
        <Image src="/corporate-hero.png"
          alt="Vee Clothing Company corporate executive menswear Lagos uniform engineering"
          fill priority sizes="100vw" className="object-cover object-top"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,82,118,0.88) 0%, rgba(26,82,118,0.50) 55%, rgba(28,28,30,0.78) 100%)' }} />
      </div>

      {/* Bespoke BG */}
      <div ref={bespokeRef} className="absolute inset-0" style={{
        willChange: 'transform', height: '115%', top: '-7.5%',
        opacity: isCorporate ? 0 : 1, transition: 'opacity 0.7s ease', zIndex: 0,
      }}>
        <Image src="/bespoke-hero.png"
          alt="Bespoke tailoring private commission custom suit Lagos Nigeria discerning gentleman"
          fill priority sizes="100vw" className="object-cover object-center"
          style={{ filter: 'grayscale(20%)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(28,28,30,0.92) 0%, rgba(41,40,52,0.62) 55%, rgba(26,82,118,0.42) 100%)' }} />
      </div>

      {/* ── Glassmorphic Self-Identifier Toggle ── */}
      <div style={{
        position: 'absolute', top: 104, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexWrap: 'nowrap',
        background: 'rgba(20,20,30,0.3)', backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(212,175,55,0.2)', padding: 3,
        width: 'auto', whiteSpace: 'nowrap',
        borderRadius: 8,
      }}>
        {(['corporate', 'bespoke'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            style={{
              padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 3vw, 28px)',
              fontSize: 'clamp(8px, 1.5vw, 9px)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: mode === m ? '#D4AF37' : 'rgba(255,255,255,0.4)',
              background: mode === m ? 'rgba(212,175,55,0.10)' : 'transparent',
              border: mode === m ? '1px solid rgba(212,175,55,0.45)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              borderRadius: 6,
            }}
          >
            {m === 'corporate' ? 'For Business' : 'For Individuals'}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(2rem, 5vw, 5rem)', paddingTop: 160,
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
          padding: '6px 16px',
          background: 'rgba(26,82,118,0.28)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212,175,55,0.22)', width: 'fit-content',
          borderRadius: 4,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4AF37', display: 'inline-block' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>
            {isCorporate ? 'Corporate Identity & Uniform Engineering' : 'Private Commission — Lagos, Nigeria'}
          </span>
        </div>

        {/* ── Headline — Cormorant Garamond 300, mixed-case, italic gold accent ── */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300,
          fontSize: 'clamp(3rem, 7vw, 7rem)',
          color: '#fff',
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          maxWidth: 820,
          marginBottom: 24,
        }}>
          {isCorporate ? (
            <>
              Corporate Identity,<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Tailored for Scale.</em>
            </>
          ) : (
            <>
              Exclusively<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Yours.</em>
            </>
          )}
        </h1>

        {/* Subtext — Inter 300 */}
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          fontWeight: 300,
          maxWidth: 520,
          lineHeight: 1.8,
          marginBottom: 40,
          fontFamily: 'Inter, sans-serif',
        }}>
          {isCorporate
            ? 'From the boardroom to the front line, we design cohesive wardrobes that command respect. Professional outfitting for 5 to 500, delivered with the uncompromising soul of bespoke tailoring.'
            : 'The art of the individual. Every stitch is a deliberate choice, resulting in a commission that exists for no one else. This is bespoke, redefined for the modern gentleman.'}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          {isCorporate ? (
            <>
              <Link href="#consultation">
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '15px 34px',
                  background: 'rgba(212,175,55,0.12)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212,175,55,0.55)', color: '#D4AF37',
                  fontFamily: 'Inter, sans-serif', fontSize: 10,
                  letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: 4,
                  transition: 'all 0.35s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.22)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)'; }}
                >
                  Inquire for Partnerships
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Link>
              <Link href="#corporate">
                <button className="btn-ghost-navy">View Corporate Services</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="#consultation">
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 34px',
                  background: 'rgba(212,175,55,0.12)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212,175,55,0.55)', color: '#D4AF37',
                  fontFamily: 'Inter, sans-serif', fontSize: 10,
                  letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: 4,
                  transition: 'all 0.35s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.22)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)'; }}
                >
                  Book a Private Fitting
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Link>
              <Link href="#bespoke">
                <button className="btn-ghost-navy">Discover the Process</button>
              </Link>
            </>
          )}
        </div>

        {/* Vertical Est. text */}
        <div style={{ position: 'absolute', bottom: 56, right: 'clamp(1.5rem, 4vw, 4rem)' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 10,
            color: 'rgba(212,175,55,0.4)', letterSpacing: '0.2em',
            textTransform: 'uppercase', writingMode: 'vertical-rl',
          }}>Est. Lagos, Nigeria</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)' }} />
      </div>
    </section>
  );
};

export default Hero;
