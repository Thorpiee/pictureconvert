import React, { useEffect, useRef, useState } from "react"
import { renderToCanvas } from "@/lib/image-processor"

interface CanvasPreviewProps {
  imageSrc: string
  width: number
  height: number
  fit?: "cover" | "contain" | "fill"
  maintainAspectRatio?: boolean
  cropRect?: { x: number; y: number; width: number; height: number }
  backgroundColor?: string
  className?: string
  style?: React.CSSProperties
}

export function CanvasPreview({
  imageSrc,
  width,
  height,
  fit = "contain",
  maintainAspectRatio = true,
  cropRect,
  backgroundColor,
  className,
  style
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load image
  useEffect(() => {
    let mounted = true
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc
    
    img.onload = () => {
      if (mounted) {
        setImage(img)
        setError(null)
      }
    }
    
    img.onerror = () => {
      if (mounted) {
        setError("Failed to load image preview")
      }
    }

    return () => {
      mounted = false
    }
  }, [imageSrc])

  // Render
  useEffect(() => {
    if (!image || !canvasRef.current) return

    const render = () => {
      try {
        const resultCanvas = renderToCanvas(image, {
          width,
          height,
          fit,
          maintainAspectRatio,
          backgroundColor,
          cropX: cropRect?.x,
          cropY: cropRect?.y,
          cropWidth: cropRect?.width,
          cropHeight: cropRect?.height
        })

        // Copy to display canvas
        const displayCanvas = canvasRef.current
        if (!displayCanvas) return

        // Update dimensions
        if (displayCanvas.width !== resultCanvas.width || displayCanvas.height !== resultCanvas.height) {
          displayCanvas.width = resultCanvas.width
          displayCanvas.height = resultCanvas.height
        }

        const ctx = displayCanvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(resultCanvas, 0, 0)
        }
      } catch (err) {
        console.error("Preview render error:", err)
      }
    }

    // Debounce render
    const timer = setTimeout(render, 50)
    return () => clearTimeout(timer)
  }, [image, width, height, fit, maintainAspectRatio, cropRect, backgroundColor])

  if (error) {
    return <div className="text-red-500 text-sm p-4">{error}</div>
  }

  return (
    <canvas
      ref={canvasRef}
      className={`max-w-full max-h-full object-contain shadow-sm ${className}`}
      style={style}
    />
  )
}
