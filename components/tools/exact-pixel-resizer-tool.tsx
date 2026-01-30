
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, ArrowRight, X, Pencil, Check, Settings2, Lock, Unlock } from "lucide-react"
import { ImageDropzone } from "@/components/image-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropperBox } from "@/components/tools/cropper-box"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { useImagePipeline, calculateCenterCrop } from "@/hooks/use-image-pipeline"
import { downloadBlob } from "@/lib/image-processor"

const QUICK_SIZES = [
  { width: 1920, height: 1080, label: "FHD (16:9)" },
  { width: 1280, height: 720, label: "HD (16:9)" },
  { width: 1080, height: 1080, label: "Square" },
  { width: 1080, height: 1920, label: "Story" },
]

import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"

export function ExactPixelResizerTool() {
  const [width, setWidth] = useState<number>(1920)
  const [height, setHeight] = useState<number>(1080)
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [fitMode, setFitMode] = useState<"stretch" | "cover" | "contain">("cover")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [isEditingCrop, setIsEditingCrop] = useState(false)

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
    if (imageDimensions && !result) {
      setWidth(imageDimensions.width)
      setHeight(imageDimensions.height)
    }
  }, [imageDimensions, result])

  // Update crop rect based on fit mode and dimensions
  useEffect(() => {
    if (!imageDimensions || fitMode === "stretch" || fitMode === "contain") {
      if (imageDimensions) {
        setCropRect({
          x: 0,
          y: 0,
          width: imageDimensions.width,
          height: imageDimensions.height
        })
      }
      setIsEditingCrop(false)
      return
    }

    const newCrop = calculateCenterCrop(
      imageDimensions.width,
      imageDimensions.height,
      width,
      height
    )
    setCropRect(newCrop)
  }, [imageDimensions, width, height, fitMode, setCropRect])

  const handleDimensionChange = (type: "width" | "height", value: string) => {
    const val = parseInt(value) || 0
    if (type === "width") {
      setWidth(val)
      if (lockAspectRatio && imageDimensions) {
        const ratio = imageDimensions.height / imageDimensions.width
        setHeight(Math.round(val * ratio))
      }
    } else {
      setHeight(val)
      if (lockAspectRatio && imageDimensions) {
        const ratio = imageDimensions.width / imageDimensions.height
        setWidth(Math.round(val * ratio))
      }
    }
  }

  const handleProcess = () => {
    processImage({
      width,
      height,
      quality: 0.92,
      fit: fitMode === "cover" ? "fill" : (fitMode === "contain" ? "contain" : "fill"),
      maintainAspectRatio: fitMode === "contain",
      backgroundColor: backgroundColor
    })
  }

  const getOutputFilename = () => {
    if (!file) return "resized.jpg"
    const name = file.name.replace(/\.[^/.]+$/, "")
    return `${name}-${width}x${height}.jpg`
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
        imageSrc && (
          <>
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {fitMode === "cover" && !isEditingCrop && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditingCrop(true)}
                  className="bg-background/80 backdrop-blur-sm shadow-sm"
                >
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Adjust Crop
                </Button>
              )}
              {isEditingCrop && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsEditingCrop(false)}
                  className="shadow-sm"
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Done
                </Button>
              )}
            </div>

            {isEditingCrop ? (
              <CropperBox
                imageSrc={imageSrc}
                imageNaturalWidth={imageDimensions!.width}
                imageNaturalHeight={imageDimensions!.height}
                aspectMode={fitMode === "cover" ? (width / height) : "free"}
                cropRect={cropRect!}
                onChange={setCropRect}
                onCrop={() => { }}
                resizable={true}
              />
            ) : (
              <CanvasPreview
                imageSrc={imageSrc}
                width={width}
                height={height}
                fit={fitMode === "cover" ? "fill" : (fitMode === "contain" ? "contain" : "fill")}
                maintainAspectRatio={fitMode === "contain"}
                cropRect={cropRect!}
                backgroundColor={backgroundColor}
                className="max-w-full max-h-[500px]"
              />
            )}
          </>
        )
      }
      controls={
        <div className="space-y-6">
          <div className="flex justify-center">
            <Tabs value={fitMode} onValueChange={(v) => setFitMode(v as any)} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cover">Cover</TabsTrigger>
                <TabsTrigger value="contain">Contain</TabsTrigger>
                <TabsTrigger value="stretch">Stretch</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="font-medium">Dimensions</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => setLockAspectRatio(!lockAspectRatio)}
                >
                  {lockAspectRatio ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                  {lockAspectRatio ? "Locked" : "Unlocked"}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => handleDimensionChange("width", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => handleDimensionChange("height", e.target.value)}
                  />
                </div>
              </div>

              {fitMode === "contain" && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={backgroundColor === "transparent" ? "#ffffff" : backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                      disabled={backgroundColor === "transparent"}
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
            </CardContent>
          </Card>

          <div className="pt-2">
            <Label className="text-xs text-muted-foreground mb-2 block">Quick Sizes</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUICK_SIZES.map(size => (
                <Button
                  key={size.label}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    let w = size.width
                    let h = size.height

                    // Check if we need to prevent upscaling
                    if (imageDimensions && (w > imageDimensions.width || h > imageDimensions.height)) {
                      const targetRatio = w / h
                      const imgRatio = imageDimensions.width / imageDimensions.height

                      if (imgRatio > targetRatio) {
                        h = imageDimensions.height
                        w = Math.round(h * targetRatio)
                      } else {
                        w = imageDimensions.width
                        h = Math.round(w / targetRatio)
                      }
                    }

                    setWidth(w)
                    setHeight(h)
                  }}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      }
      actions={
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Summary</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>New Size:</span>
                    <span className="font-medium text-foreground">{width} x {height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fit Mode:</span>
                    <span className="font-medium text-foreground capitalize">{fitMode}</span>
                  </div>
                </div>
              </div>
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
                    Resize Image
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
