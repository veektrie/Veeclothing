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
  "excerpt": array::join(string::split((pt::text(content)), "")[0..150], "") + "...",
  // If you don't have a readTime field in Sanity, we can hardcode a fallback or calculate it
  "readTime": "5 min read" 
}`;

export default async function JournalPage() {
  // Fetch live data from Sanity
  const articles = await client.fetch(allArticlesQuery);

  // Pass it to the interactive client component
  return <JournalClient articles={articles} />;
}