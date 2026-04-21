'use client';

import Hero             from './../components/Hero';
import TrustBar         from './../components/TrustBar';
import CorporateAtelier from './../components/Brand';
import Lookbook         from './../components/Gallery';
import BespokeProcess   from './../components/Category';
import Intro            from '@/components/Intro';
import ReviewCarousel   from '@/components/ReviewCarousel';
import Testimonials     from '@/components/Testimonials';
import Journal          from '@/components/Journal';
import Contact          from './../components/Contact';
import CraftWidget      from '@/components/CraftWidget';

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* 1. Full-screen hero toggle — Corporate (default) vs Bespoke */}
      <Hero />

      {/* 2. Trust bar — greyscale → gold logo marquee */}
      <TrustBar />

      {/* 3. Corporate Atelier — PRIMARY profit section */}
      <CorporateAtelier />

      {/* 4. Editorial Lookbook — Collection grid */}
      <Lookbook />

      {/* 5. Bespoke Process — Individual commission journey */}
      <BespokeProcess />

      {/* 6. Video section — "The Art of Tailoring, In Motion" */}
      <Intro />

      {/* 7. White-labelled review carousel — gold stars + Google verified badge */}
      <ReviewCarousel />

      {/* 8. Letters of Recommendation — deep testimonials */}
      <Testimonials />

      {/* 9. Journal — SEO topical authority */}
      <Journal />

      {/* 10. Consultation request — unified CTA */}
      <Contact />

      {/* 11. Floating craft widget — live video bubble, bottom-right */}
      <CraftWidget />

    </main>
  );
}