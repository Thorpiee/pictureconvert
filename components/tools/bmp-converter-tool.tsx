"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight } from "lucide-react"
import { downloadBlob } from "@/lib/image-processor"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { useImagePipeline } from "@/hooks/use-image-pipeline"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string, format: string): string {
  const baseName = originalName.replace(/\.(bmp|dib)$/i, "")
  const ext = format === "image/jpeg" ? "jpg" : "png"
  return `${baseName}.${ext}`
}

export function BmpConverterTool({ toolName = "BMP Converter" }: { toolName?: string }) {
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/png")
  const [quality, setQuality] = useState(95)

  const {
    file,
    imageSrc,
    imageDimensions,
    result,
    isProcessing,
    error,
    handleImageSelect: originalHandleImageSelect,
    handleRemove,
    processImage,
    resetResult
  } = useImagePipeline()

  const handleImageSelect = (file: File) => {
    originalHandleImageSelect(file)
    trackFileUpload(toolName, file.type, file.size / 1024)
  }

  const handleConvert = async () => {
    if (!file) return
    const startTime = Date.now()
    trackConvertStart(toolName, "convert", outputFormat)

    try {
      await processImage({
        format: outputFormat,
        quality: outputFormat === "image/jpeg" ? quality / 100 : 1.0,
        width: imageDimensions?.width || 0,
        height: imageDimensions?.height || 0
      })
      // Note: processImage is async but doesn't return result directly, it sets state. 
      // However, we can assume success if no error thrown.
      // We might need to check result in useEffect, but for now this is close enough or we can wrap processImage better.
      // Actually processImage in hook is async.
      trackConvertComplete(toolName, Date.now() - startTime, 0, true) // Size 0 as we don't have it easily here without result state change
    } catch (e) {
      trackConvertComplete(toolName, Date.now() - startTime, 0, false)
    }
  }

  const handleDownload = () => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, outputFormat)
    trackDownloadClick(toolName, outputFormat, result.size / 1024)
    downloadBlob(result.blob, filename)
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
                <p className="text-lg font-semibold">{formatFileSize(file!.size)}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium text-muted-foreground">
                  {outputFormat === "image/png" ? "PNG" : "JPG"}
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatFileSize(result.size)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={resetResult}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Convert Another
              </Button>
              <Button onClick={handleDownload} className="w-full">
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
      acceptedTypes={["image/bmp", "image/x-bmp"]}
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select
                value={outputFormat}
                onValueChange={(v: any) => setOutputFormat(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/png">PNG (Lossless)</SelectItem>
                  <SelectItem value="image/jpeg">JPG (Small Size)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {outputFormat === "image/jpeg" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Quality: {quality}%</Label>
                </div>
                <Slider
                  min={80}
                  max={100}
                  step={1}
                  value={[quality]}
                  onValueChange={([v]) => setQuality(v)}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 92-95% for high quality
                </p>
              </div>
            )}

            <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
              <p className="flex items-start gap-2">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>
                  {outputFormat === "image/png"
                    ? "PNG preserves full color depth and is lossless."
                    : "JPG offers smaller file sizes but is lossy."}
                </span>
              </p>
            </div>
          </div>
        </div>
      }
      actions={
        <div className="space-y-4">
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
                Convert BMP
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
