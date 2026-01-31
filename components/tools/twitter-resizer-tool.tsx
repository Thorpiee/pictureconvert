
"use client"

import { useState } from "react"
import { SocialToolLayout } from "@/components/tools/shared/social-tool-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS } from "@/lib/platform-presets"
import { Twitter } from "lucide-react"

export function TwitterResizerTool({ toolName = "Twitter Resizer" }: { toolName?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PLATFORM_PRESETS.twitter[0].id)
  const pipeline = useImagePipeline()

  return (
    <SocialToolLayout
      presets={PLATFORM_PRESETS.twitter}
      selectedPresetId={selectedPresetId}
      onPresetChange={setSelectedPresetId}
      pipeline={pipeline}
      PlatformIcon={Twitter}
      toolName={toolName}
    />
  )
}
