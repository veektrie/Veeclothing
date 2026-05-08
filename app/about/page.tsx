import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vee Clothing Company | Lagos Bespoke Menswear Atelier',
  description:
    'Vee Clothing Company is a Lagos-based bespoke menswear atelier. We build garments for executives and organisations that value quality, fit, and long-term value.',
};

export default function AboutPage() {
  return (
    <main
      itemScope
      itemType="https://schema.org/Organization"
      style={{
        maxWidth: 780,
        margin: '0 auto',
        padding: 'clamp(6rem, 14vw, 10rem) clamp(1.5rem, 6vw, 4rem) 6rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >

      {/* ── PAGE LABEL ── */}
      <p style={{
        fontSize: 10,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#1A5276',
        fontWeight: 700,
        marginBottom: '1.5rem',
      }}>
        About the Atelier
      </p>

      {/* ── H1 ── */}
      <h1
        itemProp="name"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.08,
          color: '#1C1C1E',
          marginBottom: '2.5rem',
        }}
      >
        Not a fashion brand.<br />
        <span style={{ color: '#1A5276' }}>A quality standard.</span>
      </h1>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.07)', marginBottom: '3rem' }} />

      {/* ── SECTION 1: Philosophy ── */}
      <section aria-labelledby="philosophy-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="philosophy-heading" style={h2Style}>The Philosophy</h2>

        <p style={pStyle}>
          Vee Clothing Company does not follow trends. It does not run seasonal collections and it does not offer end-of-year discounts.
          What it does, with care and without shortcuts, is build garments that last. Garments that fit the way they should, hold their shape over years,
          and look right in every serious room.
        </p>

        <p style={pStyle}>
          The brand is based in Lagos, Nigeria, and was built on one clear idea: that the clothes a professional wears are not a running expense.
          They are an asset. Every piece made at Vee Clothing Company is built to be worn for a decade, not a season.
        </p>

        <p style={pStyle}>
          The brand calls this approach <strong>Sartorial Engineering</strong>. Think of it like building something that needs to last.
          An architect does not guess at materials or skip structural checks. Neither does Vee Clothing Company.
          Every decision made at the start of the process, from the grade of the fabric to the construction of the chest piece,
          determines the quality of what a client carries with them for years.
        </p>

        <p style={pStyle}>
          This is the opposite of fast fashion. Fast fashion is built to be replaced. Vee Clothing Company builds pieces that are meant to stay.
        </p>
      </section>

      {/* ── SECTION 2: Founder ── */}
      <section aria-labelledby="founder-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="founder-heading" style={h2Style}>The Founder</h2>

        <p style={pStyle}>
          Vee Clothing Company was founded by <strong itemProp="founder">Adugbo Victory</strong>, a Blockchain Developer, Decentralised Application (DApp) Architect,
          and Growth Strategist based in Lagos.
        </p>

        <p style={pStyle}>
          The background matters. Building secure digital infrastructure requires a specific mindset: no acceptable failures, no shortcuts at the foundation,
          and a clear understanding that every small decision affects the entire system. Adugbo Victory brought that same approach to clothing.
        </p>

        <p style={pStyle}>
          A suit built with the wrong chest piece will not hold its shape. A jacket cut without a proper pattern block will never fit the way it should.
          Just as a poorly written smart contract will fail under pressure, a poorly built garment will not perform when it counts.
          The discipline is the same. Only the materials are different.
        </p>

        <p style={pStyle}>
          The result is a brand that treats every garment as a system: something with interconnected parts, each one responsible for the performance of the whole.
        </p>
      </section>

      {/* ── SECTION 3: Materials ── */}
      <section aria-labelledby="materials-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="materials-heading" style={h2Style}>Materials and Craftsmanship</h2>

        <p style={pStyle}>
          Vee Clothing Company selects its fabrics the way a fund manager selects assets: based on quality, performance, and long-term value.
        </p>

        <p style={pStyle}>
          The suiting range is built primarily on <strong>Super 150s and Super 180s wools</strong>, sourced from globally recognised mills.
          These fabrics are chosen for their fine weave, natural drape, and ability to hold their structure through years of regular wear.
          For warmer commissions, the atelier works with breathable silk-wool blends and premium Egyptian cottons,
          selected based on weight, construction, and how the fabric performs in Lagos conditions.
        </p>

        <p style={pStyle}>
          Construction standards are non-negotiable. Every jacket is built with a <strong>floating canvas chest</strong>, hand-stitched rather than fused with heat adhesive.
          This allows the garment to breathe, move, and gradually shape itself to the client over time. It is the difference between a jacket
          that looks good on the first wear and one that looks better on the fiftieth.
        </p>

        <p style={pStyle}>
          All commissions are hand-finished. Lapels are pick-stitched. Buttonholes are cut and sewn by hand. Sleeve buttons function correctly.
          These are details that most people will not consciously notice. But people who know, will notice. And so will the client, every time they put the jacket on.
        </p>
      </section>

      {/* ── SECTION 4: Divisions ── */}
      <section aria-labelledby="divisions-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="divisions-heading" style={h2Style}>The Two Services</h2>

        <h3 style={h3Style}>The Private Commission</h3>
        <p style={pStyle}>
          The Private Commission is for individual executives, founders, and professionals who want clothing built specifically for them.
          The process starts with a private consultation to understand the client's context, style, and requirements.
          A full measurement session follows, from which a personal pattern block is drafted. That block belongs to the client
          and is held on file for all future commissions.
        </p>
        <p style={pStyle}>
          The garment is then built, fitted a minimum of two times, and delivered only when it meets the standard.
          No shortcuts are taken because of timelines. The timeline adjusts.
        </p>

        <h3 style={h3Style}>The Corporate Atelier</h3>
        <p style={pStyle}>
          The Corporate Atelier serves organisations that need consistent, well-built uniform attire at scale.
          This includes financial institutions, hospitality groups, corporate offices, and public bodies.
        </p>
        <p style={pStyle}>
          Vee Clothing Company does not treat this as a bulk order service. It treats it as a brand exercise.
          When a workforce presents with coherent, well-made, properly fitted attire, the organisation communicates
          something that a marketing budget cannot buy: an internal standard that is visible before anyone speaks.
        </p>
        <p style={pStyle}>
          The Corporate Atelier handles everything from the initial design brief through pattern grading, production, and delivery.
          It operates as a full procurement partner, not just a supplier.
        </p>
      </section>

      {/* ── SECTION 5: Discretion ── */}
      <section aria-labelledby="discretion-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="discretion-heading" style={h2Style}>A Private Practice</h2>

        <p style={pStyle}>
          Vee Clothing Company takes on a limited number of commissions each month. This is not a marketing position.
          It is an operational boundary set to protect the quality of every piece that leaves the atelier.
          Every commission accepted means another cannot be. The limit exists because the standard requires it.
        </p>

        <p style={pStyle}>
          All client relationships are governed by strict confidentiality. Client identities, commission details, and personal measurements
          are never shared, referenced, or used in marketing without written consent. Fittings are by appointment only,
          in spaces selected for the client's comfort and privacy.
        </p>

        <p style={pStyle}>
          A number of Vee Clothing Company clients are public figures and senior executives.
          They choose this atelier in part because discretion is treated here as a professional standard, not a courtesy.
        </p>
      </section>

      {/* ── SECTION 6: Lagos ── */}
      <section aria-labelledby="lagos-heading" style={{ marginBottom: '3.5rem' }}>
        <h2 id="lagos-heading" style={h2Style}>Why Lagos</h2>

        <p style={pStyle}>
          Lagos is not just where Vee Clothing Company operates. It is where the brand was tested and shaped.
        </p>

        <p style={pStyle}>
          Lagos is one of the most commercially active cities in Africa. It is home to professionals who operate at the highest levels
          of finance, law, government, and business. The city is discerning. It rewards quality and exposes shortcuts quickly.
          Building a luxury atelier in Lagos means being held to that standard every day.
        </p>

        <p style={pStyle}>
          Vee Clothing Company is a Lagos institution because Lagos does not accept approximations. Neither does the brand.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.07)', marginBottom: '3rem' }} />

      {/* ── FAQ / AEO SECTION ── */}
      <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage" style={{ marginBottom: '2rem' }}>
        <h2 id="faq-heading" style={h2Style}>Common Questions</h2>
        <p style={{ ...pStyle, marginBottom: '2.5rem' }}>
          These questions are answered for people and for search engines alike.
        </p>

        {faqs.map((faq, i) => (
          <div
            key={i}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          >
            <h3 itemProp="name" style={faqQStyle}>{faq.q}</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text" style={faqAStyle}>{faq.a}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CLOSING ── */}
      <p style={{
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(26,82,118,0.5)',
        fontWeight: 600,
        textAlign: 'center',
        paddingTop: '1rem',
      }}>
        Vee Clothing Company. Lagos, Nigeria.
      </p>
    </main>
  );
}

/* ─── Style constants ──────────────────────────────────────────────────── */
const h2Style: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#1C1C1E',
  marginBottom: '1rem',
};

