import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TiffConverterTool } from "@/components/tools/tiff-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("tiff-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function TiffPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <TiffConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
