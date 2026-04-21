import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Shop — Vee Clothing Company | Executive & Bespoke Menswear Lagos',
  description: 'Browse and commission bespoke suits, kaftans, agbadas, and corporate uniforms. Every garment crafted to order at Vee Clothing Company, Lagos.',
  keywords: ['bespoke suits Lagos', 'buy kaftan Nigeria', 'corporate uniforms shop', 'executive menswear Lagos', 'agbada bespoke Nigeria'],
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
