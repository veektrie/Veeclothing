'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Talk to Us',
    description:
      'A quick chat in Lagos or online to discuss your style and what you need.',
    tag: 'Consultation',
  },
  {
    number: '02',
    title: 'Choosing Fabrics',
    description:
      'We use the best fabrics from around the world and right here at home. Pick the cloth that fits your story.',
    tag: 'Curation',
  },
  {
    number: '03',
    title: 'Testing the Fit',
    description:
      'We do at least two fittings to make sure everything fits you perfectly. Every detail matters.',
    tag: 'Precision',
  },
  {
    number: '04',
    title: 'Getting Your Order',
    description:
      'Your clothes arrive ready to wear in our special packaging. It’s as nice as the clothes inside.',
    tag: 'Delivery',
  },
];

const BespokeProcess = () => {
  const whatsappUrl = 'https://wa.me/c/2348103031020';

  return (
    <section className="atelier-section" id="bespoke">
      <div className="atelier-inner">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div>
            <span className="section-label">Custom Made</span>
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
              Quality for the Individual.
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
            Custom tailoring is a team effort. From start to finish, we make clothes that fit you perfectly.
          </p>
        </div>

        {/* Step Cards */}
        <div 
          className="atelier-grid mt-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {steps.map((s, i) => (
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

        {/* CTA */}
        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-solid-gold">
              Start Your Order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Craft quote */}
        <div
          className="mt-20 p-10 border-l-2"
          style={{ borderColor: '#D4AF37', background: 'rgba(212,175,55,0.06)' }}
        >
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontStyle: 'italic',
              color: '#fff',
              fontWeight: 300,
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            "World-class quality with a local touch. We mix the best of Lagos style with expert tailoring."
          </blockquote>
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
            — Vee Clothing Company, Lagos
          </span>
        </div>

      </div>
    </section>
  );
};

export default BespokeProcess;
