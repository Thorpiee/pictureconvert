import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { FormatRecommenderTool } from "@/components/tools/format-recommender-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("best-image-format-for-web")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BestImageFormatPage() {
  return (
    <ToolLayout tool={tool!}>
      <FormatRecommenderTool />
    </ToolLayout>
  )
}
