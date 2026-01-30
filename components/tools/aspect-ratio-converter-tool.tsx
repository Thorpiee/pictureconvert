
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, ArrowRight, X, Pencil, Ratio, Calculator, CheckCircle } from "lucide-react"
import { ImageDropzone } from "@/components/image-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropperBox } from "@/components/tools/cropper-box"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { useImagePipeline, calculateCenterCrop } from "@/hooks/use-image-pipeline"
import { downloadBlob } from "@/lib/image-processor"

const RATIOS = [
  { label: "1:1 Square", w: 1, h: 1 },
  { label: "16:9 Landscape", w: 16, h: 9 },
  { label: "9:16 Portrait", w: 9, h: 16 },
  { label: "4:5 Social", w: 4, h: 5 },
  { label: "4:3 Standard", w: 4, h: 3 },
  { label: "3:2 Classic", w: 3, h: 2 },
]

export function AspectRatioConverterTool() {
  const [ratioW, setRatioW] = useState<number>(1)
  const [ratioH, setRatioH] = useState<number>(1)
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  const [isEditingCrop, setIsEditingCrop] = useState(false)

  // Calculated target dimensions
  const [targetWidth, setTargetWidth] = useState<number>(0)
  const [targetHeight, setTargetHeight] = useState<number>(0)

  const {
    file,
    imageSrc,
    imageDimensions,
    cropRect,
    setCropRect,
    result,
    isProcessing,
    error,
    handleImageSelect,
    handleRemove,
    processImage,
    resetResult
  } = useImagePipeline()

  // Initialize dimensions from image when loaded
  useEffect(() => {
    if (imageDimensions && !result && targetWidth === 0) {
      setTargetWidth(imageDimensions.width)
      setTargetHeight(imageDimensions.height)
      setRatioW(imageDimensions.width)
      setRatioH(imageDimensions.height)
    }
  }, [imageDimensions, result])

  // Update target dimensions and crop rect when Ratio or Fit Mode changes
  useEffect(() => {
    if (!imageDimensions) return

    const targetRatio = ratioW / ratioH
    const imgRatio = imageDimensions.width / imageDimensions.height

    let newW = imageDimensions.width
    let newH = imageDimensions.height

    if (fitMode === "contain") {
      // Expand to contain
      if (targetRatio > imgRatio) {
        // Target is wider, so match height, calc width
        newH = imageDimensions.height
        newW = Math.round(newH * targetRatio)
      } else {
        // Target is taller, match width, calc height
        newW = imageDimensions.width
        newH = Math.round(newW / targetRatio)
      }

      setTargetWidth(newW)
      setTargetHeight(newH)

      // Full image crop
      setCropRect({
        x: 0, y: 0, width: imageDimensions.width, height: imageDimensions.height
      })

    } else {
      // Cover (Crop)
      // Target dimensions depend on what we crop.
      // Usually users want "Max resolution at this ratio".
      // So we take the largest crop possible.

      // We don't change the OUTPUT dimensions to be smaller than the crop.
      // The crop rect itself defines the output size (pixels).

      const crop = calculateCenterCrop(
        imageDimensions.width,
        imageDimensions.height,
        ratioW,
        ratioH
      )

      setTargetWidth(crop.width)
      setTargetHeight(crop.height)
      setCropRect(crop)
    }
  }, [imageDimensions, ratioW, ratioH, fitMode, setCropRect])

  const handleProcess = () => {
    processImage({
      width: targetWidth,
      height: targetHeight,
      quality: 0.92,
      fit: fitMode === "cover" ? "fill" : "contain",
      maintainAspectRatio: fitMode === "contain",
    })
  }

  const getOutputFilename = () => {
    if (!file) return "converted.jpg"
    const name = file.name.replace(/\.[^/.]+$/, "")
    return `${name}-${ratioW}x${ratioH}.jpg`
  }

  if (result) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <Card className="border-border/50 shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-muted/30 flex items-center justify-center p-6 border-b">
            <img
              src={result.url}
              alt="Processed"
              className="max-w-full max-h-[400px] object-contain shadow-sm rounded-md"
            />
          </div>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 mb-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Original</p>
                <p className="text-lg font-semibold">{(file!.size / 1024).toFixed(1)} KB</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium text-muted-foreground">New Size</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {(result.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={resetResult}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button onClick={() => downloadBlob(result.blob, getOutputFilename())} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <Button variant="ghost" onClick={handleRemove} className="w-full mt-2">Start Over</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      preview={
        imageSrc && imageDimensions && cropRect && (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30 w-full min-h-[400px] flex items-center justify-center">
              <div className="absolute top-2 right-2 z-20 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditingCrop(!isEditingCrop)}
                  className="h-8 bg-background/50 hover:bg-background/80 backdrop-blur-md text-foreground"
                >
                  {isEditingCrop ? (
                    <>
                      <CheckCircle className="mr-2 h-3 w-3" />
                      Preview
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit Crop
                    </>
                  )}
                </Button>
              </div>

              {isEditingCrop ? (
                <CropperBox
                  imageSrc={imageSrc}
                  imageNaturalWidth={imageDimensions.width}
                  imageNaturalHeight={imageDimensions.height}
                  aspectMode={fitMode === "cover" ? (ratioW / ratioH) : "free"}
                  cropRect={cropRect}
                  onChange={setCropRect}
                  onCrop={() => { }}
                  resizable={fitMode === "cover" ? false : true}
                />
              ) : (
                <CanvasPreview
                  imageSrc={imageSrc}
                  width={targetWidth}
                  height={targetHeight}
                  fit={fitMode === "cover" ? "fill" : "contain"}
                  maintainAspectRatio={fitMode === "contain"}
                  cropRect={cropRect}
                  backgroundColor={backgroundColor}
                  className="max-w-full max-h-[500px]"
                />
              )}
            </div>

            <div className="w-full max-w-md mt-4 flex flex-col items-center gap-4">
              <Tabs value={fitMode} onValueChange={(v) => setFitMode(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cover">Cover (Crop)</TabsTrigger>
                  <TabsTrigger value="contain">Contain (Add Bars)</TabsTrigger>
                </TabsList>
              </Tabs>

              {fitMode === "contain" && (
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50 w-full">
                  <Label htmlFor="bg-color" className="text-sm font-medium whitespace-nowrap">Background:</Label>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="color"
                      id="bg-color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-xs text-muted-foreground font-mono">{backgroundColor}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setBackgroundColor("#000000")} title="Black">
                      <div className="w-3 h-3 bg-black rounded-full border border-white/20" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setBackgroundColor("#FFFFFF")} title="White">
                      <div className="w-3 h-3 bg-white rounded-full border border-black/10" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
      controls={
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-medium pb-2 border-b">
            <Ratio className="h-5 w-5" />
            Target Aspect Ratio
          </div>

          <div className="grid grid-cols-3 gap-2">
            {RATIOS.map(r => (
              <Button
                key={r.label}
                variant={ratioW === r.w && ratioH === r.h ? "default" : "outline"}
                size="sm"
                className="text-xs h-12 whitespace-normal leading-tight"
                onClick={() => {
                  setRatioW(r.w)
                  setRatioH(r.h)
                }}
              >
                {r.label}
              </Button>
            ))}
          </div>

          <div className="pt-2 border-t mt-2">
            <Label className="text-xs text-muted-foreground mb-2 block">Custom Ratio</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={ratioW}
                onChange={(e) => setRatioW(Number(e.target.value) || 1)}
                className="h-8"
              />
              <span className="text-muted-foreground">:</span>
              <Input
                type="number"
                value={ratioH}
                onChange={(e) => setRatioH(Number(e.target.value) || 1)}
                className="h-8"
              />
            </div>
          </div>

          {imageDimensions && (
            <div className="pt-2 bg-muted/30 p-3 rounded text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original:</span>
                <span>{imageDimensions.width} x {imageDimensions.height}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Output:</span>
                <span>{Math.round(targetWidth)} x {Math.round(targetHeight)}</span>
              </div>
            </div>
          )}
        </div>
      }
      actions={
        <div className="space-y-4">
          <Button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Convert Ratio
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
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
