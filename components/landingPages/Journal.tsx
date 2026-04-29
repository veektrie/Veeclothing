'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  excerpt: string;
  readTime: string;
}

interface JournalProps {
  articles: Article[];
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const Journal = ({ articles }: JournalProps) => {
  return (
    <section id="journal" style={{ background: '#ffffff', padding: 'clamp(60px, 10vw, 100px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)' }}>

        {/* Header */}

          <div className="flex flex-col items-center gap-8">
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#1C1C1E', margin: 0, maxWidth: 560, textAlign: 'center'
            }}>
              Stories About <em style={{ color: '#1A5276', fontStyle: 'normal' }}>Style & Craft</em>
            </h2>
            <Link href="/blog">
              <button
                className="bg-[#1A5276] text-white border-none py-3 px-7 rounded-full font-bold text-sm flex items-center gap-2.5 transition-all hover:bg-[#154360] w-fit"
              >
                See All Posts
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>


        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            // Skeleton placeholders
            [0, 1, 2].map(i => (
              <div key={i} className="bg-[#F8FAFC] rounded-[20px] h-[420px] animate-pulse" />
            ))
          ) : (
            articles.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${a.slug}`} className="block no-underline group">
                  <div
                    className="bg-white rounded-[20px] border border-black/[0.07] overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/5 group-hover:border-blue-900/10 group-hover:-translate-y-1.5"
                  >
                    {/* Cover Image */}
                    <div className="relative w-full h-[200px] bg-[#F0F4F8] overflow-hidden">
                      {a.imageUrl ? (
                        <Image
                          src={a.imageUrl}
                          alt={a.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EBF5FB] to-[#D6EAF8]">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A5276" strokeWidth="1" opacity="0.3">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="text-[10px] font-bold tracking-[0.08em] uppercase bg-white text-[#1A5276] px-3 py-1.5 rounded-full shadow-md">
                          {a.category || 'Journal'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pb-7">
                      <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[1rem] font-bold text-[#1C1C1E] leading-tight mb-3 group-hover:text-[#1A5276] transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-[13px] text-[#64748b] leading-relaxed mb-6 line-clamp-2">
                        {a.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-[#94a3b8] font-medium">
                          {formatDate(a.publishedAt)}
                        </span>
                        <span className="text-[11px] font-bold text-[#1A5276] flex items-center gap-1.5 uppercase tracking-wider">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          {a.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Journal;
