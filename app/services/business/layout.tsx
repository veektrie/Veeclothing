import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Corporate Atelier | B2B Procurement | Vee Clothing Company',
  description:
    'The Corporate Atelier is the B2B procurement division of Vee Clothing Company. We transition elite organizations from standard uniforms to structural brand assets.',
  keywords: [
    'Corporate Atelier',
    'B2B uniform procurement',
    'corporate wardrobes Lagos',
    'enterprise brand assets',
    'corporate uniform manufacturing Nigeria',
    'executive wear Lagos',
    'Vee Clothing Company B2B',
  ],
  openGraph: {
    title: 'The Corporate Atelier | B2B Procurement',
    description:
      'Transitioning organizations from standard uniforms to cohesive, high-end corporate wardrobes. Science-based scaling for elite workforces.',
    url: 'https://veeclothingcompany.com/services/business',
    siteName: 'Vee Clothing Company',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://veeclothingcompany.com/services/business',
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

