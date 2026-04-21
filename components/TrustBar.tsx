'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Client logos and names for the trust bar
const clients = [
  { name: 'The Deltan Queen', logo: '/brand01.png' },
  { name: 'The Design Studio', logo: '/brand04.jpeg' },
  { name: 'Top Model of Delta', logo: '/brand05.jpeg' },
  { name: '9ce Photography', logo: '/brand06.jpeg' },
  { name: 'Food Box Nigeria', logo: '/brand02.jpg' },
  { name: '6Gadget', logo: '/brand03.jpg' },
];

const TrustBar = () => {
  const doubled = [...clients, ...clients]; // seamless loop

  return (
    <div
      className="trust-bar-container"
      style={{
        background: 'rgba(26, 82, 118, 0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        padding: '1.5rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade masks for better edge transitions */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0,
        width: 160, zIndex: 11, pointerEvents: 'none',
        background: 'linear-gradient(to right, #FAF8F5 10%, transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0,
        width: 160, zIndex: 11, pointerEvents: 'none',
        background: 'linear-gradient(to left, #FAF8F5 10%, transparent)',
      }} />

      {/* "Trusted By" label with refined styling and solid background to prevent overlap */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        zIndex: 30, width: 280,
        display: 'flex', alignItems: 'center', gap: 14,
        paddingLeft: '3.5rem',
        background: 'linear-gradient(to right, #FAF8F5 85%, transparent)',
      }}>
        <div style={{ width: 24, height: 1, background: '#D4AF37' }} />
        <span style={{
          fontSize: 8.5, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: '#D4AF37', fontFamily: 'Inter, sans-serif',
          fontWeight: 700, whiteSpace: 'nowrap',
        }}>
          Trusted By
        </span>
      </div>

      {/* Marquee Animation */}
      <motion.div
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          paddingLeft: 450, width: 'max-content',
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((client, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '0 48px',
              borderRight: '1px solid rgba(212, 175, 55, 0.12)',
            }}
          >
            {/* Brand Logo */}
            <div style={{
              width: 36, height: 36, position: 'relative',
              filter: 'grayscale(100%) contrast(1.1) brightness(0.9)', opacity: 0.6,
              transition: 'all 0.4s ease'
            }}
              className="brand-logo-wrapper"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
                sizes="36px"
              />
            </div>

            {/* Brand Name */}
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: 'rgba(26, 82, 118, 0.8)',
                whiteSpace: 'nowrap',
                transition: 'all 0.4s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const parent = e.currentTarget.parentElement;
                const logo = parent?.querySelector('.brand-logo-wrapper') as HTMLElement;
                if (logo) {
                  logo.style.filter = 'grayscale(0%) contrast(1) brightness(1)';
                  logo.style.opacity = '1';
                }
                (e.currentTarget as HTMLElement).style.color = '#1A5276';
              }}
              onMouseLeave={e => {
                const parent = e.currentTarget.parentElement;
                const logo = parent?.querySelector('.brand-logo-wrapper') as HTMLElement;
                if (logo) {
                  logo.style.filter = 'grayscale(100%) contrast(1.1) brightness(0.9)';
                  logo.style.opacity = '0.6';
                }
                (e.currentTarget as HTMLElement).style.color = 'rgba(26, 82, 118, 0.8)';
              }}
            >
              {client.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBar;
