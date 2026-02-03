import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TiktokResizerTool } from "@/components/tools/tiktok-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("tiktok-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <TiktokResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
