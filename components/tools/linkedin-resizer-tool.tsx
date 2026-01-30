
"use client"

import { useState } from "react"
import { SocialToolLayout } from "@/components/tools/shared/social-tool-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS } from "@/lib/platform-presets"
import { Linkedin } from "lucide-react"

export function LinkedinResizerTool() {
  const [selectedPresetId, setSelectedPresetId] = useState(PLATFORM_PRESETS.linkedin[0].id)
  const pipeline = useImagePipeline()

  return (
    <SocialToolLayout
      presets={PLATFORM_PRESETS.linkedin}
      selectedPresetId={selectedPresetId}
      onPresetChange={setSelectedPresetId}
      pipeline={pipeline}
      PlatformIcon={Linkedin}
    />
  )
}
