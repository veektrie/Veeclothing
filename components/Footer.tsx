import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// ─── Nav columns (template: Company / Help / FAQ / Resources → rebranded for VCC) ───
const navGroups = [
  {
    heading: 'Company',
    links: [
      { title: 'About Us',         url: '/about' },
      { title: 'The Shop',         url: '/shop' },
      { title: 'Our Journal',      url: '/blog' },
      { title: 'Our Heritage',     url: '/#brand' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { title: 'Corporate Identity',   url: '/services/business' },
      { title: 'Custom Commissions',   url: '/services/individual' },
      { title: 'Business Gifting',     url: '/services/business' },
      { title: 'Executive Wardrobe',   url: '/services/individual' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { title: 'Consultation',         url: '/#consultation' },
      { title: 'WhatsApp Us',          url: 'https://wa.me/2348103031020' },
      { title: 'Terms & Conditions',   url: '/terms-and-conditions' },
      { title: 'Client Reviews',       url: '/#sentiments' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { title: 'Lagos, Nigeria',                   url: 'https://maps.google.com/?q=Lagos+Nigeria' },
      { title: '+234 810 303 1020',                url: 'tel:+2348103031020' },
      { title: 'veeclothingcompany@gmail.com',     url: 'mailto:veeclothingcompany@gmail.com' },
      { title: 'Instagram',                        url: 'https://instagram.com/veeclothingcompany' },
    ],
  },
];

// Social icons as inline SVGs
const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/veeclothingcompany',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/veeclothingcompany',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2348103031020',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.93a.5.5 0 00.613.613l6.076-1.475A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.38l-.36-.214-3.724.975.99-3.617-.235-.373A9.818 9.818 0 1112 21.818z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/veeclothing',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      style={{
        background: '#F8FAFC',
        borderTop: '1px solid rgba(28,28,30,0.06)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* ── Top grid ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem) clamp(2rem,4vw,3.5rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(200px,1.4fr) repeat(4,1fr)',
          gap: 'clamp(1.5rem,3vw,3rem)',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div itemScope itemType="https://schema.org/ClothingStore">
          {/* Light-mode navy logo */}
          <Image
            src="/VCC-navy.png"
            alt="Vee Clothing Company"
            width={100}
            height={32}
            className="object-contain mb-5 block dark:hidden"
            style={{ height: 'auto' }}
            priority
          />
          {/* Dark-mode white logo */}
          <Image
            src="/VCC-white.png"
            alt="Vee Clothing Company"
            width={100}
            height={32}
            className="object-contain mb-5 hidden dark:block"
            style={{ height: 'auto', opacity: 0.85 }}
            priority
          />

          <p
            style={{
              fontSize: 13,
              color: 'rgba(28,28,30,0.55)',
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 230,
              marginBottom: 20,
            }}
            className="footer-body-text"
          >
            Custom tailoring and business uniforms from Lagos, Nigeria — high quality with local soul.
          </p>

          {/* Social row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-icon-luxury"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', color: '#1A5276', textTransform: 'uppercase', fontWeight: 600 }}>
              Est. Lagos, Nigeria · 2018
            </p>
          </div>
        </div>

        {/* Nav columns */}
        {navGroups.map((group) => (
          <div key={group.heading}>
            <h4
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#1A5276',
                marginBottom: '1.25rem',
              }}
            >
              {group.heading}
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.links.map((lnk) => (
                <Link
                  key={lnk.title}
                  href={lnk.url}
                  target={lnk.url.startsWith('http') || lnk.url.startsWith('mailto') || lnk.url.startsWith('tel') ? '_blank' : undefined}
                  rel={lnk.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: 13,
                    color: 'rgba(28,28,30,0.55)',
                    textDecoration: 'none',
                    lineHeight: 2.1,
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                    transition: 'color 0.2s',
                  }}
                  className="footer-link"
                >
                  {lnk.title}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* ── Separator ────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        <div className="footer-sep" style={{ height: 1 }} />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '1.25rem clamp(1.5rem,5vw,4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
        className="footer-bottom-bar"
      >
        <span className="footer-copy" style={{ fontSize: 12, letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Vee Clothing Company. All Rights Reserved.
        </span>

        {/* Payment method icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/terms-and-conditions" className="footer-link" style={{ fontSize: 11, marginRight: 8 }}>Privacy</Link>
          <Link href="/terms-and-conditions" className="footer-link" style={{ fontSize: 11, marginRight: 16 }}>Terms of Use</Link>

          {/* Visa */}
          <svg width="38" height="22" viewBox="0 0 38 24" fill="none" style={{ opacity: 0.5 }}>
            <rect width="38" height="24" rx="3" fill="#1A1F71"/>
            <text x="6" y="17" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">VISA</text>
          </svg>
          {/* Mastercard */}
          <svg width="34" height="22" viewBox="0 0 34 24" fill="none" style={{ opacity: 0.5 }}>
            <rect width="34" height="24" rx="3" fill="#EB001B" fillOpacity="0.9"/>
            <circle cx="13" cy="12" r="7" fill="#EB001B"/>
            <circle cx="21" cy="12" r="7" fill="#F79E1B"/>
            <path d="M17 7.1a7 7 0 010 9.8A7 7 0 0117 7.1z" fill="#FF5F00"/>
          </svg>
          {/* Paystack wordmark pill */}
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.04em',
              background: 'rgba(28,28,30,0.08)',
              borderRadius: 4,
              padding: '3px 8px',
              color: 'rgba(28,28,30,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Paystack
          </span>
          {/* Bank Transfer pill */}
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.04em',
              background: 'rgba(28,28,30,0.08)',
              borderRadius: 4,
              padding: '3px 8px',
              color: 'rgba(28,28,30,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Bank Transfer
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;