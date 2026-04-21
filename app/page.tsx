'use client';

import Hero              from './../components/Hero';
import TrustBar          from './../components/TrustBar';
import CorporateAtelier  from './../components/Brand';
import BespokeProcess    from './../components/Category';
import ShopPreview       from './../components/ShopPreview';
import SocialProofRibbon from '@/components/SocialProofRibbon';
import Journal           from '@/components/Journal';
import FAQSection        from '@/components/FAQ';
import Contact           from './../components/Contact';
import CraftWidget       from '@/components/CraftWidget';

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* 1. Hero — corporate/bespoke toggle */}
      <Hero />

      {/* 2. Trust bar — client marquee */}
      <TrustBar />

      {/* 3. Corporate Atelier — B2B services */}
      <CorporateAtelier />

      {/* 4. Private Commissions — directly under Corporate */}
      <BespokeProcess />

      {/* 5. Shop Preview — collection teaser → /shop */}
      <ShopPreview />

      {/* 6. Social Proof Ribbon — merged testimonials + reviews */}
      <SocialProofRibbon />

      {/* 7. The Journal — SEO topical authority */}
      <Journal />

      {/* 8. FAQ — friction removal */}
      <FAQSection />

      {/* 9. Concierge Portal — consultation CTA */}
      <Contact />

      {/* 10. Floating craft video widget */}
      <CraftWidget />

    </main>
  );
}