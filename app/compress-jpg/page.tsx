import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { CompressorTool } from "@/components/tools/compressor-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("compress-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CompressJpgPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <CompressorTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
