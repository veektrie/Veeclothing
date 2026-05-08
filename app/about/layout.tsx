import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Vee Clothing Company | Lagos Bespoke Menswear Atelier',
  description:
    'Vee Clothing Company is a Lagos-based bespoke menswear atelier. Learn about our founder, our craftsmanship standards, our private commission process, and our corporate uniform services.',
  keywords: [
    'Vee Clothing Company',
    'bespoke suits Lagos',
    'custom menswear Nigeria',
    'corporate uniforms Lagos',
    'luxury tailoring Nigeria',
    'Adugbo Victory',
    'executive menswear Lagos',
  ],
  openGraph: {
    title: 'About Vee Clothing Company | Lagos Bespoke Menswear Atelier',
    description:
      'A Lagos-based atelier for executive menswear and corporate uniform solutions. Built on precision, discretion, and long-term quality.',
    url: 'https://veeclothingcompany.com/about',
    siteName: 'Vee Clothing Company',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://veeclothingcompany.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
