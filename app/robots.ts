import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/',
        '/login',
        '/register',
        '/logout',
        '/mypage/',
        '/chatroom/',
        '/api/',
      ],
    },
    sitemap: `${siteConfig.url.toString()}/sitemap.xml`,
  };
}
