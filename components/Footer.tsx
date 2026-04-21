import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navGroups = [
  {
    heading: 'Services',
    links: [
      { title: 'Corporate Partnerships', url: '#corporate' },
      { title: 'Private Commissions', url: '#bespoke' },
      { title: 'The Collection',        url: '/shop' },
      { title: 'Executive Wardrobe',    url: '#bespoke' },
      { title: 'Corporate Gifting',     url: '#corporate' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { title: 'Our Craft',       url: '#bespoke' },
      { title: 'The Journal',     url: '/journal' },
      { title: 'Client Sentiments', url: '/#sentiments' },
      { title: 'About Vee',       url: '#' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { title: 'Request Consultation', url: '#consultation' },
      { title: 'WhatsApp Us',          url: 'https://wa.me/2348103031020' },
      { title: 'Instagram',            url: 'https://instagram.com/veeclothingcompany' },
      { title: 'Facebook',             url: 'https://facebook.com/veeclothingcompany' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer-luxury">
      {/* Top */}
      <div className="footer-top">
        {/* Brand column — NAP for Local SEO */}
        <div itemScope itemType="https://schema.org/ClothingStore">
          <Image
            src="/VCC-gold.png"
            alt="Vee Clothing Company"
            width={110}
            height={36}
            className="object-contain mb-6"
            style={{ height: 'auto', opacity: 0.9 }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 300,
              marginBottom: 24,
            }}
          >
            Bespoke tailoring and corporate identity solutions from Lagos, Nigeria — crafted to global standards with local soul.
          </p>

          {/* NAP block — matches Google Business Profile exactly */}
          <address
            style={{
              fontStyle: 'normal',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              {
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ),
                label: 'Lagos, Nigeria',
                itemProp: 'address',
              },
              {
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 011 1.18 2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                ),
                label: '+234 810 303 1020',
                itemProp: 'telephone',
              },
              {
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                ),
                label: 'veeclothingcompany@gmail.com',
                itemProp: 'email',
              },
            ].map((item) => (
              <div
                key={item.label}
                itemProp={item.itemProp}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                {item.icon}
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </address>

          {/* Gold accent line */}
          <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', marginBottom: 16 }} />
          <p style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase' }}>
            Est. Lagos, Nigeria
          </p>
        </div>

        {/* Nav groups */}
        {navGroups.map((group) => (
          <div key={group.heading}>
            <h4 className="footer-heading">{group.heading}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {group.links.map((lnk) => (
                <Link
                  key={lnk.title}
                  href={lnk.url}
                  target={lnk.url.startsWith('http') ? '_blank' : undefined}
                  rel={lnk.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="footer-link"
                >
                  {lnk.title}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 4rem' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Vee Clothing Company. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/" className="footer-link">Privacy</Link>
          <Link href="/" className="footer-link">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;