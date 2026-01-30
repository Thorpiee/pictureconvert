import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { Base64Tool } from "@/components/tools/base64-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("base64-image-encoder")

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

export default function Base64Page() {
  return (
    <ToolLayout tool={tool}>
      <Base64Tool />
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
