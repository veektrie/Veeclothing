import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import Link from "next/link";
import ProductClient from "./ProductClient";

// Query to get the single product based on the slug
const singleProductQuery = groq`*[_type == "product" && slug.current == $slug][0] {
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
}`;

export const revalidate = 60; // Optional cache revalidation

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await client.fetch(singleProductQuery, { slug });

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

  return <ProductClient product={product} />;
}