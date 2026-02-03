import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { YoutubeResizerTool } from "@/components/tools/youtube-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("youtube-thumbnail-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function YoutubeResizerPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <YoutubeResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
