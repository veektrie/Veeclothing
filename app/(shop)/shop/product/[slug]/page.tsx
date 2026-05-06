import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import Link from "next/link";
import ProductClient from "./ProductClient";
import { Metadata } from 'next';

export const revalidate = 60;

// ─── Helpers (server-side) ────────────────────────────────────────────────────

function categoryToMaterial(cat: string): string {
  const map: Record<string, string> = {
    bespoke:   'Super 120s Italian Wool',
    corporate: 'Premium Woven Fabric',
    kaftan:    'Heritage Silk-Cotton Blend',
    agbada:    'Hand-Embroidered Damask',
    hoodies:   'Heavyweight French Terry',
    tees:      'Supima Cotton Piqué',
    polo:      'Mercerised Cotton Piqué',
    pants:     'Stretch Worsted Wool',
    jacket:    'Structured Twill Weave',
    shirts:    'Egyptian Cotton Poplin',
  };
  return map[(cat ?? '').toLowerCase()] ?? 'Artisan-Crafted Fabric';
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] { name, description }`,
    { slug }
  );

  if (!product) return { title: "Product Not Found | Vee Clothing" };

  return {
    title: `${product.name} | Bespoke Tailoring | Vee Clothing`,
    description: product.description || `Handcrafted ${product.name} from Vee Clothing Company. Premium bespoke tailoring in Lagos.`,
    alternates: { canonical: `/shop/product/${slug}` },
    openGraph: {
      title: `${product.name} | Vee Clothing`,
      description: product.description,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      price,
      "slug": slug.current,
      "src": image.asset->url,
      tag,
      "cat": category,
      "desc": description,
      longDesc,
      features[]{ title, desc },
      colors[]{ name, hex },
      sizes
    }`,
    { slug }
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl mb-4 text-[#1C1C1E]">Product not found</h1>
        <Link href="/shop" className="text-[#1A5276] border-b border-[#1A5276] pb-1 uppercase text-[10px] tracking-widest font-bold">
          Return to Archive
        </Link>
      </div>
    );
  }

  const relatedProducts = await client.fetch(
    groq`*[_type == "product" && category == $category && _id != $currentId][0...4] {
      _id,
      name,
      price,
      tag,
      "desc": description,
      "slug": slug.current,
      "src": image.asset->url
    }`,
    { category: product.cat, currentId: product._id }
  );

  // ── JSON-LD built server-side — no client-side script injection ────────────
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDesc || product.desc || `Handcrafted ${product.name} from Vee Clothing Company.`,
    image: product.src ? [product.src] : [],
    brand: { '@type': 'Brand', name: 'Vee Clothing Company' },
    material: categoryToMaterial(product.cat),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NGN',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Vee Clothing Company' },
      url: `https://www.veeclothingcompany.com/shop/product/${slug}`,
    },
    ...(product.sizes?.length > 0 && {
      hasVariant: product.sizes.map((s: string) => ({
        '@type': 'ProductModel',
        name: `${product.name} — Size ${s}`,
        size: s,
      })),
    }),
  };

  return (
    <>
      {/* JSON-LD in Server Component — safe for client-side navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}