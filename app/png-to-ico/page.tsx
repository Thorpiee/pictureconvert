import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { FaviconGeneratorTool } from "@/components/tools/favicon-generator-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("png-to-ico")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function FaviconGeneratorPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <FaviconGeneratorTool toolName={tool!.name} />
    </ToolLayout>
  )
}
