import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import ShopClient from "./ShopClient";

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

export const revalidate = 60; // Optional: Revalidate cache every 60 seconds

export default async function ShopPage() {
  const products = await client.fetch(shopQuery);

  return <ShopClient initialProducts={products} />;
}