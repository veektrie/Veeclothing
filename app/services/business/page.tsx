'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'custom-uniforms',
    title: 'Custom Uniforms',
    subtitle: 'Your brand, worn with authority.',
    image: '/service_custom_uniforms.png',
    items: [
      {
        name: 'Brand-Specific Color Matching',
        description: 'We work with your brand guidelines to precisely match your corporate colors in fabric form. Using Pantone-referenced dyeing and pre-approved samples, every uniform batch is consistent — from the first delivery to the hundredth.'
      },
      {
        name: 'Precision Logo Embroidery',
        description: 'Your corporate identity is embedded into every garment through high-density, precision-registered embroidery. We handle everything from simple wordmarks to complex crests, maintaining sharp detail at any size.'
      },
      {
        name: 'High-Resilience Performance Fabrics',
        description: 'Corporate uniforms are worn daily. We source fabrics engineered for durability — poly-wool blends, moisture-wicking weaves, and crease-resistant twills — that maintain their appearance through intense professional use.'
      },
      {
        name: 'Ergonomic Movement Design',
        description: 'Uniforms must look sharp but also allow full freedom of movement. We engineer garments with articulated seams, stretch panels, and functional cut — ensuring your team performs at their best, all day long.'
      },
    ]
  },
  {
    id: 'executive-wear',
    title: 'Executive Wear',
    subtitle: 'Commanding presence, crafted in every stitch.',
    image: '/service_executive_wear.png',
    items: [
      {
        name: 'Premium S150s Wool & Silk',
        description: 'We source only the finest cloths for executive commissions — Super 150s and above from the legendary mills of Scabal, Holland & Sherry, and Loro Piana. These fabrics offer unmatched drape, a silken hand feel, and a natural sheen that reads as authority.'
      },
      {
        name: 'Hand-Basted Canvas Construction',
        description: 'Every executive jacket features a full floating canvas — a layer of hand-padded horsehair and linen stitched directly to the chest piece. This gives the jacket a three-dimensional shape that conforms to your body over time, unlike fused mass-market suits.'
      },
      {
        name: 'Bespoke Style Consultations',
        description: 'Our senior consultants work one-on-one with executives to build a strategic wardrobe. We consider meeting schedules, travel demands, and professional optics — creating a tailored wardrobe plan that communicates exactly what you want the room to know about you.'
      },
      {
        name: 'Corporate Wardrobe Management',
        description: 'For senior leaders, we offer a discreet wardrobe management service. We track your garment inventory, schedule maintenance rotations, and proactively commission replacements — so your professional image is always at its peak.'
      },
    ]
  },
  {
    id: 'business-gifts',
    title: 'Business Gifts',
    subtitle: 'Gifts that speak louder than words.',
    image: '/service_business_gifts.png',
    items: [
      {
        name: 'Luxury Monogramming',
        description: 'Every piece we create as a gift can be personalised with the recipient\'s initials, name, or a bespoke message, hand-embroidered in contrasting silk thread. This transforms a garment into a lasting keepsake that carries the weight of your business relationship.'
      },
      {
        name: 'Curated Gift Collections',
        description: 'We offer pre-designed corporate gift collections — pocket squares with bespoke packaging, silk ties with monogrammed boxes, and custom cufflinks paired with dress shirts. Each collection is available in tiered price points for different relationship levels.'
      },
      {
        name: 'Bespoke Packaging Design',
        description: 'The experience begins at the box. Our signature navy gift boxes, custom tissue, and branded ribbon create a premium unboxing moment that communicates the quality within before the recipient even sees the garment.'
      },
      {
        name: 'Bulk Corporate Orders',
        description: 'For end-of-year gifts, board gifts, or client appreciation campaigns, we manage large-scale personalised gift orders with consistent quality across every unit. We handle logistics, quality control, and timely delivery to multiple addresses.'
      },
    ]
  },
  {
    id: 'identity-strategy',
    title: 'Identity Strategy',
    subtitle: 'Align your appearance with your ambition.',
    image: '/service_identity_strategy.png',
    items: [
      {
        name: 'Visual Brand Audits',
        description: 'We conduct a comprehensive review of your organisation\'s current staff appearance against your brand values and market positioning. We identify misalignments, inconsistencies, and opportunities to strengthen your visual authority.'
      },
      {
        name: 'Wardrobe Management Systems',
        description: 'We design and implement a wardrobe management system for your organisation — defining dress codes, seasonal guidelines, and grooming standards that align your entire workforce with your brand identity.'
      },
      {
        name: 'Heritage-Modern Integration',
        description: 'We help Nigerian organisations honour their cultural heritage while projecting global competitiveness. We integrate authentic Nigerian textiles and design elements into modern corporate silhouettes — creating a look that is distinctly Nigerian and unmistakably world-class.'
      },
      {
        name: 'Ongoing Brand Styling Retainer',
        description: 'For organisations that want continuous guidance, we offer a quarterly styling retainer. This includes seasonal uniform refresh consultations, executive wardrobe reviews, and priority access to our bespoke service at agreed rates.'
      },
    ]
  },
];

export default function BusinessServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1C1C1E' }}>

      {/* Header */}
      <div style={{ background: '#1A5276', padding: '120px 32px 80px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '7px 16px', display: 'inline-block', marginBottom: 28, cursor: 'pointer' }}>
            ← Back to Home
          </span>
        </Link>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 auto 20px', maxWidth: 700, color: 'white' }}>
          Business <em style={{ color: 'white', fontStyle: 'normal' }}>Services</em>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          From corporate uniforms to executive strategy — we help organisations build a visual identity that commands respect.
        </p>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        {services.map((service, sIdx) => (
          <div
            key={service.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              marginBottom: 120,
              alignItems: 'start',
            }}
          >
            {/* Text side */}
            <div style={{ order: sIdx % 2 === 0 ? 1 : 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A5276', display: 'block', marginBottom: 12 }}>
                0{sIdx + 1}
              </span>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.1, color: '#1C1C1E' }}>
                {service.title}
              </h2>
              <p style={{ fontSize: 15, color: '#4B5563', marginBottom: 40, lineHeight: 1.6 }}>
                {service.subtitle}
              </p>

              {/* Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {service.items.map((item, iIdx) => (
                  <div key={item.name} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                      onClick={() => {
                        setActiveService(sIdx);
                        setActiveItem(activeItem === iIdx && activeService === sIdx ? null : iIdx);
                      }}
                      style={{
                        width: '100%', background: 'transparent', border: 'none',
                        color: '#1C1C1E', cursor: 'pointer', padding: '20px 0',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 16, textAlign: 'left',
                      }}
                    >
                      <span style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600,
                        color: (activeService === sIdx && activeItem === iIdx) ? '#1A5276' : '#374151',
                        transition: 'color 0.2s',
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        background: (activeService === sIdx && activeItem === iIdx) ? '#1A5276' : '#e5e7eb',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s ease', fontSize: 16, lineHeight: 1,
                        color: (activeService === sIdx && activeItem === iIdx) ? 'white' : '#374151',
                      }}>
                        {(activeService === sIdx && activeItem === iIdx) ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeService === sIdx && activeItem === iIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.75, paddingBottom: 20 }}>
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <Link href="#consultation">
                <button style={{
                  marginTop: 40, background: 'white', color: '#1A5276', border: 'none',
                  padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                >
                  Partner With Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Image side — sticky */}
            <div style={{ order: sIdx % 2 === 0 ? 2 : 1, position: 'sticky', top: 120 }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 480, background: '#E8EFF5' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={service.image}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 580px"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(248,250,252,0.3) 0%, transparent 50%)' }} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
