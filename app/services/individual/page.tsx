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
          Individual <em style={{ color: 'white', fontStyle: 'normal' }}>Commissions</em>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          From your first consultation to the moment you wear it — a fully bespoke experience designed around you.
        </p>
      </div>

      {/* Core Thesis & Architecture */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 20px' }}>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1C1C1E', marginBottom: 24, lineHeight: 1.1 }}>
          Personal Infrastructure.<br />
          <span style={{ color: '#1A5276' }}>Engineered for the Individual.</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 16, color: '#4B5563', lineHeight: 1.8 }}>
          <p>
            A suit is not merely a garment. It is a calculated advantage. For the modern executive, clothing functions as personal infrastructure. It serves as the definitive boundary between the individual and the high-stakes environments they navigate. When a leader enters a boardroom, the cut of their lapel, the structure of their shoulder, and the break of their trouser communicate absolute competence before a single word is exchanged.
          </p>
          <p>
            The Private Commission by Vee Clothing Company is designed for individuals who understand the psychology of presence. We do not manufacture clothes for occasions. We engineer tools for commanding authority. By treating the creation of a suit as the engineering of a high-performance system, we remove friction from professional interactions and equip our clients with immediate visual leverage.
          </p>
          <p>
            <strong>The Architecture of the Silhouette</strong><br />
            Tailoring is executed as a precise structural science. During our measurement protocol, we collect vital anatomical data points — calculating shoulder pitch, spinal curvature, and natural movement patterns. We draft a unique mathematical pattern block for every individual client, constructing our jackets with a hand-stitched floating canvas that breathes, moves, and progressively moulds to the client over time.
          </p>
        </div>
      </section>

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
                  marginTop: 40, background: 'white', color: '#1A5276', border: 'none',
                  padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
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

      {/* FAQ / AEO Section */}
      <section itemScope itemType="https://schema.org/FAQPage" style={{ maxWidth: 800, margin: '0 auto', padding: '20px 32px 120px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.08)', marginBottom: 60 }} />
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1C1C1E', marginBottom: 40 }}>
          Common Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {faqs.map((faq, idx) => (
            <div key={idx} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 24 }}>
              <h3 itemProp="name" style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1E', marginBottom: 12 }}>
                {faq.q}
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text" style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    q: 'What is The Private Commission?',
    a: 'The Private Commission is the exclusive individual bespoke tailoring service offered by Vee Clothing Company. It is a rigorous engineering process where a unique pattern is drafted from scratch based on precise anatomical data, resulting in a fully custom, structurally flawless garment built for the specific operational needs of the client.',
  },
  {
    q: 'How long does a bespoke commission take?',
    a: 'A standard Private Commission requires four to six weeks from the initial Strategic Dialogue to The Final Integration. This timeline is strictly maintained to allow for meticulous fabric sourcing, hand-stitched canvas construction, and the necessary fitting protocols required to ensure perfect structural alignment.',
  },
  {
    q: 'Where are the fabrics sourced?',
    a: 'We source our textiles directly from premium global mills. Our curation focuses entirely on high-performance materials including Super 150s wools, resilient linens, and breathable silks. These fabrics are specifically chosen for their ability to maintain shape, manage temperature, and provide superior comfort in both the dynamic Lagos climate and international travel environments.',
  },
  {
    q: 'Do you offer private office fittings?',
    a: 'Yes. We understand the severe time constraints placed upon our clients. Our specialists can execute the complete measurement protocol and all subsequent fitting sessions in the absolute privacy of the client\'s office or residence in Lagos, ensuring the highest level of convenience and total discretion.',
  },
];
