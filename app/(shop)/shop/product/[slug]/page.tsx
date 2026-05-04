import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import Link from "next/link";
import ProductClient from "./ProductClient";

import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch(groq`*[_type == "product" && slug.current == $slug][0] { name, description }`, { slug });

  if (!product) return { title: "Product Not Found | Vee Clothing" };

  return {
    title: `${product.name} | Bespoke Tailoring | Vee Clothing`,
    description: product.description || `Handcrafted ${product.name} from Vee Clothing Company. Premium bespoke tailoring in Lagos.`,
    alternates: {
      canonical: `/shop/product/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Vee Clothing`,
      description: product.description,
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch the main product
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      price,
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
      <div className="min-h-screen bg-[#08101A] flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl mb-4 text-white">Product not found</h1>
        <Link href="/shop" className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase text-[10px] tracking-widest font-sans font-bold">
          Return to Archive
        </Link>
      </div>
    );
  }

  // 2. Fetch related products from the same category (excluding the current one)
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

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}