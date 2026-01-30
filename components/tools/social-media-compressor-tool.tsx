"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Download, RefreshCw, Info, ArrowRight, Instagram, Linkedin, Twitter, Check } from "lucide-react"
import { downloadBlob, compressImage, resizeImage } from "@/lib/image-processor"
import { ImageDropzone } from "@/components/image-dropzone"
import { ImagePreview } from "@/components/image-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type Platform = "instagram" | "twitter" | "linkedin"

interface Preset {
  id: string
  name: string
  width: number
  height: number
  quality: number
  description: string
}

const PRESETS: Record<Platform, Preset[]> = {
  instagram: [
    { id: "ig-square", name: "Square Post", width: 1080, height: 1080, quality: 0.9, description: "Standard 1:1 post (1080x1080)" },
    { id: "ig-portrait", name: "Portrait Post", width: 1080, height: 1350, quality: 0.9, description: "Vertical 4:5 post (1080x1350)" },
    { id: "ig-landscape", name: "Landscape Post", width: 1080, height: 608, quality: 0.9, description: "Horizontal 1.91:1 post (1080x608)" },
    { id: "ig-story", name: "Story / Reel", width: 1080, height: 1920, quality: 0.85, description: "Full screen 9:16 (1080x1920)" },
  ],
  twitter: [
    { id: "tw-post", name: "In-Stream Photo", width: 1600, height: 900, quality: 0.85, description: "Optimal 16:9 for timeline (1600x900)" },
    { id: "tw-header", name: "Header Photo", width: 1500, height: 500, quality: 0.85, description: "Profile header banner (1500x500)" },
    { id: "tw-profile", name: "Profile Picture", width: 400, height: 400, quality: 0.9, description: "Square profile photo (400x400)" },
  ],
  linkedin: [
    { id: "li-post", name: "Shared Image", width: 1200, height: 627, quality: 0.85, description: "Standard post image (1200x627)" },
    { id: "li-article", name: "Article Cover", width: 1200, height: 644, quality: 0.85, description: "Cover for articles (1200x644)" },
    { id: "li-profile", name: "Profile Photo", width: 400, height: 400, quality: 0.9, description: "Professional profile shot (400x400)" },
  ]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function SocialMediaCompressorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [platform, setPlatform] = useState<Platform>("instagram")
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS.instagram[0].id)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ blob: Blob; url: string; size: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

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

  const handleProcess = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const preset = PRESETS[platform].find(p => p.id === selectedPresetId)
      if (!preset) throw new Error("Invalid preset selected")

      // 1. Resize
      const resized = await resizeImage(file, {
        width: preset.width,
        height: preset.height,
        maintainAspectRatio: false // Force dimensions for platform compliance? Or should we use contain?
        // User request says "Auto resize to platform limits". Usually this means "fit within" or "crop to".
        // For simplicity and safety, we'll use resize.
        // Ideally we should crop, but that requires UI.
        // Let's assume we want to fit within the box for now, or maybe fill?
        // "Auto resize to platform limits" -> Let's try to maintain aspect ratio if possible, 
        // but for specific social media slots (like headers), exact dimensions are often needed.
        // Let's use strict resizing for now as it guarantees the output size.
      })

      // 2. Compress
      const compressed = await compressImage(new File([resized.blob], file.name, { type: resized.blob.type }), {
        quality: preset.quality
      })

      setResult({
        blob: compressed.blob,
        url: URL.createObjectURL(compressed.blob),
        size: compressed.size
      })

    } catch (err) {
      console.error("Processing error:", err)
      setError(err instanceof Error ? err.message : "Failed to process image")
    } finally {
      setIsProcessing(false)
    }
  }, [file, platform, selectedPresetId])

  const handleDownload = useCallback(() => {
    if (!result || !file) return
    const preset = PRESETS[platform].find(p => p.id === selectedPresetId)
    const suffix = preset ? `-${platform}-${preset.name.toLowerCase().replace(/\s+/g, '-')}` : '-social'
    const filename = file.name.replace(/\.[^/.]+$/, "") + suffix + ".jpg"
    downloadBlob(result.blob, filename)
  }, [result, file, platform, selectedPresetId])

  const handleReset = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  if (!mounted) return null

  const selectedPreset = PRESETS[platform].find(p => p.id === selectedPresetId)

  return (
    <div className="space-y-6">
      {!file ? (
        <ImageDropzone
          onImageSelect={handleImageSelect}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
        />
      ) : (
        <>
          <ImagePreview file={file} onRemove={handleRemove} />

          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {!result ? (
                  <>
                    <Tabs value={platform} onValueChange={(v) => {
                      setPlatform(v as Platform)
                      setSelectedPresetId(PRESETS[v as Platform][0].id)
                    }} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="instagram" className="flex items-center gap-2">
                          <Instagram className="h-4 w-4" /> Instagram
                        </TabsTrigger>
                        <TabsTrigger value="twitter" className="flex items-center gap-2">
                          <Twitter className="h-4 w-4" /> Twitter / X
                        </TabsTrigger>
                        <TabsTrigger value="linkedin" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" /> LinkedIn
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PRESETS[platform].map((preset) => (
                          <div
                            key={preset.id}
                            className={`
                              cursor-pointer rounded-lg border p-4 transition-all hover:bg-muted/50
                              ${selectedPresetId === preset.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"}
                            `}
                            onClick={() => setSelectedPresetId(preset.id)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{preset.name}</span>
                              {selectedPresetId === preset.id && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>{preset.width} × {preset.height} px</p>
                              <p className="opacity-80">{preset.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tabs>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Optimize for {selectedPreset?.name}
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
                          <p className="text-sm font-medium text-muted-foreground">Optimized</p>
                          <p className="text-lg font-semibold text-primary">{formatFileSize(result.size)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2 text-sm">
                        <span className="text-muted-foreground">
                          Dimensions: {selectedPreset?.width} × {selectedPreset?.height}
                        </span>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                          {Math.round((1 - result.size / file.size) * 100)}% Smaller
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button onClick={handleDownload} className="flex-1" size="lg">
                          <Download className="mr-2 h-4 w-4" />
                          Download JPG
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
