"use client"

import { useState, useCallback } from "react"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, CheckCircle, TrendingDown } from "lucide-react"
import { compressImage, downloadBlob, getOutputFilename, ProcessingResult } from "@/lib/image-processor"

interface CompressorToolProps {
  acceptedTypes: string[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function CompressorTool({ acceptedTypes }: CompressorToolProps) {
  const [file, setFile] = useState<File | null>(null)
  // Default to 90% quality for better results (was 80%)
  const [quality, setQuality] = useState(90)
  const [targetSize, setTargetSize] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  const handleCompress = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to compress image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, quality, targetSize])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleCompressAnother = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  const savedPercentage = file && result
    ? Math.round((1 - result.size / file.size) * 100)
    : 0

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={acceptedTypes}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          {!result && (
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
                      min={90}
                      max={100}
                      step={1}
                      value={[quality]}
                      onValueChange={([value]) => setQuality(value)}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Quality floor set to 90% to prevent artifacts. Recommended: 92-95%.
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
                      Leave empty to use quality setting only, or set a target file size.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

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
                      "Compress Image"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="border-primary/50">
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
                        Reduced by {savedPercentage}% ({formatFileSize(file!.size)} → {formatFileSize(result.size)})
                      </span>
                    </div>
                  )}

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt="Compressed"
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'high-quality' }}
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Original:</span>{" "}
                      <span className="font-medium text-foreground">{formatFileSize(file!.size)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compressed:</span>{" "}
                      <span className="font-medium text-foreground">{formatFileSize(result.size)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dimensions:</span>{" "}
                      <span className="font-medium text-foreground">{result.width} x {result.height}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleDownload} className="flex-1" size="lg">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button onClick={handleCompressAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Compress Another
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
