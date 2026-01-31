"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Info, ArrowRight, AlertCircle } from "lucide-react"
import { convertImage, type ProcessingResult, downloadBlob, loadImage } from "@/lib/image-processor"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.webp$/i, "")
  return `${baseName}.jpg`
}

export function WebpConverterTool({ toolName = "WebP Converter" }: { toolName?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(95)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)

    // Create object URL for preview
    const url = URL.createObjectURL(selectedFile)
    setImageSrc(url)

    // Load dimensions
    try {
      const img = await loadImage(selectedFile)
      setOriginalDimensions({ width: img.width, height: img.height })
    } catch {
      // Ignore dimension load error
    }
  }, [])

  const handleRemove = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setOriginalDimensions(null)
    setResult(null)
    setError(null)
  }, [imageSrc])

  const handleConvert = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)
    const startTime = Date.now()
    trackConvertStart(toolName, "image/jpeg", `${quality}%`)

    try {
      const options = {
        quality: quality / 100
      }

      const conversionResult = await convertImage(file, "image/jpeg", options)
      setResult(conversionResult)
      trackConvertComplete(toolName, Date.now() - startTime, conversionResult.blob.size / 1024, true)
    } catch (err) {
      console.error("Conversion error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to convert image"
      setError(errorMessage)
      trackConvertComplete(toolName, Date.now() - startTime, 0, false, errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }, [file, quality, toolName])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    downloadBlob(result.blob, filename)
  }, [result, file])

  // Cleanup
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  const previewContent = (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-muted/20">
      {imageSrc && originalDimensions ? (
        <CanvasPreview
          imageSrc={result ? result.url : imageSrc}
          width={result ? result.width : originalDimensions.width}
          height={result ? result.height : originalDimensions.height}
          fit="contain"
          className="w-full h-full"
        />
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Select an image to start</p>
        </div>
      )}
    </div>
  )

  const controlsContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>JPG Quality: {quality}%</Label>
            <Badge variant="secondary">Output: JPG</Badge>
          </div>
          <Slider
            min={80}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={([v]) => {
              setQuality(v)
              setResult(null) // Reset result on change to force re-convert
            }}
          />
          <p className="text-xs text-muted-foreground">
            Recommended: 92-95% for high quality
          </p>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
          <p className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              Converts WebP to high-compatibility JPG.
              Transparency will be replaced with a white background.
            </span>
          </p>
        </div>
      </div>

      {result && (
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Original (WebP)</p>
            <p className="text-lg font-semibold">{formatFileSize(file?.size || 0)}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium text-muted-foreground">JPG Size</p>
            <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )

  const actionsContent = (
    <div className="space-y-4">
      <Button
        onClick={handleConvert}
        disabled={isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Converting...
          </>
        ) : (
          <>
            Convert to JPG
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {result && (
        <Button onClick={handleDownload} className="w-full" size="lg" variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download JPG
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
      acceptedTypes={["image/webp"]}
    />
  )
}
