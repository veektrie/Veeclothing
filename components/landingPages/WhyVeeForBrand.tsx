'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Tag pill ─── */
const Tag = ({ label }: { label: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 999, padding: '4px 12px',
    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
    color: 'white', textTransform: 'uppercase' as const,
    fontFamily: 'Inter, sans-serif',
  }}>
    {label}
  </span>
);



const industries = [
  { name: 'Banks & Finance', description: 'Custom suits for top banking institutions.' },
  { name: 'Hospitality', description: 'Stylish uniforms for hotels and luxury resorts.' },
  { name: 'Energy Firms', description: 'Professional attire for oil and gas leaders.' },
  { name: 'Tech & Media', description: 'Brand-aligned clothing for creative teams.' },
];

export default function WhyVeeForBrand() {
  return (
    <section id="why-brand" style={{ padding: 'clamp(60px,10vw,100px) 0', overflow: 'hidden', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,32px)' }}>

        {/* Section header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,8vw,64px)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.8rem,5vw,3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#1C1C1E', margin: 0,
          }}>
            Why Vee Clothing is the <br />
            <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Right Choice for Your Brand</em>
          </h2>
        </motion.div>

        {/* ── Master Bento Grid ─────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="brand-bento-grid">

          {/* CELL 1 — Custom Uniforms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              gridColumn: '1', gridRow: '1',
              borderRadius: 24, overflow: 'hidden',
              position: 'relative', minHeight: 'clamp(320px,35vw,400px)',
            }}
            className="brand-cell"
          >
            <Image src="/service_custom_uniforms.png" alt="Custom Uniforms" fill className="object-cover" sizes="(max-width:768px)100vw,40vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
              <Tag label="Identity" />
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.4rem)', fontWeight: 800, color: 'white', margin: '14px 0 8px', letterSpacing: '-0.02em' }}>
                Custom Uniforms
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Precision-matched corporate colors and authoritative branding for your workforce.
              </p>
            </div>
          </motion.div>

          {/* CELL 2 — Executive Wear */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              gridColumn: '2', gridRow: '1',
              borderRadius: 24, overflow: 'hidden',
              position: 'relative', minHeight: 'clamp(320px,35vw,400px)',
            }}
            className="brand-cell"
          >
            <Image src="/service_executive_wear.png" alt="Executive Wear" fill className="object-cover object-top" sizes="(max-width:768px)100vw,33vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,82,118,0.75) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', top: 24, left: 24 }}>
              <Tag label="Command" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.4rem)', fontWeight: 800, color: 'white', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                Executive Presence
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Sartorial power for the boardroom. Hand-finished suiting that commands presence.
              </p>
            </div>
          </motion.div>



          {/* CELL 4 — Identity Strategy (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              gridColumn: '1 / 3', gridRow: '2',
              borderRadius: 24, overflow: 'hidden',
              position: 'relative', minHeight: 'clamp(260px,28vw,340px)',
            }}
            className="brand-cell-wide"
          >
            <Image src="/service_identity_strategy.png" alt="Identity Strategy" fill className="object-cover object-center" sizes="(max-width:768px)100vw,66vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,15,30,0.85) 0%, rgba(26,82,118,0.65) 50%, rgba(26,82,118,0.25) 100%)' }} />

            <div style={{ position: 'absolute', top: '15%', left: '6%' }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                fontWeight: 900, letterSpacing: '-0.04em', color: 'white',
                lineHeight: 1.1, margin: 0,
              }}>
                Identity<br />Strategy
              </h3>
            </div>

            <div style={{ position: 'absolute', bottom: 24, left: '6%', maxWidth: 400 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>
                We align your organization's appearance with your brand values and market positioning.
              </p>
            </div>

            <Link href="/services/business">
              <div style={{
                position: 'absolute', bottom: 24, right: 24,
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              className="hover:bg-white/20 hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* CELL 5 — Business Gifting (Tall) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
            style={{
              gridColumn: '3', gridRow: '1 / 3',
              borderRadius: 24, overflow: 'hidden',
              position: 'relative', minHeight: 'clamp(400px,48vw,600px)',
            }}
            className="brand-cell-tall"
          >
            <Image src="/service_business_gifts.png" alt="Business Gifts" fill className="object-cover object-top" sizes="(max-width:768px)100vw,33vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 32px' }}>
              <Tag label="Gifting" />
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 800, color: 'white', margin: '16px 0 10px', letterSpacing: '-0.02em' }}>
                Business Gifts
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Luxury monograms and bespoke packaging that speak louder than words.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Industries We Serve Banner */}
        <div style={{ marginTop: 40, padding: 'clamp(24px, 4vw, 48px)', borderRadius: 24, background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.04)' }}>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A5276', marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
            Industries We Serve
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {industries.map(c => (
              <div key={c.name}>
                <p style={{ color: '#1C1C1E', fontWeight: 800, fontSize: 14, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{c.name}</p>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .brand-bento-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .brand-cell, .brand-cell-wide, .brand-cell-tall {
            grid-column: auto !important;
            grid-row: auto !important;
            min-height: 380px !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
