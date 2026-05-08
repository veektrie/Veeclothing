'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Search, Menu, X, Heart, ChevronDown, Sun, Moon } from 'lucide-react';
import CartBadge from './CartBadge';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useThemeStore } from '@/store/useThemeStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const { currency, setCurrency, fetchRates } = useCurrencyStore();
  const { theme, setTheme } = useThemeStore();

  const currencies = [
    { code: 'NGN', symbol: '₦', label: 'NGN' },
    { code: 'USD', symbol: '$', label: 'USD' },
    { code: 'GBP', symbol: '£', label: 'GBP' },
    { code: 'EUR', symbol: '€', label: 'EUR' },
  ] as const;

  const activeCurrency = currencies.find(c => c.code === currency) || currencies[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    fetchRates();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchRates]);

  // Close currency popover on outside click
  useEffect(() => {
    if (!currencyOpen) return;
    const handler = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [currencyOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const panel = overlay.querySelector('[style*="position: absolute"]') as HTMLElement | null;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      // Fade in backdrop
      gsap.to(overlay, { opacity: 1, pointerEvents: 'all', duration: 0.4, ease: 'power3.out' });
      // Slide panel in from left
      if (panel) {
        gsap.fromTo(panel, { x: '-100%' }, { x: '0%', duration: 0.5, ease: 'power4.out' });
      }
      // Stagger nav links
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.25 }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
      // Slide panel out to left, then hide
      if (panel) {
        gsap.to(panel, { x: '-100%', duration: 0.4, ease: 'power3.in' });
      }
      gsap.to(overlay, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power3.in', delay: 0.15 });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      gsap.to(searchBarRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.4,
        ease: 'power3.out'
      });
    } else {
      gsap.to(searchBarRef.current, {
        y: -20,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power3.in'
      });
    }
  }, [searchOpen]);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' },
    { href: '/services/individual', label: 'Individual' },
    { href: '/services/business', label: 'Business' },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 z-[1000] px-4 md:px-8 pointer-events-none flex justify-center" style={{ top: 'clamp(0.5rem, 3vw, 1.5rem)' }}>
        {/* Search Bar Overlay */}
        <div
          ref={searchBarRef}
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: '12px',
            width: 'calc(100% - 32px)',
            maxWidth: '600px',
            background: 'rgba(25, 25, 25, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '16px 24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0,
            transform: 'translateY(-20px)',
            pointerEvents: 'none',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <Search size={18} className="text-white/40" />
          <input
            type="text"
            placeholder="Search products, style guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                setSearchOpen(false);
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '14px',
              width: '100%',
              fontFamily: 'Inter, sans-serif'
            }}
            autoFocus
          />
          <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div
          className="flex items-center justify-between pointer-events-auto w-full max-w-[1200px]"
          style={{
            background: theme === 'dark' ? 'rgba(20, 20, 22, 0.85)' : 'rgba(18, 18, 20, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.15)',
            borderRadius: '999px',
            padding: '12px clamp(1rem, 5vw, 2rem)',
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.6)' : '0 4px 24px rgba(0,0,0,0.15)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left: Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle & Saved (Left on Mobile) */}
          <div className="lg:hidden flex-1 flex items-center gap-1">
            <button
              className="p-2 -ml-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <Link href="/saved" aria-label="Saved pieces" className="text-white/80 hover:text-white transition-colors p-2">
              <Heart size={20} />
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/VCC-white.png"
                alt="VeeClothingCompany"
                width={70}
                height={24}
                className="object-contain md:w-[90px] md:h-[30px]"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons & Selectors */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-7 flex-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>

            <Link href="/saved" aria-label="Saved pieces" className="hidden lg:block text-white/80 hover:text-white transition-colors">
              <Heart size={20} />
            </Link>

            <CartBadge />

            {/* Theme Toggle — Desktop */}
            <button
              suppressHydrationWarning
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Currency Picker — Desktop */}
            <div ref={currencyRef} className="hidden md:flex items-center gap-3 border-l border-white/20 pl-6 ml-2 relative">
              <button
                suppressHydrationWarning
                onClick={() => setCurrencyOpen(o => !o)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-white/70 hover:text-white tracking-widest uppercase transition-colors duration-200 group"
              >
                <span>{activeCurrency.symbol}</span>
                <span>{activeCurrency.label}</span>
                <ChevronDown
                  size={11}
                  className={`text-white/40 transition-transform duration-300 ${currencyOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Floating popover */}
              {currencyOpen && (
                <div
                  className="absolute top-full right-0 mt-4 z-50 overflow-hidden"
                  style={{
                    background: 'rgba(14, 14, 16, 0.96)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    minWidth: '130px',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  }}
                >
                  {currencies.map((c, i) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code as any); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-[11px] font-bold tracking-widest uppercase transition-colors duration-150
                        ${
                          currency === c.code
                            ? 'text-white bg-white/10'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
                        }
                        ${i !== currencies.length - 1 ? 'border-b border-white/[0.06]' : ''}
                      `}
                    >
                      <span className="w-4 text-center opacity-70">{c.symbol}</span>
                      <span>{c.label}</span>
                      {currency === c.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── PREMIUM MOBILE MENU ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1001] opacity-0 pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel — slides in from left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 'min(88vw, 380px)',
            background: 'linear-gradient(160deg, #0d0d0f 0%, #121214 60%, #0a0f1a 100%)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow top-right */}
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(26,82,118,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Ambient glow bottom-left */}
          <div style={{
            position: 'absolute', bottom: -60, left: -60,
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(26,82,118,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image src="/VCC-white.png" alt="VCC" width={72} height={24} className="object-contain" style={{ opacity: 0.9 }} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ color: 'rgba(255,255,255,0.5)', padding: '6px', transition: 'color 0.2s' }}
              aria-label="Close menu"
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav
            ref={linksRef}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem 1.75rem', gap: '0.15rem', position: 'relative', zIndex: 1 }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', transition: 'color 0.25s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: 'rgba(26,82,118,0.8)', fontWeight: 400, minWidth: '1.5rem', fontStyle: 'italic' }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {link.label}
                </span>
                <span style={{ marginLeft: 'auto', opacity: 0.3, fontSize: '12px' }}>→</span>
              </Link>
            ))}

            {/* Saved */}
            <Link
              href="/saved"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', color: 'rgba(255,255,255,0.7)', transition: 'color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: 'rgba(26,82,118,0.8)', fontWeight: 400, minWidth: '1.5rem', fontStyle: 'italic' }}>
                05
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Saved Pieces
              </span>
              <Heart size={15} style={{ marginLeft: 'auto', opacity: 0.35 }} />
            </Link>
          </nav>

          {/* Bottom controls */}
          <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
            {/* Theme toggle */}
            <button
              suppressHydrationWarning
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                color: 'rgba(255,255,255,0.55)', fontSize: '11px',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {theme === 'dark'
                ? <><Sun size={16} /><span>Switch to Light</span></>
                : <><Moon size={16} /><span>Switch to Dark</span></>
              }
            </button>

            {/* Currency pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {currencies.map(c => (
                <button
                  suppressHydrationWarning
                  key={c.code}
                  onClick={() => { setCurrency(c.code as any); }}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    ...(currency === c.code
                      ? { background: '#1A5276', color: 'white', border: '1px solid #1A5276' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }
                    ),
                  }}
                >
                  {c.symbol} {c.label}
                </button>
              ))}
            </div>

            {/* Brand tagline */}
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginTop: '0.25rem' }}>
              Lagos · Bespoke · Est. 2018
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
