"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Target } from "lucide-react"
import { downloadBlob, compressImage } from "@/lib/image-processor"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function SmartOptimizerTool() {
  const [file, setFile] = useState<File | null>(null)
  const [targetSizeKB, setTargetSizeKB] = useState<number>(50)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ blob: Blob; url: string; size: number; quality: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
    // Default target to 50% of original or 50KB, whichever is smaller (but at least 10KB)
    const initialTarget = Math.max(10, Math.min(50, Math.round(selectedFile.size / 1024 / 2)))
    setTargetSizeKB(initialTarget)
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

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
      
      // Quality floor (0.1 for JPG/WebP)
      const minQualityAllowed = 0.1

      while (iterations < 8) { // Max 8 iterations for binary search
        const currentQ = (minQ + maxQ) / 2
        const result = await compressImage(file, { quality: currentQ })
        
        if (result.size <= targetBytes) {
          bestBlob = result.blob
          bestQuality = currentQ
          minQ = currentQ // Try to get higher quality that still fits
        } else {
          maxQ = currentQ // Need lower quality
        }
        
        iterations++
      }

      // Final pass with best found quality or fallback to lowest allowed
      if (!bestBlob) {
        // If we couldn't fit in target, just give the smallest possible allowed
        const result = await compressImage(file, { quality: minQualityAllowed })
        bestBlob = result.blob
        bestQuality = minQualityAllowed
      }

      setResult({
        blob: bestBlob,
        url: URL.createObjectURL(bestBlob),
        size: bestBlob.size,
        quality: Math.round(bestQuality * 100)
      })

    } catch (err) {
      console.error("Optimization error:", err)
      setError(err instanceof Error ? err.message : "Failed to optimize image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, targetSizeKB])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = `optimized-${file.name}`
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleReset = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {!result ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="target-size" className="text-base font-medium">
                          Target File Size
                        </Label>
                        <span className="text-2xl font-bold text-primary">
                          {targetSizeKB} KB
                        </span>
                      </div>
                      
                      <Slider
                        id="target-size"
                        min={5}
                        max={Math.min(2048, Math.round(file.size / 1024))}
                        step={5}
                        value={[targetSizeKB]}
                        onValueChange={(vals) => setTargetSizeKB(vals[0])}
                        className="py-4"
                      />
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 KB</span>
                        <span>{formatFileSize(file.size)} (Original)</span>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground flex items-start gap-2">
                        <Target className="h-4 w-4 mt-0.5 text-primary" />
                        <span>
                          We'll find the highest possible quality that fits under <b>{targetSizeKB} KB</b>.
                        </span>
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={handleOptimize}
                      disabled={isProcessing}
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
                          Optimize to {targetSizeKB} KB
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Original</p>
                          <p className="text-lg font-semibold">{formatFileSize(file.size)}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                        <div className="space-y-1 text-right">
                          <p className="text-sm font-medium text-muted-foreground">Optimized</p>
                          <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2">
                        <Badge variant={result.size <= targetSizeKB * 1024 ? "default" : "destructive"}>
                          {result.size <= targetSizeKB * 1024 ? "Target Met" : "Best Possible"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Quality: {result.quality}%
                        </span>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                          {Math.round((1 - result.size / file.size) * 100)}% Saved
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button onClick={handleDownload} className="flex-1" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          New Image
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
