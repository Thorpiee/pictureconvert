import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { WebsiteOptimizerTool } from "@/components/tools/website-optimizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("website-optimizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebsiteOptimizerPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <WebsiteOptimizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
