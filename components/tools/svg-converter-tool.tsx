"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Settings2 } from "lucide-react"
import { downloadBlob, type ProcessingResult, loadImage } from "@/lib/image-processor"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
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

export function SvgConverterTool() {
  const [file, setFile] = useState<File | null>(null)
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
      const img = await loadImage(file)
      
      const canvas = document.createElement("canvas")
      let finalWidth = width
      let finalHeight = height

      // Recalculate if maintaining aspect ratio
      if (maintainAspectRatio && img.width && img.height) {
        const ratio = img.width / img.height
        // If user changed width but not height (or both match ratio), we just use width
        // Here we just use the user inputs as constraints or target
        // Simple logic: Use the largest dimension to set scale
        if (width > height) {
           finalHeight = Math.round(width / ratio)
        } else {
           finalWidth = Math.round(height * ratio)
        }
        // Actually, better UX: Trust user input unless 0. 
        // But for SVG, usually we define one dimension.
        // Let's use the inputs directly as the canvas size.
        // If "maintain aspect" is on, we might need to center or scale.
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
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to convert SVG")
    } finally {
      setIsProcessing(false)
    }
  }, [file, width, height, background, maintainAspectRatio])

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
          acceptedTypes={["image/svg+xml"]}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Preview */}
            <div className="flex-1">
               <ImagePreview file={file} onRemove={handleRemove} />
            </div>

            {/* Right: Controls */}
            <Card className="flex-1 border-border/50 shadow-lg h-fit">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {!result ? (
                    <>
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
                                onChange={(e) => setWidth(parseInt(e.target.value) || 0)} 
                              />
                            </div>
                            <div className="space-y-1 flex-1">
                              <Label htmlFor="height" className="text-xs text-muted-foreground">Height</Label>
                              <Input 
                                id="height" 
                                type="number" 
                                value={height} 
                                onChange={(e) => setHeight(parseInt(e.target.value) || 0)} 
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
                            Rendering...
                          </>
                        ) : (
                          <>
                            Rasterize to PNG
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
                            <p className="text-sm font-medium text-muted-foreground">SVG</p>
                            <p className="text-lg font-semibold">{formatFileSize(file.size)}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                          <div className="space-y-1 text-right">
                            <p className="text-sm font-medium text-muted-foreground">PNG</p>
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

                        <div className="flex flex-col gap-3 pt-2">
                          <Button onClick={handleDownload} className="w-full" size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download PNG
                          </Button>
                          <Button onClick={handleConvertAnother} variant="outline" className="w-full" size="lg">
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
          </div>
        </>
      )}
    </div>
  )
}
