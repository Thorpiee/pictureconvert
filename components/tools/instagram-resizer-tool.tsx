
"use client"

import { useState } from "react"
import { SocialToolLayout } from "@/components/tools/shared/social-tool-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS } from "@/lib/platform-presets"
import { Instagram } from "lucide-react"

export function InstagramResizerTool({ toolName = "Instagram Resizer" }: { toolName?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PLATFORM_PRESETS.instagram[0].id)
  const pipeline = useImagePipeline()

  return (
    <SocialToolLayout
      presets={PLATFORM_PRESETS.instagram}
      selectedPresetId={selectedPresetId}
      onPresetChange={setSelectedPresetId}
      pipeline={pipeline}
      PlatformIcon={Instagram}
      toolName={toolName}
    />
  )
}
