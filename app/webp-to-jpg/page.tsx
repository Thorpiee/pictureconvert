import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("webp-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = {
  title: tool!.name,
  description: `${tool!.longDescription} Free, fast, and secure - all processing happens in your browser. No uploads, no signup required.`,
  keywords: [
    tool!.slug.replace(/-/g, ' '),
    'image converter',
    'free online tool',
    'browser based',
    'privacy focused',
    tool!.category === 'convert' ? 'format converter' : tool!.category === 'compress' ? 'image compressor' : 'image editor',
  ],
  openGraph: {
    title: `${tool!.name} | PictureConvert`,
    description: `${tool!.longDescription} Free, fast, and secure - all processing happens in your browser.`,
    url: `https://pictureconvert.com/${tool!.slug}`,
    type: 'website',
    images: [
      {
        url: `https://pictureconvert.com/og-image.png`,
        width: 1200,
        height: 630,
        alt: tool!.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${tool!.name} | PictureConvert`,
    description: tool!.longDescription,
    images: ['https://pictureconvert.com/og-image.png'],
  },
  alternates: {
    canonical: `https://pictureconvert.com/${tool!.slug}`,
  },
}

export default function WebpToJpgPage() {
  return (
    <ToolLayout tool={tool!}>
      <ConverterTool
        toolName={tool!.name}
        acceptedTypes={tool!.acceptedTypes}
        outputType={tool!.outputType}
        showQuality={false}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": tool!.faq.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
    </ToolLayout>
  )
}
