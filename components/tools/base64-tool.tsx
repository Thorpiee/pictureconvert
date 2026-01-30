"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Download, Copy, Trash2, FileImage, FileCode, Check } from "lucide-react"
import { ImageDropzone } from "@/components/image-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fileToBase64, base64ToBlob, getMimeTypeFromBase64 } from "@/lib/base64-utils"
import { useToast } from "@/hooks/use-toast"

export function Base64Tool() {
  const [activeTab, setActiveTab] = useState("encode")
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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

    try {
      const blob = base64ToBlob(decodeInput)
      const mime = getMimeTypeFromBase64(decodeInput) || blob.type || "image/png" // Fallback
      const url = URL.createObjectURL(blob)
      setDecodeResult({ url, blob, mime })
    } catch (error) {
      console.error(error)
      setDecodeError("Invalid Base64 string. Please check the input.")
    } finally {
      setIsDecoding(false)
    }
  }, [decodeInput])

  const handleDownloadDecoded = useCallback(() => {
    if (!decodeResult) return
    const ext = decodeResult.mime.split("/")[1] || "png"
    const a = document.createElement("a")
    a.href = decodeResult.url
    a.download = `decoded-image.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [decodeResult])

  return (
    <Card className="border-border/50 shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode" className="flex items-center gap-2">
              <FileImage className="h-4 w-4" />
              Image to Base64
            </TabsTrigger>
            <TabsTrigger value="decode" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Base64 to Image
            </TabsTrigger>
          </TabsList>

          {/* ENCODER */}
          <TabsContent value="encode" className="space-y-6">
            {!encodeFile ? (
              <ImageDropzone
                onImageSelect={handleEncodeFileSelect}
                acceptedTypes={["image/png", "image/jpeg", "image/webp", "image/svg+xml"]}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                      {/* Try to show preview if possible */}
                      {encodeResult && <img src={encodeResult} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{encodeFile.name}</p>
                      <p className="text-xs text-muted-foreground">{Math.round(encodeFile.size / 1024)} KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleClearEncode}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base64 Output</span>
                    <span className="text-xs text-muted-foreground">{encodeResult.length.toLocaleString()} chars</span>
                  </div>
                  <Textarea
                    readOnly
                    value={encodeResult}
                    className="font-mono text-xs h-48 resize-none bg-muted/50"
                  />
                </div>

                <Button onClick={handleCopy} className="w-full" size="lg">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </TabsContent>

          {/* DECODER */}
          <TabsContent value="decode" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Paste Base64 String</span>
                <Textarea
                  placeholder="data:image/png;base64,..."
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  className="font-mono text-xs h-32 resize-none bg-muted/50"
                />
              </div>

              {decodeError && (
                <Alert variant="destructive">
                  <AlertDescription>{decodeError}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleDecode}
                disabled={!decodeInput || isDecoding}
                className="w-full"
              >
                {isDecoding ? <Loader2 className="animate-spin h-4 w-4" /> : "Decode Image"}
              </Button>

              {decodeResult && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border flex items-center justify-center">
                    <img
                      src={decodeResult.url}
                      alt="Decoded"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Detected Type: {decodeResult.mime}</span>
                    <Button onClick={handleDownloadDecoded} size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
