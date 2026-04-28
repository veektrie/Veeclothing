'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TrustBar from '../TrustBar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Mode = 'corporate' | 'bespoke';

const Hero = () => {
  const [mode, setMode] = useState<Mode>('corporate');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const corporateRef = useRef<HTMLDivElement>(null);
  const bespokeRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const isCorporate = mode === 'corporate';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(corporateRef.current, {
        y: '5%',
        ease: 'none',
        scrollTrigger: {
          trigger: 'section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(bespokeRef.current, {
        y: '3%',
        ease: 'none',
        scrollTrigger: {
          trigger: 'section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (highlightRef.current && toggleRef.current) {
      const activeBtn = toggleRef.current.children[isCorporate ? 1 : 2] as HTMLElement;
      if (activeBtn) {
        gsap.to(highlightRef.current, {
          x: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          duration: 0.4,
          ease: 'power3.inOut',
        });
      }
    }
  }, [mode, isCorporate]);

  const switchMode = (next: Mode) => {
    if (next === mode || isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setMode(next);
        setIsTransitioning(false);
        gsap.to(blurOverlayRef.current, {
          opacity: 0,
          backdropFilter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.fromTo(
          contentRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
      },
    });

    tl.to(blurOverlayRef.current, {
      opacity: 1,
      backdropFilter: 'blur(40px)',
      duration: 0.25,
      ease: 'power2.inOut',
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -5,
      duration: 0.15,
      ease: 'power2.in',
    }, 0);

    tl.to([corporateRef.current, bespokeRef.current], {
      scale: 1.02,
      filter: 'contrast(1.1) brightness(1.05)',
      duration: 0.25,
      ease: 'power2.inOut',
    }, 0);

    tl.to([corporateRef.current, bespokeRef.current], {
      scale: 1,
      filter: 'contrast(1) brightness(1)',
      duration: 0.25,
      delay: 0.25,
    });
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '90vh', // Increased to accommodate card + trust bar
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000',
      paddingTop: '100px' // Added padding to ensure navbar is not on the hero
    }}>

      {/* Background Images - Extended to fill the entire tall section */}
      <div ref={corporateRef}
        className="absolute inset-0"
        style={{
          willChange: 'transform', height: '110%', top: '-5%',
          opacity: isCorporate ? 1 : 0, transition: 'opacity 0.8s ease', zIndex: 0,
        }}>
        <Image src="/corporate-hero.png"
          alt="Corporate branding"
          fill priority sizes="100vw"
          className="object-cover object-top"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)' }} />
      </div>

      <div
        ref={bespokeRef}
        className="absolute inset-0"
        style={{
          willChange: 'transform', height: '110%', top: '-5%',
          opacity: isCorporate ? 0 : 1, transition: 'opacity 0.8s ease', zIndex: 0,
        }}>
        <Image src="/bespoke-hero.png"
          alt="Bespoke tailoring"
          fill priority sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'grayscale(10%)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)' }} />
      </div>

      <div
        ref={blurOverlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          opacity: 0,
          background: 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(0px)',
          pointerEvents: 'none',
          willChange: 'backdrop-filter, opacity',
        }}
      />

      {/* ── Main Hero Card ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '95%',
        maxWidth: '1400px',
        minHeight: '50vh',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'clamp(24px, 5vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
        marginBottom: '60px' // Space before trust bar
      }}>

        {/* Card Content */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            padding: 'clamp(2.5rem, 8vw, 6rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 24,
              padding: '8px 20px', background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)', borderRadius: '999px', width: 'fit-content'
            }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 600 }}>
              {isCorporate ? 'Business' : 'Custom Order'}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 32,
            maxWidth: '1100px'
          }}>
            {isCorporate ? (
              <>Workwear for Teams,<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Made to Order.</em></>
            ) : (
              <>Made Just<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>For You.</em></>
            )}
          </h1>

          {/* Mode Toggle */}
          <div
            ref={toggleRef}
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 4,
              borderRadius: '999px',
              position: 'relative',
              marginBottom: 40,
              zIndex: 20
            }}
          >
            <div
              ref={highlightRef}
              style={{
                position: 'absolute', top: 4, bottom: 4, left: 0,
                background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '999px', zIndex: -1, pointerEvents: 'none'
              }}
            />
            {(['corporate', 'bespoke'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  padding: '10px 32px',
                  fontSize: 9,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: mode === m ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  transition: 'all 0.35s ease', borderRadius: '999px',
                }}
              >
                {m === 'corporate' ? 'For Business' : 'For You'}
              </button>
            ))}
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(14px, 1.3vw, 19px)',
            fontWeight: 300,
            maxWidth: '620px',
            lineHeight: 1.8,
            marginBottom: 50,
            fontFamily: 'Inter, sans-serif',
          }}>
            {isCorporate
              ? 'From the office to the field, we make great uniforms for teams of any size. Get high-quality clothes for your business.'
              : 'Made just for you. Every detail is carefully picked to create a unique piece. Modern custom tailoring at its best.'}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="#consultation">
              <button style={{
                padding: '18px 40px',
                background: '#D4AF37', color: '#000',
                fontFamily: 'Inter, sans-serif', fontSize: 10,
                fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '999px', border: 'none',
                transition: 'all 0.4s ease',
                boxShadow: '0 10px 25px rgba(212,175,55,0.3)'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                {isCorporate ? 'Partner With Us' : 'Book a Fitting'}
              </button>
            </Link>
            <Link href={isCorporate ? '#corporate' : '#bespoke'}>
              <button style={{
                padding: '18px 40px',
                background: 'rgba(255,255,255,0.05)', color: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 10,
                fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
              >
                {isCorporate ? 'Our Services' : 'How It Works'}
              </button>
            </Link>
          </div>
        </div>

        {/* Card Footer */}
        <div style={{
          padding: '28px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(255,255,255,0.01)',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Instagram', 'Lagos', 'Abuja'].map(item => (
              <span key={item} style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trust Bar Integrated with Hero Background ── */}
      <TrustBar />

    </section>
  );
};

export default Hero;
