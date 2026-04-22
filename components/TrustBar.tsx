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
      className="trust-bar-wrapper"
      style={{
        padding: '20px 0 80px 0',
        display: 'flex',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        className="trust-bar-container"
        style={{
          background: 'rgba(20, 20, 30, 0.6)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          padding: '20px 0',
          overflow: 'hidden',
          position: 'relative',
          width: '95%',
          maxWidth: '1400px',
          boxShadow: '0 30px 70px -15px rgba(0,0,0,0.6)'
        }}
      >
        {/* Fade masks */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: 'clamp(80px, 15vw, 200px)', zIndex: 11, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(10,10,15,1) 0%, transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0,
          width: 'clamp(80px, 15vw, 200px)', zIndex: 11, pointerEvents: 'none',
          background: 'linear-gradient(to left, rgba(10,10,15,1) 0%, transparent)',
        }} />

        {/* "Trusted" label - Hidden or smaller on mobile if needed, but here we'll keep it refined */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          zIndex: 30, width: 'clamp(120px, 20vw, 200px)',
          display: 'flex', alignItems: 'center', gap: 12,
          paddingLeft: 'clamp(1rem, 4vw, 3rem)',
          background: 'linear-gradient(to right, rgba(10,10,15,0.95) 80%, transparent)',
        }}>
          <span style={{
            fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
            color: '#D4AF37', fontFamily: 'Inter, sans-serif',
            fontWeight: 800, whiteSpace: 'nowrap',
          }}>
            Trusted
          </span>
        </div>

        {/* Marquee Animation */}
        <motion.div
          style={{
            display: 'flex', alignItems: 'center', gap: 0,
            paddingLeft: 'clamp(150px, 25vw, 250px)', width: 'max-content',
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((client, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '0 clamp(24px, 5vw, 64px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Brand Logo */}
              <div style={{
                width: 36, height: 36, position: 'relative',
                filter: 'grayscale(100%) brightness(2) contrast(0.8)', opacity: 0.5,
                transition: 'all 0.4s ease',
                borderRadius: 4,
                overflow: 'hidden',
                flexShrink: 0
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
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.4s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const parent = e.currentTarget.parentElement;
                  const logo = parent?.querySelector('.brand-logo-wrapper') as HTMLElement;
                  if (logo) {
                    logo.style.filter = 'grayscale(0%) brightness(1) contrast(1)';
                    logo.style.opacity = '1';
                  }
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  const parent = e.currentTarget.parentElement;
                  const logo = parent?.querySelector('.brand-logo-wrapper') as HTMLElement;
                  if (logo) {
                    logo.style.filter = 'grayscale(100%) brightness(2) contrast(0.8)';
                    logo.style.opacity = '0.5';
                  }
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;
