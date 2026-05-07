import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Selection | Vee Clothing Company',
  robots: { index: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
