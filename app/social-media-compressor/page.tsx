import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { SocialMediaCompressorTool } from "@/components/tools/social-media-compressor-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("social-media-compressor")

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

export default function SocialMediaCompressorPage() {
  return (
    <ToolLayout tool={tool}>
      <SocialMediaCompressorTool />
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
