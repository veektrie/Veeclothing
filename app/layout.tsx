import Navbar    from "@/components/Navbar";
import Footer    from "@/components/Footer";
import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vee Clothing Company | Bespoke Tailoring & Corporate Uniforms Lagos",
  description:
    "Vee Clothing Company — Lagos's premier destination for bespoke tailoring, corporate uniform engineering, and executive menswear. Custom tailored suits, premium African menswear, and branded corporate apparel crafted to global standards with local soul.",
  keywords: [
    "bespoke tailoring Lagos",
    "custom tailored suits Nigeria",
    "corporate uniforms Lagos",
    "luxury menswear Africa",
    "premium bespoke menswear Nigeria",
    "executive wardrobe Lagos",
    "artisan tailoring Africa",
    "corporate branding apparel Nigeria",
  ],
  openGraph: {
    title: "Vee Clothing Company | Bespoke Tailoring & Corporate Uniforms Lagos",
    description:
      "Crafting premium bespoke garments and corporate identity solutions from Lagos, Nigeria. Global standards. Local soul.",
    url: "https://veeclothingcompany.com",
    siteName: "Vee Clothing Company",
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              "name": "Vee Clothing Company",
              "description": "Bespoke tailoring and corporate uniform engineering from Lagos, Nigeria.",
              "url": "https://veeclothingcompany.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lagos",
                "addressCountry": "NG",
              },
              "telephone": "+2348103031020",
              "sameAs": [
                "https://instagram.com/veeclothingcompany",
                "https://facebook.com/veeclothingcompany",
              ],
              "priceRange": "₦₦₦",
            }),
          }}
        />
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
