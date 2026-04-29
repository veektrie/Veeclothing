'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'corporate' | 'bespoke';

const faqs = {
  corporate: [
    {
      q: 'What is the minimum order size for corporate uniforms?',
      a: 'We take orders from 5 to 500+ items. Every order gets the same high quality. We offer better prices for more than 50 items.',
    },
    {
      q: 'How do you ensure brand consistency across a large team?',
      a: 'We meet with you first to match your brand. We check colors, logos, and fabrics to make sure every item looks exactly like your sample.',
    },
    {
      q: 'What is the typical turnaround time for corporate orders?',
      a: 'Corporate orders take at least 10 working days. Large orders (50+) take up to 15 days. We can finish faster if you\'re in a hurry for an extra fee. We arrange fittings in Lagos and Abuja.',
    },
    {
      q: 'Do you offer corporate gifting services?',
      a: 'Yes. We make custom blazers, gifts, and more in nice boxes to reward your team or thank your clients.',
    },
    {
      q: 'Can you visit our office for fittings?',
      a: 'Yes. For orders of 50 or more, we can visit your office in Lagos or Abuja for fittings. We can also meet online if you are outside Nigeria.',
    },
  ],
  bespoke: [
    {
      q: 'How does the bespoke commission process work?',
      a: 'We start with a chat in Lagos or online. We discuss your style and what you need. Then we pick fabrics, do at least two fittings, and deliver your finished clothes.',
    },
    {
      q: 'How long does a bespoke garment take to complete?',
      a: 'Custom suits, kaftans, or agbadas take at least 10 working days. We might be able to finish faster if you have a tight deadline.',
    },
    {
      q: 'What fabrics do you work with?',
      a: 'We use high-quality fabrics from around the world and Nigeria, like UK wools, Italian linen, and local Adire or Kente.',
    },
    {
      q: 'Can I see fabric samples before committing?',
      a: 'During our meeting, we show you a range of fabrics chosen for you. You can see and feel them before you decide.',
    },
    {
      q: 'Do you offer alterations on existing garments?',
      a: 'We only fix clothes made by us. For new clients, we suggest starting with a new order to ensure the best quality.',
    },
  ],
};

const FAQSection = () => {
  const [tab, setTab] = useState<Tab>('corporate');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: 'var(--cream)', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Header - Centered */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>

          <h2 className="font-kento" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            color: 'var(--charcoal)', 
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.12,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Common Questions.
          </h2>
          <p className="font-metro" style={{
            color: 'var(--stone)', fontSize: 15, lineHeight: 1.8,
            fontWeight: 400, maxWidth: 600, margin: '0 auto'
          }}>
            We've answered the most common questions from our clients below.
          </p>
        </div>

        {/* Tab toggle - Centered */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center border border-[#1A5276]/20 p-1 bg-white/50 backdrop-blur-md rounded-xl gap-1">
            {(['corporate', 'bespoke'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setOpenIdx(0); }}
                className={`px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-lg whitespace-nowrap ${
                  tab === t ? 'bg-[#1A5276] text-white shadow-lg' : 'text-[#1A5276]/40 hover:text-[#1A5276]/60'
                }`}
              >
                {t === 'corporate' ? 'Corporate' : 'Individual'}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion - Centered */}
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
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
                      border: '1px solid rgba(26, 82, 118, 0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#1A5276', transition: 'transform 0.35s ease',
                      borderRadius: 4,
                      transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
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
                          paddingBottom: '1.4rem', borderLeft: '2px solid #1A5276',
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

        {/* Bottom CTA - Centered */}
        <div style={{ marginTop: '4.5rem', textAlign: 'center' }}>
          <p className="font-metro" style={{ color: 'var(--stone)', fontSize: 13, marginBottom: 18 }}>
            Don't see your question? Our team responds to all inquiries within 24 hours.
          </p>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="btn-solid-navy" style={{ 
              margin: '0 auto', 
              fontFamily: 'Inter, sans-serif', 
              fontSize: 10, 
              color: '#FFFFFF', 
              background: '#1A5276',
              border: 'none', 
              padding: '14px 36px', 
              borderRadius: '999px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              justifyContent: 'center',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 10px 20px rgba(26, 82, 118, 0.2)'
            }}>
              Ask a Question
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
