import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.veeclothingcompany.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/business`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/individual`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic routes - Products
  const products = await client.fetch(groq`*[_type == "product"] { "slug": slug.current, _updatedAt }`);
  const productRoutes = products.map((p: any) => ({
    url: `${baseUrl}/shop/product/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic routes - Blog Posts
  const articles = await client.fetch(groq`*[_type == "blog"] { "slug": slug.current, publishedAt }`);
  const articleRoutes = articles.map((a: any) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
