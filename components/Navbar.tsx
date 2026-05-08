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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.6,
        ease: 'power3.out'
      });
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power3.in'
      });
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

      {/* Mobile Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1001] bg-black/95 opacity-0 pointer-events-none flex flex-col items-center justify-center"
      >
        <button
          className="absolute top-8 right-8 p-2 text-white/60 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <div
          ref={linksRef}
          className="flex flex-col items-center gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-serif text-white/60 hover:text-white transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-serif text-white/60 hover:text-white transition-all"
          >
            Account
          </Link>
          
          {/* Theme Toggle — Mobile */}
          <button
            suppressHydrationWarning
            onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMenuOpen(false); }}
            className="flex items-center gap-3 text-xl font-serif text-white/60 hover:text-white transition-all mt-4"
          >
            {theme === 'dark' ? (
              <><Sun size={24} /> Light Mode</>
            ) : (
              <><Moon size={24} /> Dark Mode</>
            )}
          </button>

          {/* Currency Picker — Mobile */}
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {currencies.map(c => (
              <button
                suppressHydrationWarning
                key={c.code}
                onClick={() => { setCurrency(c.code as any); setMenuOpen(false); }}
                className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-200
                  ${
                    currency === c.code
                      ? 'bg-white text-black'
                      : 'border border-white/20 text-white/50 hover:border-white/50 hover:text-white/80'
                  }
                `}
              >
                {c.symbol} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

