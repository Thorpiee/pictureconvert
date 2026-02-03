import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("webp-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebpToJpgPage() {
  return (
    <ToolLayout tool={tool!}>
      <ConverterTool
        toolName={tool!.name}
        acceptedTypes={tool!.acceptedTypes}
        outputType={tool!.outputType}
        showQuality={false}
      />
    </ToolLayout>
  )
}
