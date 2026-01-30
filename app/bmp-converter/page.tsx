import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { BmpConverterTool } from "@/components/tools/bmp-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("bmp-converter")

if (!tool) {
  notFound()
}

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  openGraph: {
    title: `${tool.name} | PictureConvert`,
    description: tool.description,
    url: `https://pictureconvert.com/${tool.slug}`,
  },
  alternates: {
    canonical: `https://pictureconvert.com/${tool.slug}`,
  },
}

export default function BmpPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool}>
      <BmpConverterTool />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": tool.faq.map((item) => ({
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
