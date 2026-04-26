import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

import Hero from '../components/landingPages/Hero';
import CorporateAtelier from '@/components/landingPages/Brand';
import BespokeProcess from '@/components/landingPages/Category';
import ShopPreview from '@/components/landingPages/ShopPreview';
import SocialProofRibbon from '@/components/landingPages/SocialProofRibbon';
import Journal from '@/components/landingPages/Journal';
import FAQSection from '@/components/landingPages/FAQ';
import Contact from '@/components/landingPages/Contact';
import CraftWidget from '@/components/landingPages/CraftWidget';

const latestArticlesQuery = groq`*[_type == "blog"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  "excerpt": array::join(string::split((pt::text(content)), "")[0..150], "") + "...",
  "readTime": "6 min read" 
}`;

export default async function Home() {
  const articles = await client.fetch(latestArticlesQuery);

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
      <Journal articles={articles} />

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