import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { SvgConverterTool } from "@/components/tools/svg-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("svg-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function SvgPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <SvgConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
