"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"
import { CanvasPreview } from "@/components/tools/canvas-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, Package, CheckCircle, RefreshCw, Info, ArrowRight } from "lucide-react"
import { downloadBlob } from "@/lib/image-processor"
import { generateIco, generateFaviconPackage } from "@/lib/ico-utils"
import { useImagePipeline } from "@/hooks/use-image-pipeline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.[^/.]+$/, "")
  return `${baseName}.ico`
}

function getPackageFilename(originalName: string): string {
  const baseName = originalName.replace(/\.[^/.]+$/, "")
  return `${baseName}-favicon-package.zip`
}

export function FaviconGeneratorTool({ toolName = "Favicon Generator" }: { toolName?: string }) {
  const {
    file,
    imageSrc,
    imageDimensions,
    handleImageSelect,
    handleRemove,
  } = useImagePipeline()

  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ ico: Blob; pkg: Blob; icoUrl: string; icoSize: number; pkgSize: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setResult(null)
    setError(null)
  }, [file])

  const handleConvert = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)
    const startTime = Date.now()
    trackConvertStart(toolName, "convert", `${file.size}`)

    try {
      const [icoBlob, pkgBlob] = await Promise.all([
        generateIco(file),
        generateFaviconPackage(file)
      ])

      setResult({
        ico: icoBlob,
        pkg: pkgBlob,
        icoUrl: URL.createObjectURL(icoBlob),
        icoSize: icoBlob.size,
        pkgSize: pkgBlob.size
      })
      trackConvertComplete(toolName, Date.now() - startTime, icoBlob.size / 1024, true)
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate favicon")
      trackConvertComplete(toolName, Date.now() - startTime, 0, false, err instanceof Error ? err.message : "Failed")
    } finally {
      setIsProcessing(false)
    }
  }, [file, toolName])

  const handleDownloadIco = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    downloadBlob(result.ico, filename)
    trackDownloadClick(toolName, "ico", result.icoSize / 1024)
  }, [result, file, toolName])

  const handleDownloadPackage = useCallback(() => {
    if (!result || !file) return
    const filename = getPackageFilename(file.name)
    downloadBlob(result.pkg, filename)
    trackDownloadClick(toolName, "package", result.pkgSize / 1024)
  }, [result, file, toolName])

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      acceptedTypes={["image/png", "image/jpeg", "image/webp", "image/svg+xml"]}
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
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Output Configuration</Label>
                <Badge variant="secondary">Multi-size .ico + Package</Badge>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs text-center text-muted-foreground">
                <div className="bg-muted/50 p-2 rounded">16×16</div>
                <div className="bg-muted/50 p-2 rounded">32×32</div>
                <div className="bg-muted/50 p-2 rounded">48×48</div>
                <div className="bg-muted/50 p-2 rounded">64×64</div>
                <div className="bg-muted/50 p-2 rounded">128×128</div>
                <div className="bg-muted/50 p-2 rounded">256×256</div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1">
                <p className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>
                    Generates a single .ico file containing all standard sizes,
                    plus a full favicon package (ZIP) with PNGs and manifest.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      actions={
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {result ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <CheckCircle className="h-5 w-5" />
                    <span>Generation Complete!</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted/30 rounded border border-border/50">
                      <span className="text-muted-foreground">ICO Size:</span>
                      <span className="font-medium">{formatFileSize(result.icoSize)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/30 rounded border border-border/50">
                      <span className="text-muted-foreground">Package Size:</span>
                      <span className="font-medium">{formatFileSize(result.pkgSize)}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button onClick={handleDownloadPackage} className="w-full" size="lg">
                      <Package className="mr-2 h-4 w-4" />
                      Download Package (.zip)
                    </Button>
                    <Button onClick={handleDownloadIco} variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download .ico Only
                    </Button>
                  </div>

                  <Button onClick={() => setResult(null)} variant="ghost" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Another
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Summary</Label>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Input Size:</span>
                        <span className="font-medium text-foreground">{file ? formatFileSize(file.size) : "-"}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing || !file}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Favicon
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              )}
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
