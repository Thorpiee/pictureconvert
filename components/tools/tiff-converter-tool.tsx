"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight } from "lucide-react"
import { downloadBlob, type ProcessingResult } from "@/lib/image-processor"
import { decodeTiff } from "@/lib/tiff-utils"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.(tiff|tif)$/i, "")
  return `${baseName}.jpg`
}

export function TiffConverterTool() {
  const [file, setFile] = useState<File | null>(null)
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

  const handleConvert = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      // 1. Decode TIFF to ImageData
      const imageData = await decodeTiff(file)
      
      // 2. Draw to canvas
      const canvas = document.createElement("canvas")
      canvas.width = imageData.width
      canvas.height = imageData.height
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")
      
      // Fill white background (TIFF can have alpha, JPG cannot)
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.putImageData(imageData, 0, 0)
      
      // 3. Export as JPG
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b)
          else reject(new Error("Failed to create JPG blob"))
        }, "image/jpeg", 0.95)
      })

      setResult({
        blob,
        url: URL.createObjectURL(blob),
        width: canvas.width,
        height: canvas.height,
        size: blob.size
      })
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to convert TIFF")
    } finally {
      setIsProcessing(false)
    }
  }, [file])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleConvertAnother = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={["image/tiff", "image/tif"]}
        />
      ) : (
        <>
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border flex items-center justify-center">
            {/* TIFFs don't display in img tags usually, so we show a placeholder icon */}
            <div className="text-center p-8">
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              <Button variant="ghost" size="sm" onClick={handleRemove} className="mt-4 text-destructive hover:text-destructive">
                Remove File
              </Button>
            </div>
          </div>

          {/* Controls Card */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {!result ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Output Format</span>
                        <Badge variant="secondary">JPG (Quality 95)</Badge>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
                        <p className="flex items-start gap-2">
                          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>
                            Converts the first page of multi-page TIFFs. 
                            Transparency is composited onto a white background.
                          </span>
                        </p>
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

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
                          <p className="text-sm font-medium text-muted-foreground">JPG Size</p>
                          <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
                        </div>
                      </div>

                      {/* Preview Image */}
                      {result && (
                        <div className="mt-4 relative aspect-video bg-muted rounded-lg overflow-hidden border">
                          <img 
                            src={result.url} 
                            alt={`Converted ${file.name}`}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button onClick={handleDownload} className="flex-1" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download JPG
                        </Button>
                        <Button onClick={handleConvertAnother} variant="outline" className="flex-1" size="lg">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Convert Another
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
