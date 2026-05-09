'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TrustBar from '../TrustBar';

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



export default function WhyChooseUs() {
  return (
    <section id="why-professionals" style={{ padding: '0 0 clamp(60px,10vw,100px) 0', overflow: 'hidden', background: '#F8FAFC' }}>
      <TrustBar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,32px)' }}>

        {/* Section header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,8vw,64px)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <h2 className="why-choose-heading" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#1C1C1E', margin: '0 auto', textAlign: 'center'
          }}>
            Why Professionals <br />
            <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Choose Vee Clothing</em>
          </h2>
        </motion.div>

        {/* ── Bento Grid ─────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="professionals-bento-grid">

          {/* CELL 1 — Style Discovery */}
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
            className="bento-cell"
          >
            <Image src="/service_initial_chat.png" alt="Style Discovery" fill className="object-cover" sizes="(max-width:768px)100vw,40vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
              <Tag label="Discovery" />
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.4rem)', fontWeight: 800, color: 'white', margin: '14px 0 8px', letterSpacing: '-0.02em' }}>
                Personalized Support
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Work with a dedicated atelier team who understand your individual style goals.
              </p>
            </div>
          </motion.div>

          {/* CELL 2 — Fabric Curation */}
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
            className="bento-cell"
          >
            <Image src="/service_fabric_curation.png" alt="Fabric Curation" fill className="object-cover object-top" sizes="(max-width:768px)100vw,33vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,82,118,0.75) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', top: 24, left: 24 }}>
              <Tag label="Curation" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.4rem)', fontWeight: 800, color: 'white', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                With You Every Step
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Continuous guidance from fabric curation to post-delivery adjustments.
              </p>
            </div>
          </motion.div>



          {/* CELL 4 — Precision Fitting (Wide) */}
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
            className="bento-cell-wide"
          >
            <Image src="/service_precision_fitting.png" alt="Precision Fitting" fill className="object-cover object-center" sizes="(max-width:768px)100vw,66vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,15,30,0.85) 0%, rgba(26,82,118,0.65) 50%, rgba(26,82,118,0.25) 100%)' }} />

            <div style={{ position: 'absolute', top: '15%', left: '6%' }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                fontWeight: 900, letterSpacing: '-0.04em', color: 'white',
                lineHeight: 1.1, margin: 0,
              }}>
                Measurable<br />Excellence
              </h3>
            </div>

            <div style={{ position: 'absolute', bottom: 24, left: '6%', maxWidth: 400 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>
                Our 30-point measurement protocol ensures a mathematically perfect fit for every commission.
              </p>
            </div>

            <Link href="/shop">
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

          {/* CELL 5 — Ready to Wear (Tall) */}
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
            className="bento-cell-tall"
          >
            <Image src="/service_ready_to_wear.png" alt="Ready to Wear" fill className="object-cover object-top" sizes="(max-width:768px)100vw,33vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 32px' }}>
              <Tag label="Longevity" />
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 800, color: 'white', margin: '16px 0 10px', letterSpacing: '-0.02em' }}>
                Future-Ready Wardrobe
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
                Longevity-focused design ensures your garments remain assets for decades.
              </p>
            </div>
          </motion.div>

        </div>

      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .professionals-bento-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .bento-cell, .bento-cell-wide, .bento-cell-tall {
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
