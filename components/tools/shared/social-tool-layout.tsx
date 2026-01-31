
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, Check, Pencil, AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CropperBox } from "@/components/tools/cropper-box"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Preset } from "@/lib/platform-presets"
import { ImagePipeline, calculateCenterCrop } from "@/hooks/use-image-pipeline"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { downloadBlob, getOutputFilename } from "@/lib/image-processor"
import { trackConvertStart, trackConvertComplete, trackDownloadClick, trackFileUpload } from "@/lib/analytics"
import { useRef, useCallback } from "react"

interface SocialToolLayoutProps {
  presets: Preset[]
  selectedPresetId: string
  onPresetChange: (presetId: string) => void
  pipeline: ImagePipeline
  PlatformIcon: React.ElementType
  className?: string
  toolName?: string
}

export function SocialToolLayout({
  presets,
  selectedPresetId,
  onPresetChange,
  pipeline,
  PlatformIcon,
  className,
  toolName = "Social Resizer"
}: SocialToolLayoutProps) {
  // Social tools always enforce "cover" mode (no contain/letterbox)
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg")
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
    handleImageSelect: originalHandleImageSelect,
    handleRemove,
    processImage
  } = pipeline

  const handleImageSelect = (file: File) => {
    originalHandleImageSelect(file)
    trackFileUpload(toolName, file.type, file.size / 1024)
  }

  const selectedPreset = presets.find(p => p.id === selectedPresetId) || presets[0]

  // Update crop when preset changes (always cover mode)
  useEffect(() => {
    if (!imageDimensions || !selectedPreset) return

    // Calculate center crop for the target aspect ratio
    const newCrop = calculateCenterCrop(
      imageDimensions.width,
      imageDimensions.height,
      selectedPreset.width,
      selectedPreset.height
    )
    setCropRect(newCrop)
    setIsEditingCrop(false)
  }, [imageDimensions, selectedPresetId, selectedPreset, setCropRect])

  const handleProcess = async () => {
    if (!selectedPreset) return

    const startTime = Date.now()
    trackConvertStart(toolName, "resize", format, selectedPreset.name)

    try {
      await processImage({
        width: selectedPreset.width,
        height: selectedPreset.height,
        quality: selectedPreset.quality,
        fit: "fill", // Always fill/cover
        maintainAspectRatio: false, // We handle crop manually via CropperBox
        format: format
      })
      trackConvertComplete(toolName, Date.now() - startTime, 0, true)
    } catch (e) {
      trackConvertComplete(toolName, Date.now() - startTime, 0, false)
    }
  }

  const handleDownload = () => {
    if (!result || !file || !selectedPreset) return
    const filename = getOutputFilename(file.name, {
      width: selectedPreset.width,
      height: selectedPreset.height,
      format: format
    })
    trackDownloadClick(toolName, format, result.size / 1024)
    downloadBlob(result.blob, filename)
  }

  const previewContent = (
    <div className="relative w-full h-full flex items-center justify-center">
      {imageSrc && imageDimensions && cropRect && (
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
        <div className="flex items-center gap-2 font-medium pb-2 border-b">
          <PlatformIcon className="h-5 w-5"
          />
          <span className="text-lg">Select Preset</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onPresetChange(preset.id)}
              className={`
                cursor-pointer rounded-xl border p-4 transition-all duration-200 text-left relative overflow-hidden group
                ${selectedPresetId === preset.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"}
              `}
            >
              {selectedPresetId === preset.id && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
              <h4 className="font-semibold text-sm mb-1">{preset.name}</h4>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground line-clamp-2">{preset.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
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
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Output Format</Label>
        <Select value={format} onValueChange={(v: any) => setFormat(v)}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image/jpeg">JPG (Best for Photos)</SelectItem>
            <SelectItem value="image/png">PNG (Lossless)</SelectItem>
            <SelectItem value="image/webp">WebP (Modern)</SelectItem>
          </SelectContent>
        </Select>
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
            Resize Image
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      {result && (
        <Button
          onClick={handleDownload}
          className="w-full h-12 text-base font-medium shadow-sm"
          size="lg"
          variant="secondary"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Image
        </Button>
      )}
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
      acceptedTypes={["image/jpeg", "image/png", "image/webp", "image/avif"]}
    />
  )
}
