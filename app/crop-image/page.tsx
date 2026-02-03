import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { CropTool } from "@/components/tools/crop-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("crop-image")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CropImagePage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <CropTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
