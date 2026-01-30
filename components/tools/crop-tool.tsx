"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { CropperBox, CropRect, AspectMode, getCroppedImageBlob } from "./cropper-box"
import { ImageDropzone } from "@/components/image-dropzone"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, CheckCircle, X, Pencil, ArrowRight } from "lucide-react"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { cropImage, downloadBlob, getOutputFilename, ProcessingResult, loadImage } from "@/lib/image-processor"

import { ToolContentLayout } from "./shared/tool-content-layout"

interface CropToolProps {
  acceptedTypes: string[]
}

type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "9:16" | "3:2"

const aspectRatios: { label: string; value: AspectRatio; ratio: number | null }[] = [
  { label: "Free", value: "free", ratio: null },
  { label: "1:1", value: "1:1", ratio: 1 },
  { label: "4:3", value: "4:3", ratio: 4 / 3 },
  { label: "16:9", value: "16:9", ratio: 16 / 9 },
  { label: "9:16", value: "9:16", ratio: 9 / 16 },
  { label: "3:2", value: "3:2", ratio: 3 / 2 },
]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function CropTool({ acceptedTypes }: CropToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free")
  const [cropArea, setCropArea] = useState<CropRect>({ x: 0, y: 0, width: 100, height: 100 })
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const aspectModeForCropper = useMemo<AspectMode>(() => {
    if (aspectRatio === "free") return "free"
    const r = aspectRatios.find(x => x.value === aspectRatio)
    return r?.ratio ?? "free"
  }, [aspectRatio])

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)

    const url = URL.createObjectURL(selectedFile)
    setImageSrc(url)

    try {
      const img = await loadImage(selectedFile)
      setImageDimensions({ width: img.width, height: img.height })
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height })
    } catch {
      setError("Failed to load image")
    }
  }, [])

  const handleRemove = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setImageDimensions(null)
    setResult(null)
    setError(null)
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setAspectRatio("free")
  }, [imageSrc])

  const handleAspectRatioChange = useCallback((value: AspectRatio) => {
    setAspectRatio(value)
    if (!imageDimensions) return

    const selectedRatio = aspectRatios.find(r => r.value === value)
    if (!selectedRatio?.ratio) {
      // For free ratio, we don't necessarily reset, but we could.
      // Let's just keep current crop but allow free resizing.
      return
    }

    const imgRatio = imageDimensions.width / imageDimensions.height
    let newWidth: number, newHeight: number

    // Default to a centered crop that fits
    if (selectedRatio.ratio > imgRatio) {
      newWidth = imageDimensions.width
      newHeight = Math.round(newWidth / selectedRatio.ratio)
    } else {
      newHeight = imageDimensions.height
      newWidth = Math.round(newHeight * selectedRatio.ratio)
    }

    setCropArea({
      x: Math.round((imageDimensions.width - newWidth) / 2),
      y: Math.round((imageDimensions.height - newHeight) / 2),
      width: newWidth,
      height: newHeight,
    })
  }, [imageDimensions])

  const handleCrop = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const processed = await cropImage(file, {
        cropX: cropArea.x,
        cropY: cropArea.y,
        cropWidth: cropArea.width,
        cropHeight: cropArea.height,
      })
      setResult(processed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to crop image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, cropArea])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleCropAnother = useCallback(() => {
    setResult(null)
    // Keep the image loaded, just reset result
  }, [])

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      acceptedTypes={acceptedTypes}
      preview={
        result ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={result.url}
              alt="Cropped Result"
              className="max-w-full max-h-[500px] object-contain shadow-lg rounded-md"
            />
          </div>
        ) : (
          imageSrc && imageDimensions && (
            <CropperBox
              imageSrc={imageSrc}
              imageNaturalWidth={imageDimensions.width}
              imageNaturalHeight={imageDimensions.height}
              aspectMode={aspectRatio}
              cropRect={cropArea}
              onChange={setCropArea}
              onCrop={() => { }} // Not used here, we have a separate button
            />
          )
        )
      }
      controls={
        !result ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Aspect Ratio</Label>
              <div className="flex flex-wrap gap-2">
                {aspectRatios.map((ratio) => (
                  <Button
                    key={ratio.value}
                    variant={aspectRatio === ratio.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAspectRatioChange(ratio.value)}
                  >
                    {ratio.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Precise Crop</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-x" className="text-xs text-muted-foreground">X Position</Label>
                  <input
                    id="crop-x"
                    type="number"
                    min={0}
                    max={imageDimensions?.width ?? 0}
                    value={Math.round(cropArea.x)}
                    onChange={e => setCropArea(area => ({ ...area, x: Math.max(0, Math.min(Number(e.target.value), (imageDimensions?.width ?? 0) - area.width)) }))}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-y" className="text-xs text-muted-foreground">Y Position</Label>
                  <input
                    id="crop-y"
                    type="number"
                    min={0}
                    max={imageDimensions?.height ?? 0}
                    value={Math.round(cropArea.y)}
                    onChange={e => setCropArea(area => ({ ...area, y: Math.max(0, Math.min(Number(e.target.value), (imageDimensions?.height ?? 0) - area.height)) }))}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-width" className="text-xs text-muted-foreground">Width</Label>
                  <input
                    id="crop-width"
                    type="number"
                    min={1}
                    max={imageDimensions ? imageDimensions.width - cropArea.x : 1}
                    value={Math.round(cropArea.width)}
                    onChange={e => setCropArea(area => ({ ...area, width: Math.max(1, Math.min(Number(e.target.value), (imageDimensions ? imageDimensions.width - area.x : 1))) }))}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-height" className="text-xs text-muted-foreground">Height</Label>
                  <input
                    id="crop-height"
                    type="number"
                    min={1}
                    max={imageDimensions ? imageDimensions.height - cropArea.y : 1}
                    value={Math.round(cropArea.height)}
                    onChange={e => setCropArea(area => ({ ...area, height: Math.max(1, Math.min(Number(e.target.value), (imageDimensions ? imageDimensions.height - area.y : 1))) }))}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Current Selection: {Math.round(cropArea.width)} x {Math.round(cropArea.height)} px
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Crop Complete!</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Size:</span>
                <span className="font-medium">{formatFileSize(result.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-medium">{result.width} x {result.height}</span>
              </div>
            </div>
          </div>
        )
      }
      actions={
        <div className="space-y-4">
          {!result ? (
            <>
              <Button
                onClick={handleCrop}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cropping...
                  </>
                ) : (
                  <>
                    Crop Image
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleCropAnother} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Crop Another
              </Button>
            </>
          )}
        </div>
      }
    />
  )
}
