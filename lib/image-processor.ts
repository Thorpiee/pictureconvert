// @ts-ignore
import UPNG from "upng-js"

export interface ProcessingOptions {
  quality?: number
  width?: number
  height?: number
  maintainAspectRatio?: boolean
  fit?: "contain" | "cover" | "fill"
  cropX?: number
  cropY?: number
  cropWidth?: number
  cropHeight?: number
  skipQualityCheck?: boolean
  backgroundColor?: string
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

export function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

/**
 * Shared Render Pipeline
 * Renders an image to a canvas with cropping, resizing, and fit modes.
 * This ensures Preview and Export use the exact same logic.
 */
export function renderToCanvas(
  img: HTMLImageElement,
  options: ProcessingOptions,
  fileType: string = "image/jpeg"
): HTMLCanvasElement {
  const { width, height, maintainAspectRatio = true, fit, backgroundColor } = options
  const { cropX, cropY, cropWidth, cropHeight } = options

  // Determine Source Rect (Cropping)
  // If no crop params, use full image
  let sx = cropX || 0
  let sy = cropY || 0
  let sWidth = cropWidth || img.naturalWidth || img.width
  let sHeight = cropHeight || img.naturalHeight || img.height

  // Determine Destination Size (Resizing base)
  let newWidth = width || sWidth
  let newHeight = height || sHeight

  // Determine fit mode
  const mode = fit || (maintainAspectRatio ? "contain" : "fill")

  // For drawing calculations (Destination Rect inside Canvas)
  let drawX = 0
  let drawY = 0
  let drawWidth = newWidth
  let drawHeight = newHeight
  let canvasWidth = newWidth
  let canvasHeight = newHeight

  // Calculate canvas dimensions and draw dimensions based on Fit Mode
  if (mode === "contain" && width && height) {
    // Letterbox mode: Canvas is target size, image is centered
    canvasWidth = width
    canvasHeight = height

    const aspectRatio = sWidth / sHeight
    const targetRatio = width / height

    if (aspectRatio > targetRatio) {
      // Image is wider than target
      drawWidth = width
      drawHeight = Math.round(width / aspectRatio)
    } else {
      // Image is taller than target
      drawHeight = height
      drawWidth = Math.round(height * aspectRatio)
    }

    drawX = (width - drawWidth) / 2
    drawY = (height - drawHeight) / 2
  } else if (mode === "contain") {
    // Resize to fit (no letterbox)
    const aspectRatio = sWidth / sHeight
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
    canvasWidth = newWidth
    canvasHeight = newHeight
    drawWidth = newWidth
    drawHeight = newHeight
  } else {
    // cover or fill (stretch)

    if (mode === "cover" && width && height) {
      // Cover logic: Fill the canvas with the image, cropping excess.
      // Note: This does "Scale to Cover". If user wanted "Crop to Aspect Ratio", 
      // that should ideally happen by adjusting cropX/cropY/cropWidth/cropHeight before passing here.
      // But if we just pass full image + cover mode, this will center crop.
      canvasWidth = width
      canvasHeight = height

      const scale = Math.max(canvasWidth / sWidth, canvasHeight / sHeight)
      drawWidth = sWidth * scale
      drawHeight = sHeight * scale

      drawX = (canvasWidth - drawWidth) / 2
      drawY = (canvasHeight - drawHeight) / 2
    } else {
      // Stretch / Fill
      if (width && !height) {
        newHeight = Math.round(newWidth / (sWidth / sHeight))
      } else if (height && !width) {
        newWidth = Math.round(newHeight * (sWidth / sHeight))
      }
      canvasWidth = newWidth
      canvasHeight = newHeight
      drawWidth = newWidth
      drawHeight = newHeight
    }
  }

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: false,
    willReadFrequently: false,
    colorSpace: "srgb"
  })

  if (!ctx) throw new Error("Failed to get canvas context")

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Disable smoothing for pixel-perfect if 1:1
  if (sWidth === canvasWidth && sHeight === canvasHeight && drawWidth === canvasWidth) {
    ctx.imageSmoothingEnabled = false
  }

  // Background handling
  const isJpeg = fileType === "image/jpeg"
  if (isJpeg || (mode === "contain" && width && height)) {
    const fill = backgroundColor || "#FFFFFF"
    if (fill !== "transparent") {
      ctx.fillStyle = fill
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (isJpeg) {
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  // Draw Image
  ctx.drawImage(img, sx, sy, sWidth, sHeight, drawX, drawY, drawWidth, drawHeight)

  // Apply Sharpening if downscaled
  if (drawWidth < sWidth || drawHeight < sHeight) {
    applySharpening(ctx, canvasWidth, canvasHeight, 0.3)
  }

  return canvas
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
    return {
      blob: result.blob,
      url: result.url,
      width: result.width,
      height: result.height,
      size: result.size,
    }
  }

  const defaultQuality = outputType === "image/png" ? 1.0 : 0.95
  let { quality = defaultQuality } = options

  // Enforce QUALITY_MODE constraints
  if (QUALITY_MODE === "MAX" && !options.skipQualityCheck) {
    if (outputType === "image/jpeg") quality = Math.max(quality, 0.92)
    else if (outputType === "image/webp") quality = Math.max(quality, 0.90)
  }

  const img = await loadImage(file)

  // Use renderToCanvas for consistency
  // Note: convertImage usually keeps dimensions unless options.width/height provided
  // But usually options here are just quality.
  const canvas = renderToCanvas(img, options, file.type)

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    // For PNG, use maximum quality (lossless)
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
  let { quality = 0.9 } = options

  if (QUALITY_MODE === "MAX") {
    if (file.type === "image/jpeg") quality = Math.max(quality, 0.90)
    else if (file.type === "image/webp") quality = Math.max(quality, 0.90)
  }

  const img = await loadImage(file)

  // Use renderToCanvas (defaults to 1:1 if no width/height)
  const canvas = renderToCanvas(img, options, file.type)

  URL.revokeObjectURL(img.src)

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"

  // Use UPNG for PNG compression (Quantization)
  if (outputType === "image/png") {
    const ctx = canvas.getContext("2d")!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Calculate colors for quantization
    const cnum = quality >= 0.99 ? 0 : 256

    const pngBuffer = UPNG.encode([imageData.data.buffer], canvas.width, canvas.height, cnum)
    const blob = new Blob([pngBuffer], { type: "image/png" })

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
    const finalQuality = quality

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
  const defaultQuality = file.type === "image/png" ? 1.0 : 0.95
  const { quality = defaultQuality } = options

  const img = await loadImage(file)

  // Use shared render pipeline
  const canvas = renderToCanvas(img, options, file.type)

  URL.revokeObjectURL(img.src)

  return new Promise((resolve, reject) => {
    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"
    const finalQuality = outputType === "image/png" ? undefined : Math.max(quality, 0.95)

    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob"))
        return
      }
      resolve({
        blob,
        url: URL.createObjectURL(blob),
        width: canvas.width,
        height: canvas.height,
        size: blob.size
      })
    }, outputType, finalQuality)
  })
}

