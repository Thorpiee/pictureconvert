import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TwitterResizerTool } from "@/components/tools/twitter-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("twitter-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function TwitterResizerPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <TwitterResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
