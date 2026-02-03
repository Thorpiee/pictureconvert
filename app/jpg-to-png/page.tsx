import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { JpgToPngConverterTool } from "@/components/tools/jpg-to-png-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("jpg-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function JpgToPngPage() {
  return (
    <ToolLayout tool={tool!}>
      <JpgToPngConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
