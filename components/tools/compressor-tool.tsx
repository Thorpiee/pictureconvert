"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, CheckCircle, TrendingDown, ArrowRight, Pencil } from "lucide-react"
import { compressImage, downloadBlob, getOutputFilename, ProcessingResult } from "@/lib/image-processor"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"
import { useRef } from "react"

interface CompressorToolProps {
  acceptedTypes: string[]
  toolName?: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function CompressorTool({ acceptedTypes, toolName = "Compressor" }: CompressorToolProps) {
  // Use pipeline for file handling and dimensions
  const {
    file,
    imageSrc,
    imageDimensions,
    handleImageSelect,
    handleRemove,
  } = useImagePipeline()

  const [quality, setQuality] = useState(90)
  const [targetSize, setTargetSize] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Reset result when file changes
  useEffect(() => {
    setResult(null)
    setError(null)
  }, [file])

  const handleCompress = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)
    const startTime = Date.now()
    trackConvertStart(toolName, "compress", `${file.size}`)

    try {
      let currentQuality = quality / 100
      let processed = await compressImage(file, { quality: currentQuality })

      // If target size is specified, try to achieve it
      if (targetSize) {
        const targetBytes = parseInt(targetSize) * 1024
        let attempts = 0
        const maxAttempts = 10

        while (processed.size > targetBytes && currentQuality > 0.1 && attempts < maxAttempts) {
          currentQuality -= 0.1
          processed = await compressImage(file, { quality: currentQuality })
          attempts++
        }

        if (processed.size > targetBytes) {
          setError(`Could not reach target size of ${targetSize}KB. Best result: ${formatFileSize(processed.size)}`)
        }
      }

      setResult(processed)
      trackConvertComplete(toolName, Date.now() - startTime, processed.size / 1024, true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compress image")
      trackConvertComplete(toolName, Date.now() - startTime, 0, false, err instanceof Error ? err.message : "Failed")
    } finally {
      setIsProcessing(false)
    }
  }, [file, quality, targetSize, toolName])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
    trackDownloadClick(toolName, "compressed-image", result.size / 1024)
  }, [result, file, toolName])

  const savedPercentage = file && result
    ? Math.round((1 - result.size / file.size) * 100)
    : 0

  if (result && file) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <Card className="border-border/50 shadow-lg overflow-hidden">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Compression Complete!</span>
              </div>

              {savedPercentage > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary">
                  <TrendingDown className="h-5 w-5" />
                  <span className="font-medium">
                    Reduced by {savedPercentage}% ({formatFileSize(file.size)} → {formatFileSize(result.size)})
                  </span>
                </div>
              )}

              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={result.url || "/placeholder.svg"}
                  alt="Compressed"
                  className="max-w-full max-h-[300px] object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button variant="outline" onClick={() => setResult(null)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Adjust Settings
                </Button>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <Button variant="ghost" onClick={handleRemove} className="w-full mt-2">Start Over</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={(f) => {
        handleImageSelect(f)
        trackFileUpload(toolName, f.type, f.size / 1024)
      }}
      onRemove={handleRemove}
      acceptedTypes={acceptedTypes}
      preview={
        imageSrc && imageDimensions && (
          <CanvasPreview
            imageSrc={imageSrc}
            width={imageDimensions.width}
            height={imageDimensions.height}
            fit="contain" // Preview original full image
            maintainAspectRatio={true}
            className="max-w-full max-h-[500px]"
          />
        )
      }
      controls={
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quality">Compression Quality</Label>
                  <span className="text-sm text-muted-foreground">{quality}%</span>
                </div>
                <Slider
                  id="quality"
                  min={1}
                  max={100}
                  step={1}
                  value={[quality]}
                  onValueChange={([value]) => setQuality(value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher quality means larger file size. Recommended: 80-90%.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="targetSize">Target Size (optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="targetSize"
                    type="number"
                    placeholder="e.g., 500"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">KB</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll try to compress under this size.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
      actions={
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Summary</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Original Size:</span>
                    <span className="font-medium text-foreground">{file ? formatFileSize(file.size) : "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Quality:</span>
                    <span className="font-medium text-foreground">{quality}%</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCompress}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    Compress Image
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      }
    />
  )
}
