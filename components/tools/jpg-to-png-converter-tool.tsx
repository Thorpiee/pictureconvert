"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "./shared/tool-content-layout"
import { CanvasPreview } from "./canvas-preview"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Download, Info, ArrowRight, AlertCircle } from "lucide-react"
import { convertJpgToPng, type JpgToPngResult } from "@/lib/jpg-to-png-converter"
import { downloadBlob } from "@/lib/image-processor"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"
import { Alert, AlertDescription } from "@/components/ui/alert"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.(jpg|jpeg)$/i, "")
  return `${baseName}.png`
}

export function JpgToPngConverterTool({ toolName = "JPG to PNG" }: { toolName?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<JpgToPngResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
    trackFileUpload(toolName, selectedFile.type, selectedFile.size / 1024)
  }, [toolName])

  const handleRemove = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  // Auto-convert when file is selected
  useEffect(() => {
    if (!file) return

    const convert = async () => {
      setIsProcessing(true)
      setError(null)
      const startTime = Date.now()
      trackConvertStart(toolName, "convert", "image/png")

      try {
        const conversionResult = await convertJpgToPng(file)
        setResult(conversionResult)
        trackConvertComplete(toolName, Date.now() - startTime, conversionResult.blob.size / 1024, true)
      } catch (err) {
        console.error("Conversion error:", err)
        setError(err instanceof Error ? err.message : "Failed to convert image")
        trackConvertComplete(toolName, Date.now() - startTime, 0, false)
      } finally {
        setIsProcessing(false)
      }
    }

    convert()
  }, [file, toolName])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    trackDownloadClick(toolName, "image/png", result.blob.size / 1024)
    downloadBlob(result.blob, filename)
  }, [result, file, toolName])

  const previewContent = (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-muted/20">
      {isProcessing ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Converting to lossless PNG...</p>
        </div>
      ) : result ? (
        <CanvasPreview
          imageSrc={result.url}
          width={result.width}
          height={result.height}
          fit="contain"
          className="w-full h-full"
        />
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Select an image to start</p>
        </div>
      )}
    </div>
  )

  const controlsContent = (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Output Format</span>
          <Badge variant="secondary">PNG (Lossless)</Badge>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
          <p className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              Converting to PNG preserves 100% of the visual information.
              File size typically increases because PNG is lossless.
            </span>
          </p>
        </div>
      </div>

      {result && (
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Original JPG</p>
            <p className="text-lg font-semibold">{formatFileSize(file?.size || 0)}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium text-muted-foreground">PNG Result</p>
            <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )

  const actionsContent = (
    <Button
      onClick={handleDownload}
      disabled={!result || isProcessing}
      className="w-full sm:w-auto min-w-[200px]"
      size="lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Converting...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PNG
        </>
      )}
    </Button>
  )

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      preview={previewContent}
      controls={controlsContent}
      actions={actionsContent}
      acceptedTypes={["image/jpeg", "image/jpg"]}
    />
  )
}
