'use client';

import Hero         from './../components/Hero';
import Lookbook     from './../components/Gallery';
import CorporateAtelier from './../components/Brand';
import BespokeProcess   from './../components/Category';
import Intro        from '@/components/Intro';
import Testimonials from '@/components/Testimonials';
import Journal      from '@/components/Journal';
import Contact      from './../components/Contact';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. Split Hero — Corporate dominant (60%) | Bespoke secondary (40%) */}
      <Hero />

      {/* 2. Corporate Atelier — Primary profit driver, leads this position */}
      <CorporateAtelier />

      {/* 3. Lookbook — Editorial collection showcase */}
      <Lookbook />

      {/* 4. Bespoke Process — Individual commissions, intimate storytelling */}
      <BespokeProcess />

      {/* 5. Video reel — Craft in motion */}
      <Intro />

      {/* 6. Testimonials / Letters of Recommendation */}
      <Testimonials />

      {/* 7. Journal — SEO topical authority */}
      <Journal />

      {/* 8. Consultation Request — Unified CTA for both paths */}
      <Contact />
    </main>
  );
}