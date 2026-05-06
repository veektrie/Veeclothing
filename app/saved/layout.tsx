import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Pieces | Vee Clothing Company',
  description: 'Your saved collection — pieces held for your consideration.',
  alternates: { canonical: '/saved' },
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
