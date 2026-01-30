"use client"

import { useState, useCallback, useEffect } from "react"
import { ToolContentLayout } from "./shared/tool-content-layout"
import { CanvasPreview } from "./canvas-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, CheckCircle, AlertTriangle, MapPin, Calendar, Camera, FileType } from "lucide-react"
import { removeExif, downloadBlob, getOutputFilename, ProcessingResult } from "@/lib/image-processor"
import { Badge } from "@/components/ui/badge"

interface ExifRemoverToolProps {
  acceptedTypes?: string[]
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

export function ExifRemoverTool({ acceptedTypes = ["image/jpeg", "image/png", "image/webp"] }: ExifRemoverToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [exifData, setExifData] = useState<ExifData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
    setExifData(null)
    setResult(null)
    setError(null)
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setExifData(null)
    setResult(null)
    setError(null)
  }, [])

  // Auto-process when file is selected
  useEffect(() => {
    if (!file) return

    const process = async () => {
      setIsProcessing(true)
      setError(null)

      try {
        // Run detection and removal in parallel
        const [detected, processed] = await Promise.all([
          detectExifData(file),
          removeExif(file)
        ])
        
        setExifData(detected)
        setResult(processed)
      } catch (err) {
        console.error("Processing error:", err)
        setError(err instanceof Error ? err.message : "Failed to process image")
      } finally {
        setIsProcessing(false)
      }
    }

    process()
  }, [file])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const filename = getOutputFilename(file.name, file.type)
    downloadBlob(result.blob, filename)
  }, [result, file])

  const previewContent = (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-muted/20">
      {isProcessing ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Removing metadata...</p>
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
          <span className="text-sm font-medium">Metadata Status</span>
          {result ? (
             <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
               Cleaned
             </Badge>
          ) : (
             <Badge variant="secondary">Analyzing</Badge>
          )}
        </div>
        
        {exifData ? (
          <div className="space-y-3">
             <p className="text-sm font-medium text-muted-foreground">Detected & Removed:</p>
             <div className="grid grid-cols-2 gap-3">
               <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasLocation ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground opacity-50'}`}>
                 <MapPin className="h-4 w-4" />
                 <span className="text-sm">GPS</span>
               </div>
               <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasDateTime ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground opacity-50'}`}>
                 <Calendar className="h-4 w-4" />
                 <span className="text-sm">Date</span>
               </div>
               <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasCamera ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground opacity-50'}`}>
                 <Camera className="h-4 w-4" />
                 <span className="text-sm">Camera</span>
               </div>
               <div className={`flex items-center gap-2 p-3 rounded-lg ${exifData.hasSoftware ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground opacity-50'}`}>
                 <FileType className="h-4 w-4" />
                 <span className="text-sm">Software</span>
               </div>
             </div>
             
             {exifData.details.length > 0 && (
                <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1">
                    {exifData.details.slice(0, 3).map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
             )}
          </div>
        ) : null}
      </div>

      {result && (
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-200/50">
           <div className="flex items-start gap-3">
             <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
             <div className="space-y-1">
               <p className="font-medium text-green-700">Metadata Removed Successfully</p>
               <p className="text-sm text-green-600/80">
                 The image has been re-encoded and all EXIF data (location, camera info, timestamps) has been stripped.
               </p>
             </div>
           </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-destructive text-sm">
           {error}
        </div>
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
          Processing...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Clean Image
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
      acceptedTypes={acceptedTypes}
    />
  )
}
