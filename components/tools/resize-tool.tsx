"use client"

import { useState, useCallback, useEffect } from "react"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, CheckCircle, Link2, Link2Off } from "lucide-react"
import { resizeImage, downloadBlob, getOutputFilename, ProcessingResult, loadImage } from "@/lib/image-processor"

interface ResizeToolProps {
  acceptedTypes: string[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ResizeTool({ acceptedTypes }: ResizeToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null)
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)

    try {
      const img = await loadImage(selectedFile)
      setOriginalDimensions({ width: img.width, height: img.height })
      setWidth(img.width.toString())
      setHeight(img.height.toString())
    } catch {
      setError("Failed to load image dimensions")
    }
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
    setOriginalDimensions(null)
    setWidth("")
    setHeight("")
  }, [])

  const handleWidthChange = useCallback((value: string) => {
    setWidth(value)
    if (maintainAspectRatio && originalDimensions && value) {
      const newWidth = parseInt(value)
      if (!isNaN(newWidth)) {
        const aspectRatio = originalDimensions.width / originalDimensions.height
        setHeight(Math.round(newWidth / aspectRatio).toString())
      }
    }
  }, [maintainAspectRatio, originalDimensions])

  const handleHeightChange = useCallback((value: string) => {
    setHeight(value)
    if (maintainAspectRatio && originalDimensions && value) {
      const newHeight = parseInt(value)
      if (!isNaN(newHeight)) {
        const aspectRatio = originalDimensions.width / originalDimensions.height
        setWidth(Math.round(newHeight * aspectRatio).toString())
      }
    }
  }, [maintainAspectRatio, originalDimensions])

  const handleResize = useCallback(async () => {
    if (!file) return

    const newWidth = parseInt(width)
    const newHeight = parseInt(height)

    if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
      setError("Please enter valid dimensions")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const processed = await resizeImage(file, {
        width: newWidth,
        height: newHeight,
        maintainAspectRatio: false, // We've already calculated
      })
      setResult(processed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, width, height])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleResizeAnother = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
    setOriginalDimensions(null)
    setWidth("")
    setHeight("")
  }, [])

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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {maintainAspectRatio ? (
                        <Link2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Link2Off className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                    </div>
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        min="1"
                        max="10000"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        placeholder="Width"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        min="1"
                        max="10000"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  {originalDimensions && (
                    <p className="text-xs text-muted-foreground">
                      Original: {originalDimensions.width} x {originalDimensions.height} px
                    </p>
                  )}

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleResize}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resizing...
                      </>
                    ) : (
                      "Resize Image"
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
                    <span className="font-medium">Resize Complete!</span>
                  </div>

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt="Resized"
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'high-quality' }}
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">New Size:</span>{" "}
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
                    <Button onClick={handleResizeAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resize Another
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
