"use client"

import { useState, useEffect, useMemo } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { useImagePipeline, calculateCenterCrop } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS, Platform } from "@/lib/platform-presets"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Instagram, Linkedin, Twitter, Check, Loader2, ArrowRight, Pencil, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CropperBox } from "@/components/tools/cropper-box"
import { CanvasPreview } from "@/components/tools/canvas-preview"

export function SocialMediaCompressorTool() {
  const [platform, setPlatform] = useState<Platform>("instagram")
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PLATFORM_PRESETS.instagram[0].id)
  const [isEditingCrop, setIsEditingCrop] = useState(false)
  
  const {
    file,
    imageSrc,
    imageDimensions,
    cropRect,
    setCropRect,
    result,
    isProcessing,
    error,
    handleImageSelect,
    handleRemove,
    processImage
  } = useImagePipeline()

  const selectedPreset = useMemo(() => 
    PLATFORM_PRESETS[platform].find(p => p.id === selectedPresetId),
  [platform, selectedPresetId])

  // Update crop when preset changes
  useEffect(() => {
    if (!imageDimensions || !selectedPreset) return

    const newCrop = calculateCenterCrop(
      imageDimensions.width,
      imageDimensions.height,
      selectedPreset.width,
      selectedPreset.height
    )
    setCropRect(newCrop)
    setIsEditingCrop(false)
  }, [imageDimensions, selectedPreset, setCropRect])

  const handleProcess = () => {
    if (!selectedPreset) return

    processImage({
      width: selectedPreset.width,
      height: selectedPreset.height,
      quality: selectedPreset.quality,
      fit: "fill", // Always fill/cover for social media
      maintainAspectRatio: false, // Handled by crop
      format: "image/jpeg" // Standard for social
    })
  }

  const previewContent = (
    <div className="relative w-full h-full flex items-center justify-center">
      {imageSrc && imageDimensions && cropRect && selectedPreset && (
        <>
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {!isEditingCrop && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditingCrop(true)}
                className="bg-background/80 backdrop-blur-sm shadow-sm h-10 px-4"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Adjust Crop
              </Button>
            )}
            {isEditingCrop && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsEditingCrop(false)}
                className="shadow-sm h-10 px-4"
              >
                <Check className="h-4 w-4 mr-2" />
                Done
              </Button>
            )}
          </div>

          <div className="w-full h-full flex items-center justify-center p-4">
             {isEditingCrop ? (
              <CropperBox
                imageSrc={imageSrc}
                imageNaturalWidth={imageDimensions.width}
                imageNaturalHeight={imageDimensions.height}
                aspectMode={selectedPreset.width / selectedPreset.height}
                cropRect={cropRect}
                onChange={setCropRect}
                onCrop={() => { }}
                resizable={true}
              />
            ) : (
              <CanvasPreview
                imageSrc={imageSrc}
                width={selectedPreset.width}
                height={selectedPreset.height}
                fit="fill"
                maintainAspectRatio={false}
                cropRect={cropRect}
                className="max-w-full max-h-full shadow-lg rounded-md"
              />
            )}
          </div>
        </>
      )}
    </div>
  )

  const controlsContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Platform</Label>
        <Tabs value={platform} onValueChange={(v) => {
          setPlatform(v as Platform)
          setSelectedPresetId(PLATFORM_PRESETS[v as Platform][0].id)
        }}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              <span className="hidden sm:inline">Twitter</span>
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
         <Label>Select Preset</Label>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLATFORM_PRESETS[platform].map((preset) => (
              <div
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`
                  cursor-pointer rounded-lg border p-4 transition-all duration-200 relative overflow-hidden
                  ${selectedPresetId === preset.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"}
                `}
              >
                {selectedPresetId === preset.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
                <h4 className="font-semibold text-sm mb-1">{preset.name}</h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{preset.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                      {preset.width}×{preset.height}
                    </Badge>
                     {preset.aspectRatioLabel && (
                      <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal">
                        {preset.aspectRatioLabel}
                      </Badge>
                    )}
                </div>
              </div>
            ))}
          </div>
      </div>
      
      <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        <p className="leading-relaxed">
          <strong>Note:</strong> We automatically crop your image to fill the required dimensions ("Cover" mode) to ensure no black bars appear on social media.
        </p>
      </div>
    </div>
  )

  const actionsContent = (
     <div className="space-y-4">
        {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        <Button
          onClick={handleProcess}
          disabled={isProcessing || !file}
          className="w-full h-12 text-base font-medium shadow-sm"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Resize & Compress
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
     </div>
  )
  
  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      preview={previewContent}
      controls={controlsContent}
      actions={actionsContent}
      acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
    />
  )
}
