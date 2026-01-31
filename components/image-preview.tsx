"use client"

import { useState, useEffect } from "react"
import { X, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImagePreviewProps {
  file: File
  onRemove: () => void
  className?: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ImagePreview({ file, onRemove, className }: ImagePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setPreview(url)

    const img = new Image()
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
    }
    img.src = url

    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className={cn("w-full rounded-xl border border-border bg-card overflow-hidden", className)}>
      <div className="relative aspect-video bg-muted flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
            style={{ imageRendering: 'auto' }}
            loading="eager"
          />
        ) : (
          <FileImage className="h-16 w-16 text-muted-foreground" />
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full"
          onClick={onRemove}
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>{" "}
            <span className="font-medium text-foreground truncate max-w-[200px] inline-block align-bottom">
              {file.name}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span>{" "}
            <span className="font-medium text-foreground">{file.type.split('/')[1].toUpperCase()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Size:</span>{" "}
            <span className="font-medium text-foreground">{formatFileSize(file.size)}</span>
          </div>
          {dimensions && (
            <div>
              <span className="text-muted-foreground">Dimensions:</span>{" "}
              <span className="font-medium text-foreground">{dimensions.width} x {dimensions.height}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
