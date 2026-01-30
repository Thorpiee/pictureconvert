"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { CropperBox, CropRect, AspectMode, getCroppedImageBlob } from "./cropper-box"
import { ImageDropzone } from "@/components/image-dropzone"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, CheckCircle, X } from "lucide-react"
import { cropImage, downloadBlob, getOutputFilename, ProcessingResult, loadImage } from "@/lib/image-processor"

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
  // Drag state for crop box
  const [isCropDragging, setIsCropDragging] = useState(false)
  const dragStartMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const dragStartCrop = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Mouse event handlers for dragging crop box
  const handleCropBoxMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageDimensions) return
    e.preventDefault()
    e.stopPropagation()
    setIsCropDragging(true)
    const display = getDisplayDimensions()
    const scale = display.scale
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    // Mouse position relative to image container
    const mouseX = (e.clientX - rect.left) / scale
    const mouseY = (e.clientY - rect.top) / scale
    dragStartMouse.current = { x: mouseX, y: mouseY }
    dragStartCrop.current = { x: cropArea.x, y: cropArea.y }
    window.addEventListener('mousemove', handleCropBoxMouseMove)
    window.addEventListener('mouseup', handleCropBoxMouseUp)
  }

  const handleCropBoxMouseMove = (e: MouseEvent) => {
    if (!isCropDragging || !imageDimensions) return
    const display = getDisplayDimensions()
    const scale = display.scale
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const mouseX = (e.clientX - rect.left) / scale
    const mouseY = (e.clientY - rect.top) / scale
    const dx = mouseX - dragStartMouse.current.x
    const dy = mouseY - dragStartMouse.current.y
    setCropArea(area => {
      let newX = Math.round(dragStartCrop.current.x + dx)
      let newY = Math.round(dragStartCrop.current.y + dy)
      // Clamp to image bounds
      newX = Math.max(0, Math.min(newX, imageDimensions.width - area.width))
      newY = Math.max(0, Math.min(newY, imageDimensions.height - area.height))
      return { ...area, x: newX, y: newY }
    })
  }

  const handleCropBoxMouseUp = () => {
    setIsCropDragging(false)
    window.removeEventListener('mousemove', handleCropBoxMouseMove)
    window.removeEventListener('mouseup', handleCropBoxMouseUp)
  }
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [aspectRatio, setAspectRatio] = useState<AspectMode>("free")
  const [cropArea, setCropArea] = useState<CropRect>({ x: 0, y: 0, width: 100, height: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
  }, [imageSrc])

  const handleAspectRatioChange = useCallback((value: AspectRatio) => {
    setAspectRatio(value)
    if (!imageDimensions) return

    const selectedRatio = aspectRatios.find(r => r.value === value)
    if (!selectedRatio?.ratio) {
      setCropArea({ x: 0, y: 0, width: imageDimensions.width, height: imageDimensions.height })
      return
    }

    const imgRatio = imageDimensions.width / imageDimensions.height
    let newWidth: number, newHeight: number

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
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setImageDimensions(null)
    setResult(null)
    setError(null)
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setAspectRatio("free")
  }, [imageSrc])

  // Calculate display dimensions to fit container
  const getDisplayDimensions = useCallback(() => {
    if (!imageDimensions || !containerRef.current) return { width: 0, height: 0, scale: 1 }
    
    const containerWidth = containerRef.current.clientWidth
    const maxHeight = 400
    
    const scale = Math.min(containerWidth / imageDimensions.width, maxHeight / imageDimensions.height)
    
    return {
      width: imageDimensions.width * scale,
      height: imageDimensions.height * scale,
      scale,
    }
  }, [imageDimensions])

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={acceptedTypes}
        />
      ) : (
        <>
          {!result && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label>Aspect Ratio</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                      className="text-muted-foreground"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

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

                  {/* Custom crop area controls */}
                  <div className="flex flex-wrap gap-4 items-center justify-center">
                    <div>
                      <Label htmlFor="crop-x" className="text-xs">X</Label>
                      <input
                        id="crop-x"
                        type="number"
                        min={0}
                        max={imageDimensions?.width ?? 0}
                        value={cropArea.x}
                        onChange={e => setCropArea(area => ({ ...area, x: Math.max(0, Math.min(Number(e.target.value), (imageDimensions?.width ?? 0) - area.width)) }))}
                        className="w-16 border rounded px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crop-y" className="text-xs">Y</Label>
                      <input
                        id="crop-y"
                        type="number"
                        min={0}
                        max={imageDimensions?.height ?? 0}
                        value={cropArea.y}
                        onChange={e => setCropArea(area => ({ ...area, y: Math.max(0, Math.min(Number(e.target.value), (imageDimensions?.height ?? 0) - area.height)) }))}
                        className="w-16 border rounded px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crop-width" className="text-xs">Width</Label>
                      <input
                        id="crop-width"
                        type="number"
                        min={1}
                        max={imageDimensions ? imageDimensions.width - cropArea.x : 1}
                        value={cropArea.width}
                        onChange={e => setCropArea(area => ({ ...area, width: Math.max(1, Math.min(Number(e.target.value), (imageDimensions ? imageDimensions.width - area.x : 1))) }))}
                        className="w-20 border rounded px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crop-height" className="text-xs">Height</Label>
                      <input
                        id="crop-height"
                        type="number"
                        min={1}
                        max={imageDimensions ? imageDimensions.height - cropArea.y : 1}
                        value={cropArea.height}
                        onChange={e => setCropArea(area => ({ ...area, height: Math.max(1, Math.min(Number(e.target.value), (imageDimensions ? imageDimensions.height - area.y : 1))) }))}
                        className="w-20 border rounded px-2 py-1 text-xs"
                      />
                    </div>
                  </div>

                  {imageSrc && imageDimensions && (
                    <CropperBox
                      imageSrc={imageSrc}
                      imageNaturalWidth={imageDimensions.width}
                      imageNaturalHeight={imageDimensions.height}
                      aspectMode={aspectRatio}
                      cropRect={cropArea}
                      onChange={setCropArea}
                      onCrop={async (blob) => {
                        // Optionally preview or download blob
                      }}
                    />
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    Crop area: {cropArea.width} x {cropArea.height} px
                  </p>

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

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
                      "Crop Image"
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
                    <span className="font-medium">Crop Complete!</span>
                  </div>

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt="Cropped"
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'high-quality' }}
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size:</span>{" "}
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
                    <Button onClick={handleCropAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Crop Another
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
