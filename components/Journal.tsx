'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';


const articles = [
  {
    category: 'Craft & Heritage',
    title: 'The Anatomy of a Bespoke Suit: What Separates Artisanal from Average',
    excerpt:
      'From the canvas chest piece to the hand-padded lapels — a deep dive into why bespoke tailoring is the ultimate investment piece for the discerning gentleman.',
    readTime: '7 min read',
    keywords: 'bespoke tailoring Lagos, custom suit craftsmanship Africa',
  },
  {
    category: 'Corporate Identity',
    title: "Brand Cohesion in Modern Business: Why Your Team's Uniform is Your Handshake",
    excerpt:
      'In high-stakes industries, the first impression your team makes is worn, not spoken. We explore how Nigeria\'s leading corporations are using apparel to signal authority.',
    readTime: '6 min read',
    keywords: 'corporate uniform Lagos, executive branding Nigeria',
  },
  {
    category: 'Sustainable Luxury',
    title: 'Sustainable Luxury in African Fashion: Quality Over Volume',
    excerpt:
      'The future of African menswear is not fast fashion — it is intentional craftsmanship. Here is how Vee Clothing Company approaches sustainable luxury from Lagos.',
    readTime: '8 min read',
    keywords: 'sustainable luxury African fashion, premium menswear Nigeria',
  },
];

const Journal = () => {
  return (
    <section className="journal-section" id="journal">
      <div className="journal-inner">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <span className="section-label">The Journal</span>
            <div className="gold-divider my-4" />
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#1C1C1E',
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth: 480,
              }}
            >
              Thoughts on Craft, Style &amp; Identity.
            </h2>
          </div>
          <span
            style={{
              fontSize: 12,
              color: '#6B6B6B',
              maxWidth: 280,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Long-form perspectives on bespoke tailoring, corporate branding, and the heritage of African menswear.
          </span>
        </div>

        {/* Articles */}
        <div className="journal-grid">
          {articles.map((a, i) => (
            <motion.div
              key={i}
              className="journal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Category */}
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  display: 'block',
                  marginBottom: 16,
                }}
              >
                {a.category}
              </span>

              {/* Divider */}
              <div style={{ width: 30, height: 1, background: 'rgba(28,28,30,0.15)', marginBottom: 16 }} />

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.15rem',
                  color: '#1C1C1E',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  marginBottom: 12,
                }}
              >
                {a.title}
              </h3>

              {/* Excerpt */}
              <p style={{ color: '#6B6B6B', fontSize: 13, lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                {a.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span
                  style={{ fontSize: 11, color: 'rgba(28,28,30,0.35)', letterSpacing: '0.08em' }}
                >
                  {a.readTime}
                </span>
                <Link href="/journal">
                  <span className="journal-read-more">
                    Read More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href="/journal">
            <button className="btn-ghost-navy">
              View All Editorials
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Journal;
