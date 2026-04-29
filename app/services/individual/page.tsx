'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'initial-chat',
    title: 'Initial Consultation',
    subtitle: 'Your style journey begins with a conversation.',
    image: '/service_initial_chat.png',
    items: [
      {
        name: 'Style Discovery Session',
        description: 'Our master tailors spend dedicated time understanding your personal aesthetic, wardrobe gaps, lifestyle demands, and professional goals. Every detail you share becomes the foundation of a truly personalised garment.'
      },
      {
        name: '30-Point Measurement Protocol',
        description: 'We use an industry-leading 30-point measurement system that goes far beyond standard sizing. We capture posture nuances, arm curvature, and shoulder slope to guarantee anatomical precision.'
      },
      {
        name: 'Wardrobe Strategy Audit',
        description: 'We review your current wardrobe and identify core gaps. We then create a personalised commission plan that builds a cohesive, versatile wardrobe designed to work across every occasion.'
      },
      {
        name: 'Style Profile Creation',
        description: 'We document your style profile for future commissions — ensuring that each subsequent garment is crafted consistently to your evolving aesthetic, with zero guesswork.'
      },
    ]
  },
  {
    id: 'fabric-curation',
    title: 'Fabric Curation',
    subtitle: 'The soul of every great garment is its fabric.',
    image: '/service_fabric_curation.png',
    items: [
      {
        name: 'World-Class Fabric Library',
        description: 'Access our exclusive collection of premium textiles sourced from the finest mills across Italy, England, and West Africa. Every fabric in our library is pre-vetted for quality, weight, and wearability in Nigeria\'s climate.'
      },
      {
        name: 'Scabal & Loro Piana Wools',
        description: 'We carry an extensive selection of Super 100s to Super 180s wools from houses like Scabal and Loro Piana — the gold standard for bespoke suiting. These fabrics offer unmatched drape, breathability, and longevity.'
      },
      {
        name: 'Italian Linen & Silk Blends',
        description: 'For tropical elegance, we offer a curated selection of Italian linen, silk-cotton blends, and tropical-weight wools. Cool, breathable, and structured — perfect for the Nigerian climate.'
      },
      {
        name: 'Authentic Local Heritage Textiles',
        description: 'We celebrate Nigerian craft through our collection of premium Aso-Oke, Ankara, and hand-woven heritage cloths. These fabrics are sourced directly from master weavers and incorporated into contemporary silhouettes.'
      },
    ]
  },
  {
    id: 'precision-fitting',
    title: 'Precision Fitting',
    subtitle: 'Where science meets craftsmanship.',
    image: '/service_precision_fitting.png',
    items: [
      {
        name: 'Basted First Fitting',
        description: 'A preliminary canvas garment is constructed and fitted on your body. This first fitting allows our tailors to assess the overall silhouette, make structural adjustments, and ensure the foundations are perfect before the final cloth is cut.'
      },
      {
        name: 'Hand-Padded Canvas Construction',
        description: 'Unlike machine-made suits, our jackets feature a hand-padded floating canvas — a layer of interfacing stitched to the chest piece by hand. This ensures the jacket moves and breathes with your body, improving with every wear.'
      },
      {
        name: 'Anatomical Silhouette Shaping',
        description: 'We sculpt every garment to your unique posture — whether you carry one shoulder higher, have a sway back, or a forward head posture. The result is a garment that looks as if it were grown on your body.'
      },
      {
        name: 'Final Finishing Details',
        description: 'Hand-sewn buttonholes, functioning sleeve buttons, silk-thread finish on lapels, and monogrammed linings are among the finishing details that elevate our garments from excellent to extraordinary.'
      },
    ]
  },
  {
    id: 'ready-to-wear',
    title: 'Ready to Wear',
    subtitle: 'The final act of a masterpiece.',
    image: '/service_ready_to_wear.png',
    items: [
      {
        name: 'Bespoke Delivery Experience',
        description: 'Your completed commission is presented in our signature navy garment box, wrapped in acid-free tissue. We schedule a private delivery or studio collection appointment at your convenience.'
      },
      {
        name: 'Lifetime Maintenance Programme',
        description: 'Every commission comes with our lifetime maintenance commitment. We re-press, re-line, and adjust your garments as your body and lifestyle evolve — at no additional cost for the first three years.'
      },
      {
        name: 'Priority Commission Status',
        description: 'Returning clients receive priority scheduling, preferred fabric access, and exclusive invitations to new collection previews. Your loyalty is rewarded with faster turnaround and first access.'
      },
      {
        name: 'Style Continuity Record',
        description: 'We maintain a complete record of your measurements, fabric preferences, and style specifications. Ordering a new garment is as simple as a message — no repeat consultations required.'
      },
    ]
  },
];

export default function IndividualServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1C1C1E' }}>

      {/* Header */}
      <div style={{ background: '#1A5276', padding: '120px 32px 80px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '7px 16px', display: 'inline-block', marginBottom: 28, cursor: 'pointer' }}>
            ← Back to Home
          </span>
        </Link>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 auto 20px', maxWidth: 700, color: 'white' }}>
          Individual <em style={{ color: '#10B981', fontStyle: 'normal' }}>Commissions</em>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          From your first consultation to the moment you wear it — a fully bespoke experience designed around you.
        </p>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        {services.map((service, sIdx) => (
          <div
            key={service.id}
            style={{
              display: 'grid',
              gridTemplateColumns: sIdx % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
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

              <Link href="https://wa.me/c/2348103031020" target="_blank">
                <button style={{
                  marginTop: 40, background: '#10B981', color: 'white', border: 'none',
                  padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#059669'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#10B981'; }}
                >
                  Start This Commission
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Image side */}
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
