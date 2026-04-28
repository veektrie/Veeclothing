'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Custom Uniforms',
    description:
      'We make high-quality uniforms that show your brand style and keep your team looking professional.',
    tag: 'Business Clothes',
  },
  {
    number: '02',
    title: 'Executive Wear',
    description:
      'Special clothes for leaders. From meetings to big events, we help you look your best.',
    tag: 'Private Service',
  },
  {
    number: '03',
    title: 'Business Gifts',
    description:
      'Custom blazers, gifts, and more to reward your team or thank your clients.',
    tag: 'Branded Gifting',
  },
  {
    number: '04',
    title: 'Style Advice',
    description:
      'We help you pick the right fabrics, colors, and styles that match your brand perfectly.',
    tag: 'Identity Strategy',
  },
];

const corporate = [
  { name: 'Banks & Finance', description: 'Custom suits and uniforms for bank staff in Lagos and Abuja.' },
  { name: 'Hotels & Restaurants', description: 'Stylish uniforms for hotels and restaurants.' },
  { name: 'Energy Companies', description: 'Professional clothes for Nigeria\'s top energy firms.' },
  { name: 'Tech & Media', description: 'Modern clothes for creative and tech teams.' },
];

const CorporateAtelier = () => {
  return (
    <section className="atelier-section" id="corporate">
      <div className="atelier-inner">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div>
            <span className="section-label">Our Business Services</span>
            <div className="gold-divider my-4" />
            <h2
              className="hero-title"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                color: '#fff',
                maxWidth: 560,
              }}
            >
              We Create the Look for Businesses.
            </h2>
          </div>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              maxWidth: 340,
              lineHeight: 1.8,
              fontWeight: 300,
              flexShrink: 0,
            }}
          >
            From a single leader to a team of 500 — we provide quality clothes for businesses of any size.
          </p>
        </div>

        {/* Service Cards */}
        <div 
          className="atelier-grid mt-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '2.5rem',
                borderRadius: 24,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '3rem',
                    fontWeight: 300,
                    color: 'rgba(212,175,55,0.4)',
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    background: 'rgba(212, 175, 55, 0.08)',
                    padding: '6px 12px',
                    borderRadius: 4,
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.6rem',
                  color: '#fff',
                  fontWeight: 400,
                  marginBottom: 14,
                  letterSpacing: '0.02em'
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.8, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Corporate Clients Banner */}
        <div
          className="mt-16 p-8"
          style={{
            background: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.7)',
              marginBottom: '1.5rem',
            }}
          >
            Industries We Serve
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {corporate.map((c) => (
              <div key={c.name}>
                <p style={{ color: '#fff', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>{c.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, lineHeight: 1.6 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="#consultation">
            <button className="btn-solid-gold">
              Partner With Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CorporateAtelier;