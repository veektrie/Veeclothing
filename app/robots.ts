import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/order/'],
    },
    sitemap: 'https://www.veeclothingcompany.com/sitemap.xml',
  };
}
