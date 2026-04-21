'use client';
import { motion } from 'framer-motion';

// Using text names since brand images have opaque backgrounds — cleaner on luxury sites
const clients = [
  'The Deltan Queen',
  'The Design Studio',
  'Top Model of Delta',
  '9ce Photography',
  'Food Box Nigeria',
  'Corporate Partners',
  'Delta Selection',
  'Executive Brands',
];

const TrustBar = () => {
  const doubled = [...clients, ...clients]; // seamless loop

  return (
    <div
      style={{
        background: 'rgba(26, 82, 118, 0.06)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left fade mask */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0,
        width: 140, zIndex: 5, pointerEvents: 'none',
        background: 'linear-gradient(to right, #FAF8F5 20%, transparent)',
      }} />
      {/* Right fade mask */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0,
        width: 140, zIndex: 5, pointerEvents: 'none',
        background: 'linear-gradient(to left, #FAF8F5 20%, transparent)',
      }} />

      {/* "Trusted By" label */}
      <div style={{
        position: 'absolute', left: '2.5rem', top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 16, height: 1, background: 'rgba(212,175,55,0.5)' }} />
        <span style={{
          fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.7)', fontFamily: 'Inter, sans-serif',
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>
          Trusted By
        </span>
        <div style={{ width: 16, height: 1, background: 'rgba(212,175,55,0.5)' }} />
      </div>

      {/* Marquee */}
      <motion.div
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          paddingLeft: 220, width: 'max-content',
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 0,
              padding: '0 32px',
              borderRight: '1px solid rgba(212,175,55,0.12)',
            }}
          >
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: 'rgba(26,82,118,0.35)',
                whiteSpace: 'nowrap',
                transition: 'color 0.4s ease',
                cursor: 'default',
                userSelect: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,82,118,0.35)'; }}
            >
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBar;
