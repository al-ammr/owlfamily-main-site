import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://owlfamily.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = [
    'streetwear',
    'smart',
    'corporate',
    'vintage',
  ].map((category) => ({
    url: `${BASE_URL}/shop/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
