"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Layers, Trash2, Check } from "lucide-react"
import { compressImage } from "@/lib/image-processor"
import { ImageDropzone } from "@/components/image-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import JSZip from "jszip"

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

interface ProcessedFile {
  originalFile: File
  blob: Blob
  status: "pending" | "processing" | "done" | "error"
  originalSize: number
  newSize: number
  error?: string
}

import { ToolContentLayout } from "./shared/tool-content-layout"

export function BulkCompressorTool() {
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [zipBlob, setZipBlob] = useState<Blob | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    // Handle both single File and File[] inputs
    const fileArray = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles]

    const newFiles = fileArray.map(f => ({
      originalFile: f,
      blob: new Blob(),
      status: "pending" as const,
      originalSize: f.size,
      newSize: 0
    }))
    // Limit to 30
    if (newFiles.length > 30) {
      alert("Please select up to 30 images at a time.")
      setFiles(newFiles.slice(0, 30))
    } else {
      setFiles(newFiles)
    }
    setZipBlob(null)
    setProgress(0)
  }, [])

  const handleRemove = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setZipBlob(null)
  }, [])

  const handleCompressAll = useCallback(async () => {
    setIsProcessing(true)
    setProgress(0)

    const results = [...files]
    let completed = 0

    // Process in batches of 3 to avoid freezing UI
    const batchSize = 3

    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize).map((item, batchIndex) => {
        const globalIndex = i + batchIndex
        return (async () => {
          results[globalIndex].status = "processing"
          setFiles([...results]) // Update UI

          try {
            const compressed = await compressImage(item.originalFile, {
              quality: 0.8,
              skipQualityCheck: true
            })
            results[globalIndex].blob = compressed.blob
            results[globalIndex].newSize = compressed.size
            results[globalIndex].status = "done"
          } catch (err) {
            console.error(err)
            results[globalIndex].status = "error"
            results[globalIndex].error = "Failed"
          } finally {
            completed++
            setProgress((completed / results.length) * 100)
            setFiles([...results]) // Update UI
          }
        })()
      })

      await Promise.all(batch)
    }

    // Generate ZIP
    if (results.some(r => r.status === "done")) {
      const zip = new JSZip()
      results.forEach(r => {
        if (r.status === "done") {
          zip.file(`optimized-${r.originalFile.name}`, r.blob)
        }
      })

      const content = await zip.generateAsync({ type: "blob" })
      setZipBlob(content)
    }

    setIsProcessing(false)
  }, [files])

  const handleDownloadZip = useCallback(() => {
    if (!zipBlob) return
    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = "optimized-images.zip"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [zipBlob])

  const handleReset = useCallback(() => {
    setFiles([])
    setZipBlob(null)
    setProgress(0)
  }, [])

  if (!mounted) return null

  const totalOriginalSize = files.reduce((acc, curr) => acc + curr.originalSize, 0)
  const totalNewSize = files.reduce((acc, curr) => acc + (curr.newSize || curr.originalSize), 0)
  const totalSaved = totalOriginalSize - totalNewSize
  const isDone = files.length > 0 && files.every(f => f.status === "done" || f.status === "error")

  return (
    <ToolContentLayout
      file={files.length > 0 ? new File([], "dummy") : null}
      onImageSelect={(f) => handleFilesSelect(Array.isArray(f) ? f : [f])}
      onRemove={handleReset}
      dropzone={
        <ImageDropzone
          onImageSelect={(f) => handleFilesSelect(Array.isArray(f) ? f : [f])}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
          multiple={true}
        />
      }
      preview={
        <div className="w-full h-full overflow-y-auto custom-scrollbar p-4 space-y-2 max-h-[500px]">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-background/80 backdrop-blur-sm rounded-lg text-sm border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                  {file.status === "processing" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : file.status === "done" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <span className="text-xs text-muted-foreground">IMG</span>
                  )}
                </div>
                <div className="truncate">
                  <p className="truncate font-medium">{file.originalFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.originalSize)}
                    {file.newSize > 0 && (
                      <>
                        {" -> "}
                        <span className="text-green-600 font-medium">{formatFileSize(file.newSize)}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(idx)}
                disabled={isProcessing}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      }
      controls={
        <Card className="h-full">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Batch Summary
              </h3>
              <Badge variant="secondary">{files.length} files</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Size:</span>
                <span>{formatFileSize(totalOriginalSize)}</span>
              </div>
              {totalSaved > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Saved:</span>
                  <span>{formatFileSize(totalSaved)} ({(totalSaved / totalOriginalSize * 100).toFixed(0)}%)</span>
                </div>
              )}
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Processing...</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      }
      actions={
        <div className="space-y-4">
          {!isDone ? (
            <Button
              onClick={handleCompressAll}
              disabled={isProcessing || files.length === 0}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                <>
                  Compress All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleDownloadZip}
              disabled={!zipBlob}
              className="w-full"
              size="lg"
              variant="default"
            >
              <Download className="mr-2 h-4 w-4" />
              Download ZIP
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isProcessing}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>

          {files.some(f => f.status === "error") && (
            <Alert variant="destructive">
              <AlertDescription>
                Some files failed to process.
              </AlertDescription>
            </Alert>
          )}
        </div>
      }
    />
  )
}
