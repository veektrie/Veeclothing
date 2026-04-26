'use client';

import Hero from '../components/landingPages/Hero';
import CorporateAtelier from '@/components/landingPages/Brand';
import BespokeProcess from '@/components/landingPages/Category';
import ShopPreview from '@/components/landingPages/ShopPreview';
import SocialProofRibbon from '@/components/landingPages/SocialProofRibbon';
import Journal from '@/components/landingPages/Journal';
import FAQSection from '@/components/landingPages/FAQ';
import Contact from '@/components/landingPages/Contact';
import CraftWidget from '@/components/landingPages/CraftWidget';

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