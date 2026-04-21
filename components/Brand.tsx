'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Uniform Engineering',
    description:
      'We design and produce precision-branded uniforms that communicate hierarchy, professionalism, and brand cohesion across your entire organisation.',
    tag: 'Corporate Identity',
  },
  {
    number: '02',
    title: 'Executive Wardrobe',
    description:
      'A private wardrobe service for C-suite executives. From boardroom to formal events — we ensure your leadership projects the right authority.',
    tag: 'Private Service',
  },
  {
    number: '03',
    title: 'Corporate Gifting',
    description:
      'Bespoke branded blazers, accessories, and premium apparel for employee recognition programmes and high-value client gifts.',
    tag: 'Branded Gifting',
  },
  {
    number: '04',
    title: 'Brand Consultation',
    description:
      'A full audit of your organisation\'s visual identity in apparel. We align fabric choice, colour psychology, and silhouette to your brand guidelines.',
    tag: 'Identity Strategy',
  },
];

const corporate = [
  { name: 'Financial Institutions', description: 'Precision-tailored uniforms for banking professionals across Lagos & Abuja.' },
  { name: 'Hospitality Groups', description: 'Elegantly branded staff wear for 5-star hotel and restaurant groups.' },
  { name: 'Oil & Gas Sector', description: 'Executive corporate wear for Nigeria\'s leading energy organisations.' },
  { name: 'Tech & Media Houses', description: 'Contemporary branded apparel for modern, image-conscious corporations.' },
];

const CorporateAtelier = () => {
  return (
    <section className="atelier-section" id="corporate">
      <div className="atelier-inner">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div>
            <span className="section-label">Corporate Atelier</span>
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
              We Engineer the Visual Identity of Institutions.
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
            From a single executive to an organisation of 500 — our corporate solutions are built for scale without sacrificing precision.
          </p>
        </div>

        {/* Service Cards */}
        <div className="atelier-grid mt-12">
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              className="atelier-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '3rem',
                    fontWeight: 300,
                    color: 'rgba(212,175,55,0.3)',
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.7)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    padding: '3px 10px',
                    marginTop: 6,
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.3rem',
                  color: '#fff',
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.8, fontWeight: 300 }}>
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
            Sectors We've Served
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
              Request Corporate Partnership
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