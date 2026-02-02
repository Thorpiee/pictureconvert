"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { useImagePipeline, calculateCenterCrop } from "@/hooks/use-image-pipeline"
import { PLATFORM_PRESETS, Platform } from "@/lib/platform-presets"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Linkedin, Twitter, Check, Loader2, ArrowRight, Pencil, X, AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CropperBox } from "@/components/tools/cropper-box"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { trackConvertStart, trackConvertComplete, trackDownloadClick, trackConversionComplete } from "@/lib/analytics"
import { downloadBlob, getOutputFilename } from "@/lib/image-processor"

export function SocialMediaCompressorTool({ toolName = "Social Media Compressor" }: { toolName?: string }) {
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
    processImage,
    resetResult
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

  const handleProcess = async () => {
    if (!selectedPreset) return

    const startTime = Date.now()
    trackConvertStart(toolName, "resize", "image/jpeg", `${selectedPreset.width}x${selectedPreset.height}`)

    try {
      await processImage({
        width: selectedPreset.width,
        height: selectedPreset.height,
        quality: selectedPreset.quality,
        fit: "fill", // Always fill/cover for social media
        maintainAspectRatio: false, // Handled by crop
        format: "image/jpeg" // Standard for social
      })
      trackConvertComplete(toolName, Date.now() - startTime, 0, true)
    } catch (e) {
      trackConvertComplete(toolName, Date.now() - startTime, 0, false)
    }
  }

  const handleDownload = useCallback(() => {
    if (!result || !file || !selectedPreset) return
    const filename = getOutputFilename(file.name, {
      width: selectedPreset.width,
      height: selectedPreset.height,
      suffix: selectedPreset.name.toLowerCase().replace(/\s+/g, "-")
    })
    trackDownloadClick(toolName, "image/jpeg", result.size / 1024)
    downloadBlob(result.blob, filename)
    trackConversionComplete(toolName, "image/jpeg")
  }, [result, file, selectedPreset, toolName])

  if (result) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <Card className="border-border/50 shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-muted/30 flex items-center justify-center p-6 border-b">
            <img
              src={result.url}
              alt="Processed"
              className="max-w-full max-h-[400px] object-contain shadow-sm rounded-md"
            />
          </div>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 mb-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Original</p>
                <p className="text-lg font-semibold">{(file!.size / 1024).toFixed(1)} KB</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium text-muted-foreground">New Size</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {(result.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={resetResult}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <Button variant="ghost" onClick={handleRemove} className="w-full mt-2">Start Over</Button>
          </CardContent>
        </Card>
      </div>
    )
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
