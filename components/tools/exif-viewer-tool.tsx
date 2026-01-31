"use client"

import { useState, useCallback } from "react"
import exifr from "exifr"
import { ToolContentLayout } from "./shared/tool-content-layout"
import { ImageDropzone } from "@/components/image-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, MapPin, Camera, Image as ImageIcon, Settings, Info, AlertTriangle, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { trackFileUpload } from "@/lib/analytics"

interface ExifViewerToolProps {
  toolName?: string
}

type ExifGroup = {
  title: string
  icon: React.ReactNode
  data: Record<string, any>
}

export function ExifViewerTool({ toolName = "EXIF Viewer" }: ExifViewerToolProps) {
  const [file, setFile] = useState<File | null>(null)
  const [exifData, setExifData] = useState<Record<string, any> | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setIsProcessing(true)
    setError(null)
    setExifData(null)
    trackFileUpload(toolName, selectedFile.type, selectedFile.size / 1024)

    try {
      // Parse all available data
      // We explicitly ask for XMP, IPTC, ICC to be thorough
      const output = await exifr.parse(selectedFile, {
        tiff: true,
        xmp: true,
        icc: true,
        iptc: true,
        jfif: true,
        exif: true,
        gps: true,
        mergeOutput: true,
      })

      if (!output || Object.keys(output).length === 0) {
        setError("No EXIF metadata found in this image.")
      } else {
        setExifData(output)
      }
    } catch (err) {
      console.error("EXIF parsing error:", err)
      setError("Could not parse metadata from this file. It might be corrupted or in an unsupported format.")
    } finally {
      setIsProcessing(false)
    }
  }, [toolName])

  const handleRemove = useCallback(() => {
    setFile(null)
    setExifData(null)
    setError(null)
  }, [])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`Copied ${label} to clipboard`)
  }

  const copyAllData = () => {
    if (!exifData) return
    navigator.clipboard.writeText(JSON.stringify(exifData, null, 2))
    toast.success("Copied all JSON data to clipboard")
  }

  // Helper to format values
  const formatValue = (value: any): string => {
    if (value instanceof Date) return value.toLocaleString()
    if (typeof value === "number") return value.toString()
    if (Array.isArray(value)) return value.join(", ")
    if (typeof value === "object") return JSON.stringify(value)
    return String(value)
  }

  // Group data for better UX
  const getGroupedData = (): ExifGroup[] => {
    if (!exifData) return []

    const groups: ExifGroup[] = [
      {
        title: "Camera & Lens",
        icon: <Camera className="h-4 w-4" />,
        data: {}
      },
      {
        title: "Photo Settings",
        icon: <Settings className="h-4 w-4" />,
        data: {}
      },
      {
        title: "Location (GPS)",
        icon: <MapPin className="h-4 w-4" />,
        data: {}
      },
      {
        title: "File & Software",
        icon: <ImageIcon className="h-4 w-4" />,
        data: {}
      }
    ]

    // Mapping keys to groups
    Object.entries(exifData).forEach(([key, value]) => {
      // Camera
      if (["Make", "Model", "LensModel", "LensMake", "BodySerialNumber", "LensSerialNumber"].includes(key)) {
        groups[0].data[key] = value
      }
      // Settings
      else if (["ISO", "FNumber", "ExposureTime", "ShutterSpeedValue", "ApertureValue", "FocalLength", "Flash", "WhiteBalance", "ExposureProgram", "MeteringMode"].includes(key)) {
        groups[1].data[key] = value
      }
      // GPS
      else if (key.startsWith("GPS") || key === "latitude" || key === "longitude") {
        groups[2].data[key] = value
      }
      // File/Software
      else if (["Software", "ModifyDate", "DateTimeOriginal", "CreateDate", "Orientation", "ExifImageWidth", "ExifImageHeight", "ColorSpace", "MIMEType"].includes(key)) {
        groups[3].data[key] = value
      }
      // Everything else goes to "Other" or stays in raw view
    })

    return groups.filter(g => Object.keys(g.data).length > 0)
  }

  const groupedData = getGroupedData()
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"]

  const preview = file ? (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-black/5 p-4 rounded-lg">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="max-w-full max-h-[600px] object-contain shadow-lg rounded-md"
      />
    </div>
  ) : null

  const controls = (
    <div className="space-y-6">
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {exifData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Metadata Results
            </h3>
            <Button variant="outline" size="sm" onClick={copyAllData} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy JSON
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {groupedData.map((group) => (
              <Card key={group.title} className="overflow-hidden">
                <CardHeader className="bg-muted/40 py-3 px-4 flex flex-row items-center gap-2">
                  <div className="p-1.5 bg-background rounded-md shadow-sm text-primary">
                    {group.icon}
                  </div>
                  <CardTitle className="text-base font-medium">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {Object.entries(group.data).map(([key, value]) => (
                        <TableRow key={key} className="hover:bg-muted/5">
                          <TableCell className="font-medium text-muted-foreground w-1/3 text-xs uppercase tracking-wide py-2">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </TableCell>
                          <TableCell className="py-2 font-mono text-sm break-all">
                            {formatValue(value)}
                          </TableCell>
                          <TableCell className="w-[40px] py-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyToClipboard(formatValue(value), key)}
                            >
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Raw Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-md p-4 overflow-x-auto max-h-[300px] text-xs font-mono">
                <pre>{JSON.stringify(exifData, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )

  const customDropzone = (
    <div className="space-y-8">
      <ImageDropzone
        onImageSelect={handleImageSelect}
        acceptedTypes={acceptedTypes}
      />
      <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
        <ShieldCheck className="h-10 w-10 mb-4 text-primary/60" />
        <h3 className="text-lg font-medium text-foreground mb-2">Privacy First</h3>
        <p className="max-w-md text-sm">
          Your photos are processed locally in your browser. We never upload your images to any server, ensuring your metadata stays private.
        </p>
      </div>
    </div>
  )

  return (
    <ToolContentLayout
      file={file}
      onImageSelect={handleImageSelect}
      onRemove={handleRemove}
      acceptedTypes={acceptedTypes}
      preview={preview}
      controls={controls}
      dropzone={customDropzone}
    />
  )
}
