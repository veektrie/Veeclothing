'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="navbar"
      style={{
        background: scrolled
          ? 'rgba(26, 82, 118, 0.75)'
          : 'rgba(26, 82, 118, 0.45)',
      }}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/VCC.png"
            alt="Vee Clothing Company"
            width={130}
            height={40}
            className="object-contain brightness-0 invert opacity-90"
            style={{ height: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#corporate" className="nav-link">Corporate</Link>
          <Link href="#bespoke"   className="nav-link">Bespoke</Link>
          <Link href="#collection" className="nav-link">The Shop</Link>
          <Link href="#journal"   className="nav-link">The Journal</Link>
          <Link href="#consultation" className="nav-link">Contact</Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#consultation" className="btn-ghost-navy text-xs py-2.5 px-5">
            Request Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'rgba(212, 175, 55, 0.9)',
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'rgba(212, 175, 55, 0.9)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: 'rgba(212, 175, 55, 0.9)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(26, 82, 118, 0.95)' }}
        >
          {['#collection', '#corporate', '#bespoke', '#journal', '#consultation'].map((href) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="nav-link py-2 border-b border-white/10"
            >
              {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
            </Link>
          ))}
          <Link
            href="#consultation"
            onClick={() => setMenuOpen(false)}
            className="btn-ghost-navy mt-2 justify-center"
          >
            Request Consultation
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
