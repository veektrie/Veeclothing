'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const previews = [
  { id: 2, src: '/suit01.jpg',   label: 'Executive Suits',   tag: 'SIGNATURE'  },
  { id: 3, src: '/kaftan01.webp', label: 'Premium Kaftans',   tag: 'BESTSELLER' },
  { id: 1, src: '/cop01.jpg',    label: 'Corporate Branding', tag: 'CORPORATE'  },
];

const ShopPreview = ({ products }: { products?: any[] }) => {
  const displayItems = products && products.length > 0 
    ? products.map(p => ({
        id: p.slug || p._id,
        src: p.src || '/suit01.jpg',
        label: p.name,
        tag: p.tag || p.cat || 'SIGNATURE'
      }))
    : previews;

  return (
    <section
      id="collection"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(5rem, 10vw, 12rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Brand Elements */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'radial-gradient(circle at 80% 20%, rgba(26, 82, 118, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(26, 82, 118, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', position: 'relative', zIndex: 2 }}>
        
        {/* Header Block */}
        <div style={{ marginBottom: 'clamp(4rem, 8vw, 6rem)', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#1C1C1E',
              lineHeight: 1,
              marginBottom: 24,
              textAlign: 'center'
            }}>
              Pick Your <em style={{ color: '#1A5276', fontStyle: 'italic' }}>Style.</em>
            </h2>
          </motion.div>
        </div>

        {/* The Galleria - Dynamic Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2.5rem',
          alignItems: 'stretch'
        }}>
          {displayItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link href={`/shop/product/${item.id}`} style={{ textDecoration: 'none' }}>
                <div 
                  className="galleria-card"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: 24,
                    padding: 12,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', marginBottom: 24, borderRadius: 20 }}>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    
                    {/* Floating Tag */}
                    <div style={{
                      position: 'absolute', top: 15, right: 15,
                      padding: '6px 12px', background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)', border: '1px solid rgba(26, 82, 118, 0.3)',
                      color: '#1A5276', fontSize: 8, letterSpacing: '0.25em',
                      fontWeight: 700, textTransform: 'uppercase', borderRadius: 6
                    }}>
                      {item.tag}
                    </div>
                  </div>

                  <div style={{ padding: '0 10px 10px' }}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
                      color: '#1C1C1E', fontWeight: 400, marginBottom: 12, letterSpacing: '0.02em'
                    }}>
                      {item.label}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 13,
                      color: 'rgba(28,28,30,0.5)', lineHeight: 1.6, fontWeight: 300,
                      marginBottom: 24
                    }}>
                      Made with care. Available for custom orders in premium fabrics.
                    </p>
                    
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: 10,
                      color: '#1A5276', fontSize: 9, letterSpacing: '0.2em',
                      fontWeight: 600, textTransform: 'uppercase'
                    }}>
                      See Details
                      <div style={{ width: 30, height: 1, background: '#1A5276', opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Reserved Space for Future Expansion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              border: '1px dashed rgba(26, 82, 118, 0.2)',
              borderRadius: 24,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              background: 'rgba(26, 82, 118, 0.02)'
            }}
          >
            <span style={{ 
              fontSize: 9, letterSpacing: '0.3em', color: 'rgba(28,28,30,0.2)',
              textTransform: 'uppercase', marginBottom: 16 
            }}>Coming Soon</span>
            <h4 style={{ 
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', 
              color: 'rgba(28,28,30,0.4)', fontWeight: 300 
            }}>
              Footwear & Essentials<br />
              <em style={{ color: '#1A5276', opacity: 0.6 }}>Coming Soon</em>
            </h4>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/shop">
            <button className="btn-solid-gold" style={{ padding: '20px 50px', borderRadius: 100, background: '#1A5276', color: '#fff' }}>
              Shop All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" style={{ marginLeft: 10 }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </Link>
        </motion.div>

      </div>
      
      <style jsx>{`
        .galleria-card:hover {
          transform: translateY(-10px);
          border-color: #1A5276;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
};

export default ShopPreview;
