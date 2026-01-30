
import { useState, useCallback } from "react"
import { loadImage, cropImage, resizeImage, convertImage } from "@/lib/image-processor"
import { CropRect } from "@/components/tools/cropper-box"

export interface ProcessResult {
  blob: Blob
  url: string
  size: number
  width?: number
  height?: number
}

export interface PipelineOptions {
  width: number
  height: number
  quality: number
  fit?: "contain" | "cover" | "fill"
  format?: string // defaults to "image/jpeg"
  maintainAspectRatio?: boolean // for generic resizer
  backgroundColor?: string
  skipQualityCheck?: boolean
  originalSize?: number
}

export function calculateCenterCrop(
  imgWidth: number,
  imgHeight: number,
  targetWidth: number,
  targetHeight: number
): CropRect {
  const targetRatio = targetWidth / targetHeight
  const imgRatio = imgWidth / imgHeight

  let width, height, x, y

  if (imgRatio > targetRatio) {
    // Image is wider than target
    height = imgHeight
    width = height * targetRatio
    x = (imgWidth - width) / 2
    y = 0
  } else {
    // Image is taller than target
    width = imgWidth
    height = width / targetRatio
    x = 0
    y = (imgHeight - height) / 2
  }

  return { x, y, width, height }
}

export interface ImagePipeline {
  file: File | null
  imageSrc: string | null
  imageDimensions: { width: number; height: number } | null
  cropRect: CropRect | null
  setCropRect: (rect: CropRect) => void
  result: ProcessResult | null
  isProcessing: boolean
  error: string | null
  handleImageSelect: (file: File) => Promise<void>
  handleRemove: () => void
  processImage: (options: PipelineOptions) => Promise<void>
  resetResult: () => void
}

export function useImagePipeline(): ImagePipeline {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [cropRect, setCropRect] = useState<CropRect | null>(null)

  const [result, setResult] = useState<ProcessResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)
    setError(null)

    try {
      const url = URL.createObjectURL(selectedFile)
      setImageSrc(url)
      const img = await loadImage(selectedFile)
      setImageDimensions({ width: img.width, height: img.height })

      // Initialize full crop
      setCropRect({
        x: 0,
        y: 0,
        width: img.width,
        height: img.height
      })
    } catch (err) {
      console.error("Failed to load image", err)
      setError("Failed to load image for editing")
    }
  }, [])

  const handleRemove = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setImageDimensions(null)
    setCropRect(null)
    setResult(null)
    setError(null)
  }, [imageSrc])

  const processImage = useCallback(async (options: PipelineOptions) => {
    if (!file || !cropRect) return

    setIsProcessing(true)
    setError(null)

    try {
      // 1. Crop
      // We always crop first based on the user's selection
      const cropped = await cropImage(file, {
        cropX: cropRect.x,
        cropY: cropRect.y,
        cropWidth: cropRect.width,
        cropHeight: cropRect.height,
        quality: 1.0 // Lossless intermediate
      })

      // 2. Resize
      // If fit is "fill", we force exact dimensions. 
      // If "contain" or "cover", logic might differ, but usually we just want to hit the target dimensions.
      // For the platform tools, we usually want "fill" behavior on the cropped area to the target preset.

      const resizeOptions = {
        width: options.width,
        height: options.height,
        fit: options.fit || "fill",
        quality: 0.95, // High quality intermediate
        maintainAspectRatio: options.maintainAspectRatio,
        backgroundColor: options.backgroundColor
      }

      const resized = await resizeImage(
        new File([cropped.blob], file.name, { type: cropped.blob.type }),
        resizeOptions
      )

      // 3. Compress & Convert
      const outputFormat = options.format || "image/jpeg"
      const compressed = await convertImage(
        new File([resized.blob], file.name, { type: resized.blob.type }),
        outputFormat,
        {
          quality: options.quality,
          skipQualityCheck: true // Important for overrides
        }
      )

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
  }, [file, cropRect])

  const resetResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    file,
    imageSrc,
    imageDimensions,
    cropRect,
    setCropRect,
    result,
    isProcessing,
    error,
    handleImageSelect,
    handleRemove,
    processImage,
    resetResult
  }
}
