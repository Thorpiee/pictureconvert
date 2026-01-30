import UPNG from "upng-js"

export interface ProcessingOptions {
  quality?: number
  width?: number
  height?: number
  maintainAspectRatio?: boolean
  cropX?: number
  cropY?: number
  cropWidth?: number
  cropHeight?: number
}

export interface ProcessingResult {
  blob: Blob
  url: string
  width: number
  height: number
  size: number
}

// Global flag for quality mode
const QUALITY_MODE = "MAX"

/**
 * TECHNICAL NOTE ON BROWSER LIMITATIONS & QUALITY MODE:
 * 
 * 1. Chroma Subsampling (4:4:4 vs 4:2:0):
 *    - Standard Browser Canvas API (toBlob) does not allow explicit control over chroma subsampling.
 *    - However, setting quality > 0.90 often discourages aggressive subsampling in some browsers (e.g. Chrome).
 *    - We default to 0.95-0.98 to maximize the chance of higher fidelity output.
 * 
 * 2. MozJPEG / 16-bit PNG:
 *    - Native Canvas API uses the browser's internal encoders (usually Libjpeg-turbo, not MozJPEG).
 *    - 16-bit PNG is not supported by standard Canvas (8-bit per channel).
 *    - To support strict 16-bit or MozJPEG, we would need external WASM libraries.
 *    - CURRENT STRATEGY: Maximize native API quality. "Quality > Speed" is enforced by using
 *      high-quality resampling, disabling aggressive optimization, and using display-p3 color space where possible.
 */

/**
 * Applies a convolution filter to the canvas context
 * Used for sharpening after resizing
 */
function applySharpening(ctx: CanvasRenderingContext2D, width: number, height: number, amount: number = 0.5) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const w = width
  const h = height

  // Convolution matrix for sharpening
  // [  0, -1,  0 ]
  // [ -1,  5, -1 ]
  // [  0, -1,  0 ]
  // Weighted by amount

  const mix = amount
  const kernel = [
    0, -1 * mix, 0,
    -1 * mix, 1 + 4 * mix, -1 * mix,
    0, -1 * mix, 0
  ]

  const output = new Uint8ClampedArray(data.length)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4

      let r = 0, g = 0, b = 0

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const iy = y + ky
          const ix = x + kx

          if (iy >= 0 && iy < h && ix >= 0 && ix < w) {
            const kIdx = (ky + 1) * 3 + (kx + 1)
            const pIdx = (iy * w + ix) * 4
            const weight = kernel[kIdx]

            r += data[pIdx] * weight
            g += data[pIdx + 1] * weight
            b += data[pIdx + 2] * weight
          }
        }
      }

      output[idx] = r
      output[idx + 1] = g
      output[idx + 2] = b
      output[idx + 3] = data[idx + 3] // Preserve alpha
    }
  }

  // Write back to image data
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i]
  }

  ctx.putImageData(imageData, 0, 0)
}

export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

export async function convertImage(
  file: File,
  outputType: string,
  options: ProcessingOptions = {}
): Promise<ProcessingResult> {
  // Special handling for JPG to PNG: use optimized lossless converter
  if (file.type === "image/jpeg" && outputType === "image/png") {
    const { convertJpgToPng } = await import("./jpg-to-png-converter")
    const result = await convertJpgToPng(file)
    // Return in ProcessingResult format
    return {
      blob: result.blob,
      url: result.url,
      width: result.width,
      height: result.height,
      size: result.size,
    }
  }

  // QUALITY PRIORITY: Always use high quality defaults
  // PNG is lossless (quality 1.0)
  // JPG/WebP use 0.95 minimum unless specified higher
  const defaultQuality = outputType === "image/png" ? 1.0 : 0.95
  let { quality = defaultQuality } = options

  // Enforce QUALITY_MODE = "MAX" constraints
  if (QUALITY_MODE === "MAX") {
    if (outputType === "image/jpeg") {
      // User requirement: Quality 92-95 for PNG->JPG, 95 for HEIC->JPG
      // We'll enforce a floor of 0.92 for JPG conversions
      quality = Math.max(quality, 0.92)
    } else if (outputType === "image/webp") {
      // User requirement: Quality >= 90 for WebP
      quality = Math.max(quality, 0.90)
    }
  }

  const img = await loadImage(file)

  const canvas = document.createElement("canvas")
  // For PNG output, always enable alpha channel for transparency support
  // For JPG output, disable alpha for better performance
  const ctx = canvas.getContext("2d", {
    alpha: outputType !== "image/jpeg",
    desynchronized: false,
    willReadFrequently: false,
    colorSpace: QUALITY_MODE === "MAX" ? "display-p3" : "srgb"
  })

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  // CRITICAL: Use naturalWidth/naturalHeight
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  // For same-format conversions, disable smoothing for pixel-perfect
  const isSameFormat = file.type === outputType
  const isSameSize = img.naturalWidth === canvas.width && img.naturalHeight === canvas.height

  if (isSameFormat && isSameSize) {
    ctx.imageSmoothingEnabled = false
  } else {
    // QUALITY: Always use high quality smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
  }

  // Fill with white background ONLY for JPG output (no transparency in JPG)
  if (outputType === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // Draw the image
  ctx.drawImage(img, 0, 0)

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    // For PNG, use maximum quality (lossless compression)
    // For JPG/WebP, ensure we use at least 0.95 quality for better results
    const finalQuality = outputType === "image/png"
      ? undefined
      : Math.max(quality, 0.95)

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"))
          return
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
        })
      },
      outputType,
      finalQuality
    )
  })
}

