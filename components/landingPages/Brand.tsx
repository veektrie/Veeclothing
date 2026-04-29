'use client';
import Link from 'next/link';

const services = [
  {
    id: '01',
    title: 'Custom Uniforms',
    description: 'We design and manufacture high-performance uniforms that translate your corporate identity into wearable excellence. Every team member represents your brand with pride.',
    features: ['Brand-specific color matching', 'Precision logo embroidery', 'High-resilience performance fabrics'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 1.96V10a8 8 0 008 8 8 8 0 008-8V5.42a2 2 0 00-1.62-1.96z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Executive Wear',
    description: 'Sartorial power for the boardroom. Hand-finished suiting and shirting for leadership teams who demand presence and perfection in every stitch.',
    features: ['Premium S150s Wool & Silk', 'Hand-basted canvas construction', 'Bespoke style consultations'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Business Gifts',
    description: 'Curated tokens of appreciation for your most valued partners. From monogrammed accessories to custom-lined blazers, we create gifts that leave a lasting legacy and reinforce your brand relationships.',
    features: ['Luxury monogramming', 'Bespoke packaging design', 'Exclusive corporate pricing'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 12V8H4v4M2 4h20v4H2V4zm18 8v10H4V12h16zm-8 4v2m-4-2v2m8-2v2" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Identity Strategy',
    description: 'More than clothing — we build visual authority. Our consulting service helps firms align their workforce appearance with their long-term brand strategy and market positioning.',
    features: ['Visual brand audits', 'Wardrobe management systems', 'Heritage-modern integration'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const corporate = [
  { name: 'Banks & Finance', description: 'Custom suits and uniforms for banking staff across Nigeria.' },
  { name: 'Hotels & Hospitality', description: 'Stylish, durable uniforms for hotels and restaurants.' },
  { name: 'Energy Companies', description: 'Professional attire for Nigeria\'s top energy firms.' },
  { name: 'Tech & Media', description: 'Modern, brand-aligned clothing for creative and tech teams.' },
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

const LightCard = ({ service, wide = false }: { service: typeof services[0], wide?: boolean }) => (
  <div style={{
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
    <IconBox icon={service.icon} />
    <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#1C1C1E', marginBottom: 12, letterSpacing: '-0.02em' }}>
      {service.title}
    </h3>
    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, marginBottom: 20 }}>
      {service.description}
    </p>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {service.features.map(f => (
        <li key={f} style={{ fontSize: 12, color: '#1A5276', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0, display: 'inline-block' }} />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default function CorporateAtelier() {
  return (
    <section id="corporate" style={{ background: '#ffffff', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Badge + Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1C1C1E', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999,
            padding: '7px 16px', display: 'inline-block', marginBottom: 20,
          }}>
            Business Services
          </span>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1C1C1E',
            maxWidth: 700, margin: 0,
          }}>
            Why <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Vee Clothing</em> is the Right Choice for Your Brand
          </h2>
        </div>

        {/* 3-column Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 20 }}>

          {/* Row 1 Col 1 */}
          <LightCard service={services[0]} />

          {/* Row 1 Col 2 */}
          <LightCard service={services[1]} />

          {/* Navy card — spans rows 1 & 2, col 3 */}
          <div style={{
            gridColumn: '3', gridRow: '1 / span 2',
            background: '#1A5276', borderRadius: 24, padding: '32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            color: 'white',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
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
                {services[3].icon}
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.6rem', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.03em' }}>
                {services[3].title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
                {services[3].description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {services[3].features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#10B981', fontWeight: 800, fontSize: 16 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="#consultation">
              <button style={{
                marginTop: 40, background: '#10B981', color: 'white', border: 'none',
                padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                transition: 'all 0.3s ease', width: 'fit-content',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#059669'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#10B981'; }}
              >
                Partner With Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Row 2 — wide light card spanning cols 1+2 */}
          <LightCard service={services[2]} wide />

        </div>

        {/* Industries Banner */}
        <div style={{ marginTop: 32, padding: '32px', borderRadius: 24, background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A5276', marginBottom: 20 }}>
            Industries We Serve
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {corporate.map(c => (
              <div key={c.name}>
                <p style={{ color: '#1C1C1E', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.name}</p>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}