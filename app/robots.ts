import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://pictureconvert.com/sitemap.xml',
    host: 'https://pictureconvert.com',
  }
}
