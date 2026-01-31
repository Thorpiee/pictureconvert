import { Metadata } from 'next'
import { ToolConfig } from './tools-config'

export function generateToolMetadata(tool: ToolConfig): Metadata {
  const baseDescription = `${tool.longDescription} Free, fast, and secure - all processing happens in your browser. No uploads, no signup required.`

  // Trim to ~155 characters to avoid truncation in SERPs
  // We split by space to avoid cutting words
  let trimmedDescription = baseDescription
  if (baseDescription.length > 155) {
    const words = baseDescription.split(' ')
    trimmedDescription = ''
    for (const word of words) {
      if ((trimmedDescription + word).length + 1 <= 155) {
        trimmedDescription += (trimmedDescription ? ' ' : '') + word
      } else {
        trimmedDescription += '...'
        break
      }
    }
  }

  return {
    title: tool.name,
    description: trimmedDescription,
    keywords: [
      tool.slug.replace(/-/g, ' '),
      'image converter',
      'free online tool',
      'browser based',
      'privacy focused',
      tool.category === 'convert' ? 'format converter' : tool.category === 'compress' ? 'image compressor' : 'image editor',
    ],
    openGraph: {
      title: `${tool.name} | PictureConvert`,
      description: baseDescription, // OG allows longer descriptions
      url: `https://pictureconvert.com/${tool.slug}`,
      type: 'website',
      images: [
        {
          url: `https://pictureconvert.com/og-image.png`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | PictureConvert`,
      description: baseDescription,
      images: ['https://pictureconvert.com/og-image.png'],
    },
    alternates: {
      canonical: `https://pictureconvert.com/${tool.slug}`,
    },
  }
}
