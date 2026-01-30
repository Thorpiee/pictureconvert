"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Layers, Package } from "lucide-react"
import { downloadBlob } from "@/lib/image-processor"
import { generateIco, generateFaviconPackage } from "@/lib/ico-utils"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function getOutputFilename(originalName: string): string {
  const baseName = originalName.replace(/\.png$/i, "")
  return `${baseName}.ico`
}

function getPackageFilename(originalName: string): string {
  const baseName = originalName.replace(/\.png$/i, "")
  return `${baseName}-favicon-package.zip`
}

export function FaviconGeneratorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ ico: Blob; pkg: Blob; icoUrl: string; icoSize: number; pkgSize: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
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
    } catch (err) {
      console.error("Conversion error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate favicon")
    } finally {
      setIsProcessing(false)
    }
  }, [file])

  const handleDownloadIco = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name)
    downloadBlob(result.ico, filename)
  }, [result, file])

  const handleDownloadPackage = useCallback(() => {
    if (!result || !file) return
    const filename = getPackageFilename(file.name)
    downloadBlob(result.pkg, filename)
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
          acceptedTypes={["image/png"]}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          {/* Controls Card */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {!result ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Output</span>
                        <Badge variant="secondary">Multi-size .ico + Package</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center text-muted-foreground">
                        <div className="bg-muted/50 p-2 rounded">16×16</div>
                        <div className="bg-muted/50 p-2 rounded">32×32</div>
                        <div className="bg-muted/50 p-2 rounded">48×48</div>
                        <div className="bg-muted/50 p-2 rounded">64×64</div>
                        <div className="bg-muted/50 p-2 rounded">128×128</div>
                        <div className="bg-muted/50 p-2 rounded">256×256</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
                        <p className="flex items-start gap-2">
                          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>
                            Generates a single .ico file containing all standard sizes,
                            plus a full favicon package (ZIP) with PNGs and manifest.
                          </span>
                        </p>
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
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Favicon Package
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
                          <p className="text-sm font-medium text-muted-foreground">Original</p>
                          <p className="text-lg font-semibold">{formatFileSize(file.size)}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                        <div className="space-y-1 text-right">
                          <p className="text-sm font-medium text-muted-foreground">Package Size</p>
                          <p className="text-lg font-semibold text-primary">{formatFileSize(result.pkgSize)}</p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <Button onClick={handleDownloadPackage} className="w-full" size="lg">
                          <Package className="mr-2 h-4 w-4" />
                          Download Full Package (.zip)
                        </Button>
                        <div className="flex gap-3">
                          <Button onClick={handleDownloadIco} variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download .ico
                          </Button>
                          <Button onClick={handleConvertAnother} variant="outline" className="flex-1">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            New
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
