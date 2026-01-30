"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Code, Copy, Check } from "lucide-react"
import { downloadBlob, compressImage, resizeImage } from "@/lib/image-processor"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function WebsiteOptimizerTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ blob: Blob; url: string; size: number; width: number; height: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleOptimize = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      let fileToProcess = file

      // 1. Check dimensions and resize if too large (standard web max width 1920px)
      // We need to check dimensions first.
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)
      img.src = objectUrl
      await new Promise((resolve) => { img.onload = resolve })
      URL.revokeObjectURL(objectUrl)

      if (img.width > 1920) {
        const resized = await resizeImage(file, { width: 1920 })
        fileToProcess = new File([resized.blob], file.name, { type: file.type })
      }

      // 2. Convert to WebP & Compress
      const { convertImage } = await import("@/lib/image-processor")

      const webpResult = await convertImage(fileToProcess, "image/webp", {
        quality: 0.85
      })

      setResult({
        blob: webpResult.blob,
        url: URL.createObjectURL(webpResult.blob),
        size: webpResult.size,
        width: webpResult.width,
        height: webpResult.height
      })

    } catch (err) {
      console.error("Optimization error:", err)
      setError(err instanceof Error ? err.message : "Failed to optimize image")
    } finally {
      setIsProcessing(false)
    }
  }, [file])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = file.name.replace(/\.[^/.]+$/, "") + ".webp"
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleReset = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

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

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={["image/jpeg", "image/png", "image/webp", "image/avif"]}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {!result ? (
                  <>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="flex items-center gap-2 font-medium">
                          <Code className="h-4 w-4" />
                          <span>Web Optimization Plan</span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                          <li>Convert to <b>WebP</b> (Next-Gen Format)</li>
                          <li>Optimize compression (Quality: 85%)</li>
                          <li>Generate responsive <code>&lt;img&gt;</code> tag</li>
                          <li>Strip metadata for smaller size</li>
                        </ul>
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={handleOptimize}
                      disabled={isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          Optimize for Web
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Original</p>
                          <p className="text-lg font-semibold">{formatFileSize(file.size)}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                        <div className="space-y-1 text-right">
                          <p className="text-sm font-medium text-muted-foreground">WebP Optimized</p>
                          <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>HTML Snippet</Label>
                          <Button variant="ghost" size="sm" className="h-8 gap-2" onClick={handleCopyCode}>
                            <Copy className="h-3.5 w-3.5" />
                            Copy Code
                          </Button>
                        </div>
                        <div className="relative">
                          <Textarea
                            readOnly
                            value={getEmbedCode()}
                            className="font-mono text-xs h-32 resize-none bg-muted/50"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button onClick={handleDownload} className="flex-1" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download WebP
                        </Button>
                        <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Process Another
                        </Button>
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
