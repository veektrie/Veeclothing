'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (burgerRef.current) {
      const spans = burgerRef.current.querySelectorAll('span');
      if (menuOpen) {
        gsap.to(spans[0], { rotate: 45, y: 7, width: 24, duration: 0.4, ease: 'power2.out' });
        gsap.to(spans[1], { opacity: 0, x: 10, duration: 0.3 });
        gsap.to(spans[2], { rotate: -45, y: -7, width: 24, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(spans[0], { rotate: 0, y: 0, width: 20, duration: 0.4, ease: 'power2.out' });
        gsap.to(spans[1], { opacity: 1, x: 0, duration: 0.3 });
        gsap.to(spans[2], { rotate: 0, y: 0, width: 12, duration: 0.4, ease: 'power2.out' });
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      // Animate overlay in
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.6,
        ease: 'power3.out'
      });
      // Animate links in
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [menuOpen]);

  const navLinks = [
    { href: '/',          label: 'Home'          },
    { href: '/shop',       label: 'The Shop'      },
    { href: '/journal',    label: 'The Journal'   },
    { href: '/#bespoke',   label: 'Bespoke'       },
    { href: '/#corporate', label: 'Corporate'     },
    { href: '/#consultation', label: 'Contact'    },
  ];

  return (
    <>
      <header
        className="fixed top-6 left-0 right-0 z-[1000] px-4 md:px-8 pointer-events-none"
      >
        <div 
          className="mx-auto flex items-center justify-between pointer-events-auto"
          style={{
            background: scrolled ? 'rgba(10, 10, 15, 0.7)' : 'rgba(20, 20, 30, 0.3)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            padding: scrolled ? '10px 28px' : '14px 40px',
            maxWidth: '1400px',
            width: '95%',
            boxShadow: scrolled ? '0 20px 40px -15px rgba(0,0,0,0.6)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center transition-all duration-500 hover:opacity-80">
            <Image
              src="/VCC-white.png"
              alt="Vee Clothing Company"
              width={scrolled ? 80 : 100}
              height={36}
              className="object-contain"
              style={{ width: scrolled ? '80px' : '100px', height: 'auto', transition: 'width 0.5s ease' }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/50 hover:text-[#D4AF37] transition-all duration-500 hover:tracking-[0.45em]"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="#consultation" 
              className="ml-4 px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] uppercase tracking-[0.25em] hover:bg-[#D4AF37]/20 transition-all duration-500 rounded-full"
            >
              Consultation
            </Link>
          </nav>

          {/* Ultra-minimal Hamburger Button - Now Mobile Only */}
          <button
            ref={burgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden group relative z-[1001] flex flex-col items-end gap-1.5 p-2 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block h-[1px] bg-white" />
            <span className="block h-[1px] bg-white" />
            <span className="block h-[1px] bg-white" />
          </button>
        </div>
      </header>

      <div 
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/70 opacity-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
        }}
      >
        <div 
          ref={linksRef}
          className="flex flex-col items-center gap-10 md:gap-14"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group relative overflow-hidden text-center"
            >
              <span className="block font-serif text-[clamp(2rem,6vw,4.5rem)] text-white/30 transition-all duration-500 group-hover:text-white group-hover:scale-105">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          
          <div className="mt-8 flex flex-col items-center gap-6">
            <Link 
              href="#consultation" 
              onClick={() => setMenuOpen(false)}
              className="px-10 py-4 border border-white/20 text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] hover:bg-white/5 transition-all duration-500"
            >
              Book Consultation
            </Link>
            <div className="flex gap-8 text-white/20 text-[9px] uppercase tracking-[0.2em] font-light mt-4">
              <span>Instagram</span>
              <span>Lagos</span>
              <span>Abuja</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
