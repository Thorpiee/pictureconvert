"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download, Link2, Link2Off } from "lucide-react"
import { resizeImage, downloadBlob, getOutputFilename, ProcessingResult, loadImage } from "@/lib/image-processor"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { getToolNameFromPath, trackConversionComplete } from "@/lib/analytics"

interface ResizeToolProps {
  acceptedTypes: string[]
  toolName?: string
}

export function ResizeTool({ acceptedTypes, toolName = "Resize Tool" }: ResizeToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null)
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [fitMode, setFitMode] = useState<"fill" | "contain" | "cover">("fill")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setImageSrc(url)
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
  }, [toolName])

  const handleRemove = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setResult(null)
    setError(null)
    setOriginalDimensions(null)
    setWidth("")
    setHeight("")
    setFitMode("fill")
    setBackgroundColor("#FFFFFF")
  }, [imageSrc])

  const handleWidthChange = useCallback((value: string) => {
    setWidth(value)
    if (maintainAspectRatio && originalDimensions && value) {
      const newWidth = parseInt(value)
      if (!isNaN(newWidth)) {
        const aspectRatio = originalDimensions.width / originalDimensions.height
        setHeight(Math.round(newWidth / aspectRatio).toString())
      }
    }
    setResult(null) // Reset result on change
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
    setResult(null) // Reset result on change
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
        maintainAspectRatio: false, // We handle aspect ratio via input calculation
        fit: maintainAspectRatio ? "fill" : fitMode,
        backgroundColor: (!maintainAspectRatio && fitMode === "contain") ? backgroundColor : undefined,
      })
      setResult(processed)
      trackConversionComplete(getToolNameFromPath(), processed.blob.type)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, width, height, maintainAspectRatio, fitMode, backgroundColor])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const previewContent = imageSrc ? (
    <CanvasPreview
      imageSrc={imageSrc}
      width={parseInt(width) || 100}
      height={parseInt(height) || 100}
      fit={maintainAspectRatio ? "fill" : fitMode}
      maintainAspectRatio={maintainAspectRatio}
      backgroundColor={(!maintainAspectRatio && fitMode === "contain") ? backgroundColor : undefined}
      className="max-w-full"
    />
  ) : null

  const controlsContent = (
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

      {!maintainAspectRatio && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Label>Fit Mode</Label>
            <Select value={fitMode} onValueChange={(v: any) => setFitMode(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fit mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fill">Stretch (Fill)</SelectItem>
                <SelectItem value="contain">Contain (Fit w/ Bars)</SelectItem>
                <SelectItem value="cover">Cover (Crop)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {fitMode === "contain" && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-9 p-1 cursor-pointer"
                />
                <div className="flex-1 flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setBackgroundColor("#FFFFFF")}
                  >
                    White
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setBackgroundColor("#000000")}
                  >
                    Black
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {originalDimensions && (
        <p className="text-xs text-muted-foreground">
          Original: {originalDimensions.width} x {originalDimensions.height} px
        </p>
      )}
    </div>
  )

  const actionsContent = (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <Button
        onClick={handleResize}
        disabled={isProcessing || !width || !height}
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

      {result && (
        <Button onClick={handleDownload} className="w-full" size="lg" variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download Resized Image
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
      acceptedTypes={acceptedTypes}
    />
  )
}
