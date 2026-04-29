'use client';
import Link from 'next/link';

const services = [
  {
    id: '01',
    title: 'Custom Uniforms',
    description: 'High-performance uniforms that translate your corporate identity into wearable excellence. Every team member represents your brand with pride.',
    features: ['Brand color matching', 'Precision embroidery', 'Performance fabrics'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 1.96V10a8 8 0 008 8 8 8 0 008-8V5.42a2 2 0 00-1.62-1.96z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Executive Wear',
    description: 'Sartorial power for the boardroom. Hand-finished suiting and shirting for leadership teams who demand presence and perfection.',
    features: ['Premium S150s Wool', 'Basted construction', 'Style consultations'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Business Gifts',
    description: 'Curated tokens of appreciation. From monogrammed accessories to custom blazers, we create gifts that reinforce brand relationships.',
    features: ['Luxury monogramming', 'Bespoke packaging', 'Corporate pricing'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 12V8H4v4M2 4h20v4H2V4zm18 8v10H4V12h16zm-8 4v2m-4-2v2m8-2v2" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Identity Strategy',
    description: 'We build visual authority. Our consulting service helps firms align staff appearance with brand strategy and market positioning.',
    features: ['Visual brand audits', 'Wardrobe systems', 'Heritage integration'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const corporate = [
  { name: 'Banks & Finance', description: 'Custom suits for top banking institutions.' },
  { name: 'Hospitality', description: 'Stylish uniforms for hotels and luxury resorts.' },
  { name: 'Energy Firms', description: 'Professional attire for oil and gas leaders.' },
  { name: 'Tech & Media', description: 'Brand-aligned clothing for creative teams.' },
];

const IconBox = ({ icon, light = false }: { icon: React.ReactNode, light?: boolean }) => (
  <div style={{
    width: 44, height: 44, borderRadius: 12, background: light ? 'rgba(255,255,255,0.1)' : '#F8FAFC',
    border: `1px solid ${light ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`, 
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: light ? 'white' : '#1A5276', marginBottom: 20,
  }}>
    {icon}
  </div>
);

const LightCard = ({ service, wide = false }: { service: typeof services[0], wide?: boolean }) => (
  <div 
    className={`bg-white rounded-[24px] border border-black/5 p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 ${wide ? 'lg:col-span-2' : 'col-span-1'}`}
  >
    <IconBox icon={service.icon} />
    <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1.15rem] font-bold text-[#1C1C1E] mb-3 tracking-[-0.02em]">
      {service.title}
    </h3>
    <p className="text-[13px] text-[#64748b] lineHeight-1.6 mb-6">
      {service.description}
    </p>
    <ul className="flex flex-col gap-2.5 mt-auto">
      {service.features.map(f => (
        <li key={f} className="text-[11px] text-[#1A5276] font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default function CorporateAtelier() {
  return (
    <section id="corporate" style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 100px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)' }}>

        {/* Badge + Header */}
        <div style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>

          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1C1C1E',
            maxWidth: 700, margin: '0 auto', textAlign: 'center'
          }}>
            Why <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Vee Clothing</em> is the Right Choice for Your Brand
          </h2>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Row 1 Col 1 */}
          <LightCard service={services[0]} />

          {/* Row 1 Col 2 */}
          <LightCard service={services[1]} />

          {/* Navy card — Visual Identity / Identity Strategy */}
          <div 
            className="bg-[#1A5276] rounded-[24px] p-8 flex flex-col justify-between text-white md:col-span-2 lg:col-span-1 lg:row-span-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20"
          >
            <div>
              <IconBox icon={services[3].icon} light />
              <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-2xl font-bold mb-4 tracking-[-0.03em]">
                {services[3].title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {services[3].description}
              </p>
              <ul className="flex flex-col gap-3">
                {services[3].features.map(f => (
                  <li key={f} className="text-[13px] text-white/80 flex items-center gap-3">
                    <span className="text-[#10B981] font-black">→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="#consultation">
              <button className="mt-10 bg-[#10B981] text-white border-none py-3.5 px-7 rounded-full font-bold text-sm flex items-center gap-2.5 transition-all hover:bg-[#059669] w-fit">
                Partner With Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Row 2 — wide light card */}
          <LightCard service={services[2]} wide />

        </div>

        {/* Industries Banner */}
        <div className="mt-8 p-8 rounded-[24px] bg-[#F8FAFC] border border-black/[0.04]">
          <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#1A5276] mb-6">
            Industries We Serve
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporate.map(c => (
              <div key={c.name}>
                <p className="text-[#1C1C1E] font-bold text-sm mb-1">{c.name}</p>
                <p className="text-[#64748b] text-[13px] leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}