"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Download, Copy, Trash2, FileImage, FileCode, Check } from "lucide-react"
import { ImageDropzone } from "@/components/image-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fileToBase64, base64ToBlob, getMimeTypeFromBase64 } from "@/lib/base64-utils"
import { useToast } from "@/hooks/use-toast"
import { trackFileUpload, trackConvertStart, trackConvertComplete, trackDownloadClick } from "@/lib/analytics"

import { ToolContentLayout } from "@/components/tools/shared/tool-content-layout"

export function Base64Tool({ toolName = "Base64 Tool" }: { toolName?: string }) {
  const [activeTab, setActiveTab] = useState("encode")
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  // Encoder State
  const [encodeFile, setEncodeFile] = useState<File | null>(null)
  const [encodeResult, setEncodeResult] = useState<string>("")
  const [isEncoding, setIsEncoding] = useState(false)

  // Decoder State
  const [decodeInput, setDecodeInput] = useState("")
  const [decodeResult, setDecodeResult] = useState<{ url: string; blob: Blob; mime: string } | null>(null)
  const [isDecoding, setIsDecoding] = useState(false)
  const [decodeError, setDecodeError] = useState<string | null>(null)

  // Encode Handlers
  const handleEncodeFileSelect = useCallback(async (file: File) => {
    setEncodeFile(file)
    setIsEncoding(true)
    try {
      const base64 = await fileToBase64(file)
      setEncodeResult(base64)
    } catch (error) {
      console.error(error)
      toast({
        title: "Encoding Failed",
        description: "Could not encode the file.",
        variant: "destructive"
      })
    } finally {
      setIsEncoding(false)
    }
  }, [toast])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(encodeResult)
    toast({
      title: "Copied!",
      description: "Base64 string copied to clipboard.",
    })
  }, [encodeResult, toast])

  const handleClearEncode = useCallback(() => {
    setEncodeFile(null)
    setEncodeResult("")
  }, [])

  // Decode Handlers
  const handleDecode = useCallback(() => {
    if (!decodeInput.trim()) return

    setIsDecoding(true)
    setDecodeError(null)
    setDecodeResult(null)
    const startTime = Date.now()
    trackConvertStart(toolName, "base64-decode", `${decodeInput.length} chars`)

    try {
      const blob = base64ToBlob(decodeInput)
      const mime = getMimeTypeFromBase64(decodeInput) || blob.type || "image/png" // Fallback
      const url = URL.createObjectURL(blob)
      setDecodeResult({ url, blob, mime })
      trackConvertComplete(toolName, Date.now() - startTime, blob.size / 1024, true)
    } catch (error) {
      console.error(error)
      const errorMessage = "Invalid Base64 string"
      trackConvertComplete(toolName, Date.now() - startTime, 0, false, errorMessage)
      setDecodeError("Invalid Base64 string. Please check the input.")
    } finally {
      setIsDecoding(false)
    }
  }, [decodeInput, toolName])

  const handleDownloadDecoded = useCallback(() => {
    if (!decodeResult) return
    const ext = decodeResult.mime.split("/")[1] || "png"
    const a = document.createElement("a")
    a.href = decodeResult.url
    a.download = `decoded-image.${ext}`
    trackDownloadClick(toolName, "base64-image", decodeResult.blob.size / 1024)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [decodeResult, toolName])

  const handleClearDecode = useCallback(() => {
    setDecodeResult(null)
    setDecodeInput("")
    setDecodeError(null)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="encode" className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Image to Base64
          </TabsTrigger>
          <TabsTrigger value="decode" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Base64 to Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-6 focus-visible:outline-none">
          <ToolContentLayout
            file={encodeFile}
            onImageSelect={handleEncodeFileSelect}
            onRemove={handleClearEncode}
            acceptedTypes={["image/png", "image/jpeg", "image/webp", "image/svg+xml"]}
            preview={
              encodeResult && (
                <div className="relative w-full h-full flex items-center justify-center bg-transparent">
                  <img src={encodeResult} className="max-w-full max-h-full object-contain" alt="Preview" />
                </div>
              )
            }
            controls={
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Base64 Output</span>
                  <span className="text-xs text-muted-foreground">{encodeResult.length.toLocaleString()} chars</span>
                </div>
                <Textarea
                  readOnly
                  value={encodeResult}
                  className="font-mono text-xs h-64 resize-none bg-muted/50"
                />
              </div>
            }
            actions={
              <Button onClick={handleCopy} className="w-full" size="lg">
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            }
          />
        </TabsContent>

        <TabsContent value="decode" className="space-y-6 focus-visible:outline-none">
          <ToolContentLayout
            file={decodeResult ? new File([], "decoded") : null}
            onImageSelect={() => { }}
            onRemove={handleClearDecode}
            dropzone={
              <div className="w-full max-w-2xl mx-auto space-y-6 p-8 border-2 border-dashed border-border rounded-xl bg-muted/10 text-center">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <FileCode className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Paste Base64 String</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste your Base64 string below to decode it into an image.
                  </p>
                  <Textarea
                    placeholder="data:image/png;base64,..."
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    className="font-mono text-xs h-48 resize-none bg-background"
                  />
                  {decodeError && (
                    <Alert variant="destructive" className="text-left">
                      <AlertDescription>{decodeError}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    onClick={handleDecode}
                    disabled={!decodeInput || isDecoding}
                    className="w-full"
                    size="lg"
                  >
                    {isDecoding ? <Loader2 className="animate-spin h-4 w-4" /> : "Decode Image"}
                  </Button>
                </div>
              </div>
            }
            preview={
              decodeResult && (
                <div className="relative w-full h-full flex items-center justify-center bg-transparent">
                  <img src={decodeResult.url} className="max-w-full max-h-full object-contain" alt="Decoded" />
                </div>
              )
            }
            controls={
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Format</span>
                    <span className="font-medium">{decodeResult?.mime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Size</span>
                    <span className="font-medium">{(decodeResult?.blob.size ? decodeResult.blob.size / 1024 : 0).toFixed(1)} KB</span>
                  </div>
                </div>
              </div>
            }
            actions={
              <Button onClick={handleDownloadDecoded} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
