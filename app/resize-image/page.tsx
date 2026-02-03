import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ResizeTool } from "@/components/tools/resize-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("resize-image")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function ResizeImagePage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <ResizeTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
