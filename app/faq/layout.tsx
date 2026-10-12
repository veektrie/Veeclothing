import type { Metadata } from 'next';
import { FAQ_DATA } from '@/constants/faqData';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Vee Clothing Company',
  description:
    'Comprehensive answers to common questions regarding corporate uniform manufacturing, bespoke tailoring, fabric curation, 30-point measurements, fittings, and nationwide concierge delivery across Lagos, Abuja, and Asaba.',
  keywords: [
    'Vee Clothing Company FAQ',
    'corporate uniforms FAQ Lagos',
    'bespoke suit questions Nigeria',
    'tailoring process Lagos',
    'Scabal suits Nigeria',
    'corporate uniform MOQ Lagos',
    'floating canvas suit Lagos',
    'bespoke tailor Abuja Maitama',
    'concierge tailor Asaba',
  ],
  alternates: {
    canonical: 'https://www.veeclothingcompany.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Vee Clothing Company',
    description:
      'Answers to client queries on corporate uniform manufacturing, bespoke suit commissions, fabric selection, and concierge fittings across Nigeria.',
    url: 'https://www.veeclothingcompany.com/faq',
    siteName: 'Vee Clothing Company',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  // Construct Schema.org FAQPage structured data for all 26 questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.shortAnswer} ${item.detailedAnswer.join(' ')}`,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.veeclothingcompany.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://www.veeclothingcompany.com/faq',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
