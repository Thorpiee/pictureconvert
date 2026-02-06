import { Metadata } from "next"
import { ToolsPageClient } from "./tools-client"
import { SITE_URL } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "All Image Tools | PictureConvert",
  description: "Browse our complete collection of 25+ free online image tools. Convert JPG to PNG, compress images, resize photos, crop pictures, remove EXIF data, and more. All processing happens in your browser - fast, secure, and private. No signup required.",
  keywords: [
    'image tools',
    'image converter',
    'image compressor',
    'free image tools',
    'online image editor',
    'jpg to png',
    'png to jpg',
    'webp converter',
    'heic to jpg',
    'resize image',
    'crop image',
    'remove exif',
    'browser based',
    'privacy focused',
  ],
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: "All Image Tools | PictureConvert",
    description: "Browse our complete collection of 25+ free online image tools. Convert, compress, resize, crop, and edit images in your browser. Secure, fast, and no signup required.",
    url: `${SITE_URL}/tools`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'PictureConvert - Free Online Image Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "All Image Tools | PictureConvert",
    description: "Browse our complete collection of 25+ free online image tools. Convert, compress, resize, crop, and edit images in your browser.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
