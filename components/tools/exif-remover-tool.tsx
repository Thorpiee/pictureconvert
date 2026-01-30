"use client"

import { useState, useCallback, useEffect } from "react"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, CheckCircle, AlertTriangle, MapPin, Calendar, Camera, FileType } from "lucide-react"
import { removeExif, downloadBlob, getOutputFilename, ProcessingResult } from "@/lib/image-processor"

interface ExifRemoverToolProps {
  acceptedTypes: string[]
}

interface ExifData {
  hasLocation: boolean
  hasDateTime: boolean
  hasCamera: boolean
  hasSoftware: boolean
  details: string[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// Simple EXIF detection (not full parsing, just indicates presence)
async function detectExifData(file: File): Promise<ExifData> {
  const details: string[] = []
  let hasLocation = false
  let hasDateTime = false
  let hasCamera = false
  let hasSoftware = false

  // Read file as array buffer
  const buffer = await file.arrayBuffer()
  const view = new DataView(buffer)

  // Check for EXIF in JPEG
  if (file.type === "image/jpeg" && view.getUint16(0) === 0xFFD8) {
    let offset = 2
    while (offset < view.byteLength - 2) {
      const marker = view.getUint16(offset)
      if (marker === 0xFFE1) { // APP1 marker (EXIF)
        // Found EXIF data
        hasDateTime = true
        hasCamera = true
        details.push("EXIF metadata detected")
        details.push("Date/Time information likely present")
        details.push("Camera information likely present")
        
        // Check for GPS data (simplified check)
        const segment = new Uint8Array(buffer, offset, Math.min(1000, buffer.byteLength - offset))
        const segmentStr = String.fromCharCode(...segment)
        if (segmentStr.includes("GPS")) {
          hasLocation = true
          details.push("GPS location data detected")
        }
        break
      }
      if ((marker & 0xFF00) !== 0xFF00) break
      offset += 2 + view.getUint16(offset + 2)
    }
  }

  // For PNG, check for tEXt chunks
  if (file.type === "image/png") {
    const header = new Uint8Array(buffer, 0, 8)
    const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10]
    const isPng = pngSignature.every((byte, i) => header[i] === byte)
    
    if (isPng) {
      details.push("PNG file - may contain metadata in tEXt chunks")
      hasDateTime = true
      hasSoftware = true
    }
  }

  // Generic detection based on file characteristics
  if (details.length === 0) {
    details.push("Standard image metadata may be present")
    details.push("Re-encoding will remove embedded metadata")
  }

  return { hasLocation, hasDateTime, hasCamera, hasSoftware, details }
}

export function ExifRemoverTool({ acceptedTypes }: ExifRemoverToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [exifData, setExifData] = useState<ExifData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)
    setIsAnalyzing(true)

    try {
      const detected = await detectExifData(selectedFile)
      setExifData(detected)
    } catch {
      setExifData(null)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setExifData(null)
    setResult(null)
    setError(null)
  }, [])

  const handleRemoveExif = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const processed = await removeExif(file)
      setResult(processed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove EXIF data")
    } finally {
      setIsProcessing(false)
    }
  }, [file])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const handleRemoveAnother = useCallback(() => {
    setFile(null)
    setExifData(null)
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={acceptedTypes}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          {!result && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Detected Metadata</h3>
                    
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing file...
                      </div>
                    ) : exifData ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasLocation ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">GPS Location</span>
                            {exifData.hasLocation && <AlertTriangle className="h-4 w-4 ml-auto" />}
                          </div>
                          <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasDateTime ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Date/Time</span>
                          </div>
                          <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasCamera ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                            <Camera className="h-4 w-4" />
                            <span className="text-sm">Camera Info</span>
                          </div>
                          <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasSoftware ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                            <FileType className="h-4 w-4" />
                            <span className="text-sm">Software</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-sm font-medium text-foreground mb-2">Details:</p>
                          <ul className="space-y-1">
                            {exifData.details.map((detail, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Could not analyze metadata. The file will still be processed.
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-primary/10 text-primary text-sm">
                    Removing EXIF data will re-encode your image, stripping all metadata including location, camera info, and timestamps.
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleRemoveExif}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing Metadata...
                      </>
                    ) : (
                      "Remove EXIF & Download"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="border-primary/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Metadata Removed!</span>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/10 text-primary text-sm">
                    All EXIF metadata has been stripped from your image. The image has been re-encoded to ensure no metadata remains.
                  </div>

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={result.url || "/placeholder.svg"}
                      alt="Cleaned"
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'high-quality' }}
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size:</span>{" "}
                      <span className="font-medium text-foreground">{formatFileSize(result.size)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dimensions:</span>{" "}
                      <span className="font-medium text-foreground">{result.width} x {result.height}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleDownload} className="flex-1" size="lg">
                      <Download className="mr-2 h-4 w-4" />
                      Download Clean Image
                    </Button>
                    <Button onClick={handleRemoveAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Process Another
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
