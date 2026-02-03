import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { InstagramResizerTool } from "@/components/tools/instagram-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("instagram-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <InstagramResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
