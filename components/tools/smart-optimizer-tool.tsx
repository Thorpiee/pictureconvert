"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Target, CheckCircle } from "lucide-react"
import { downloadBlob, compressImage } from "@/lib/image-processor"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function SmartOptimizerTool() {
  const {
    file,
    imageSrc,
    imageDimensions,
    handleImageSelect,
    handleRemove,
  } = useImagePipeline()

  const [targetSizeKB, setTargetSizeKB] = useState<number>(50)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ blob: Blob; url: string; size: number; quality: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Default target size when file is loaded
  useEffect(() => {
    if (file) {
      const initialTarget = Math.max(10, Math.min(50, Math.round(file.size / 1024 / 2)))
      setTargetSizeKB(initialTarget)
      setResult(null)
      setError(null)
    }
  }, [file])

  const handleOptimize = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      // Binary search for target size
      let minQ = 0.01
      let maxQ = 1.0
      let bestBlob: Blob | null = null
      let bestQuality = 0
      let iterations = 0
      const targetBytes = targetSizeKB * 1024

      // Quality floor (0.8 per requirements) - though for "smart optimizer" aiming for size, 
      // we might want to allow lower quality if the user specifically asks for a small size.
      // But preserving existing logic for now.
      const minQualityAllowed = 0.1 // Lowering this to allow more aggressive compression if needed for size

      while (iterations < 8) { // Max 8 iterations for binary search
        const currentQ = (minQ + maxQ) / 2

        const result = await compressImage(file, {
          quality: currentQ,
          skipQualityCheck: true
        })

        if (result.size <= targetBytes) {
          bestBlob = result.blob
          bestQuality = currentQ
          minQ = currentQ // Try to get higher quality that still fits
        } else {
          maxQ = currentQ // Need lower quality
        }

        iterations++
      }

      // If we didn't find a blob that fits (even at lowest quality tested)
      // Just use the smallest one we found (which would be the last low-quality attempt)
      if (!bestBlob) {
        const lastTry = await compressImage(file, { quality: minQ, skipQualityCheck: true })
        bestBlob = lastTry.blob
        bestQuality = minQ
      }

      setResult({
        blob: bestBlob,
        url: URL.createObjectURL(bestBlob),
        size: bestBlob.size,
        quality: Math.round(bestQuality * 100)
      })

      if (bestBlob.size > targetBytes) {
        setError(`Could not reach target size. Best result: ${formatFileSize(bestBlob.size)}`)
      }

    } catch (err) {
      console.error("Optimization error:", err)
      setError(err instanceof Error ? err.message : "Failed to optimize image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, targetSizeKB])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = file.name.replace(/\.[^/.]+$/, "") + "-optimized.jpg" // Standardize output to jpg/original format? compressImage outputs jpeg/webp usually. 
    // compressImage usually preserves type or defaults to jpeg. 
    // Let's assume the blob type is correct.
    const ext = result.blob.type.split('/')[1] || "jpg"
    downloadBlob(result.blob, `${file.name.replace(/\.[^/.]+$/, "")}-optimized.${ext}`)
  }, [result, file])

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      preview={
        imageSrc && imageDimensions && (
          <CanvasPreview
            imageSrc={imageSrc}
            width={imageDimensions.width}
            height={imageDimensions.height}
            fit="contain"
            maintainAspectRatio={true}
            className="max-w-full max-h-[500px]"
          />
        )
      }
      controls={
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Target File Size</Label>
                  <span className="font-mono font-medium">{targetSizeKB} KB</span>
                </div>
                <div className="pt-2">
                  <Slider
                    value={[targetSizeKB]}
                    onValueChange={(vals) => setTargetSizeKB(vals[0])}
                    min={10}
                    max={file ? Math.round(file.size / 1024) : 1000}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground pt-1">
                  <span>10 KB</span>
                  <span>{file ? formatFileSize(file.size) : "Max"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Manual Input</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={targetSizeKB}
                    onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                    min={1}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">KB</span>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1">
                <p className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    We'll adjust quality settings to try and match your target size while maintaining the best possible look.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      actions={
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {result ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <CheckCircle className="h-5 w-5" />
                    <span>Optimization Complete!</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted/30 rounded border border-border/50">
                      <span className="text-muted-foreground">Original:</span>
                      <span className="font-medium">{file && formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/30 rounded border border-border/50">
                      <span className="text-muted-foreground">Optimized:</span>
                      <span className="font-medium text-primary">{formatFileSize(result.size)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/30 rounded border border-border/50">
                      <span className="text-muted-foreground">Quality Used:</span>
                      <span className="font-medium">{result.quality}%</span>
                    </div>
                  </div>

                  <Button onClick={handleDownload} className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Optimized Image
                  </Button>

                  <Button onClick={() => setResult(null)} variant="ghost" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Optimize Another
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Summary</Label>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Original Size:</span>
                        <span className="font-medium text-foreground">{file ? formatFileSize(file.size) : "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Size:</span>
                        <span className="font-medium text-foreground">{targetSizeKB} KB</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleOptimize}
                    disabled={isProcessing || !file}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        Optimize Image
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              )}
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