export async function cropImage(
  file: File,
  options: ProcessingOptions
): Promise<ProcessingResult> {
  // cropImage is essentially resizeImage but typically without target width/height
  // (so it stays at cropped dimensions).
  return resizeImage(file, options)
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function getOutputFilename(
  originalName: string,
  optionsOrFormat: { width?: number; height?: number; format?: string; suffix?: string } | string
): string {
  const name = originalName.replace(/\.[^/.]+$/, "")

  let options: { width?: number; height?: number; format?: string; suffix?: string } = {}
  if (typeof optionsOrFormat === "string") {
    options = { format: optionsOrFormat }
  } else {
    options = optionsOrFormat || {}
  }

  const ext = options.format === "image/png" ? "png" : options.format === "image/webp" ? "webp" : "jpg"

  if (options.suffix) {
    return `${name}-${options.suffix}.${ext}`
  }

  if (options.width && options.height) {
    return `${name}-${options.width}x${options.height}.${ext}`
  }
  return `${name}-processed.${ext}`
}

export async function removeExif(file: File): Promise<ProcessingResult> {
  // To remove EXIF, we simply re-encode the image.
  // We maintain original dimensions and try to keep max quality (1.0).
  // renderToCanvas -> toBlob automatically strips metadata.
  return resizeImage(file, {
    quality: 1.0,
    skipQualityCheck: true
  })
}
