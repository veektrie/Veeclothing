import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bespoke Tailoring — The Private Commission | Vee Clothing",
  description: "Experience the ultimate in personal style with our bespoke tailoring services. Handcrafted suits, kaftans, and agbadas made to your exact measurements in Lagos.",
};

export default function IndividualLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
