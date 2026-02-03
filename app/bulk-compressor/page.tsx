import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { BulkCompressorTool } from "@/components/tools/bulk-compressor-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("bulk-compressor")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BulkCompressorPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <BulkCompressorTool toolName={tool!.name} />
    </ToolLayout>
  )
}
