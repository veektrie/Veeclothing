import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

import Hero from '../components/landingPages/Hero';
import CorporateAtelier from '@/components/landingPages/Brand';

import ShopPreview from '@/components/landingPages/ShopPreview';
import SocialProofRibbon from '@/components/landingPages/SocialProofRibbon';
import Journal from '@/components/landingPages/Journal';
import FAQSection from '@/components/landingPages/FAQ';
import Contact from '@/components/landingPages/Contact';
import CraftWidget from '@/components/landingPages/CraftWidget';
import WhyChooseUs from '@/components/landingPages/WhyChooseUs';

const latestArticlesQuery = groq`*[_type == "blog"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  category,
  author,
  publishedAt,
  "imageUrl": image.asset->url,
  "excerpt": array::join(string::split((pt::text(content)), "")[0..160], "") + "...",
  "readTime": string(round(length(pt::text(content)) / 1000) + 1) + " min read"
}`;

const shopPreviewQuery = groq`*[_type == "product"] | order(_createdAt desc)[0...12] {
  _id,
  name,
  "slug": slug.current,
  price,
  tag,
  "cat": category,
  "desc": description,
  "src": image.asset->url
}`;

export default async function Home() {
  const articles = await client.fetch(latestArticlesQuery);
  const products = await client.fetch(shopPreviewQuery);

  return (
    <main className="overflow-hidden">

      {/* 1. Hero — cinematic video background */}
      <Hero />
      
      {/* 1.5 Why Choose Us — with floating trust bar */}
      <WhyChooseUs />

      {/* 2. Corporate Atelier — B2B services */}
      <CorporateAtelier />



      {/* 4. Shop Preview — collection teaser → /shop */}
      <ShopPreview products={products} />

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