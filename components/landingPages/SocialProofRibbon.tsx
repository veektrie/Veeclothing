'use client';
import React from 'react';
import { motion } from 'framer-motion';

const sentiments = [
  {
    name: 'Chukwuemeka A.',
    role: 'CEO, Financial Group',
    pull: '"The new branding improved our team\'s look."',
    full: 'Vee Clothing changed how our team looks. The quality of every blazer, from the stitching to the logo, is great.',
  },
  {
    name: 'Barrister Rotimi O.',
    role: 'Senior Counsel',
    pull: '"Three months on, people still ask where I had it made."',
    full: 'I wore a Vee suit to my daughter\'s wedding. Three months later, guests still ask about the tailor. That is because the quality is so good.',
  },
  {
    name: 'Oluwaseun A.',
    role: 'Operations Director',
    pull: '"Every stitch was intentional. Our team is transformed."',
    full: 'Great quality and detail. My blazers look perfect. Our team looks much better now.',
  },
];

const SocialProofRibbon = () => {
  return (
    <section
      id="sentiments"
      style={{ background: 'var(--navy)', padding: 'clamp(3rem, 6vw, 6rem) 0', position: 'relative' }}
    >
      {/* Review Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Vee Clothing Company',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: sentiments.length.toString(),
              bestRating: '5',
            },
            review: sentiments.map((r) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.name },
              reviewBody: r.full,
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            })),
          }),
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 2rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <span style={{
            fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#D4AF37', display: 'block', marginBottom: 12, fontFamily: 'Inter, sans-serif'
          }}>
            Client Reviews
          </span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#fff', fontWeight: 300, lineHeight: 1.2
          }}>
            What Our Clients Say
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
        }}>
          {sentiments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{
                borderLeft: '1px solid rgba(212,175,55,0.3)',
                paddingLeft: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((_, star) => (
                  <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem',
                color: '#fff', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.4
              }}>
                 {s.pull}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 20
              }}>
                {s.full}
              </p>
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11,
                  color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 600, marginBottom: 4
                }}>
                  {s.name}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 10,
                  color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {s.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofRibbon;
