import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/', '/login', '/register', '/mypage/'],
    },
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
