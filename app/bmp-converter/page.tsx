import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { BmpConverterTool } from "@/components/tools/bmp-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("bmp-converter")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BmpPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <BmpConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
