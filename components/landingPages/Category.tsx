'use client';
import Link from 'next/link';

const steps = [
  {
    id: '01',
    title: 'Initial Chat',
    description: 'We begin with an in-depth style discovery session. Our tailors conduct a 30-point measurement process while analyzing your lifestyle and wardrobe requirements.',
    features: ['30+ point measurement', 'Wardrobe strategy audit', 'Style profile creation'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Fabric Curation',
    description: 'Select from an exclusive library of world-class cloths. We source directly from premium mills alongside authentic local heritage textiles.',
    features: ['Scabal & Loro Piana wools', 'Italian linen & silk', 'Authentic local weaves'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Precision Fitting',
    description: 'Every commission undergoes at least two basted fittings, where we hand-mold the canvas to your exact anatomical profile for a silhouette that is uniquely yours.',
    features: ['Hand-padded canvasing', 'Silk-thread finishes', 'Anatomical silhouette shaping', 'Functional cuff details'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Ready to Wear',
    description: 'Your garment is delivered in bespoke protective packaging, complete with a lifetime maintenance guide. Your style, always available on-demand.',
    features: ['Lifetime maintenance', 'Bespoke protective box', 'Priority commission status'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const IconBox = ({ icon }: { icon: React.ReactNode }) => (
  <div style={{
    width: 48, height: 48, borderRadius: 14, background: '#F8FAFC',
    border: '1px solid rgba(0,0,0,0.07)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: '#1A5276', marginBottom: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  }}>
    {icon}
  </div>
);

const LightCard = ({ step, wide = false }: { step: typeof steps[0], wide?: boolean }) => (
  <div
    style={{
      background: 'white', borderRadius: 24,
      border: '1px solid rgba(0,0,0,0.06)',
      padding: '32px', display: 'flex', flexDirection: 'column',
      gridColumn: wide ? 'span 2' : 'span 1',
      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(26,82,118,0.10)';
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,82,118,0.2)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.06)';
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
    }}
  >
    <IconBox icon={step.icon} />
    <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1E', marginBottom: 12, letterSpacing: '-0.02em' }}>
      {step.title}
    </h3>
    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, marginBottom: 20 }}>
      {step.description}
    </p>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {step.features.map(f => (
        <li key={f} style={{ fontSize: 12, color: '#1A5276', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A5276', flexShrink: 0, display: 'inline-block' }} />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default function BespokeProcess() {
  const whatsappUrl = 'https://wa.me/c/2348103031020';

  return (
    <section id="bespoke" style={{ background: '#F8FAFC', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Badge + Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999,
            padding: '7px 16px', display: 'inline-block', marginBottom: 20,
          }}>
            Individual Commissions
          </span>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1C1C1E',
            maxWidth: 700, margin: 0,
          }}>
            How <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Individual Style</em> is Crafted at Vee Clothing
          </h2>
        </div>

        {/* 3-column Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 20 }}>

          {/* Row 1 Col 1 */}
          <LightCard step={steps[0]} />

          {/* Row 1 Col 2 */}
          <LightCard step={steps[1]} />

          {/* Navy card — spans rows 1 & 2, col 3 */}
          <div
            style={{
              gridColumn: '3', gridRow: '1 / span 2',
              background: '#1A5276', borderRadius: 24, padding: '32px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              color: 'white', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(26,82,118,0.35)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'white',
              }}>
                {steps[2].icon}
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em' }}>
                {steps[2].title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
                {steps[2].description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {steps[2].features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <button
                style={{
                  marginTop: 40, background: 'white', color: '#1A5276', border: 'none',
                  padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14,
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  transition: 'all 0.3s ease', width: 'fit-content',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
              >
                Start Your Commission
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Row 2 — wide light card spanning cols 1+2 */}
          <LightCard step={steps[3]} wide />

        </div>

      </div>
    </section>
  );
}
