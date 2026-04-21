'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Unified client sentiments: corporate + bespoke merged ──
const sentiments = [
  {
    name: 'Chukwuemeka A.',
    role: 'CEO, Financial Group — Lagos',
    type: 'Corporate',
    rating: 5,
    pull: 'The corporate branding transformed our executive presence.',
    full: 'Vee Clothing Company transformed how our executive team presents itself. The attention to detail in every blazer — the stitching, the brand embossing — was extraordinary. Our clients noticed immediately.',
    verified: true,
  },
  {
    name: 'Adaeze M.',
    role: 'Director of Operations, Hospitality Group',
    type: 'Corporate',
    rating: 5,
    pull: 'Our brand standards were exceeded entirely.',
    full: 'We commissioned staff uniforms for 80 front-of-house team members. The process was seamless, the quality exceptional. I would not use anyone else for corporate apparel.',
    verified: true,
  },
  {
    name: 'Barrister Rotimi O.',
    role: 'Senior Counsel, Abuja',
    type: 'Bespoke',
    rating: 5,
    pull: 'Three months on, people still ask where I had it made.',
    full: 'I wore a Vee suit to my daughter\'s wedding. Three months later, guests still ask about the tailor. That is not coincidence — that is craftsmanship of a different order.',
    verified: true,
  },
  {
    name: 'Oluwaseun A.',
    role: 'Operations Director, Manufacturing Firm',
    type: 'Corporate',
    rating: 5,
    pull: 'Every stitch was intentional. Our team is transformed.',
    full: 'Exceptional quality and precision. My corporate blazers arrived perfectly finished — every stitch intentional. Our team\'s presentation has transformed completely.',
    verified: true,
  },
  {
    name: 'Emeka C.',
    role: 'Private Client — Bespoke Commission',
    type: 'Bespoke',
    rating: 5,
    pull: 'They understood my vision without me over-explaining. Rare.',
    full: 'From the first fitting to final delivery — complete attention to detail. They understood my vision without me having to over-explain. Rare craftsmanship in Lagos.',
    verified: true,
  },
];

const Stars = ({ n }: { n: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const SocialProofRibbon = () => {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded]   = useState<number | null>(null);

  const go = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    setExpanded(null);
  }, [active]);

  const prev = () => go(active === 0 ? sentiments.length - 1 : active - 1);
  const next = () => go(active === sentiments.length - 1 ? 0 : active + 1);

  const s = sentiments[active];

  return (
    <section
      id="sentiments"
      style={{ background: 'var(--charcoal)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Review Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Vee Clothing Company',
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '5',
              'reviewCount': sentiments.length.toString(),
              'bestRating': '5',
            },
            'review': sentiments.map(r => ({
              '@type': 'Review',
              'author': { '@type': 'Person', 'name': r.name },
              'reviewBody': r.full,
              'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating.toString(), 'bestRating': '5' },
            })),
          }),
        }}
      />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 4rem' }}>

        {/* ── Section Header ── */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>
            Client Sentiments &amp; Verified Commissions
          </span>
          <div className="gold-divider-center" style={{ marginBottom: 20 }} />
          <h2 className="font-kento" style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
            color: '#D4AF37', lineHeight: 1.15, maxWidth: 700, margin: '0 auto',
          }}>
            The Discerning Choice.
          </h2>
        </div>

        {/* ── Main Carousel Card ── */}
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.18)',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                position: 'relative',
                boxShadow: '0 2px 40px rgba(0,0,0,0.25)',
              }}
            >
              {/* Type + Verified */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span className="font-metro" style={{
                  fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: s.type === 'Corporate' ? '#D4AF37' : 'var(--sky)',
                  padding: '4px 12px',
                  border: `1px solid ${s.type === 'Corporate' ? 'rgba(212,175,55,0.3)' : 'rgba(133,193,233,0.3)'}`,
                }}>
                  {s.type}
                </span>
                {s.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5"/>
                      <path d="M9 12l2 2 4-4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-metro" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(212,175,55,0.55)' }}>
                      GOOGLE VERIFIED
                    </span>
                  </div>
                )}
              </div>

              {/* Stars */}
              <div style={{ marginBottom: 20 }}>
                <Stars n={s.rating} />
              </div>

              {/* Large open-quote */}
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '6rem',
                color: 'rgba(212,175,55,0.12)', lineHeight: 0.5,
                marginBottom: 8, userSelect: 'none',
              }}>&#8220;</div>

              {/* Pull-quote */}
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontStyle: 'italic', fontWeight: 300,
                color: '#fff', lineHeight: 1.5, marginBottom: 16,
              }}>
                {s.pull}
              </p>

              {/* Full text (expandable) */}
              <AnimatePresence>
                {expanded === active && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    style={{
                      color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.8,
                      fontWeight: 300, marginBottom: 16, overflow: 'hidden',
                    }}
                  >
                    {s.full}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={() => setExpanded(expanded === active ? null : active)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 10, letterSpacing: '0.2em', color: 'rgba(212,175,55,0.55)',
                  fontFamily: 'Metrophobic, Inter, sans-serif', textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.55)'; }}
              >
                {expanded === active ? 'Read Less ↑' : 'Read Full Testimonial ↓'}
              </button>

              {/* Author */}
              <div style={{
                marginTop: 28, paddingTop: 20,
                borderTop: '1px solid rgba(212,175,55,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ color: '#fff', fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{s.name}</p>
                  <p className="font-metro" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: '0.06em' }}>
                    {s.role}
                  </p>
                </div>
                <span style={{ fontSize: 24, color: 'rgba(212,175,55,0.1)', fontFamily: 'Cormorant Garamond, serif' }}>"</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 28 }}>
            {[prev, null, next].map((fn, idx) =>
              fn ? (
                <button
                  key={idx}
                  onClick={fn}
                  aria-label={idx === 0 ? 'Previous' : 'Next'}
                  style={{
                    width: 38, height: 38, border: '1px solid rgba(212,175,55,0.25)',
                    background: 'transparent', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', color: '#D4AF37',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {idx === 0
                      ? <path d="M19 12H5M12 19l-7-7 7-7"/>
                      : <path d="M5 12h14M12 5l7 7-7 7"/>}
                  </svg>
                </button>
              ) : (
                <div key="dots" style={{ display: 'flex', gap: 7, flex: 1 }}>
                  {sentiments.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Sentiment ${i + 1}`}
                      style={{
                        width: i === active ? 28 : 6, height: 6,
                        background: i === active ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                        border: 'none', cursor: 'pointer',
                        transition: 'all 0.35s ease', padding: 0,
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          marginTop: '5rem', paddingTop: '3rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem',
        }}>
          {[
            { v: '500+', l: 'Bespoke Commissions' },
            { v: '60+',  l: 'Corporate Partners' },
            { v: '8+',   l: 'Years of Craft' },
            { v: '5.0',  l: 'Average Rating' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p className="font-kento" style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: '#D4AF37',
                lineHeight: 1, marginBottom: 10,
              }}>{s.v}</p>
              <p className="font-metro" style={{
                fontSize: 10, letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
              }}>{s.l}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProofRibbon;
