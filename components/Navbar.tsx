'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: '/#bespoke', label: 'Individual' },
    { href: '/#corporate', label: 'Business' },
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
            background: 'rgba(25, 25, 25, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            padding: '12px clamp(1rem, 5vw, 2rem)',
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left: Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle (Left on Mobile) */}
          <button 
            className="lg:hidden p-2 text-white/90 flex-1 flex justify-start"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/VCC-white.png"
                alt="VeeClothingCompany"
                width={90}
                height={30}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons & Selectors */}
          <div className="flex items-center justify-end gap-5 lg:gap-7 flex-1">
            <button className="text-white/90 hover:text-white transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white/90 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
            <Link href="/cart" className="text-white/90 hover:text-white transition-colors relative">
              <ShoppingBag size={20} />
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold text-white/90 tracking-wider border-l border-white/20 pl-6 ml-2">
              <span>NGN</span>
              <span className="text-white/30">|</span>
              <span>EN</span>
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
          <div className="flex gap-4 mt-8">
            <span className="text-sm text-white/40">NGN</span>
            <span className="text-sm text-white/40">EN</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

