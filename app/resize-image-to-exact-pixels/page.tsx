import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ExactPixelResizerTool } from "@/components/tools/exact-pixel-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("resize-image-to-exact-pixels")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <ExactPixelResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
