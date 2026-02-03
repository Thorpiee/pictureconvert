import { Metadata } from "next"
import { ExifViewerTool } from "@/components/tools/exif-viewer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { ToolLayout } from "@/components/tool-layout"
import { generateToolMetadata } from "@/lib/seo-utils"

const tool = getToolBySlug("exif-viewer")

export const metadata: Metadata = generateToolMetadata(tool!)

export default function ExifViewerPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool}>
      <ExifViewerTool toolName={tool.name} />
    </ToolLayout>
  )
}
