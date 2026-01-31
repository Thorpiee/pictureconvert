
"use client"

import { useState } from "react"
import { SocialToolLayout } from "@/components/tools/shared/social-tool-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS } from "@/lib/platform-presets"
import { Youtube } from "lucide-react"

export function YoutubeResizerTool({ toolName = "YouTube Resizer" }: { toolName?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PLATFORM_PRESETS.youtube[0].id)
  const pipeline = useImagePipeline()

  return (
    <SocialToolLayout
      presets={PLATFORM_PRESETS.youtube}
      selectedPresetId={selectedPresetId}
      onPresetChange={setSelectedPresetId}
      pipeline={pipeline}
      PlatformIcon={Youtube}
      toolName={toolName}
    />
  )
}
