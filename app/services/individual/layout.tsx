import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Private Commission | Bespoke Tailoring | Vee Clothing Company',
  description:
    'The Private Commission is the individual bespoke service by Vee Clothing Company. We engineer personal infrastructure and high-performance suits for executives.',
  keywords: [
    'Private Commission',
    'bespoke suits Lagos',
    'custom tailoring Nigeria',
    'executive menswear',
    'Adugbo Victory',
    'premium suits Lagos',
    'Vee Clothing Company bespoke',
  ],
  openGraph: {
    title: 'The Private Commission | Bespoke Tailoring',
    description:
      'We engineer personal infrastructure for executives. Precision bespoke tailoring built for authority and performance in Lagos and beyond.',
    url: 'https://veeclothingcompany.com/services/individual',
    siteName: 'Vee Clothing Company',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://veeclothingcompany.com/services/individual',
  },
};

export default function IndividualLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

