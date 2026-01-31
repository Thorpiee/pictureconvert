import { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { WebsiteOptimizerTool } from "@/components/tools/website-optimizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("website-optimizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = {
  title: tool!.name,
  description: tool!.description,
  openGraph: {
    title: `${tool!.name} | PictureConvert`,
    description: tool!.description,
    url: `https://pictureconvert.com/${tool!.slug}`,
  },
  alternates: {
    canonical: `https://pictureconvert.com/${tool!.slug}`,
  },
}

export default function WebsiteOptimizerPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <WebsiteOptimizerTool toolName={tool!.name} />
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
