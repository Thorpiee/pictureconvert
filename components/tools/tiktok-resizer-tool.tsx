
"use client"

import { useState } from "react"
import { SocialToolLayout } from "@/components/tools/shared/social-tool-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS } from "@/lib/platform-presets"
import { Music2 } from "lucide-react" // Using Music2 as TikTok proxy

export function TiktokResizerTool({ toolName = "TikTok Resizer" }: { toolName?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PLATFORM_PRESETS.tiktok[0].id)
  const pipeline = useImagePipeline()

  return (
    <SocialToolLayout
      presets={PLATFORM_PRESETS.tiktok}
      selectedPresetId={selectedPresetId}
      onPresetChange={setSelectedPresetId}
      pipeline={pipeline}
      PlatformIcon={Music2}
      toolName={toolName}
    />
  )
}
