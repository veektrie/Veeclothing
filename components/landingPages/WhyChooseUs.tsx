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
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 999,
        padding: '12px 0',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      }}>
        {/* Fade masks */}
        <div className="hidden md:block" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(248,250,252,1), transparent)' }} />
        <div className="hidden md:block" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, rgba(248,250,252,1), transparent)' }} />
        
        {/* Trusted label - Responsive: Hide label on very small screens or make it smaller */}
        <div style={{ 
          position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 20, 
          display: 'flex', alignItems: 'center', paddingLeft: 'clamp(12px, 4vw, 32px)', 
          background: 'linear-gradient(to right, rgba(248,250,252,0.98) 80%, transparent)' 
        }}>
          <span style={{ fontSize: 8, letterSpacing: '0.2em', color: '#1A5276', fontFamily: 'Inter, sans-serif', fontWeight: 900, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            Trusted By
          </span>
        </div>

        {/* Marquee */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', paddingLeft: 140, width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((client, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 25px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ width: 28, height: 28, position: 'relative', filter: 'grayscale(100%) opacity(0.5)', borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="28px" />
              </div>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', color: 'rgba(28,28,30,0.55)', whiteSpace: 'nowrap' }}>
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const TeamAvatars = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '24px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {['#1A5276', '#154360', '#1F618D', '#2980B9', '#1A3A5C'].map((color, i) => (
        <div key={i} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: color, border: '3px solid #F8FAFC',
          marginLeft: i === 0 ? 0 : -12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5 - i,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      ))}
    </div>
    <p style={{ fontSize: 11, color: 'rgba(26,82,118,0.6)', textAlign: 'center', letterSpacing: '0.05em', margin: 0 }}>
      Your dedicated atelier team
    </p>
  </div>
);

const ChatMockup = () => (
  <div style={{ width: '100%', maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
    <div style={{
      padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
      background: 'rgba(26,82,118,0.08)', border: '1px solid rgba(26,82,118,0.12)',
      fontSize: 12, color: '#1C1C1E', lineHeight: 1.4, alignSelf: 'flex-start',
    }}>
      Your fabric samples are ready ✓
    </div>
    <div style={{
      padding: '10px 14px', borderRadius: '16px 16px 4px 16px',
      background: '#1A5276', fontSize: 12, color: 'white',
      lineHeight: 1.4, alignSelf: 'flex-end',
    }}>
      Perfect, see you then! 🤝
    </div>
  </div>
);

const MetricMockup = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '12px 0' }}>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: '#1A5276' }}>98%</span>
    <span style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginBottom: 12 }}>Satisfaction rate</span>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
      {[40, 52, 45, 68, 60, 78, 88].map((h, i) => (
        <div key={i} style={{
          width: 18, height: `${h * 0.5}px`,
          background: i === 6 ? '#1A5276' : '#1A5276',
          opacity: i === 6 ? 1 : 0.25 + i * 0.1,
          borderRadius: '4px 4px 0 0',
          transition: 'all 0.3s ease'
        }} />
      ))}
    </div>
  </div>
);

const ProcessMockup = () => (
  <div style={{ width: '100%', maxWidth: 200, display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 0' }}>
    {[
      { label: 'Consultation', done: true },
      { label: 'Fabric Selection', done: true },
      { label: 'First Fitting', done: true },
      { label: 'Final Delivery', done: false },
    ].map((step, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
          background: step.done ? '#1A5276' : 'transparent',
          border: step.done ? 'none' : '1.5px solid rgba(26,82,118,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {step.done && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span style={{
          fontSize: 12, fontWeight: step.done ? 600 : 400,
          color: step.done ? '#1C1C1E' : '#94a3b8',
        }}>{step.label}</span>
      </div>
    ))}
  </div>
);

const TimelineMockup = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '16px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
      {['Consult', 'Fabrics', 'Fittings', 'Delivery'].map((label, i, arr) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            padding: '5px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
            whiteSpace: 'nowrap',
            background: i < 3 ? 'rgba(26,82,118,0.12)' : 'transparent',
            color: i < 3 ? '#1A5276' : '#94a3b8',
            border: `1px solid ${i < 3 ? 'rgba(26,82,118,0.2)' : 'rgba(0,0,0,0.08)'}`,
          }}>{label}</div>
          {i < arr.length - 1 && (
            <div style={{ width: 12, height: 1, background: 'rgba(26,82,118,0.2)' }} />
          )}
        </div>
      ))}
    </div>
  </div>
);

const cards = [
  { Visual: TeamAvatars, title: 'Personalized Support', desc: 'Work with a dedicated atelier team who understand your style goals.', cols: 1 },
  { Visual: ChatMockup, title: 'With You Every Step', desc: 'Continuous guidance from first consultation to post-delivery adjustments.', cols: 1 },
  { Visual: MetricMockup, title: 'Measurable Excellence', desc: '30-point measurement protocol ensures a mathematically perfect fit.', cols: 1 },
  { Visual: ProcessMockup, title: 'Future-Ready Wardrobe', desc: 'Longevity-focused design — your garments remain assets for decades.', cols: 1 },
  { Visual: TimelineMockup, title: 'Transparent Process', desc: "Clear timelines, regular updates, and zero surprises throughout the process.", cols: 2 },
];

export default function WhyChooseUs() {
  return (
    <section style={{ background: '#F8FAFC', padding: 'clamp(60px, 10vw, 100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)' }}>

        {/* Floating Trust Bar */}
        <FloatingTrustBar />

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 72px)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#1C1C1E', margin: '0 auto', textAlign: 'center'
          }}>
            Why Professionals <br />
            <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Choose Vee Clothing</em>
          </h2>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const { Visual } = card;
            return (
              <motion.div
                key={card.title}
                className={`${card.cols === 2 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'}`}
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(26,82,118,0.08)',
                  borderColor: 'rgba(26,82,118,0.2)',
                }}
              >
                {/* Visual illustration area */}
                <div style={{
                  background: '#F8FAFC',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '20px', minHeight: 160,
                }}>
                  <Visual />
                </div>

                {/* Text area */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '1rem',
                    fontWeight: 700, color: '#1C1C1E', marginBottom: 8,
                    letterSpacing: '-0.02em',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
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
