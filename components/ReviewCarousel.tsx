'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// White-labelled review data — replace with live Google API data when ready
const reviews = [
  {
    name: 'Oluwaseun A.',
    rating: 5,
    text: "Exceptional quality and precision. My corporate blazers arrived perfectly finished — every stitch intentional. Our team's presentation has transformed completely.",
    role: 'Operations Director',
    type: 'Corporate',
    date: '2 weeks ago',
  },
  {
    name: 'Emeka C.',
    rating: 5,
    text: 'I had my wedding suit made here. Three months later I still receive compliments. This is not tailoring — it is artistry. Will not go anywhere else.',
    role: 'Private Client',
    type: 'Bespoke',
    date: '1 month ago',
  },
  {
    name: 'Adaeze N.',
    rating: 5,
    text: 'We commissioned uniforms for 60 staff members. The process was seamless, professional, and the results exceeded our brand standards. Outstanding work.',
    role: 'Brand Manager',
    type: 'Corporate',
    date: '3 weeks ago',
  },
  {
    name: 'Rotimi B.',
    rating: 5,
    text: 'From the first fitting to delivery — complete attention to detail. They understood my vision without me having to over-explain. Rare craftsmanship.',
    role: 'Legal Counsel',
    type: 'Bespoke',
    date: '5 weeks ago',
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => goTo(current === 0 ? reviews.length - 1 : current - 1);
  const next = () => goTo(current === reviews.length - 1 ? 0 : current + 1);

  return (
    <section
      style={{
        background: 'rgba(26,82,118,0.08)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(212,175,55,0.1)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-label">Verified Reviews</span>
            <div className="gold-divider" style={{ marginTop: 12, marginBottom: 12 }} />
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              color: '#1C1C1E',
              fontWeight: 400,
              lineHeight: 1.1,
            }}>
              What Our Clients Say.
            </h2>
          </div>

          {/* Verified badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              background: 'rgba(26,82,118,0.08)',
              border: '1px solid rgba(26,82,118,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#1A5276" strokeWidth="1.5"/>
              <path d="M9 12l2 2 4-4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A5276', fontFamily: 'Inter, sans-serif' }}>
              Google Verified Business
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', minHeight: 240 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,175,55,0.18)',
                padding: '2.5rem 3rem',
                maxWidth: 720,
              }}
            >
              <StarRating count={reviews[current].rating} />

              {/* Type badge */}
              <span style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: reviews[current].type === 'Corporate' ? '#1A5276' : '#D4AF37',
                display: 'block',
                marginBottom: 12,
                fontFamily: 'Inter, sans-serif',
              }}>
                {reviews[current].type}
              </span>

              <blockquote style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.35rem',
                fontStyle: 'italic',
                color: '#1C1C1E',
                lineHeight: 1.65,
                fontWeight: 300,
                marginBottom: 24,
              }}>
                "{reviews[current].text}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#1C1C1E', marginBottom: 2 }}>
                    {reviews[current].name}
                  </p>
                  <p style={{ fontSize: 11, color: '#6B6B6B', letterSpacing: '0.05em' }}>
                    {reviews[current].role}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(28,28,30,0.35)', letterSpacing: '0.08em' }}>
                  {reviews[current].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
            <button
              onClick={prev}
              aria-label="Previous review"
              style={{
                width: 40, height: 40,
                border: '1px solid rgba(212,175,55,0.3)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#D4AF37',
              }}
              onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(212,175,55,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget).style.background = 'transparent'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 8 }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    background: i === current ? '#D4AF37' : 'rgba(212,175,55,0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              style={{
                width: 40, height: 40,
                border: '1px solid rgba(212,175,55,0.3)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#D4AF37',
              }}
              onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(212,175,55,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget).style.background = 'transparent'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewCarousel;