export async function compressImage(
  file: File,
  options: ProcessingOptions = {}
): Promise<ProcessingResult> {
  // QUALITY: Use higher default quality (0.9 instead of 0.8/0.7)
  let { quality = 0.9 } = options

  // Enforce QUALITY_MODE = "MAX" constraints
  // "Compress JPG: Quality floor: 90"
  if (QUALITY_MODE === "MAX" && !options.skipQualityCheck) {
    if (file.type === "image/jpeg") {
      quality = Math.max(quality, 0.90)
    } else if (file.type === "image/webp") {
      quality = Math.max(quality, 0.90)
    }
  }

  const img = await loadImage(file)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", {
    alpha: file.type === "image/png",
    desynchronized: false,
    willReadFrequently: true,
    colorSpace: QUALITY_MODE === "MAX" ? "display-p3" : "srgb"
  })

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = img.width
  canvas.height = img.height

  // Always use high-quality image scaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Disable image smoothing for pixel-perfect rendering when not scaling
  if (img.width === canvas.width && img.height === canvas.height) {
    ctx.imageSmoothingEnabled = false
  }

  // Fill with white background for JPG
  if (file.type === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(img, 0, 0)

  URL.revokeObjectURL(img.src)

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"

  // Use UPNG for PNG compression (Quantization)
  if (outputType === "image/png") {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Calculate colors for quantization
    // Quality 1.0 -> 0 (Lossless)
    // Quality < 1.0 -> 256 colors (8-bit)
    const cnum = quality >= 0.99 ? 0 : 256

    // UPNG expects an ArrayBuffer. imageData.data is a Uint8ClampedArray.
    // We need the underlying buffer.
    const pngBuffer = UPNG.encode([imageData.data.buffer], canvas.width, canvas.height, cnum)
    const blob = new Blob([pngBuffer], { type: "image/png" })

    // Safety check: if compressed is larger than original, return original
    if (blob.size > file.size) {
      return {
        blob: file,
        url: URL.createObjectURL(file),
        width: canvas.width,
        height: canvas.height,
        size: file.size
      }
    }

    return {
      blob,
      url: URL.createObjectURL(blob),
      width: canvas.width,
      height: canvas.height,
      size: blob.size,
    }
  }

  return new Promise((resolve, reject) => {
    // For JPG/WebP
    const finalQuality = outputType === "image/png" ? undefined : quality

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"))
          return
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
        })
      },
      outputType,
      finalQuality
    )
  })
}

