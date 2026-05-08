'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
  { name: 'The Deltan Queen', logo: '/brand01.png' },
  { name: 'The Design Studio', logo: '/brand04.jpeg' },
  { name: 'Top Model of Delta', logo: '/brand05.jpeg' },
  { name: '9ce Photography', logo: '/brand06.jpeg' },
  { name: 'Food Box Nigeria', logo: '/brand02.jpg' },
  { name: '6Gadget', logo: '/brand03.jpg' },
];

const TrustBar = () => {
  const doubled = [...clients, ...clients];

  return (
    <div
      className="trust-bar-wrapper"
      style={{
        padding: '20px 0 80px 0',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Outer pill — flex row, NO overflow:hidden so label stays fixed */}
      <div
        className="trust-bar-pill"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          width: '95%',
          maxWidth: '1400px',
          borderRadius: '999px',
          border: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          boxShadow: '0 30px 70px -15px rgba(0,0,0,0.05)',
          overflow: 'hidden',        /* clip the whole pill to the border-radius */
        }}
      >
        {/* ── LEFT: "Trusted By" label — fixed, never scrolls ── */}
        <div
          className="trust-bar-label-cell"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '18px clamp(1rem, 3vw, 2rem)',
            borderRight: '1px solid rgba(26,82,118,0.15)',
            background: 'inherit',
            zIndex: 2,
          }}
        >
          <span style={{
            fontSize: 'clamp(7px, 1.5vw, 8px)',
            letterSpacing: '0.3em',
            color: '#1A5276',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}>
            Trusted By
          </span>
        </div>

        {/* ── RIGHT: scrolling marquee — overflow:hidden here only ── */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Right fade mask */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0,
            width: 'clamp(40px, 8vw, 120px)', zIndex: 10, pointerEvents: 'none',
            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, transparent)',
          }} />

          {/* Marquee track */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'max-content',
              height: '100%',
            }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {doubled.map((client, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(10px, 2vw, 20px)',
                  padding: '18px clamp(16px, 4vw, 52px)',
                  borderRight: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    width: 'clamp(28px, 4vw, 40px)',
                    height: 'clamp(28px, 4vw, 40px)',
                    position: 'relative',
                    filter: 'grayscale(100%) opacity(0.5)',
                    transition: 'all 0.4s ease',
                    borderRadius: 4,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                  className="brand-logo-wrapper"
                >
                  <Image src={client.logo} alt={client.name} fill className="object-contain" sizes="40px" />
                </div>

                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(0.8rem, 1.5vw, 1.05rem)',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: 'rgba(28,28,30,0.6)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.4s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const logo = e.currentTarget.parentElement?.querySelector('.brand-logo-wrapper') as HTMLElement;
                    if (logo) logo.style.filter = 'grayscale(0%) opacity(1)';
                    (e.currentTarget as HTMLElement).style.color = '#1A5276';
                  }}
                  onMouseLeave={e => {
                    const logo = e.currentTarget.parentElement?.querySelector('.brand-logo-wrapper') as HTMLElement;
                    if (logo) logo.style.filter = 'grayscale(100%) opacity(0.5)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(28,28,30,0.6)';
                  }}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
