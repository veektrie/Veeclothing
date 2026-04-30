import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import ShopClient from "./ShopClient";
import { Suspense } from "react";

// Fetch products and format the data to match what your UI expects
const shopQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  tag,
  "cat": category,
  "desc": description,
  "src": image.asset->url
}`;

export const metadata = {
  title: "The Collection | Bespoke Tailoring & Luxury Menswear | Vee Clothing",
  description: "Explore our collection of precision-engineered executive suits, premium kaftans, and bespoke agbadas. Handcrafted in Lagos for the discerning gentleman.",
  alternates: {
    canonical: '/shop',
  },
};

export const revalidate = 60; // Optional: Revalidate cache every 60 seconds

export default async function ShopPage() {
  const products = await client.fetch(shopQuery);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Shop...</div>}>
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}