"use client"

import { useState, useCallback } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight, Code, Copy, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { CanvasPreview } from "@/components/tools/canvas-preview"

export function WebsiteOptimizerTool() {
  const { toast } = useToast()

  const {
    file,
    imageSrc,
    imageDimensions,
    result,
    isProcessing,
    error,
    handleImageSelect,
    handleRemove,
    processImage
  } = useImagePipeline()

  const handleOptimize = () => {
    if (!imageDimensions) return

    let targetWidth = imageDimensions.width
    let targetHeight = imageDimensions.height

    // Resize if wider than 1920px (standard web max width)
    if (targetWidth > 1920) {
      const ratio = targetHeight / targetWidth
      targetWidth = 1920
      targetHeight = Math.round(1920 * ratio)
    }

    processImage({
      width: targetWidth,
      height: targetHeight,
      quality: 0.85,
      format: "image/webp",
      maintainAspectRatio: true,
      skipQualityCheck: true
    })
  }

  const getEmbedCode = () => {
    if (!result || !file) return ""
    const altText = file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
    return `<img 
  src="${file.name.replace(/\.[^/.]+$/, "")}.webp" 
  alt="${altText}" 
  width="${result.width}" 
  height="${result.height}" 
  loading="lazy" 
  decoding="async"
/>`
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getEmbedCode())
    toast({
      title: "Copied!",
      description: "HTML snippet copied to clipboard",
    })
  }

  const previewContent = (
    <CanvasPreview
      imageSrc={imageSrc || ""}
      width={imageDimensions?.width || 0}
      height={imageDimensions?.height || 0}
      className="max-w-full max-h-full shadow-lg rounded-md"
    />
  )

  const controlsContent = (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
        <div className="flex items-center gap-2 font-medium">
          <Code className="h-4 w-4" />
          <span>Web Optimization Plan</span>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
          <li>Convert to <b>WebP</b> (Next-Gen Format)</li>
          <li>Optimize compression (Quality: 85%)</li>
          <li>Resize to max 1920px width</li>
          <li>Generate responsive <code>&lt;img&gt;</code> tag</li>
          <li>Strip metadata for smaller size</li>
        </ul>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">HTML Embed Code</Label>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleCopyCode}>
              <Copy className="mr-2 h-3 w-3" />
              Copy Code
            </Button>
          </div>
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto border border-border/50">
              {getEmbedCode()}
            </pre>
          </div>
        </div>
      )}
    </div>
  )

  const actionsContent = (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!result ? (
        <Button
          onClick={handleOptimize}
          disabled={isProcessing || !file}
          className="w-full h-12 text-base font-medium shadow-sm"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              Optimize for Web
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-5 text-[10px] px-1.5">
              WebP
            </Badge>
            <span className="text-sm text-muted-foreground">Ready</span>
          </div>
        </div>
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
      acceptedTypes={["image/jpeg", "image/png", "image/webp", "image/avif"]}
    />
  )
}