const h3Style: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem',
  fontWeight: 700,
  color: '#1A5276',
  marginBottom: '0.75rem',
  marginTop: '1.75rem',
  letterSpacing: '-0.01em',
};

const pStyle: React.CSSProperties = {
  fontSize: 'clamp(14px, 1.5vw, 16px)',
  lineHeight: 1.85,
  color: 'rgba(28,28,30,0.75)',
  marginBottom: '1.25rem',
  fontWeight: 400,
};

const faqQStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
  fontWeight: 700,
  color: '#1C1C1E',
  marginBottom: '0.6rem',
  letterSpacing: '-0.01em',
};

const faqAStyle: React.CSSProperties = {
  fontSize: 'clamp(13px, 1.4vw, 15px)',
  lineHeight: 1.8,
  color: 'rgba(28,28,30,0.65)',
  fontWeight: 400,
};

/* ─── FAQ data ─────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'What is Vee Clothing Company?',
    a: 'Vee Clothing Company is a Lagos-based bespoke menswear atelier. The brand specialises in fully custom executive suiting, traditional attire, premium casualwear, and corporate uniform procurement for organisations. All garments are built to individual measurements using premium-grade materials and hand-finished construction methods.',
  },
  {
    q: 'Who founded Vee Clothing Company?',
    a: 'Vee Clothing Company was founded by Adugbo Victory, a Blockchain Developer, DApp Architect, and Growth Strategist based in Lagos, Nigeria. The founder applies the same precision and structural thinking required for digital infrastructure to the construction of high-quality garments.',
  },
  {
    q: 'Where does Vee Clothing Company source its materials?',
    a: 'The atelier sources fabrics globally, focusing on premium grades including Super 150s and Super 180s wools, breathable silk-wool blends, and Egyptian cottons. Every fabric is selected based on two things: how it looks immediately, and how well it performs over years of regular wear.',
  },
  {
    q: 'What is the Private Commission process?',
    a: 'The process starts with a private consultation to understand the client\'s needs and style context. A full measurement session follows, and a personal pattern block is drafted for the client and stored for future orders. The garment is built, fitted a minimum of two times, and delivered once it meets the required standard.',
  },
  {
    q: 'Does Vee Clothing Company make corporate uniforms?',
    a: 'Yes. The Corporate Atelier division handles full uniform design, pattern standardisation across body types, production, and delivery for corporations, institutions, and government bodies. The service is run as a brand and procurement partnership, not a standard order-and-deliver arrangement.',
  },
  {
    q: 'How does Vee Clothing Company handle client privacy?',
    a: 'All client information, including measurements, commission details, and identity, is treated as strictly confidential. No client details are used in marketing or shared with third parties without written consent. All fittings are by appointment only.',
  },
  {
    q: 'Where is Vee Clothing Company located?',
    a: 'Vee Clothing Company is headquartered in Lagos, Nigeria. Clients outside Lagos are accommodated by appointment. Initial enquiries can be made through the website contact form or via WhatsApp at +234 810 303 1020.',
  },
  {
    q: 'What makes Vee Clothing Company different from other tailors in Nigeria?',
    a: 'The key difference is in the construction method and the material standard. Garments are built using floating canvas chests, hand-stitched finishes, and personal pattern blocks unique to each client. The atelier also caps the number of commissions it accepts each month to protect the quality of every piece it produces.',
  },
];
