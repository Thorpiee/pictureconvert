"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Button } from "@/components/ui/button"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Settings2, AlertCircle } from "lucide-react"
import { downloadBlob, type ProcessingResult, loadImage } from "@/lib/image-processor"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.svg$/i, "")
  return `${baseName}.png`
}

export function SvgConverterTool({ toolName = "SVG Converter" }: { toolName?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [background, setBackground] = useState<"transparent" | "white">("transparent")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
    trackFileUpload(toolName, selectedFile.type, selectedFile.size / 1024)

    const url = URL.createObjectURL(selectedFile)
    setImageSrc(url)

    // Attempt to read natural dimensions
    try {
      const img = await loadImage(selectedFile)
      // If SVG has dimensions, use them as defaults, otherwise keep 1024
      if (img.width > 0 && img.height > 0) {
        setWidth(img.width)
        setHeight(img.height)
      }
    } catch (e) {
      // Ignore
    }
  }, [toolName])

  const handleRemove = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setResult(null)
    setError(null)
  }, [imageSrc])

  const handleConvert = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)
    const startTime = Date.now()
    trackConvertStart(toolName, "convert", "image/png")

    try {
      const img = await loadImage(file)

      const canvas = document.createElement("canvas")
      let finalWidth = width
      let finalHeight = height

      // Recalculate if maintaining aspect ratio
      if (maintainAspectRatio && img.width && img.height) {
        // Simplified: Just use the user provided dimensions exactly.
        finalWidth = width
        finalHeight = height
      }

      canvas.width = finalWidth
      canvas.height = finalHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")

      if (background === "white") {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // High quality rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      ctx.drawImage(img, 0, 0, finalWidth, finalHeight)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b)
          else reject(new Error("Failed to create PNG blob"))
        }, "image/png")
      })

      setResult({
        blob,
        url: URL.createObjectURL(blob),
        width: finalWidth,
        height: finalHeight,
        size: blob.size
      })
      trackConvertComplete(toolName, Date.now() - startTime, blob.size / 1024, true)
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to convert SVG")
      trackConvertComplete(toolName, Date.now() - startTime, 0, false)
    } finally {
      setIsProcessing(false)
    }
  }, [file, width, height, background, maintainAspectRatio, toolName])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    trackDownloadClick(toolName, "image/png", result.size / 1024)
    downloadBlob(result.blob, filename)
  }, [result, file, toolName])

  // Cleanup
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  const previewContent = (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-muted/20">
      {imageSrc ? (
        <CanvasPreview
          imageSrc={imageSrc}
          width={width || 100}
          height={height || 100}
          fit="fill" // SVG should fill the canvas we defined with width/height
          backgroundColor={background === "white" ? "#FFFFFF" : undefined}
          className="w-full h-full"
        />
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Select an SVG file to start</p>
        </div>
      )}
    </div>
  )

  const controlsContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Output Dimensions (px)</Label>
          <div className="flex items-center gap-2">
            <div className="space-y-1 flex-1">
              <Label htmlFor="width" className="text-xs text-muted-foreground">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0
                  setWidth(val)
                  // Simple aspect ratio logic could go here if we tracked original aspect ratio
                }}
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label htmlFor="height" className="text-xs text-muted-foreground">Height</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0
                  setHeight(val)
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Background</Label>
          <RadioGroup value={background} onValueChange={(v: any) => setBackground(v)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transparent" id="bg-transparent" />
              <Label htmlFor="bg-transparent">Transparent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="white" id="bg-white" />
              <Label htmlFor="bg-white">White</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {result && (
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">SVG</p>
            <p className="text-lg font-semibold">{formatFileSize(file?.size || 0)}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium text-muted-foreground">PNG</p>
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
        disabled={isProcessing || !width || !height}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Rendering...
          </>
        ) : (
          <>
            Rasterize to PNG
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {result && (
        <Button onClick={handleDownload} className="w-full" size="lg" variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download PNG
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
      acceptedTypes={["image/svg+xml"]}
    />
  )
}
