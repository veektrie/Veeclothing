import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import JournalClient from "./JournalClient";

// Query to get all blog posts, sorted by newest first
const allArticlesQuery = groq`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  "imageUrl": image.asset->url,
  "excerpt": array::join(string::split((pt::text(content)), "")[0..150], "") + "...",
  "readTime": string(round(length(pt::text(content)) / 1000) + 1) + " min read"
}`;

export const revalidate = 30;

export default async function JournalPage() {
  // Fetch live data from Sanity
  // const articles = await client.fetch(allArticlesQuery);
  const articles = await client.fetch(
    allArticlesQuery,
    {}, // empty params
    { next: { revalidate: 30 } } // Checks for new data every 30 seconds
  );
  // Pass it to the interactive client component
  return <JournalClient articles={articles} />;
}