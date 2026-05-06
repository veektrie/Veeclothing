"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(26,82,118,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.06) 0%, transparent 55%)',
        }}
      />

      {/* Gold horizontal rule — top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      <div className="relative z-10 max-w-[540px]">

        {/* Monogram watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(26,82,118,0.06)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
            >
              V
            </span>
          </div>
        </motion.div>

        {/* Ghost 404 */}
        <div
          className="text-[clamp(6rem,20vw,10rem)] font-black leading-none select-none mb-0"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(26,82,118,0.08)',
          }}
        >
          404
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mt-4"
        >
          {/* Eyebrow */}
          <span
            className="block text-[9px] tracking-[0.3em] uppercase font-bold mb-5"
            style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
          >
            Page Not Found
          </span>

          <h1
            className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-[#1C1C1E] mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            This piece has left the floor.
          </h1>

          <p
            className="text-[14px] font-light text-[#94a3b8] leading-[1.8] mb-10 max-w-[380px] mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            But the atelier remains open. The collection or page you are looking for
            may have been moved, archived, or commissioned out.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => router.back()}
              id="notfound-go-back"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-[#64748b] hover:text-[#1A5276] transition-colors border border-black/10 hover:border-[#1A5276]/30 bg-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <ArrowLeft size={13} />
              Go Back
            </button>

            <Link
              href="/shop"
              id="notfound-view-shop"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-white no-underline transition-all duration-300 hover:shadow-[0_8px_24px_rgba(26,82,118,0.25)]"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(135deg, #1A5276, #2980B9)',
              }}
            >
              View the Collection
            </Link>
          </div>

          {/* Featured suggestion */}
          <div className="mt-12 pt-8 border-t border-black/5">
            <p
              className="text-[9px] tracking-[0.25em] uppercase text-[#94a3b8] mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              You may be looking for
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Bespoke Suits', href: '/shop?category=bespoke' },
                { label: 'Kaftans', href: '/shop?category=kaftan' },
                { label: 'Corporate', href: '/shop?category=corporate' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-[9px] tracking-[0.15em] uppercase font-bold no-underline transition-all duration-200 hover:border-[#D4AF37]/50 hover:text-[#1A5276]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#64748b',
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: 'white',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Brand watermark */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <p
          className="text-[8px] font-bold tracking-[0.5em] uppercase"
          style={{ color: 'rgba(26,82,118,0.15)', fontFamily: 'Inter, sans-serif' }}
        >
          Vee Clothing Company · Lagos
        </p>
      </div>
    </div>
  );
}