export async function resizeImage(
  file: File,
  options: ProcessingOptions
): Promise<ProcessingResult> {
  // Use higher default quality for resizing
  const defaultQuality = file.type === "image/png" ? 1.0 : 0.95
  const { width, height, maintainAspectRatio = true, quality = defaultQuality } = options

  const img = await loadImage(file)

  let newWidth = width || img.width
  let newHeight = height || img.height

  if (maintainAspectRatio) {
    const aspectRatio = img.width / img.height
    if (width && !height) {
      newHeight = Math.round(newWidth / aspectRatio)
    } else if (height && !width) {
      newWidth = Math.round(newHeight * aspectRatio)
    } else if (width && height) {
      const targetRatio = width / height
      if (aspectRatio > targetRatio) {
        newHeight = Math.round(newWidth / aspectRatio)
      } else {
        newWidth = Math.round(newHeight * aspectRatio)
      }
    }
  }

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", {
    alpha: file.type === "image/png",
    desynchronized: false,
    willReadFrequently: false,
    colorSpace: "srgb"
  })

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = newWidth
  canvas.height = newHeight

  // QUALITY: Use high-quality image scaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Fill with white background for JPG
  if (file.type === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(img, 0, 0, newWidth, newHeight)

  // QUALITY: Apply mild sharpening after downscaling
  // Only apply if we actually resized (downscaled)
  if (newWidth < img.width || newHeight < img.height) {
    // Apply mild sharpening (0.3 - 0.5 is usually good for Lanczos-like effect)
    applySharpening(ctx, newWidth, newHeight, 0.3)
  }

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    // For PNG, use maximum quality (lossless)
    let finalQuality = file.type === "image/png" ? undefined : Math.max(quality, 0.95)

    // Enforce MAX mode constraints
    if (QUALITY_MODE === "MAX" && file.type !== "image/png") {
      if (file.type === "image/jpeg") finalQuality = Math.max(finalQuality || 0, 0.90)
      if (file.type === "image/webp") finalQuality = Math.max(finalQuality || 0, 0.90)
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"))
          return
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width: newWidth,
          height: newHeight,
          size: blob.size,
        })
      },
      file.type,
      finalQuality
    )
  })
}

export async function cropImage(
  file: File,
  options: ProcessingOptions
): Promise<ProcessingResult> {
  // Use higher default quality for cropping
  const defaultQuality = file.type === "image/png" ? 1.0 : 0.98
  const { cropX = 0, cropY = 0, cropWidth, cropHeight, quality = defaultQuality } = options

  const img = await loadImage(file)

  const finalWidth = cropWidth || img.width
  const finalHeight = cropHeight || img.height

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", {
    alpha: file.type === "image/png",
    desynchronized: false,
    willReadFrequently: false,
    colorSpace: "srgb"
  })

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = finalWidth
  canvas.height = finalHeight

  // Always use high-quality image scaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Disable image smoothing for pixel-perfect cropping when not scaling
  if (finalWidth === img.width && finalHeight === img.height) {
    ctx.imageSmoothingEnabled = false
  }

  // Fill with white background for JPG
  if (file.type === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(
    img,
    cropX, cropY, finalWidth, finalHeight,
    0, 0, finalWidth, finalHeight
  )

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    // For PNG, use maximum quality (lossless)
    let finalQuality = file.type === "image/png" ? undefined : quality

    // Enforce MAX mode constraints
    if (QUALITY_MODE === "MAX" && file.type !== "image/png") {
      if (file.type === "image/jpeg") finalQuality = Math.max(finalQuality || 0, 0.98) // Crop needs high fidelity
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"))
          return
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width: finalWidth,
          height: finalHeight,
          size: blob.size,
        })
      },
      file.type,
      finalQuality
    )
  })
}

export async function removeExif(file: File): Promise<ProcessingResult> {
  // Re-encoding through canvas strips EXIF data
  const img = await loadImage(file)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", {
    alpha: file.type === "image/png",
    desynchronized: false,
    willReadFrequently: false,
    // Try to preserve color space if possible (P3)
    colorSpace: QUALITY_MODE === "MAX" ? "display-p3" : "srgb"
  })

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  canvas.width = img.width
  canvas.height = img.height

  // Always use high-quality image scaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Disable image smoothing for pixel-perfect rendering when not scaling
  if (img.width === canvas.width && img.height === canvas.height) {
    ctx.imageSmoothingEnabled = false
  }

  // Fill with white background for JPG
  if (file.type === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(img, 0, 0)

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    // Use high quality - 0.98 for JPG, undefined (lossless) for PNG
    const quality = file.type === "image/png" ? undefined : 0.98
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"))
          return
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
        })
      },
      file.type,
      quality
    )
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function getOutputFilename(originalName: string, outputType: string): string {
  const baseName = originalName.replace(/\.[^/.]+$/, "")
  const extension = outputType.split("/")[1]
  return `${baseName}-pictureconvert.${extension}`
}
