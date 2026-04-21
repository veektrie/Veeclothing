'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'corporate' | 'bespoke';

const faqs = {
  corporate: [
    {
      q: 'What is the minimum order size for corporate uniforms?',
      a: 'We accommodate orders from as few as 5 garments up to 500+. Each order — regardless of size — receives the same precision and quality assurance. Volume pricing is available for orders exceeding 50 units.',
    },
    {
      q: 'How do you ensure brand consistency across a large team?',
      a: 'We conduct a Brand Alignment session before any production begins. Your approved colour codes, logo placements, and fabric specifications are documented and signed off, ensuring every garment in the order is identical to the approved sample.',
    },
    {
      q: 'What is the typical turnaround time for corporate orders?',
      a: 'All corporate uniform orders are completed within a minimum of 10 working days. Bulk orders of 50+ units may require up to 15 working days. Rush production is available for urgent events at an additional surcharge. On-site fittings in Lagos and Abuja are arranged before production begins.',
    },
    {
      q: 'Do you offer corporate gifting services?',
      a: 'Yes. We design and produce bespoke branded apparel — executive blazers, accessories, and premium items — packaged in our signature presentation boxes for employee recognition programmes and high-value client gifting.',
    },
    {
      q: 'Can you visit our office for fittings?',
      a: 'Absolutely. For corporate orders of 20+ staff, we offer on-site fitting sessions at your Lagos or Abuja office. We bring our full measurement team and fabric swatches. Virtual consultations are also available for clients outside Nigeria.',
    },
  ],
  bespoke: [
    {
      q: 'How does the bespoke commission process work?',
      a: 'It begins with a private consultation — in-person in Lagos or virtually. We discuss your occasion, lifestyle, and aesthetic. From there, we curate fabric options, conduct a minimum of two fittings, and deliver a complete, hand-finished garment.',
    },
    {
      q: 'How long does a bespoke garment take to complete?',
      a: 'A bespoke commission — suit, kaftan, or agbada — is completed within a minimum of 10 working days from the consultation. Rushed commissions for imminent occasions may be accommodated depending on our current schedule.',
    },
    {
      q: 'What fabrics do you work with?',
      a: 'We source from premium mills globally: Holland & Sherry wools from the UK, Italian linen and silk blends, and the finest locally sourced Nigerian Adire, kente, and ankara — depending on the garment and the client\'s vision.',
    },
    {
      q: 'Can I see fabric samples before committing?',
      a: 'Yes. At the consultation, we present a curated fabric board tailored to your occasion and preference. We encourage clients to touch, feel, and compare before any decision is made.',
    },
    {
      q: 'Do you offer alterations on existing garments?',
      a: 'We offer alterations exclusively for garments originally commissioned through Vee Clothing Company. For new clients, we recommend beginning with a fresh commission to ensure the garment meets our quality standards from the first stitch.',
    },
  ],
};

const FAQSection = () => {
  const [tab, setTab]       = useState<Tab>('corporate');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: 'var(--cream)', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-16">
          <div>
            <span className="section-label">Common Questions</span>
            <div className="gold-divider" style={{ margin: '14px 0 20px' }} />
            <h2 className="font-kento" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'var(--charcoal)', lineHeight: 1.12,
            }}>
              Frequently Asked.
            </h2>
          </div>
          <p className="font-metro" style={{
            color: 'var(--stone)', fontSize: 15, lineHeight: 1.8,
            fontWeight: 400, maxWidth: 420,
          }}>
            High-value decisions deserve clear answers. We address the questions our corporate and individual clients ask most before beginning a commission.
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{
          display: 'inline-flex', marginBottom: '3rem',
          border: '1px solid rgba(212,175,55,0.25)', padding: 3,
          background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)',
          borderRadius: 8,
        }}>
          {(['corporate', 'bespoke'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setOpenIdx(0); }}
              className="font-metro"
              style={{
                padding: '10px 28px', fontSize: 10, letterSpacing: '0.25em',
                textTransform: 'uppercase', cursor: 'pointer',
                color: tab === t ? 'var(--charcoal)' : 'rgba(28,28,30,0.4)',
                background: tab === t ? '#D4AF37' : 'transparent',
                border: 'none', transition: 'all 0.35s ease',
                fontWeight: tab === t ? 500 : 400,
                borderRadius: 6,
              }}
            >
              {t === 'corporate' ? 'Corporate Clients' : 'Individual Clients'}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ maxWidth: 820 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {faqs[tab].map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(28,28,30,0.1)',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: 16,
                      padding: '1.4rem 0', background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Playfair Display, serif', fontSize: 16,
                      fontWeight: 500, color: 'var(--charcoal)',
                      lineHeight: 1.4, flex: 1,
                    }}>
                      {faq.q}
                    </span>
                    <span style={{
                      width: 28, height: 28, flexShrink: 0,
                      border: '1px solid rgba(212,175,55,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#D4AF37', transition: 'transform 0.35s ease',
                      borderRadius: 4,
                      transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-metro" style={{
                          color: 'var(--stone)', fontSize: 14.5, lineHeight: 1.85,
                          paddingBottom: '1.4rem', borderLeft: '2px solid #D4AF37',
                          paddingLeft: '1rem', marginLeft: 2,
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '3.5rem' }}>
          <p className="font-metro" style={{ color: 'var(--stone)', fontSize: 13, marginBottom: 14 }}>
            Don't see your question? Our team responds to all enquiries within 24 hours.
          </p>
          <a href="#consultation" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost-gold" style={{ fontFamily: 'Metrophobic, Inter, sans-serif', fontSize: 10 }}>
              Ask a Question
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
