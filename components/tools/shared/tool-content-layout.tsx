import React from "react"
import { ImageDropzone } from "@/components/image-dropzone"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ToolContentLayoutProps {
  file: File | null
  onImageSelect: (file: File) => void
  onRemove?: () => void
  preview: React.ReactNode
  controls: React.ReactNode // Left column (Presets, Main Options)
  actions?: React.ReactNode // Right column (Output settings, Download, CTA)
  className?: string
  acceptedTypes?: string[]
  dropzone?: React.ReactNode
}

export function ToolContentLayout({
  file,
  onImageSelect,
  onRemove,
  preview,
  controls,
  actions,
  className,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"],
  dropzone
}: ToolContentLayoutProps) {
  if (!file) {
    return (
      <div className={className}>
        {dropzone || (
          <ImageDropzone
            onImageSelect={onImageSelect}
            acceptedTypes={acceptedTypes}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Workspace / Preview Area */}
      <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30 min-h-[350px] md:min-h-[600px] xl:min-h-[700px] flex items-center justify-center shadow-sm">
        {onRemove && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-10 w-10 bg-background/50 hover:bg-background/80 backdrop-blur-md text-foreground rounded-full shadow-sm"
              aria-label="Remove image"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="w-full h-full absolute inset-0 p-4 md:p-8 flex items-center justify-center">
          {preview}
        </div>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Controls (Left - 2 cols) */}
        <div className={actions ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"}>
          {controls}
        </div>

        {/* Actions / Side Panel (Right - 1 col) */}
        {actions && (
          <div className="space-y-6 lg:border-l lg:pl-8">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
