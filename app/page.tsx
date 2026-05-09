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
import CTABanner from '@/components/landingPages/CTABanner';

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
  "src": image.asset->url,
  sizes,
  colors[]{name, hex}
}`;

import AnimatedSection from '@/components/AnimatedSection';

export default async function Home() {
  const articles = await client.fetch(latestArticlesQuery);
  const products = await client.fetch(shopPreviewQuery);

  return (
    <main className="overflow-hidden">
      <Hero />
      
      <AnimatedSection>
        <WhyChooseUs />
      </AnimatedSection>

      <AnimatedSection>
        <CorporateAtelier />
      </AnimatedSection>

      <AnimatedSection>
        <ShopPreview products={products} />
      </AnimatedSection>

      <AnimatedSection>
        <Journal articles={articles} />
      </AnimatedSection>

      <AnimatedSection>
        <SocialProofRibbon />
      </AnimatedSection>

      <AnimatedSection>
        <FAQSection />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>

      <AnimatedSection>
        <CTABanner />
      </AnimatedSection>

      <CraftWidget />
    </main>
  );
}