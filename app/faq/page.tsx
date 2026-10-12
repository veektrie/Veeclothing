'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, ArrowRight, X, Sparkles, Building2, User, Scissors, MapPin } from 'lucide-react';
import { FAQ_DATA, FAQ_CATEGORIES, type FAQCategory, type FAQItem } from '@/constants/faqData';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id]); // First open by default

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  // Filter FAQs based on active category and live search query
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const inQuestion = item.question.toLowerCase().includes(query);
      const inShortAnswer = item.shortAnswer.toLowerCase().includes(query);
      const inDetails = item.detailedAnswer.some((d) =>
        d.toLowerCase().includes(query)
      );
      const inKeywords = item.keywords.some((k) =>
        k.toLowerCase().includes(query)
      );

      return inQuestion || inShortAnswer || inDetails || inKeywords;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getCategoryIcon = (cat: FAQCategory) => {
    switch (cat) {
      case 'corporate':
        return <Building2 size={15} className="mr-1.5" />;
      case 'bespoke':
        return <User size={15} className="mr-1.5" />;
      case 'fabrics':
        return <Scissors size={15} className="mr-1.5" />;
      case 'locations':
        return <MapPin size={15} className="mr-1.5" />;
      default:
        return <Sparkles size={15} className="mr-1.5" />;
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1C1C1E' }}>
      {/* ── HEADER ── */}
      <section
        style={{
          background: '#1A5276',
          padding: 'clamp(100px, 16vw, 140px) 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 999,
                padding: '6px 16px',
                display: 'inline-block',
                marginBottom: 24,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              ← Back to Home
            </span>
          </Link>

          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 12,
            }}
          >
            Client Advisory & Knowledge Base
          </p>

          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              margin: '0 auto 20px',
              color: '#FFFFFF',
            }}
          >
            Frequently Asked <em style={{ fontStyle: 'normal', color: '#93C5FD' }}>Questions</em>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 620,
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Authoritative guidance on corporate uniform manufacturing, private bespoke suit commissions, fabric selection, and concierge fittings across Nigeria.
          </p>

          {/* ── SEARCH BAR ── */}
          <div
            style={{
              maxWidth: 620,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#FFFFFF',
                borderRadius: 999,
                padding: '10px 20px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Search size={20} color="#1A5276" style={{ flexShrink: 0, marginRight: 12 }} />
              <input
                type="text"
                placeholder="Search topics (e.g., MOQ, Scabal, turnaround, Abuja, wedding, alterations)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: 15,
                  color: '#1C1C1E',
                  background: 'transparent',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 4,
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ── */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #1A5276' : '1px solid rgba(0,0,0,0.08)',
                  background: isActive ? '#1A5276' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  boxShadow: isActive
                    ? '0 6px 16px rgba(26, 82, 118, 0.25)'
                    : '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                }}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                    color: isActive ? '#FFFFFF' : '#64748B',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results summary & Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            fontSize: 14,
            color: '#64748B',
          }}
        >
          <span>
            Showing <strong style={{ color: '#1C1C1E' }}>{filteredFaqs.length}</strong> questions
            {searchQuery && (
              <> matching &ldquo;<span style={{ color: '#1A5276' }}>{searchQuery}</span>&rdquo;</>
            )}
          </span>

          {filteredFaqs.length > 0 && (
            <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
              <button
                onClick={expandAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1A5276',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Expand all
              </button>
              <span style={{ color: '#CBD5E1' }}>|</span>
              <button
                onClick={collapseAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Collapse all
              </button>
            </div>
          )}
        </div>

        {/* ── ACCORDION LIST ── */}
        {filteredFaqs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#FFFFFF',
              borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1E', marginBottom: 8 }}>
              No matching questions found
            </p>
            <p style={{ fontSize: 14, color: '#64748B', maxWidth: 420, margin: '0 auto 20px' }}>
              We couldn&apos;t find an answer matching &ldquo;{searchQuery}&rdquo;. Speak directly with our master tailors or concierge team.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              style={{
                background: '#1A5276',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 16,
                    border: isOpen
                      ? '1px solid rgba(26, 82, 118, 0.3)'
                      : '1px solid rgba(0,0,0,0.06)',
                    boxShadow: isOpen
                      ? '0 8px 24px rgba(26, 82, 118, 0.08)'
                      : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.25s ease',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleOpen(faq.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: 16,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#1A5276',
                          background: 'rgba(26, 82, 118, 0.08)',
                          padding: '3px 10px',
                          borderRadius: 999,
                          display: 'inline-block',
                          marginBottom: 8,
                        }}
                      >
                        {faq.categoryLabel}
                      </span>
                      <h2
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 'clamp(16px, 2vw, 18px)',
                          fontWeight: 700,
                          color: '#1C1C1E',
                          margin: 0,
                          lineHeight: 1.35,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {faq.question}
                      </h2>
                    </div>

                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: isOpen ? '#1A5276' : 'rgba(0,0,0,0.04)',
                        color: isOpen ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 4,
                        transition: 'all 0.25s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div
                          style={{
                            padding: '0 24px 24px',
                            borderTop: '1px solid rgba(0,0,0,0.04)',
                          }}
                        >
                          {/* Direct Short Answer (AEO / Snippet Highlight) */}
                          <div
                            style={{
                              background: 'rgba(26, 82, 118, 0.04)',
                              borderLeft: '3px solid #1A5276',
                              padding: '14px 18px',
                              borderRadius: '0 10px 10px 0',
                              margin: '16px 0 16px',
                              fontSize: 15,
                              lineHeight: 1.65,
                              color: '#1C1C1E',
                              fontWeight: 500,
                            }}
                          >
                            {faq.shortAnswer}
                          </div>

                          {/* Bulleted Context & Specs */}
                          <ul
                            style={{
                              margin: '0 0 16px',
                              paddingLeft: 20,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 10,
                              fontSize: 14,
                              lineHeight: 1.65,
                              color: '#4B5563',
                            }}
                          >
                            {faq.detailedAnswer.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>

                          {/* Footer details: Keywords and Related Link */}
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 12,
                              paddingTop: 12,
                              borderTop: '1px solid rgba(0,0,0,0.05)',
                            }}
                          >
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {faq.keywords.slice(0, 3).map((kw, kidx) => (
                                <span
                                  key={kidx}
                                  style={{
                                    fontSize: 11,
                                    color: '#64748B',
                                    background: '#F1F5F9',
                                    padding: '2px 8px',
                                    borderRadius: 6,
                                  }}
                                >
                                  #{kw}
                                </span>
                              ))}
                            </div>

                            {faq.relatedLink && (
                              <Link
                                href={faq.relatedLink.href}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: '#1A5276',
                                  textDecoration: 'none',
                                  gap: 4,
                                }}
                              >
                                <span>{faq.relatedLink.label}</span>
                                <ArrowRight size={14} />
                              </Link>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* ── STILL HAVE QUESTIONS? CTA CARD ── */}
        <div
          style={{
            marginTop: 64,
            background: 'linear-gradient(135deg, #1A5276 0%, #153E5C 100%)',
            borderRadius: 24,
            padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(26, 82, 118, 0.2)',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <MessageSquare size={24} color="#FFFFFF" />
          </div>

          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 12px',
            }}
          >
            Have a custom enquiry or procurement request?
          </h3>

          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 540,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Whether you are outfitting a 200-person corporate workforce or commissioning a one-of-a-kind wedding garment, our master tailors are ready to advise you.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'center',
            }}
          >
            <a
              href="https://wa.me/2348103031020"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#25D366',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.2s',
              }}
            >
              <span>Message VIP Concierge on WhatsApp</span>
            </a>

            <Link
              href="/services/business"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '14px 28px',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <span>B2B Uniform Procurement</span>
            </Link>

            <Link
              href="/services/individual"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '14px 28px',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <span>Bespoke Private Commissions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
