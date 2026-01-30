"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Layers, Trash2 } from "lucide-react"
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
    const newFiles = selectedFiles.map(f => ({
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
            const compressed = await compressImage(item.originalFile, { quality: 0.8 })
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
    <div className="space-y-6">
      {files.length === 0 ? (
        <ImageDropzone
          onImageSelect={(f) => handleFilesSelect(Array.isArray(f) ? f : [f])}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
          multiple={true}
        />
      ) : (
        <Card className="border-border/50 shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Batch Queue ({files.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Total Size: {formatFileSize(totalOriginalSize)}
                  </p>
                </div>
                {isDone && (
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                      Saved {formatFileSize(totalSaved)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* File List */}
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm border border-border/50">
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
                          {file.newSize > 0 && ` → ${formatFileSize(file.newSize)}`}
                        </p>
                      </div>
                    </div>
                    
                    {!isProcessing && file.status === "pending" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleRemove(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Processing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {!isDone && !isProcessing && (
                  <Button onClick={handleCompressAll} className="flex-1" size="lg">
                    Compress All Images
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {zipBlob && (
                  <Button onClick={handleDownloadZip} className="flex-1" size="lg" variant="default">
                    <Download className="mr-2 h-4 w-4" />
                    Download ZIP
                  </Button>
                )}

                {(!isProcessing || isDone) && (
                  <Button onClick={handleReset} variant="outline" className={isDone ? "flex-1" : ""} size="lg">
                    <RefreshCw className={isDone ? "mr-2 h-4 w-4" : "h-4 w-4"} />
                    {isDone ? "Start New Batch" : ""}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
