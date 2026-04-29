import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Corporate Identity & Uniform Engineering | Vee Clothing",
  description: "Precision-branded corporate uniforms and executive wardrobe solutions for organizations in Lagos. Enhance your brand authority with Vee Clothing Company.",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
