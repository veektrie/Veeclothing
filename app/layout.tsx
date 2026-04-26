import Navbar    from "@/components/Navbar";
import Footer    from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import GSAPInitializer from "@/components/GSAPInitializer";
import "./globals.css";
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL("https://veeclothingcompany.com"),
  title: "VeeClothingCompany",
  description:
    "Vee Clothing Company — Lagos's premier destination for bespoke tailoring, corporate uniform engineering, and executive menswear. Custom tailored suits, premium African menswear, and branded corporate apparel crafted to global standards with local soul.",
  keywords: [
    "bespoke tailoring Lagos",
    "custom tailored suits Nigeria",
    "corporate uniforms Lagos",
    "luxury menswear Africa",
    "premium bespoke menswear Nigeria",
    "executive wardrobe Lagos",
    "artisan tailoring Africa",
    "corporate branding apparel Nigeria",
  ],
  openGraph: {
    title: "Vee Clothing Company | Bespoke Tailoring & Corporate Uniforms Lagos",
    description:
      "Crafting premium bespoke garments and corporate identity solutions from Lagos, Nigeria. Global standards. Local soul.",
    url: "https://veeclothingcompany.com",
    siteName: "Vee Clothing Company",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/kaftan07.jpeg",
        width: 1200,
        height: 630,
        alt: "Vee Clothing Company",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* — Organization Schema — */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Vee Clothing Company",
          "url": "https://veeclothingcompany.com",
          "logo": "https://veeclothingcompany.com/VCC-white.png",
          "description": "Lagos-based premium bespoke tailoring house and corporate uniform engineering firm. Global standards. Local soul.",
          "foundingLocation": { "@type": "Place", "name": "Lagos, Nigeria" },
          "areaServed": ["Nigeria", "West Africa", "African Diaspora"],
          "telephone": "+2348103031020",
          "contactPoint": { "@type": "ContactPoint", "telephone": "+2348103031020", "contactType": "Customer Service", "availableLanguage": "English" },
          "sameAs": [
            "https://instagram.com/veeclothingcompany",
            "https://facebook.com/veeclothingcompany",
            "https://wa.me/2348103031020"
          ]
        })}} />

        {/* — Service Schema: Corporate Branding (B2B) — */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Corporate Uniform Engineering",
          "name": "Corporate Identity & Uniform Engineering",
          "description": "Precision-branded corporate uniforms, executive wardrobe curation, and branded gifting solutions for organisations across Nigeria. Minimum order: 5 units. Up to 500+ units. On-site fittings available in Lagos and Abuja.",
          "provider": { "@type": "Organization", "name": "Vee Clothing Company", "url": "https://veeclothingcompany.com" },
          "areaServed": { "@type": "Place", "name": "Nigeria" },
          "audience": { "@type": "BusinessAudience", "name": "Corporate clients, HR departments, and brand managers" },
          "offers": { "@type": "Offer", "priceCurrency": "NGN", "availability": "https://schema.org/InStock", "priceRange": "₦₦₦" },
          "url": "https://veeclothingcompany.com/#corporate"
        })}} />

        {/* — Service Schema: Bespoke Tailoring (B2C) — */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Bespoke Tailoring",
          "name": "Bespoke Tailoring — The Private Commission",
          "description": "Made-to-measure bespoke suits, kaftans, and agbada for discerning individuals in Lagos and across Nigeria. Private consultation, minimum two fittings, premium global and local fabrics. Turnaround: minimum 10 working days.",
          "provider": { "@type": "Organization", "name": "Vee Clothing Company", "url": "https://veeclothingcompany.com" },
          "areaServed": [{ "@type": "Place", "name": "Lagos, Nigeria" }, { "@type": "Place", "name": "Abuja, Nigeria" }],
          "audience": { "@type": "Audience", "name": "Individual clients, executives, and high-net-worth individuals" },
          "offers": { "@type": "Offer", "priceCurrency": "NGN", "availability": "https://schema.org/InStock", "priceRange": "₦₦₦₦" },
          "url": "https://veeclothingcompany.com/#bespoke"
        })}} />

        {/* — FAQ Schema — */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is the minimum order for corporate uniforms in Lagos?", "acceptedAnswer": { "@type": "Answer", "text": "Vee Clothing Company accepts corporate uniform orders from as few as 5 garments up to 500+. Volume pricing applies for orders exceeding 50 units. All orders receive identical quality assurance regardless of scale." }},
            { "@type": "Question", "name": "How long does a bespoke tailoring commission take?", "acceptedAnswer": { "@type": "Answer", "text": "All commissions at Vee Clothing Company take a minimum of 10 working days. Bulk corporate orders of 50+ units may take up to 15 working days. Rush commissions may be accommodated depending on schedule." }},
            { "@type": "Question", "name": "Does Vee Clothing Company do on-site corporate fittings?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. For corporate orders of 20 or more staff, Vee Clothing Company offers on-site fitting sessions at your Lagos or Abuja office. Virtual consultations are available for clients outside Nigeria." }},
            { "@type": "Question", "name": "What fabrics does Vee Clothing Company use for bespoke garments?", "acceptedAnswer": { "@type": "Answer", "text": "Vee Clothing Company sources from Holland & Sherry wool mills in the UK, Italian linen and silk blends, and premium Nigerian fabrics including Adire, kente, and ankara, depending on the garment type and client vision." }},
            { "@type": "Question", "name": "How does Vee Clothing Company ensure corporate brand consistency?", "acceptedAnswer": { "@type": "Answer", "text": "A Brand Alignment session precedes all production. Approved colour codes, logo placements, and fabric specifications are documented and signed off. Every garment in the order is verified against the approved sample before dispatch." }}
          ]
        })}} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BJ0RRN35YS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BJ0RRN35YS');
          `}
        </Script>
      </head>
      <body className="relative">
        <GSAPInitializer />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
