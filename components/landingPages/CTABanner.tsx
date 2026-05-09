'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';

export default function CTABanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage("You're on the list. Expect only the finest.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="w-full px-[clamp(1rem,4vw,3rem)] py-[clamp(2rem,4vw,3rem)]">
      <div
        className="relative w-full rounded-[28px] overflow-hidden"
        style={{ minHeight: 'clamp(220px, 30vw, 340px)' }}
      >
        {/* Background image */}
        <Image
          src="/kaftan07.jpeg"
          alt="Vee Clothing Company latest collection"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />

        {/* Dark overlay gradient — left side heavier for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(10,15,25,0.82) 0%, rgba(10,15,25,0.55) 50%, rgba(10,15,25,0.15) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-6 px-[clamp(1.5rem,5vw,3.5rem)] py-[clamp(2rem,5vw,3rem)]">

          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <p
              className="text-[9px] tracking-[0.3em] uppercase font-bold mb-3"
              style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
            >
              Exclusive Access
            </p>
            <h2
              className="text-white font-bold leading-[1.1] tracking-[-0.03em]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
              }}
            >
              Stay ahead of<br />
              <em style={{ fontStyle: 'normal', color: '#D4AF37' }}>our latest offers.</em>
            </h2>
          </motion.div>

          {/* Right: Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3 w-full md:w-auto md:min-w-[300px] lg:min-w-[360px]"
          >
            {/* Begin Shopping button */}
            <Link href="/shop" className="w-full">
              <button className="group w-full flex items-center justify-between gap-3 bg-white text-[#1C1C1E] px-6 py-4 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#1A5276] hover:text-white hover:shadow-[0_8px_32px_rgba(26,82,118,0.35)]">
                <span style={{ fontFamily: 'Inter, sans-serif' }}>Begin Shopping</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            {/* Newsletter subscribe */}
            {status === 'success' ? (
              <div className="w-full flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-4 rounded-full">
                <Check size={14} className="text-[#D4AF37] flex-shrink-0" />
                <span
                  className="text-white/90 text-[11px] tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {message}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full relative">
                <div className="flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm rounded-full px-5 py-3.5 focus-within:border-white/50 transition-all duration-300">
                  <Mail size={14} className="text-white/50 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    placeholder="Enter your email here"
                    className="flex-1 bg-transparent text-white text-[12px] placeholder:text-white/45 focus:outline-none min-w-0"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-shrink-0 bg-white text-[#1C1C1E] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-[#D4AF37] transition-all duration-200 disabled:opacity-60"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {status === 'loading' ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-red-400 text-[10px] mt-1.5 pl-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {message}
                  </p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
