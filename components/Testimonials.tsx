'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Vee Clothing Company transformed how our executive team presents itself. The attention to detail in every blazer — from the stitching to the brand embossing — was extraordinary. Our clients noticed immediately.",
    author: "Chukwuemeka A.",
    title: "CEO, Lagos-based Financial Group",
    type: "Corporate",
  },
  {
    quote: "I wore a Vee suit to my daughter's wedding. Three months later, people still ask me where I had it made. That is not coincidence — that is craftsmanship.",
    author: "Barrister Rotimi O.",
    title: "Senior Counsel, Abuja",
    type: "Bespoke",
  },
  {
    quote: "We commissioned staff uniforms for 80 of our front-of-house team. The process was seamless and the result exceeded our brand standards entirely. I would not use anyone else.",
    author: "Adaeze M.",
    title: "Director of Operations, Hospitality Group",
    type: "Corporate",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Client Sentiments</span>
          <div className="gold-divider-center my-4" />
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#fff',
              fontWeight: 400,
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.2,
            }}
          >
            Letters of Recommendation.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Type badge */}
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: t.type === 'Corporate' ? '#D4AF37' : 'rgba(133, 193, 233, 0.8)',
                  display: 'block',
                  marginBottom: 16,
                }}
              >
                {t.type}
              </span>

              {/* Gold open quote */}
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '5rem',
                  color: 'rgba(212,175,55,0.2)',
                  lineHeight: 0.6,
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                "
              </span>

              <blockquote
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: 24,
                }}
              >
                {t.quote}
              </blockquote>

              <div style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: 16 }}>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                  {t.author}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.05em' }}>
                  {t.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="mt-16 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Bespoke Commissions' },
              { value: '60+', label: 'Corporate Partners' },
              { value: '8+', label: 'Years of Craft' },
              { value: '100%', label: 'Individual Precision' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '3rem',
                    color: '#D4AF37',
                    fontWeight: 300,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
