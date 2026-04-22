'use client';

import Hero              from './../components/Hero';
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

      {/* 1. Hero — corporate/bespoke toggle & Trust Bar inside */}
      <Hero />

      {/* 2. Corporate Atelier — B2B services */}
      <CorporateAtelier />

      {/* 3. Private Commissions — directly under Corporate */}
      <BespokeProcess />

      {/* 4. Shop Preview — collection teaser → /shop */}
      <ShopPreview />

      {/* 5. The Journal — SEO topical authority */}
      <Journal />

      {/* 6. Social Proof Ribbon — merged testimonials + reviews */}
      <SocialProofRibbon />

      {/* 7. FAQ — friction removal */}
      <FAQSection />

      {/* 8. Concierge Portal — consultation CTA */}
      <Contact />

      {/* 9. Floating craft video widget */}
      <CraftWidget />

    </main>
  );
}