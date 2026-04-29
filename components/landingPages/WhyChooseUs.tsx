'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: 'The Deltan Queen', logo: '/brand01.png' },
  { name: 'The Design Studio', logo: '/brand04.jpeg' },
  { name: 'Top Model of Delta', logo: '/brand05.jpeg' },
  { name: '9ce Photography', logo: '/brand06.jpeg' },
  { name: 'Food Box Nigeria', logo: '/brand02.jpg' },
  { name: '6Gadget', logo: '/brand03.jpg' },
];

const FloatingTrustBar = () => {
  const doubled = [...clients, ...clients];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 80 }}>
      <div style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 999,
        padding: '16px 0',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      }}>
        {/* Fade masks */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 160, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(248,250,252,1), transparent)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 160, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, rgba(248,250,252,1), transparent)' }} />
        {/* Trusted label */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 20, display: 'flex', alignItems: 'center', paddingLeft: 32, background: 'linear-gradient(to right, rgba(248,250,252,0.98) 80%, transparent)' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.3em', color: '#1A5276', fontFamily: 'Inter, sans-serif', fontWeight: 900, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            Trusted By
          </span>
        </div>
        {/* Marquee */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', paddingLeft: 180, width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((client, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 40px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ width: 36, height: 36, position: 'relative', filter: 'grayscale(100%) opacity(0.5)', borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="36px" />
              </div>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.05em', color: 'rgba(28,28,30,0.55)', whiteSpace: 'nowrap' }}>
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Inline visual mockups ─────────────────────────────────────────────────── */

const TeamAvatars = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {['#1A5276', '#10B981', '#2E86C1', '#0D5E4B', '#1A3A5C'].map((color, i) => (
        <div key={i} style={{
          width: 52, height: 52, borderRadius: '50%',
          background: color, border: '3px solid #F8FAFC',
          marginLeft: i === 0 ? 0 : -14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5 - i,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      ))}
    </div>
    <p style={{ fontSize: 12, color: 'rgba(26,82,118,0.6)', textAlign: 'center', letterSpacing: '0.05em', margin: 0 }}>
      Your dedicated atelier team
    </p>
  </div>
);

const ChatMockup = () => (
  <div style={{ width: '100%', maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 0' }}>
    <div style={{
      padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
      background: 'rgba(26,82,118,0.08)', border: '1px solid rgba(26,82,118,0.12)',
      fontSize: 13, color: '#1C1C1E', lineHeight: 1.5, alignSelf: 'flex-start',
    }}>
      Your fabric samples are ready ✓
    </div>
    <div style={{
      padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
      background: 'rgba(26,82,118,0.08)', border: '1px solid rgba(26,82,118,0.12)',
      fontSize: 13, color: '#1C1C1E', lineHeight: 1.5, alignSelf: 'flex-start',
    }}>
      First fitting confirmed for Friday.
    </div>
    <div style={{
      padding: '12px 16px', borderRadius: '18px 18px 4px 18px',
      background: '#1A5276', fontSize: 13, color: 'white',
      lineHeight: 1.5, alignSelf: 'flex-end',
    }}>
      Perfect, see you then! 🤝
    </div>
  </div>
);

const MetricMockup = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 0' }}>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.05em', color: '#1A5276' }}>98%</span>
    <span style={{ fontSize: 12, color: '#64748b', textAlign: 'center', marginBottom: 16 }}>Client satisfaction rate</span>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}>
      {[50, 62, 55, 78, 70, 88, 98].map((h, i) => (
        <div key={i} style={{
          width: 22, height: `${h * 0.65}px`,
          background: i === 6 ? '#10B981' : '#1A5276',
          opacity: i === 6 ? 1 : 0.25 + i * 0.1,
          borderRadius: '5px 5px 0 0',
          transition: 'all 0.3s ease'
        }} />
      ))}
    </div>
  </div>
);

const ProcessMockup = () => (
  <div style={{ width: '100%', maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 14, padding: '20px 0' }}>
    {[
      { label: 'Consultation', done: true },
      { label: 'Fabric Selection', done: true },
      { label: 'First Fitting', done: true },
      { label: 'Final Delivery', done: false },
    ].map((step, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          background: step.done ? '#1A5276' : 'transparent',
          border: step.done ? 'none' : '2px solid rgba(26,82,118,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {step.done && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span style={{
          fontSize: 13, fontWeight: step.done ? 600 : 400,
          color: step.done ? '#1C1C1E' : '#94a3b8',
        }}>{step.label}</span>
      </div>
    ))}
  </div>
);

const TimelineMockup = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '24px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 6 }}>
      {['Initial Chat', 'Fabrics', 'Fitting 1', 'Fitting 2', 'Delivery'].map((label, i, arr) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 'fit-content' }}>
          <div style={{
            padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
            whiteSpace: 'nowrap',
            background: i < 4 ? 'rgba(26,82,118,0.12)' : 'transparent',
            color: i < 4 ? '#1A5276' : '#94a3b8',
            border: `1px solid ${i < 4 ? 'rgba(26,82,118,0.25)' : 'rgba(0,0,0,0.08)'}`,
          }}>{label}</div>
          {i < arr.length - 1 && (
            <div style={{ flex: 1, height: 1, background: 'rgba(26,82,118,0.2)', minWidth: 8 }} />
          )}
        </div>
      ))}
    </div>
    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Every step, visible to you</p>
  </div>
);

/* ─── Card data ──────────────────────────────────────────────────────────────── */
const cards = [
  { Visual: TeamAvatars, title: 'Personalized Support', desc: 'Work with a dedicated atelier team who understand your style and business goals.', cols: 1 },
  { Visual: ChatMockup, title: 'With You Every Step', desc: 'We stay with you from the first consultation to post-delivery adjustments.', cols: 1 },
  { Visual: MetricMockup, title: 'Measurable Excellence', desc: 'Our 30-point measurement protocol ensures a mathematically perfect fit, every time.', cols: 1 },
  { Visual: ProcessMockup, title: 'Future-Ready Wardrobe', desc: 'We design with longevity — your wardrobe remains a powerful asset for decades.', cols: 1 },
  { Visual: TimelineMockup, title: 'Transparent Process', desc: "You'll always know what's happening. Clear timelines, regular updates, zero surprises.", cols: 2 },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  return (
    <section style={{ background: '#F8FAFC', padding: '60px 0 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Floating Trust Bar */}
        <FloatingTrustBar />

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 72 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1C1E',
            border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999,
            padding: '8px 20px', marginBottom: 24,
          }}>
            Why Vee Clothing
          </span>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#1C1C1E', margin: 0,
          }}>
            Why Professionals <br />
            <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Choose Vee Clothing</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {cards.map((card, i) => {
            const { Visual } = card;
            return (
              <motion.div
                key={card.title}
                style={{
                  gridColumn: `span ${card.cols}`,
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 28,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{
                  scale: 1.025,
                  boxShadow: '0 20px 60px rgba(26,82,118,0.12)',
                  borderColor: 'rgba(26,82,118,0.3)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                {/* Visual illustration area */}
                <div style={{
                  background: '#F8FAFC',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '8px 32px', minHeight: 200,
                }}>
                  <Visual />
                </div>

                {/* Text area */}
                <div style={{ padding: '28px 32px 32px' }}>
                  <h3 style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '1.15rem',
                    fontWeight: 700, color: '#1C1C1E', marginBottom: 10,
                    letterSpacing: '-0.02em',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
