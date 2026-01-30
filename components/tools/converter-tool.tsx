"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Download, RefreshCw, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { convertImage, downloadBlob, getOutputFilename, type ProcessingResult } from "@/lib/image-processor"
import { convertHeicToJpg } from "@/lib/heic-converter"

interface ConverterToolProps {
  acceptedTypes: string[]
  outputType: string
  showQuality?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ConverterTool({ acceptedTypes, outputType, showQuality = false }: ConverterToolProps) {
  const [file, setFile] = useState<File | null>(null)
  // Default to 98% quality for better results (was 92%)
  const [quality, setQuality] = useState(98)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

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

  const handleConvert = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      let processed: ProcessingResult

      // Handle HEIC conversion specially
      if (file.type === "image/heic" || file.type === "image/heif") {
        processed = await convertHeicToJpg(file, quality / 100)
      } else {
        processed = await convertImage(file, outputType, { quality: quality / 100 })
      }

      setResult(processed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, outputType, quality])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, outputType)
    downloadBlob(result.blob, filename)
  }, [result, file, outputType])

  const handleConvertAnother = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      {mounted && !prefersReducedMotion ? (
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ImageDropzone
                onImageSelect={handleImageSelect}
                acceptedTypes={acceptedTypes}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <ImagePreview file={file} onRemove={handleRemove} />

              {!result && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Card className="border-border/50 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {showQuality && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="quality" className="text-sm font-medium">Output Quality</Label>
                              <span className="text-sm font-semibold text-primary">{quality}%</span>
                            </div>
                            <Slider
                              id="quality"
                              min={10}
                              max={100}
                              step={5}
                              value={[quality]}
                              onValueChange={([value]) => setQuality(value)}
                              className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">
                              Higher quality means larger file size. 92%+ is recommended for best visual fidelity.
                            </p>
                          </div>
                        )}

                        {error && (
                          <motion.div
                            className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {error}
                          </motion.div>
                        )}

                        <Button
                          onClick={handleConvert}
                          disabled={isProcessing}
                          className="w-full shadow-lg shadow-primary/20 group"
                          size="lg"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Converting...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Convert to {outputType.split("/")[1].toUpperCase()}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-primary/30 shadow-xl shadow-primary/10 overflow-hidden">
                    <div className="h-1 bg-primary" />
                    <CardContent className="pt-6">
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 text-primary">
                          <motion.div
                            initial={prefersReducedMotion ? {} : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <CheckCircle className="h-6 w-6" />
                          </motion.div>
                          <span className="font-semibold text-lg">Conversion Complete!</span>
                        </div>

                        <div className="relative aspect-video bg-muted/50 rounded-xl overflow-hidden border border-border/50">
                          <img
                            src={result.url || "/placeholder.svg"}
                            alt="Converted"
                            className="w-full h-full object-contain"
                            style={{ imageRendering: 'high-quality' }}
                            loading="eager"
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                            <span className="text-muted-foreground">Format:</span>{" "}
                            <span className="font-semibold text-foreground">{outputType.split("/")[1].toUpperCase()}</span>
                          </div>
                          <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                            <span className="text-muted-foreground">Size:</span>{" "}
                            <span className="font-semibold text-foreground">{formatFileSize(result.size)}</span>
                          </div>
                          <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                            <span className="text-muted-foreground">Dimensions:</span>{" "}
                            <span className="font-semibold text-foreground">{result.width} x {result.height}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button onClick={handleDownload} className="flex-1 shadow-lg shadow-primary/20" size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download {outputType.split("/")[1].toUpperCase()}
                          </Button>
                          <Button onClick={handleConvertAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Convert Another
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <>
          {!file ? (
            <ImageDropzone
              onImageSelect={handleImageSelect}
              acceptedTypes={acceptedTypes}
            />
          ) : (
            <div className="space-y-6">
              <ImagePreview file={file} onRemove={handleRemove} />

              {!result && (
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {showQuality && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="quality" className="text-sm font-medium">Output Quality</Label>
                            <span className="text-sm font-semibold text-primary">{quality}%</span>
                          </div>
                          <Slider
                            id="quality"
                            min={10}
                            max={100}
                            step={5}
                            value={[quality]}
                            onValueChange={([value]) => setQuality(value)}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            Higher quality means larger file size. 92%+ is recommended for best visual fidelity.
                          </p>
                        </div>
                      )}

                      {error && (
                        <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                          {error}
                        </div>
                      )}

                      <Button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="w-full shadow-lg shadow-primary/20 group"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Convert to {outputType.split("/")[1].toUpperCase()}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result && (
                <Card className="border-primary/30 shadow-xl shadow-primary/10 overflow-hidden">
                  <div className="h-1 bg-primary" />
                  <CardContent className="pt-6">
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="h-6 w-6" />
                        <span className="font-semibold text-lg">Conversion Complete!</span>
                      </div>

                      <div className="relative aspect-video bg-muted/50 rounded-xl overflow-hidden border border-border/50">
                        <img
                          src={result.url || "/placeholder.svg"}
                          alt="Converted"
                          className="w-full h-full object-contain"
                          style={{ imageRendering: 'high-quality' }}
                          loading="eager"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                          <span className="text-muted-foreground">Format:</span>{" "}
                          <span className="font-semibold text-foreground">{outputType.split("/")[1].toUpperCase()}</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                          <span className="text-muted-foreground">Size:</span>{" "}
                          <span className="font-semibold text-foreground">{formatFileSize(result.size)}</span>
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">
                          <span className="text-muted-foreground">Dimensions:</span>{" "}
                          <span className="font-semibold text-foreground">{result.width} x {result.height}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button onClick={handleDownload} className="flex-1 shadow-lg shadow-primary/20" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download {outputType.split("/")[1].toUpperCase()}
                        </Button>
                        <Button onClick={handleConvertAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Convert Another
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
