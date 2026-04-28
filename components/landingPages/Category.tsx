'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Talk to Us',
    description:
      'A quick chat in Lagos or online to discuss your style and what you need.',
  },
  {
    number: '02',
    title: 'Choosing Fabrics',
    description:
      'We use the best fabrics from around the world and right here at home. Pick the cloth that fits your story.',
  },
  {
    number: '03',
    title: 'Testing the Fit',
    description:
      'We do at least two fittings to make sure everything fits you perfectly. Every detail matters.',
  },
  {
    number: '04',
    title: 'Getting Your Order',
    description:
      'Your clothes arrive ready to wear in our special packaging. It’s as nice as the clothes inside.',
  },
];

const BespokeProcess = () => {
  const whatsappUrl = 'https://wa.me/c/2348103031020';

  return (
    <section className="process-section" id="bespoke">
      <div className="process-inner">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-2">
          <div>
            <span className="section-label">Custom Made</span>
            <div className="gold-divider my-4" />
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                color: '#1C1C1E',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Quality for<br />
              the Individual.
            </h2>
          </div>
          <p
            style={{
              color: '#6B6B6B',
              fontSize: 15,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 420,
            }}
          >
            Custom tailoring is a team effort. From start to finish, we make clothes that fit you perfectly.
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <span className="process-number">{step.number}</span>
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.15rem',
                  color: '#1C1C1E',
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: '#6B6B6B', fontSize: 13, lineHeight: 1.8, fontWeight: 300 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex gap-4 flex-wrap">
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-ghost-gold">
              Start Your Order
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Craft quote */}
        <div
          className="mt-20 p-10 border-l-2"
          style={{ borderColor: '#D4AF37', background: 'rgba(212,175,55,0.04)' }}
        >
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontStyle: 'italic',
              color: '#1C1C1E',
              fontWeight: 300,
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            "World-class quality with a local touch. We mix the best of Lagos style with expert tailoring."
          </blockquote>
          <span className="section-label" style={{ color: '#6B6B6B' }}>
            — Vee Clothing Company, Lagos
          </span>
        </div>

      </div>
    </section>
  );
};

export default BespokeProcess;
