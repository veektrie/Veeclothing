import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | Vee Clothing Company',
  robots: { index: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
