'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'The Consultation',
    description:
      'A private session — in-person in Lagos or virtually — where we understand your lifestyle, occasion, and vision.',
  },
  {
    number: '02',
    title: 'Fabric Curation',
    description:
      'We source from the finest mills globally and locally. Holland & Sherry wools, Ghanaian kente, and premium Nigerian Adire — your story, your cloth.',
  },
  {
    number: '03',
    title: 'The Fitting',
    description:
      'Minimum two fittings. We sculpt the garment to your body — not the other way around. Every seam is intentional.',
  },
  {
    number: '04',
    title: 'The Delivery',
    description:
      'Your garment arrives pristine, pressed, and housed in our signature packaging. A keepsake as refined as the garment within.',
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
            <span className="section-label">Private Commissions</span>
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
              Excellence for<br />
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
            Bespoke tailoring is not a service; it is a collaboration. From the first stitch to the final press, we build garments that are uniquely, irrevocably yours.
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
              Begin Your Commission
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
            "Global Standards. Local Soul. Every garment is a handshake between the craft traditions of Lagos and the precision of Savile Row."
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
