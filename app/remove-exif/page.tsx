import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ExifRemoverTool } from "@/components/tools/exif-remover-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("remove-exif")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function RemoveExifPage() {
  if (!tool) return null

  return (
    <ToolLayout tool={tool!}>
      <ExifRemoverTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
