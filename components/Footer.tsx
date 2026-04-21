import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navGroups = [
  {
    heading: 'Services',
    links: [
      { title: 'Corporate Partnerships', url: '#corporate' },
      { title: 'Private Commissions', url: '#bespoke' },
      { title: 'The Collection',        url: '#collection' },
      { title: 'Executive Wardrobe',    url: '#bespoke' },
      { title: 'Corporate Gifting',     url: '#corporate' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { title: 'Our Craft',       url: '#bespoke' },
      { title: 'The Journal',     url: '#journal' },
      { title: 'Client Sentiments', url: '#' },
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
        {/* Brand column */}
        <div>
          <Image
            src="/VCC.png"
            alt="Vee Clothing Company"
            width={110}
            height={36}
            className="object-contain brightness-0 invert opacity-70 mb-6"
            style={{ height: 'auto' }}
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
          {/* Gold accent line */}
          <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', marginBottom: 20 }} />
          <p style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase' }}>
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